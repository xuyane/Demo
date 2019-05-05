
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：后台权限&nbsp;&nbsp;>>&nbsp;&nbsp;权限分配&nbsp;&nbsp;>>&nbsp;&nbsp;编辑
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      
        <Col span="7">
        <Form ref="formItem" :model="formItem" :rules="formRoles" :label-width="100">
          <Row>
            <FormItem label="系统模块:">
              <span style="font-size:16px">{{moduleName}}</span>
            </FormItem>  
          </Row>
          <Row>
            <FormItem label="权限名称:" prop="name">
              <Input v-model="formItem.name" :maxlength="200" class="search-input" placeholder="请输入权限名称"></Input>
            </FormItem>
          </Row>
           </Form>
        </Col>
     
    </Col>
    <Col span="24">
      <Row :gutter="20">
        <Col span='4'>
          <div class='leftree'>
            <Card :bordered="false">
              <p slot="title">模块操作功能列表</p>
              <div class="overflow-auto">
                <Tree :data="itemTree" show-checkbox @on-check-change='findlist'></Tree>
              </div>
            </Card>
          </div>
        </Col>
        <Col span='20' style="padding-left: 20px" class="table-con">
          <Form :model="searchForm">
            <Row type="flex" justify="space-between">
              <Col span="6">
                <FormItem label="功能名称:" :label-width="90">
                  <Input v-model="searchForm.name" class="search-input" placeholder="请输入操作名称"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="创建人:" :label-width="100">
                  <Input v-model="searchForm.creatorName" class="search-input" placeholder="请输入创建人"></Input>
                </FormItem>
              </Col>
              <Col span="5" class="text-right">
                <Button type="primary" @click="getListPage">查询</Button>
                <Button style="margin-left: 8px" @click="clear">重置</Button>
              </Col>
            </Row>
          </Form>
          <Row style="margin-left: 20px">
            <div style="margin-bottom:20px;">
              <Button type="primary" style="margin-right: 20px" @click="addOperation">添加</Button>
              <Button type="error" @click="deleteModal=true">批量删除</Button>
            </div>
          </Row>
          <Row style="margin-left: 20px">
            <Table class="tableCommon"
              :data="tableData"
              :columns="columns"
              :stripe="true"
              :border="true" @on-selection-change="selectChange">
            </Table>
            <oil-page
              :total="total"
              :page-size="pageSize"
              @page-change="pageChange"
              :page-size-opts="pageSizeOpts"
              :show-sizer="showSizer">
            </oil-page>
          </Row>
          <Row style="margin-top: 20px" type="flex" justify="center">
             <div class="btn-container">
              <Button type="primary" class="search-btn" @click="savePermission">保存</Button>
              <Button class="search-btn" @click="backtoRightsManagement">返回</Button>
            </div>
          </Row>
        </Col>
      </Row>
      <!-- 批量删除按钮 弹窗开始 -->
      <Modal v-model="deleteModal" title="提示信息">
          <p class="text-center">您确定删除？</p>
          <div slot="footer">
              <Button type="primary" style="margin-left:8px;" @click="removeBatch">确认</Button>
              <Button @click="deleteModal=false">取消</Button>
          </div>
      </Modal>
      <!-- 批量删除按钮 弹窗结束 -->
    </Col>
  </Row>
</template>

