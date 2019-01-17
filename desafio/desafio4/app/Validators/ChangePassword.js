'use strict'

class ChangePassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      password_old: 'required',
      password: 'required|confirmed'
    }
  }
}

module.exports = ChangePassword
