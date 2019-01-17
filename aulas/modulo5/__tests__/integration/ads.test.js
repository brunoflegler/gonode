const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai
chai.use(chaiHttp)

const server = require('../../src/index')
const factories = require('../factories')
const Ad = mongoose.model('Ad')
const User = mongoose.model('User')

describe('POST advertising /ads', () => {
  beforeEach(async () => {
    await Ad.deleteMany()
    await User.deleteMany()
  })

  it('It should be able create new advertising', async () => {
    const user = await factories.create('User')
    const token = User.generateToken(user)

    const advertising = await factories.attrs('Ad')
    const response = await chai
      .request(server)
      .post('/ads')
      .set('Authorization', `Bearer ${token}`)
      .send(advertising)

    expect(response.body).to.be.property('title')
  })
})
