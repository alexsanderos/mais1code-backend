const clientBase = require('../db/db');

exports.obterOportunidades = async() => {
    try {
        return clientBase.query(`SELECT * FROM oportunidades ORDER BY id`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.criarOportunidade = async(id, nome, empresa, nivel, faixa_salarial_de, faixa_salarial_ate, regime) => {
    try {
        return clientBase.query(`INSERT INTO oportunidades (id, nome, empresa, nivel, faixa_salarial_de, faixa_salarial_ate, regime) values ($1, $2, $3, $4, $6, $7)`, [id, nome, empresa, nivel, faixa_salarial_de, faixa_salarial_ate, regime]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao inserir a oportunidade no DB.' });
        throw error;
    }
};

exports.excluirOportunidade = async(id) => {
    try {
        return clientBase.query(`DELETE FROM oportunidades WHERE id = $1`, [id]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao excluir a oportunidade no DB.' });
    }
};

exports.atualizarOportunidade = async(id, nome, empresa, nivel, faixa_salarial_de, faixa_salarial_ate, regime) => {
    try {
        return clientBase.query(`UPDATE oportunidades SET oportunidades = $1 WHERE id = $2`, [id, nome, empresa, nivel, faixa_salarial_de, faixa_salarial_ate, regime]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao atualizar a oportunidade no DB.' });
    }
};