const Category = require('../Category')
const db = require('../../config/mongoose')
const category = require('../seeds/category.json').results

db.once('open', () => {
  const categories = []
  category.forEach(category => {
    categories.push(category)
  })
  Category.create(categories)
    .then(() => {
      console.log('insert category done...')
      return db.close()
    }).then(() => {
      console.log('database connection close...')
    })
})