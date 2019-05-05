<style lang="less" scoped>
@import '../../information/infoDiffusion/postedMessage.less';
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：后台权限&nbsp;&nbsp;>>&nbsp;&nbsp;权限分配&nbsp;&nbsp;>>&nbsp;&nbsp;查看
      </Row>
    </Col>
    <Col span="24" class="plant-content" style="padding-top: 20px">
        <!--信息单元-->
      <div class="unit" style="border-top: 1px solid #BBBBBB">
        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">权限名称</div>
            <div class="unit_s_right">{{permissionName}}</div>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">所属模块</div>
            <div class="unit_s_right no-right-border">{{modulePath}}</div>
          </div>
        </div>
      </div>
    </Col>

    <Col span="24">
      <Row class-name="table-con">
        <div class="tab">
          <div class="tab-flex" @click="changeTab(1)" :class="tab === 1 ? 'tab-active' : ''">功能操作</div>
          <div class="tab-flex2" @click="changeTab(2)" :class="tab === 2 ? 'tab-active' : ''">关联角色</div>
          <div class="tab-flex" @click="changeTab(3)" :class="tab === 3 ? 'tab-active' : ''">包含员工</div>
        </div>
        <Card>
        <Form :model="formItem1">
          <!-- 操作 -->
          <Row type="flex" justify="space-between" v-show="tab === 1">
            <Col span="6">
              <FormItem label="操作名称:"  :label-width="75">
                <Input v-model="formItem1.name" class="search-input" placeholder="请输入操作名称"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="操作URL:"  :label-width="100">
                <Input v-model="formItem1.url" class="search-input" placeholder="请输入操作URL"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="创建人:"  :label-width="100">
                <Input v-model="formItem1.creatorName" class="search-input" placeholder="请输入创建人"></Input>
              </FormItem>
            </Col>
            <Col span="6" class="text-right">
              <Button type="primary" @click="searchOperationList">查询</Button>
              <Button style="margin-left: 8px" @click="clear">重置</Button>
            </Col>
          </Row>
        </Form>
        <Row style="margin-left: 20px" v-show="tab === 1">
          <div style="margin-bottom:20px;">
            <Button type="error" @click="deleteModal1=true">批量删除</Button>
          </div>
        </Row>
        <Form :model="formItem2">
          <!-- 关联角色 -->
          <Row type="flex" justify="space-between"  v-show="tab === 2">
            <Col span="6">
              <FormItem label="角色名称:" :label-width="75">
                <Input v-model="formItem2.name" class="search-input" placeholder="请输入角色名称"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="创建人:" :label-width="100">
                <Input v-model="formItem2.creatorName" class="search-input" placeholder="请输入创建人"></Input>
              </FormItem>
            </Col>
            <Col span="6" class="text-right">
              <Button type="primary" @click="searchRoleList">查询</Button>
              <Button style="margin-left: 8px" @click="clear">重置</Button>
            </Col>
          </Row>
        </Form>
        <Row style="margin-left: 20px" v-show="tab === 2">
          <div style="margin-bottom:20px;">
            <Button type="error" @click="deleteModal2=true">批量删除</Button>
          </div>
        </Row>
        <Form :model="formItem3">
          <!-- 员工 -->
          <Row type="flex" justify="space-between" v-show="tab === 3">
            <Col span="6">
              <FormItem label="姓名:" :label-width="75">
                <Input v-model="formItem3.userName" class="search-input" placeholder="请输入姓名"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="员工ID:" :label-width="100">
                <Input v-model="formItem3.userId" class="search-input" placeholder="请输入员工ID"></Input>
              </FormItem>
            </Col>
            <Col span="6" class="text-right">
              <Button type="primary" @click="searchUserList">查询</Button>
              <Button style="margin-left: 8px" @click="clear">重置</Button>
            </Col>
          </Row>
        </Form>

        <Table class="tableCommon" v-show="tab === 1" :data="tableData1" :columns="columns1" @on-selection-change="selectChange1"></Table>
        <Table class="tableCommon" v-show="tab === 2" :data="tableData2" :columns="columns2" @on-selection-change="selectChange2"></Table>
        <Table class="tableCommon" v-show="tab === 3" :data="tableData3" :columns="columns3"></Table>
        <oil-page
          :total="total"
          :page-size="pageSize"
          :page-num="pageNum"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"
          class="pagebox">
        </oil-page>

        <!-- 批量删除功能操作按钮 弹窗开始 -->
        <Modal v-model="deleteModal1" title="提示信息">
            <p class="text-center">您确定删除？</p>
            <div slot="footer">
                <Button type="primary" style="margin-left:8px;" @click="removeBatchOperation">确认</Button>
                <Button @click="deleteModal1=false">取消</Button>
            </div>
        </Modal>
        <!-- 批量删除功能操作按钮 弹窗结束 -->

        <!-- 批量删除角色按钮 弹窗开始 -->
        <Modal v-model="deleteModal2" title="提示信息">
            <p class="text-center">您确定删除？</p>
            <div slot="footer">
                <Button type="primary" style="margin-left:8px;" @click="removeBatchRole">确认</Button>
                <Button @click="deleteModal2=false">取消</Button>
            </div>
        </Modal>
        <!-- 批量删除角色按钮 弹窗结束 -->
        </Card>
      </Row>

      <Row style="margin-top: 20px" type="flex" justify="center">
        <div class="btn-container">
          <Button class="search-btn" @click="backtoRightsManagement">返回</Button>
        </div>
      </Row>
    </Col>
  </Row>
