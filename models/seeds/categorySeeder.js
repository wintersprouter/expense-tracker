const Category = require('../Category')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(
    {
      "category": "Home",
      "category_ch": "家居物業",
      "categoryIcon": "fas fa-home"
    },
    {
      "category": "Transportation",
      "category_ch": "交通出行",
      "categoryIcon": "fas fa-shuttle-van"
    },
    {

      "category": "Entertainment",
      "category_ch": "休閒娛樂",
      "categoryIcon": "fas fa-grin-beam"
    },
    {

      "category": "Food",
      "category_ch": "餐飲食品",
      "categoryIcon": "fas fa-utensils"
    },
    {
      "category": "Other",
      "category_ch": "其他 ",
      "categoryIcon": "fas fa-pen"
    },
  ).then(() => {
    console.log('insert category done...')
    return db.close()
  }).then(() => {
    console.log('database connection close...')
  })
})