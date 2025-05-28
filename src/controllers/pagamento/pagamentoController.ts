import { Request, Response } from 'express';
import { Payment, MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import { generateId } from '../../middlewares/generateId';
import axios from 'axios';
import { ServicoModel } from '../../models/servicoAgendado/Servico';


dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN_MERCADO_PAGO as string,
});

const paymentClient = new Payment(client);

export class PagamentoController {

  // POST /criar-preferencia
  public criarPreferencia = async (req: Request, res: Response) => {
    try {
      const { title, quantity, unit_price, payer, servicoId } = req.body;

      const preference = new Preference(client);

      const result = await preference.create({
        body: {
          items: [
            {
              id: generateId(),
              title: title || 'Serviço Handyman',
              quantity: quantity || 1,
              unit_price: unit_price,
              currency_id: 'BRL' // Adicionando moeda brasileira
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
            success: `https://handymanssfront.vercel.app/confirmacao-pagamento/${servicoId}`,
            failure: 'https://handymanssfront.vercel.app/',
            pending: 'https://handymanssfront.vercel.app/sobre-nos',
          },
          auto_return: 'approved',
          //notification_url: `https://handyman-back-production.up.railway.app/pagamento/webhook`, // Adicionando webhook para notificações
          statement_descriptor: 'HANDYMAN' // Nome que aparece na fatura
        },
      });

      res.status(200).json({ init_point: result.init_point });
    } catch (error: any) {
      console.error('Erro ao criar preferência:', error);
      res.status(500).json({ 
        error: 'Erro ao processar pagamento',
        details: error.message 
      });
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



    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Erro detalhado:', JSON.stringify(error.response.data, null, 2));
      } else {
        console.error('Erro genérico:', error.message);
      }
    }
  };

  // Exemplo de como seria o endpoint do webhook
  /*public webhook = async (req: Request, res: Response) => {
    try {
      const { action, data } = req.body;
      
      // Verifica se é uma notificação de pagamento
      if (action === 'payment.updated' || action === 'payment.approved') {
        const paymentId = data.id;
        
        // Busca informações do pagamento no Mercado Pago
        const paymentInfo = await paymentClient.get({ id: paymentId });
        
        // Extrai o ID do serviço da referência externa
        const servicoId = paymentInfo.external_reference;
        
        if (paymentInfo.status === 'approved') {
          // Atualiza o status do serviço para "pago"
          await ServicoModel.updateStatus(servicoId, 'pago');
          console.log(`Pagamento aprovado para o serviço ${servicoId}`);
        } else if (paymentInfo.status === 'rejected') {
          // Atualiza o status do serviço para "pagamento rejeitado"
          await ServicoModel.updateStatus(servicoId, 'pagamento_rejeitado');
          console.log(`Pagamento rejeitado para o serviço ${servicoId}`);
        } else if (paymentInfo.status === 'pending') {
          // Atualiza o status do serviço para "pagamento pendente"
          await ServicoModel.updateStatus(servicoId, 'pagamento_pendente');
          console.log(`Pagamento pendente para o serviço ${servicoId}`);
        }
      }
      
      // Responde ao Mercado Pago que recebeu a notificação
      res.status(200).send('OK');
    } catch (error) {
      console.error('Erro no webhook:', error);
      // Mesmo com erro, responde OK para o Mercado Pago
      // O Mercado Pago tentará reenviar a notificação em caso de erro
      res.status(200).send('OK');
    }
  };*/
}
