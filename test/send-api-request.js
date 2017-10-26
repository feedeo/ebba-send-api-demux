/*
 * Copyright (c) 2017, Feedeo AB <hugo@feedeo.io>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Send API Request', () => {
  let subject
  let Health
  let Request

  before(() => {
    Health = td.object([ 'addCheck' ])

    Request = td.constructor([])
  })

  afterEach(() => td.reset())

  describe('when exporting', () => {
    beforeEach(() => {
      td.replace('request-on-steroids', Request)

      subject = require('../src/send-api-request')
    })

    it('should be instance of request-on-steroids', () => {
      subject.should.be.instanceOf(Request)
    })
  })

  describe('when exporting and loading request-on-steroids', () => {
    beforeEach(() => {
      td.replace('health-checkup', Health)

      subject = require('../src/send-api-request')
    })

    it('should create a request-on-steroids with post function', () => {
      subject.should.have.property('post')
      subject.post.should.be.instanceOf(Function)
    })
    
    it('should create a request-on-steroids with circuitBreaker function', () => {
      subject.should.have.property('circuitBreaker')
      subject.post.should.be.instanceOf(Function)
    })
  })

  describe('when constructing', () => {
    beforeEach(() => {
      td.replace('request-on-steroids', Request)

      td.replace('health-checkup', Health)

      subject = require('../src/send-api-request')
    })

    it('should add send api health check', () => {
      td.verify(Health.addCheck('send-api', td.matchers.isA(Function)), { times: 1 })
    })
  })
})
