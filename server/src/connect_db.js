const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', true)
const connection = mongoose.connect('mongodb+srv://elnico91:superAdmin@tasker.u3iqxdp.mongodb.net/test')
                    .then(()=> console.log('Connect MongoDB'))
                    .catch(error => console.log(`Error:  ${error}`))

module.exports = connection