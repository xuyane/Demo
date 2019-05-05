<style lang="less" scoped>
@import '../../information/taskplant/taskplant.less';
 .unit{
    border-top: 1px solid #ccc;
  }
</style>
<template>
<Row>
  <Col span="24">
    <Row class-name="current-position">
        当前位置：后台权限 &nbsp;&nbsp;>>&nbsp;&nbsp;菜单配置 &nbsp;&nbsp;>>&nbsp;&nbsp;角色管理
    </Row>
  </Col>
  <Col span='24'>
    <Card style="margin-bottom:20px">
      <div class="unit">
          <div class="unit_content">
              <div class="unit_content_left">
                  <div class="unit_s_left">菜单名称</div>
                  <div class="unit_s_right">{{menuInfo.name}}</div>
              </div>
              <div class="unit_content_left no_line">
                  <div class="unit_s_left">图片</div>
                  <div class="unit_s_right no-right-border">{{menuInfo.pic}}</div>
              </div>
          </div>
          <div class="unit_content">
              <div class="unit_content_left">
                  <div class="unit_s_left">优先级</div>
                  <div class="unit_s_right">{{menuInfo.sort}}</div>
              </div>
          </div>
      </div>
      <div style="margin-bottom:20px;">
        <p style="margin-bottom:20px;">角色信息列表</p>
        <Button type="primary" @click="addrole" style="margin-right:20px;">新增</Button>
        <Button type="error" @click="deleteModal2=true">删除</Button>
      </div>
      <div style="margin-bottom:40px;">
        <Table class="tableCommon" :data="tableData1" :columns="columns1" @on-selection-change="selectChange2"></Table>
      </div>
      <div style="margin-bottom:20px;text-align:center">
        <Button type="primary" @click="back">返回</Button>
      </div>
    </Card>
  <!-- 新增选择角色弹窗开始 -->
    <Modal v-model="addRoleModal" title="选择角色" width="750">
    <Row>
    <Form :label-width="90">
      <Row >
        <Col span="12"><FormItem label="角色名称 : "><Input type="text" class="search-input" v-model="roleName"/></FormItem></Col>
        <Col span="11" class="text-right">
          <FormItem>
            <Button type="primary"  @click="queryRoleName">查询</Button>
          </FormItem>
        </Col>
      </Row>
      <Row class-name="table-con">
        <Table class="tableCommon"  :data="tableData2" :columns="roleColumns" ref="dragTable"
          :stripe="true"
          :border="true"
          @on-selection-change="selectChange1">
        </Table>
        <oil-page
          :total="total"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"
          class="pagebox">
        </oil-page>
      </Row>
    </Form>
    </Row>
    <div slot="footer">
      <Button type="primary" @click="saveAddRole">保存</Button>
    </div>
    </Modal>
    <!-- 新增弹窗结束 -->
    <!-- 删除按钮 弹窗开始 -->
    <Modal v-model="deleteModal1" title="提示信息">
        <p class="text-center">请选择要删除的项？</p>
        <div slot="footer">
            <Button type="primary" style="margin-left:8px;" @click="deleteModal1=false">确认</Button>
            <Button @click="deleteModal1=false">取消</Button>
        </div>
    </Modal>
    <!-- 删除按钮 弹窗结束 -->
    <!-- 表格内删除按钮 弹窗开始 -->
    <Modal v-model="deleteModal2" title="提示信息" @on-ok="saveDeleteRoleMenu" @on-cancel="cancelDeleteRoleMenu">
        <p class="text-center">您确定删除？</p>
        <div slot="footer">
            <Button type="primary" style="margin-left:8px;" @click="saveDeleteRoleMenu">确认</Button>
            <Button @click="cancelDeleteRoleMenu">取消</Button>
        </div>
    </Modal>
    <!-- 表格内删除按钮 弹窗结束 -->
  </col>
</Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import {getMenuInfo,queryPageRole,saveMenuRoleBatch,queryPageRoleMenuList,deleteRoleAndMenu} from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";

