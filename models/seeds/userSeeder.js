const db = require('../../config/mongoose')
const User = require('../User')
const Record = require('../Record')
const Category = require('../Category')
const recordList = require('../seeds/record.json')
const bcrypt = require('bcryptjs')

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
        // const categoryId = category._id
        console.log( 'userId', userId  )
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => Record.create(
            {
              ...recordList.results[(i + (index * 3))], userId 
            })
        ))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })
})