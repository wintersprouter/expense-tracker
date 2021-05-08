const userController =require ('../../controllers/userContorller')
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', userController.getLoginPage)
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureRedirect: true
}) , userController.userLogin)

router.get('/logout', userController.userLogout)

router.get('/register', userController.getRegisterPage)
router.post('/register', userController.userRegister)



module.exports = router