const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6'

mongoose.connect(url).then(()=>{
  console.log('connected')
})

module.exports = mongoose