<style lang="less" scoped>
.leftree .ivu-card-head{
    background: #427fe9;
}
/* // .leftree .ivu-card-head p,.leftree .ivu-card-head-inner{
//     color:#fff;
//     text-align: center;
// } */
.ivu-form .ivu-form-item-label{
  text-align: left;
}

</style>
<template>
<Row>
  <Col span="24">
    <Row class-name="current-position">
        当前位置：后台权限 &nbsp;&nbsp;>>&nbsp;&nbsp;账号权限
    </Row>
  </Col>
  <Col span='24'>
    <Row :gutter="20">
      <Col span='4'>
        <div class='leftree'>
          <Card :bordered="false">
            <p slot="title">组织架构</p>
            <div class="overflow-auto">
              <Tree @on-select-change="treeSelectData" :data="depTree"></Tree>
            </div>
          </Card>
        </div>
      </Col>
      <Col span='20'>
        <Row type="flex" justify="space-between">
          <Form  class="search-form">
            <Col span="8">
              <FormItem label="姓名： " :label-width="60">
                <Input v-model="UserPermissionListForm.nameLike" type="text" class="search-input"></Input>
              </FormItem>
            </Col>
            <Col span="12" class="text-right">
              <Button type="primary" @click="searchListPage">查询</Button>
              <Button style="margin-left: 8px" @click="clear">重置</Button>

            </Col>
          </Form>
          <Col span="24" class-name="table-con">
            <div class="btn-container">
              <span style="margin-left: 20px;">选中部门节点: {{checkedDepName}}</span>
            </div>
            <Table class="tableCommon" :data="tableData1" :columns="columns1"></Table>
            <oil-page
              :total="total"
              :page-size="pageSize"
              :page-num="pageNum"
              @page-change="pageChange"
              :page-size-opts="pageSizeOpts"
              :show-sizer="showSizer">
            </oil-page>
          </Col>
        </Row>
      </Col>
    </Row>

  </Col>
</Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import { deptTree,UserPermissionListPage,UserPermissionGetInfo } from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name:'accountAuthority',
  components:{OilPage},
  data(){
    return{
      depTree:[

      ],
      checkedDepName: '山东隆众',
      treeCode:'03',
      UserPermissionListForm: {
         nameLike : '' ,
         orgCodeLikeLeft : ''
      },
      total: 0,
      pageNum: 1,
      pageSize: 10,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      columns1:[{
        title:'用户名',
        key:'loginName',
        align: "center",
        width:120
      },{
        title:'姓名',
        key:'name',
        align: "center",
        width:100
      },{
        title:'部门',
        key:'deptName',
        align: "center",
        minWidth: 150
      },{
        title:'职位',
        key:'position',
        align: "center",
        width:150
      },{
        title:'座机号',
        key:'extension',
        align: "center",
        width:150
      },{
        title:'状态',
        key:'job',
        align: "center",
        width:80
      },{
        title:'操作',
        key:'operation',
        align: "center",
        width:100,
        render:(h,data)=>{
          return h('a',{
            on:{
              click:()=>{
                this.detail(data)
              }
            }
          },'详情')
        }
      }],
      tableData1:[


      ]
    }
  },
   created () {
    this.getDeptTree()
    this.UserPermissionListPage()
  },
  methods:{
     deptTreeDigui(data) {
      let dgData = data.map(item => {
        if (item.children && item.children.length > 0) {
          return {
            title: item.label,
            id: item.id,
            value: item.value,
            // expand: true,
            children: this.deptTreeDigui(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
            // expand: true,
            value: item.value,
            children: item.children
          };
        }
      });
      return dgData;
    },
    //获取部门树
    getDeptTree (){
      let that = this;
      deptTree().then(res => {
        console.log('111',res)
        let deptTreeArr = [];
        deptTreeArr = JSON.parse(res.response)
        that.depTree = that.deptTreeDigui(deptTreeArr)
      })
    },
    //部门树点击子节点
    treeSelectData (data){
      if(data.length > 0){
        this.checkedDepName = data[0].title
         this.treeCode = data[0].value
         this.UserPermissionListPage()
      }
    },

    detail(data){
      console.log(data)
      this.$router.push({name:'accountAuthorityDetail' ,query: {id: data.row.id}})
    },
    // 清空
    clear () {
      this.UserPermissionListForm.nameLike = ''
    },
    //点击查询
    searchListPage (){
      this.pageNum = 1;
      this.UserPermissionListPage ();
    },
   //查询用户列表
    UserPermissionListPage () {
      this.$Spin.show();
      let form = {
        nameLike: this.UserPermissionListForm.nameLike,
        orgCodeLikeLeft: this.treeCode,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      UserPermissionListPage(formData(form)).then(res => {
        if(res.response.total > 0){
          this.tableData1 = res.response.list;
        }else {
          this.tableData1 = [];
        }
        this.total = res.response.total;
        this.$Spin.hide();
      })
    },
      // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.UserPermissionListPage()
    }
  }
}
</script>


