'use strict'

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required'
    }
  }
}

module.exports = User
