const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const { getTotalAmount } = require('../../public/javascripts/getTotalAmount')

router.get('/', (req, res) => {
  const keyword = req.query.category
  Record.find()
    .lean()
    .then(records => {
      return records.filter(
        (record) => {
          return record.category.includes(keyword)
        })
    })
    .then(records => {
      const totalAmountText = getTotalAmount(records)
      res.render('index', { records, keyword, totalAmountText })
    })
    .catch(error => console.error(error))
})

module.exports = router
