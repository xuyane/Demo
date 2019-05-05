import createApi from './http.js'

// 话机设置列表
export const phoneNumberpage = createApi({
  url: '/callcenter/call-center/calltelephonesetting/phoneNumberpage' + '?date=' + new Date().getTime(),
  type: 'get'
})

// 话机设置新增
export const phoneNumberAdd = createApi({
  url: '/callcenter/call-center/calltelephonesetting/phoneNumberAdd',
  type: 'get'
})

// 话机设置新增
export const select_employee = createApi({
  url: '/callcenter/call-center/callblacklist/select_employee',
  type: 'get'
})

// 列表总计
export const totalNum = createApi({
  url: '/callcenter/call-center/calltelephonesetting/total',
  type: 'get'
})

// 根据使用人员拿到手机号
export const getPhone = createApi({
  url: '/callcenter/call-center/calltelephonesetting/getPhone',
  type: 'get'
})

// 话机设置修改
export const phoneNumberModify = createApi({
  url: '/callcenter/call-center/calltelephonesetting/phoneNumberModify',
  type: 'post'
})

// 查询登陆用户话机信息
export const userPhoneInfo = createApi({
  url: '/callcenter/call-center/calltelephonesetting/getExcode',
  type: 'get'
})

// 查询呼叫记录
export const callRecordPage = createApi({
  url: '/callcenter/call-center/calltelephonesetting/callRecordPage',
  type: 'get'
})

export const callListPage = createApi({
  url: '/callcenter/call-center/callemployeemapping/list_page',
  type: 'post'
})

// 根据姓名获取钢炼id集合
export const getGlAdminIds = createApi({
  url: '/callcenter/call-center/calltelephonesetting/getGLAdminId',
  type: 'get'
})



// 人员话机管理列表
export const peoplePhoneList = createApi({
  url: '/callcenter/callemployeemapping/list_all_page',
  type: 'post'
});


// 人员话机管理--校验重复数据
export const checkPeoplePhone = createApi({
  url: '/callcenter/callemployeemapping/check_same_data',
  type: 'post'
});

// 人员话机管理--编辑
export const peoplePhoneEdit = createApi({
  url: '/callcenter/callemployeemapping/update_all',
  type: 'post'
});




// 人员话机管理--更新通话记录
export const phoneRecordEdit = createApi({
  url: '/callcenter/callemployeemapping/update_record_all',
  type: 'post'
});
