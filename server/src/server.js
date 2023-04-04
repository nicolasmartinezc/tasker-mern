const express = require('express')
const userRoutes = require('./routes/user')
const bodyParse = require("body-parser")
require('./connect_db')

const app = express()
const PORT = process.env.PORT || 3977

const cors = require('cors')
app.use(cors({ origin: 'https://elnico91.github.io' }))

app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())

app.use(express.json())
app.use('/api', userRoutes).listen(PORT, ()=> {
    console.log(`Servidor listo en el puerto ${PORT}`);
})