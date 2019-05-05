
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：后台权限&nbsp;&nbsp;>>&nbsp;&nbsp;权限管理&nbsp;&nbsp;>>&nbsp;&nbsp;新增
      </Row>
    </Col>
    <Col span='24'  class-name="search-form" style="margin-bottom:20px;">
      <Form ref="formItem" :model="formItem" :rules="formRoles" :label-width="100">
        <Row :gutter="20">
          <Col span='24'>
            <FormItem label="系统模块:">
              <span style="font-size:16px">{{moduleName}}</span>
            </FormItem>
          </Col>
          <Col span='7'>
            <FormItem label="权限名称:" prop="name">
              <Input v-model="formItem.name" :maxlength="200" class="search-input" placeholder="请输入权限名称"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span='24'>
      <Row :gutter="20">
        <Col span='4'>
          <div class='leftree'>
            <Card :bordered="true">
              <p slot="title">模块操作功能列表</p>
              <div class="overflow-auto">
                <Tree :data="itemTree" show-checkbox @on-check-change='findlist'></Tree>
              </div>
            </Card>
          </div>
        </Col>
        <Col span='20'>
          <Card style="margin-bottom:20px">
            <Row style="margin-left: 20px">
              <div class="btn-container">
                <Button type="primary" class="search-btn" @click="addOperation">添加</Button>
                <Button type="error" class="search-btn" @click="deleteModal=true">批量删除</Button>
              </div>
            </Row>
            <Row style="margin-left: 20px">
              <Table class="tableCommon"
                :data="tableData"
                :columns="columns"
                :stripe="true"
                :border="true" @on-selection-change="selectChange">
              </Table>
            </Row>
            <Row style="margin-top: 20px" type="flex" justify="center">
              <div class="btn-container">
                <Button type="primary" class="search-btn" @click="savePermission">保存</Button>
                <Button class="search-btn" @click="returnRight">返回</Button>
              </div>
            </Row>
          </Card>
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
import { permissionGetModuleName,moduleOperationTree,permissionToAdd,permissionSave } from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name:'addAuthority',
  components: {
    OilPage
  },
  data(){
    return{
      deleteModal:false,
      moduleCode:this.$route.query.moduleCode,
      moduleName:"",
      checkOperations:[],
      selectPermissionIds:[],
      formItem:{
        name:"",
        moduleCode:this.moduleCode
      },
      formRoles:{
        name: [{
          required: true, message: '请输入权限名称', trigger: 'blur'
        }]
      },
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
          minWidth: 150
        },
        {
          key: "url",
          align: "center",
          title: "操作URL",
          minWidth: 150
        },
        {
          key: "creatorName",
          align: "center",
          title: "创建人",
          width: 100
        },
        {
          key: "createTime",
          align: "center",
          title: "创建时间",
          width: 150
        },
        {
          key: "operate",
          align: "center",
          title: "操作",
          width: 100,
          render: (h, data) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeData(data)
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
    this.getModuleName();
    this.getModuleOperationTree();
  },
  methods:{
    //获取模块全路径
    getModuleName(){
      let that = this;
      that.$Spin.show()
      let jsonData = {moduleCode:that.moduleCode}
      permissionGetModuleName(jsonData).then(res => {
        that.moduleName = res.response
        that.$Spin.hide()
      })
    },
    //获取模块操作功能树
    getModuleOperationTree(){
      let that = this;
      that.$Spin.show()
      var datajson = {gettimes:new Date().getTime()}
      moduleOperationTree(datajson).then(res => {
        that.itemTree = that.treeItem(res.response);
        that.$Spin.hide()
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
            children: this.treeItem(item.children)
          };
        }else {
          return {
            id: item.id,
            value: item.code,
            title: item.label,
            operationId: item.operationId,
            expand: (item.code == this.moduleCode.substr(0,3)||item.code == this.moduleCode.substr(0,6)||item.code == this.moduleCode.substr(0,9)||item.code == this.moduleCode.substr(0,12)||item.code == this.moduleCode.substr(0,15)||item.code == this.moduleCode.substr(0,18)||item.code == this.moduleCode.substr(0,21)) ? true : false,
            children: this.treeItem(item.children),
            render: (h, { root, node, data }) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px',
                      color: '#000'
                    }
                  }),
                  h('span', item.label)
                ])
              ]);
            }
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
      this.$refs.formItem.validate((valid) => {
        if (valid) {
          if (that.checkOperations.length > 0) {
            that.$Spin.show()
            let operationIds = []
            that.checkOperations.map(item => {
              if (item.operationId) {
                operationIds.push(item.operationId)
              }
            })
            let jsonData = { operationIds: operationIds }
            permissionToAdd(formData(jsonData)).then(res => {
              that.tableData = res.response
              that.$Spin.hide();
            })
          } else {
            that.$Message.warning('请勾选数据');
          }
        }
      })
    },
    //删除
    removeData(data){
      let that = this;
      var config = {
        title: '删除',
        content: '确定删除？',
        onOk: function() {
          that.$Spin.show()
          that.tableData.splice(data.row._index, 1)
          that.$Spin.hide()
        },
        onCancel: function(){}
      }
      that.$Modal.confirm(config)
    },
    //批量删除
    removeBatch(){
      let that = this
      let arr = [];
      if (that.selectPermissionIds.length > 0){
        that.$Spin.show()
        for (let i = 0; i < that.tableData.length; i++) {
          if(that.selectPermissionIds.indexOf(that.tableData[i].id) === -1){
            arr.push(that.tableData[i])
          }
        }
        that.tableData = arr
        that.$Spin.hide()
      } else {
        that.$Message.warning('请勾选数据');
      }
      that.selectPermissionIds = []
      that.deleteModal = false
    },
    //勾选功能操作
    selectChange(selection){
      let permissionIds = selection.map(item => {
        return item.id
      })
      this.selectPermissionIds = permissionIds
    },
    //返回
    returnRight(){
      this.$router.push({
        name:"rightsManagement",
        query: { 
          moduleCode:this.moduleCode
        }
      })
    },
    //保存
    savePermission(){
      let that = this
      that.$refs.formItem.validate(valid => {
        if (valid) {
          that.$Spin.show()
          let operationIds = that.tableData.map(item => {
            return item.id
          })
          let jsonData = {
            moduleCode: that.moduleCode,
            name: that.formItem.name,
            operationIds: operationIds
          }
          permissionSave(jsonData).then(res => {
            that.$router.push({
              name:"rightsManagement",
              query: { 
                moduleCode:this.moduleCode
              }
            })
            that.$Spin.hide()
          })
        }
      });

    }
  }
}
</script>
