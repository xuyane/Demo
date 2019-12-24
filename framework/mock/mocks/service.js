const list = [];

module.exports = [
  {
    url: '/service/list',
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
    url: '/service/add',
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
    url: '/service/update',
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
    url: '/service/del',
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
