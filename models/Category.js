const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  category: {
    type: String,
  },
  category_ch: {
    type: String,
  },
  categoryIcon: {
    type: String,
  },
  records: [{
    type: Schema.Types.ObjectId,
    ref: 'Record'
  }]
})

module.exports = mongoose.model('Category', categorySchema)