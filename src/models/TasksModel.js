const Sequelize = require("sequelize")
const database = require('../database')

const columns = {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estaCompleta: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  }
}

const options = {
  freezeTableName: true,
  tableName: 'tarefas',
  timestamps: true,
  createdAt: 'dataCriacao',
  updateAt: 'dataAtualizacao',
}

module.exports = database.define('tarefas', columns, options)