const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const query = 'SELECT * FROM post';

app.use(cors());

app.get('/', async (req, res) => {
    try {
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(8081, () => {
    console.log('Server is up and listening');
});
