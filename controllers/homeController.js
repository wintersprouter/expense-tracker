const Record = require('../models/Record')
const { getTotalAmount } = require('../public/javascripts/getTotalAmount')
// const categories = require('../models/seeds/category.json').results

let homeController = {

  getHomePage: ( req,res ) => {
    const userId = req.user._id
    Record.find({ userId }) 
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const totalAmountText = getTotalAmount(records)
      res.render('index', { records, totalAmountText, categories })
    })
    .catch(error => res.status(404))
  }

}

module.exports = homeController