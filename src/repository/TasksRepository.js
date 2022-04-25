const moment = require('moment')
const DataNotProvided = require('../errors/DataNotProvided')
const InvalidField = require('../errors/InvalidField')
const NotFound = require('../errors/NotFound')
const TaskModel = require('../models/TasksModel')

class Task {
  constructor({ id, titulo, data, estaCompleta, dataCriacao, dataAtualizacao }) {
    this.id = id
    this.titulo = titulo
    this.data = data
    this.estaCompleta = estaCompleta
    this.dataCriacao = dataCriacao
    this.dataAtualizacao = dataAtualizacao
  }

  static findAll() {
    return TaskModel.findAll({ raw: true })
  }

  async create() {
    this.validation()
    const result = await TaskModel.create(this)

    this.id = result.id
    this.dataCriacao = result.dataCriacao
    this.dataAtualizacao = result.dataAtualizacao
  }

  async getById() {
    const taskFound = await TaskModel.findOne({ where: { id: this.id } })

    if (!taskFound) {
      throw new NotFound("Tarefa")
    }

    // this.titulo = taskFound.titulo
    // this.data = taskFound.data
    // this.estaCompleta = taskFound.estaCompleta
    // this.dataCriacao = taskFound.dataCriacao
    // this.dataAtualizacao = taskFound.dataAtualizacao
  }

  async update() {
    if (!this.id) throw new NotFound("Id")
    await this.getById()

    const dataUpdated = {}

    if(typeof this.titulo === 'string' && this.titulo.length > 0) {
      dataUpdated.titulo = this.titulo
    }
    if (typeof this.estaCompleta === 'boolean') {
      dataUpdated.estaCompleta = this.estaCompleta
    }
    if (moment(this.data).isValid()) {
      dataUpdated.data = this.data
    }

    if(Object.keys(dataUpdated).length === 0) {
      throw new DataNotProvided()
    }

    await TaskModel.update(dataUpdated, { where: { id: this.id } })
  }

  async delete() {
    await this.getById()

    TaskModel.destroy({ where: { id: this.id } })
  }

  validation() {
    if(typeof this.titulo !== 'string' || this.titulo.length === 0) {
      throw new InvalidField('titulo')
    }

    if(!moment(this.data).isValid()) {
      throw new InvalidField('data')
    }
  }
}

module.exports = Task