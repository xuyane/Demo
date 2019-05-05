<style lang="less" scoped>
.plant-content{
    background: #fff;
    padding:0 20px 20px;
}
.unit_content{
    height:59px;
    border-left:1px solid #BBBBBB;
    border-right: 1px solid #BBBBBB;
    border-bottom: 1px solid #BBBBBB;
}
.unit_content .unit_content_left{
    height:59px;
    float: left;
    width: 33%;
}
.unit_content .no_line{
    border-right:none;
}
.unit_content .unit_s_left{
    font-size:14px;
    width: 30%;
    color:#000000;
    height:58px;
    line-height:59px;
    text-align:center;
    border-right: 1px solid #BBBBBB;
    float: left;
    background:#E9EAEF;
}
.unit_content .unit_s_right{
    width: 70%;
    height:59px;
    line-height:59px;
    font-size:14px;
    color:#000000;
    text-align:center;
    border-right: 1px solid #BBBBBB;
    float: left;
}
.unit_content .no-right-border{
    border-right: 0;
}
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
        当前位置：权限管理 &nbsp;&nbsp;>>&nbsp;&nbsp;管理员设定 &nbsp;&nbsp;>>&nbsp;&nbsp;设置管理员
    </Row>
  </Col>
  <Col span="24" class="plant-content" style="padding-top: 20px">
    <!--信息单元-->
    <div class="unit" style="border-top: 1px solid #BBBBBB">
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">组织架构ID</div>
          <div class="unit_s_right">{{id}}</div>
        </div>
        <div class="unit_content_left">
          <div class="unit_s_left">组织架构名称</div>
          <div class="unit_s_right">{{name}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">组织架构路径</div>
          <div class="unit_s_right no-right-border">{{wname}}</div>
        </div>
      </div>
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">组织架构编码</div>
          <div class="unit_s_right">{{code}}</div>
        </div>
        <div class="unit_content_left">
          <div class="unit_s_left">状态</div>
          <div class="unit_s_right">{{status}}</div>
        </div>
      </div>
    </div>
  </Col>
  <Col span="24">
    <Card style="margin-bottom:20px">
      <div class="tab">
          <div class="tab-flex" @click="changeTab(1)" :class="tab === 1 ? 'tab-active' : ''">分配管理员</div>
          <div class="tab-flex2" @click="changeTab(2)" :class="tab === 2 ? 'tab-active' : ''">部门成员</div>
      </div>

      <Form ref="form" :model="form" :label-width="80" v-show="tab === 1">
        <Row type="flex" justify="space-between">
          <Col span="6">
            <FormItem label="姓名:" style="margin-right: 30px">
              <Select v-model="seltctValue1" filterable class="search-input" @on-change="onSelectVal" @on-query-change="getEmployee" :label-in-value="true">
                <Option v-for="item in employees" :value="item.id" :key="item.id" :label="item.text">{{ item.text }} （{{ item.orgName }}）</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="18">
            <Button type="primary" @click="createAdmin">添加关联</Button>
          </Col>
        </Row>
      </Form>

      <Form ref="form" :model="form" :label-width="50" v-show="tab === 2">
        <Row type="flex" justify="space-between">
          <Col span="6">
            <FormItem label="姓名:">
            	<Input type="text" class="search-input" v-model="form.name"></Input>
          	</FormItem>
          </Col>
          <Col span='7' class="text-right">
            <Button type="primary" @click="searchListPage">查询</Button>
            <Button style="margin-left: 8px" @click="clearEmp">重置</Button>
        	</Col>
        </Row>
      </Form>

    </Card>
  </Col>
  <Col span="24">

    <Row v-show="tab === 1" class-name="table-con">
      <Form :label-width="80" :model="empForm">
        <Col span="2">
          <Button type="primary" @click="lotDelete">批量取消</Button>
        </Col>
        <Col span="6">
          <FormItem label="用户名:">
            <Input type="text" class="search-input" v-model="empForm.loginName"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="姓名:">
            <Input type="text" class="search-input" v-model="empForm.name"></Input>
          </FormItem>
        </Col>
        <Col span='10' class="text-right">
            <Button type="primary" @click="searchEmployeeListPage">查询</Button>
            <Button style="margin-left: 8px" @click="clear">重置</Button>
        </Col>
      </Form>
      <Col span="24">
        <Table class="tableCommon" :data="tableData1" :columns="columns1" @on-selection-change="selectChange"></Table>
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
      <Col span='24' style="text-align:center;">
        <Button type="primary" @click="backto">返回</Button>
      </Col>
    </Row>

		<Row v-show="tab === 2" class-name="table-con">
      <Col span="24">
        <Table class="tableCommon" :data="tableData2" :columns="columns2"></Table>
      </Col>
      <oil-page
        :total="total"
        :page-size="pageSize"
        @page-change="pageChangeOrg"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer"
        class="pagebox">
      </oil-page>
      <Col span='24' style="text-align:center;">
        <Button type="primary" @click="backto">返回</Button>
      </Col>
    </Row>

  </Col>
</Row>
</template>
<script>
import axios from 'axios'
import OilPage from "../../components/page/page.vue";
import { orgManagerDetail, employeeListPage, selectEmployee, insertAdmin, orgListPage } from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name:'administratorSettingsDetail',
  components: {
    OilPage
  },
  data(){
    return{
      form:{
        name: ''
      },
      formRule:'',
      seltctValue1: '',
      seltctName: '',
      employeeName: '',
      employees: [],
      selection: [],
      id: this.$route.query.id,
      code: '',
      name: '',
      status: '',
      wname: '',
      empForm: {
        loginName: '',
        name: '',
        orgId: null
      },
      tab:1,
      total: 0,
      pageSize: 10,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      columns1:[{
          type: 'selection',
          minWidth: 60,
          align: 'center'
        },{
        title:'用户名',
        key:'loginName',
        align:'center',
        width:250,
      },{
        title:'姓名',
        key:'name',
        align:'center',
        width:250,
      },{
        title:'部门',
        key:'departName',
        align:'center',
        minWidth:300,
      },{
        title:'职位',
        key:'position',
        align:'center',
        width:250,
      },{
        title:'座机号',
        key:'seatNo',
        align:'center',
        width:250,
      },{
				title:'操作',
				key:'operation',
				align:'center',
        width:150,
				render:(h,data)=>{
						return h('a',{
							on:{
								click: ()=>{
                   this.lotDelete(data)
								}
							}
						},'取消关联')
				}
				}],
      tableData1:[],
			columns2:[{
        title:'用户名',
        key:'loginName',
        align:'center',
        width:250,
      },{
        title:'姓名',
        key:'name',
        align:'center',
        width:250,
      },{
        title:'部门',
        key:'deptName',
        align:'center',
        minWidth:300,
      },{
        title:'职位',
        key:'position',
        align:'center',
        width:250,
      },{
        title:'座机号',
        key:'phone',
        align:'center',
        width:300,
      }],
      tableData2:[]

    }
  },
  created (){
    this.getOrgData();
    this.getEmployeeListPage();
    this.getOrgListPage();
  },
  methods:{
    //获取机构信息
    getOrgData(){
      let that = this
      that.$Spin.show()
      console.log(that.id)
      let jsonData = { id:that.id }
      orgManagerDetail(formData(jsonData)).then(res => {
        that.id = res.response.id
        that.code = res.response.code
        that.name = res.response.name
        that.status = res.response.status
        that.wname = res.response.wname
        that.$Spin.hide()
      })
    },
    //管理员分页查询点击
    searchEmployeeListPage(){
      this.pageNum=1;
      this.getEmployeeListPage();
    },
    //管理员分页查询
    getEmployeeListPage(){
      this.$Spin.show()
      let form = {
        loginName: this.empForm.loginName,
        name: this.empForm.name,
        orgId: this.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sign: ''
      };
      employeeListPage(form).then(res => {
        if(res.response.total > 0){
          this.tableData1 = res.response.list
        }else {
          this.tableData1 = []
        }
        this.total = res.response.total
        this.$Spin.hide();
      });
    },
    //查询触发
    searchListPage (){
      this.pageNum = 1;
      this.getOrgListPage ();
    },
    //成员的分页查询
    getOrgListPage(){
      this.$Spin.show()
      let form = {
        name: this.form.name,
        orgId: this.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sign: ''
      };
      orgListPage(form).then(res => {
        if(res.response.total > 0){
          this.tableData2 = res.response.list
        }else {
          this.tableData2 = []
        }
        this.total = res.response.total
        this.$Spin.hide();
      });
    },
    //员工查询select选中事件
    onSelectVal(val){
       console.log(val);
       this.seltctName = val.label
    },
    //员工下拉列表
		getEmployeeData(name) {
			let form = {
				name: name ? name : ' '
			}
			selectEmployee(formData(form)).then(res => {
				this.employees = JSON.parse(res.response)
			})
		},
		getEmployee(data) {
			this.getEmployeeData(data)
		},
    selectChange (selection) {
      this.selection = selection
      console.log(selection)
    },
    //添加关联
    createAdmin(){
      console.log(this.seltctName)
      let form = {
        employeeId: this.seltctValue1,
        name: this.seltctName,
        orgId: this.id
      }
      insertAdmin(form).then(res => {
				this.getOrgData();
        this.getEmployeeListPage();
			})
    },
  //点击切换到待审核
    changeTab (index) {
      if(index == 1){
        this.tab = 1
        this.getEmployeeListPage();
      }else {
        this.tab = 2
        this.getOrgListPage();
      }
    },
    // 批量删除
    lotDelete (data) {
      var _this=this;
      var dataArr=this.selection;
      var rowData=[];
      dataArr.forEach(function(e,v){
          console.log(e.id);
          if(e.id){
              rowData.push(e.id);
         }
      })
      console.log(rowData);
      if (this.selection.length > 0 || data.row.id) {
        this.$Modal.confirm({
          title: '提示信息',
          content: '确定删除吗？',
          onOk: () => {
          var form =null;
          if(data.row){
                form="ids=" + data.row.id;
          }else{
                form="ids="+rowData.join(",");
          }
          axios({
            url: "/eac/orgManager/del/Employee",
            method: "post",
            data: form
          })
            .then(resp => {
              if (resp.data.status == "200") {
                _this.selection = [],
                _this.getEmployeeListPage();
              } else {
                _this.$Message.warning(resp.data.message);
              }
            })
            .catch(err => {
              _this.$Message.warning(err.message);
            });
          },
          onCancel: () => {
            console.log('cancel')
          }
        });
      } else {
        this.$Message.warning('请先勾选数据');
      }
    },
		//取消关联
   cancelContact(){

   },
   // 监听跳转分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getEmployeeListPage()
    },
    // 监听跳转分页
    pageChangeOrg (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getOrgListPage()
    },
    //分配管理员重置
    clear(){
      this.empForm.name="",
      this.empForm.loginName=""
    },
    //部门成员重置
    clearEmp(){
      this.form.name=""
    },
   //返回
   backto(){
     this.$router.push({name:'administratorSettings'})
   }
  }
}
</script>
