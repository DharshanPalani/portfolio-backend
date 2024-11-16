const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const posts_query = 'SELECT * FROM post';
const recentWorks_query = 'SELECT * FROM recent_work'

app.use(cors());

app.get('/post', async (req, res) => {
    try {
        const result = await pool.query(posts_query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/recent_work', async (req, res) => {
    try {
        const result = await pool.query(recentWorks_query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(8081, () => {
    console.log('Server is up and listening');
});
