const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseEmail = require('../jobs/PurchaseEmail')
const Queue = require('../services/Queue')

class PurchaseController {
  async index (req, res) {
    const ads = await Purchase.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20,
        populate: ['author']
      }
    )
    res.json(ads)
  }

  async store (req, res) {
    const { ad, content } = req.body

    const advertiment = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.user.id)

    const purchase = await Purchase.create({ ad, content, author: user.id })

    Queue.create(PurchaseEmail.key, {
      ad: advertiment,
      user,
      content
    }).save()

    res.json(purchase)
  }
}

module.exports = new PurchaseController()
