const routes = require('express').Router()
const path = require('path')
const taskController = require('./controllers/taskController')

routes.get('/', (req, res) => {res.redirect('/home')})

routes.get('/home', taskController.getAllTasks)

routes.get('/task/:id', taskController.getTaskByid)
routes.post('/task', taskController.createNewTask)
// Esse metodo retorna apenas Json
routes.post('/task/update', taskController.updateTaskById)
routes.post('/task/:id/delete', taskController.deleteTaskById)
routes.post('/task/:id/toggle', taskController.toggleStatusTask)

routes.get('/completed', taskController.getCompleteTasks)

routes.get('/lists', (req, res) => {
    res.render(path.join(__dirname, 'views/pages/listas.ejs'))
})

module.exports = routes