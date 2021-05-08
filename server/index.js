const { db } = require('./db')
// const PORT = process.env.PORT || 1900
const PORT =  19006

const app = require('./app')

const init = async () => {
  try {
    await db.sync()
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT)
  } catch (ex) {
    console.log(ex)
  }
}

init()