
const models = [
  require('../models/TasksModels'),
]

async function createTables() {
  for (let count = 0; count < models.length; count++) {
    const model = models[count]
    await model.sync()
  }
}

createTables()