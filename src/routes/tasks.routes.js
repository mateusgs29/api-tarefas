const roteador = require('express').Router()
const TasksController = require('../controllers/TasksController')

roteador.route('/')
  .get(TasksController.lists)
  .post(TasksController.create)
  .put(TasksController.updateOne)

roteador.route('/:id')
  .delete(TasksController.delete)

module.exports = roteador