const routes = require("express").Router();

const listController = require("./controllers/listController");

const taskController = require("./controllers/taskController");

routes.get("/", (req, res) => {
  res.redirect("/home");
});

routes.get("/home", taskController.getAllTasks);

routes.get("/task/:id", taskController.getTaskByid);

routes.post("/task", taskController.createNewTask);

// Esse metodo retorna apenas Json

routes.post("/task/update", taskController.updateTaskById);

routes.post("/task/:id/delete", taskController.deleteTaskById);

routes.post("/task/:id/toggle", taskController.toggleStatusTask);

routes.get("/completed", taskController.getCompleteTasks);

routes.get("/lists", listController.renderAllLists);

routes.get("/lists/all", listController.getAllLists);

routes.get("/lists/:id/tasks", listController.renderAllTaskByList);

routes.get("/lists/:id", listController.getListByid);

routes.post("/lists", listController.createNewList);

routes.post("/lists/:id/delete", listController.deleteListById);

routes.post("/lists/update", listController.updateListById);

module.exports = routes;
