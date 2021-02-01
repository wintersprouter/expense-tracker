const Category = require('../Category')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(
    {
      "category": "home",
      "category_ch": "家居物業",
      "categoryIcon": "fas fa-home"
    },
    {
      "category": "transportation",
      "category_ch": "交通出行",
      "categoryIcon": "fas fa-shuttle-van"
    },
    {

      "category": "entertainment",
      "category_ch": "休閒娛樂",
      "categoryIcon": "fas fa-grin-beam"
    },
    {

      "category": "food",
      "category_ch": "餐飲食品",
      "categoryIcon": "fas fa-utensils"
    },
    {
      "category": "other",
      "category_ch": "其他 ",
      "categoryIcon": "fas fa-pen"
    },
  )
  console.log('done')
})