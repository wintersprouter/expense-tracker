const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login',  passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({email}).then(user => {
    if (user) {
      console.log('使用者已存在！')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } return User.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/users/login'))
      .catch(err => res.status(404))
  })
})

module.exports = router