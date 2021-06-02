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
    let { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!email || !password || !confirmPassword) {
      errors.push({ message: '請填寫信箱與密碼欄位。' })
    }
    if (confirmPassword !== password) {
      errors.push({ message: '密碼與確認密碼不相符！' })
      password = ''
      confirmPassword = ''
    }
    User.findOne({ email }).then(user => {
      if (user) {
        errors.push({ message: '此會員信箱已註冊！' })
        email = ''
      }
      if (errors.length) {
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
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
          req.flash('success_msg', `${email} 成功註冊帳號！`)
          return res.redirect('/login')
        })
        .catch(error => res.status(404))
    })
  },
  userLogout: (req, res) => {
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/login')
  }
}
module.exports = userController
