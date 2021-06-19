// Configura o envoriment
require("dotenv").config();

const path = require("path");

const express = require("express");

const routes = require("./routes");

const sequelize = require("./database/db");

// const WebRequestError = require("./util/error");

const { SERVER_PORT } = process.env;

const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("", routes);

/**
 * A quantidade de parametros faz diferença no tipo de middleware,
 * o eslint foi configurado para ignorar o parametro next
 *
 * see: https://github.com/expressjs/generator/issues/78
 * */
app.use((err, req, res, next) => {
  res.render(path.join(__dirname, "views/err/404.ejs"), {
    status: err.status,
    message: err.message,
  });
});

sequelize.sync({ logging: false }).then(() => {
  console.log("Banco de dados iniciado com sucesso");
  app.listen(SERVER_PORT, () => {
    console.log("Servidor rodando na porta:", SERVER_PORT);
  });
});
