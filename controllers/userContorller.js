const User = require('../models/User')
const bcrypt = require('bcryptjs')

const userController = {
  getLoginPage: (req, res) => {
    res.render('login')
  },
  userLogin: (req, res) => {
    req.flash('success_msg', '成功登入！')
    res.redirect('/')
  },
  getRegisterPage: (req, res) => {
    res.render('register')
  },
  userRegister: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    if (confirmPassword !== password) {
      req.flash('error_msg', '兩次密碼輸入不同！')
      return res.redirect('/register')
    } else {
      User.findOne({ email }).then(user => {
        if (user) {
          req.flash('error_msg', '此信箱已存在')
          return res.redirect('register')
        } else {
          return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash =>
              User.create({
                name,
                email,
                password: hash
              }))
            .then(user => {
              req.flash('success_msg', '成功註冊帳號！')
              return res.redirect('/login')
            })
            .catch(error => res.status(404))
        }
      })
    }
  },
  userLogout: (req, res) => {
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/login')
  }
}
module.exports = userController
