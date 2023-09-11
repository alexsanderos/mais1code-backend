var personagemRepository = require('../repositories/personagem-repository');

exports.get = async (req, res) => {
    const resultSelect = await personagemRepository.obterTodosPersonagens();

    res.status(200).send(
        { data: resultSelect.rows }
    );
};