if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Type = require('../Type')
const Category = require('../Category')
const db = require('../../config/mongoose')

const SEED_EXPENSE_CATEGORIES = [
  ['家居物業', 'fa-home'],
  ['交通出行', 'fa-shuttle-van'],
  ['休閒娛樂', 'fa-grin-beam'],
  ['餐飲食品', 'fa-utensils'],
  ['其他支出', 'fa-pen']
].map(expense => ({
  title: expense[0],
  icon: `fas ${expense[1]}`
}))
const SEED_INCOME_CATEGORIES = [
  ['薪水收入', 'fa-briefcase'],
  ['獎金收入', 'fa-award'],
  ['投資理財', 'fa-piggy-bank'],
  ['零用錢', 'fa-coins'],
  ['其他收入', 'fa-hand-holding-usd']
].map(income => ({
  title: income[0],
  icon: `fas ${income[1]}`
}))

db.once('open', async () => {
  try {
    const types = await Type.find().lean().sort({ _id: 'asc' })
    const typesId = types.map(type => type._id)
    SEED_INCOME_CATEGORIES.forEach(category => {
      category.typeId = typesId[0]
    })
    SEED_EXPENSE_CATEGORIES.forEach(category => {
      category.typeId = typesId[1]
    })
    const SEED_CATEGORIES = SEED_INCOME_CATEGORIES.concat(SEED_EXPENSE_CATEGORIES)
    await Category.create(SEED_CATEGORIES)
    console.log('insert category done...')
    await db.close()
    console.log('database connection close...')
  } catch (err) {
    console.log(err)
  }
})
