const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')

router.get('/new', (req, res) => {
  res.render('new', { Category })
})
router.post('/', (req, res) => {
  const record = req.body
  return Record.create(record)
    .then(() => res.redirect('./'))
    .catch(error => console.log(error))
})

module.exports = router