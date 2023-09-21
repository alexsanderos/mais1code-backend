const { Server } = require('http');
var personagemRepository = require('../repositories/personagem-repository');

exports.get = async (req, res) => {
    try {
        const resultSelect = await personagemRepository.obterPostagens();
        res.status(200).send(
        { data: resultSelect.rows }
    );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao consultar a postagem'});
    }
};

exports.post = async (req, res) => {
    try{
        const conteudo = req.body;
        const resultItem = await personagemRepository.criarPostagem(conteudo.nome, conteudo.depoimento);
        res.status(201).json({ message: 'Postagem criada com sucesso', data: resultItem});
        
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao criar a postagem'});
    }
};

exports.delete = async (req, res) => {
    try {
        const resultItem = await personagemRepository.excluirPostagem(req.params.id);
        res.status(201).json({ message: 'Postagem excuida com sucesso', data: resultItem});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao excluir a postagem'});
    }
}

exports.put = async (req, res) => {
    const pegaId = req.params;
    const conteudo = req.body;
    const resultItem = await personagemRepository.updatePostagem([pegaId.id, conteudo.depoimento]);
    res.status(201).json({ message: 'Postagem modificada com sucesso', data: resultItem});
}
