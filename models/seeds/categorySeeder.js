if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../Category')
const db = require('../../config/mongoose')

const categories = [
  ['家居物業', 'fa-home', 'home'],
  ['交通出行', 'fa-shuttle-van', 'traffic'],
  ['休閒娛樂', 'fa-grin-beam', 'entertainment'],
  ['餐飲食品', 'fa-utensils', 'food'],
  ['其他', 'fa-pen', 'other']
].map(category => ({
  title: category[0],
  icon: `fas ${category[1]}`,
  className: category[2]
}))
db.once('open', async () => {
  try {
    await Category.create(categories)
    console.log('insert category done...')
    await db.close()
    console.log('database connection close...')
  } catch (err) {
    console.log(err)
  }
})
