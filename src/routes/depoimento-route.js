const express = require('express');
const router = express.Router();
const depoimentoController = require('../controllers/depoimento-controller');

router.get('', depoimentoController.get);
router.post('', depoimentoController.post);
router.delete('', depoimentoController.delete);
router.put('', depoimentoController.put);

module.exports = router;

