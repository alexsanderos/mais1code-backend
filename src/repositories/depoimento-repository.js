const clientBase = require('../db/db');

exports.obterDepoimento= async() => {
    try {
        return clientBase.query(`SELECT * FROM depoimentos ORDER BY id`);
    }catch (error) {
        console.error(error);
        throw error;
    }
}

exports.criarDepoimento = async(nome, depoimento) => {
    try {
        return clientBase.query(`INSERT INTO depoimentos (nome, depoimento) values ($1, $2)`, [nome, depoimento]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao inserir o contato no DB.'});
        throw error;
    }
}
exports.excluirDepoimento = async(id) => {
    try {
        return clientBase.query(`DELETE FROM depoimentos WHERE id = $1`, [id]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao excluir o contato no DB.'});
    }
}

exports.atualizarDepoimento = async(depoimento, id) => {
    try {
        return clientBase.query(`UPDATE depoimentos SET depoimento = $1 WHERE id = $2`, [depoimento, id]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao atualizar o contato no DB.'});
    }
}