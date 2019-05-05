<template>
  <Row>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：后台权限&nbsp;&nbsp;>>&nbsp;&nbsp;角色管理
      </Row>
    </i-col>
    <Col span='24'>
      <Card style="margin-bottom:20px">
          <Form ref="form" :model="roleListForm" :label-width="80">
            <Row type="flex" justify="space-between">
              <Col span="6">
                <FormItem label="角色名称:">
                  <Input v-model="roleListForm.name" class="search-input"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="创建人:">
                  <Input v-model="roleListForm.creatorName" class="search-input"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="状态：" prop="status">
                  <Select v-model="roleListForm.disabled" class="form-select">
                    <Option value="-1">全部</Option>
                    <Option value="0">启用</Option>
                    <Option value="1">禁用</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span='6' class="text-right">
                  <Button type="primary" @click="searchListPage">查询</Button>
                  <Button type="default" @click="clear">重置</Button>
              </Col>
            </Row>
          </Form>
      </Card>
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="addRole">新增</Button>
          <Button type="primary" class="search-btn" @click="removeRoleBatch">删除</Button>
        </div>
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true"
          @on-selection-change="selectChange">
        </Table>
        <oil-page
          :total="total"
          :page-size="pageSize"
          :page-num="pageNum"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
      <!-- 新增modal start --> 
      <Modal v-model="addModal" title="新增" @on-ok="saveAddRole" @on-cancel="cancelAddRole">
        <Form ref="addForm" :model="addRoleForm" :rules="addRules" :label-width="100">
          <Row type="flex" justify="center">
            <Col span="18">
              <FormItem label="角色名称：" prop="name">
                <Input v-model="addRoleForm.name" class="search-input" placeholder="请输入角色名称"></Input>
              </FormItem>
              <FormItem label="备注：" prop="remark">
                <Input v-model="addRoleForm.remark" class="search-input" placeholder="请输入备注"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <i-button type="primary" @click="saveAddRole">确定</i-button>
          <i-button type="default" @click="cancelAddRole">取消</i-button>
        </div>
      </Modal>
      <!-- 新增modal end -->
      <!-- 删除modal start -->
      <Modal v-model="removeModal" title="提示信息" @on-ok="saveDeleteRole" @on-cancel="cancelDeleteRole">
        <Row>
          <p style="text-align:center;font-size:16px;">您确定删除?</p>
        </Row>
        <div slot="footer">
        <i-button type="primary" @click="saveDeleteRole">确定</i-button>
        <i-button type="default" @click="cancelDeleteRole">取消</i-button>
      </div>
      </Modal>
      <!-- 删除modal end -->

    <!-- 编辑弹窗开始 -->
    <Modal v-model="editModal" title="编辑角色" width="580" >
      <Form ref="editForm" :model="updateRoleForm" :rules="editRules" :label-width="100">
        <FormItem label="角色名称 : " prop="name"><Input type="text" v-model="updateRoleForm.name"></Input></FormItem>
        <FormItem label="备注 : "><Input type="textarea" :rows="4" v-model="updateRoleForm.remark"></Input></FormItem>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="editModalSubmit">确定</i-button>
        <i-button type="default" @click="editModalCancel">取消</i-button>
      </div>
    </Modal>
    <!-- 编辑弹窗结束 -->

    </Col>
  </Row>
