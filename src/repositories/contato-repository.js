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
};

const MAX_CARACTERES_NOME = 150;
const MAX_CARACTERES_EMAIL = 150;
const MAX_CARACTERES_CIDADE = 150;
const MAX_CARACTERES_ESTADO = 150;
const MAX_CARACTERES_ASSUNTO = 150;
const MAX_CARACTERES_MENSAGEM = 255;

const validarDados = (valor, max) => {
    if (valor.length > max) {
        throw new Error(`O valor "${valor}" é inválido, pois temos o limite de ${max} caracteres.`);
    } else if (valor.length < 3){
        throw new Error(`O valor "${valor}" é inválido, pois ele deve ser maior de 3 digitos.`);
    } 
};
const validarTelefone = (valor) => {
    if (valor.length != 11){
        throw new Error(`O telefone deve possuir 11 digitos.`);
    }
};

exports.criarContato = async(nome, email, cidade, estado, telefone, assunto, mensagem) => {
    validarDados(email, MAX_CARACTERES_EMAIL);
    validarDados(nome, MAX_CARACTERES_NOME);
    validarDados(cidade, MAX_CARACTERES_CIDADE);
    validarDados(estado, MAX_CARACTERES_ESTADO);
    validarDados(assunto, MAX_CARACTERES_ASSUNTO);
    validarDados(mensagem, MAX_CARACTERES_MENSAGEM);
    validarTelefone(telefone);

    try {
        return await clientBase.query(`INSERT INTO contatos (nome, email, cidade, estado, telefone, assunto, mensagem) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [nome, email, cidade, estado, telefone, assunto, mensagem]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Ocorreu um erro ao inserir o contato no DB.'});
        throw error;
    }
};

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