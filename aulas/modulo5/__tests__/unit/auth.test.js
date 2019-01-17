const chai = require('chai')
const factories = require('../factories')
const sinon = require('sinon')
const authMiddleware = require('../../src/app/middlewares/auth')
const httpMock = require('node-mocks-http')
const { expect } = chai

const mongoose = require('mongoose')
const User = mongoose.model('User')

describe('Auth middleware', () => {
  it('It should be validate the presence of JWT token', async () => {
    const req = httpMock.createRequest()
    const res = httpMock.createResponse()

    await authMiddleware(req, res)

    expect(res.statusCode).to.be.eq(401)
  })

  it('It should pass if token is valid', async () => {
    const user = await factories.create('User')
    const token = User.generateToken(user)
    const req = httpMock.createRequest({
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    const res = httpMock.createResponse()
    const nextSpy = sinon.spy()

    await authMiddleware(req, res, nextSpy)
    expect(res.statusCode).to.be.eq(200)
    expect(req.user).to.include({ id: user.id })
    expect(nextSpy.calledOnce).to.be.true
  })
})
