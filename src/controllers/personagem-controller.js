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
        const {id, nome, depoimento} = req.body;
        const resultItem = await personagemRepository.criarPostagem(id, nome, depoimento);
        res.status(201).json({ message: 'Postagem criada com sucesso', data: resultInsert});
        
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao criar a postagem'});
    }
};