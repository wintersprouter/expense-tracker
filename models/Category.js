const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  icon: {
    type: String
  },
  className: {
    type: String
  },
  records: [{
    type: Schema.Types.ObjectId,
    ref: 'Record'
  }]
})

module.exports = mongoose.model('Category', categorySchema)
