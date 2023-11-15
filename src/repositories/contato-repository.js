const e = require('express');
const clientBase = require('../db/db');
const { jsParser } = require('swagger-autogen/src/code-parser');

exports.obterContatos = async() => {
    try {
        return clientBase.query(`SELECT * FROM contatos ORDER BY id`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}


exports.criarContato = async(nome, email, cidade, estado, telefone, assunto, mensagem) => {
    return await clientBase.query(`INSERT INTO contatos (nome, email, cidade, estado, telefone, assunto, mensagem) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [nome, email, cidade, estado, telefone, assunto, mensagem]);
}

exports.excluirContato = async(id) => {
    try {
        return clientBase.query(`DELETE FROM contatos WHERE id = $1`, [id]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao excluir o contato no DB.'});
        throw error;
    }
}

exports.atualizarContato = async(assunto, mensagem, id) => {
    try {
        return clientBase.query(`UPDATE contatos SET assunto = $1, mensagem = $2 WHERE id = $3`,[assunto, mensagem, id]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao atualizar o contato no DB.'});
        throw error;
    }
}