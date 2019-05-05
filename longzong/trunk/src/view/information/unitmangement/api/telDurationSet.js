import createApi from '../../../components/axios/http'

//部门的树
export const departmentTree = createApi({
    url: '/information/phone/department_tree',
    type: 'post'
})

//部门列表
export const departmentList = createApi({
    url: '/information/phone/list',
    type: 'post'
})

//根据id获取人员电话时长表信息
export const departmentDetail = createApi({
    url: '/information/phone/detail',
    type: 'post'
})

//修改人员电话时长
export const departmentEdit = createApi({
    url: '/information/phone/edit',
    type: 'post'
})
//查询员工和部门信息接口
export const departmentAndEmployeeInfo = createApi({
    url: '/information/phone/department_and_employee_info',
    type: 'post'
})
