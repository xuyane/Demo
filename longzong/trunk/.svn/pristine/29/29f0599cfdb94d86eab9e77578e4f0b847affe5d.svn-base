import createApi from './http'

// ----------eac共用树、管理员select接口Start-------
// eac模块树
export const moduletree = createApi({
  url: '/eac/eac/commonEAC/moduleTree',
  type: 'get'
})

// eac菜单树
export const menuTree = createApi({
  url: '/eac/eac/commonEAC/menuTree',
  type: 'get'
})

// eac模块操作功能树
export const moduleOperationTree = createApi({
  url: '/eac/eac/commonEAC/moduleOperationTree',
  type: 'get'
})

// eac模块权限树
export const modulePermissionTree = createApi({
  url: '/eac/eac/commonEAC/modulePermissionTree',
  type: 'get'
})

// eac部门树
export const deptTree = createApi({
  url: '/eac/eac/commonEAC/deptTree',
  type: 'get'
})

// eac部门下拉选择框select2
export const selectDept = createApi({
  url: '/eac/eac/commonEAC/selectDept',
  type: 'post'
})

// eac员工下拉选择框select2
export const selectEmployee = createApi({
  url: '/eac/eac/commonEAC/selectEmployee',
  type: 'post'
})
// ----------eac共用树、管理员select接口End-------

// ----------模块管理start---------
// 获取模块数据列表
export const getModuleList = createApi({
  url: '/eac/module/listPage',
  type: 'post'
})

// 获取模块全路径
export const getModulePath = createApi({
  url: '/eac/module/path',
  type: 'post'
})

// 新增模块
export const createModules = createApi({
  url: '/eac/module/insert',
  type: 'post'
})

// 编辑模块
export const modifyModules = createApi({
  url: '/eac/module/update',
  type: 'post'
})

// 删除模块
export const removeModules = createApi({
  url: '/eac/module/delete',
  type: 'post'
})

// 启用禁用模块
export const statusModules = createApi({
  url: '/eac/module/updateDisabled',
  type: 'post'
})
// ----------模块管理end---------
// -------------菜单配置start-------------------
// 菜单配置列表
export const queryPageMenuList = createApi({
  url: '/eac/eac/menu/list_page',
  type: 'get'
})

// 新增菜单
export const addMenu = createApi({
  url: '/eac/eac/menu/save',
  type: 'post'
})

// 删除菜单
export const deleteMenu = createApi({
  url: '/eac/eac/menu/delete',
  type: 'post'
})

// 菜单明细
export const getMenuInfo = createApi({
  url: '/eac/eac/menu/modify_detail',
  type: 'post'
})
// 修改明细
export const editMenu = createApi({
  url: '/eac/eac/menu/modify',
  type: 'post'
})

// 角色管理 - 角色信息列表role_menu_list_page
export const queryPageRoleMenuList = createApi({
  url: '/eac/eac/menu/role_menu_list_page',
  type: 'post'
})

// 角色管理 - 角色删除
export const deleteRoleAndMenu = createApi({
  url: '/eac/eac/menu/batch_delete_menu_role',
  type: 'post'
})

// 菜单配置 - 选择角色
export const queryPageRole = createApi({
  url: '/eac/eac/menu/list_role_page',
  type: 'get'
})

// 选择角色 --添加
export const saveMenuRoleBatch = createApi({
  url: '/eac/eac/menu/batch_save_menu_role',
  type: 'post'
})
// 菜单-启用禁用
export const modifyDisableOrNot = createApi({
  url: '/eac/eac/menu/modify_status',
  type: 'post'
})

// -------------菜单配置end-------------------

// -----------------------------eac功能配置start----------------------
// 功能配置分页列表
export const operationListPage = createApi({
  url: '/eac/eac/moduleOperation/listPage',
  type: 'post'
})

// 功能配置新增
export const operationInsert = createApi({
  url: '/eac/eac/moduleOperation/insert',
  type: 'post'
})

// 功能配置删除操作
export const operationdelete = createApi({
  url: '/eac/eac/moduleOperation/delete',
  type: 'post'
})

// 通过id获取功能配置操作
export const getModelOperation = createApi({
  url: '/eac/eac/moduleOperation/detailHead',
  type: 'get'
})

// 通过id获取功能配置操作
export const updateModelOperation = createApi({
  url: '/eac/eac/moduleOperation/modify',
  type: 'post'
})

// 功能配置详情-关联权限列表
export const detailPermissionList = createApi({
  url: '/eac/eac/moduleOperation/detailPermissionList',
  type: 'post'
})

// 功能配置详情-用户列表
export const detailUserList = createApi({
  url: '/eac/eac/moduleOperation/detailUserList',
  type: 'post'
})

