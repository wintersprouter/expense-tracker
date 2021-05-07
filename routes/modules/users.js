const express = require('express')
const router = express.Router()
const User = require('../../models/User')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {
})
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, account, password, confirmPassword } = req.body
  User.findOne({$or:[{email},{account}]}).then(user => {
    if (user) {
      console.log('使用者已存在！')
      return res.render('register', {
        name,
        email,
        account,
        password,
        confirmPassword
      })
    } return User.create({
        name,
        email,
        account,
        password
      })
      .then(() => res.redirect('/'))
      .catch(err => res.status(404))
  })
})

module.exports = router