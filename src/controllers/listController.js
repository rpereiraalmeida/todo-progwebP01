const List = require("../models/list");

const path = require("path");

// const WebRequestError = require("../util/error");
module.exports = {
  getAllLists: async (req, res, next) => {
    try {
      const lists = await List.findAll();
      res
        .status(200)
        .render(path.join(__dirname, "../views/pages/listas.ejs"), {
          lists,
        });
    } catch (err) {
      next(err);
    }
  },
  // };
  // exports.getCompleteTasks = async (req, res, next) => {
  //   try {
  //     const completeTasks = await Task.findAll({ where: { isDone: true } });
  //     res
  //       .status(200)
  //       .render(path.join(__dirname, "../views/pages/tarefas-concluidas.ejs"), {
  //         completeTasks,
  //       });
  //   } catch (err) {
  //     next(err);
  //   }
  // };

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
      let task = await List.findByPk(id, { include: "task" });
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  },

  updateListById: async (req, res, next) => {
    const { id, title, description } = req.body;

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

  // exports.toggleStatusTask = async (req, res, next) => {
  //   let { id } = Object.assign({}, req.params, req.body);
  //   try {
  //     const task = await Task.findByPk(id);
  //     task.isDone = !task.isDone;
  //     task.save();
  //     res.redirect("back");
  //   } catch (err) {
  //     next(err);
  //   }
};