// 功能配置详情-角色列表
export const detailRoleList = createApi({
  url: '/eac/eac/moduleOperation/detailRoleList',
  type: 'post'
})

// -----------------------------eac功能配置end----------------------

// ----------角色管理Start-------
// 角色管理-列表
export const queryPageRoleList = createApi({
  url: '/eac/eac/role/pageRole',
  type: 'post'
})

// 角色管理-新增角色
export const saveRole = createApi({
  url: '/eac/eac/role/save',
  type: 'post'
})

// 角色管理-编辑角色
export const updateRole = createApi({
  url: '/eac/eac/role/update',
  type: 'post'
})

// 角色管理-删除角色
export const deleteRole = createApi({
  url: '/eac/eac/role/delete',
  type: 'post'
})

// 角色管理-批量删除角色
export const deleteBatchRole = createApi({
  url: '/eac/eac/role/deleteBatch',
  type: 'post'
})

// 角色管理-详情-角色信息
export const getRoleInfo = createApi({
  url: '/eac/eac/role/info',
  type: 'get'
})

// 角色管理-禁用/启用
export const disableOrNot = createApi({
  url: '/eac/eac/role/disable',
  type: 'get'
})

// 角色管理-详情-关联权限-权限名称下拉框（获得有效的权限下拉数据）
export const queryValidPermissionList = createApi({
  url: '/eac/eac/role/queryValidPermissionList',
  type: 'get'
})

// 角色管理-详情-关联权限-快速添加（添加角色关联权限）
export const addRolePermission = createApi({
  url: '/eac/eac/role/addRolePermission',
  type: 'post'
})

// 角色管理-角色授权-批量添加（添加角色关联权限）
export const addRolePermissionList = createApi({
  url: '/eac/eac/role/addRolePermissionList',
  type: 'post'
})

// 1.角色管理-角色授权-删除/2.角色管理-详情-关联权限-删除（删除角色关联权限）
export const deleteRolePermission = createApi({
  url: '/eac/eac/role/deleteRolePermission',
  type: 'post'
})

// 1.角色管理-角色授权-批量删除/2.角色管理-详情-关联权限-批量删除（删除角色关联权限）
export const deleteRolePermissionList = createApi({
  url: '/eac/eac/role/deleteRolePermissionList',
  type: 'post'
})

// 1.角色管理-角色授权-权限列表/2.角色管理-详情-关联权限列表（查询角色关联的权限）
export const queryRolePermissionPage = createApi({
  url: '/eac/eac/role/rolePermissionPage',
  type: 'post'
})

// 角色管理-详情-关联账号-快速添加（添加角色关联用户）
export const addRoleUser = createApi({
  url: '/eac/eac/role/addRoleUser',
  type: 'post'
})

// 角色管理-账号分配-批量添加（添加角色关联用户）
export const addRoleUserList = createApi({
  url: '/eac/eac/role/addRoleUserList',
  type: 'post'
})

// 1.角色管理-账号分配-删除/2.角色管理-详情-关联账号-删除（删除角色关联用户）
export const deleteRoleUser = createApi({
  url: '/eac/eac/role/deleteRoleUser',
  type: 'post'
})

// 1.角色管理-账号分配-批量删除/2.角色管理-详情-关联账号-批量删除（删除角色关联用户）
export const deleteRoleUserList = createApi({
  url: '/eac/eac/role/deleteRoleUserList',
  type: 'post'
})

// 角色管理-账号分配-待选区（分页查询所有有效账号）
export const queryEmployeePage = createApi({
  url: '/eac/eac/role/employeePage',
  type: 'post'
})

// 1.角色管理-账号分配-已选区/2.角色管理-详情-关联账号列表（查询角色关联的所有账号）
export const queryRoleRelEmployeeList = createApi({
  url: '/eac/eac/role/roleRelEmployeeList',
  type: 'post'
})

// 1.角色管理-关联菜单-批量添加/2.角色管理-详情-关联菜单-快速添加（添加角色关联菜单）
export const addRoleMenuList = createApi({
  url: '/eac/eac/role/addRoleMenuList',
  type: 'post'
})

// 1.角色管理-关联菜单-删除/2.角色管理-详情-关联菜单-删除（删除角色关联菜单）
export const deleteRoleMenu = createApi({
  url: '/eac/eac/role/deleteRoleMenu',
  type: 'post'
})

// 1.角色管理-关联菜单-批量删除/2.角色管理-详情-关联菜单-批量删除（删除角色关联菜单）
export const deleteRoleMenuList = createApi({
  url: '/eac/eac/role/deleteRoleMenuList',
  type: 'post'
})

// 1.角色管理-关联菜单-菜单列表/2.角色管理-详情-关联菜单列表（查询角色关联的菜单）
export const queryRoleMenuPage = createApi({
  url: '/eac/eac/role/roleMenuPage',
  type: 'post'
})

