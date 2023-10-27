const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contato-controller');

router.get('', contatoController.get);
router.post('', contatoController.post);
router.delete('', contatoController.delete); 
router.put('', contatoController.put); 

module.exports = router;
