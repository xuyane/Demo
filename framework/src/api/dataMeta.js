
import { ajax } from 'utils'
import { mockURL, apiURL } from 'config'

// 获取tree
export const getTree = () => ajax.get(`${mockURL}/dataMeta/tree`)

// 获取数据源
export const getList = (...data) => ajax.get(`${mockURL}/dataMeta/list`, ...data)

// 添加数据源
export const addItem = (...data) => ajax.post(`${mockURL}/dataMeta/add`, ...data)

// 编辑数据源
export const updateItem = (...data) => ajax.post(`${mockURL}/dataMeta/update`, ...data)

// 删除数据源
export const delItem = (...data) => ajax.delete(`${mockURL}/dataMeta/del`, ...data)
