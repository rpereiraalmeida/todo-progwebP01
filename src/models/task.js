const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../database/db");

const Task = sequelize.define(
  "Task",
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
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    date_limit: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    list_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "task",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = Task;
