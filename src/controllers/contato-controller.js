const { Server } = require('http');
var contatoRepository = require('../repositories/contato-repository');

exports.get = async(req, res) => {
    try {
        const resultSelect = await contatoRepository.obterContatos();
        res.status(200).send({message: 'Contato obtido com sucesso!.', data: resultSelect.rows}
    );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao consultar o contato.'});
    }
}

exports.post = async (req, res) => {
    try {
        const conteudo = req.body;
        const resultItem = await contatoRepository.criarContato(conteudo.id, conteudo.nome, conteudo.email, conteudo.cidade, conteudo.estado, conteudo.telefone, conteudo.assunto, conteudo.mensagem);
        res.status(201).send({ message: 'Contato criado com sucesso!.', data: resultItem});
    } catch (error) {
        console.error(error);
        res.status(501).json({ error: 'Ocorreu um erro ao criar o contato.'});
    }
}

exports.delete = async (req, res) => {
    try {
        const resultItem = await contatoRepository.excluirContato(req.params.id);
        res.status(202).json({ message: 'Contato excluido com sucesso!.', data: resultItem});
    } catch (error) {
        console.error(error);
        res.status(502).json({ error: 'Ocorreu um erro ao tentar excluir o contato.'});
    }
}

exports.put = async(req, res) => {
    try {
         const conteudo = req.body;
         const resultItem = await contatoRepository.atualizarContato(conteudo.assunto, conteudo.mensagem, conteudo.id);
         res.status(203).json({ message: 'Contato atualizado com sucesso!.', data: resultItem});
    } catch (error) {
        console.error(error);
        res.status(5003).json({ error: 'Ocorreu um erro ao atualizar o contato.'});
    }
}