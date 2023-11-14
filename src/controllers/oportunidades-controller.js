const { Server } = require('http');
var oportunidadesRepository = require('../repositories/oportunidades-repository');

exports.post = async(req, res) => {
    try {
        const conteudo = req.body;
        delete conteudo.id;

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