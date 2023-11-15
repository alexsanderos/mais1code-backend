const { Client } = require('pg');
const config = require('../config/config');

const client = new Client({
    user: process.env.DATABASE_USER || config.database.user,
    host: process.env.DATABASE_HOST || config.database.host,
    database: process.env.DATABASE_NAME || config.database.database,
    password: process.env.DATABASE_PASSWORD || config.database.password,
    port: process.env.DATABASE_PORT || config.database.port,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();
module.exports = client;