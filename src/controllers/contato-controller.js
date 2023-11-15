var contatoRepository = require('../repositories/contato-repository');

const MAX_CARACTERES_CIDADE = 150;
const MAX_CARACTERES_ESTADO = 150;
const MAX_CARACTERES_ASSUNTO = 150;
const MAX_CARACTERES_MENSAGEM = 255;

const MIN_PADRAO = 3;

exports.get = async(req, res) => {
    try {
        const resultSelect = await contatoRepository.obterContatos();
        res.status(200).send({data: resultSelect.rows}
    );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro ao consultar o contato.'});
    }
}

exports.post = async (req, res) => {
    try {
        const conteudo = req.body;
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        const nomeRegex = new RegExp(/[a-zA-Z\.\s]+/g);
        const telefoneRegex = new RegExp(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/);

        if(!conteudo.email || !emailRegex.test(conteudo.email) || conteudo.email > 150){
            return res.status(400).json({ error: 'E-mail inválido.'});
        }
        
        if(!conteudo.nome || !nomeRegex.test(conteudo.nome) || conteudo.nome < 3){
            return res.status(400).json({ error: 'Nome inválido.'});
        }
        
        if(!conteudo.telefone || !telefoneRegex.test(conteudo.telefone) || conteudo.telefone < 11){
            return res.status(400).json({ error: 'Telefone inválido.'});
        }

        if(validarMax(conteudo.cidade, MAX_CARACTERES_CIDADE)) {
            return res.status(400).json({error: `O valor "${conteudo.cidade}" é inválido, pois temos o limite de ${MAX_CARACTERES_CIDADE} caracteres.`}); 
        }

        if(validarMin(conteudo.cidade, MIN_PADRAO)) {
            return res.status(400).json({error: `O valor "${conteudo.cidade}" é inválido, pois ele deve ser maior de ${MIN_PADRAO} digitos.`});
        }

        if(validarMax(conteudo.estado, MAX_CARACTERES_ESTADO)) {
            return res.status(400).json({error: `O valor "${conteudo.estado}" é inválido, pois temos o limite de ${MAX_CARACTERES_ESTADO} caracteres.`}); 
        }

        if(validarMin(conteudo.estado, MIN_PADRAO)) {
            return res.status(400).json({error: `O valor "${conteudo.estado}" é inválido, pois ele deve ser maior de ${MIN_PADRAO} digitos.`});
        }

        if(validarMax(conteudo.assunto, MAX_CARACTERES_ASSUNTO)) {
            return res.status(400).json({error: `O valor "${conteudo.assunto}" é inválido, pois temos o limite de ${MAX_CARACTERES_ASSUNTO} caracteres.`}); 
        }

        if(validarMin(conteudo.assunto, MIN_PADRAO)) {
            return res.status(400).json({error: `O valor "${conteudo.assunto}" é inválido, pois ele deve ser maior de ${MIN_PADRAO} digitos.`});
        }

        if(validarMax(conteudo.mensagem, MAX_CARACTERES_MENSAGEM)) {
            return res.status(400).json({error: `O valor "${conteudo.mensagem}" é inválido, pois temos o limite de ${MAX_CARACTERES_MENSAGEM} caracteres.`}); 
        }

        if(validarMin(conteudo.mensagem, MIN_PADRAO)) {
            return res.status(400).json({error: `O valor "${conteudo.mensagem}" é inválido, pois ele deve ser maior de ${MIN_PADRAO} digitos.`});
        }

        const resultItem = await contatoRepository.criarContato(conteudo.nome, conteudo.email, conteudo.cidade, conteudo.estado, conteudo.telefone, conteudo.assunto, conteudo.mensagem);
        return res.status(200).send({data: resultItem});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao criar o contato.'});
    }
}

exports.delete = async (req, res) => {
    try {
        const conteudo = req.body;
        const resultItem = await contatoRepository.excluirContato(conteudo.id);
        res.status(200).json({ data: resultItem});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao tentar excluir o contato.'});
    }
}

exports.put = async(req, res) => {
    try {
         const conteudo = req.body;
         const resultItem = await contatoRepository.atualizarContato(conteudo.assunto, conteudo.mensagem, conteudo.id);
         res.status(200).json({ data: resultItem});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar o contato.'});
    }
}

const validarMax = (valor, max) => {
    return valor && valor.length > max;
}

const validarMin = (valor, min) => {
    return !valor || valor.length < min;
}
