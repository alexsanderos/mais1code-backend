const clientBase = require('../db/db');

exports.obterContatos = async() => {
    try {
        return clientBase.query(`SELECT * FROM contatos ORDER BY id`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.criarContato = async(id, nome, email, cidade, estado, telefone, assunto, mensagem) => {
    try {
        return clientBase.query(`INSERT INTO contatos (id, nome, email, cidade, estado, telefone, assunto, mensagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [id, nome, email, cidade, estado, telefone, assunto, mensagem]);
    } catch (error) {
        console.error(error);
        throw error;        
    }
}

exports.excluirContato = async(id) => {
    try {
        return clientBase.query(`DELETE FROM contatos WHERE id = $1`, [id]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

exports.atualizarContato = async(assunto, mensagem, id) => {
    try {
        return clientBase.query(`UPDATE contatos SET assunto = $1, mensagem = $2 WHERE id = $3`,[assunto, mensagem, id]);
    } catch (error) {
        console.error(error);
        throw error;
    }
}