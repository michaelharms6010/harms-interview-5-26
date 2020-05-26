const router = require("express").Router()
const bcrypt = require("bcryptjs")
const emailRegex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i
const Users = require("./users-model");

router.post("/", (req,res) => {
    const errors = []
    const user = req.body;
    if (user.password !== user.confirmation) {
        errors.push("username is required.")
    } if (!emailRegex.test(user.username)) {
        errors.push("please provide a valid email :)")
    } 
    
    if (errors.length) {
        res.status(400).json({errors})
    }
    else { 
        user.password = bcrypt.hashSync(user.password, 12);
        delete user.confirmation
        Users.add(user)
            .then(user => {
                delete user.password;
                res.status(201).json({data: null})
            })
            .catch(err => {
                res.status(500).json({error: "error inserting user"})
            })
    }
})