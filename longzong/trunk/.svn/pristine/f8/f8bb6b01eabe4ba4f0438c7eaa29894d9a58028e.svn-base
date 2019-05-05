<style lang="less" scoped>

</style>
<template>
<Row>
  <Col span="24">
    <Row class-name="current-position">
        当前位置：后台权限 &nbsp;&nbsp;>>&nbsp;&nbsp;菜单配置 
    </Row>
  </Col>
  
  <Col span='24'>
    <Row :gutter="20">
      <!--
      <Col span='4'>
        <div class='leftree'>
          <Card :bordered="false">
            <p slot="title">系统菜单树</p>
            <div><Tree :data="data1"></Tree></div>
          </Card>
        </div>
      </Col>-->
      
      <Col span='20'>
        <!-- 列表开始 -->
        <Row class-name="table-con">     
          <Button type="primary" style="margin-bottom:20px;" @click="addaModal=true">新增</Button>                       
          <Table class="tableCommon" :data="tableData1" :columns="columns1"></Table>
          <oil-page 
            :total="total" 
            :page-size="pageSize" 
            @page-change="pageChange" 
            :page-size-opts="pageSizeOpts" 
            :show-sizer="showSizer" 
            class="pagebox">
          </oil-page>
        </Row> 
        <!-- 列表结束 -->

        <!-- 新增弹窗开始 -->
        <Modal v-model="addaModal" title="新增系统菜单" width="600" @on-ok="saveAddMenu" @on-cancel="cancelAddMenu"> 
          <Row>
            <Form ref="addForm" :model="addMenuForm" :label-width="120"> 
              <Row >
                <Col span="14">
                  <FormItem label="模块名称 ：">
                    <Input v-model="addMenuForm.name" class="search-input" placeholder="请输入模块名称"/>
                  </FormItem>
                </Col>
              </Row>
              <Row >
                <Col span="14"><FormItem label="图片编号 ："><Input v-model="addMenuForm.pic" class="search-input" placeholder="请输入图片编号"/></FormItem></Col>
              </Row>
              <Row >
                <Col span="14">
                  <FormItem label="菜单顺序 : ">
                  <InputNumber v-model="addMenuForm.num" class="search-input" placeholder="请输入菜单顺序"/>
                </FormItem>
                </Col>
              </Row>
              <Row >
                <Col span="14"><FormItem label="链接 ："><Input v-model="addMenuForm.url" class="search-input" placeholder="请输入链接地址"/></FormItem></Col>
              </Row>                     
            </Form>                 
          </Row> 
          <div slot="footer">
              <i-button type="primary" @click="saveAddMenu">确认</i-button>
              <i-button type="default" @click="cancelAddMenu">取消</i-button>
          </div>
        </Modal>
        <!-- 新增弹窗结束 -->

        <!-- 编辑弹窗开始 -->
        <Modal v-model="editModal" title="系统菜单" width="600"> 
          <Row>
            <Form ref="editmadalform1" :model="editMenuForm" :label-width="120"> 
              <Row >
                <Col span="14"><FormItem label="上级名称 : ">{{ editMenuForm.parentName}}</FormItem></Col>
              </Row>
              <Row >
                <Col span="14"><FormItem label="名称 ："><Input type="text" class="search-input"  v-model="editMenuForm.name"/></FormItem></Col>
              </Row>  
              <Row >
                <Col span="14"><FormItem label="图片 ："><Input type="text" class="search-input"   v-model="editMenuForm.pic"/></FormItem></Col>
              </Row>
              <Row >
                <Col span="14"><FormItem label="链接 ："><Input type="text" class="search-input"   v-model="editMenuForm.url"/></FormItem></Col>
              </Row>
              <Row >
                <Col span="14">
                  <FormItem label="菜单顺序 : ">
                   <InputNumber v-model="editMenuForm.sort" class="search-input" />
                </FormItem>
                </Col>
              </Row>
              <Row >
                <Col span="14"><FormItem label="菜单标志 ："><Input type="text" class="search-input" v-model="editMenuForm.name"/></FormItem></Col>
              </Row>                      
            </Form>                 
          </Row> 
          <div slot="footer">
              <i-button type="primary" @click="saveEditMenu">确认</i-button>
              <i-button type="default" @click="cancelEditMenu">取消</i-button>
          </div>
        </Modal>
        <!-- 编辑弹窗结束 -->  

        <!-- 查看弹窗开始 -->
        <Modal v-model="queryModal" title="系统菜单" width="600"> 
          <Row>
            <Form ref="queryModalform1" :model="queryMenuForm" :label-width="120"> 
              <Row >
                <Col span="14"><FormItem label="上级名称 : ">{{ queryMenuForm.parentName}}</FormItem></Col>
              </Row>
              <Row >
                <Col span="14"><FormItem label="名称 ："><Input type="text" class="search-input"  v-model="queryMenuForm.name"/></FormItem></Col>
              </Row>  
              <Row >
                <Col span="14"><FormItem label="图片 ："><Input type="text" class="search-input"   v-model="queryMenuForm.pic"/></FormItem></Col>
              </Row>
              <Row >
                <Col span="14"><FormItem label="链接 ："><Input type="text" class="search-input"   v-model="queryMenuForm.url"/></FormItem></Col>
              </Row>
              <Row >
                <Col span="14">
                  <FormItem label="菜单顺序 : ">
                   <InputNumber v-model="queryMenuForm.sort" class="search-input" />
                </FormItem>
                </Col>
              </Row>
              <Row >
                <Col span="14"><FormItem label="菜单标志 ："><Input type="text" class="search-input" v-model="queryMenuForm.name"/></FormItem></Col>
              </Row>                      
            </Form>                 
          </Row> 
          <div slot="footer">              
              <i-button type="default" @click="cancelQueryMenu">返回</i-button>
          </div>
        </Modal>
        <!-- 查看弹窗结束 --> 

        <!-- 表格内删除按钮 弹窗开始 -->
        <Modal v-model="deleteModal1" title="提示信息"  @on-ok="saveDeleteMenu" @on-cancel="cancelDeleteMenu">
            <p class="text-center">您确定删除？</p>
            <div slot="footer">
                <Button type="primary" style="margin-left:8px;" @click="saveDeleteMenu">确认</Button>
                <Button @click="cancelDeleteMenu">取消</Button>
            </div>
        </Modal>
        <!-- 表格内删除按钮 弹窗结束 --> 
      </Col>
    </Row>    
  </Col>
