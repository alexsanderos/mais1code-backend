const { Server } = require('http');
var contatoRepository = require('../repositories/contato-repository');

exports.get = async(req, res) => {
    try {
        const resultSelect = await contatoRepository.obterContatos();
        res.status(200).send({data: resultSelect.rows}
    );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao consultar o contato.'});
    }
}

exports.post = async (req, res) => {
    try {
        const conteudo = req.body;
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        const nomeRegex = new RegExp(/[a-zA-Z\.\s]+/g);
        const telefoneRegex = new RegExp(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/);

        if(!conteudo.email || !emailRegex.test(conteudo.email) || conteudo.email > 150){
            res.status(400).json({ error: 'E-mail inválido.'});
        }
        
        if(!conteudo.nome || !nomeRegex.test(conteudo.nome) || conteudo.nome < 3){
            res.status(400).json({ error: 'Nome inválido.'});
        }
        
        if(!conteudo.telefone || !telefoneRegex.test(conteudo.telefone) || conteudo.telefone < 11){
            res.status(400).json({ error: 'Telefone inválido.'});
        }

        const resultItem = await contatoRepository.criarContato(conteudo.nome, conteudo.email, conteudo.cidade, conteudo.estado, conteudo.telefone, conteudo.assunto, conteudo.mensagem);
        res.status(200).send({data: resultItem});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao criar o contato.'});
    }
}

exports.delete = async (req, res) => {
    try {
        const conteudo = req.body;
        const resultItem = await contatoRepository.excluirContato(conteudo.id);
        res.status(200).json({ data: resultItem});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao tentar excluir o contato.'});
    }
}

exports.put = async(req, res) => {
    try {
         const conteudo = req.body;
         const resultItem = await contatoRepository.atualizarContato(conteudo.assunto, conteudo.mensagem, conteudo.id);
         res.status(200).json({ data: resultItem});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar o contato.'});
    }
}
