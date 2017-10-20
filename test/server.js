/*
 * Copyright (c) 2017, Feedeo AB <hugo@feedeo.io>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Server', () => {
  let subject
  let serverful

  before(() => {
    serverful = td.object([])
    serverful.Serverful = td.constructor([])
  })

  describe('when exporting', () => {
    beforeEach(() => {
      td.replace('serverful', serverful)

      subject = require('../src/server')
    })

    it('should be instance of serverful', () => {
      subject.should.be.instanceOf(serverful.Serverful)
    })
  })
})
