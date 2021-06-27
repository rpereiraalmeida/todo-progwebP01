const List = require("../models/list");
const path = require("path");
const { Task } = require("../models");
const statusPainelController = require('../controllers/statusPainelController')

// const WebRequestError = require("../util/error");
module.exports = {
  renderAllLists: async (req, res, next) => {
    try {
      const lists = await List.findAll();
      res
        .status(200)
        .render(path.join(__dirname, "../views/pages/listas.ejs"), {
          lists,
          percentage: await statusPainelController.buildStatusInfos()
        });
    } catch (err) {
      next(err);
    }
  },

  renderAllTaskByList: async (req, res, next) => {
    const { id } = req.params;
    const dateNow = Date.now()
    try {
      const list = await List.findByPk(id);
      const incompleteTasks = await Task.findAll({
        where: { isDone: false, list_id: id },
      });
      const completeTasks = await Task.findAll({
        where: { isDone: true, list_id: id },
      });

      completeTasks.forEach((task, index) => {
        task.setDataValue('status', 'Completa')
        task.setDataValue('statusColor', '#4CAF50')
        
        completeTasks[index] = task
      })
      incompleteTasks.forEach((task, index) => {
        if(task.date_limit == null){
          task.setDataValue('status', 'Pendente')
          task.setDataValue('statusColor', '#FFEB3B')
          return
        }
        if (new Date(task.date_limit).getTime() > dateNow) {
          task.setDataValue('status', 'Pendente')
          task.setDataValue('statusColor', '#FFEB3B')
        } else {
          task.setDataValue('status', 'Atrasada')
          task.setDataValue('statusColor', '#F44336')
        }
        incompleteTasks[index] = task
      })
      res.status(200).render(path.join(__dirname, "../views/pages/index.ejs"), {
        incompleteTasks,
        completeTasks,
        list: list.get(),
        percentage: await statusPainelController.buildStatusInfos()
      });
    } catch (err) {
      next(err);
    }
  },

  getAllLists: async (req, res, next) => {
    try {
      const lists = await List.findAll();
      res.status(200).send(lists);
    } catch (err) {
      next(err);
    }
  },
  createNewList: async (req, res, next) => {
    try {
      const newList = List.build({ title: "Edite sua nova lista" });
      await newList.save();
    } catch (err) {
      next(err);
    }
    res.status(200).redirect("back");
  },

  getListByid: async (req, res, next) => {
    let { id } = req.params;
    try {
      let task = await List.findByPk(id);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  },

  updateListById: async (req, res, next) => {
    const { id, title, description } = req.body;

    console.log(description);

    try {
      const list = await List.findByPk(id);

      list.title = title;

      list.description = description;

      await list.save();

      res.redirect("back");
    } catch (err) {
      next(err);
    }
  },
  deleteListById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const task = await List.findByPk(id);
      task.destroy();
      res.redirect("back");
    } catch (err) {
      next(err);
    }
  },
};
