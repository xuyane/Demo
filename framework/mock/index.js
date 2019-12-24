const Mock = require('mockjs')
const dataMeta = require('./mocks/dataMeta')
const dataSource = require('./mocks/dataSource')
const service = require('./mocks/service')
const task = require('./mocks/task')


const mocks = [
  ...dataMeta,
  ...dataSource,
  ...service,
  ...task,
]

const param2Obj = (url) => {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

module.exports.default = mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})

