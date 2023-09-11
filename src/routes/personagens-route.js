const express = require('express');
const router = express.Router();
const personagemController = require('../controllers/personagem-controller');

router.get('/', personagemController.get);

module.exports = router;

