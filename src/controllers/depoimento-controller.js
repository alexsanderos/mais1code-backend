const { Server } = require('http');
var depoimentoRepository = require('../repositories/depoimento-repository');

exports.get = async (req, res) => {
    try {
        const resultSelect = await depoimentoRepository.obterDepoimento();
        res.status(200).send({ data: resultSelect.rows }
    );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao consultar a postagem.'});
    }
}

exports.post = async (req, res) => {
    try{
        const conteudo = req.body;
        const resultItem = await depoimentoRepository.criarDepoimento(conteudo.nome, conteudo.depoimento);
        res.status(201).json({ data: resultItem});

    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao criar a postagem.'});
    }
}
exports.delete = async (req, res) => {
    try {
        const conteudo = req.body;
        const resultItem = await depoimentoRepository.excluirDepoimento(conteudo.id);
        res.status(202).json({ data: resultItem});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao excluir a postagem.'});
    }
}

exports.put = async(req, res) => {
    try {
        var conteudo = req.body;
        var resultItem = await depoimentoRepository.atualizarDepoimento(conteudo.depoimento, conteudo.id);
    res.status(203).json({ data: resultItem});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar a postagem.'});
    }
}