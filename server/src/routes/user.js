const userSchema = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
require('dotenv').config()

const TOKEN_KEY = process.env.TOKEN_KEY

router.post('/register', (req, res) => {
    const { user, password } = req.body
    const passwordHashed = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
    const newAccount = userSchema({
        "user": user,
        "password": passwordHashed,
    })
    userSchema.findOne({ user })
        .then(data => { 
            if(data === null){
                newAccount.save()
                    .then(data => res.json({ success: true, message: "Cuenta creada exitosamente" }))
                    .catch(error => res.json({ success: false, message: "Error al crear la cuenta" }))
            } else res.json({ success: false, message: "Usuario ya creado" })
        }).catch(error => res.json({ success: false, message: "Ha ocurrido un error inesperado, por favor intentelo mas tarde" }))
})

router.post('/login', (req, res) => {
    const { user, password } = req.body
    userSchema.findOne({ user })
        .then(data => {
            if(data !== null){
                const compare = bcryptjs.compareSync(password, data.password)
                if (compare) {
                    const token = jwt.sign({
                        user: user,
                        userId: data.id,
                        task: data.tasks
                        }, TOKEN_KEY,{ expiresIn: "24h"
                    })
                    res.status(200).json({ success: true, token: token })
                } else {
                    res.status(400).json({ success: false, message: 'Usuario o contraseña incorrectos' })
                }
            } else {
                res.status(400).json({ success: false, message: 'Usuario o contraseña incorrectos' })
            }
        }).catch(error => res.status(400).json({ success: false, message: 'Ha ocurrido un error inesperado' }))
})

router.post('/verify-token', (req, res) => {
    const token = req.headers['authorization']
    if (token === '') return res.status(200).json(null)
    jwt.verify(token, TOKEN_KEY, (err, user) => {
        if(err) res.status(403).json(null)
        else res.status(200).json(user)
    })
})

router.post('/new-task', (req, res) => {
    const { id, title, description, date, completed } = req.body
    const taskSchema = {
        title: title,
        description: description,
        date: date,
        completed: completed
    }
    userSchema.findOneAndUpdate({ _id: id }, { $push: { tasks: taskSchema } }, (error, success) => {
        if(error) res.status(400).json(false) // Ocurrio un error al agregar una nueva tarea
        else res.status(200).json(true) // Exito
    })
})

router.post('/completed-task', (req, res) => {
    const { userId, taskId } = req.body
    const date = new Date
    const currentDate = date.toLocaleString()
    userSchema.findOneAndUpdate({ _id: userId, 'tasks._id': taskId }, 
    { $set: { 'tasks.$.date': currentDate, 'tasks.$.completed': true } }, 
    (error, success) => {
        if(error) res.status(400).json(false) // Ocurrio un error al cambiar de estado la tarea
        else res.status(200).json(true) // Exito
    })
})

router.post('/delete-task', (req, res) => {
    const { userId, taskId } = req.body
    userSchema.findOneAndUpdate( { _id: userId, 'tasks._id': taskId},
    { $pull: { 'tasks': {'_id': taskId } } }, 
    (error, success) => {
        console.log(error)
        if(error) res.status(400).json(true) // Ocurrio un error al cambiar de estado la tarea
        else res.status(200).json(false) // Exito
    })
})

router.get('/get-tasks', (req, res) => {
    const { userId } = req.query
    userSchema.findById( { _id: userId }).then(({ tasks }) => {
        res.json(tasks)
    })
    .catch(error => res.json([]))
    
})

module.exports = router