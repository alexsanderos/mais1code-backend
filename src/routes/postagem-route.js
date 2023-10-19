const express = require('express');
const router = express.Router();
const postagemController = require('../controllers/postagem-controller');

router.get('/get', postagemController.get);
router.post('/post', postagemController.post);
router.delete('/delete', postagemController.delete);
router.put('/update', postagemController.put);

module.exports = router;

