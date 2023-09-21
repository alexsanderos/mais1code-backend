const express = require('express');
const router = express.Router();
const postagemController = require('../controllers/postagem-controller');

router.get('/get', postagemController.get); //Rota Get
router.post('/post', postagemController.post); //Rota Post
router.delete('/delete/:id', postagemController.delete); //Rota Delete
router.put('/update', postagemController.put); //Rota Update

module.exports = router;

