const express = require('express');
const router = express.Router();
const oportunidadesController = require('../controllers/oportunidades-controller');

router.get('/get', oportunidadesController.get);
router.post('/post', oportunidadesController.post);
router.delete('/delete', oportunidadesController.delete);
router.put('/update', oportunidadesController.put);

module.exports = router;