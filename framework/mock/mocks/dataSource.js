const Mock = require('mockjs');

let tableData = [];
let tableCount = 90;

let treeData = [];

for (let i = 0; i < tableCount; i++) {
  tableData.push(Mock.mock({
    id: '@increment',
    'status|1': ['主表', '副表'],
    name: '@ctitle(3, 5)',
    'type|1': ['Mysql', 'Oracle', 'Hbase', 'xxxx'],
    host: '@ip',
    port: '@integer(1000, 9999)',
    account: '@name()',
    password: '@word(8, 12)'
  }))
}

const looperFn = (node, id, callback) => {
  const nextNode = JSON.parse(JSON.stringify(node));
  const looper = (node, id) => {
    for(let i = 0; i < node.length; i++) {
      if (node[i]['id'] === id) {
        callback(node[i], node, i);
        return true;
      }
      if (node[i]['children']) {
        const findRes = looper(node[i]['children'], id)
        if (findRes) {
          break;
        }
      }
    }
  }
  looper(nextNode, id);
  return nextNode;
}

module.exports = [
  {
    url: '/dataSource/tree',
    type: 'get',
    response: config => {
      return {
        status: 200,
        data: treeData,
        msg: ''
      }
    }
  },
  {
    url: '/dataSource/addTree',
    type: 'get',
    response: config => {
      const { title, isRoot, id, parentId, level } = config.query
      const nextTreeNode = {
        title,
        parentId: id,
        id,
        level,
      };

      if (isRoot === 'true') {
        treeData.push(nextTreeNode);
      } else {
        nextTreeNode.parentId = parentId;

        const nextTree = looperFn(
          treeData,
          parentId,
          (node) => {
            if (node.children) {
              node.children.push(nextTreeNode);
            } else {
              node.children = [nextTreeNode];
            }
          }
        );

        treeData = nextTree;
      }

      return {
        status: 200,
        data: true,
        msg: ''
      }
    }
  },
  {
    url: '/dataSource/updateTree',
    type: 'get',
    response: config => {
      const { id, title } = config.query;
      treeData = looperFn(
        treeData,
        id,
        (node) => {
          node.title = title;
        }
      )

      return {
        status: 200,
        data: true,
        msg: ''
      }
    }
  },
  {
    url: '/dataSource/delTree',
    type: 'get',
    response: config => {
      const { id } = config.query;

      treeData = looperFn(
        treeData,
        id,
        (cur, node, i) => {
          node.splice(i, 1);
        }
      )

      return {
        status: 200,
        data: true,
        msg: ''
      }
    }
  },
  {
    url: '/dataSource/list',
    type: 'get',
    response: config => {
      const { current, pageSize } = config.query;
      const end = current * pageSize;
      const start = end - pageSize;
      const next = tableData.filter((item, index) => (start <= index) && (index < end))

      return {
        status: 200,
        data: {
          list: next,
          total: tableCount,
        },
        msg: ''
      }
    }
  },
  {
    url: '/dataSource/add',
    type: 'get',
    response: config => {
      const data = Object.assign({}, {id: Math.floor(Math.random() * 100000000)}, config.query);
      tableData.unshift(data);
      tableCount++;

      return {
        status: 200,
        data: true,
        msg: ''
      }
    }
  },
  {
    url: '/dataSource/update',
    type: 'get',
    response: config => {
      const { id } = config.query;
      const findKey = tableData.findIndex((item) => +item.id === +id);
      tableData.splice(findKey, 1, {...config.query})

      return {
        status: 200,
        data: true,
        msg: ''
      }
    }
  },
  {
    url: '/dataSource/del',
    type: 'get',
    response: config => {
      let { ids } = config.query;
      ids = ids.map((item) => +item);
      const next = tableData.filter((item) => !ids.includes(item.id));
      tableData = next;
      tableCount = next.length

      return {
        status: 200,
        data: true,
        msg: ''
      }
    }
  },
]
