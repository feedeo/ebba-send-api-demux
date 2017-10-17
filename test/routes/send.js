/*
 * Copyright (c) 2017, Feedeo AB <hugo@feedeo.io>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Send', () => {
  let subject
  let Request
  let Logger

  before(() => {
    Request = td.object([ 'post' ])

    Logger = td.object([ 'error' ])
  })

  afterEach(() => td.reset())

  describe('when handling a request for the send api', () => {
    const token = 'my-access-token'
    const query = { token }
    const payload = require('./send_api_post-request-ok.json')
    const request = { query, payload }
    let reply

    before(() => {
      reply = td.function()

      process.env.COMPANY_BASE_URLS = '{"my-company-id": "http://localhost:5050/response"}'
    })

    beforeEach(() => {
      td.replace('../../src/send-api-request', Request)
      td.when(Request.post(td.matchers.anything()), { ignoreExtraArgs: true }).thenResolve()

      td.replace('modern-logger', Logger)

      subject = require('../../src/routes/send')
    })

    after(() => {
      delete process.env.COMPANY_BASE_URLS
    })

    it('should call request post', () => {
      return subject.handler(request, reply)
        .then(() => {
          const captor = td.matchers.captor()

          td.verify(Request.post(captor.capture()), { times: 1 })

          const options = captor.value
          options.should.have.nested.property('url', 'http://localhost:5050/response')
          options.should.have.nested.property('qs.token', token)
          options.should.have.nested.property('json', payload)
        })
    })
  })

  describe('when configuring authentication', () => {
    beforeEach(() => {
      subject = require('../../src/routes/send')
    })

    it('should not require authenticate', () => {
      const auth = subject.auth()

      auth.should.be.equal(false)
    })
  })
})
