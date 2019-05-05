<style lang="less" scoped>

</style>
<template>
<Row>
  <Col span="24">
    <Row class-name="current-position">
        当前位置：后台权限 &nbsp;&nbsp;>>&nbsp;&nbsp;资源管理配置
    </Row>
  </Col>
  <Col span='24'>
    <Row :gutter="20">
      <Col span='4'>
        <div class='leftree'>
          <Card :bordered="false">
            <p slot="title">组织架构</p>
            <div class="overflow-auto">
              <Tree @on-select-change='treeSelectData' :data="itemTree"></Tree>
            </div>
          </Card>
        </div>
      </Col>
      <Col span='20'>
        <Row class-name="table-con">
					<Form :label-width="100" :model="adminSetListForm">
					<Col>
						<Row type="flex" justify="space-between">
							<Col span="6">
								<FormItem label="组织架构名称:">
									<Input type="text" class="search-input" v-model="adminSetListForm.name"></Input>
								</FormItem>
							</Col>
							<Col span="6">
								<FormItem label="组织架构编码:" style="margin-left:50px;">
									<Input type="text" class="search-input" v-model="adminSetListForm.code"></Input>
								</FormItem>
							</Col>
							<Col span="6" class="text-right">
								<Button type="primary" @click="searchListPage">查询</Button>
								<Button style="margin-left: 8px" @click="clear">重置</Button>
							</Col>
						</Row>
					</Col>
      		</Form>
          <Table class="tableCommon" :data="tableData1" :columns="columns1"></Table>
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
      </Col>
    </Row>
  </Col>
</Row>

</template>
<script>
import OilPage from "../../components/page/page.vue";
import { deptTree, orgManagerListPage } from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name:'administratorSettings',
  components: {
    OilPage
  },
  data(){
    return{
      treeId: 0,
      roleListForm: {
          code: '',
          disabled: '',
          name: ''
      },
      adminSetListForm: {
          code: '',
          name: ''
      },
      total: 0,
      pageSize: 10,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      editModal:false,
      editmadalform1:{},
      menunumber:[{
          label:'1',
          value:1
      },{
          label:'2',
          value:2
      },{
          label:'3',
          value:3
      }],
      columns1:[{
              title:'组织架构ID',
              key:'id',
              align:'center',
              width:100
            },{
              title:'组织架构名称',
              key:'name',
              align:'center',
              width:150
            },{
              title:'组织架构编码',
              key:'code',
              align:'center',
              width:150
						},{
              title:'组织架构全路径',
              key:'wname',
              align:'center',
              minWidth:150
						},{
              title:'分配管理员',
              key:'adminstrator',
              align:'center',
              width: 250
            },{
              title:'操作',
              key:'key6',
              align:'center',
              width:100,
              render:(h,data)=>{
                return h('a',{
                  on:{
                    click:()=>{
                      this.administratorsetting(data)
                    }
                  }
                },'设置管理员')
              }
            }],
            tableData1:[],
            itemTree: [],
      eidttableform:{
          lable1:'上级名称',
          lable2:'名称',
          lable3:'图片',
          lable4:'链接',
          lable5:'菜单顺序',
          lable6:'菜单标志',
      }
    }
  },
  created (){
    this.getdeptTree();
    this.getListPage();
  },
  methods:{
  loadData (item, callback) {

    callback(data);
  },
  //获取部门树

    getdeptTree(){
      this.$Spin.show()
      let that = this;
      deptTree().then(res => {
        let deptTreeArr = [];
        deptTreeArr = JSON.parse(res.response)
        const module = that.treeItem(deptTreeArr);
        module.forEach(function(e,v){
          that.itemTree.push(e);
        });
        this.$Spin.hide()
      })
    },
    treeItem(data) {
      let dgData = data.map(item => {
        if (item.children && item.children.length > 0) {
          return {
            id: item.id,
            value: item.value,
            title: item.label,
            expand: item.value == '03' ? true : false,
            selected: item.value == '03' ? true : false,
            children: this.treeItem(item.children)
          };
        } else {
          return {
            id: item.id,
              value: item.value,
              title: item.label,
              expand: item.value == '03' ? true : false,
              selected: item.value == '03' ? true : false,
              children: item.children
          };
        }
      });
      return dgData;
    },
    //模块树点击子节点
    treeSelectData (data){
      if(data.length > 0){
        this.treeId = data[0].id
        this.getListPage()
      }
    },

    //查询触发
    searchListPage (){
      this.pageNum = 1;
      this.getListPage ();
    },
  //查询列表
  getListPage(){
    this.$Spin.show();
      let form = {
        name: this.adminSetListForm.name,
        code: this.adminSetListForm.code,
        parentId: this.treeId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      orgManagerListPage(form).then(res => {
        this.tableData1 = res.response.list
        this.total = res.response.total
        this.$Spin.hide();
      });
  },
  queryPageAdminSet(){},
  //管理员设定
  administratorsetting(data){
     this.$router.push({
       name:'administratorSettingsDetail',
       query: { id:data.row.id }
     })
     console.log(data.row.id)
  },
  //重置
    clear(){
      this.adminSetListForm.name="",
      this.adminSetListForm.code=""
    },
  //分页
  pageChange(page, pageSize){
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


