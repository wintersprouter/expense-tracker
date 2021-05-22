const express = require('express')
const router = express.Router()
const homeController = require('../../controllers/homeController')

router.get('/', homeController.getHomePage)
router.get('/filter', homeController.filterRecords)

module.exports = router
