const Ad = require('../models/Ad')
const Purchase = require('../models/Purchase')

class AcceptController {
  async accept (req, res) {
    const purchase = await Purchase.findById(req.params.id)
    const ad = await Ad.findByIdAndUpdate(
      purchase.ad,
      { purchasedBy: purchase._id },
      { new: true }
    )
    return res.json(ad)
  }
}

module.exports = new AcceptController()
