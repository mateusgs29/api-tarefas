const express = require("express")
const bodyParser = require('body-parser')

const roteadorTasks = require("./src/routes/tasks.routes")

const NotFound = require("./src/errors/NotFound")
const InvalidField = require("./src/errors/InvalidField")
const DataNotProvided = require("./src/errors/DataNotProvided")

const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use('/tarefas', roteadorTasks)

app.use((err,  req, res, next) => {
  let status = 500

  if (err instanceof NotFound) status = 404
  if (err instanceof InvalidField || err instanceof DataNotProvided) status = 400

  res.status(status).json({ mensagem: err.message })
})

app.listen(port, () => console.log("API FUNCIONANDO..."))