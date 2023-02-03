const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user: String,
    password: String,
    tasks: Array
})

module.exports = mongoose.model('user', userSchema)
