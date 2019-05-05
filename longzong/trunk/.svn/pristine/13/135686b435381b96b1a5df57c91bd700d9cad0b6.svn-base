<style lang="less" scoped>
  // .userSearchProducts .search-input {
  //   width: 400px;
  // }
  .userSearchProducts .button {
    padding-left: 200px;
  }
  // .userSearchProducts .producedx {
  //   width: 400px;
  // }
  .userSearchProducts .producedx .ivu-select-selection {
    height: auto !important;
    min-height: 32px;
  }

</style>

<template>
  <Row class="userSearchProducts">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;客户投诉&nbsp;&nbsp;>>&nbsp;&nbsp;新增投诉
      </Row>
    </Col>
    <Col span="24">
      <Card style="margin-bottom:20px">
        <Form :label-width="150" ref="addform" :model="addform"  :rules="addRoles">
          <Row type="flex" justify="start">
            <Col span="8">
              <FormItem label="公司名称：" prop='memberId'>
                <Select
                v-model="addform.memberId"
                ref="input2"
                @on-query-change="emptyQuery2"
                class="search-input"
                filterable
                remote
                transfer
                :remote-method="remoteMethod1"
                :loading="loading">
                <Option v-for="(option, index) in memberList" :value="option.id" :key="index">{{option.name}}                                   </Option>
              </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="投诉人：" prop='userId'>
                <Select
                v-model="addform.userId"
                ref="inputs"
                class="search-input"
                @on-query-change="emptyQuery"
                filterable
                remote
                transfer
                label-in-value
                @on-change="change2"
                :remote-method="remoteMethod2"
                :loading="loading">
                <Option v-for="(option, index) in realNameList" :value="option.id" :key="index">{{option.realName}}</Option>
              </Select>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span="8">
              <FormItem label="联系方式：" prop='phone'>
                <Input v-model="addform.phone" class="search-input"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="投诉产品：" prop='product'>
                <Select 
                class="producedx"
                v-model="product"  
                ref='product' 
                filterable 
                multiple
                remote 
                :remote-method="remoteMethod3"
                :loading="loading">
                <Option v-for="item in produceList" :value="item.id" :key="item.index">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="start">
             <Col span="8">
              <FormItem label="严重等级：" prop='seriousLevel'>
                <Select v-model="addform.seriousLevel" class="search-input" transfer>
                  <Option v-for="(item,index) in seriousLevelList" :value="item.value" :key="index">{{ item.desc }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="责任编辑：" prop='editorId'>
                <Select
                v-model="addform.editorName"
                ref="input3"
                class="search-input"
                @on-query-change="emptyQuery3"
                filterable
                remote
                transfer
                label-in-value
                @on-change="change3"
                :remote-method="remoteMethod4"
                :loading="loading">
                <Option v-for="(item, index) in adminList" :value="item.id" :key="index">{{item.name}}</Option>
              </Select>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span="8">
              <FormItem label="业务员：" prop='adminId'>
                <Select
                v-model="addform.adminName"
                ref="input4"
                @on-query-change="emptyQuery4"
                class="search-input"
                filterable
                remote
                transfer
                label-in-value
                :remote-method="remoteMethod4"
                @on-change="change4"
                :loading="loading">
                <Option v-for="(item, index) in adminList" :value="item.id" :key="index">{{item.name}}</Option>
              </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="16">
              <FormItem label="投诉内容：" prop='content'>
                <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="附件：" prop='name'>
                <Upload
                  :before-upload = "handleUpload"
                  :data = "form"
                  :on-success = "uploadSuccess"
                  :on-preview = "getUrl"
                  :on-remove = "removeUrl"
                  :max-size = 20480
                  :action="filepath">
                <Button icon="ios-cloud-upload-outline">上传附件</Button>
            </Upload>
              </FormItem>
            </Col>
          </Row>
          <Row class="btnwrap" style="text-align:center">
            <Button type="primary" class="search-btn" @click='getUEContent' >确认投诉</Button>
            <Button  style="margin-left: 8px" class="search-btn"  @click="reback">取消</Button>
          </Row>
        </Form>
      </Card>
    </Col>
  </Row>
</template>

<script>
import UE from "../../components/richEdit/ueditor";
import { formData } from "../../../assets/js/common.js";
import {
userComplainSave,
memberSelectList,
userSelectList,
queryProductSelectList,
getAdminList,
userComplainqueryAllSeriouslevel } from "../../components/axios/crm.js";
export default {
  name: 'addCustomerComplaint',
  components: {
    UE,
  },
  data(){
    const validateMember = (rule, value, callback) => {
        if (this.$refs.input2.query === '') {
            callback(new Error('请输入公司名称'));
        }else {
          callback();  
        }
    };
    const validateUserName = (rule, value, callback) => {
        if (this.$refs.inputs.query === '') {
            callback(new Error('请输入投诉人'));
        }else {
          callback();  
        }
    };
    const validateProduct = (rule, value, callback) => {
        if (this.product === []) {
            callback(new Error('请选择产品'));
        }else {
          callback();  
        }
    };
    const validateEditorId = (rule, value, callback) => {
        if (this.$refs.input3.query === '') {
            callback(new Error('请选择责任编辑'));
        }else {
          callback();  
        }
    };
    const validateAdmin = (rule, value, callback) => {
        if (this.$refs.input4.query === '') {
            callback(new Error('请选择业务员'));
        }else {
          callback();  
        }
    };
    return {
      product:[],
      loading:false,
      form:{
        noticeFiles: ""
      },
      memberList:[],
      realNameList:[],
      adminList:[],
      editorList:[],
      
      produceList: [],
      defaultMsg: "",
      config:{
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      idlist:[],
      namelist:[],
      addform:{},
      filepath: "/crm/usercomplain/upload",
      seriousLevelList:[],
      addRoles:{
        memberId:[
          { required: true, validator: validateMember, trigger: 'change'},
        ],
        userId:[
          { required: true, validator: validateUserName, trigger: 'change',type:'number'},
        ],
        phone:[
          { required: true, message: '请输入联系方式', trigger: 'blur'},
        ],
        product:[
          { required: true, validator: validateProduct,  trigger: 'blur',type:'number'},
        ],
        content:[
          { required: true, message: '请输入内容', trigger: 'change'},
        ],
        seriousLevel:[
          { required: true, message: '请选择严重等级', trigger: 'change'},
        ],
        editorId:[
          { required: true, validator: validateEditorId, trigger: 'change'},
        ],
        adminId:[
          { required: true, validator: validateAdmin, trigger: 'change'},
        ]
      }
    }
  },
  methods:{
    // 清空
    emptyQuery(query){
      if(query == ''){
        this.$refs.inputs.query=''
        this.addform.userId = ''
      }
    },
    emptyQuery2(query){
      if(query == ''){
        this.$refs.input2.query=''
        this.addform.memberId = ''
      }
    },
    emptyQuery3(query){
      if(query == ''){
        this.$refs.input3.query=''
        this.addform.editorName = ''
      }
    },
    emptyQuery4(query){
      if(query == ''){
        this.$refs.input4.query=''
        this.addform.adminName = ''
      }
    },
    // 确认投诉
    getUEContent(){
      this.addform.content = this.$refs.ue.getUEContent();
      this.$refs.addform.validate(valid => {
        if (valid) {
          if (!this.addform.content) {
            this.$Message.info("请输入公告内容");
          } else {
            let msg = JSON.parse(JSON.stringify(this.addform));
            msg.editorId=this.addform.editorId;
            msg.product=this.product;
            msg.adminId=this.addform.adminId;
            msg.userName=this.$refs.inputs.query;
            msg.userId=this.addform.userId;
            msg.content=this.addform.content;
            msg.seriousLevel=this.addform.seriousLevel;
            msg.phone=this.addform.phone;
            msg.memberName=this.$refs.input2.query;
            msg.memberId=this.addform.memberId;
            msg.editorDepartmentid=this.addform.editorDepartmentid;
            msg.adminDepartmentid=this.addform.adminDepartmentid;
            msg.attachmentUrl=this.addform.attachmentUrl || '';
            msg.attachmentName=this.addform.attachmentName || '';
            console.log(msg)
            userComplainSave(formData(msg)).then(resp => {
              this.$router.go(-1);
              console.log("shushu:",resp)
            });
          }
        } else {
        }
      });
    },
    change1(option){
      memberSelectList({memberName:option.label}).then(res=>{
        this.addform.memberId = res.response[0].id
      })
    },
    // 获取公司名称下拉搜索
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          memberName: query
        }
         setTimeout(() => {
          this.loading = false;
          memberSelectList(params).then(res => {
            this.memberList = res.response;
          });
        }, 200);
      } else {
        this.options1 = []
      }
    },
    change2(option){
      let that = this;
      userSelectList({realName:option.label}).then(res=>{
        this.addform.userId = res.response[0].id
        if(res.response){
          res.response.map(item => {
            if(item.realName ==option.label){
              that.addform.phone = item.mobile || '';
            }
          })
        }
      })
    },
    // 获取投诉人下拉搜索
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = true;
        let params = {
          realName: query
          
        };
        setTimeout(() => {
          this.loading = false;
          userSelectList(params).then(res => {
            // console.log(query)
            this.realNameList = res.response;
            // this.addform.phone = this.realNameList.mobile || "";
            // console.log("tousu",this.realNameList)
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
     changeProduct(option){
      const idlist=option.map(item=>{
        return option.id
      })
      const namelist=option.map(item=>{
        return option.name
      })
      this.addform.product=idlist.join(',')
      this.addform.productName=namelist.join(',')
      // console.log(this.addform.product,this.addform.productName)
    },
    // 获取产品下拉搜索
    remoteMethod3(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          let data = {
            productName: query
          };
          var that = this;
          queryProductSelectList(data).then(resp => {
            that.loading = false;
            that.produceList = resp.response;
            console.log("canp",that.produceList)
          });
        }, 200);
      } else {
        this.produceList = [];
      }
    },
    change3(option){
      getAdminList({adminName: option.label}).then(res => {
        this.addform.editorDepartmentid = res.response[0].orgId;
        this.addform.editorId= res.response[0].id;
        console.log("责任编辑：",this.addform.editorId,this.addform.editorDepartmentid)
      });
    },
    change4(option){
      getAdminList({adminName: option.label}).then(res => {
        this.addform.adminDepartmentid = res.response[0].orgId;
        this.addform.adminId= res.response[0].id;
        console.log("业务员：",this.addform.adminDepartmentid,this.addform.adminId)
      });
    },
   
    // 获取业务员列表
    remoteMethod4(query) {
      if (query !== "") {
        this.loading = true;
        let params = {
          adminName: query
        };
        setTimeout(() => {
          this.loading = false;
          getAdminList(params).then(res => {
            this.adminList = res.response;
            // console.log(this.adminList)
          });
        }, 200);
      } else {
        this.options3 = [];
      }
    },
    // 获取等级列表
    getSeriousLevelList(){
      userComplainqueryAllSeriouslevel().then(resp => {
        // console.log(resp.response)
        this.seriousLevelList = resp.response.list;
      });
    },
     //上传文件
    handleUpload(file){
     this.form.noticeFiles = file;
    },
    // 上传成功后调用
    uploadSuccess(response){
      this.addform.attachmentName=response.response.attachmentName,
      this.addform.attachmentUrl=response.response.attachmentUrl
      console.log(this.addform.attUrlList)
    },
    //点击上传成功后的文件地址
    getUrl(data) {
      console.log(data);
    },
    //点击删除文件地址
    removeUrl(file, fileList){
      // console.log(file, fileList);
      let attachArr = [];
      if (fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          attachArr.push(fileList[i].response.response);
        }
        this.attUrlList = attachArr;
      } else {
        this.attUrlList = [];
      }
      console.log(this.attUrlList);
    },
    
    // 返回
    reback(){
      this.$router.push({name:'customerComplaint'})
    }
  },
  created(){
    this.getSeriousLevelList();
  }
}
</script>



