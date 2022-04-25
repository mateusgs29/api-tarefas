const Task = require('../repository/TasksRepository')

module.exports = {
  async lists(req, res, next) {
    try {
      const tasks = await Task.findAll()
      res.status(200).json(tasks)
    } catch (err) {
      next(err)
    }
  },

  async create(req, res, next) {
    try {
      const { titulo, data } = req.body
      const task = new Task({titulo, data, estaCompleta: false })
      await task.create()
      res.status(201).json()
    } catch (err) {
      next(err)
    }
  },

  async updateOne(req, res, next) {
    try {
      const data = req.body
      const task = new Task(data)
      await task.update()
      res.status(200).json({ status: "ok", message: "Tarefa atualizada com sucesso!" })
    } catch (err) {
      next(err)
    }
  },

  async delete(req, res, next) {
    try {
      const id = req.params.id
      const task = new Task({ id })
      await task.delete()
      res.status(200).json({ status: "ok", message: "Tarefa deletada com sucesso!" })
    } catch (err) {
      next(err)
    }
  }
}