const list = [];

module.exports = [
  {
    url: '/task/list',
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
    url: '/task/add',
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
    url: '/task/update',
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
    url: '/task/del',
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
