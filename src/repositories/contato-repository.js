const clientBase = require('../db/db');

exports.obterContatos = async() => {
    return clientBase.query(`SELECT * FROM contatos ORDER BY id`);
};

exports.criarContato = async() => {
    return clientBase.query(`INSERT INTO contatos (id, nome, email, cidade, estado, telefone, assunto, mensagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [id, nome, email, cidade, estado, telefone, assunto, mensagem]);
}