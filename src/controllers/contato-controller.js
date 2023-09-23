const { Server } = require('http');
var contatoRepository = require('../repositories/contato-repository');

exports.get = async(req, res) => {
    try {
        const resultSelect = await contatoRepository.obterContatos();
        res.status(200).send({message: 'Contato obtido com sucesso!.', data: resultSelect.arows}
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
