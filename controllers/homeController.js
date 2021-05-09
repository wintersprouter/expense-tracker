const Category = require('../models/Category')
const Record = require('../models/Record')
const { getTotalAmount } = require('../public/javascripts/getTotalAmount')


let homeController = {

  getHomePage: ( req,res ) => {
    const userId = req.user._id
    Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      Record.find({ userId }) 
      .populate('category')
      .lean()
      .sort({ date: 'desc' })
      .then(records => {
        const totalAmountText = getTotalAmount(records)
        res.render('index', { records, totalAmountText, categories })
      }).catch(error => res.status(404))
    }).catch(error => res.status(404))
  },
  
}

module.exports = homeController