</template>

<script>
import OilPage from "../../components/page/page.vue";
import { permissionDetail,permissionListPageOperation,permissionListPageRole,permissionListPageUser,permissionDeleteOperation,permissionDeleteBatchOperation,permissionDeleteRole,permissionDeleteBatchRole } from "../../components/axios/EAC.js";
import { formData, formatTime } from "../../../assets/js/common.js";
export default {
  name:"authorityQuery",
  components: {
    OilPage
  },
  data(){
    return {
      tab: 1,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      deleteModal1:false,
      deleteModal2:false,
      permissionId:this.$route.query.permissionId,
      permissionName:'',
      modulePath:'',
      operationIds:[],
      roleIds:[],
      formItem1:{
        name:"",
        url:"",
        creatorName:""
      },
      formItem2:{
        name:"",
        creatorName:""
      },
      formItem3:{
        userName:"",
        userId:""
      },
      tableData1:[],
      tableData2:[],
      tableData3:[],
      columns1:[
        {
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },
        {
          key: "name",
          title: "功能名称",
          align: "center",
        },
        {
          key: "moduleName",
          align: "center",
          title: "所属模块",
        },
        {
          key: "url",
          align: "center",
          title: "URL",
        },
        {
          key: "creatorName",
          align: "center",
          title: "创建人"
        },
        {
          key: "createTime",
          align: "centeTime",
          title: "创建时间"
        },
        {
          key: "operate",
          align: "center",
          title: "操作",
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                  color: 'red',
                  marginRight: '8px',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.removeOperation(data);
                  }
                }
              }, '删除 '),
            ])
          }
        },
      ],
      columns2:[
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
        },
        {
          key: "remark",
          align: "center",
          title: "备注",
        },
        {
          key: "creatorName",
          align: "center",
          title: "创建人"
        },
        {
          key: "createTime",
          align: "center",
          title: "创建时间",
          render: (h,data) => {
            return h('div',formatTime(data.row.createTime))
          }
        },
        {
          key: "disabledDesc",
          align: "center",
          title: "状态"
        },
        {
          key: "operate",
          align: "center",
          title: "操作",
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                  color: 'red',
                  marginRight: '8px',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.removeRole(data)
                  }
                }
              }, '删除 '),
            ])
          }
        },
      ],
      columns3:[
        {
          key: 'id',
          title: 'ID',
          align: 'center',
          width: 80
        },
        {
          key: "loginName",
          title: "用户名",
          align: "center",
        },
        {
          key: "name",
          align: "center",
          title: "姓名",
        },
        {
          key: "oneLevel",
          align: "center",
          title: "一级机构"
        },
        {
          key: "orgName",
          align: "center",
          title: "所属部门"
        },
        {
          key: "position",
          align: "center",
          title: "职位"
        },
        {
          key: "statusDesc",
          align: "center",
          title: "状态"
        },
      ],
    }
  },
  created (){
    this.getPermissionData();
    this.getOperationList();
  },
  methods:{
    changeTab (index) {
      this.pageNum = 1
      this.pageSize = 10
      this.tab = index
      if(this.tab == 1){
        this.getOperationList()
      }else if(this.tab == 2){
        this.getRoleList()
      }else {
        this.getUserList()
      }
    },
    //监听分页
    pageChange(page, pageSize){
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      if(this.tab == 1) {
        this.getOperationList()
      } else if(this.tab == 2){
        this.getRoleList()
      } else if(this.tab == 3){
        this.getUserList()
      }
    },
    //返回权限管理
    backtoRightsManagement(){
      this.$router.push({name:'rightsManagement'})
    },
    //获取权限信息
    getPermissionData(){
      let that = this
      that.$Spin.show()
      let jsonData = { permissionId:that.permissionId }
      permissionDetail(jsonData).then(res => {
        that.permissionName = res.response.name
        that.modulePath = res.response.modulePath
        that.$Spin.hide()
      })
    },
    //功能操作列表查询
    searchOperationList(){
      this.pageNum = 1;
      this.getOperationList();
    },
    //功能操作列表
    getOperationList(){
      let that = this
      that.$Spin.show();
      let jsonData = {
        name: that.formItem1.name,
        url: that.formItem1.url,
        creatorName: that.formItem1.creatorName,
        permissionId: that.permissionId,
        pageNum: that.pageNum,
        pageSize: that.pageSize
      }
      permissionListPageOperation(jsonData).then(res => {
        that.tableData1 = res.response.list
        that.total = res.response.total
        that.$Spin.hide();
      })
    },
    //关联角色查询
    searchRoleList(){
      this.pageNum = 1;
      this.getRoleList();
    },
    //关联角色列表
    getRoleList(){
      let that = this
      that.$Spin.show();
      let jsonData = {
        name: that.formItem2.name,
        creatorName: that.formItem2.creatorName,
        permissionId: that.permissionId,
        pageNum: that.pageNum,
        pageSize: that.pageSize
      }
      permissionListPageRole(jsonData).then(res => {
        that.tableData2 = res.response.list
        that.total = res.response.total
        that.$Spin.hide();
      })
    },
    //包含员工列表查询
    searchUserList(){
      this.pageNum = 1;
      this.getUserList ();
    },
    //包含员工列表
    getUserList(){
      let that = this
      that.$Spin.show();
      let jsonData = {
        userId: that.formItem3.userId,
        userName: that.formItem3.userName,
        permissionId: that.permissionId,
        pageNum: that.pageNum,
        pageSize: that.pageSize
      }
      permissionListPageUser(jsonData).then(res => {
        that.tableData3 = res.response.list
        that.total = res.response.total
        that.$Spin.hide();
      })
    },
    //重置
    clear(){
      if(this.tab == 1){
        this.formItem1.name = ''
        this.formItem1.url = ''
        this.formItem1.creatorName = ''
      } else if(this.tab == 2){
        this.formItem2.name = ''
        this.formItem2.creatorName = ''
      } else if(this.tab == 3){
        this.formItem3.userId = ''
        this.formItem3.userName = ''
      }
    },
    //删除功能操作
    removeOperation(data){
      let that = this
      var config = {
        title: '删除',
        content: '确定删除？',
        onOk: function() {
          let jsonData = {
            operationId: data.row.id,
            permissionId: that.permissionId
          }
          permissionDeleteOperation(formData(jsonData)).then(res => {
            that.getOperationList();
          })
        },
        onCancel: function(){}
      }
      that.$Modal.confirm(config)
    },
    //批量删除功能操作
    removeBatchOperation(){
      let that = this
      if (that.operationIds.length > 0) {
        let jsonData = {
          operationIds: that.operationIds,
          permissionId: that.permissionId
        }
        permissionDeleteBatchOperation(formData(jsonData)).then(res => {
          that.getOperationList();
        })
      } else {
        that.$Message.warning('请勾选数据');
      }
      this.deleteModal1 = false
    },
    //删除角色
    removeRole(data){
      let that = this
      var config = {
        title: '删除',
        content: '确定删除？',
        onOk: function() {
          let jsonData = {
            roleId: data.row.id,
            permissionId: that.permissionId
          }
          permissionDeleteRole(formData(jsonData)).then(res => {
            that.getRoleList();
          })
        },
        onCancel: function(){}
      }
      that.$Modal.confirm(config)
    },
    //批量删除角色
    removeBatchRole(){
      let that = this
      if (that.roleIds.length > 0) {
        let jsonData = {
          roleIds: that.roleIds,
          permissionId: that.permissionId
        }
        permissionDeleteBatchRole(formData(jsonData)).then(res => {
          that.getRoleList();
        })
      } else {
        that.$Message.warning('请勾选数据');
      }
      this.deleteModal2 = false
    },
    //勾选功能操作
    selectChange1(selection){
      let operationIds = selection.map(item => {
        return item.id
      })
      this.operationIds = operationIds
    },
    //勾选角色
    selectChange2(selection){
      let roleIds = selection.map(item => {
        return item.id
      })
      this.roleIds = roleIds
    },
  }
}
</script>


