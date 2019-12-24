import { ajax } from 'utils'
import { mockURL, apiURL } from 'config'

// 获取数据源
export const getList = (...data) => ajax.get(`${mockURL}/service/list`, ...data)

// 添加数据源
export const addItem = (...data) => ajax.post(`${mockURL}/service/add`, ...data)

// 编辑数据源
export const updateItem = (...data) => ajax.post(`${mockURL}/service/update`, ...data)

// 删除数据源
export const delItem = (...data) => ajax.delete(`${mockURL}/service/del`, ...data)
