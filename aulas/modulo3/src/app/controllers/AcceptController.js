const Ad = require('../models/Ad')
const Purchase = require('../models/Purchase')

class AcceptController {
  async accept (req, res) {
    const purchase = await Purchase.findById(req.params.id).populate('ad')
    const ad = await Ad.findById(purchase.ad._id)

    ad.purchasedBy = purchase._id
    ad.save()

    res.send()
  }
}

module.exports = new AcceptController()
