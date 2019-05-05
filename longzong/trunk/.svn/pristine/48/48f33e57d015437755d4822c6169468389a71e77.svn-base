<style lang="less" scoped>
@import '../../information/taskplant/taskplant.less';
.plant-content{
 margin-bottom: 20px;
}

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
        当前位置：权限管理 &nbsp;&nbsp;>>&nbsp;&nbsp;账号权限 &nbsp;&nbsp;>>&nbsp;&nbsp;详情
    </Row>
  </Col>
  <Col span="24" class="plant-content" style="padding-top: 20px">
    <!--信息单元-->
    <div class="unit" style="border-top: 1px solid #BBBBBB">
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">用户名</div>
          <div class="unit_s_right">{{userForm.loginName}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">姓名</div>
          <div class="unit_s_right no-right-border">{{userForm.name}}</div>
        </div>
      </div>
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">所属部门</div>
          <div class="unit_s_right">{{userForm.deptName}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">在职情况</div>
          <div class="unit_s_right no-right-border">{{userForm.job}}</div>
        </div>
      </div>
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">职位</div>
          <div class="unit_s_right">{{userForm.position}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">账号情况</div>
          <div class="unit_s_right no-right-border">{{userForm.status}}</div>
        </div>
      </div>
    </div>
  </Col>
  <Col span="24">
    <Card style="margin-bottom:20px">
      <div class="tab">
          <div class="tab-flex" @click="changeTab(1)" :class="tab === 1 ? 'tab-active' : ''">操作查看</div>
          <div class="tab-flex2" @click="changeTab(2)" :class="tab === 2 ? 'tab-active' : ''">角色配置</div>
          <div class="tab-flex2" @click="changeTab(3)" :class="tab === 3 ? 'tab-active' : ''">菜单查看</div>
          <div class="tab-flex2" @click="changeTab(4)" :class="tab === 4 ? 'tab-active' : ''">部门管理授权</div>
      </div>

      <Form ref="form" :model="form" :label-width="80" v-show="tab === 1">
        <Row type="flex" justify="space-between">
          <Col span="6">
            <FormItem label="功能名称:">
              <Input v-model="operationReqForm.name" type="text" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="操作URL:">
              <Input v-model="operationReqForm.url" type="text" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="创建人:">
              <Input v-model="operationReqForm.creatorName" type="text" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span='6' class="text-right">
              <Button type="primary" @click="searchListPage" >查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>

      <Form ref="form" :model="form" :label-width="80" v-show="tab === 2">
        <Row type="flex" justify="space-between">
          <Col span="6">
            <FormItem label="角色名称:" style="margin-right: 30px">
              <Select v-model="roleId" filterable ref="roleSelect" @on-query-change="remoteMethod" class="search-input" @on-open-change="clearQuery" placeholder="请输入角色名称">
                <Option v-for="item in roleNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="18">
            <Button type="primary" @click="AddRole">添加关联</Button>
          </Col>
        </Row>
      </Form>

      <Form ref="form" :model="form" :label-width="80" v-show="tab === 3">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="菜单树:">
              <Input v-model="menuReqForm.menuTree" readonly @on-focus="getMenuTree()" type="text" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="菜单名称:">
              <Input v-model="menuReqForm.name" type="text" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="URL:">
               <Input v-model="menuReqForm.url" type="text" class="search-input"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="绑定角色:">
              <Input v-model="menuReqForm.bindingroleName" type="text" class="search-input"></Input>
            </FormItem>
          </Col >
          <Col span='7' class="text-right">
              <Button type="primary" @click="menuListPage">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>

      <Form ref="form" :model="form" :label-width="80" v-show="tab === 4">
        <Row type="flex" justify="space-between">
          <Col span="6">
            <FormItem label="部门名称:" style="margin-right: 30px">
              <Input v-model="departTree" readonly @on-focus="getDepartTree()" type="text" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span="18">
            <Button type="primary" @click="addPermission">添加授权</Button>
          </Col>
        </Row>
      </Form>

    </Card>
  </Col>
  <Col span="24">

    <Row v-show="tab === 1" class-name="table-con">
      <Col span="24">
        <Table class="tableCommon" :data="tableData1" :columns="columns1"></Table>
      </Col>
      <oil-page
        :total="total"
        :page-size="pageSize"
        :page-num="pageNum"
        @page-change="pageChange"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer"
        class="pagebox">
      </oil-page>
    </Row>

    <Row v-show="tab === 2" class-name="table-con">
      <Form :label-width="80">
        <Col span="2">
          <Button type="primary" @click="deleteRoleBatch">批量取消</Button>
        </Col>
        <Col span="7">
          <FormItem label="角色名称:">
            <Input v-model="roleReqForm.name" type="text" class="search-input"></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="创建人:">
             <Input v-model="roleReqForm.creatorName" type="text" class="search-input"></Input>
          </FormItem>
        </Col>
        <Col span='7' class="text-right">
            <Button type="primary" @click="roleListPage">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
        </Col>
      </Form>
      <Col span="24">
        <Table class="tableCommon" :data="tableData2" :columns="columns2"  @on-selection-change="selectChange1"></Table>
      </Col>
      <oil-page
        :total="total"
        :page-size="pageSize"
        @page-change="pageChange"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer"
        class="pagebox">
      </oil-page>
    </Row>

    <Row v-show="tab === 3" class-name="table-con">
     <!-- <Form :label-width="80">
        <FormItem label="绑定角色:" style="width:400px">
          <Input type="text"></Input>
        </FormItem>
      </Form>-->
      <Col span="24">
        <Table class="tableCommon" :data="tableData3" :columns="columns3"></Table>
      </Col>
      <oil-page
        :total="total"
        :page-size="pageSize"
        @page-change="pageChange"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer"
        class="pagebox">
      </oil-page>
    </Row>

    <Row v-show="tab === 4" class-name="table-con">
      <Form :label-width="100">
        <Col span="2">
          <Button type="primary" @click = "showCancelModel">批量取消</Button>
        </Col>
        <Col span="7">
          <FormItem label="部门名称:">
             <Input v-model="deptReqForm.departName" type="text" class="search-input"></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="关联创建人:">
            <Input v-model="deptReqForm.createName" type="text" class="search-input"></Input>
          </FormItem>
        </Col>
        <Col span='7' class="text-right">
            <Button type="primary" @click="permissionListPage">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
        </Col>
      </Form>
      <Col span="24">
        <Table class="tableCommon" :data="tableData4" :columns="columns4" @on-selection-change="selectChange2"></Table>
      </Col>
      <oil-page
        :total="total"
        :page-size="pageSize"
        @page-change="pageChange"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer"
        class="pagebox">
      </oil-page>
    </Row>
    <div style="background-color:#fff;text-align:center;">
      <Button type="primary" style="margin-bottom:20px;" @click="backtoAccountAuthority">返回</Button>
    </div>
    <Modal
      v-model="menuModel"
      title="菜单树"
      @on-cancel="menuCancel">
      <div class="overflow-auto" style="max-height: 300px;">
        <Tree :data="menuDataTree" ref="menuTree" show-checkbox ></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="menuOk">确定</Button>
        <Button @click="menuCancel">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="departModel"
      title="部门树"
      @on-cancel="departCancel">
      <div class="overflow-auto" style="max-height: 300px;">
        <Tree :data="departDataTree" ref="departTree"></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="departOk">确定</Button>
        <Button @click="departCancel">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="cancelModel"
      title="取消关联"
      @on-cancel="modelCancel">
      <div class="overflow-auto" style="max-height: 300px;">
        是否取消授权?
      </div>
      <div slot="footer">
        <Button type="primary" @click="cancelPermission">确定</Button>
        <Button @click="modelCancel">取消</Button>
      </div>
    </Modal>
  </Col>
</Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import { UserPermissionAddPermission, UserPermissionDeletePermission, UserPermissionAddRole, UserPermissionGetInfo,UserPermissionGetOpreation,UserPermissionGetRoleList,UserPermissionDeleteRole,UserPermissionDeleteBatchRole,UserPermissionGetMenuList,UserPermissionGetMenuPath,UserPermissionGetPermissionList, getRoleNameList, menuTree, deptTree} from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name:'accountAuthorityDetail',
  components: {
    OilPage
  },
  data(){
    return{
      menuModel: false,
      departModel: false,
      cancelModel: false,
      departTree: '',
      departId: [],
      userForm: {
         deptName : '' ,
         id : this.$route.query.id,
         job : '',
         loginName : '',
         name : '',
         orgId : '',
         position: '',
         status : ''

      },
      operationReqForm: {
         creatorName : '' ,
         name : '',
         url : '',
         userId : this.$route.query.id
      },
      roleReqForm: {
         creatorName : '' ,
         name : '',
         userId : this.$route.query.id
      },
       menuReqForm: {
         menuId : [] ,
         menuTree: '',
         name : '',
         bindingroleName : '',
         url : '',
         userId : this.$route.query.id
      },
      deptReqForm: {
         createName : '' ,
         departName : '',
         userId : this.$route.query.id
      },
      id:this.$route.query.id,
      roleIds : [],
      roleId : '',
      ids :[],
      form:{},
      tab:1,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      roleNameList: [],
      menuDataTree: [],
      departDataTree: [],
      rolename:[{
        label:'请输入',
        value:'input'
      },{
        label:'请输入',
        value:'input'
      },{
        label:'请输入',
        value:'input'
      }],
      columns1:[
        {
          title:'功能名称',
          key:'name',
          align: "center",
          minWidth:180
        },
        {
          title:'所属模块',
          key:'moduleName',
          align: "center",
          minWidth:150
        },
        {
          title:'URL',
          key:'url',
          align: "center",
          minWidth:180
        },
        {
          title:'创建人',
          key:'creatorName',
          align: "center",
          minWidth:120
        },
        {
          title:'创建时间',
          key:'createTime',
          align: "center",
          minWidth:180
        }
      ],

      columns2:[
        {
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },
        {
          title:'角色名称',
          key:'name',
          align: "center",
          minWidth:120
        },
        {
          title:'备注',
          key:'remark	',
          align: "center",
          minWidth:180
        },
        {
          title:'创建人',
          key:'creatorName',
          align: "center",
          minWidth:150
        },
        {
          title:'创建时间',
          key:'createTime',
          align: "center",
          minWidth:120
        },
        {
          title:'状态',
          key:'disabled',
          align: "center",
          minWidth:180
        },
        {
          title:'操作',
          key:'operation',
          align: "center",
          minWidth:100,
          render:(h,data)=>{
            return h('a',{
              on:{
                click:()=>{
                  this.deleteRole(data,event)//取消用户角色关联的方法
                }
              }
            },'取消关联')
          }
        }
      ],
      columns3:[
        {
          title:'菜单id',
          key:'id',
          align: "center",
          width:70
        },
        {
          title:'菜单编码',
          key:'code',
          align: "center",
          minWidth:80
        },
        {
          title:'菜单名称',
          key:'name',
          align: "center",
          minWidth:100
        },
        {
          title:'菜单级别',
          key:'level',
          align: "center",
          minWidth:80
        },
        {
          title:'菜单全路径',
          key:'menufullpath',
          minWidth: 80,
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
        },
        {
          title:'菜单URL',
          key:'url',
          align: "center",
          minWidth:150
        },
        {
          title:'绑定角色',
          key:'roleName',
          align: "center",
          minWidth:120
        },
        {
          title:'创建人',
          key:'operatorName',
          align: "center",
          minWidth:100
        },
        {
          title:'创建时间',
          key:'lastAccess',
          align: "center",
          minWidth:120
        }
      ],
      columns4:[
        {
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },
        {
          title:'组织机构ID',
          key:'deptId',
          align: "center",
          width:90
        },
        {
          title:'组织机构编号',
          key:'code',
          align: "center",
          minWidth:100
        },
        {
          title:'组织机构名称',
          key:'name',
          align: "center",
          minWidth:180
        },
        {
          title:'部门员工',
          key:'operation',
          align: "center",
          minWidth:100,
          render:(h,data)=>{
            return h('a',{
              on:{
                click:()=>{
                  this.$router.push({
                    name:'administratorSettingsDetail',
                    query: { id:data.row.deptId }
                  })
                }
              }
            },'查看')
          }
        },
        {
          title:'关联创建人',
          key:'createName',
          align: "center",
          minWidth:180
        },
        {
          title:'创建时间',
          key:'createTime',
          align: "center",
          minWidth:180
        },
        {
          title:'操作',
          key:'operation',
          align: "center",
          minWidth:100,
          render:(h,data)=>{
            return h('a',{
              on:{
                click:()=>{
                  let ids = [];
                  ids.push(data.row.id);
                  this.permissionIds = ids;
                  this.cancelModel = true;
                }
              }
            },'取消授权')
          }
        }
      ],
      tableData1:[],
      tableData2:[],
      tableData3:[],
      tableData4:[]

    }
  },
   created () {
    // 用户信息
    this.UserPermissionGetInfoByUserId();
    //操作列表
   this.operationListPage();
   this.getMenuTreeList();
   this.getDepartTreeList();
   this.remoteMethod('');
  },
  methods:{
    //获取菜单树
    getMenuTree(){
      this.menuModel = true;
    },
    getMenuTreeList (){
      menuTree().then(res => {
        this.menuDataTree = this.menuTreeDigui(res.response)
      })
    },
    menuTreeDigui(data) {
      let dgData = data.map(item => {
        return {
          title: item.label,
          id: item.id,
          value: item.code,
          status: item.status,
          expand: true,
          children: this.menuTreeDigui(item.children)
        };
      });
      return dgData;
    },
    menuOk (){
      let menuName = this.$refs.menuTree.getCheckedNodes().map(item => {
        return item.title
      });
      this.menuReqForm.menuId = this.$refs.menuTree.getCheckedNodes().map(item => {
        return item.id
      });
      this.menuReqForm.menuTree = menuName.join(",");
      this.menuModel = false;
    },
    menuCancel (){
      this.menuModel = false;
    },
    //获取部门树
    getDepartTree(){
      this.departModel = true;
    },
    getDepartTreeList (){
      deptTree().then(res => {
        this.departDataTree = this.departTreeDigui(JSON.parse(res.response))
      })
    },
    departTreeDigui(data) {
      let dgData = data.map(item => {
        return {
          title: item.label,
          id: item.id,
          value: item.value,
          status: item.status,
          expand: true,
          children: this.departTreeDigui(item.children)
        };
      });
      return dgData;
    },
    departOk (){
      if(this.$refs.departTree.getSelectedNodes().length > 0){
        this.departTree = this.$refs.departTree.getSelectedNodes()[0].title;
        this.departId = this.$refs.departTree.getSelectedNodes()[0].id;
      }else {
        this.departTree = '';
        this.departId = '';
      }
      this.departModel = false;
    },
    departCancel (){
      this.departModel = false;
    },
    //添加授权
    addPermission (){
      if(this.departTree == '' || this.departTree == null){
        this.$Message.warning('请添加部门名称');
        return;
      }else{
        let form = {
          orgId: this.departId,
          // name: this.departTree,
          name:this.userForm.name,
          employeeId: this.operationReqForm.userId,
        }
        UserPermissionAddPermission(form).then(res => {
          this.$Message.success(res.message)
          this.permissionListPage()
        })
      }
    },
    //取消授权
    showCancelModel (){
      if(this.permissionIds < 0){
        this.$Message.warning("请选择要取消的组织机构");
      }else {
        this.cancelModel = true;
      }
    },
    modelCancel (){
      this.cancelModel = false;
    },
    cancelPermission (data){
      let form = {
        ids: this.permissionIds
      }
      UserPermissionDeletePermission(formData(form)).then(res => {
        this.$Message.success(res.message);
        this.permissionListPage();
        this.cancelModel = false;
      })
    },
    //获取角色名称下拉列表
    remoteMethod(query) {
      let that = this;
      let form = 'name='+query;
      getRoleNameList(form).then(resp => {
        const list = resp.response.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        that.roleNameList = list;
      })
    },
    //清空输入
    clearQuery (data){
      if(!data){
        if(this.$refs.roleSelect.query == ''){
          this.roleId = ''
        }
      }
    },
    AddRole (){
      if(this.roleId == ''){
        this.$Message.warning('请选择角色名称');
        return;
      }else{
        let form = {
          roleId: this.roleId,
          userId: this.userForm.id || ''
        }
        UserPermissionAddRole(form).then(res => {
          if(res.status == 200){
            this.$Message.success('关联成功');
            this.roleListPage ();
          }
        })
      }
    },
    getEmployee (query){
      if(query == ""){
        this.roleId = ''
      }
    },
  //点击切换到待审核
    changeTab (index) {
      this.pageNum = 1;
      this.pageSize = 10;
      this.tab = index;
      this.initialization()
    },
    initialization (){
      if(this.tab == 1){
        this.operationListPage();
      }else if(this.tab == 2){
        this.roleListPage ();
      }else if(this.tab == 3){
        this.menuListPage ();
      }else{
        this.permissionListPage();
      }
    },
    //根据员工id获取员工详情信息
    UserPermissionGetInfoByUserId(){
      let  UserPermissionGetInfoform = {
        id: this.id
      }
      UserPermissionGetInfo(UserPermissionGetInfoform).then(res => {
        this.userForm.deptName = res.response.deptName
        this.userForm.id = res.response.id
        this.userForm.job = res.response.job
        this.userForm.loginName = res.response.loginName
        this.userForm.deptName = res.response.deptName
        this.userForm.name = res.response.name
        this.userForm.position = res.response.position
        this.userForm.status = res.response.status
      })
    },
    //点击查询
    searchListPage (){
      this.pageNum = 1;
      this.operationListPage ();
    },
    //查询操作列表
    operationListPage () {
      this.$Spin.show();
      let form = {
        creatorName: this.operationReqForm.creatorName,
        name: this.operationReqForm.name,
        url: this.operationReqForm.url,
        userId: this.operationReqForm.userId,
        pageNum: this.pageNum,
        pageSize: this.pageSize

      }
      UserPermissionGetOpreation(formData(form)).then(res => {
        if(res.response.total > 0){
          this.tableData1 = res.response.list;
        }else {
          this.tableData1 = []
        }
        this.total = res.response.total;
        this.$Spin.hide();
      })
    },
    //查询角色列表
    roleListPage () {
      this.$Spin.show();
      let form = {
        creatorName: this.roleReqForm.creatorName,
        name: this.roleReqForm.name,
        userId: this.operationReqForm.userId,
        pageNum: this.pageNum,
        pageSize: this.pageSize

      }
      UserPermissionGetRoleList(formData(form)).then(res => {
        console.log(res)
        if(res.response.total > 0){
          this.tableData2 = res.response.list;
        }else {
          this.tableData2 = []
        }
        this.total = res.response.total;
        this.$Spin.hide();
      })
    },
    //查询菜单列表
    menuListPage () {
      this.$Spin.show();
      let form = {
        creatorName: this.menuReqForm.creatorName,
        name: this.menuReqForm.name,
        roleName: this.menuReqForm.bindingroleName,
        url:this.menuReqForm.url,
        userId: this.menuReqForm.userId,
        pageNum: this.pageNum,
        pageSize: this.pageSize

      }
      UserPermissionGetMenuList(formData(form)).then(res => {
        if(res.response.total > 0){
          this.tableData3 = res.response.list;
        }else {
          this.tableData3 = []
        }
        this.total = res.response.total;
        this.$Spin.hide();
      })
    },
    //查询部门管理授权
    permissionListPage () {
      this.$Spin.show();
      let form = {
        createName: this.deptReqForm.createName,
        departName: this.deptReqForm.departName,
        userId: this.deptReqForm.userId,
        pageNum: this.pageNum,
        pageSize: this.pageSize

      }
      UserPermissionGetPermissionList(form).then(res => {
        if(res.response){
          this.tableData4 = res.response.list;
        }else {
          this.tableData4 = []
        }
        this.total = res.response.total;
        this.$Spin.hide();
      })
    },
     // 获取菜单全路径
  showMenuPath(data, event){
    let form = {
      menuId: data.row.id
    }
    UserPermissionGetMenuPath(form).then(res => {
      if (res.status == "200"){
        event.target.innerText = res.response
      } else {
        this.$Message.warning(res.message);
      }
    })
  },
  //取消角色与用户的关联关系
  deleteRole(data, event){
    let form = {
      roleId: data.row.roleId,
      userId:this.id
    }
    UserPermissionDeleteRole(formData(form)).then(res => {
      if (res.status == "200"){
         this.roleListPage();
        event.target.innerText = res.response
      } else {
        this.$Message.warning(res.message);
      }
    })
  },
  //批量取消角色与用户的关联关系
  deleteRoleBatch(data, event){
    let form = {
      roleIds: this.roleIds,
      userId:this.id
    }
    UserPermissionDeleteBatchRole(formData(form)).then(res => {
      if (res.status == "200"){
           this.roleListPage();
        event.target.innerText = res.response

      } else {
        this.$Message.warning(res.message);
      }
    })
  },
    // table勾选框触发事件（角色列表）
    selectChange1 (selection) {
      let roleIds = selection.map(item => {
        return item.roleId
      })
      this.roleIds = roleIds;
      this.selection = selection
    },
    // table勾选框触发事件（部门授权列表）
    selectChange2 (selection) {
      let ids = selection.map(item => {
        return item.id
      })
      this.permissionIds = ids
    },
      // 监听分页（操作列表）
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.initialization()
    },
    backtoAccountAuthority (){
      this.$router.push({name:'accountAuthority'})
    },
    //重置
    reset (){
      this.operationReqForm.creatorName = ''
      this.operationReqForm.name = ''
      this.operationReqForm.url = ''
      this.roleReqForm.creatorName = ''
      this.roleReqForm.name = ''
      this.menuReqForm.menuId = []
      this.menuReqForm.menuTree = ''
      this.menuReqForm.name = ''
      this.menuReqForm.bindingroleName = ''
      this.menuReqForm.url = ''
      this.deptReqForm.createName = ''
      this.deptReqForm.departName = ''
    }
  }
}
</script>
