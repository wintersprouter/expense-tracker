const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
  },
  date: {
    type: String,
    required: true
  },
  merchant: {
    type: String,
  },
  amount: {
    type: Number,
    min: [1, 'at least one dollar'],
    required: true
  },
  totalAmount: {
    type: Number,
  },
  userId: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  categoryID:{ 
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
})
module.exports = mongoose.model('Record', recordSchema)