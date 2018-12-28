const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const { ...query } = req.query
    const filters = {}

    if (query.price_min || query.price_max) {
      filters.price = {}

      if (query.price_min) {
        filters.price.$gte = query.price_min
      }

      if (query.price_max) {
        filters.price.$lte = query.price_max
      }
    }

    if (query.title) {
      filters.title = new RegExp(query.title, 'i')
    }

    filters.purchasedBy = null

    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['author'],
      sort: '-createAt'
    })
    res.json(ads)
  }

  async show (req, res) {
    const ad = await Ad.findById(req.params.id)
    return res.json(ad)
  }
  async store (req, res) {
    const { ...data } = req.body
    const ad = await Ad.create({ author: req.user.id, ...data })
    return res.json(ad)
  }
  async update (req, res) {
    const { ...data } = req.body

    const ad = await Ad.findByIdAndUpdate(req.params.id, data, {
      new: true
    })

    res.json(ad)
  }

  async destroy (req, res) {
    await Ad.findByIdAndRemove(req.params.id)

    return res.send()
  }
}

module.exports = new AdController()
