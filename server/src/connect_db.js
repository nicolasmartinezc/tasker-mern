const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', true)
const connection = mongoose.connect('process.env.DB')
                    .then(()=> console.log('Connect MongoDB'))
                    .catch(error => console.log(`Error:  ${error}`))

module.exports = connection
