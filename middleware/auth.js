const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const RRjson = require("../utils/JSON.js");

const usersPath = 'users.json'
const tokenKey = 'b91028378997c0b3581821456edefd0ec';

exports.auth = async function (req, res, next) {
    console.log("token = " + req.cookies.token)
    try {
        let decoded = jwt.verify(req.cookies.token, tokenKey)
        let users = RRjson.readToJSON(usersPath)
        let user = users.find(u => u.login === decoded.login)
         req.logged = user !== undefined && await bcrypt.compare(decoded.password, user.hashedPassword)
    } catch {
         req.logged = false
    }  
    next();
}