const express = require('express');
const router = express.Router();
const personagemController = require('../controllers/personagem-controller');

router.get('/', personagemController.get); //Rota Get
router.post('/', personagemController.post); //Rota Post
router.delete('/:id', personagemController.delete); //Rota Delete
module.exports = router;

