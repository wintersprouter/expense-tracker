const Record = require('../Record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create({
    "name": "租金",
    "date": "2019-04-01",
    "category": "home",
    "category_ch": "家居物業",
    "categoryIcon": "fas fa-home",
    "merchant": "房東",
    "amount": 25000,
  },
    {
      "name": "電影:驚奇隊長",
      "date": "2019-04-23",
      "category": "entertainment",
      "category_ch": "休閒娛樂",
      "categoryIcon": "fas fa-grin-beam",
      "merchant": "信義威秀",
      "amount": 220,
    },
    {
      "name": "捷運",
      "date": "2019-04-23",
      "category": "transportation",
      "category_ch": "交通出行",
      "categoryIcon": "fas fa-shuttle-van",
      "merchant": "捷運",
      "amount": 120,
    },
    {
      "name": "晚餐",
      "date": "2019-04-23",
      "category": "food",
      "category_ch": "餐飲食品",
      "categoryIcon ": "fas fa-utensils",
      "merchant": "八方雲集",
      "amount": 80,
    },
    {
      "name": "午餐",
      "date": "2019-04-23",
      "category": "food",
      "category_ch": "餐飲食品",
      "categoryIcon ": "fas fa-utensils",
      "merchant": "麥當勞",
      "amount": 120,
    })
  console.log('done')
})