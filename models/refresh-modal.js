const mongoose = require("mongoose");

const refreshSchema = new mongoose.Schema({
    token: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }

}, {
    timestamps: true
})

module.exports = mongoose.model("Refresh", refreshSchema, 'tokens')