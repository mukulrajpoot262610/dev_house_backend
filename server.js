require('dotenv').config()

const express = require('express')

const app = express()

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello there' })
})

app.listen(PORT, () => {
    console.log('Server is running...')
})