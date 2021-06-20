const List = require("./list");

const Task = require("./task");

List.hasMany(Task, { foreignKey: "list_id" });

Task.belongsTo(List, { foreignKey: "list_id" });

module.exports = {
  List,
  Task,
};
