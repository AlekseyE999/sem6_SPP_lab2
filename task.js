class Task {
    constructor(id, name, expires, description, status, file) {
        this.id = id;
        this.name = name;
        this.expires = expires;
        this.description = description;
        this.status = status;
        this.file = file;
    }
}

module.exports = Task