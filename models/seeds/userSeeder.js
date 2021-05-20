const bcrypt = require('bcryptjs')
const faker = require('faker')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const User = require('../User')
const Record = require('../Record')
const Category = require('../Category')

const SEED_USER = [{
  email: 'user1@example.com',
  password: '12345678'
}, {
  email: 'user2@example.com',
  password: '12345678'
}]

db.once('open', () => {
  SEED_USER.forEach((seedUser, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
      const userId = user._id
      return Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => categories.map(category => category._id))
        .then(categoriesId => {
          const SEED_RECORDS = []
            for (let i = 1; i < 11; i++) {
              SEED_RECORDS.push({
                name: faker.commerce.product(),
                category: categoriesId[i % 5],
                date:faker.date.past().toJSON().substr(0,10) ,
                amount: faker.commerce.price(),
                merchant: faker.company.companyName(),
                userId
              })
            }
          return SEED_RECORDS
        })
        .then(records => Record.create(records))
        .catch(err => console.log(err))
    })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })
})