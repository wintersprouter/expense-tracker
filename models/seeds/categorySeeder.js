if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../Category')
const db = require('../../config/mongoose')

const categories = [
  ['家居物業', 'fa-home'],
  ['交通出行', 'fa-shuttle-van'],
  ['休閒娛樂', 'fa-grin-beam'],
  ['餐飲食品', 'fa-utensils'],
  ['其他', 'fa-pen']
].map(category => ({
  title: category[0],
  icon: `fas ${category[1]}`,
}))
db.once('open', () => {
  Category.create(categories)
    .then(() => {
      console.log('insert category done...')
      return db.close()
    }).then(() => {
      console.log('database connection close...')
    })
})