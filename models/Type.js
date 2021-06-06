const mongoose = require('mongoose')
const Schema = mongoose.Schema
const typeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  records: [{
    type: Schema.Types.ObjectId,
    ref: 'Record'
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
})

module.exports = mongoose.model('Type', typeSchema)
