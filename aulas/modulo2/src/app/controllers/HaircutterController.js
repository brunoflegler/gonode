const { Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class HaircutterController {
  async index (req, res) {
    const { id } = req.session.user

    const current = moment()

    let appointments = await Appointment.findAll({
      where: {
        provider_id: id,
        date: {
          [Op.gte]: current.format(),
          [Op.between]: [
            current.startOf('day').format(),
            current.endOf('day').format()
          ]
        }
      },
      order: [['date', 'asc']],
      include: ['user']
    })

    appointments = appointments.map(a => {
      const dateFormat = moment(a.date).format('DD/MM/YYYY HH:mm')

      return {
        dateFormat,
        ...a
      }
    })

    res.render('haircutter/dashboard', { appointments })
  }
}

module.exports = new HaircutterController()
