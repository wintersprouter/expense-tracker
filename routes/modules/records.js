const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')

//create new record page
router.get('/new', (req, res) => {
  res.render('new')
})
//update a new record
router.post('/', (req, res) => {
  const record = req.body
  if (record.category_ch === '家居物業') { record.category = 'home' }
  if (record.category_ch === '交通出行') { record.category = 'transportation' }
  if (record.category_ch === '休閒娛樂') { record.category = 'entertainment' }
  if (record.category_ch === '餐飲食品') { record.category = 'food' }
  if (record.category_ch === '其他') { record.category = 'other' }

  return Record.create(record)
    .then(() => res.redirect('./'))
    .catch(error => console.log(error))
})
// edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})
//update new edit
router.put('/:id', (req, res) => {
  const id = req.params.id
  if (req.body.category_ch === '家居物業') { req.body.category = 'home' }
  if (req.body.category_ch === '交通出行') { req.body.category = 'transportation' }
  if (req.body.category_ch === '休閒娛樂') { req.body.category = 'entertainment' }
  if (req.body.category_ch === '餐飲食品') { req.body.category = 'food' }
  if (req.body.category_ch === '其他') { req.body.category = 'other' }
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