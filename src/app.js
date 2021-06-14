const express = require('express')
const routes = require('./routes')
const { Sequelize } = require('sequelize');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/'));

app.use(express.static(path.join(__dirname, 'public')))

app.use('', routes)

const { SERVER_PORT, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    port: DB_PORT,
    dialect: 'postgres'
});

app.use((err, req, res, next) => {
    res.render(path.join(__dirname, 'views/err/404.ejs'), {
            status: err.status,
            message: err.message
        })
})

sequelize.authenticate().then(() => {
    console.log('Banco de dados conectado com sucesso');
    app.listen(SERVER_PORT, () => {
        console.log('Servidor rodando na porta:', SERVER_PORT);
    })
})
