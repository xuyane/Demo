import { ajax } from 'utils'
import { mockURL, apiURL } from 'config'

// 获取tree
export const getTree = () => ajax.get(`${mockURL}/dataSource/tree`)

// 添加tree
export const addTree = (data) => ajax.get(`${mockURL}/dataSource/addTree`, data)

// 修改tree
export const updateTree = (data) => ajax.get(`${mockURL}/dataSource/updateTree`, data)

// 删除tree
export const delTree = (data) => ajax.get(`${mockURL}/dataSource/delTree`, data)

// 获取数据源
export const getList = (...data) => ajax.get(`${mockURL}/dataSource/list`, ...data)

// 添加数据源
export const addItem = (...data) => ajax.get(`${mockURL}/dataSource/add`, ...data)

// 编辑数据源
export const updateItem = (...data) => ajax.get(`${mockURL}/dataSource/update`, ...data)

// 删除数据源
export const delItem = (...data) => ajax.get(`${mockURL}/dataSource/del`, ...data)
