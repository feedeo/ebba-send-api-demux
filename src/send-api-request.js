/*
 * Copyright (c) 2017, Feedeo AB <hugo@feedeo.io>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const RequestOnSteroids = require('request-on-steroids')

class SendApiRequest extends RequestOnSteroids {
  constructor (options = {}) {
    super(options)
  }
}

module.exports = new SendApiRequest({ rate: { requests: 1, period: 10 } })
