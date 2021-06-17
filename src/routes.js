const routes = require('express').Router()
const path = require('path')
const taskControler = require('./controllers/taskController')

routes.get('/', (req, res) => {
    res.render(path.join(__dirname, 'views/pages/index.ejs'))
})

routes.get('/home', (req, res) => {
    res.render(path.join(__dirname, 'views/pages/index.ejs'))
})

routes.post('/newtask', taskControler.createNewTask)

routes.get('/completed', (req, res) => {
    res.render(path.join(__dirname, 'views/pages/tarefas-concluidas.ejs'))
})

routes.get('/lists', (req, res) => {
    res.render(path.join(__dirname, 'views/pages/listas.ejs'))
})

module.exports = routes