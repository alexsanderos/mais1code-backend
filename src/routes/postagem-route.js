const express = require('express');
const router = express.Router();
const postagemController = require('../controllers/postagem-controller');

router.get('', postagemController.get);
router.post('', postagemController.post);
router.delete('', postagemController.delete);
router.put('', postagemController.put);

module.exports = router;

