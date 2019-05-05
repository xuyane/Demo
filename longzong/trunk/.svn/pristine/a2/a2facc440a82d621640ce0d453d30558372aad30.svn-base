<template>
  <Row>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：后台权限&nbsp;&nbsp;>>&nbsp;&nbsp;权限管理
      </Row>
    </i-col>
    <Col span='24'>
      <Row :gutter="20">
        <Col span='4'>
          <div class='leftree'>
            <Card :bordered="false">
              <p slot="title">系统模块</p>
              <div class="overflow-auto">
                <Tree @on-select-change='findlist' :data="itemTree"></Tree>
              </div>
            </Card>
          </div>
        </Col>
        <Col span='20'>
          <Row class-name="table-con">
            <Form :model="searchForm" :label-width="80">
              <Row type="flex" justify="space-between">
                <Col span="6">
                  <FormItem label="权限名称:">
                    <Input v-model="searchForm.name" class="search-input" placeholder="请输入权限名称"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="创建人:">
                    <Input v-model="searchForm.creatorName" placeholder="请输入创建人" class="search-input"></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="状态：" prop="disabled">
                    <Select v-model="searchForm.disabled" class="form-select">
                      <Option value="0">正常</Option>
                      <Option value="1">禁用</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span='6' class="text-right">
                    <Button type="primary" @click="search">查询</Button>
                    <Button type="default" @click="clear" style="margin-left: 8px">重置</Button>

                </Col>
              </Row>
            </Form>
            <Row class-name="table-con">
              <div class="btn-container">
                <Button type="primary" class="search-btn" @click="addPermission">新增</Button>
                <Button type="primary" class="search-btn" @click="deleteModal = true">删除</Button>
                <span style="margin-left:20px;font-size:16px;">当前选中节点：{{treeData}}</span>
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
                :pageNum="pageNum"
                @page-change="pageChange"
                :page-size-opts="pageSizeOpts"
                :show-sizer="showSizer">
              </oil-page>
            </Row>
          </Row>
        </Col>
      </Row>
    </Col>

    <!-- 新增按钮 当没有选择节点时显示的弹窗开始 -->
    <Modal v-model="modal" title="提示信息" @on-ok="ok" okText="返回">
        <p class="text-center">请在左侧模块树选择节点</p>
        <div slot="footer">
            <Button style="margin-left:8px;" @click="modalCancel">返回</Button>
        </div>
    </Modal>
    <!-- 新增按钮 当没有选择节点时显示的弹窗结束 -->

    <!-- 删除按钮 弹窗开始 -->
    <Modal v-model="deleteModal" title="提示信息">
        <p class="text-center">您确定删除？</p>
        <div slot="footer">
            <Button type="primary" style="margin-left:8px;" @click="deleteBatch">确认</Button>
            <Button @click="deleteModal=false">取消</Button>
        </div>
    </Modal>
    <!-- 删除按钮 弹窗结束 -->
  </Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import { moduletree,permissionPageList,permissionGetModulePath,permissionEnable,permissionDisable,permissionDelete,permissionDeleteBatch } from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "rightsManagement",
  components: {
    OilPage
  },
  data(){
    return {
      modal: false,
      deleteModal:false,
      treeData:"",
      treeCode: "",
      permissionIds: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      searchForm:{
        name: '', //权限名称
        creatorName: '', //创建人
        disabled: -1, //状态
        moduleCode: this.treeCode
      },
      itemTree: [],
      columns: [
        {
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },
        {
          key: "name",
          title: "权限名称",
          align: "center",
          minWidth: 180
        },
        {
          key: "path",
          align: "center",
          title: "所属系统模块",
          minWidth: 100,
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
                  click: (event) => {
                    this.showModuleName(data, event)
                  }
                }
              })
            ])
          }
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
          minWidth: 150
        },
        {
          key: "onOff",
          align: "center",
          title: "禁用启用",
          minWidth: 100,
          render: (h, data) => {
            let that = this
            return h('i-switch', {
              props: {
                value: data.row.disabled == 0 ? true : false
              },
              on: {
                "on-change" : (e) => {
                  that.modifyDisabled(data,e)
                }
              }
            })
          }
        },
        {
          key: "operate",
          align: "center",
          title: "操作",
          minWidth: 150,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                  marginRight: '8px',
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name:'authorityQuery',
                      query: { permissionId:data.row.id }
                    })
                  }
                }
              }, '查看 '),
              h('span', {
                style: {
                  marginRight: '8px',
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name:'authorityEdit',
                      query: { permissionId:data.row.id }
                    })
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
                    this.deleteData(data);
                  }
                }
              }, '删除 '),
            ])
          }
        },
      ],
      tableData:[]
    }
  },
  created (){
    this.getModuleTree();
    this.treeCode = this.$route.query.moduleCode ? this.$route.query.moduleCode : '000'
    this.getListPage();
  },
  methods:{
    //获取模块树
    getModuleTree(){
      this.$Spin.show()
      let that = this;
      moduletree().then(res => {
        const module = that.treeItem(res.response);
        module.forEach(function(e,v){
          that.itemTree.push(e);
        });
        this.$Spin.hide()
      })
    },
    treeItem(data) {
      let dgData = data.map(item => {
        if (item.code == this.treeCode){
          this.treeData = item.label
        }
        if (item.children && item.children.length > 0) {
          return {
            id: item.id,
            value: item.code,
            title: item.label,
            expand: (item.code == this.treeCode.substr(0,3)||item.code == this.treeCode.substr(0,6)||item.code == this.treeCode.substr(0,9)||item.code == this.treeCode.substr(0,12)||item.code == this.treeCode.substr(0,15)||item.code == this.treeCode.substr(0,18)||item.code == this.treeCode.substr(0,21)) ? true : false,
            selected: item.code == this.treeCode ? true : false,
            children: this.treeItem(item.children)
          };
        } else {
          return {
            id: item.id,
              value: item.code,
              title: item.label,
              expand: (item.code == this.treeCode.substr(0,3)||item.code == this.treeCode.substr(0,6)||item.code == this.treeCode.substr(0,9)||item.code == this.treeCode.substr(0,12)||item.code == this.treeCode.substr(0,15)||item.code == this.treeCode.substr(0,18)||item.code == this.treeCode.substr(0,21)) ? true : false,
              selected: item.code == this.treeCode ? true : false,
              children: item.children
          };
        }
      });
      return dgData;
    },
    //通过点击树的数据获取相应的数据
    findlist(data){
      if(data.length > 0){
        this.treeData=data[0].title;
        this.treeCode=data[0].value
        this.pageNum = 1
        this.getListPage()
      }

    },
    //列表
    getListPage () {
      if(this.treeCode==""){
        this.modal=true;
      }else{
        this.$Spin.show();
        let form = {
          name: this.searchForm.name,
          creatorName: this.searchForm.creatorName,
          disabled: this.searchForm.disabled == undefined ? -1 : this.searchForm.disabled,
          moduleCode: this.treeCode,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        permissionPageList(form).then(res => {
          this.tableData = res.response.list
          this.total = res.response.total
          this.$Spin.hide();
        })
      }
    },
    //查询
    search (){
      this.pageNum = 1
      this.getListPage()
    },
    //重置
    clear(){
      this.searchForm.name = "",
      this.searchForm.creatorName = "",
      this.searchForm.disabled = -1
    },
    //显示系统模块全路径
    showModuleName(data, event){
      let jsonData = {
        permissionId: data.row.id
      }
      let that = this;
      permissionGetModulePath(jsonData).then(res => {
        event.target.innerText = res.response
        event.target.style.color = "#495060"
        event.target.style.cursor = "auto"
      })
    },
    //启用禁用
    modifyDisabled(data, event){
      let jsonData = {
        permissionId: data.row.id
      }
      let that = this;
      console.log(event)
      if (event) {
        permissionEnable(jsonData).then(res => {
          data.row.disabled = 1
        })
      } else {
        permissionDisable(jsonData).then(res => {
          data.row.disabled = 0
        })

      }
    },
    // 新增权限
    addPermission(){
      if(this.treeData==""){
        this.modal=true;
      }else{
        this.$router.push({
          name:'addAuthority',
          query: { 
            moduleCode:this.treeCode
          }
        })
      }

    },
    // 删除
    deleteData(data){
      let that = this;
      var config = {
        title: '删除',
        content: '对应的角色将失去对应该权限的操作关联，确定删除？',
        onOk: function() {
          let jsonData = {
            permissionId: data.row.id
          }
          permissionDelete(jsonData).then(res => {
            that.getListPage();
          })
        },
        onCancel: function(){}
      }
      that.$Modal.confirm(config)
    },
    //批量删除
    deleteBatch(){
      let that = this;
      if (that.permissionIds.length == 0){
        that.$Message.warning('请勾选数据');
      }
      let jsonData = {
        permissionIds: that.permissionIds
      }
      permissionDeleteBatch(formData(jsonData)).then(res => {
        that.getListPage();
      })
      that.deleteModal = false
    },
    //勾选权限
    selectChange(selection){
      let permissionIds = selection.map(item => {
        return item.id
      })
      this.permissionIds = permissionIds
    },
    ok(){
      this.modal=false;
    },
    modalCancel(){
        this.modal=false;
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
