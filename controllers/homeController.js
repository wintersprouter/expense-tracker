const Category = require('../models/Category')
const Record = require('../models/Record')
const { getTotalAmount } = require('../public/javascripts/getTotalAmount')

const homeController = {

  getHomePage: (req, res) => {
    const userId = req.user._id
    let months = []
    for ( i = 0 ; i < 12 ; i++) {
      months.push({ month: `${i + 1}`})
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
            res.render('index', { records, totalAmountText, categories, months })
          }).catch(error => res.status(404))
      }).catch(error => res.status(404))
  },

  filterRecords: (req, res) => {
    const filteredCategory = req.query.category // selected category title
    const filteredMonth = req.query.month
    let months = []
    for ( i = 0 ; i < 12 ; i++) {
      months.push({ month: `${i + 1}`})
    }

    const filter = { userId: req.user._id }
    
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
            return res.render('index', { records, totalAmountText, categories, months, filteredCategory, filteredMonth})
          })
          .catch(error => res.status(404))
      })
      .catch(error => res.status(404))
  }
}

module.exports = homeController
