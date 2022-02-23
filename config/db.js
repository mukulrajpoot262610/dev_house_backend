const mongoose = require("mongoose")


const DBConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('opne', () => {
        console.log('DB connected...')
    })

}

module.exports = DBConnect