// 1.角色管理-关联菜单-菜单全路径/2.角色管理-详情-关联菜单-菜单全路径(根据菜单id获取菜单全路径)
export const getMenuPathByMenuId = createApi({
  url: '/eac/eac/role/getMenuPath',
  type: 'get'
})
// ----------角色管理End-----------

// ----------权限管理start----------
// 权限管理列表查询
export const permissionPageList = createApi({
  url: '/eac/eac/modulePermission/listPage',
  type: 'post'
})

// 权限管理新增：显示所选模块路径
export const permissionGetModuleName = createApi({
  url: '/eac/eac/modulePermission/getModuleName',
  type: 'get'
})

// 权限管理列表显示模块全路径
export const permissionGetModulePath = createApi({
  url: '/eac/eac/modulePermission/getModulePath',
  type: 'get'
})

// 禁用权限
export const permissionEnable = createApi({
  url: '/eac/eac/modulePermission/enable',
  type: 'get'
})

// 启用权限
export const permissionDisable = createApi({
  url: '/eac/eac/modulePermission/disable',
  type: 'get'
})

// 单个删除权限
export const permissionDelete = createApi({
  url: '/eac/eac/modulePermission/delete',
  type: 'get'
})

// 批量删除权限
export const permissionDeleteBatch = createApi({
  url: '/eac/eac/modulePermission/deleteBatch',
  type: 'post'
})

// 新增权限：获取操作数据
export const permissionToAdd = createApi({
  url: '/eac/eac/modulePermission/toAdd',
  type: 'post'
})

// 新增权限：保存权限
export const permissionSave = createApi({
  url: '/eac/eac/modulePermission/save',
  type: 'post'
})

// 编辑/查看权限-获取权限信息
export const permissionDetail = createApi({
  url: '/eac/eac/modulePermission/detail',
  type: 'get'
})

// 编辑权限-查询功能列表
export const permissionListPageOperationForEdit = createApi({
  url: '/eac/eac/modulePermission/listPageOperationForEdit',
  type: 'post'
})

// 编辑权限-添加操作功能
export const permissionAddOperation = createApi({
  url: '/eac/eac/modulePermission/addOperation',
  type: 'post'
})

// 编辑权限-删除操作功能
export const permissionDeleteOperation = createApi({
  url: '/eac/eac/modulePermission/deleteOperation',
  type: 'post'
})

// 编辑权限-批量删除操作功能
export const permissionDeleteBatchOperation = createApi({
  url: '/eac/eac/modulePermission/deleteBatchOperation',
  type: 'post'
})

// 编辑权限-保存
export const permissionUpdate = createApi({
  url: '/eac/eac/modulePermission/update',
  type: 'post'
})

// 查看权限-功能操作列表
export const permissionListPageOperation = createApi({
  url: '/eac/eac/modulePermission/listPageOperation',
  type: 'post'
})

// 查看权限-关联角色列表
export const permissionListPageRole = createApi({
  url: '/eac/eac/modulePermission/listPageRole',
  type: 'post'
})

// 查看权限-包含员工列表
export const permissionListPageUser = createApi({
  url: '/eac/eac/modulePermission/listPageUser',
  type: 'post'
})

// 查看权限-删除角色
export const permissionDeleteRole = createApi({
  url: '/eac/eac/modulePermission/deleteRole',
  type: 'post'
})

// 查看权限-批量删除角色
export const permissionDeleteBatchRole = createApi({
  url: '/eac/eac/modulePermission/deleteBatchRole',
  type: 'post'
})
// ----------权限管理end----------

// -----------------账号权限管理start----------
// 获取用户列表信息
export const UserPermissionListPage = createApi({
  url: '/eac/UserPermission/user/list',
  type: 'post'
})

// 根据员工id获取员工详情信息
export const UserPermissionGetInfo = createApi({
  url: '/eac/UserPermission/info',
  type: 'get'
})

// 获取用户操作列表信息
export const UserPermissionGetOpreation = createApi({
  url: '/eac/UserPermission/opreation/list',
  type: 'post'
})

// 获取角色名称下拉框列表信息
export const UserPermissionGetSelectRoleList = createApi({
  url: '/eac/UserPermission/roleName/list',
  type: 'post'
})

// 获取用户角色列表信息
export const UserPermissionGetRoleList = createApi({
  url: '/eac/UserPermission/role/list',
  type: 'post'
})

// 给用户添加角色
export const UserPermissionAddRole = createApi({
  url: '/eac/UserPermission/addRoleToUser',
  type: 'post'
})

// 取消角色与用户的关联关系
export const UserPermissionDeleteRole = createApi({
  url: '/eac/UserPermission/delete/userRole',
  type: 'post'
})

