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

  userRegister: async (req, res) => {
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
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }

    try {
      const user = await User.findOne({ email })
      if (user) {
        req.flash('warning_msg', '此會員信箱已註冊！')
        email = ''
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      await User.create({
        name, email, password: hash
      })
      req.flash('success_msg', `${email} 成功註冊帳號！`)
      return res.redirect('/login')
    } catch (err) {
      console.log(err)
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
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
