const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  merchant: {
    type: String
  },
  amount: {
    type: Number,
    min: [1, 'at least one dollar'],
    required: true
  },
  totalAmount: {
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
})
module.exports = mongoose.model('Record', recordSchema)
