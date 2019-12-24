import { ajax } from 'utils'
import { mockURL, apiURL } from 'config'

// 获取数据源
export const getList = (...data) => ajax.get(`${mockURL}/task/list`, ...data)

// 添加数据源
export const addItem = (...data) => ajax.post(`${mockURL}/task/add`, ...data)

// 编辑数据源
export const updateItem = (...data) => ajax.post(`${mockURL}/task/update`, ...data)

// 删除数据源
export const delItem = (...data) => ajax.delete(`${mockURL}/task/del`, ...data)
