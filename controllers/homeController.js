const Category = require('../models/Category')
const Record = require('../models/Record')
const { getTotalAmount } = require('../public/javascripts/getTotalAmount')

const homeController = {

  getHomePage: (req, res) => {
    const userId = req.user._id
    let months = []
    for (i = 0; i < 12; i++) {
      months.push({ month: `${i + 1}` })
    }
    Category.find()
      .lean()
      .sort({ _id: 'asc' })
      .then(categories => {
        Record.find({ userId })
          .populate('category')
          .lean()
          .sort({ date: 'desc' })
          .then(records => {
            const totalAmountText = getTotalAmount(records)
            records.forEach(record => {
              record.date = record.date.toJSON().substr(0, 10)
            })
            res.render('index', { records, totalAmountText, categories, months })
          }).catch(error => res.status(404))
      }).catch(error => res.status(404))
  },

  filterRecords: (req, res) => {
    const filteredCategory = req.query.category // selected category title
    const filteredMonth = Number(req.query.month) - 1
    const filteredMonthText = req.query.month
    const filter = {
      userId: req.user._id
    }

    let months = []
    for (i = 0; i < 12; i++) {
      months.push({ month: `${i + 1}` })
    }

    if (filteredMonth >= 0) {
      const today = new Date()
      const thisYear = today.getUTCFullYear()
      // month:0-11
      let startTime = new Date(thisYear, filteredMonth, 1)
      let endTime = new Date(thisYear, filteredMonth, 31)
      filter.date = {
        $gte: startTime,
        $lte: endTime
      }
    }

    Category.find({})
      .lean()
      .sort({ _id: 'asc' })
      .then((categories) => {
        categories.forEach(category => {
          if (filteredCategory.includes(category.title)) {
            filter.category = category._id
          }
        })
        Record.find(filter)
          .populate('category')
          .lean()
          .sort({ date: 'desc' })
          .then(records => {
            const totalAmountText = getTotalAmount(records)
            records.forEach(record => {
              record.date = record.date.toJSON().substr(0, 10)
            })
            return res.render('index', { records, totalAmountText, categories, months, filteredCategory, filteredMonthText })
          })
          .catch(error => res.status(404))
      })
      .catch(error => res.status(404))
  }
}

module.exports = homeController
