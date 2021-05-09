const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const { getTotalAmount } = require('../../public/javascripts/getTotalAmount')
// const categories = require('../../models/seeds/category.json').results

router.get('/', (req, res) => {
  const keyword = req.query.category
  Record.find({ category: keyword })
    .lean()
    .then(records => {
      let filterOption = categories.find(category => category.category === keyword).category_ch
      const totalAmountText = getTotalAmount(records)
      res.render('index', { records, keyword, totalAmountText, categories, filterOption })
    })
    .catch(error => console.error(error))
})

module.exports = router
