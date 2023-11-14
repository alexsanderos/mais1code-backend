const express = require('express');
const app = express();
const depoimentoRoutes = require('./routes/depoimento-route');
const contatosRoutes = require('./routes/contato-route');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, *');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/depoimentos', depoimentoRoutes);
app.use('/api/contatos', contatosRoutes);
module.exports = app;