const Category = require('../Category')
const categoryList = require('./categoryList.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(
    {
      "category": "home",
      "categoryIcon": "fas fa-home"
    },
    {
      "category": "transportation",
      "categoryIcon": "fas fa-shuttle-van"
    },
    {

      "category": "entertainment",
      "categoryIcon": "fas fa-grin-beam"
    },
    {

      "category": "food",
      "categoryIcon": "fas fa-utensils"
    },
    {
      "category": "other",
      "categoryIcon": "fas fa-pen"
    },
  )
  console.log('done')
})