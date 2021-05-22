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

  filterRecords: ( req,res ) => {
    const filteredCategory  = req.query.options //selected category title
    const filter = { userId: req.user._id }
  console.log(filteredCategory)
  console.log(req.user._id)
  // Category.findOne({ title:filteredCategory })
  // .lean()
  // .then((item) => {
  //   if ( filteredCategory) {
  //       filter.category = item._id
  //       console.log(item._id)
  //       console.log(filter)
  //     }
  // }) 


  return Category.find({})
    .lean()
    .then((categories) => {
      // Category.findOne({ title:filteredCategory })
      // .lean()
      // .then((item) => {
      //   if ( filteredCategory) {
      //     filter.category = item._id
      //     console.log(item._id)
      //     console.log(filter)
      // }}) 
  Record.find({ 
        filter
      })
      .then( ()=> console.log(filter))
      .populate('category')
      .lean()
      .sort({ date: 'desc' })
      // .exec()
      .then(records => {
        const totalAmountText = getTotalAmount(records)
        return res.render('index', { records, totalAmountText, categories,filteredCategory })
    })
    .catch(error => res.status(404))
  })
  .catch(error => res.status(404))
}
}

module.exports = homeController