const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', true)
const connection = mongoose.connect(process.env.MONGODB_URL)
                    .then(()=> console.log('Connect MongoDB'))
                    .catch(error => console.log(`Error:  ${error}`))

module.exports = connection