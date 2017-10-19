/*
 * Copyright (c) 2017, Feedeo AB <hugo@feedeo.io>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Promise = require('bluebird')

const Health = require('health-checkup')

const Request = require('request-on-steroids')

class SendApiRequest extends Request {
  constructor (options = {}) {
    super(options)

    Health.addCheck('send-api', () => Promise.try(() => {
      if (this.circuitBreaker.isOpen()) {
        throw new Error(`circuit breaker is open`)
      }
    }))
  }
}

module.exports = new SendApiRequest({ rate: { requests: 1, period: 10 } })
