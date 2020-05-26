const db = require("../data/db-config")

module.exports = {
    add,
    getAll,
    findBy,

}

function add(user) {
    return db("users").insert(user).returning("*")
}

function getAll() {
    return db("users")
}

function findBy(filter) {
    return db('users').where(filter)
}