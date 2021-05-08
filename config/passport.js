const User = require('../models/User')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const LocalStrategy = require('passport-local').Strategy
module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  
  passport.use(new LocalStrategy({ 
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  } , (req, email, password, done) => {
    User.findOne({ email })
    .then(user => {
      if (!user) {
        req.flash('warning_msg', '帳號或密碼輸入錯誤')
        return done(null, false)
      } 
      return bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          req.flash('warning_msg', '帳號或密碼輸入錯誤')
          return done(null, false)
        }
        return done(null, user)
      })
    })
    .catch(err => done(err, false))  
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}