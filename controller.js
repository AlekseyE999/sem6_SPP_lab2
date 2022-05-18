const moment = require('moment')
const Task = require('./task')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dataPath = 'data.json'
const idPath = 'id.json'
const usersPath = 'users.json'
const tokenKey = 'b91028378997c0b3581821456edefd0ec';

const RRjson = require("./utils/JSON.js");

let lastFile 

exports.getTasks = function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    
    console.log(req.url)
    
    res.send(RRjson.readToJSON(dataPath))
}

exports.addTask = function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    if (!req.body)
        return res.sendStatus(404)
    let ids = RRjson.readToJSON(idPath)
    let data = RRjson.readToJSON(dataPath)
    
    ids.taskId = ids.taskId + 1;
    if (req.body.name === "") {
        req.body.name = `New task-${ids.taskId}`
    }
    if (req.body.expires === "") {
        req.body.expires = moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
    }
    
    const task = new Task(ids.taskId, req.body.name, req.body.expires, req.body.description, req.body.status, lastFile)
    data.tasks.push(task)
    
    console.log("POST task")
    console.log(req.body)
    
    RRjson.writeToJSON(idPath, ids)
    res.send(RRjson.writeToJSON(dataPath, data))
}

exports.singIn = async function (req, res) {
    console.log("body in sign in middleware" + req.body)
    let users = RRjson.readToJSON(usersPath)
    let user = users.find(u => u.login === req.body.login)
    if (user !== undefined) {
        const match = await bcrypt.compare(req.body.password, user.hashedPassword)
        if (match) {
            let token = jwt.sign(req.body, tokenKey)
            console.log("generated token = " +token)
            res.cookie('token', token, { httpOnly: true })
            res.send(RRjson.readToJSON(dataPath))
        }
        else {
            res.status(401).json({ message: 'Bad password' })
        }
    } else {
        res.status(401).json({ message: 'Not authorized' })
    }
}

exports.signUp = function (req, res) {
    console.log(req.body)
    let users = RRjson.readToJSON(usersPath)
    let user = users.find(u => u.login === req.body.login)
    if (user === undefined) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        users.push({ login: req.body.login, hashedPassword: hashedPassword })
        let token = jwt.sign(req.body, tokenKey)
        res.cookie('token', token, { httpOnly: true })
        RRjson.writeToJSON(usersPath, users)
        res.send(RRjson.readToJSON(dataPath))
    } else {
        res.status(401).json({ message: 'Not authorized' })
    }
}

exports.deleteTask = function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    const taskId = req.params.taskId
    let data = RRjson.readToJSON(dataPath)
    
    data.tasks = data.tasks.filter(x => x.id !== parseInt(taskId))
    
    res.send(RRjson.writeToJSON(dataPath, data))
}

exports.file = function (req, res, next) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    console.log(req.file)

    lastFile = req.file
    next();
}