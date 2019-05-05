<style lang="less" scoped>
@import '../../information/taskplant/taskplant.less';
  .tab {
    width: 400px;
    display: flex;
    background: #fff;
    color: #2D8CF0;
    margin-bottom: 20px;
  }
  .tab .tab-flex{
    width: 200px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #2D8CF0;
  }

  .tab .tab-flex2{
    width: 200px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border-top: 1px solid #2D8CF0;
    border-bottom: 1px solid #2D8CF0;
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
  .unit{
    border-top: 1px solid #ccc;
  }

</style>
<template>
    <Row>
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：权限管理&nbsp;&nbsp;>>&nbsp;&nbsp;功能配置&nbsp;&nbsp;>>&nbsp;&nbsp;详情
            </Row>
        </i-col>
        <Col span='24'>
            <Card style="margin-bottom:20px">
                <div class="unit">
                    <div class="unit_content">
                        <div class="unit_content_left">
                            <div class="unit_s_left">系统模块 : </div>
                            <div class="unit_s_right">{{moduleOperationInfo.moduleName}}</div>
                        </div>
                        <div class="unit_content_left no_line">
                            <div class="unit_s_left">功能名称 : </div>
                            <div class="unit_s_right no-right-border">{{moduleOperationInfo.name}}</div>
                        </div>
                    </div>
                    <div class="unit_content">
                        <div class="unit_content_left">
                            <div class="unit_s_left">功能URL : </div>
                            <div class="unit_s_right">{{moduleOperationInfo.url}}</div>
                        </div>
                        <div class="unit_content_left no_line">
                            <div class="unit_s_left">状态 : </div>
                            <div class="unit_s_right no-right-border">{{moduleOperationInfo.disabledDesc}}</div>
                        </div>
                    </div>
                </div>
            </Card>
            <Form :label-width="100" class="search-form">
                <Row>
                    <div class="tab">
                        <div class="tab-flex" @click="changeTab1" :class="tab === 1 ? 'tab-active' : ''">关联权限列表</div>
                        <div class="tab-flex2" @click="changeTab2" :class="tab === 2 ? 'tab-active' : ''">用户列表</div>
                        <div class="tab-flex" @click="changeTab3" :class="tab === 3? 'tab-active' : ''">角色列表</div>
                    </div>
                </Row>
                <Row v-show="tab === 1">
                  <Col span='2'><Button type="error" @click="soloDelete">删除</Button></Col>
                  <Col span='6'>
                    <FormItem label="权限名称 ："><Input v-model="detailPermissionListForm.permissionName" type="text" ></Input></FormItem>
                  </Col>
                  <Col span='4' offset='12' class="text-right">
                      <Button type="primary" @click="searchDetailPermissionList">查询</Button>
                      <Button type="default" @click="clearDetailPermissionListForm">重置</Button>
                  </Col>
                  <Modal v-model="removeModal" title="提示信息">
                    <Form>
                      <row ><FormItem><p style="font-size:14px;">您确定删除？</p></FormItem></row>
                    </Form>
                    <div slot="footer">
                      <i-button type="primary" @click="singleSoloDelete">确定</i-button>
                      <i-button @click="cancelSolo">取消</i-button>
                    </div>
                  </Modal>
                </Row>
                <Row v-show="tab === 2">
                    <Col span='6'>
                        <FormItem label="用户名 ："><Input v-model="detailUserListForm.loginName" type="text" ></Input></FormItem>
                    </Col>
                    <Col span='6'>
                        <FormItem label="姓名 ："><Input v-model="detailUserListForm.userName" type="text" ></Input></FormItem>
                    </Col>
                    <Col span='6'>
                        <FormItem label="部门:"><Input v-model="detailUserListForm.department" type="text" ></Input></FormItem>
                    </Col>
                    <Col span='6'  class="text-right">
                        <FormItem>
                            <Button type="primary" @click="searchDetailUserList">查询</Button>
                            <Button type="default" @click="clearDetailUserListForm">重置</Button>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-show="tab === 3">
                    <Col span='6'>
                        <FormItem label="角色名称 ："><Input v-model="detailRoleListForm.roleName" type="text" ></Input></FormItem>
                    </Col>
                    <Col span='6'>
                        <FormItem label="状态:">
                        <Select v-model="detailRoleListForm.disabled" class="form-select">
                            <Option value="0">启用</Option>
                            <Option value="1">禁用</Option>
                        </Select>
                        </FormItem>
                    </Col>
                    <Col span='12'  class="text-right">
                        <FormItem>
                            <Button type="primary" @click="searchDetailRoleList">查询</Button>
                            <Button type="default" @click="clearDetailRoleListForm">重置</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Row class="table-con">
                <Col span="24"  v-show="tab === 1">
                    <Table
                        :data="tableData1"
                        :columns="columns1"
                        ref="dragTable"
                        :stripe="true"
                        :border="true"
                        @on-selection-change="selectChange">
                    </Table>
                </Col>
                <Col span="24"  v-show="tab === 2">
                    <Table
                    :data="tableData2"
                    :columns="columns2"
                    ref="dragTable"
                    :stripe="true"
                    :border="true">
                    <tr v-for="item in tableData2">
                        <td>{{item.name}}</td>
                        <td>{{item.path}}</td>
                        <td>{{item.creater}}</td>
                        <td>{{item.creatTime}}</td>
                    </tr>
                    </Table>
                </Col>
                <Col span="24"  v-show="tab === 3">
                    <Table
                    :data="tableData3"
                    :columns="columns3"
                    ref="dragTable"
                    :stripe="true"
                    :border="true">
                    <tr v-for="item in tableData3">
                        <td>{{item.name}}</td>
                        <td>{{item.path}}</td>
                        <td>{{item.creater}}</td>
                        <td>{{item.creatTime}}</td>
                    </tr>
                    </Table>
                </Col>
                <Col span="24">
                    <oil-page
                        :total="total"
                        :page-size="pageSize"
                        :page-num="pageNum"
                        @page-change="pageChange"
                        :page-size-opts="pageSizeOpts"
                        :show-sizer="showSizer"
                        class="pagebox">
                    </oil-page>
                    <div style="text-align:center;">
                        <Button type="primary"  @click="backtoCollocatedFunctions">返回</Button>
                    </div>
                </Col>
            </Row>
        </Col>
    </Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import { getModelOperation,detailPermissionList,detailRoleList,detailUserList, deletePermissionList } from '../../components/axios/EAC.js'
import { formData } from "../../../assets/js/common.js";
export default {
  name:'collocatedFunctionsDetail',
  components: {
      OilPage
  },
  data(){
    return{
        removeModal: false,
        moduleOperationId:0,
        moduleOperationIds:[],
        soloIds: [],
        moduleOperationInfo: {
            id:'',
            moduleCode: '',
            moduleName:'',
            name: '',
            url: '',
            disabled: '',
            disabledDesc: ''
        },
        detailPermissionListForm:{
            permissionName:''
        },
        detailUserListForm:{
            department:'',
            loginName:'',
            userName:''
        },
        detailRoleListForm:{
            disabled:'',
            roleName:''
        },
        total: 0,
        pageSize: 10,
        pageNum: 1,
        showSizer: true,
        pageSizeOpts: [5, 10, 20, 30],
        tab: 1,
        value1:'',
        seltctValue1:[{}],
        seltctValue2:[{}],
        typeList:[{
            value:'all',
            label:'请选择'
        }],
        bumenList:[{
            value:'all',
            label:'请输入部门名'
        }],
        columns1:[{
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },{
            title:'权限名称',
            key:'name',
            minWidth:120
        },{
            title:'所属模块',
            key:'moduleName',
            minWidth:150
        },{
            title:'创建人',
            key:'creatorName',
            minWidth:120
        },{
            title:'创建时间',
            key:'createTimeDesc',
            minWidth:150
        },{
            title:'操作',
            key:'make',
            minWidth:100,
            render:(h,data)=>{
                return h('span',{
                  style: {
                    marginRight: '8px',
                    cursor: 'pointer',
                    color:'red',
                    textDecoration: 'underline'
                  },
                  on:{
                    click:()=>{
                      let ids = [];
                      ids.push(data.row.permissionId)
                      this.soloIds = ids
                      this.soloDelete()
                    }
                  },
                },'删除')
            }
        },],
        tableData1:[{
            checkbox:'',
            name:'',
            moduleCode:'',
            moduleName:'',
            creatorName:'',
            createTimeDesc:'',
            make:''
        }],
          columns2:[{
            title:'用户名',
            key:'loginName',
            minWidth:120
        },{
            title:'姓名',
            key:'name',
            minWidth:120
        },{
            title:'部门',
            key:'department',
            minWidth:150
        },{
            title:'职位',
            key:'position',
            minWidth:150
        },{
            title:'座机号',
            key:'phoneNumber',
            minWidth: 150
        },{
            title:'是否在职',
            key:'isJob',
            minWidth:100
        }],
        tableData2:[{
            loginName:'',
            name:'',
            department:'',
            position:'',
            phoneNumber:'',
            isJob:''
        }],
        columns3:[{
            title:'角色名称',
            key:'name',
            minWidth:250
        },{
            title:'状态',
            key:'disabledDesc',
            minWidth:200
        },{
            title:'创建人',
            key:'creatorName',
            minWidth:250
        },{
            title:'创建时间',
            key:'createTimeDesc',
            minWidth:200
        }],
        tableData3:[{
            name:'',
            disabledDesc:'',
            creatorName:'',
            createTimeDesc:''
        }]

    }
  },
  created() {
      this.moduleOperationId = this.$route.query.id;
      this.getOperation();
      this.getDetailPermissionList();
  },
  methods:{
    // 获取头部信息
    getOperation(){
        let form ={
            moduleOperationId: this.moduleOperationId
        }
        getModelOperation(form).then(res => {
            this.moduleOperationInfo.moduleCode = res.response.moduleCode
            this.moduleOperationInfo.moduleName = res.response.moduleName
            this.moduleOperationInfo.name = res.response.name
            this.moduleOperationInfo.url = res.response.url
            this.moduleOperationInfo.disabled = res.response.disabled
            this.moduleOperationInfo.disabledDesc = res.response.disabledDesc
        })
    },
    //查询1
    searchDetailPermissionList(){
        this.pageNum=1;
        this.getDetailPermissionList();
    },
    //关联权限列表-detailPermissionList
    getDetailPermissionList(){
        let form ={
            operationId: this.moduleOperationId,
            name:this.detailPermissionListForm.permissionName,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }
        detailPermissionList(form).then(res => {
            if(res.response.total > 0){
                this.tableData1 = res.response.list;
            }else {
                this.tableData1 = []
            }
            this.total = res.response.total;
            this.$Spin.hide();
        })
    },
    // 查询添加重置
    clearDetailPermissionListForm(){
      this.detailPermissionListForm.permissionName = ''
      // this.getDetailPermissionList();
    },
    searchDetailUserList(){
        this.pageNum=1;
        this.getDetailUserList();
    },
    //关联用户列表-detailUserList
    getDetailUserList(){
        let form ={
            operationId: this.moduleOperationId,
            department:this.detailUserListForm.department,
            loginName:this.detailUserListForm.loginName,
            name:this.detailUserListForm.userName,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }
        detailUserList(form).then(res => {
            if(res.response.total > 0){
                this.tableData2 = res.response.list;
            }else {
                this.tableData2 = []
            }
            this.total = res.response.total;
            this.$Spin.hide();
        })
    },
    // 查询添加重置
    clearDetailUserListForm(){
        this.detailUserListForm.department = ''
        this.detailUserListForm.userName = ''
        this.detailUserListForm.loginName = ''
        // this.getDetailUserList()
    },
    searchDetailRoleList(){
        this.pageNum=1;
        this.getDetailRoleList();
    },
    //关联角色列表-detailRoleList
    getDetailRoleList(){
        let form ={
            operationId: this.moduleOperationId,
            disabled:this.detailRoleListForm.disabled,
            name:this.detailRoleListForm.roleName,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }
        detailRoleList(form).then(res => {
            if(res.response.total > 0){
                this.tableData3 = res.response.list;
            }else {
                this.tableData3 = []
            }
            this.total = res.response.total;
            this.$Spin.hide();
        })
    },
    // 查询添加重置
    clearDetailRoleListForm(){
        this.detailRoleListForm.disabled = ''
        this.detailRoleListForm.roleName = ''
        // this.getDetailRoleList()
    },
    //点击切换到关联权限列表
    changeTab1 () {
        this.tab = 1;
        this.getDetailPermissionList();
    },
    //点击切换到用户列表
    changeTab2 () {
        this.tab = 2;
        this.getDetailUserList();
    },
    //点击切换到角色列表
    changeTab3 () {
        this.tab = 3;
        this.getDetailRoleList();
    },
    selectChange(select){
      this.soloIds = select.map(item => {
          return item.permissionId
      })
      console.log(this.soloIds)
    },
    //删除关联权限列表
    singleSoloDelete (){
      this.$Spin.show();
      var form = new URLSearchParams();
      form.append("permissionIds[]", this.soloIds);
      form.append("operationId", this.moduleOperationId);
      deletePermissionList(form).then(res => {
        this.$Message.success(res.message);
        this.$Spin.hide();
        this.removeModal = false
        this.getDetailPermissionList()
      })
    },
    //批量删除关联权限列表
    soloDelete (){
      if(this.soloIds.length > 0){
        this.removeModal = true
      }else {
        this.$Message.warning("请选择要删除的权限")
      }
    },
    cancelSolo (){
      this.removeModal = false
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      if(this.tab == 1) {
          this.getDetailPermissionList()
      }else if(this.tab == 2) {
          this.getDetailUserList()
      }else if(this.tab == 3) {
          this.getDetailRoleList()
      }
    },
    //返回
    backtoCollocatedFunctions(){
        this.$router.push({
          name:"collocatedFunctions",
          query: {
            code: this.$route.query.code,
            pageSize: this.$route.query.pageSize,
            pageNum: this.$route.query.pageNum
          }
        })
    }
  }
}
</script>


