const Record = require('../models/Record')
const Category = require('../models/Category')


let recordController = {

  getAddRecordPage:(req,res) => {
    Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      res.render('new', { categories })
    })
    .catch(error => res.status(404))
  },

  addRecord: (req,res) => {
    const record = req.body
    Category.findOne({ title: record.category })
    .then(category => {
      record.userId = req.user._id
      record.category = category._id
      Record.create( record )
      .then(record => {
        req.flash('success_msg', `${record.name} 已成功新增一筆記錄!`)
        return res.redirect('/')
      })
      .catch(error => res.status(404))
    })
    .catch(error => res.status(404))
  },

  getEditPage: (req,res) => {
    const userId = req.user._id
    const _id = req.params.id
    Category.findOne({ title: record.category })
    .lean()
    .sort({ _id: 'asc' })
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
    .then(record => {
      req.flash('success_msg', `${record.name} 此筆記錄已成功刪除!`)
      res.redirect('/')
    })
    .catch(error => res.status(404))
  }
}  
module.exports = recordController