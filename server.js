require('dotenv').config()
const express = require('express');
const router = require('./routes');
const app = express()
const DBConnect = require('./config/db')
app.use(express.json({ limit: '5mb' }))
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000']
}
app.use(cors(corsOption))

DBConnect()

const PORT = process.env.PORT || 5000;

app.use(router)

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello there' })
})

app.listen(PORT, () => {
    console.log('Server is running...')
})