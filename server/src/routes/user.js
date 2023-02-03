const userSchema = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
require('dotenv').config()

const TOKEN_KEY = process.env.TOKEN_KEY

router.post('/register', (req, res) => {
    const { user, password } = req.body
    const passwordHash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
    const newAccount = userSchema({
        "user": user,
        "password": passwordHash,
        "tasks": []
    })
    userSchema.findOne({ user })
        .then(data => { 
            if(data === null){
                newAccount.save()
                    .then(data => res.json(false))
                    .catch(error => res.json({ message: "Error al crear la cuenta" }))
            } else res.json(true)
        }).catch(error => res.json({ message: "Ha ocurrido un error inesperado" }))
})

router.post('/login', (req, res) => {
    const { user, password } = req.body
    userSchema.findOne({ user })
        .then(data => {
            if(data === null) res.status(400).json(false)
            else{
                const compare = bcryptjs.compareSync(password, data.password)
                if (compare) {
                    const token = jwt.sign({
                        user: user,
                        userId: data.id,
                        task: data.tasks
                        }, TOKEN_KEY,{ expiresIn: "24h"
                    })
                    const newData = {
                        id: data.id,
                        user: user,
                        task: data.tasks,
                        token: token
                    }
                    res.status(200).json(newData)
                } else {
                    res.status(400).json(false)
                }
            }
        }).catch(error => console.log(error))
})

router.post('/verify-token', (req, res) => {
    const token = req.headers['authorization']
    if (token === '') return res.status(200).json(null)
    jwt.verify(token, TOKEN_KEY, (err, user) => {
        if(err) res.status(403).json(null)
        else res.status(200).json(user)
    })
})

module.exports = router