<template>
  <Row>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：后台权限&nbsp;&nbsp;>>&nbsp;&nbsp;工作台管理
      </Row>
    </i-col>

    <Col span='24'>

      <Card style="margin-bottom:20px">
        <Form :label-width="100">
          <Row>
            <Col span="6">
              <FormItem label="工作台名称 :">
                <Input class="search-input" v-model="form.name"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="状态：" prop="disabled">
                <Select v-model="form.disabled" class="form-select">
                  <Option value="0">正常</Option>
                  <Option value="1">禁用</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span='12' class="text-right">
                <Button type="primary" @click="searchWorkBenchListPage" style="margin-right:20px">查询</Button>
                <Button @click="clear">重置</Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Row class-name="table-con">
        <div style="margin-bottom:20px;">
          <Button type="primary" style="margin-right:20px;" @click="addModalBtn">新增</Button>
          <Button type="error" @click="lotDelete">删除</Button>
        </div>
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true"
          @on-selection-change="selectChange">
          <tr v-for="item in tableData">
            <td>{{item.name}}</td>
            <td>{{item.path}}</td>
            <td>{{item.creater}}</td>
            <td>{{item.creatTime}}</td>
          </tr>
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

    </Col>
    <!-- 新增弹窗开始 -->
    <Modal v-model="addmodal" title="新增操作" @on-cancel="addModalCancel" width="550" >
      <Form ref="addform" :model="addform" :rules="addformRules" :label-width="120" >
        <FormItem label="工作台名称  : " prop="name">
          <Input type="text" v-model="addform.name" :maxlength="200" style="width:300px" class="search-input"></Input>
        </FormItem>
        <FormItem label="工作台URL :" prop="url">
          <Input type="text" v-model="addform.url" :maxlength="200" style="width:300px" class="search-input"></Input>
        </FormItem>
        <FormItem label="备注 :">
          <Input type="text" v-model="addform.note" :maxlength="200" style="width:300px" class="search-input"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="addModalSubmit">确认</i-button>
        <i-button @click="addModalCancel">取消</i-button>
      </div>
    </Modal>
    <!-- 新增弹窗结束 -->

    <!-- 编辑弹窗开始 -->
    <Modal v-model="editmodal" title="编辑操作" @on-cancel="editModalCancel" width="550" >
      <Form ref="editform" :model="editform" :rules="editformRules" :label-width="120" >
        <FormItem label="工作台名称:" prop="name">
          <Input type="text" v-model="editform.name" style="width:300px" class="search-input">
        </Input></FormItem>
        <FormItem label="工作台URL:" prop="url">
          <Input type="text" v-model="editform.url" style="width:300px" class="search-input"></Input>
        </FormItem>
        <FormItem label="备注:">
          <Input type="text" v-model="editform.note" style="width:300px" class="search-input"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="editModalSubmit">确认</i-button>
        <i-button @click="editModalCancel">取消</i-button>
      </div>
    </Modal>
    <!-- 编辑弹窗结束 -->

    <!-- 关联部门弹窗开始 -->
    <Modal v-model="affiliatedDepartmentModal" @on-cancel="affiliatedModalCancel" title="关联部门" width="550" >
      <p>请选择关联部门：</p>
      <Tree ref="queryDeptTree" :data="queryTreeList" show-checkbox  style="margin-left:100px;"></Tree>
      <div slot="footer">
        <i-button type="primary" @click="affiliatedModalSubmit">保存</i-button>
        <i-button @click="affiliatedModalCancel">取消</i-button>
      </div>
    </Modal>
    <!-- 关联部门弹窗结束 -->

    <!-- 关联人员弹窗开始 -->
    <Modal v-model="affiliatedManModal" @on-cancel="manModalback" title="关联人员" width="1000" >
      <Form ref="affiliatedManform" :model="affiliatedManform" style="height:100px;">
        <Col span='6'><FormItem label="姓名 : " :label-width="50"><Input type="text" v-model="affiliatedManform.name" class="search-input"></Input></FormItem></Col>
        <Col span='6'><FormItem label="部门 : " :label-width="60">
            <Select v-model="affiliatedManform.orgId" filterable class="search-input" @on-query-change="getDept" placeholder="请输入部门">
						  <Option v-for="item in depts" :value="item.id" :key="item.id">{{ item.text }}</Option>
					  </Select>
        </FormItem></Col>
        <Col span='6'>
          <FormItem label="在职状态 : " :label-width="100">
            <Select v-model="affiliatedManform.isJob">
              <Option v-for="item in state" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span='6' class="text-right">
          <Button type="primary" style="margin-right:20px" @click="getRelatedUsersOfUserListPage">查询</Button>
          <Button @click="clearEmp">重置</Button>
        </Col>
        <Col span='24'>
          <Button type="primary" style="margin-right:20px" @click="lotAdd">保存添加</Button>
        </Col>
      </Form>
      <Table class="tableCommon"
        :data="tableData1"
        :columns="columns1"
        ref="dragTable"
        :stripe="true"
        :border="true"
        @on-selection-change="selectChange1">
        <tr v-for="item in tableData1">
          <td>{{item.name}}</td>
          <td>{{item.path}}</td>
          <td>{{item.creater}}</td>
          <td>{{item.creatTime}}</td>
        </tr>
      </Table>
      <oil-page
          :total="total"
          :page-size="pageSize"
          @page-change="pageChangeEmp"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
      <div slot="footer">
        <i-button type="primary" @click="manModalback">返回</i-button>
      </div>
    </Modal>
    <!-- 关联人员弹窗结束 -->

  </Row>
