const Record = require('../models/Record')
const Category = require('../models/Category')
// const categories = require('../models/seeds/category.json').results

let recordController = {

  getAddRecordPage:(req,res) => {
    Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })
    .catch(error => res.status(404))
  },

  addRecord: (req,res) => {
    const userId = req.user._id
    const record = req.body

    let icon = categories.find(category => category.category_ch === record.category_ch).categoryIcon

    record.categoryIcon = icon

    let en = categories.find(category => category.category_ch === record.category_ch).category

  record.category = en

  if (record.merchant.length === 0) {
    record.merchant = '其他'
  }

  Record.create({ record, userId })
    .then(() => res.redirect('/'))
    .catch(error => res.status(404))
  },

  getEditPage: (req,res) => {
    const userId = req.user._id
    const _id = req.params.id
    Category.find()
    .lean()
    .then(categories => {
      return Record.findOne({ _id, userId })
      .lean()
      .then((record) => res.render('edit', { record, categories }))
    })
    .catch(error => res.status(404))
  },

  updateRecord: (req,res) => {
    const userId = req.user._id
    const _id = req.params.id
    const records = req.body
    
    let icon = categories.find(category => category.category_ch === records.category_ch).categoryIcon
    records.categoryIcon = icon
    let en = categories.find(category => category.category_ch === records.category_ch).category
    records.category = en
    if (records.merchant.length === 0) {
      records.merchant = '其他'}
    
    return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, records)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => res.status(404))
  },
  deleteRecord: (req,res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => res.status(404))
  }
}  
module.exports = recordController