const List = require("../models/list");
const path = require("path");
const { Task } = require("../models");
const statusController = require('../controllers/statusController')

// const WebRequestError = require("../util/error");
module.exports = {
  renderAllLists: async (req, res, next) => {
    try {
      let lists = await List.findAll();
      res
        .status(200)
        .render(path.join(__dirname, "../views/pages/listas.ejs"), {
          lists,
          percentage: await statusController.buildStatusInfos()
        });
    } catch (err) {
      next(err);
    }
  },

  renderAllTaskByList: async (req, res, next) => {
    const { id } = req.params;
    try {
      let list = await List.findByPk(id);
      let incompleteTasks = await Task.findAll({
        where: { isDone: false, list_id: id },
      });
      let completeTasks = await Task.findAll({
        where: { isDone: true, list_id: id },
      });
      completeTasks = statusController.setStatusCompleteTasks(completeTasks)
      incompleteTasks = statusController.setStatusIncompleteTasks(incompleteTasks)
      res.status(200).render(path.join(__dirname, "../views/pages/index.ejs"), {
        incompleteTasks,
        completeTasks,
        list: list.get(),
        percentage: await statusController.buildStatusInfos()
      });
    } catch (err) {
      next(err);
    }
  },

  getAllLists: async (req, res, next) => {
    try {
      let lists = await List.findAll();
      res.status(200).send(lists);
    } catch (err) {
      next(err);
    }
  },
  createNewList: async (req, res, next) => {
    try {
      let newList = List.build({ title: "Edite sua nova lista" });
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
      let list = await List.findByPk(id);

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
      let task = await List.findByPk(id);
      task.destroy();
      res.redirect("back");
    } catch (err) {
      next(err);
    }
  },
};
