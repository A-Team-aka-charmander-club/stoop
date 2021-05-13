require('dotenv').config()

const { db } = require('./db')

const path = require('path')

const PORT = 8080

const app = require('./app')

const init = async () => {
  try {
    await db.sync()
    app.listen(PORT)
  } catch (ex) {
    console.log(ex)
  }
}

init()