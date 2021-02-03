const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const { getTotalAmount } = require('../../public/javascripts/getTotalAmount')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const totalAmountText = getTotalAmount(records)
      res.render('index', { records, totalAmountText })
    })
    .catch(error => console.error(error))
})

module.exports = router