const clientBase = require('../db/db');

exports.criarOportunidade = async(nome, empresa, nivel, faixa_salarial_de, faixa_salarial_ate, regime) => {
    try {
        return clientBase.query(`INSERT INTO oportunidades (nome, empresa, nivel, faixa_salarial_de, faixa_salarial_ate, regime) values ($1, $2, $3, $4, $5, $6)`, [nome, empresa, nivel, faixa_salarial_de, faixa_salarial_ate, regime]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao inserir a oportunidade no DB.' });
        throw error;
    }
};

exports.obterOportunidades = async() => {
    try {
        return clientBase.query(`SELECT * FROM oportunidades ORDER BY id`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.atualizarOportunidade = async(id, nome, empresa, nivel, faixa_salarial_de, faixa_salarial_ate, regime) => {
    try {
        return clientBase.query(`UPDATE oportunidades
        SET nome = $1,
            empresa = $2,
            nivel = $3,
            faixa_salarial_de = $4,
            faixa_salarial_ate = $5,
            regime = $6
        WHERE id = $7`, [nome, empresa, nivel, faixa_salarial_de, faixa_salarial_ate, regime, id]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao atualizar a oportunidade no DB.' });
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