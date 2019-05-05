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
  .backBtne{
    background-color:#fff;
    text-align:center;
    padding-bottom:20px;
  }
</style>

<template>
<Row>
  <Col span="24">
    <Row class-name="current-position">
        当前位置：权限管理 &nbsp;&nbsp;>>&nbsp;&nbsp;工作台管理 &nbsp;&nbsp;>>&nbsp;&nbsp;详情
    </Row>
  </Col>
  <Col span="24" class="plant-content" style="padding-top: 20px">
    <!--信息单元-->
    <div class="unit" style="border-top: 1px solid #BBBBBB">
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">工作台名称</div>
          <div class="unit_s_right">{{name}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">工作台URL</div>
          <div class="unit_s_right no-right-border">{{url}}</div>
        </div>
      </div>
      <div class="unit_content">
        <div class="unit_content_left">
          <div class="unit_s_left">备注</div>
          <div class="unit_s_right">{{note}}</div>
        </div>
        <div class="unit_content_left no_line">
          <div class="unit_s_left">状态</div>
          <div class="unit_s_right no-right-border">{{disabledDesc}}</div>
        </div>
      </div>
    </div>
  </Col>
  <Col span="24">
    <Card style="margin-bottom:20px">
      <div class="tab">
          <div class="tab-flex" @click="changeTab1" :class="tab === 1 ? 'tab-active' : ''">关联人员</div>
          <div class="tab-flex2" @click="changeTab2" :class="tab === 2 ? 'tab-active' : ''">关联部门</div>
      </div>

      <Form ref="form" :model="empForm" :label-width="80" v-show="tab === 1">
        <Row type="flex" justify="space-between">
					<Col span="6">
            <FormItem label="姓名:">
            	<Input type="text" v-model="empForm.name" class="search-input"></Input>
          	</FormItem>
          </Col>
					<Col span="6">
            <FormItem label="用户名:">
            	<Input type="text" v-model="empForm.loginName" class="search-input"></Input>
          	</FormItem>
          </Col>
          <Col span="6">
            <FormItem label="状态:" style="margin-right: 30px">
              <Select v-model="empForm.job">
                <Option v-for="item in state" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span='6' class="text-right">
            <Button type="primary" @click="searchDetailUserListPage">查询</Button>
            <Button style="margin-left: 8px" @click="clearEmp">重置</Button>
        	</Col>
        </Row>
      </Form>

      <Form ref="form" :model="form" :label-width="80" v-show="tab === 2">
        <Row type="flex" justify="space-between">
          <Col span="6">
            <FormItem label="部门名称:">
            	<Input type="text" v-model="form.orgName"></Input>
          	</FormItem>
          </Col>
					<Col span="6">
            <FormItem label="部门编号:">
            	<Input type="text" v-model="form.orgCode"></Input>
          	</FormItem>
          </Col>
          <Col span='7' class="text-right">
            <Button type="primary" @click="searchDetailDepartmentListPage">查询</Button>
            <Button style="margin-left: 8px" @click="clear">重置</Button>
        	</Col>
        </Row>
      </Form>

    </Card>
  </Col>
  <Col span="24">

    <Row v-show="tab === 1" class-name="table-con">
      <Form :label-width="80">
        <Col span="2" style="margin-bottom:20px">
          <Button type="error" @click="lotDelete">批量取消</Button>
        </Col>
      </Form>
      <Col span="24">
        <Table class="tableCommon"
					:data="tableData1"
					:columns="columns1"
					ref="dragTable"
					:stripe="true"
					:border="true"
					@on-selection-change="selectChange1">
				</Table>
      </Col>
      <oil-page
        :total="total"
        :page-size="pageSize"
        :page-num="pageNum"
        @page-change="pageChangeEmp"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer"
        class="pagebox">
      </oil-page>
    </Row>

		<Row v-show="tab === 2" class-name="table-con">
			<Col span="2" style="margin-bottom:20px">
				<Button type="error" @click="lotDeleteDept">批量取消</Button>
			</Col>
      <Col span="24">
        <Table class="tableCommon"
					:data="tableData2"
					:columns="columns2"
					ref="dragTable"
					:stripe="true"
					:border="true"
					@on-selection-change="selectChange2">
				</Table>
      </Col>
      <oil-page
        :total="total"
        :page-size="pageSizei"
        @page-change="pageChangeOrg"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer"
        class="pagebox">
      </oil-page>

    </Row>
    <div class="backBtne">
      <Button type="primary" @click="backtoWork">返回</Button>
    </div>

  </Col>
</Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import { detailHead, detailDepartment, detailUser, deleteConfigWorkBench } from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name:'workbenchManagementDetail',
  components: {
    OilPage
  },
  data(){
    return{
      workBenchId: this.$route.query.workBenchId,
      name: '',
      url: '',
      note: '',
      disabledDesc: '',
      empForm:{
        job: null,
        loginName: '',
        name: ''
      },
      form:{
        orgCode: '',
        orgName: ''
      },
      tab:1,
      total: 0,
      pageSize: 10,
      pageSizei: 10,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      selection: [],
      selectionOne: [],
      state:[{
        label:'离职',
        value:'0'
      },{
        label:'在职',
        value:'1'
      }],
      columns1:[{
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },{
        title:'用户名',
        key:'loginName',
        align: 'center',
        width: 200
      },{
        title:'姓名',
        key:'name',
        align: 'center',
        width: 200
      },{
        title:'部门',
        key:'department',
        align: 'center',
        minWidth: 300
      },{
        title:'状态',
        key:'isJob',
        align: 'center',
        width: 150
      },{
        title:'添加人',
        key:'operatorName',
        align: 'center',
        width: 200
      },{
        title:'添加时间',
        key:'operatorTimeDesc',
        align: 'center',
        width: 250
      },{
				title:'操作',
        key:'operation',
        align: 'center',
				width:150,
				render:(h,data)=>{
						return h('span',{
              style: {
                color: 'red',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
							on:{
								click: ()=>{
                   this.lotDelete(data)
								}
							}
						},'删除')
				}
				}],
      tableData1:[],
			columns2:[{
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },{
        title:'组织机构ID',
        key:'orgId',
        align: 'center',
        width: 100
      },{
        title:'组织架构编码',
        key:'orgCode',
        align: 'center',
        minWidth: 350
      },{
        title:'组织架构名称',
        key:'orgName',
        align: 'center',
        width: 300
      },{
        title:'部门负责人',
        key:'leaderName',
        align: 'center',
        width: 200
      },{
        title:'创建时间',
        key:'createTimeDesc',
        align: 'center',
        width: 250
      },{
				title:'操作',
        key:'operation',
        align: 'center',
				width:150,
				render:(h,data)=>{
						return h('span',{
              style: {
                color: 'red',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
							on:{
								click: ()=>{
                   this.lotDeleteDept(data)
								}
							}
						},'删除')
				}
				}],
      tableData2:[]

    }
  },
  created (){
    this.getHeadData();
    this.getDetailUserListPage();
  },
  mounted(){
    this.getDetailUserListPage();
  },
  methods:{
    //获取头部信息
    getHeadData(){
      let that = this
      that.$Spin.show()
      console.log(that.workBenchId)
      let jsonData = { workBenchId:that.workBenchId }
      detailHead(formData(jsonData)).then(res => {
        //that.id = res.response.id
        that.name = res.response.name
        that.note = res.response.note
        that.url = res.response.url
        that.disabledDesc = res.response.disabledDesc
        that.$Spin.hide()
      })
    },
    //关联人员列表查询
    searchDetailUserListPage(){
      this.pageNum=1;
      this.getDetailUserListPage();
    },
    //关联人员列表
  getDetailUserListPage(){
    this.$Spin.show();
      let form = {
        name: this.empForm.name,
        job: this.empForm.job,
        loginName: this.empForm.loginName,
        workBenchId: this.workBenchId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sign: ''
      };
      detailUser(form).then(res => {
        console.log('获取数据',res)
        this.tableData1 = res.response.list
        this.total = res.response.total
        this.$Spin.hide();
      });
  },
  //关联部门列表查询
  searchDetailDepartmentListPage(){
    this.pageNum=1;
    this.getDetailDepartmentListPage();
  },
  //关联部门列表
  getDetailDepartmentListPage(){
    this.$Spin.show();
      let form = {
        orgName: this.form.orgName,
        orgCode: this.form.orgCode,
        workBenchId: this.workBenchId,
        pageNum: this.pageNum,
        pageSize: this.pageSizei,
        sign: ''
      };
      detailDepartment(form).then(res => {
        this.tableData2 = res.response.list
        this.total = res.response.total
        this.$Spin.hide();
      });
  },
  // 批量删除
    lotDelete (data) {
      var _this=this;
      var dataArr=this.selection;
      var rowData=[];
      dataArr.forEach(function(e,v){
          console.log(e.workbenchConfigId);
          if(e.workbenchConfigId){
              rowData.push(e.workbenchConfigId);
         }
      })
      console.log(rowData);
      console.log(data);
      if (this.selection.length > 0 || data.row) {
        this.$Modal.confirm({
          title: '提示信息',
          content: '确定删除吗？',
          onOk: () => {
            let param = {}
            if(data.row){
                param = {workBenchConfigIds: data.row.workbenchConfigId}
            }else{
                param = { workBenchConfigIds: rowData.join(",")}
            }
            deleteConfigWorkBench(formData(param)).then(res => {
            if (res.status == "200"){
              _this.selection = [];
              _this.getDetailUserListPage();
            } else {
              _this.$Message.warning(res.message);
            }})
          },
          onCancel: () => {
            console.log('cancel')
          }
        });
      } else {
        this.$Message.warning('请先勾选数据');
      }
    },
    // 批量删除
    lotDeleteDept (data) {
      var _this=this;
      var dataArr=this.selectionOne;
      var rowData=[];
      dataArr.forEach(function(e,v){
          console.log(e.workbenchConfigId);
          if(e.workbenchConfigId){
              rowData.push(e.workbenchConfigId);
         }
      })
      console.log(rowData);
      console.log(this.selectionOne.length);
      if (this.selectionOne.length > 0 || data.row) {
        this.$Modal.confirm({
          title: '提示信息',
          content: '确定删除吗？',
          onOk: () => {
            let param = {}
            if(data.row){
                param = {workBenchConfigIds: data.row.workbenchConfigId}
            }else{
                param = { workBenchConfigIds: rowData.join(",")}
            }
            deleteConfigWorkBench(formData(param)).then(res => {
            if (res.status == "200"){
              _this.selectionOne = [];
              _this.getDetailDepartmentListPage();
            } else {
              _this.$Message.warning(res.message);
            }})
          },
          onCancel: () => {
            console.log('cancel')
          }
        });
      } else {
        this.$Message.warning('请先勾选数据');
      }
    },
  //点击切换到待审核
    changeTab1 () {
      this.tab = 1
      this.getDetailUserListPage();
    },
    //点击切换到已审核
    changeTab2 () {
      this.tab = 2
      this.getDetailDepartmentListPage();
		},
		//全选
   selectChange1(selection){
     this.selection = selection
      console.log(selection)
	 },
	 selectChange2(selection){
     this.selectionOne = selection
      console.log(selection)
	 },
	 //关联部门分页
	 pageChangeOrg(page, pageSizei){
     console.log(page,pageSizei);
		 if(page) {
        this.pageNum = page
      }
      if(pageSizei) {
        this.pageSizei = pageSizei
      }
      this.getDetailDepartmentListPage()
   },
   //关联人员分页
    pageChangeEmp(page, pageSize){
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getDetailUserListPage()
    },
   //关联部门重置
    clear(){
      this.form.orgName="",
      this.form.orgCode=""
    },
    //关联人员重置
    clearEmp(){
      this.empForm.loginName="",
      this.empForm.name="",
      this.empForm.job=null
    },
   //返回
   backtoWork(){
     this.$router.push({name:'workbenchManagement'})
   }
  }
}
</script>
