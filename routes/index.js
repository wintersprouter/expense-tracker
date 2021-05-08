const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const category = require('./modules/category')
const users = require('./modules/users')

const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

router.use('/', users)  
router.use('/', authenticated, home)
router.use('/records', authenticated, records)
router.use('/records/category', authenticated, category)

module.exports = router