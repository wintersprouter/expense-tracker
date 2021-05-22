const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth')

const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('warning_msg', '請先登入才能使用！')
  res.redirect('/login')
}

router.use('/', users)
router.use('/auth', auth)
router.use('/', authenticated, home)
router.use('/records', authenticated, records)

module.exports = router
