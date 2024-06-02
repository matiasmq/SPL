const pgp = require('pg-promise')();
const { Pool } = require('pg');

const config = {
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
};

const db = pgp(config);
const pool = new Pool(config);

module.exports = { db, pool };

