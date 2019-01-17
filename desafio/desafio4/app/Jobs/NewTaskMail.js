'use strict'

const Mail = use('Mail')

class NewTaskMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewTaskMail-job'
  }

  async handle ({ email, username, title }) {
    console.log(`Job: ${NewTaskMail.key}`)

    await Mail.send(
      ['emails.new_task'],
      {
        username,
        title
      },
      message => {
        message
          .to(email)
          .from('bruno.flegler@gmail.com', 'Bruno | Myhobbies')
          .subject('New event share for you')
      }
    )
  }
}

module.exports = NewTaskMail
