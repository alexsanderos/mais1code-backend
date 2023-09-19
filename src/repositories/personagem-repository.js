const clientBase = require('../db/db');

try {
    exports.obterPostagens = async ()  => {
        return clientBase.query(`SELECT * FROM depoimentos ORDER BY id`);
    };
} catch (error) {
    console.error(error);
    throw error;
}

exports.criarPostagem = async (nome, depoimento) => {
    console.log(depoimento);
    return clientBase.query(`INSERT INTO depoimentos (nome, depoimento) values ($1, $2)`, [nome, depoimento]);
};
