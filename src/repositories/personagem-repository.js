//const clientBase = require('../db/db');

exports.obterTodosPersonagens = async ()  => {
    return { rows: [
        {id: 1, nome: 'Diane Nguyen', descricao: 'Ela é a caneta de BoJack. Uma intelectual incompreendida...'}
    ]};
};