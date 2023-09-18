const clientBase = require('../db/db');

exports.obterPostagens = async ()  => {
    return clientBase.query(`SELECT * FROM depoimentos ORDER BY id`);
};

exports.criarPostagem = async (id, nome, depoimento) => {
    try{

        const query = `INSERT INTO depoimentos (id, nome, depoimento) VALUES (id, nome, depoimento)`;
        const result = await clientBase.query(query, [id, nome, depoimento]);
        return result.rows;
    }catch (error){
        console.error(error);
        throw error;
    }     
}

/** exports.criarPostagem = async (id, nome, depoimento)  => {
    return clientBase.query(`INSERT INTO depoimentos (id, nome, depoimento) values (id, nome, meu depoimento)`);
};
**/