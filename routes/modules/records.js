const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const categories = require('../../models/seeds/category.json').results
//create new record page
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })
    .catch(error => console.error(error))
})
//update a new record
router.post('/', (req, res) => {
  const record = req.body

  let icon = categories.find(category => category.category_ch === record.category_ch).categoryIcon
  record.categoryIcon = icon

  let en = categories.find(category => category.category_ch === record.category_ch).category
  record.category = en

  if (record.merchant.length === 0) {
    record.merchant = '其他'
  }

  Record.create(record)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Category.find()
    .lean()
    .then(categories => {
      return Record.findById(id)
        .lean()
        .then((record) => res.render('edit', { record, categories }))
    })
    .catch(error => console.error(error))
})
//update new edit
router.put('/:id', (req, res) => {
  const id = req.params.id
  const records = req.body

  let icon = categories.find(category => category.category_ch === records.category_ch).categoryIcon
  records.categoryIcon = icon

  let en = categories.find(category => category.category_ch === records.category_ch).category
  records.category = en

  if (records.merchant.length === 0) {
    records.merchant = '其他'
  }
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, records)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//delete record
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router