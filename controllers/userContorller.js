const User = require('../models/User')

let userController = {
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
  userRegister:(req, res) => {
    const { name, email, password, confirmPassword } = req.body
    User.findOne({ email }).then(user => {
      if (user) {
        req.flash('warning_msg', '此信箱已存在')
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
      .then(() => res.redirect('/login'))
      .catch(err => res.status(404))
    })
  },
  userLogout:(req, res) => {
    req.logout()
    res.redirect('/login')
  },
} 
module.exports = userController