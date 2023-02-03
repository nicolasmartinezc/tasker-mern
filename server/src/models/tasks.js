const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    completed: Boolean
})

module.exports = mongoose.model('tasks', taskSchema)