const Ad = require('../models/Ad')
const Purchase = require('../models/Purchase')

class AcceptController {
  async accept (req, res) {
    console.log(req.params.id)
    const purchase = await Purchase.findById(req.params.id)

    if (!purchase) {
      res.status(400).json({ error: 'Purchase not found' })
    }

    purchase.sold_at = new Date()
    purchase.save()

    const update = {
      purchasedBy: purchase._id
    }

    // console.log(update)

    const ad = await Ad.findByIdAndUpdate(purchase.ad, update, {
      new: true
    })

    return res.json(ad)
  }
}

module.exports = new AcceptController()
