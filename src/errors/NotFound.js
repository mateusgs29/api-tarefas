class NotFound extends Error {
  constructor (name) {
    const mensagem = `${name} não foi encontrado!`
    super(mensagem)
     this.name = 'NotFound'
     this.id = 0
  }
}

module.exports = NotFound