</template>
<script>
import OilPage from "../../components/page/page.vue"; 
import { queryPageRoleList, saveRole, updateRole, deleteRole, deleteBatchRole, getRoleInfo, disableOrNot} from "../../components/axios/EAC.js";
import { formData, formatTime } from "../../../assets/js/common.js";
export default {
  name: 'roleQueryList',
  components: {
    OilPage
  },
  data(){
    return {
      roleListForm: {
          creatorName: '',
          disabled: '-1',
          name: ''
      },
      addRoleForm: {
          name: '',
          remark: ''
      },
      updateRoleForm: {
          roleId:'',
          name: '',
          remark: ''
      },
      roleId: 0,
      roleIds : [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      addModal: false,
      removeModal: false,
      editModal:false,
      columns:[
        {
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },
        {
          key: "name",
          title: "角色名称",
          align: "center",
          minWidth: 120
        },
        {
          key: "remark",
          align: "center",
          title: "备注",
          minWidth: 150
        },
        {
          key: "creatorName",
          align: "center",
          title: "创建人",
          minWidth: 120
        },
        {
          key: "createTime",
          align: "center",
          title: "创建时间",
          minWidth: 150,
          sortable: true,
          render: (h, data) => {  // 重点
            return h('div', formatTime(data.row.createTime))
          }
        },
        {
          key: "onOff",
          align: "center",
          title: "禁用启用",
          minWidth: 100,
          render: (h, data) => {  // 重点
            let _this = this
            return h('i-switch', {
              props: {
                value: data.row.disabled == 0 ? true : false,
                },
                on: {
                  input: function (event) {
                    _this.saveDisableOrNot(data, event)
                  }
                }
            })
          }
        },
        {
          key: "operate",
          align: "center",
          title: "操作",
          minWidth: 380,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                  marginRight: '20px',
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                click: () => {
                    this.$router.push({name:'roleManagementDetail',query: {id: data.row.id}})
                  }
                }
              }, '详情'),
              h('span', {
                style: {
                  marginRight: '20px',
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                  on: {
                    click: () => {
                        this.editModalBtn(data.row.id)
                  }
                }
              }, '编辑'),
              h('span', {
                  style: {
                    marginRight: '20px',
                    color: 'red',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                        this.deleteModalBtn(data.row.id)
                    }
                  }
              }, '删除'),
              h('span', {
                  style: {
                    marginRight: '20px',
                    color: '#145edb',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name:'accountAssignment',query: {id: data.row.id,name:data.row.name}})
                    }
                  }
              }, '账号分配'),
              h('span', {
                  style: {
                    marginRight: '20px',
                    color: '#145edb',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name:'roleAuthorization',query: {id: data.row.id,name:data.row.name}})
                    }
                  }
              }, '角色授权'),
            //   h('span', {
            //       style: {
            //         marginRight: '20px',
            //         color: '#145edb',
            //         textDecoration: 'underline',
            //         cursor: 'pointer'
            //       },
            //       on: {
            //         click: () => {
            //           this.$router.push({name:'associationMenu',query: {id: data.row.id,name:data.row.name}})
            //         }
            //       }
            //   }, '关联菜单')
            ])
          }
        },
      ],
      tableData:[
        {
          name: '',
          remark: '',
          creater: '',
          creatTime: '',
          onOff: '',
        }
      ],
      addRules:{
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur'}
        ]
      },
      editRules:{
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur'}
        ]
      }
    }
  },

  created () {
    this.queryPageRole()
  },

  methods:{


    // 获取角色分页列表
    queryPageRole () {
      this.$Spin.show();
      let form = {
        creatorName: this.roleListForm.creatorName,
        disabled: this.roleListForm.disabled == -1 ? '': this.roleListForm.disabled,
        name: this.roleListForm.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      queryPageRoleList(formData(form)).then(res => {
        this.tableData = res.response.list;
        this.total = res.response.total;
        this.$Spin.hide();
      })
    },
    searchListPage (){
      this.pageNum = 1
      this.queryPageRole ()
    },
    // 新增角色弹窗
    addRole(){
      this.addModal=true;
    },
    // 新增角色保存
    saveAddRole(){
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          let form = {
              remark: this.addRoleForm.remark,
              name: this.addRoleForm.name
          }
          saveRole(formData(form)).then(res => {
            this.$Message.success("新增成功！！！");
            this.addModal=false;
            this.queryPageRole();
          })
        }
      })
    },
    // 新增角色取消
    cancelAddRole(){
      this.addModal=false;
    },
    // 修改角色弹窗
    editModalBtn(roleId){
      this.editModal=true;
      let form = {
          roleId: roleId
      }
      getRoleInfo(form).then(res => {
        this.updateRoleForm.roleId = res.response.id
        this.updateRoleForm.name = res.response.name
        this.updateRoleForm.remark = res.response.remark
      })
    },
    // 修改角色保存
    editModalSubmit(){
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          updateRole(formData(this.updateRoleForm)).then(res => {
            this.$Message.success("修改成功！！！");
            this.editModal=false;
            this.queryPageRole();
          })
        }
      })
    },
    // 修改角色取消
    editModalCancel(){
      this.editModal=false
    },
    // 删除角色弹窗
    deleteModalBtn(roleId){
      this.roleId = roleId;
      this.removeModal=true
    },
    // 删除角色
    saveDeleteRole(){
      let form = {
          id: this.roleId
      }
      deleteRole(formData(form)).then(res => {
        this.$Message.success("删除成功！！！");
        this.queryPageRole();
        this.removeModal=false
      })
    },
    // 删除角色取消
    cancelDeleteRole(){
      this.removeModal=false
    },
    // 批量删除角色
    removeRoleBatch(){
      let form = "ids[]=" + this.roleIds
      deleteBatchRole(form).then(res => {
        this.$Message.success("删除成功！！！");
        this.queryPageRole();
      })
    },
    // 角色启用/禁用
    saveDisableOrNot(data, event){
      let disabled = '';
      if(event){
        disabled = 0;
      }else{
        disabled = 1;
      }
      let form = {
          disabled: disabled,
          roleId: data.row.id
      }
      disableOrNot(form).then(res => {
        this.queryPageRole();
      })
    },
    // 清空
    clear () {
      this.roleListForm.creatorName = ''
      this.roleListForm.disabled = '-1'
      this.roleListForm.name = ''
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.queryPageRole()
    },
    // table勾选框触发事件
    selectChange (selection) {
      let roleIds = selection.map(item => {
        return item.id
      })
      this.roleIds = roleIds;
      this.selection = selection
    },
  }
}
</script>
