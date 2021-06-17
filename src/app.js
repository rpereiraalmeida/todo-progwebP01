const express = require('express')
const routes = require('./routes')
const models = require('./models/models')
const sequelize = require('./database/db')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('', routes)

const { SERVER_PORT } = process.env


app.use((err, req, res, next) => {
    res.render(path.join(__dirname, 'views/err/404.ejs'), {
        status: err.status,
        message: err.message
    })
})

sequelize.sync()
    .then(response => {
        console.log('Banco de dados atualizado com sucesso');
        app.listen(SERVER_PORT, () => {
            console.log('Servidor rodando na porta:', SERVER_PORT);
        })
    })