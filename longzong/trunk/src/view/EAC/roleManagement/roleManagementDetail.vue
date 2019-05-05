<style lang="less" scoped>
  @import '../../information/taskplant/taskplant.less';
  .plant-content {
    margin-bottom: 20px;
  }

  .tab {
    width: 400px;
    display: flex;
    background: #fff;
    color: #2D8CF0;
    margin-bottom: 20px;
  }

  .tab .tab-flex {
    width: 200px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #2D8CF0;
  }

  .tab .tab-flex2 {
    width: 200px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border-top: 1px solid #2D8CF0;
    border-bottom: 1px solid #2D8CF0;
    border-right: 1px solid #2D8CF0;
  }

  .tab-flex.tab-active {
    background: #2D8CF0;
    color: #fff;
    border: none
  }

  .tab-flex2.tab-active {
    background: #2D8CF0;
    color: #fff;
    border: none
  }
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：权限管理 &nbsp;&nbsp;>>&nbsp;&nbsp;角色管理 &nbsp;&nbsp;>>&nbsp;&nbsp;详情
    </Row>
    </Col>
    <Col span="24" class="plant-content" style="padding-top: 20px">
    <!--信息单元-->
    <div class="unit" style="border-top: 1px solid #BBBBBB">
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">角色名称：</div>
          <div class="unit_s_right">{{roleInfoForm.roleName}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">创建人：</div>
          <div class="unit_s_right no-right-border">{{roleInfoForm.creatorName}}</div>
        </div>
      </div>
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">创建时间：</div>
          <div class="unit_s_right">{{roleInfoForm.createTime}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">状态：</div>
          <div class="unit_s_right no-right-border">{{roleInfoForm.disabledDesc}}</div>
        </div>
      </div>
    </div>
    </Col>
    <Col span="24">
    <Card style="margin-bottom:20px">
      <div class="tab">
        <div class="tab-flex" @click="changeTab(1)" :class="tab === 1 ? 'tab-active' : ''">关联权限列表</div>
        <div class="tab-flex2" @click="changeTab(2)" :class="tab === 2 ? 'tab-active' : ''">关联账号</div>
        <!--<div class="tab-flex2" @click="changeTab(3)" :class="tab === 3 ? 'tab-active' : ''">关联菜单</div>-->
      </div>

      <Form ref="form" :model="addPermissionForm" :label-width="80" v-show="tab === 1">
        <Row>
          <Col span="6">
          <FormItem label="权限名称:" style="margin-right: 30px">
            <Select v-model="addPermissionForm.selectPermissionId" class="form-select">
              <Option v-for="item in addPermissionForm.permissionNameList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span='6'>
          <Button type="primary" @click="saveAddRolePermission">快速添加</Button>
          </Col>
        </Row>
      </Form>

      <Form ref="form" :model="addUserForm" :label-width="60" v-show="tab === 2">
        <Row type="flex" justify="space-between">
          <Col span="6">
          <FormItem label="姓名:" style="margin-right: 30px">
            <Select v-model="addUserForm.selectUserId" filterable remote :remote-method="getSelectEmployee" :loading="addUserForm.loading"
              class="form-select">
              <Option v-for="item in addUserForm.userNameList" :value="item.id" :key="item.id" :label="item.text">{{ item.text }} （{{ item.orgName }}）</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="18">
          <Button type="primary" @click="saveAddRoleUser">快速添加</Button>
          </Col>
        </Row>
      </Form>

      <Form ref="form" :model="addMenuForm" :label-width="80" v-show="tab === 3">
        <Row>
          <Col span="6">
          <FormItem label="选择菜单:" style="margin-right: 30px">
            <Input v-model="addMenuForm.selectMenuNames" class="search-input" readonly @on-focus="getSelectMenuData" placeholder="请选择菜单"></Input>
          </FormItem>
          </Col>
          <Col span='6'>
          <Button type="primary" @click="saveAddRoleMenuList">快速添加</Button>
          </Col>
        </Row>
      </Form>

    </Card>
    </Col>
    <Col span="24">

    <Row v-show="tab === 1" class-name="table-con">
      <Form :label-width="80">
        <Col span="2">
        <Button type="error" @click="saveDeleteRolePermissionList">删除</Button>
        </Col>
        <Col span="7">
        <FormItem label="权限名称:">
          <Input type="text" v-model="queryPermissionForm.permissionName"></Input>
        </FormItem>
        </Col>
        <Col span='15' class="text-right">
        <Button type="primary" @click="searchRolePermissionPage">查询</Button>
        <Button style="margin-left: 8px" @click="clearRolePermissionPage">重置</Button>
        </Col>
      </Form>
      <Col span="24">
      <Table class="tableCommon" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange1">
      </Table>
      </Col>
      <oil-page :total="total" :page-size="pageSize" @page-change="pageChange1" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"
        class="pagebox">
      </oil-page>
    </Row>

    <Row v-show="tab === 2" class-name="table-con">
      <Form :label-width="80">
        <Col span="1">
        <Button type="error" @click="saveDeleteRoleUserList">删除</Button>
        </Col>
        <Col span="6">
        <FormItem label="用户名:">
          <Input type="text" v-model="queryUserForm.loginName"></Input>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="姓名:">
          <Input type="text" v-model="queryUserForm.employeeName"></Input>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="部门:">
          <Input v-model="queryUserForm.orgName" class="search-input" readonly @on-focus="getDeptTree" placeholder="请选择部门"></Input>
        </FormItem>
        </Col>
        <Col span='5' class="text-right">
        <Button type="primary" @click="searchRoleRelEmployeeList">查询</Button>
        <Button style="margin-left: 8px" @click="clearRoleRelEmployeeList">重置</Button>
        </Col>
      </Form>
      <Col span="24">
      <Table class="tableCommon" :data="tableData2" :columns="columns2" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange2">
        <tr v-for="item in tableData2">
          <td>{{item.loginName}}</td>
          <td>{{item.employeeName}}</td>
          <td>{{item.orgName}}</td>
          <td>{{item.position}}</td>
          <td>{{item.extension}}</td>
          <td>{{item.job}}</td>
        </tr>
      </Table>
      </Col>
    </Row>

    <Row v-show="tab === 3" class-name="table-con">
      <Form :label-width="80">
        <Col span="1">
        <Button type="error" @click="saveDeleteRoleMenuList">删除</Button>
        </Col>
        <Col span="6">
        <FormItem label="菜单树:" style="margin-right: 30px">
          <Input v-model="queryMenuForm.queryMenuNames" class="search-input" readonly @on-focus="getQueryMenuData" placeholder="请选择菜单"></Input>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="菜单名称:">
          <Input type="text" v-model="queryMenuForm.menuName"></Input>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="URL:">
          <Input type="text" v-model="queryMenuForm.url"></Input>
        </FormItem>
        </Col>
        <Col span='5' class="text-right">
        <Button type="primary" @click="searchRoleMenuPage">查询</Button>
        <Button style="margin-left: 8px" @click="clearRoleMenuPage">重置</Button>
        </Col>
      </Form>
      <Col span="24">
      <Table class="tableCommon" :data="tableData3" :columns="columns3" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange3">
        <tr v-for="item in tableData3">
          <td>{{item.id}}</td>
          <td>{{item.code}}</td>
          <td>{{item.name}}</td>
          <td>{{item.level}}</td>
          <td>{{item.code}}</td>
          <td>{{item.url}}</td>
          <td>{{item.lastAccess}}</td>
        </tr>
      </Table>
      </Col>
      <oil-page :total="total" :page-size="pageSize"  :page-num="pageNum"@page-change="pageChange3" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"
        class="pagebox">
      </oil-page>
    </Row>
    <Col span='24' style="text-align:center;background-color:#fff;padding-bottom:20px;">
    <Button type="primary" @click="returnRole">返回</Button>
    </Col>
    </Col>
    <Modal v-model="queryUserForm.deptModel" title="请选择部门" :footer-hide="true">
      <div class="overflow-auto" style="max-height: 300px;">
        <Tree ref="tree" :data="queryUserForm.deptList" @on-select-change='getOrgId'></Tree>
      </div>
    </Modal>
    <Modal v-model="queryMenuForm.queryMenuModel" title="请选择菜单" @on-cancel="queryMenuCancel">
      <div class="overflow-auto" style="max-height: 300px;">
        <Tree ref="queryMenuTree" :data="queryMenuForm.queryMenuList" show-checkbox></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="queryMenuOk">确定</Button>
        <Button @click="queryMenuCancel">取消</Button>
      </div>
    </Modal>
    <Modal v-model="addMenuForm.selectMenuModel" title="请选择菜单" @on-cancel="selectMenuCancel">
      <div class="overflow-auto" style="max-height: 300px;">
        <Tree ref="selectMenuTree" :data="addMenuForm.selectMenuList" show-checkbox></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="selectMenuOk">确定</Button>
        <Button @click="selectMenuCancel">取消</Button>
      </div>
    </Modal>
  </Row>
</template>
<script>
  import OilPage from "../../components/page/page.vue";
  import { getRoleInfo, queryRolePermissionPage, queryValidPermissionList, queryRoleRelEmployeeList, queryRoleMenuPage, selectEmployee, getMenuPathByMenuId, deleteRolePermission, deleteRolePermissionList, addRolePermission, addRoleUser, deleteRoleUser, deleteRoleUserList, deleteRoleMenu, deleteRoleMenuList, deptTree, menuTree, addRoleMenuList } from "../../components/axios/EAC.js";
  import { formData, formatTime } from "../../../assets/js/common.js";
  export default {
    name: 'accountAuthorityDetail',
    components: {
      OilPage
    },
    data() {
      return {
        roleId: 0,
        roleInfoForm: {
          roleName: '',
          creatorName: '',
          createTime: '',
          disabledDesc: '',
        },
        addPermissionForm: {
          selectPermissionId: '',
          permissionNameList: [{
            name: '',
            id: ''
          }],
        },
        queryPermissionForm: {
          permissionName: '',
        },
        deletePermissionForm: {
          permissionIds: '',
        },
        addUserForm: {
          selectUserId: '',
          userNameList: [{
            text: '',
            id: ''
          }],
          loading: false,
        },
        queryUserForm: {
          loginName: '',
          employeeName: '',
          // orgId: '',
          value:'',
          orgName: '',
          deptList: [],
          deptModel: false,
        },
        deleteUserForm: {
          userIds: '',
        },
        addMenuForm: {
          selectMenuIds: '',
          selectMenuNames: '',
          selectMenuList: [],
          selectMenuModel: false,
        },
        queryMenuForm: {
          queryMenuIds: '',
          queryMenuNames: '',
          menuName: '',
          url: '',
          queryMenuList: [],
          queryMenuModel: false,
        },
        deleteMenuForm: {
          menuIds: '',
        },
        tab: 1,
        total: 0,
        pageNum: 1,
        pageSize: 10,
        showSizer: true,
        pageSizeOpts: [5, 10, 20, 30],
        columns1: [{
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        }, {
          title: '权限名称',
          key: 'name'
        }, {
          title: '所属模块',
          key: 'moduleName'
        }, {
          title: '创建人',
          key: 'creatorName'
        }, {
          title: '创建时间',
          key: 'createTime',
          render: (h, data) => {
            return h('div', formatTime(data.row.createTime))
          }
        }, {
          title: '操作',
          key: 'operation',
          render: (h, data) => {
            return h('span', {
              style: {
                marginRight: '20px',
                color: 'red',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.saveDeleteRolePermission(data.row.id)
                }
              }
            }, '删除')
          }
        }],
        tableData1: [{
          name: '',
          moduleName: '',
          creatorName: '',
          createTime: ''
        }],
        columns2: [{
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        }, {
          title: '用户名',
          key: 'loginName'
        }, {
          title: '姓名',
          key: 'employeeName'
        }, {
          title: '部门',
          key: 'orgName'
        }, {
          title: '职位',
          key: 'position'
        }, {
          title: '座机号',
          key: 'extension'
        }, {
          title: '是否在职',
          key: 'job'
        }, {
          title: '操作',
          key: 'operation',
          render: (h, data) => {
            return h('span', {
              style: {
                marginRight: '20px',
                color: 'red',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.saveDeleteRoleUser(data.row.employeeId)
                }
              }
            }, '删除')
          }
        }],
        tableData2: [{
          loginName: '',
          employeeName: '',
          orgName: '',
          position: '',
          extension: '',
          job: '',
        }],
        columns3: [{
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        }, {
          title: '菜单ID',
          key: 'id',
          width: 100
        }, {
          title: '菜单编码',
          key: 'code',
          width: 200
        }, {
          title: '菜单名称',
          key: 'name',
          width: 200
        }, {
          title: '菜单级别',
          key: 'level',
          width: 100
        }, {
          title: '菜单全路径',
          key: 'menufullpath',
          width: 150,
          render: (h, data) => {
            return h('div', [
              h('a', {
                domProps: {
                  innerHTML: "显示"
                },
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showMenuPath(data, event)
                  }
                }
              })
            ])
          }
        }, {
          title: 'URL',
          key: 'url'
        }, {
          title: '更新时间',
          key: 'lastAccess',
          width: 150,
          render: (h, data) => {
            return h('div', formatTime(data.row.lastAccess))
          }
        }, {
          title: '操作',
          key: 'operation',
          width: 200,
          render: (h, data) => {
            return h('span', {
              style: {
                marginRight: '20px',
                color: 'red',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.saveDeleteRoleMenu(data.row.id)
                }
              }
            }, '删除')
          }
        }],
        tableData3: [{
          id: '',
          code: '',
          name: '',
          level: '',
          menufullpath: '',
          url: '',
          lastAccess: ''
        }],

      }
    },

    created() {
      // 角色信息
      let that = this;
      that.roleId = this.$route.query.id;
      this.getRole()
      // 默认关联权限列表
      this.changeTab(1);
    },

    methods: {
      // 获取角色信息
      getRole() {
        let form = {
          roleId: this.roleId
        }
        getRoleInfo(form).then(res => {
          this.roleInfoForm.roleName = res.response.name
          this.roleInfoForm.creatorName = res.response.creatorName
          this.roleInfoForm.createTime = formatTime(res.response.createTime)
          this.roleInfoForm.disabledDesc = res.response.disabledDesc
        })
      },

      //点击切换到关联权限列表
      changeTab(index) {
        this.pageNum = 1
        this.pageSize = 10
        this.tab = index
        this.$Spin.show();
        if (index == 1) {
          this.getValidPermissionList();
          this.getRolePermissionPage();
        } else if (index == 2) {
          this.getSelectEmployee('');
          this.getRoleRelEmployeeList();
        } else {
          this.getRoleMenuPage();
        }
      },
      // 获得权限名称下拉数据
      getValidPermissionList() {
        queryValidPermissionList().then(res => {
          this.addPermissionForm.permissionNameList = res.response;
          this.$Spin.hide();
        })
      },
      // 获取角色关联的权限列表查询
      searchRolePermissionPage() {
        this.pageNum = 1;
        this.getRolePermissionPage()
      },
      // 获取角色关联的权限列表
      getRolePermissionPage() {
        let form = {
          roleId: this.roleId,
          name: this.queryPermissionForm.permissionName,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        queryRolePermissionPage(formData(form)).then(res => {
          this.tableData1 = res.response.list;
          this.total = res.response.total;
          this.$Spin.hide();
        })
      },
      // 重置角色关联的权限查询条件
      clearRolePermissionPage() {
        this.queryPermissionForm.permissionName = ''
      },
      // 快速添加角色关联权限
      saveAddRolePermission() {
        if (this.addPermissionForm.selectPermissionId == '') {
          this.$Message.warning("请选择权限名称");
        } else {
          this.$Spin.show();
          let form = {
            roleId: this.roleId,
            permissionId: this.addPermissionForm.selectPermissionId
          }
          addRolePermission(formData(form)).then(res => {
            this.$Message.success("快速添加成功！！！");
            this.$Spin.hide();
            this.changeTab(1);
          })
        }
      },
      // 删除角色关联的权限
      saveDeleteRolePermission(permissionId) {
        let form = {
          roleId: this.roleId,
          permissionId: permissionId
        }
        deleteRolePermission(formData(form)).then(res => {
          this.$Message.success("删除成功！！！");
          this.$Spin.hide();
          this.changeTab(1);
        })
      },
      // 批量删除角色关联的权限
      saveDeleteRolePermissionList() {
        let form = {
          roleId: this.roleId,
          permissionIds: this.deletePermissionForm.permissionIds
        }
        deleteRolePermissionList(formData(form)).then(res => {
          this.$Message.success("删除成功！！！");
          this.$Spin.hide();
          this.changeTab(1);
        })
      },
      //关联权限列表多选
      selectChange1(selection) {
        let permissionIds = selection.map(item => {
          return item.id
        })
        this.deletePermissionForm.permissionIds = permissionIds;
        this.selection = selection
      },
      // 监听分页
      pageChange1(page, pageSize) {
        if (page) {
          this.pageNum = page
        }
        if (pageSize) {
          this.pageSize = pageSize
        }
        this.getRolePermissionPage()
      },
      // 获得账号名称下拉数据
      getSelectEmployee(query) {
        this.addUserForm.loading = true;
        let form = {
          name: query
        }
        setTimeout(() => {
          this.addUserForm.loading = false;
          selectEmployee(formData(form)).then(res => {
            this.addUserForm.userNameList = JSON.parse(res.response);
          })
        }, 100);
      },
      // 部门树
      getDeptTree() {
        this.queryUserForm.deptModel = true;
        deptTree().then(res => {
          console.log(res);
          let data = [];
          data = JSON.parse(res.response)
          this.queryUserForm.deptList = this.deptDigui(data);
        })
      },
      deptDigui(data) {
        let dgData = data.map(item => {
          if (item.children && item.children.length > 0) {
            return {
              id: item.id,
              title: item.label,
              status: item.status,
              value: item.value,
              children: this.deptDigui(item.children)
            }
          } else {
            return {
              id: item.id,
              title: item.label,
              status: item.status,
              value: item.value,
              children: item.children
            }
          }
        })
        return dgData
      },
      //通过点击树的数据获取相应的数据
      getOrgId(data) {
        this.queryUserForm.deptModel = false;
        // this.queryUserForm.orgId = data[0].id;
        this.queryUserForm.value = data[0].value;
        this.queryUserForm.orgName = data[0].title;
      },
      // 获取角色关联的账号列表查询
      searchRoleRelEmployeeList() {
        this.pageNum1;
        this.getRoleRelEmployeeList();
      },
      // 获取角色关联的账号列表
      getRoleRelEmployeeList() {
        let form = {
          roleId: this.roleId,
          employeeName: this.queryUserForm.employeeName,
          loginName: this.queryUserForm.loginName,
          // orgId: this.queryUserForm.orgId
          orgCode : this.queryUserForm.value
        }
        queryRoleRelEmployeeList(formData(form)).then(res => {
          this.tableData2 = res.response;
          this.$Spin.hide();
        })
      },
      // 重置角色关联的账号查询条件
      clearRoleRelEmployeeList() {
        this.queryUserForm.employeeName = ''
        this.queryUserForm.loginName = ''
        // this.queryUserForm.orgId = ''
        this.queryUserForm.value = ''
        this.queryUserForm.orgName = ''
      },
      // 快速添加角色关联用户
      saveAddRoleUser() {
        if (this.addUserForm.selectUserId == '') {
          this.$Message.warning("请选择姓名");
        } else {
          this.$Spin.show();
          let form = {
            roleId: this.roleId,
            userId: this.addUserForm.selectUserId
          }
          addRoleUser(formData(form)).then(res => {
            this.$Message.success("快速添加成功！！！");
            this.$Spin.hide();
            this.changeTab(2);
          })
        }
      },
      // 删除角色关联的用户
      saveDeleteRoleUser(userId) {
        let form = {
          roleId: this.roleId,
          userId: userId
        }
        deleteRoleUser(formData(form)).then(res => {
          this.$Message.success("删除成功！！！");
          this.$Spin.hide();
          this.changeTab(2);
        })
      },
      // 批量删除角色关联的用户
      saveDeleteRoleUserList() {
        let form = {
          roleId: this.roleId,
          userIds: this.deleteUserForm.userIds
        }
        deleteRoleUserList(formData(form)).then(res => {
          this.$Message.success("删除成功！！！");
          this.$Spin.hide();
          this.changeTab(2);
        })
      },
      //关联账号列表多选
      selectChange2(selection) {
        let userIds = selection.map(item => {
          return item.employeeId
        })
        this.deleteUserForm.userIds = userIds;
        this.selection = selection
      },
      // 监听分页
      pageChange2(page, pageSize) {
        if (page) {
          this.pageNum = page
        }
        if (pageSize) {
          this.pageSize = pageSize
        }
        this.getRoleRelEmployeeList()
      },
      // 递归菜单树数据
      treeItem(data) {
        let dgData = data.map(item => {
          if (item.children && item.children.length > 0) {
            return {
              id: item.id,
              value: item.code,
              title: item.label,
              status: item.status,
              children: this.treeItem(item.children)
            }
          } else {
            return {
              id: item.id,
              value: item.code,
              title: item.label,
              status: item.status,
              children: item.children
            }
          }
        })
        return dgData
      },
      // 查询的菜单树
      getQueryMenuData() {
        this.queryMenuForm.queryMenuModel = true;
        let that = this;
        that.queryMenuForm.queryMenuList = [];
        menuTree().then(res => {
          if (res.status == "200") {
            const module = that.treeItem(res.response);
            module.forEach(function (e, v) {
              that.queryMenuForm.queryMenuList.push(e);
            });
          } else {
            that.$Message.warning(res.message);
          }
        })
      },
      // 查询的菜单树弹窗确定
      queryMenuOk() {
        let dataList = this.$refs.queryMenuTree.getCheckedNodes();
        if (dataList.length == 0) {
          this.$Message.error("请选择菜单！")
        } else {
          let menuIds = []
          let menuNames = []
          dataList.map(item => {
            menuIds.push(item.id);
            menuNames.push(item.title);
          });
          this.queryMenuForm.queryMenuIds = menuIds;
          this.queryMenuForm.queryMenuNames = menuNames;
          this.queryMenuForm.queryMenuModel = false;
        }
      },
      //查询的菜单树弹窗取消
      queryMenuCancel() {
        this.queryMenuForm.queryMenuModel = false;
      },
      // 获取角色关联的菜单列表查询
      searchRoleMenuPage(){
        this.pageNum=1;
        this.getRoleMenuPage();
      },
      // 获取角色关联的菜单列表
      getRoleMenuPage() {
        let form = {
          roleId: this.roleId,
          menuIdList: this.queryMenuForm.queryMenuIds,
          name: this.queryMenuForm.menuName,
          url: this.queryMenuForm.url,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        queryRoleMenuPage(formData(form)).then(res => {
          this.tableData3 = res.response.list;
          this.total = res.response.total;
          this.$Spin.hide();
        })
      },
      // 重置角色关联的菜单查询条件
      clearRoleMenuPage() {
        this.queryMenuForm.queryMenuIds = ''
        this.queryMenuForm.queryMenuNames = ''
        this.queryMenuForm.menuName = ''
        this.queryMenuForm.url = ''
      },
      // 获取菜单全路径
      showMenuPath(data, event) {
        let form = {
          menuId: data.row.id
        }
        getMenuPathByMenuId(form).then(res => {
          if (res.status == "200") {
            event.target.innerText = res.response
          } else {
            this.$Message.warning(res.message);
          }
        })
      },
      // 删除角色关联的菜单
      saveDeleteRoleMenu(menuId) {
        let form = {
          roleId: this.roleId,
          menuId: menuId
        }
        deleteRoleMenu(formData(form)).then(res => {
          this.$Message.success("删除成功！！！");
          this.$Spin.hide();
          this.changeTab(3);
        })
      },
      // 批量删除角色关联的菜单
      saveDeleteRoleMenuList() {
        let form = {
          roleId: this.roleId,
          menuIds: this.deleteMenuForm.menuIds
        }
        deleteRoleMenuList(formData(form)).then(res => {
          this.$Message.success("删除成功！！！");
          this.$Spin.hide();
          this.changeTab(3);
        })
      },
      //关联菜单列表多选
      selectChange3(selection) {
        let menuIds = selection.map(item => {
          return item.id
        })
        this.deleteMenuForm.menuIds = menuIds;
        this.selection = selection
      },

      // 选择的菜单树
      getSelectMenuData() {
        this.addMenuForm.selectMenuModel = true;
        let that = this;
        that.addMenuForm.selectMenuList = [];
        menuTree().then(res => {
          if (res.status == "200") {
            const module = that.treeItem(res.response);
            module.forEach(function (e, v) {
              that.addMenuForm.selectMenuList.push(e);
            });
          } else {
            that.$Message.warning(res.message);
          }
        })
      },
      // 选择的菜单树弹窗确定
      selectMenuOk() {
        let dataList = this.$refs.selectMenuTree.getCheckedNodes();
        if (dataList.length == 0) {
          this.$Message.error("请选择菜单！")
        } else {
          let menuIds = []
          let menuNames = []
          dataList.map(item => {
            menuIds.push(item.id);
            menuNames.push(item.title);
          });
          this.addMenuForm.selectMenuIds = menuIds;
          this.addMenuForm.selectMenuNames = menuNames;
          this.addMenuForm.selectMenuModel = false;
        }
      },
      //选择的菜单树弹窗取消
      selectMenuCancel() {
        this.addMenuForm.selectMenuModel = false;
      },
      //快速添加角色关联菜单
      saveAddRoleMenuList() {
        if (this.addMenuForm.selectMenuIds == '') {
          this.$Message.warning("请选择菜单");
        } else {
          this.$Spin.show()
          let form = {
            roleId: this.roleId,
            menuIds: this.addMenuForm.selectMenuIds
          }
          addRoleMenuList(formData(form)).then(res => {
            this.$Message.success("添加成功！！！");
            this.$Spin.hide();
            this.changeTab(3);
          })
        }
      },

      //返回角色管理列表页
      returnRole() {
        this.$router.push({ name: 'roleQueryList' })
      },

      // 监听分页
      pageChange3(page, pageSize) {
        if (page) {
          this.pageNum = page
        }
        if (pageSize) {
          this.pageSize = pageSize
        }
        this.getRoleMenuPage()
      }

    }
  }
</script>