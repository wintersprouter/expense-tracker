const Type = require('../models/Type')
const Category = require('../models/Category')
const Record = require('../models/Record')
const { getTotalAmount } = require('../public/javascripts/getTotalAmount')
const { Types } = require('mongoose')

const homeController = {

  getHomePage: async (req, res) => {
    try {
      const userId = req.user._id
      const months = []
      for (let i = 0; i < 12; i++) {
        months.push({ month: `${i + 1}` })
      }
      const [types, categories, records] =
      await Promise.all([
        Type.find().lean().sort({ _id: 'asc' }),
        Category.find().populate({ path: 'typeId', select: 'title' }).lean().sort({ _id: 'asc' }),
        Record.find({ userId }).populate('category').lean().sort({ date: 'desc' })
      ])

      const expenseRecords = []
      const incomeRecords = []
      records.forEach(record => {
        record.date = record.date.toJSON().substr(0, 10)
        if (record.type === 'expense') {
          expenseRecords.push(record)
        } else {
          incomeRecords.push(record)
        }
      })

      let noRecord = false
      if (records.length === 0) noRecord = true

      const incomeAmountText = getTotalAmount(incomeRecords)
      const expenseAmountText = getTotalAmount(expenseRecords)
      const balanceAmountText = (Number(incomeAmountText) - Number(expenseAmountText)).toString()

      return res.render('index', { types, months, records, incomeAmountText, expenseAmountText, balanceAmountText, noRecord })
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
        filter.type = filteredCategory
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

      const [types, categories, records] =
      await Promise.all([
        Type.find().lean().sort({ _id: 'asc' }),
        Category.find().populate({ path: 'typeId', select: 'title' }).lean().sort({ _id: 'asc' }),
        Record.find(filter).populate('category').lean().sort({ date: 'desc' })
      ])
      const expenseRecords = []
      const incomeRecords = []
      records.forEach(record => {
        record.date = record.date.toJSON().substr(0, 10)
        if (record.type === 'expense') {
          expenseRecords.push(record)
        } else {
          incomeRecords.push(record)
        }
      })
      let noRecord = false
      if (records.length === 0) noRecord = true

      const incomeAmountText = getTotalAmount(incomeRecords)
      const expenseAmountText = getTotalAmount(expenseRecords)
      const balanceAmountText = (Number(incomeAmountText) - Number(expenseAmountText)).toString()

      return res.render('index', {
        records,
        types,
        filteredCategory,
        months,
        incomeAmountText,
        expenseAmountText,
        balanceAmountText,
        filteredMonthText,
        noRecord
      })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = homeController