</template>
<script>
import axios from 'axios'
import OilPage from "../../components/page/page.vue";
import { workBenchListPage, inserWorkBench, modifyWorkBench, workBenchDisabled, deptTree, relatedDepartments, relatedUsersOfUserList, relatedUsers, selectDept } from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "workbenchManagement",
  components: {
    OilPage
  },
  data(){
    return {
      selection: [],
      depts: [],
      addmodal:false,
      addform: {
        name: '',
        url: '',
        note: ''
      },
      editmodal:false,
      editform:{
        id: 0,
        name: '',
        url: '',
        note: ''
      },
      deletemodal:false,
      affiliatedDepartmentModal:false,
      affiliatedManModal:false,
      affiliatedManform:{
        name: '',
        isJob: null,
        orgId: null
      },
      queryTreeList:[],
      workBenchId:0,
      state:[{
        label:'离职',
        value:'0'
      },{
        label:'在职',
        value:'1'
      }],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      form:{
        name: "", //名称
        disabled: null
      },
      columns: [
        {
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },
        {
          key: "name",
          title: "工作台名称",
          align: "center",
          width:200,
        },
        {
          key: "url",
          align: "center",
          title: "URL地址",
          minWidth:300
        },
        {
          key: "note",
          align: "center",
          title: "备注",
          minWidth:300
        },
        {
          key: "operatorName",
          align: "center",
          title: "创建人",
          width:150,
        },
        {
          key: "createTimeDesc",
          align: "center",
          title: "创建时间",
          width:150
        },
        {
          key: "operate",
          align: "center",
          title: "禁用启用",
          width:100,
          render: (h, data) => {
            let _this = this
            return h('i-switch', {
              props: {
                value: data.row.disabled == 0 ? true : false,
                },
                on: {
                  input: function (event) {
                    _this.modifyDisabled(data, event)
                    }
                }
            })
          }
        },
        {
          key: "onOFF",
          align: "center",
          title: "操作",
          width:300,
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
                    this.$router.push({name:'workbenchManagementDetail', query: { workBenchId:data.row.id }})
                  }
                }
              }, '查看 '),
              h('span', {
                style: {
                  marginRight: '20px',
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.editform.id=data.row.id
                    this.editform.name=data.row.name
                    this.editform.url=data.row.url
                    this.editform.note=data.row.note
                    this.editmodal=true
                    //this.editModalBtn(data)
                  }
                }
              }, '编辑 '),
              h('span', {
                style: {
                  color: 'red',
                  marginRight: '8px',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.lotDelete(data)
                  }
                }
              }, '删除 '),
              h('span', {
                style: {
                  marginRight: '20px',
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.affiliatedDepartmentBtn(data)
                  }
                }
              }, '关联部门 '),
              h('span', {
                style: {
                  marginRight: '20px',
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.affiliatedManBtn(data)
                    this.workBenchId = data.row.id
                    this.getRelatedUsersOfUserListPage();
                  }
                }
              }, '关联人员 '),
            ])
          }
        },
      ],
      tableData:[],
      columns1:[{
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },{
        title:'账号',
        key:'loginName',
        align: 'center',
        width: 150
      },{
        title:'用户姓名',
        key:'name',
        align: 'center',
        width: 200
      },{
        title:'所属部门',
        key:'department',
        align: 'center',
        minWidth: 250
      },{
        title:'在职状态',
        key:'isJob',
        align: 'center',
        width: 150
      }],
      tableData1:[],
      addformRules: {
        name: [
          {required: true, message: '请输入工作台名称', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请输入工作台URL', trigger: 'blur'}
        ]
      },
      editformRules: {
        name: [
          {required: true, message: '请输入工作台名称', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请输入工作台URL', trigger: 'blur'}
        ]
      }
    }
  },
  created (){
    this.getWorkBenchListPage();
		//this.departDatas()
  },
  methods:{
    loadData (item, callback) {

      callback(data);
    },
    //查询
    searchWorkBenchListPage(){
      this.pageNum=1;
      this.getWorkBenchListPage();
    },
    // 工作台列表
		getWorkBenchListPage(){
			this.$Spin.show();
				let form = {
					name: this.form.name,
					disabled: this.form.disabled,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				};
				workBenchListPage(form).then(res => {
					this.tableData = res.response.list
					this.total = res.response.total
					this.$Spin.hide();
				});
		},
    // 关联人员列表
		getRelatedUsersOfUserListPage(){
			this.$Spin.show();
				let form = {
          isJob: this.affiliatedManform.isJob,
          orgId: this.affiliatedManform.orgId,
					name: this.affiliatedManform.name,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				};
				relatedUsersOfUserList(form).then(res => {
					this.tableData1 = res.response.list
					this.total = res.response.total
					this.$Spin.hide();
				});
		},
    //工作台管理分页
    pageChange(page, pageSize){
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getWorkBenchListPage()
    },
    //关联人员分页
    pageChangeEmp(page, pageSize){
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getRelatedUsersOfUserListPage()
    },
    //部门下拉列表
		getDeptData(name) {
			let form = {
				name: name ? name : ' '
			}
			selectDept(formData(form)).then(res => {
				this.depts = JSON.parse(res.response)
			})
		},
		getDept(data) {
			this.getDeptData(data)
		},
    //新增按钮
    addModalBtn(){
      this.addmodal=true
    },
    //新增弹层按钮
    addModalSubmit(){
      this.$refs.addform.validate((valid) => {
        if(valid){
          this.$Spin.show();
          let params = {
            name: this.addform.name,
            url: this.addform.url,
            note:this.addform.note
          }
          inserWorkBench(params).then(res => {
            this.$Message.success("新增成功！");
            this.addmodal=false
            this.addform.name = ''
            this.addform.url = ''
            this.addform.note = ''
            this.$Spin.hide();
            this.getWorkBenchListPage()
          })
        }else {
          this.$Message.warning("请输入必填项");
        }
      })
    },
    addModalCancel(){
      this.addmodal=false
      this.addform.note = ''
      this.$refs.addform.resetFields()
    },
    //启用禁用
    modifyDisabled(data, event){
      let that = this;
      if (event) {
        let jsonData = {
          workbenchId: data.row.id,
          disabled: 0
        }
        workBenchDisabled(formData(jsonData)).then(res => {
          data.row.disabled = 0
        })
      } else {
        let jsonData = {
          workbenchId: data.row.id,
          disabled: 1
        }
        workBenchDisabled(formData(jsonData)).then(res => {
          data.row.disabled = 1
        })
      }
    },
    //编辑弹层按钮
    editModalSubmit(){
      this.$refs.editform.validate((valid) => {
        if(valid){
          this.$Spin.show();
          let params = {
            id: this.editform.id,
            name: this.editform.name,
            url: this.editform.url,
            note:this.editform.note
          }
          modifyWorkBench(params).then(res => {
            this.$Message.success("编辑成功！");
            this.$Spin.hide();
            this.editmodal=false
            this.getWorkBenchListPage()
          })
        }else {
          this.$Message.warning("请输入必填项");
        }
      })
    },
    editModalCancel(){
      this.editmodal=false
      this.editform.note = ''
      this.$refs.editform.resetFields()
    },
    selectChange (selection) {
      this.selection = selection
      console.log(selection)
    },
    selectChange1 (selection) {
      this.selection = selection
      console.log(selection)
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
      if (this.selection.length > 0 || data.row) {
        this.$Modal.confirm({
          title: '提示信息',
          content: '确定删除吗？',
          onOk: () => {
          var form =null;
          if(data.row){
                form="workBenchIds=" + data.row.id;
          }else{
                form="workBenchIds="+rowData.join(",");
          }
          axios({
            url: "/eac/eac/workBench/delete",
            method: "post",
            data: form
          })
            .then(resp => {
              if (resp.data.status == "200") {
                _this.selection = [];
                _this.getWorkBenchListPage();
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
    // 保存添加
    lotAdd (data) {
      this.$Spin.show();
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
      if (_this.selection.length > 0) {
        let param = {
          userIds: rowData.join(","),
          workBenchId: this.workBenchId
        }
        relatedUsers(formData(param)).then(res => {
          _this.selection = [];
          this.$Spin.hide();
          _this.$Message.success("保存成功！");
          this.affiliatedManModal=false;
          _this.getRelatedUsersOfUserListPage();
        })
      } else {
        _this.$Message.warning('请先勾选数据');
      }
    },
    deptDigui (data){
      let dgData = data.map(item => {
        if(item.children && item.children.length > 0){
          return {
            id: item.id,
            title: item.label,
            status: item.status,
            value: item.value,
            children: this.deptDigui(item.children)
          }
        }else {
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
    //关联部门按钮
    affiliatedDepartmentBtn(data){
      this.workBenchId = data.row.id
      this.affiliatedDepartmentModal=true;
      let that = this;
      that.queryTreeList = [];
      deptTree().then(res => {
        if (res.status == "200"){
          let dataArr = [];
          dataArr = JSON.parse(res.response)
          const module = that.deptDigui(dataArr);
            module.forEach(function(e,v){
              that.queryTreeList.push(e);
            });
        } else {
          that.$Message.warning(res.message);
        }
      })
    },
    //关联部门弹层按钮
    affiliatedModalSubmit(){
      let that = this;
      this.affiliatedDepartmentModal=false;
      let dataList = this.$refs.queryDeptTree.getCheckedNodes();
      if(dataList.length == 0){
        this.$Message.error("请选择菜单！")
      }else {
        let menuIds = []
        dataList.map (item => {
          menuIds.push(item.id);
        });
        let param = {
          departmentIds: menuIds.join(","),
          workBenchId: this.workBenchId
        }
        relatedDepartments(formData(param)).then(res => {
        if (res.status == "200"){
          that.$Message.success("关联部门成功！");
        } else {
          that.$Message.warning(res.message);
        }
      })
      }
    },
    affiliatedModalCancel(){
      this.affiliatedDepartmentModal=false;
    },
    //关联人员按钮
    affiliatedManBtn(){
      this.affiliatedManform.isJob = '';
      this.affiliatedManform.orgId = '';
      this.affiliatedManform.name = '';
      this.affiliatedManModal=true;
    },
    //关联人员弹层按钮
    manModalback(){
      this.affiliatedManModal=false;
    },
    //工作台管理重置
    clear(){
      this.form.name="",
      this.form.disabled=null
    },
    //关联人员重置
    clearEmp(){
      this.affiliatedManform.name="",
      this.affiliatedManform.orgId=null,
      this.affiliatedManform.isJob=null
    }

  }
}
</script>
