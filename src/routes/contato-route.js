const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contato-controller');

router.get('/get', contatoController.get); //Rota Get
router.post('/post', contatoController.post); //Rota Post
router.delete('/delete', contatoController.delete); //Rota Delete
router.put('/update', contatoController.put); //Rota Update

module.exports = router;
