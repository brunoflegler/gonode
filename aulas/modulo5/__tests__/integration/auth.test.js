const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
/* const sinon = require('sinon')
const nodemailer = require('nodemailer')

const transport = {
  sendMail: sinon.spy()
}

sinon.stub(nodemailer, 'createTransport').returns(transport)
 */
const { expect } = chai
chai.use(chaiHttp)

const server = require('../../src/index')
const factories = require('../factories')
const User = mongoose.model('User')

describe('POST authenticate /users', () => {
  beforeEach(async () => {
    await User.deleteMany()
  })

  describe('Sign up', () => {
    it('it should be able to sign up', async () => {
      const user = await factories.attrs('User')

      const response = await chai
        .request(server)
        .post('/users')
        .send(user)

      expect(response.body).to.have.property('_id')
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('email')
      expect(response.body).to.have.property('password')
      /* expect(transport.sendMail.calledOnce).to.be.true */
    })

    it('it should be able to sign up with email duplicated', async () => {
      const user = await factories.create('User')
      const user2 = await factories.attrs('User', { email: user.email })

      const response = await chai
        .request(server)
        .post('/users')
        .send(user2)

      expect(response).to.have.status(400)
      expect(response.body).to.have.property('error')
    })
  })

  describe('Sign in', () => {
    it('it should be able to authenticate with valid crendentials', async () => {
      const user = await factories.create('User', { password: '123456' })

      const response = await chai
        .request(server)
        .post(`/sessions`)
        .send({
          email: user.email,
          password: '123456'
        })
      expect(response.body).to.have.property('token')
    })

    it('It should not be able to signin with no exist user', async () => {
      const response = await chai
        .request(server)
        .post(`/sessions`)
        .send({
          email: 'teste@gmail.com',
          password: '123456'
        })
      expect(response).to.have.status(400)
      expect(response.body).to.have.property('error')
    })

    it('It should not be able to signin with error password', async () => {
      const user = await factories.create('User', { password: '123456' })

      const response = await chai
        .request(server)
        .post(`/sessions`)
        .send({
          email: user.email,
          password: '123'
        })
      expect(response).to.have.status(400)
      expect(response.body).to.have.property('error')
    })
  })
})
