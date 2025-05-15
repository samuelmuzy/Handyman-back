import { Request, Response } from 'express';
import { Payment, MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import { generateId } from '../../middlewares/generateId';
import axios from 'axios';

dotenv.config();

const client = new MercadoPagoConfig({
    accessToken: process.env.TOKEN_MERCADO_PAGO as string,
});
  
  
const payment = new Payment(client);

export class PagamentoController {
    
 // POST /criar-preferencia
public criarPreferencia = async (req: Request, res: Response) => {
  try {
    const { title, quantity, unit_price, payer } = req.body;

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: generateId(),
            title: title || 'Produto Teste',
            quantity: quantity || 1,
            unit_price: unit_price || 1,
          },
        ],
        payer: {
          name: payer?.name,
          email: payer?.email,
          identification: {
            type: payer?.identification?.type || 'CPF',
            number: payer?.identification?.number || '',
          },
        },
        back_urls: {
          success: 'https://handymanssfront.vercel.app/servicos',
          failure: 'https://handymanssfront.vercel.app/',
          pending: 'https://handymanssfront.vercel.app/sobre-nos',
        },
        auto_return: 'approved',
      },
    });

    res.status(200).json({ init_point: result.init_point }); // URL para redirecionar
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


  // Pagamento com PIX
  public pagarComPix = async (req: Request, res: Response) => {
    try {

        const response = await axios.post(
          'https://sandbox.api.pagseguro.com/orders',
          {
            reference_id: 'pedido123',
            customer: {
              name: 'João Silva',
              email: 'email@sandbox.pagseguro.com.br',
              tax_id: '12345678909',
              phones: [
                {
                  country: '55',
                  area: '11',
                  number: '999999999',
                  type: 'MOBILE'
                }
              ]
            },
            items: [
              {
                name: 'Produto 1',
                quantity: 1,
                unit_amount: 1000
              }
            ],
            charges: [
              {
                reference_id: 'charge123',
                amount: {
                  value: 1000
                },
                payment_method: {
                  type: 'PIX'
                }
              }
            ]
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.PAGSEGURO_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        ).then(response => {
          console.log(response.data);
          res.status(200).json(response.data);
        }).catch(error => {
          console.error(error.response?.data || error.message);
        });
         
          

    } catch (error:any) {
        if (axios.isAxiosError(error) && error.response) {
          console.error('Erro detalhado:', JSON.stringify(error.response.data, null, 2));
        } else {
          console.error('Erro genérico:', error.message);
        }
      }
  };
}
