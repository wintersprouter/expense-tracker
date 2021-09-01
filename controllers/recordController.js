const Record = require('../models/Record')
const Category = require('../models/Category')

const recordController = {

  getAddRecordPage: async (req, res) => {
    try {
      const categories = await Category.find()
        .lean()
        .sort({ _id: 'asc' })
      res.render('new', { categories })
    } catch (err) {
      console.log(err)
    }
  },

  addRecord: async (req, res) => {
    try {
      const newRecord = req.body
      if (newRecord.merchant.length === 0) {
        newRecord.merchant = '其他'
      }
      newRecord.userId = req.user._id

      const [category, record] = await Promise.all([
        Category.findOne({ _id: newRecord.category }), Record.create(newRecord)
      ])
      req.flash('success_msg', `已成功新增${record.name}的記錄!`)
      return res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  },

  getEditPage: async (req, res) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const [record, categories] = await Promise.all([Record.findOne({ _id, userId }).populate('category').lean(), Category.find().lean().sort({ _id: 'asc' })])
      record.date = record.date.toJSON().substr(0, 10)
      return res.render('edit', { record, categories })
    } catch (err) {
      console.log(err)
    }
  },

  updateRecord: async (req, res) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const updateRecord = req.body

      if (updateRecord.merchant.length === 0) {
        updateRecord.merchant = '其他'
      }
      await Promise.all([Category.findOne({ _id: updateRecord.category }), Record.findOneAndUpdate({ _id, userId }, updateRecord)])
      req.flash('success_msg', '已成功修改此筆記錄!')
      return res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  },
  deleteRecord: async (req, res) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const record = await Record.findOneAndDelete({ _id, userId })
      req.flash('success_msg', ` ${record.name}此筆記錄已成功刪除!`)
      res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = recordController
