const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const userSchema = mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tasks: [
        {
            title: String,
            description: String,
            date: String,
            completed: Boolean
        }
    ]
})

// title: String,
// description: String,
// date: String,
// completed: Boolean

module.exports = mongoose.model('user', userSchema)
