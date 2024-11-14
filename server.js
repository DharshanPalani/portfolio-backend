const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const dotenv = require('dotenv')

dotenv.config()

const app = express()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const query = "SELECT * FROM posts"

app.use(cors())

app.get('/', (req, res) => {
    connection.query(query, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.listen(8081, () => {
    console.log("Server is up and listening")
})