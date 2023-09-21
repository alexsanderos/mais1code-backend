const express = require('express');
const router = express.Router();
const personagemController = require('../controllers/personagem-controller');

router.get('/get', personagemController.get); //Rota Get
router.post('/post', personagemController.post); //Rota Post
router.delete('/delete/:id', personagemController.delete); //Rota Delete
router.put('/update/:id', personagemController.put); //Rota Update

module.exports = router;

