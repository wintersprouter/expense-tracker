const Category = require('../Category')
const categoryList = require('./categoryList.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < categoryList.length; i++) {
    Category.create({
      category: categoryList[i].name,
      categoryIcon: categoryList[i].icon,
    })
  }
  console.log('done')
})