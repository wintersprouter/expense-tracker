const mongoose = require('mongoose')
const Schema = mongoose.Schema
const typeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  title_Ch: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Type', typeSchema)
