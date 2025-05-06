import { Router } from 'express';
//import Categoria from '../../models/'; // adapte ao caminho correto
import {Fornecedor} from '../../models/fornecedor/Fornecedor'; // adapte ao caminho correto

const router = Router();

// Buscar todas as categorias
/*router.get('/categorias', async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar categorias' });
    }
});*/

// Buscar fornecedores de uma categoria específica
/*
router.get('/Fornecedores/:idCategoria', async (req, res) => {
    try {
        const { idCategoria } = req.params;
        const fornecedores = await Fornecedor.find({ categoria_servico: idCategoria });
        res.json(fornecedores);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar fornecedores' });
    }
});

export default router;*/