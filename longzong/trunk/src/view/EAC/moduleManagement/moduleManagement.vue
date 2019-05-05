<template>
  <Row>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：后台权限&nbsp;&nbsp;>>&nbsp;&nbsp;模块管理
      </Row>
    </i-col>
    <Col span='24'>
      <Row :gutter="20">
        <Col span='4'>
          <div class='leftree'>
            <Card :bordered="false">
              <p slot="title">模块树</p>
              <div class="overflow-auto">
                <Tree :data="modTree" @on-select-change='treeSelectData'></Tree>
              </div>
            </Card>
          </div>
        </Col>
        <Col span='20'>
          <Card style="margin-bottom:20px">
              <Form ref="form" :model="form" :rules="formRule" :label-width="80">
                <Row type="flex" justify="space-between">
                  <Col span="8">
                    <FormItem label="模块名称:">
                      <Input v-model="moduleName" class="search-input" placeholder="请输入模块名称"></Input>
                    </FormItem>
                  </Col>
                  <Col span='10' class="text-right">
                      <Button type="primary" @click="searchListPage">查询</Button>
                      <Button @click="clear" style="margin-left: 8px">重置</Button>
                  </Col>
                </Row>
              </Form>
          </Card>
          <Row class-name="table-con">
              <div class="btn-container">
                <Button type="primary" class="search-btn" @click="addModule">新增模块</Button>
                <span v-model="treeData" style="margin-left:20px;font-size:16px;">选中上级节点：{{treeData}}</span>
              </div>
              <Table class="tableCommon" :data="tableData" :columns="columns"></Table>
              <oil-page
                :total="total"
                :page-num="pageNum"
                :page-size="pageSize"
                @page-change="pageChange"
                :page-size-opts="pageSizeOpts"
                :show-sizer="showSizer">
              </oil-page>
            </Row>
        </Col>
      </Row>
    </Col>

    <!-- 当没有选择节点时显示的弹窗 -->
    <Modal v-model="modal1" title="提示信息" @on-ok="ok" okText="返回">
        <p class="text-center">请在左侧模块树选择节点</p>
        <div slot="footer">
            <Button  style="margin-left:8px;" @click="modalCancel">返回</Button>
        </div>
    </Modal>
    <!-- 已选择节点时显示的弹窗开始 -->
    <Modal v-model="modal2" title="新增">
     <Form ref="addForm" :model="form" :rules="addRules" :label-width="100">
      <Row type="flex" justify="center">
        <Col span="18">
          <FormItem label="上级名称 :">
            <p style="font-size:14px;">{{treeData}}</p>
          </FormItem>
          <FormItem label="模块名称 :" prop="moduleName">
            <Input v-model="form.moduleName" :maxlength="200" class="search-input" placeholder="请输入模板名称"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
			<i-button type="primary" @click="createModule">确认</i-button>
			<i-button type="default" @click="cancelAdd">取消</i-button>
		</div>
    </Modal>
    <!-- 已选择节点时显示的弹窗结束 -->
    <!-- 编辑弹窗开始 -->
    <Modal v-model="editModal" title="编辑">
     <Form ref="editForm" :model="editForm" :rules="editRules" :label-width="100">
      <Row type="flex" justify="center">
        <Col span="18">
          <FormItem label="上级名称 :">
            <p style="font-size:14px;">{{treeData}}</p>
          </FormItem>
          <FormItem label="模块名称 :" prop="name">
            <Input v-model="editForm.name" :maxlength="200" class="search-input" placeholder="请输入模板名称"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
			<i-button type="primary" @click="editModule">确认</i-button>
			<i-button type="default" @click="cancelEdit">取消</i-button>
		</div>
    </Modal>
    <!-- 编辑弹窗结束 -->
    <!-- 删除弹窗开始 -->
    <Modal v-model="deleteModal" title="提示信息">
      <div style="text-align:center;">
        <p style="font-size:14px;">你确定要删除么？</p>
      </div>
      <div slot="footer">
        <i-button type="primary" @click="deleteModule">确认</i-button>
        <i-button type="default" @click="deleteModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 删除弹窗结束 -->
  </Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import { moduletree, getModuleList, getModulePath, createModules, modifyModules, removeModules, statusModules } from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: 'moduleManagement',
  components: {
    OilPage
  },
  data(){
    return {
      modTree:[],
      moduleName: '',
      modal1: false,
      modal2: false,
      editModal:false,
      deleteModal:false,
      editForm:{
        moduleId: 0,
        name: '',
        parentCode: this.treeCode
      },
      treeData:"",
      treeCode:"000",
      moduleId:"",
      moduleName1:"",
      pathData:"",
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      addRules:{
        moduleName: [{ required: true, message: '请输入模块名称', trigger: 'blur'}]
      },
      editRules:{
        name: [{ required: true, message: '请输入模块名称', trigger: 'blur'}]
      },
      form:{
        moduleName: "", //模板名称
        parentCode: this.parentCode
      },
      formRule: {},
      tableData:[],
      columns: [
        {
          key: "name",
          title: "模块名称",
          align: "center",
          minWidth:120
        },
        {
          key: "path",
          align: "center",
          title: "模块全路径",
          minWidth:150,
          render: (h, data) => {
            return h('div', [
              h('a', {
                domProps: {
                  innerHTML: "显示"
                },
                style:{
                    marginRight:'20px'
                  },
                on: {
                  click: (event) => {
                    this.getPath(data, event)
                  }
                },
              }),
              ])
          }
        },
        {
          key: "creatorName",
          align: "center",
          title: "创建人",
          minWidth: 100,
        },
        {
          key: "createTime",
          align: "center",
          title: "创建时间",
          minWidth: 150
        },
        {
          key: "disabled",
          align: "center",
          title: "禁用启用",
          minWidth: 100,
          render: (h, data) => {  // 重点
            let _this = this
            return h('i-switch', {
              props: {
                value: data.row.disabled == 0 ? true: false,
                },
                on: {
                  input: function (event) {
                    _this.modifyDisabled(data, event)
                    }
                }
            })
          }
        },{
        title:'操作',
				key:'operation',
				minWidth:120,
				render: (h, data) => {
				return h('div', [
					h('span', {
						style:{
								marginRight: '8px',
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
							},
						on: {
							click: () => {
                this.editModal=true;
                this.moduleId=data.row.id
                this.editForm.name=data.row.name
							}
						},
          },'编辑'),
          h('span', {
						style:{
              marginRight: '8px',
              color: 'red',
              textDecoration: 'underline',
              cursor: 'pointer'
						},
						on: {
							click: () => {
								this.deleteModal=true;
                this.moduleId=data.row.id
							}
						},
					},'删除'),
					])
				}
      }]
    }
  },
  created (){
    this.getModuleTree();
    this.getListPage();
  },
  methods:{
    //获取模块树
    getModuleTree (){
      let that = this;
      moduletree().then(res => {
        that.modTree = that.moduleTreeDigui(res.response)
        console.log(res)
      })
    },
    //模块树点击子节点
    treeSelectData (data){
      if(data.length > 0){
        this.treeData = data[0].title
        this.treeCode = data[0].value
        this.pageNum = 1
        this.getListPage()
      }
    },
    //递归模块树
    moduleTreeDigui(data) {
      let dgData = data.map(item => {
        if (item.code == this.treeCode){
          this.treeData = item.label
        }
        return {
          title: item.label,
          id: item.id,
          value: item.code,
          expand: (item.code == this.treeCode.substr(0,3)||item.code == this.treeCode.substr(0,6)||item.code == this.treeCode.substr(0,9)||item.code == this.treeCode.substr(0,12)||item.code == this.treeCode.substr(0,15)||item.code == this.treeCode.substr(0,18)||item.code == this.treeCode.substr(0,21)) ? true : false,
          selected: item.code == this.treeCode ? true : false,
          children: this.moduleTreeDigui(item.children)
        };
      });
      return dgData;
    },
    //获取列表数据
    getListPage() {
      this.$Spin.show();
      let form = {
        name: this.moduleName,
        parentCode: this.treeCode,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sign: ''
      };
      getModuleList(form).then(res => {
        if(res.response.total > 0){
          this.tableData = res.response.list
        }else {
          this.tableData = []
        }
        this.total = res.response.total
        this.$Spin.hide();
      });
    },
    searchListPage (){
      this.pageNum = 1
      this.getListPage()
    },
    //查看模块全路径
    getPath(data, event){
      let form = {
        id: data.row.id
      }
      getModulePath(formData(form)).then(res => {
        event.target.innerText = res.response
        event.target.style.color = "#495060"
        event.target.style.cursor = "auto"
      })
    },
    addModule(){
      if(this.treeData==""){
        this.modal1=true;
      }else{
        this.modal2=true;
      }
    },
    //新增模块
    createModule(){
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$Spin.show()
          let params = {
            name: this.form.moduleName,
            parentCode:this.treeCode
          }
          createModules(params).then(res => {
            this.$Message.success("新增成功！");
            this.modal2=false
            this.$refs.addForm.resetFields()
            this.$Spin.hide()
            this.getListPage()
            this.getModuleTree()
          })
        }
      })
    },
    cancelAdd (){
      this.modal2 = false
      this.$refs.addForm.resetFields()
    },
    //启用禁用
    modifyDisabled(data, event){
      let that = this;
      console.log(event)
      if (event) {
        let jsonData = {
          moduleId: data.row.id,
          disabled: 0
        }
        statusModules(formData(jsonData)).then(res => {
          data.row.disabled = 0
        })
      } else {
        let jsonData = {
          moduleId: data.row.id,
          disabled: 1
        }
        statusModules(formData(jsonData)).then(res => {
          data.row.disabled = 1
        })
      }
    },
    //编辑模块
    editModule(){
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$Spin.show()
          let params = {
            meduleId: this.moduleId,
            parentCode:this.treeCode,
            name: this.editForm.name
          }
          modifyModules(params).then(res => {
            this.$Message.success("编辑成功！");
            this.editModal=false
            this.$refs.editForm.resetFields()
            this.$Spin.hide()
            this.getListPage()
            this.getModuleTree()
          })
        }
      })
    },
    cancelEdit (){
      this.editModal = false
      this.$refs.editForm.resetFields()
    },
    //删除模块
    deleteModule(){
      this.$Spin.show();
      let params = {
        delModuleId: this.moduleId
      }
      removeModules(formData(params)).then(res =>{
        this.$Message.success("删除成功！");
        this.$Spin.hide();
        this.deleteModal=false
        this.getListPage()
        this.getModuleTree()
      })
    },
    //重置
    clear(){
      //this.treeData="",
      //this.treeCode="",
      this.moduleName=""
    },
    modalCancel(){
        this.modal1=false;
    },
    selectChange(){

    },
    // 监听分页
     pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getListPage()
    },
    ok(){

    },
    cancel(){

    },
  }
}
</script>
