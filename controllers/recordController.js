const Record = require('../models/Record')
const Category = require('../models/Category')

const recordController = {

  getAddRecordPage: (req, res) => {
    Category.find()
      .lean()
      .sort({ _id: 'asc' })
      .then(categories => {
        res.render('new', { categories })
      })
      .catch(error => res.status(404))
  },

  addRecord: (req, res) => {
    const record = req.body
    if (record.merchant.length === 0) {
      record.merchant = '其他'
    }
    Category.findOne({ title: record.category })
      .then(category => {
        record.userId = req.user._id
        record.category = category._id
        Record.create(record)
          .then(record => {
            req.flash('success_msg', `已成功新增${record.name}的記錄!`)
            return res.redirect('/')
          })
          .catch(error => res.status(404))
      })
      .catch(error => res.status(404))
  },

  getEditPage: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Record.findOne({ _id, userId })
      .populate('category')
      .lean()
      .then(record => {
        record.date = record.date.toJSON().substr(0, 10)
        Category.find()
          .lean()
          .sort({ _id: 'asc' })
          .then(categories => res.render('edit', { record, categories }))
          .catch(error => res.status(404))
      })
      .catch(error => res.status(404))
  },

  updateRecord: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const record = req.body

    if (record.merchant.length === 0) {
      record.merchant = '其他'
    }

    Category.findOne({ title: record.category })
      .then(category => {
        record.category = category._id
        return Record.findOneAndUpdate({ _id, userId }, record)
          .then(record => {
            req.flash('success_msg', '已成功修改此筆記錄!')
            return res.redirect('/')
          })
          .catch(error => res.status(404))
      })
      .catch(error => res.status(404))
  },
  deleteRecord: (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Record.findOneAndDelete({ _id, userId })
      .then(record => {
        req.flash('success_msg', ` ${record.name}此筆記錄已成功刪除!`)
        res.redirect('/')
      })
      .catch(error => res.status(404))
  }
}
module.exports = recordController