// 批量取消角色与用户的关联关系
export const UserPermissionDeleteBatchRole = createApi({
  url: '/eac/UserPermission/deleteBatch/userRole',
  type: 'post'
})

// 获取用户菜单列表信息
export const UserPermissionGetMenuList = createApi({
  url: '/eac/UserPermission/menu/list',
  type: 'post'
})

// 账号权限-详情-部门管理授权-分页列表
export const UserPermissionGetPermissionList = createApi({
  url: '/eac/UserPermission/permission/list',
  type: 'post'
})

// 部门管理授权
export const UserPermissionAddPermission = createApi({
  url: '/eac/UserPermission/addPermissionToManager/',
  type: 'post'
})

// 部门管理员授权-取消授权
export const UserPermissionDeletePermission = createApi({
  url: '/eac/UserPermission/delete',
  type: 'post'
})

// 部门管理员授权-批量取消授权
export const UserPermissionDeleteBatchPermission = createApi({
  url: '/eac/UserPermission/deleteBatch',
  type: 'post'
})

// 账号权限管理-详情-菜单查询-菜单全路径
export const UserPermissionGetMenuPath = createApi({
  url: '/eac/UserPermission/getMenuWholePath',
  type: 'get'
})

// 功能配置 启用禁用
export const moduleOperationDisabled = createApi({
  url: '/eac/eac/moduleOperation/disabled',
  type: 'post'
})

// 功能配置 启用禁用
export const getRoleNameList = createApi({
  url: '/eac/UserPermission/roleName/list',
  type: 'post'
})
// 删除关联权限列表
export const deletePermissionList = createApi({
  url: '/eac/eac/moduleOperation/deletePermissionList',
  type: 'post'
})
// 删除关联角色列表
export const deleteRoleList = createApi({
  url: '/eac/eac/moduleOperation/deleteRoleList',
  type: 'post'
})
// -----------------账号权限管理end----------
// -----------------管理员设定 start-----------
// 管理员设定列表分页查询
export const orgManagerListPage = createApi({
  url: '/eac/orgManager/listPage',
  type: 'post'
})
// 组织架构详情
export const orgManagerDetail = createApi({
  url: '/eac/orgManager/detail',
  type: 'post'
})

// 管理员分页查询
export const employeeListPage = createApi({
  url: '/eac/orgManager/employee/listPage',
  type: 'post'
})
// 添加关联
export const insertAdmin = createApi({
  url: '/eac/orgManager/insert/Employee',
  type: 'post'
})
// 成员的分页查询
export const orgListPage = createApi({
  url: '/eac/orgManager/member/listPage',
  type: 'post'
})
// -----------------管理员设定 end----------

// -----------------管理员设定 start--------
// 成员的分页查询
export const workBenchListPage = createApi({
  url: '/eac/eac/workBench/listPage',
  type: 'post'
})
// 删除工作台管理信息
export const deleteWorkBench = createApi({
  url: '/eac/eac/workBench/delete',
  type: 'post'
})
// 关联人员/部门列表-删除工作台管理配置信息
export const deleteConfigWorkBench = createApi({
  url: '/eac/eac/workBench/deleteConfig',
  type: 'post'
})
// 工作台管理详情-关联部门列表
export const detailDepartment = createApi({
  url: '/eac/eac/workBench/detailDepartment',
  type: 'post'
})
// 功能配置详情-头部
export const detailHead = createApi({
  url: '/eac/eac/workBench/detailHead',
  type: 'post'
})
// 工作台管理详情-关联人员列表
export const detailUser = createApi({
  url: '/eac/eac/workBench/detailUser',
  type: 'post'
})
// 启用禁用
export const workBenchDisabled = createApi({
  url: '/eac/eac/workBench/disabled',
  type: 'post'
})
// 新增工作台信息
export const inserWorkBench = createApi({
  url: '/eac/eac/workBench/insert',
  type: 'post'
})
// 编辑工作台管理信息
export const modifyWorkBench = createApi({
  url: '/eac/eac/workBench/modify',
  type: 'post'
})
// 关联部门功能
export const relatedDepartments = createApi({
  url: '/eac/eac/workBench/relatedDepartments',
  type: 'post'
})
// 关联人员功能
export const relatedUsers = createApi({
  url: '/eac/eac/workBench/relatedUsers',
  type: 'post'
})
// 关联人员功能-弹出用户列表
export const relatedUsersOfUserList = createApi({
  url: '/eac/eac/workBench/relatedUsersOfUserList',
  type: 'post'
})
// -----------------管理员设定 end----------

// 获取登录人上下文
export const loginContext = createApi({
  url: '/eac/eac/commonEAC/getLoginContext',
  type: 'get'
})
