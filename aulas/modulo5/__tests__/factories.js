const mongoose = require('mongoose')
const factoryGirl = require('factory-girl')
const faker = require('faker')

const { factory } = factoryGirl

factory.setAdapter(new factoryGirl.MongooseAdapter())

/**
 * User
 */

factory.define('User', mongoose.model('User'), {
  name: faker.name.findName(),
  username: factory.seq('User.username', u => `user_${u}`),
  email: factory.seq('User.email', u => `user_${u}@email.com`),
  password: faker.internet.password()
})

/**
 * Advertising
 */

factory.define('Ad', mongoose.model('Ad'), {
  title: faker.commerce.productName,
  description: faker.commerce.productAdjective,
  price: faker.commerce.price
  //  author: factory.assoc('User', '_id')
})

module.exports = factory
