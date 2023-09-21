const clientBase = require('../db/db');

try {
    exports.obterPostagens = async() => {
        return clientBase.query(`SELECT * FROM depoimentos ORDER BY id`);
    };
} catch (error) {
    console.error(error);
    throw error;
}
 
try {
    exports.criarPostagem = async(nome, depoimento) => {
        return clientBase.query(`INSERT INTO depoimentos (nome, depoimento) values ($1, $2)`, [nome, depoimento]);
    };
} catch (error) {
    console.error(error);
    throw error;
}

try {
    exports.excluirPostagem = async(id) => {
        return clientBase.query(`DELETE FROM depoimentos WHERE id = $1`, [id]);
    };
} catch (error) {
    console.error(error);
    throw error;
}

exports.atualizarPostagem = async(depoimento, id) => {
    console.log(depoimento, id);
    return clientBase.query(`UPDATE depoimentos SET depoimento = $1 WHERE id = $2`, [depoimento, id]);
}