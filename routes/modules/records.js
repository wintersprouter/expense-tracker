const express = require('express')
const router = express.Router()
const recordController = require('../../controllers/recordController')

router.get('/new/expense', recordController.getAddExpenseRecordPage)
router.get('/new/income', recordController. getAddIncomeRecordPage)
router.post('/expense', recordController.addExpenseRecord)
router.post('/income', recordController. addIncomeRecord)
router.get('/:id/edit', recordController.getEditPage)
router.put('/:id', recordController.updateRecord)
router.delete('/:id', recordController.deleteRecord)

module.exports = router
