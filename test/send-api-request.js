/*
 * Copyright (c) 2017, Feedeo AB <hugo@feedeo.io>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Send API Request', () => {
  let subject
  const RequestOnSteroids = require('request-on-steroids')

  describe('when exporting', () => {
    beforeEach(() => {
      subject = require('../src/send-api-request')
    })

    it('should be instance of request-on-steroids', () => {
      subject.should.be.instanceOf(RequestOnSteroids)
    })
  })
})
