const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";

const { database, username, password, host, port, dialect } =
  require(__dirname + "/../config/config.json")[env];

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
});

module.exports = sequelize;
