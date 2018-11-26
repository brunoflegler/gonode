const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const ads = await Ad.find()
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

    console.log(req.params.id)

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
