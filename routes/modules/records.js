const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
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
  if (req.body.merchant.length === 0) {
    req.body.merchant = '其他'
  }
  if (req.body.category_ch === '其他') {
    req.body.category = 'Other'
  }
  if (req.body.category_ch === '家居物業') {
    req.body.category = 'Home'
  }
  if (req.body.category_ch === '交通出行') {
    req.body.category = 'Transportation'
  }
  if (req.body.category_ch === '休閒娛樂') {
    req.body.category = 'Entertainment'
  }
  if (req.body.category_ch === '餐飲食品') {
    req.body.category = 'Food'
  }

  const record = req.body
  return Record.create(record)

    .then(() => res.redirect('/'))
    .catch(error => console.log('error!'))
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
  if (req.body.merchant.length === 0) {
    req.body.merchant = '其他'
  }
  if (req.body.category_ch === '家居物業') {
    req.body.category = 'Home'
  }
  if (req.body.category_ch === '交通出行') {
    req.body.category = 'Transportation'
  }
  if (req.body.category_ch === '休閒娛樂') {
    req.body.category = 'Entertainment'
  }
  if (req.body.category_ch === '餐飲食品') {
    req.body.category = 'Food'
  }
  if (req.body.category_ch === '其他') {
    req.body.category = 'Other'
  }
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
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