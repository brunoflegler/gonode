const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    const appointment = {
      user_id: id,
      provider_id: parseInt(provider),
      date
    }

    console.log(appointment)

    await Appointment.create(appointment)

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
