<style scoped>
@import "./TemplateFile.less";
/* .ivu-modal-mask{
  z-index: 1 !important;
}
.ivu-modal-wrap{
   z-index: 1 !important;
} */
</style>

<template>
  <Row class='informationsortbox'>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：
      <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>        
        &nbsp;&nbsp;>>&nbsp;&nbsp;
       <router-link to="/TemplateManagement" class="link-css"> 模板管理</router-link>        
        &nbsp;&nbsp;>>&nbsp;&nbsp; 
       <router-link to="/TemplateManagement" class="link-css"> 模板列表 </router-link>        
      </Row>
    </i-col>
    <Col span='24'>
    <Row>
      <Col span='4'>
      <div class="leftree">
        <p>模板分类</p>
      </div>
      <Card :bordered="false">
        <div class="demo-spin-article">
          <Tree :data="treeData" :load-data="findSon" @on-select-change='findlist' empty-text=""></Tree>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
      </Card>
      </Col>
      <Col span='20'>
      <Card style="margin-bottom:20px">
        <div class="topform">
          <Form ref="formCustom" :model="formCustom" :label-width="120">
            <Row type="flex" justify="space-between">
                <!-- <Col span='8'>
                <FormItem label="模板编码:" >
                <Input type="text" v-model="formCustom.code" class="search-input" placeholder="请输入模板编码"></Input>
                </FormItem>
                </Col> -->
                <Col span='8'>
                <FormItem label="模板名称:" >
                <Input type="text" v-model="formCustom.name" class="search-input" placeholder="请输入模板名称"></Input>
                </FormItem>
                </Col>
                <Col span='8'>
                <FormItem label="状态:">
                    <Select v-model="formCustom.status" class="search-input">
                        <Option v-for="item in stautsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="8" class="text-right">
                <Button type="primary" @click="TemplateQuery">查询</Button>
                <Button @click="resetQuery">重置</Button>
                </Col>
            </Row>
          </Form>
        </div>
      </Card>
      <Card class="tablewrap">
        <Row class="btn-container">
          <Col span="24">
          <Button type="primary" class="search-btn" @click="addUser">新增模板</Button>
          </Col>
        </Row>
        <Row class-name="table-con" style="width:100%;">
          <Table border :columns="columns" :data="dataTable" style="width:100%;"></Table>
          <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>
        </Row>
      </Card>
      </Col>
    </Row>

    </Col>
    <!-- <add-user-modal @getUserList='getlist' :showAddModal="showAddModal" @hide-modal="hideAddModal"></add-user-modal> -->
    <!-- <edit-user-modal @getUserList='getlist' :showEditModal="showEditModal" @hide-modal="hideEditModal" :editData="editData" ></edit-user-modal> -->
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../../components/page/page.vue";
import {TemplateList,jingyongOne,qiyongOne,childrenNodes,openNodes} from "../api/unitManageMent.js";
import { formData } from "../../../../assets/js/common.js";
// import EditUserModal from './editTemplateManag.vue'
export default {
  name: "ue",
  components: {
    oilPage,
    TemplateList,
  },
  data() {
    return {
      // showAddModal:false,
      treeDataGuan:'',
      treeData: [],
      editData: {},
      form: {},
      editform: {},
      addform: {
        addName: "",
      },
      loading1: false,
      loading2: false,
      tid:"",
      tcode:"",
      addName: "",
      editName:"",
      industryType: "",
      // showAddModal: false,
      showCheckModal: false,
      showEditModal: false,
      showMoreImportModal: false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [ 10,15, 20, 40,50,100,200],
      //禁用启用需要的参数
      showIsUsermodal: false,
      disableUrl: "",
      enableUrl: "",
      msgContent: "",
      cid: 0,
      cType: 0,
      statusList: [],
      values1: "",
      siteId:1,
      stautsList: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "启用"
        },
        {
          value: "1",
          label: "禁用"
        }
      ],
      informationTypeRoadName: "",
      formCustom:{
        name: "",
        code:"",
        status:"-1"
      },
      columns: [
        {
          title: "模板名称",
          key: "name",
          align: "center",
          minWidth:180,
          render: (h,params)=>{
           return h("div",{
              style:{
                "text-align":"left"
              }
            }, params.row.name)
          }
        },
        {
          title: "模板分类",
          key: "informationTemplateTypePath",
          align: "center",
          minWidth:400,
           render: (h,params)=>{
           return h("div",{
              style:{
                "text-align":"left"
              }
            }, params.row.informationTemplateTypePath)
          }
        },  
        {
          title: "展现方式",
          key: "displayTypeStr",
          align: "center",
          minWidth:100
        },
        {
          title: "状态",
          align: "center",
          key: "status",
          minWidth:100,
          render: (h, data) => {
            let label =
              data.row.status === 0
                ? "正常"
                : data.row.status === 1
                  ? "禁用"
                  : "";
            let color =
              data.row.status === 0
                ? "#9ecd3f"
                : data.row.status === 1
                  ? "red"
                  : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  // size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
        },
        {
          title: "创建人",
          key: "creatorName",
          align: "center",
          className: "colorblue",
          minWidth:120
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          className: "colorblue",
          width:150
        },
        {
          title: "操作",
          align: "center",
          minWidth:100,
          fixed:'right',
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "span",
                    color: "blue",
                    textDecoration: "underline",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.editUser(data);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "blue",
                    marginRight: "8px",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      // 禁用
                      if(data.row.status == 0){
                        this.forbidden(data);
                      }
                      if(data.row.status == 1){
                        this.enable(data);
                      }
                    }
                  }
                },
                data.row.status == 1? "启用": data.row.status == 0? "禁用": "" 
              )
            ]);
          }
        }
      ],
      dataTable: [],
      editor: null,
      spinShow:true,
      informationTemplateTypeId:0,//获取模板分类id
    };
  },
  mounted() {
    // this.initStatus();
    const session = JSON.parse(window.sessionStorage.getItem('templateManagementList'));
    console.log(session);
    if(session){
      this.formCustom.name = session.name;
      this.formCustom.status = session.status;
      this.pageNum = session.pageNum;
      this.pageSize = session.pageSize;
      this.formCustom.treeCode = session.treeCode;
      if(this.$route.query.dataparams){
        this.informationTemplateTypeId = this.$route.query.dataparams;
      }
    }
    this.getlist();
    this.initTree();
    // this.getUEContent();
  },
  methods: {
    editUser (data) { // 
    let that = this;
      this.showEditModal = true;
      this.editData = data.row;
      console.log("所要修改的值",this.editData)
      //跳转到编辑页面
      this.setHistorySession(()=>{
        this.$router.push({
          name:'editTemplateManag',
          query:{
            informationTemplateId: data.row.id,
            treeCode: that.formCustom.treeCode,
            dataparams:that.$route.query.dataparams
          }
        })
      })
    },
    getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },

    //获取分页数据
    pageChange(page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getlist()
    },
    //获取列表数据
    getlist() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sort:'',
        order:'',
        parentId:'',
        // code:this.formCustom.code,
        name:this.formCustom.name,
        status:this.formCustom.status,
        code:this.formCustom.treeCode
      }
      TemplateList(params).then(res =>{
          console.log(res);
           if(res.response === null){
              this.dataTable = [];
              this.total = 0;
          }else{
          this.dataTable = res.response.list;
          this.total = res.response.total;
          }
          if (window.sessionStorage.getItem('templateManagementList')) {
           window.sessionStorage.removeItem('templateManagementList');
        }
      })
    },
    //查看信息分类详情
    //编辑信息分类
    confirmEditModal(name) {
      var that = this;
      that.editform.name = that.editform.editName;
      that.loading2 = true;
      this.$refs.editFormValidate.validate(valid => {
        if (valid) {
          axios({
            url: "/information/information/informationtype/edit",
            method: "post",
            data: that.editform
          }).then(function(resp) {
            if (resp.data.status == 200) {
              that.$Message.success("修改成功");
              that.showEditModal = false;
              that.loading2 = false;
              that.$refs.editFormValidate.resetFields();
              that.tid = 0;
              that.handleSubmit(name);
            } else {
              that.$Message.error(resp.data.message);
            }
          });
        }else{
          that.loading2 = false;
        }
      });
    },
    //新增信息分类
    confirmAddModal(name) {
      var that = this;
      that.addform.code = this.selectCondition.treeCode;
      that.addform.name = this.addform.addName;
      that.addform.siteId = that.siteId
      that.loading1 = true;
      this.$refs.addFormValidate.validate(valid => {
        if (valid) {
          axios({
            url: "/information/information/informationtype/add",
            method: "post",
            data: that.addform
          }).then(function(resp) {
            if (resp.data.status == 200) {
              that.$Message.success("新增成功");
              // that.showAddModal = false;
              that.loading1 = false;
              that.$refs.addFormValidate.resetFields();
              that.handleSubmit(name);
            } else {
              that.$Message.error(resp.data.message);
            }
          });
        }else{
          that.loading1 = false;
        }
      });
    },
    // 禁用开始
    forbidden(data){
        let _this = this;
        var config = {
          title: "提示信息",
          content: "您确定禁用吗？",
          onOk: () => {
            let form = {informationTemplateId:data.row.id};
              jingyongOne(formData(form)).then(res =>{
                  _this.$Message.success('禁用成功');
                  _this.getlist();
              })
          },
          onCancel: () => {
            //this.$Message.info('Clicked cancel');
          }
        };
        this.$Modal.confirm(config);
    },
    // 启用开始
    enable(data){
     let _this = this;
      var config = {
        title: "提示信息",
        content: "您确定启用吗？",
        onOk: () => {
          let form = {informationTemplateId:data.row.id};
            qiyongOne(formData(form)).then(res =>{
                _this.$Message.success('启用成功');
                _this.getlist();
            })
        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      };
      this.$Modal.confirm(config);
    },
    //查询
    TemplateQuery(){
      this.pageNum = 1;
      // this.$Spin.show();
      this.getlist();
    },
    //重置
    resetQuery(){
      this.formCustom.name="";
      this.formCustom.code="";
      this.formCustom.status=-1
    },
    hideAddModal () {
      // 隐藏新增弹窗
      // this.showAddModal = false;
    },
    hideEditModal () {
      // 隐藏编辑弹窗
      this.showEditModal = false;
    },
    addUser () { // 打开新增页面
      // this.showAddModal = true;
      if(this.informationTemplateTypeId == 0){
        // this.$Message.error("请选择模板分类")
        var config={
          title:'提示信息',
           content: "请选择模板分类",
        }
        this.$Modal.warning(config);
      }else{
          this.setHistorySession(()=>{
            this.$router.push({
              name:'AddTemplateManag',
              query:{
                informationTemplateTypeId:this.informationTemplateTypeId,
                treeCode: this.formCustom.treeCode,
                dataparams:this.$route.query.dataparams
              }
            })
          })
      }
      
    },
       // 加载树
    // Tree initTree
    initTree() {
      let that = this ;
      var params = {
        code: this.$route.query.treeNode == undefined ? "" : this.$route.query.treeNode,
        status: 0
      }
      openNodes(formData(params)).then(res =>{
        this.spinShow = false ;
        this.treeData = res.response;
        
      })
    },
    // 异步加载
    findSon(item, callback){
      console.log('parentId',item.id);
      let params = {
        parentId:item.id,
        status:0
      }
      childrenNodes(formData(params)).then(res =>{
          this.spinShow = false;
          console.log(res);
          let resultdata = res.response;
          for(var i=0;i<resultdata.length;i++){
            resultdata[i].title = res.response[i].name;
            resultdata[i].id = res.response[i].id;
            if(resultdata[i].isLeaf == 0){
              resultdata[i].loading = false;
              resultdata[i].children = []
            }
          }
          callback(resultdata);
          console.log('resultdataSon',resultdata);
      })
    },
        //通过点击树的数据获取相应的表格
    findlist(data) {
      console.log('通过点击树的数据获取相应的表格',data);
        this.treeDataGuan = data[0].id;
        this.$route.query.dataparams = data[0].id;
      // this.formCustom.treeCode = '';
      // this.addform.addCode = '0' ;
      // if(data.length >0 ){
        this.formCustom.treeCode = data[0].code;
        this.informationTypeRoadName =  data[0].name;
        this.informationTemplateTypeId = data[0].id;
        // this.formCustom.code = data[0].code;
        // data[0].selected = !data[0].selected;
        // this
      // }else{
      //    this.informationTypeRoadName =  ""
      // }
      this.getlist();
    },
    setHistorySession(cb) {
      const templateManagementList = { ...this.formCustom,treeData:this.treeData,pageNum:this.pageNum,pageSize:this.pageSize,treeDataGuan:this.treeDataGuan};
      window.sessionStorage.setItem('templateManagementList', JSON.stringify(templateManagementList));
      if (cb) cb();
    }
  }
};
</script>
