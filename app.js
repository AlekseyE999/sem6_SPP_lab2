const express = require('express')
const multer = require("multer")
const cookieParser = require('cookie-parser')

const Controller = require("./controller.js");
const Auth = require("./middleware/auth.js");

const port = 3333

const jsonParser = express.json()
const app = express()

app.use(
    express.static(__dirname + "/views/public"))
app.use(
    express.static(__dirname))
app.use(
    multer({ dest: "uploads" }).single("task-files"))

app.use(cookieParser())

app.use(Auth.auth)

app.get("/tasks", Controller.getTasks)

app.post("/upload", Controller.file)

app.post("/tasks", jsonParser, Controller.addTask)

app.post("/signIn", jsonParser, Controller.singIn)

app.post("/signUp", jsonParser, Controller.signUp) 

app.delete("/tasks/:taskId", Controller.deleteTask)

app.listen(port, () => console.log("Server started"))
