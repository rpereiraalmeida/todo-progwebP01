const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../database/db");
const Task = require("./task");

const List = sequelize.define(
  "List",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "list",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

List.hasMany(Task, { as: "task", foreignKey: "list_id" });

module.exports = List;
