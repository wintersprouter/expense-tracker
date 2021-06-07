if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Type = require('../Type')
const db = require('../../config/mongoose')

const SEED_TYPE = [{
  title: 'income',
  title_Ch: '收入'
}, {
  title: 'expense',
  title_Ch: '支出'
}]
db.once('open', async () => {
  try {
    await Type.create(SEED_TYPE)
    console.log('insert type done...')
    await db.close()
    console.log('database connection close...')
  } catch (err) {
    console.log(err)
  }
})
