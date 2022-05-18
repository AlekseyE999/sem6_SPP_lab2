const fs = require('fs')

exports.readToJSON = function (path) {
    let data = fs.readFileSync(path, "utf8")
    return JSON.parse(data)
}

exports.writeToJSON = function (path, obj) {
    const data = JSON.stringify(obj, null, 2)
    fs.writeFileSync(path, data)
    return data
} 