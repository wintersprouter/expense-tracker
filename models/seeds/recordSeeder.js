const Record = require('../Record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create({
    "name": "租金",
    "date": 2019 / 04 / 01,
    "category": "home",
    "categoryIcon": "fas fa-home",
    "merchant": "房東",
    "amount": 25000,
  },
    {
      "name": "電影:驚奇隊長",
      "date": 2019 / 04 / 23,
      "category": "entertainment",
      "categoryIcon": "fas fa-grin-beam",
      "merchant": "信義威秀",
      "amount": 220,
    },
    {
      "name": "捷運",
      "date": 2019 / 04 / 23,
      "category": "transportation",
      "categoryIcon": "fas fa-shuttle-van",
      "merchant": "捷運",
      "amount": 120,
    },
    {
      "name": "晚餐",
      "date": 2019 / 04 / 23,
      "category": "food",
      "categoryIcon ": "fas fa-utensils",
      "merchant": "八方雲集",
      "amount": 80,
    },
    {
      "name": "午餐",
      "date": 2019 / 04 / 23,
      "category": "food",
      "categoryIcon ": "fas fa-utensils",
      "merchant": "麥當勞",
      "amount": 120,
    })
  console.log('done')
})