export default {
  name:'menuConfigurationDetail',
   components: {
    OilPage
  },
  data(){
    return{
      id : 0,
      ids: [],
      menuId: 0,
      roleMenuId:0,
      menuInfo: {
          name: '',
          pic: '',
          sort: ''
      },
      roleName:'',
      total: 0,
      pageNum: 1,
      pageSize: 10,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      addRoleModal:false,
      deleteModal1:false,
      deleteModal2:false,
      columns1:[{
        type: 'selection',
        title: '选择',
        align: 'center',
        width: 80
      },{
        title:'角色名称',
        key:'roleName',
        align:'center',
        minWidth:400
      },{
        title:'操作',
        key:'operation',
        align:'center',
        width:400,
        render: (h, data) => {
          return h('div', [
            h('a', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: () => {
                  this.deleteModal2=true;
                  this.roleMenuId = data.row.roleMenuId
                }
              }
            }, '删除 '),
          ])
        }
      }],
      tableData1:[],
      roleColumns:[{
        type: 'selection',
        title: '选择',
        align: 'center',
        width: 80
      },{
        title:'角色名称',
        key:'name',
        align:'center',
        minWidth:200
      }],
      tableData2:[]

    }
  },
  created () {
    // 菜单信息
    let that = this;
    that.id = this.$route.query.id;
    this.getMenu();
    this.getPageMenu()

  },
  methods:{
      // 获取菜单基本信息
      getMenu(){
        let form = 'id=' + this.id;
        getMenuInfo(form).then(res => {
          this.menuInfo.name = res.response.name
          this.menuInfo.pic = res.response.pic
          this.menuInfo.sort = res.response.sort
        })
      },
    //已新增角色列表
    getPageMenu(){
      this.$Spin.show();
        let form ={
          menuId : this.id,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }

        queryPageRoleMenuList(formData(form)).then(res => {
            this.tableData1 = res.response.newList;
            this.total = res.response.total;
            this.$Spin.hide();
        })
    },
    //删除角色列表的记录
    saveDeleteRoleMenu(){
        let form = new URLSearchParams();
        form.append("ids[]", this.roleMenuId)

        deleteRoleAndMenu(form).then(res => {
          this.$Message.success("删除成功！！！");
          this.deleteModal2=false;
          this.getPageMenu()
        })

    },
     cancelDeleteRoleMenu(){
        this.deleteModal2=false
     },

    //角色列表-批量删除
    selectChange2 (selection) {
      console.log(selection)
      let ids = selection.map(item => {
        return item.roleMenuId
      })
      this.roleMenuId = ids;
      console.log(this.roleMenuId)
    },

    //新增--选择角色列表(默认)
    addrole(){
     this.addRoleModal=true;
     let form = {
        name: this.roleName,
        pageNum: this.pageNum,
        pageSize: this.pageSize
     }
     queryPageRole(form).then(res => {
         this.tableData2 = res.response.list;
         this.total = res.response.total;

     })
    },

   // 获取角色关联的账号列表(模糊查询)
   queryRoleName () {
      let form = {
        name: this.roleName,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      queryPageRole(form).then(res => {
        this.tableData2 = res.response.list;
        this.total = res.response.total;

      })
  },

     //关联角色列表多选
  selectChange1 (selection) {
    console.log(selection)
    let ids = selection.map(item => {
      return item.id
    })
    this.ids = ids;
  },
   // 选择角色 - 保存按钮
    saveAddRole(){
      // let form = {
      //     menuId : 'id=' + this.id,

      // }
      let form = new URLSearchParams();
      form.append("ids[]", this.ids)
      form.append("menuId", this.id)
      saveMenuRoleBatch(form).then(res => {
          this.$Message.success("添加成功！！！");
          this.getPageMenu()
      })
      this.addRoleModal = false
    },
    //返回
    back(){
      this.$router.push({name:'menuConfiguration'})
    },
    //分页
    pageChange(){
      if(page) {
          this.pageNum = page
          }
          if(pageSize) {
            this.pageSize = pageSize
          }
          this.getPageMenu()
    }
  }
}
</script>
