const mongoose = require('mongoose')
const databaseSetup = () => {
  mongoose.connect(
    process.env.mongoString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) {
        throw err
      }
      console.log('Database connected')
    }
  )
}

module.exports = databaseSetup