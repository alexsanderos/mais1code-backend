const { Server } = require('http');
var oportunidadesRepository = require('../repositories/oportunidades-repository');

const MAX_CARACTERES_NOME = 150;
const MAX_CARACTERES_EMPRESA = 150;
const MAX_CARACTERES_FAIXA_SALARIAL_DE = 30;
const MAX_CARACTERES_FAIXA_SALARIAL_ATE = 30;
const MAX_CARACTERES_REGIME = 150;

const MIN_PADRAO = 3;


exports.post = async(req, res) => {
    try {
        const conteudo = req.body;
        delete conteudo.id;

        if (!conteudo.nome || conteudo.nome.length < MIN_PADRAO || conteudo.nome.length > MAX_CARACTERES_NOME) {
            return res.status(400).json({ error: `O nome deve ter no mínimo ${MIN_PADRAO} e no máximo ${MAX_CARACTERES_NOME} caracteres.` });
        }

        if (!conteudo.empresa || conteudo.empresa.length < MIN_PADRAO || conteudo.empresa.length > MAX_CARACTERES_EMPRESA) {
            return res.status(400).json({ error: `A empresa deve ter no mínimo ${MIN_PADRAO} e no máximo ${MAX_CARACTERES_EMPRESA} caracteres.` });
        }

        if (!conteudo.faixa_salarial_de || conteudo.faixa_salarial_de.length < MIN_PADRAO || conteudo.faixa_salarial_de.length > MAX_CARACTERES_FAIXA_SALARIAL_DE) {
            return res.status(400).json({ error: `A faixa salarial de deve ter no mínimo ${MIN_PADRAO} e no máximo ${MAX_CARACTERES_FAIXA_SALARIAL_DE} caracteres.` });
        }

        if (!conteudo.faixa_salarial_ate || conteudo.faixa_salarial_ate.length < MIN_PADRAO || conteudo.faixa_salarial_ate.length > MAX_CARACTERES_FAIXA_SALARIAL_ATE) {
            return res.status(400).json({ error: `A faixa salarial até deve ter no mínimo ${MIN_PADRAO} e no máximo ${MAX_CARACTERES_FAIXA_SALARIAL_ATE} caracteres.` });
        }

        if (!conteudo.regime || conteudo.regime.length < MIN_PADRAO || conteudo.regime.length > MAX_CARACTERES_REGIME) {
            return res.status(400).json({ error: `O regime deve ter no mínimo ${MIN_PADRAO} e no máximo ${MAX_CARACTERES_REGIME} caracteres.` });
        }

        const resultItem = await oportunidadesRepository.criarOportunidade(conteudo.nome, conteudo.empresa, conteudo.nivel, conteudo.faixa_salarial_de, conteudo.faixa_salarial_ate, conteudo.regime);
        res.status(201).json({ message: 'Oportunidade criada!.', data: resultItem });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao criar a Oportunidade.' });
    }
};

exports.get = async(req, res) => {
    try {
        const resultSelect = await oportunidadesRepository.obterOportunidades();
        res.status(200).send({ message: 'Oportunidade obtida!.', data: resultSelect.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao consultar a oportunidade.' });
    }
};

exports.put = async(req, res) => {
    try {
        var conteudo = req.body;
        if (!conteudo.id || !Number.isInteger(conteudo.id)) {
            return res.status(400).json({ error: 'O campo id deve ser um número inteiro.' });
        }

        var resultItem = await oportunidadesRepository.atualizarOportunidade(
            conteudo.id, conteudo.nome, conteudo.empresa, conteudo.nivel,
            conteudo.faixa_salarial_de, conteudo.faixa_salarial_ate, conteudo.regime);
        res.status(203).json({ message: 'Oportunidade atualizada!.', data: resultItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar a oportunidade.' });
    }
};

exports.delete = async(req, res) => {
    try {
        const conteudo = req.body;
        if (!conteudo.id || !Number.isInteger(conteudo.id)) {
            return res.status(400).json({ error: 'O campo id deve ser um número inteiro.' });
        }

        const resultItem = await oportunidadesRepository.excluirOportunidade(conteudo.id);
        res.status(202).json({ message: 'Oportunidade excuida!.', data: resultItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao excluir a Oportunidade.' });
    }
};