const { db } = require('./db')

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const PORT =  '35.224.83.202'

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