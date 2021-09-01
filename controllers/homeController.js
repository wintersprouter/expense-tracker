const Category = require('../models/Category')
const Record = require('../models/Record')
const { getTotalAmount } = require('../public/javascripts/getTotalAmount')

const homeController = {

  getHomePage: async (req, res) => {
    try {
      const userId = req.user._id
      const months = []
      for (let i = 0; i < 12; i++) {
        months.push({ month: `${i + 1}` })
      }
      const [categories, records] = await Promise.all([Category.find().lean().sort({ _id: 'asc' }), Record.find({ userId }).populate('category').lean().sort({ date: 'desc' })])
      const totalAmountText = getTotalAmount(records)
      records.forEach(record => {
        record.date = record.date.toJSON().substr(0, 10)
      })
      return res.render('index', { records, totalAmountText, categories, months })
    } catch (err) {
      console.log(err)
    }
  },

  filterRecords: async (req, res) => {
    try {
      const filteredCategory = req.query.category
      const filteredMonth = Number(req.query.month) - 1
      const filteredMonthText = req.query.month
      const filter = {
        userId: req.user._id
      }

      const months = []
      for (let i = 0; i < 12; i++) {
        months.push({ month: `${i + 1}` })
      }

      if (filteredCategory !== 'all') {
        filter.category = filteredCategory
      }

      if (filteredMonth >= 0) {
        const today = new Date()
        const thisYear = today.getUTCFullYear()
        const startTime = new Date(thisYear, filteredMonth, 1)
        const endTime = new Date(thisYear, filteredMonth, 31)
        filter.date = {
          $gte: startTime,
          $lte: endTime
        }
      }
      const [categories, records] = await Promise.all([
        Category.find({}).lean().sort({ _id: 'asc' }), Record.find(filter).populate('category').lean().sort({ date: 'desc' })
      ])

      categories.forEach(category => {
        category._id = JSON.stringify(category._id).slice(1, -1)
      })
      const totalAmountText = getTotalAmount(records)
      records.forEach(record => {
        record.date = record.date.toJSON().substr(0, 10)
      })
      let noRecord = false
      if (records.length === 0) noRecord = true
      return res.render('index', { records, totalAmountText, categories, months, filteredCategory, filteredMonthText, noRecord })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = homeController
