const express = require('express')
const userRoutes = require('./routes/user')
require('./connect_db')

const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use('/api', userRoutes).listen(3000)