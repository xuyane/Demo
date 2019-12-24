const list = [];

module.exports = [
  {
    url: '/dataMeta/tree',
    type: 'get',
    response: config => {
      return {
        status: 200,
        data: list,
        msg: ''
      }
    }
  },
  {
    url: '/dataMeta/list',
    type: 'get',
    response: config => {
      return {
        status: 200,
        data: list,
        msg: ''
      }
    }
  },
  {
    url: '/dataMeta/add',
    type: 'post',
    response: config => {
      return {
        status: 200,
        data: list,
        msg: ''
      }
    }
  },
  {
    url: '/dataMeta/update',
    type: 'post',
    response: config => {
      return {
        status: 200,
        data: list,
        msg: ''
      }
    }
  },
  {
    url: '/dataMeta/del',
    type: 'delete',
    response: config => {
      return {
        status: 200,
        data: list,
        msg: ''
      }
    }
  },
]
