const Task = require("../models/task")
const path = require('path')

exports.createNewTask = async (req, res, next) => {
    const { title, description, dateLimit, listid } = req.body || req.params
    console.log(req.body);
    const newTask = Task.build({ title, description, dateLimit })
    console.log(newTask);
    res.redirect('/home')
}