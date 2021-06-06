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
  typeId:{
    type: Schema.Types.ObjectId,
    ref: 'Type'
  },
  records: [{
    type: Schema.Types.ObjectId,
    ref: 'Record'
  }]
})

module.exports = mongoose.model('Category', categorySchema)
