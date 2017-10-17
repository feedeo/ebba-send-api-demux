# Ebba's Send API Demultiplexer

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) 
[![Build Status](https://travis-ci.org/feedeo/ebba-send-api-demux.svg?branch=master)](https://travis-ci.org/feedeo/ebba-send-api-demux)
[![Coverage Status](https://coveralls.io/repos/github/feedeo/ebba-send-api-demux/badge.svg?branch=master)](https://coveralls.io/github/feedeo/ebba-send-api-demux?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/feedeo/ebba-send-api-demux.svg?token=8bba7d4da58903d25c528315d06549f98f1261382e58c5228f02ff01914025cb&ts=1498125217303)](https://greenkeeper.io/)
[![](https://img.shields.io/github/release/feedeo/ebba-send-api-demux.svg)](https://github.com/feedeo/ebba-send-api-demux/releases)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker Stars](https://img.shields.io/docker/stars/feedeo/ebba-send-api-demux.svg)](https://hub.docker.com/r/feedeo/ebba-send-api-demux/)
[![Docker Pulls](https://img.shields.io/docker/pulls/feedeo/ebba-send-api-demux.svg)](https://hub.docker.com/r/feedeo/ebba-send-api-demux/)

Demultiplex Send API requests from Ebba based on the company identifier.

### Features
* Launch :rocket: inside a Docker container :whale: so you don't need to manage the dependencies :raised_hands: :white_check_mark:
* Quickly deploy :runner: and easily scale :two_men_holding_hands: the number of servers by using Rancher :white_check_mark:

### How to use

#### Use it in your terminal
Run the Docker image in a container exposing port `5928`
```
docker run -d -p "5928:3000" -e COMPANY_BASE_URLS="{\"my-company-id\": \"http://localhost:8080/send\"}" feedeo/ebba-send-api-demux
```

#### Available REST API endpoints
Swagger documentation available `http://localhost:5928/docs`

#### Available environment variables
Variable | Description | Required | Default value
:---:|:---:|:---:|:---:
COMPANY_BASE_URLS | Mapping (JSON object) between company identifiers to their base URLs. | false | `{}`
PORT | The port to be used by the HTTP server. | false | `3000`
LOG_LEVEL | The log level verbosity. | false | `info`
ENVIRONMENT | The environment the app is running on. | false | `undefined`
ROLLBAR_API_KEY | The server API key used to talk with Rollbar. | false | `undefined`

### How to build
Clone the GitHub repo
```
git clone https://github.com/feedeo/ebba-send-api-demux.git
```

Change current directory
```
cd ebba-send-api-demux
```

Install dependencies
```
npm install
```

Run the NPM script that will build the Docker image
```
npm run build
```