<script>
import OilPage from "../../components/page/page.vue";
import { permissionDetail,moduleOperationTree,permissionListPageOperationForEdit,permissionAddOperation,permissionDeleteOperation,permissionDeleteBatchOperation,permissionUpdate,moduletree } from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name:'authorityEdit',
  components: {
    OilPage
  },
  data(){
    return{
      deleteModal:false,
      permissionId:this.$route.query.permissionId,
      moduleName:'',
      searchForm:{
        creatorName:'',
        name:'',
        permissionId:this.permissionId
      },
      formItem:{
        name:'',
        id:this.permissionId
      },
      formRoles:{
        name: [{
          required: true, message: '请输入权限名称', trigger: 'blur'
        }]
      },
      checkOperations:[],
      selectPermissionIds:[],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      moduleCode: '000',
      itemTree:[],
      tableData:[],
      columns:[
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
          minWidth: 100
        },
        {
          key: "url",
          align: "center",
          title: "操作URL", 
          minWidth: 150
        },
        {
          key: "disabled",
          align: "center",
          title: "状态", 
          minWidth: 80
        },
        {
          key: "creatorName",
          align: "center",
          title: "创建人",
          minWidth: 100
        },
        {
          key: "createTime",
          align: "center",
          title: "创建时间",
          minWidth: 120
        },
        {
          key: "operate",
          align: "center",
          title: "操作",
          minWidth: 80,
          render: (h, data) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeOperation(data)
                  }
                }
              }, '删除 '),
            ])
          }
        },
      ],
    }
  },
  created (){
    this.getPermissionData();
    this.getModuleOperationTree();
    this.getListPage();
  },
  methods:{
    //获取权限信息
    getPermissionData(){
      let that = this
      that.$Spin.show()
      let jsonData = { permissionId:that.permissionId }
      permissionDetail(jsonData).then(res => {
        that.formItem.name = res.response.name
        that.moduleName = res.response.modulePath
        that.$Spin.hide();
      })
    },
    //获取模块操作功能树
    getModuleOperationTree(){
      let that = this;
      that.$Spin.show()
      var datajson = {gettimes:new Date().getTime()}
      moduleOperationTree(datajson).then(res => {
        const moduleOperation = that.treeItem(res.response);
        moduleOperation.forEach(function(e,v){
          that.itemTree.push(e);
        });
        that.$Spin.hide();
      })
    },
    treeItem(data) {
      let dgData = data.map(item => {
        if(item.operationId){
          return {
            id: item.id,
            value: item.code,
            title: item.label,
            operationId: item.operationId,
            expand: (item.code == this.moduleCode.substr(0,3)||item.code == this.moduleCode.substr(0,6)||item.code == this.moduleCode.substr(0,9)||item.code == this.moduleCode.substr(0,12)||item.code == this.moduleCode.substr(0,15)||item.code == this.moduleCode.substr(0,18)||item.code == this.moduleCode.substr(0,21)) ? true : false,
            disableCheckbox: false,
            children: this.treeItem(item.children)
          };
        }else {
          return {
            id: item.id,
            value: item.code,
            title: item.label,
            operationId: item.operationId,
            expand: (item.code == this.moduleCode.substr(0,3)||item.code == this.moduleCode.substr(0,6)||item.code == this.moduleCode.substr(0,9)||item.code == this.moduleCode.substr(0,12)||item.code == this.moduleCode.substr(0,15)||item.code == this.moduleCode.substr(0,18)||item.code == this.moduleCode.substr(0,21)) ? true : false,
            disableCheckbox: true,
            children: this.treeItem(item.children)
          };
        }
      });
      return dgData;
    },
    //勾选模块操作功能树
    findlist(data){
      this.checkOperations = data
    },
    //添加功能操作
    addOperation(){
      let that = this
      if (that.checkOperations.length > 0) {
        that.$Spin.show()
        let operationIds = []
        that.checkOperations.map(item => {
          if (item.operationId) {
            operationIds.push(item.operationId)
          }
        })
        let jsonData = { 
          operationIds: operationIds,
          permissionId: that.permissionId
        }
        permissionAddOperation(formData(jsonData)).then(res => {
          that.getListPage()
          that.$Spin.hide();
        })
      } else {
        that.$Message.warning('请勾选数据');
      }
    },
    //删除
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
            that.getListPage();
          })
        },
        onCancel: function(){}
      }
      that.$Modal.confirm(config)
    },
    //批量删除
    removeBatch(){
      let that = this
      let jsonData = {
        operationIds: that.selectPermissionIds,
        permissionId: that.permissionId
      }
      permissionDeleteBatchOperation(formData(jsonData)).then(res => {
        that.getListPage();
      })
      that.deleteModal = false
    },
    //返回
    backtoRightsManagement(){
      this.$router.push({name:'rightsManagement'})
    },
    //列表查询
    getListPage () {
      this.$Spin.show();
      let form = {
        creatorName: this.searchForm.creatorName,
        name: this.searchForm.name,
        permissionId: this.permissionId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      permissionListPageOperationForEdit(form).then(res => {
        this.tableData = res.response.list
        this.total = res.response.total
        this.$Spin.hide();
      })
    },
    //重置
    clear(){
      this.searchForm.name="",
      this.searchForm.creatorName=""
    },
    //勾选功能操作
    selectChange(selection){
      let permissionIds = selection.map(item => {
        return item.id
      })
      this.selectPermissionIds = permissionIds
    },
    //保存
    savePermission(){
      let that = this
      that.$refs.formItem.validate(valid => {
        if (valid) {
          that.$Spin.show()
          let jsonData = {
            id: that.permissionId,
            name: that.formItem.name
          }
          permissionUpdate(jsonData).then(res => {
            this.$router.push({name:'rightsManagement'})
            that.$Spin.hide()
          })
        }
      });
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
    }
  }
}
</script>
