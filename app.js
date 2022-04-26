const express = require('express')
const multer = require("multer")
const moment = require('moment')
const Task = require('./task')
const fs = require('fs')

const port = 3333
const dataPath = 'data.json'
const idPath = 'id.json'

const jsonParser = express.json()
const app = express()

app.use(
    express.static(__dirname + "/views/public"))
app.use(
    express.static(__dirname))
app.use(
    multer({ dest: "uploads" }).single("task-files"))


function readToJSON(path) {
    let data = fs.readFileSync(path, "utf8")
    return JSON.parse(data)
}

function writeToJSON(path, obj) {
    const data = JSON.stringify(obj, null, 2)
    fs.writeFileSync(path, data)
    return data
}

app.get("/tasks", function (req, res) {
    console.log(req.url)
    res.send(readToJSON(dataPath))
})

let lastFile

app.post("/upload", function (req, res, next) {
    console.log(req.file)
    lastFile = req.file
    next();
})

app.post("/tasks", jsonParser, function (req, res) {
    if (!req.body)
        return res.sendStatus(404)
    let ids = readToJSON(idPath)
    let data = readToJSON(dataPath)

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

    writeToJSON(idPath, ids)
    res.send(writeToJSON(dataPath, data))
})

app.put("/tasks/complete/:taskId", jsonParser, function (req, res) {
    if (!req.body)
        return res.sendStatus(404)
    let data = readToJSON(dataPath)

    const taskId = req.params.taskId
    const index = data.tasks.findIndex(x => x.id == parseInt(taskId))
    data.tasks[index].isComplete = true

    console.log(req.body)

    writeToJSON(dataPath, data)
    res.send(writeToJSON(dataPath, data))
})

app.delete("/tasks/:taskId", function (req, res) {
    const taskId = req.params.taskId
    let data = readToJSON(dataPath)

    data.tasks = data.tasks.filter(x => x.id !== parseInt(taskId))

    res.send(writeToJSON(dataPath, data))
})

app.listen(port)
