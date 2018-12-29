const Email = require('../services/Email')

class PurchaseEmail {
  get key () {
    return 'PurchaseEmail'
  }

  async handle (job, done) {
    const { ad, user, content } = job.data

    await await Email.sendMail({
      from: '"Bruno Flegler DalCol" <bruno.dalcol@el.com.br>',
      to: ad.author.email,
      subject: `Solicitação de compra ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad }
    })

    return done()
  }
}

module.exports = new PurchaseEmail()
