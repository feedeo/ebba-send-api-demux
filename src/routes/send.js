/*
 * Copyright (c) 2017, Feedeo AB <hugo@feedeo.io>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { Route } = require('serverful')

const _ = require('lodash')

const Logger = require('modern-logger')

const Boom = require('boom')

const Request = require('../send-api-request')

const COMPANY_BASE_URLS = (() => {
  if (!process.env.COMPANY_BASE_URLS) {
    return {}
  }

  const companyBaseUrls = JSON.parse(process.env.COMPANY_BASE_URLS)

  if (!_.isObject(companyBaseUrls)) {
    throw new Error('invalid environment variable COMPANY_BASE_URLS')
  }

  return companyBaseUrls
})()

class Send extends Route {
  constructor () {
    super('POST', '/send', 'Send API Demux', 'Send API Demultiplexer')
  }

  handler ({ query, payload, headers }, reply) {
    if (!_.has(query, 'token')) {
      return reply(Boom.unauthorized())
    }

    if (!_.has(payload, 'sender.id')) {
      return reply(Boom.badRequest())
    }

    const companyId = _.get(payload, 'sender.id')

    if (!_.has(COMPANY_BASE_URLS, companyId)) {
      return reply(Boom.forbidden())
    }

    reply()

    const url = _.get(COMPANY_BASE_URLS, companyId)

    const options = { url, headers, json: payload, qs: query }

    return Request.post(options)
      .catch((error) => Logger.warn(error.message))
  }

  auth () {
    return false
  }
}

module.exports = new Send()
