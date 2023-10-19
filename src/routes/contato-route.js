const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contato-controller');

router.get('/get', contatoController.get);
router.post('/post', contatoController.post);
router.delete('/delete', contatoController.delete); 
router.put('/update', contatoController.put); 

module.exports = router;