</Row>

</template>
<script>
import OilPage from "../../components/page/page.vue";
import { queryPageMenuList,addMenu,deleteMenu,getMenuInfo,editMenu,modifyDisableOrNot} from "../../components/axios/EAC.js";

export default {
  name:'menuConfiguration',
  components: {
    OilPage
  },
  data(){
    return{
      total: 0,
      pageNum:1,
      pageSize: 10,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      editModal:false,
      queryModal:false,
      addaModal:false,
      deleteModal1:false,
      id :0,
      addMenuForm: {
          name: '',
          pic: '',
          num:'',
          url:''
      },
      editMenuForm:{
          parentName:'',
          name: '',
          pic: '',
          num:'',
          url:'',
          sort:''
      },
      queryMenuForm:{
          parentName:'',
          name: '',
          pic: '',
          num:'',
          url:'',
          sort:''
      },
      
      
      columns1:[{
              title:'名称',
              key:'name',
              align:'center',
              minWidth:150
            },{
              title:'图标',
              key:'pic',
              align:'center',
              width:120
            },{
              title:'优先级',
              key:'sort',
              align:'center',
              width:120
            },{
              title:'状态',
              key:'disabled',
              align:'center',
              width:150,
              render:(h,data)=>{
                let _this = this
                return h('i-switch',{
                  on:{
                    click:()=>{
                      this.switchFuction(data)
                    }
                  }
                },'状态')
            
              // return h('i-switch', {  
              //   props: { 
              //     value: data.row.disabled == 0 ? false : true,    
              //     },
              //     on: { 
              //       input: function (event) {  
              //         _this.saveDisableOrNot(data, event)
              //       }
              //     }
              // },状态)
              }
            },{
              title:'操作',
              key:'operation',
              align:'center',
              width: 250,
              render:(h,data)=>{
                  return h('div',[
                      h('a',{
                          props:{
                              
                          },
                          style:{
                              marginRight:'10px'
                          },
                          on:{
                              click:()=>{
                                  this.showDetail(data.row.id)
                              }
                          }
                      },'查看'),
                      h('a',{
                          props:{
                              
                          },
                          style:{
                              marginRight:'10px'
                          },
                          on:{
                              click:()=>{
                                  this.editMenuBtn(data.row.id)
                              }
                          }
                      },'编辑'),
                      h('a',{
                          style:{
                              marginRight:'10px'
                          },
                          on:{
                              click:()=>{
                                  this.delete(data.row.id)
                              }
                          }
                      },'删除'),
                      h('a',{
                          props:{
                              
                          },
                          on:{
                              click:()=>{
                                  this.roleManagement(data.row.id)
                              }
                          }
                      },'角色管理')
                  ])
              }
            }]
            
    }
  },

  created () {
    this.queryPageMenu()
  },

  methods:{
      //菜单列表的分页查询
      queryPageMenu() {
        let form = {         
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        queryPageMenuList(form).then(res => {
          this.tableData1 = res.response.list;
          this.total = res.response.total;         
        })

      },


      //新增菜单
      saveAddMenu(){
          let form = {
            name : this.addMenuForm.name,
            pic : this.addMenuForm.pic,
            sort : this.addMenuForm.num,
            url : this.addMenuForm.url
          }
          addMenu(form).then(res => {
            this.cancelAddMenu()
            this.$Message.success("新增成功！！！");
            this.queryPageMenu();
            
          })
        },
      // 新增角色取消
      cancelAddMenu(){
        this.addMenuForm.name = '',
        this.addMenuForm.pic = '',
        this.addMenuForm.num = '',
        this.addMenuForm.url = ''
        this.addaModal = false;
      },


      // 删除角色
      saveDeleteMenu(){
        let form = 'id=' + this.id;
        console.log("form"+form);
        deleteMenu(form).then(res => {
          this.$Message.success("删除成功！！！");
          this.queryPageMenu();
        })
    },

    // 删除角色取消
    cancelDeleteMenu(){
      this.deleteModal1=false
    },

     // 修改菜单弹窗
    editMenuBtn(id){
      this.editModal=true;
      this.id = id;
      let form = 'id=' + this.id;
      getMenuInfo(form).then(res => {
        this.editMenuForm.id = res.response.id
        this.editMenuForm.name = res.response.name
        this.editMenuForm.sort = res.response.sort
        this.editMenuForm.pic = res.response.pic
        this.editMenuForm.url = res.response.url
        this.editMenuForm.parentName = res.response.parentName
      })
    },

    //编辑弹层取消
    cancelEditMenu(){
        this.editModal=false;
      },

    //编辑弹层确认
    saveEditMenu(id){
         let form = {
            id : this.id,
            name : this.editMenuForm.name,
            pic : this.editMenuForm.pic,
            sort : this.editMenuForm.sort,
            url : this.editMenuForm.url
          }
          editMenu(form).then(res => {
            this.$Message.success("修改成功！！！");            
            this.editModal = false;
            this.queryPageMenu();
          })
      },

      //查看窗体
      showDetail(id){
        this.queryModal=true;
        this.id = id;
        let form = 'id=' + this.id;
        getMenuInfo(form).then(res => {
          this.queryMenuForm.id = res.response.id
          this.queryMenuForm.name = res.response.name
          this.queryMenuForm.sort = res.response.sort
          this.queryMenuForm.pic = res.response.pic
          this.queryMenuForm.url = res.response.url
          this.queryMenuForm.parentName = res.response.parentName
        })
    },
      //查看返回按钮
      cancelQueryMenu(){
       this.queryModal = false;
      },
     
      
      //删除
      delete(id){
        this.id = id;
        this.deleteModal1=true;
      },
      //角色管理
      roleManagement(id){
        this.$router.push({
          name:'menuConfigurationDetail',
          query: {
            id: id
          }
        })
      },
      // 角色启用/禁用
      switchFuction(data, event){
        let disabled = '';
        if(event){
          disabled = 0;
        }else{
          disabled = 1;
        }
        let form = {
            disabled: disabled,
            roleId: data.row.id
        }
        modifyDisableOrNot(form).then(res => {
          this.queryPageMenu();
        })
      },
      //分页
      pageChange(){
         if(page) {
          this.pageNum = page
          }
          if(pageSize) {
            this.pageSize = pageSize
          }
          this.queryPageMenu()
      }
    
  }
}
</script>


