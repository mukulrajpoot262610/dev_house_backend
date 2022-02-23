require('dotenv').config()
const express = require('express');
const router = require('./routes');
const app = express()
const DBConnect = require('./config/db')
app.use(express.json())

DBConnect()

const PORT = process.env.PORT || 5000;

app.use(router)

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello there' })
})

app.listen(PORT, () => {
    console.log('Server is running...')
})