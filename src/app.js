const express = require('express');
const app = express();
const personagensRoutes = require('./routes/postagem-route');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, *');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/postagens', personagensRoutes);
module.exports = app;