const Category = require('../Category')
const db = require('../../config/mongoose')

const categories = [
  ['家居物業', 'fa-home', 'home'],
  ['交通出行', 'fa-shuttle-van', 'transportation'],
  ['休閒娛樂', 'fa-grin-beam', 'entertainment'],
  ['餐飲食品', 'fa-utensils', 'food'],
  ['其他', 'fa-pen','other']
].map(category => ({
  category_ch: category[0],
  categoryIcon: `<i class="fas ${category[1]}"></i>`,
  category:category[2],
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