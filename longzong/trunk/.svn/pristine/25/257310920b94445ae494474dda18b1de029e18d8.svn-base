<style lang="less" scoped>
.ip_wrap{
  width:100%;
  text-align:center;
  font-size: 14px;
  border-collapse:collapse;
  tr{
    height:50px;
    line-height: 50px;
    td{
      border:1px solid #5b5b5b;
      .table_control{
        width: 90%;
      }
    }
  }
  thead tr{
    background-color: #eee;
  }
}
.contH5{
  font-size:14px;
  color:#2db7f5;
}
.redH5{
  font-size:14px;
  color:#ed4014;
}
</style>
<template>
  <Row class="addRevise">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：接口用户管理&nbsp;&nbsp;>>&nbsp;&nbsp;{{title}}
      </Row>
    </Col>
        <Col span="24">
      <Card style="margin-bottom:20px">
        <Form :label-width="150" ref="addform" :model="addform" :rules="addRoles">
          <Row>
            <Col span="8">
              <FormItem label="企业：" prop='enterprise'>
                <Select
                v-model="addform.enterprise"
                ref="inputEnter"
                @on-query-change="emptyQuery"
                class="search-input"
                filterable
                remote
                transfer
                :remote-method="remoteMethod"
                :loading="loading">
                <Option v-for="(option, index) in enterpriseList" :value="option.id" :key="index">{{option.text}}</Option>
              </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="登录名：" prop='userName'>
                <Input v-model="addform.userName" class="search-input"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="密码：" prop='password'>
                <Input v-model="addform.password" class="search-input" @on-focus="focusPassword" @on-blur="blurPassword"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="联系人：" prop='contactsName'>
                <Input v-model="addform.contactsName" class="search-input"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="电话：" prop="phone">
                <Input v-model="addform.phone" class="search-input"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="手机号码：" prop='mobilephone'>
                <Input v-model="addform.mobilephone" class="search-input"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="ip设定：" prop="ipform">
                <table class="ip_wrap ivu-form-item-content">
                  <tbody>
                    <tr v-for="(ips,ipIndex) in addform.ipform" :key="ipIndex">
                      <td>
                        <Input class="table_control" placeholder="ip地址 例如: 192.168.0.1" v-model="ips.ip" />
                      </td>
                      <td>
                        <ButtonGroup v-if="ipIndex===0">
                          <Button type="primary" icon="ios-add" size="small" @click="addIp"></Button>
                        </ButtonGroup>
                        <ButtonGroup v-else>
                          <Button type="primary" icon="ios-add" size="small" @click="addIp"></Button>
                          <Button type="error" icon="ios-remove" size="small" @click="reduceIp(ipIndex)"></Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="合同有效时间：" class="ivu-form-item-required" prop="validityTime">
                <DatePicker format="yyyy-MM-dd" @on-change="getQueryTime1" v-model="addform.validityTime" type="daterange" placement="bottom-end" placeholder="合同有效时间"  class="search-input"></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="价格数据起止时间：">
                <DatePicker format="yyyy-MM-dd" @on-change="getQueryTime2" v-model="priceSETime"  type="daterange" placement="bottom-end" placeholder="价格数据起止时间"  class="search-input"></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="资讯数据起止时间：">
                <DatePicker format="yyyy-MM-dd" @on-change="getQueryTime3" v-model="newSETime" type="daterange" placement="bottom-end"  placeholder="资讯数据起止时间"  class="search-input"></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row v-if="initId!==-1">
            <Col span="8">
              <div class="ivu-form-item-label" style="width: 150px;">状态：</div>
              <div :class="status=='正常'?'ivu-form-item-content contH5':'ivu-form-item-content redH5'" style="margin-left: 150px;">{{status}}</div>
            </Col>
          </Row>
          <Row style="margin:0 100px;">
            <Button type="primary" class="search-btn" @click="saveUser">保存</Button>
            <Button  style="margin-left: 8px" class="search-btn" @click="reback">返回</Button>
          </Row>
        </Form>
      </Card>
    </Col>
  </Row>
</template>

<script>
import { formData , getNextMonth , formatStamp , formatTime } from "../../assets/js/common.js";
import {insertUser,selectUserByUserId,enterpriseNameSelectTO,modifyUser} from "../components/axios/apiManagement.js";
import { memberSelectList, deleteContact } from "../components/axios/crm.js";
export default {
  name: 'addReviseApiUser',
  components: {
  },
  data(){
    const validateEnter = (rule, value, callback) => {
        if (this.$refs.inputEnter.query === '') {
            callback(new Error('请输入公司名称'));
        }else {
          callback();  
        }
    };
    const validateUserName = (rule, value, callback) => {
      var regLetter = new RegExp(/^[A-Za-z]+$/) // 验证字母正则
      var regNumber = new RegExp(/^[0-9]*$/); // 验证数字的正则
      var regName = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/); //验证数字和字母
      if(value.length<4|| value.length>15){
        callback(new Error('请输入4-15位数字或字母登录名'))
      }else if(regName.test(value)==false){
        if(regNumber.test(value)==true){
          callback()
        }else if(regLetter.test(value)==true){
          callback()
        }else{
          callback(new Error('请输入4-15位数字或字母登录名'))
        }
      }else{
        callback()
      } 
    };
    const validatePassword = (rule , value ,callback) =>{
      var regLetter = new RegExp(/^[A-Za-z]+$/) // 验证字母正则
      var regNumber = new RegExp(/^[0-9]*$/); // 验证数字的正则
      var regPassword = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/); //验证数字和字母
      if(value=='******'&&this.addform.oldPassword!==''){
        callback()
      }else{
        if(value.length<6|| value.length>15){
          callback(new Error('请输入6-15位数字或字母密码'))
        }else if(!regPassword.test(value)){
          if(regNumber.test(value)){
            callback()
          }else if(regLetter.test(value)){
            callback()
          }else{
            callback(new Error('请输入6-15位数字或字母密码'))
          }
        }else{
          callback()
        }
      } 
    };
    const validateContacts = (rule , value ,callback) =>{
      if (!value) {
        callback(new Error('请输入联系人'));
      }else {
        if(value.length>20){
          callback(new Error('联系人姓名超出可用长度'));
        }else{
          callback();  
        }
      }
    };
    const validatePhone = (rule, value, callback) => {
      if(value.length>20){
        callback(new Error("电话长度需在20位以内"));
      }else{
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (value) {
        const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入手机号码"));
      }
    };
    const validateTime = (rule, value, callback) =>{
      if(value[0]==''&&value[1]==''){
        callback(new Error("请选择合同有效时间"));
      }else{
        callback();
      }
    };
    const validateIpform = (rule, value, callback) =>{
      value.map(item=>{
        if(item.ip==''){
          callback(new Error("请输入ip地址"))
        }else if(value){
          const reg =/^(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})$/
          if(reg.test(item.ip)===false){
            callback(new Error("请输入正确的ip地址"));
          }else{
            callback()
          }
        } else{
          callback()
        }
      })
    };
    return {
      validityTime:['',''], //合同有效时间
      priceSETime:['',''], // 价格数据起止时间
      newSETime:['',''], // 资讯数据起止时间
      //lastDay:'', //合同结束时间
      status:'', //状态
      loading:false,
      enterpriseList:[{name:'',id:''}], //企业列表
      initId:0,
      addform:{
        enterprise: "",
        enterpriseName:"",
        userName: "",
        password: "",
        oldPassword:"",
        contactsName: "",
        phone: "",
        mobilephone: "",
        contractEndTime:0,
        contractStartTime:0,
        dataEndTime:0,
        dataStartTime:0,
        infoEndTime:0,
        infoStartTime:0,
        ipform:[
          {
            ip:''
          } 
        ],
        validityTime:['',''] //合同有效时间
      },
      title:"",
      addRoles:{ //规则
        enterprise:[ 
          { required: true, validator: validateEnter, trigger: 'change'},
        ],
        userName:[
          { required: true, validator: validateUserName, trigger: 'blur'}
        ],
        password:[
          { required: true, validator: validatePassword, trigger: 'blur'}
        ],
        contactsName:[
          { required: true, validator: validateContacts, trigger: 'blur'}
        ],
        phone:[
          { required: false, validator: validatePhone, trigger: 'blur'}
        ],
        mobilephone:[
          { required: true, validator: validateMobile, trigger: 'blur'}
        ],
        ipform:[
          { required: true , validator: validateIpform, trigger: 'blur' }
        ],
        validityTime:[
          { required: true , validator: validateTime, trigger: 'blur' }
        ]
      }
    }
  },
  computed:{
    lastDay(){
      if(this.addform.validityTime[1]!==''){
        return getNextMonth(formatTime(this.addform.validityTime[1].getTime()))
      }else{
        return ''
      }
    }
  },
  created(){
    this.initId = this.$route.query.id;
      if (this.initId != -1) {
        this.initData(this.initId);
       this.title = "修改接口用户";
    } else {
      this.title = "新增接口用户";
    }
  },
  methods:{
    //初始化数据
    initData(initId) {
      var that = this;
      var params = {
        userId: initId,
        time: new Date().getTime()
      }
      selectUserByUserId(params).then(res => {
        this.addform.userName = res.response.userName;
        this.addform.contactsName = res.response.contactsName;
        this.addform.oldPassword = res.response.password;
        this.addform.password = '******';
        this.addform.mobilephone = res.response.contactsMobile;
        this.addform.phone = res.response.contactsPhone;
        this.status = res.response.status;
        this.enterpriseList[0].text=res.response.enterpriseName;
        this.enterpriseList[0].id=-1;
        this.addform.enterprise = -1;
        this.addform.enterpriseName = res.response.enterpriseName;
        this.addform.ipform = res.response.bindIps.map(item=>{
          return {
            ip:item
          }
        })
        this.addform.contractEndTime = res.response.contractEndTime;
        this.addform.contractStartTime = res.response.contractStartTime;
        this.addform.dataEndTime = res.response.dataEndTime;
        this.addform.dataStartTime = res.response.dataStartTime;
        this.addform.infoEndTime = res.response.infoEndTime;
        this.addform.infoStartTime = res.response.infoStartTime;
        this.addform.validityTime = [formatTime(res.response.contractStartTime),formatTime(res.response.contractEndTime)]
        if(res.response.dataStartTime&&res.response.dataEndTime){
          this.priceSETime = [formatTime(res.response.dataStartTime),formatTime(res.response.dataEndTime)]
        }else{
          this.priceSETime = ['','']
        }
        if(res.response.infoStartTime&&res.response.infoEndTime){
          this.newSETime = [formatTime(res.response.infoStartTime),formatTime(res.response.infoEndTime)]
        }else{
          this.newSETime = ['','']
        }
        
        console.log(this.addform.ipform)
        });
    },
    //获取合同时间
    getQueryTime1(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      if(this.priceSETime[1]!==''){
        if(this.priceSETime[1].getTime() - this.addform.validityTime[1].getTime() < 0){
          this.$Message.error("价格数据结束时间不能小于合同结束时间");
          this.priceSETime = ['','']
          this.addform.dataStartTime = '';
          this.addform.dataEndTime = '';
        }else if(this.priceSETime[1].getTime() - formatStamp(this.lastDay) > 0){
          this.$Message.error("价格数据结束时间只能在合同结束时间一个月内");
          this.priceSETime = ['','']
          this.addform.dataStartTime = '';
          this.addform.dataEndTime = '';
        }
      }
      if(this.newSETime[1]!==''){
        if(this.newSETime[1].getTime() - this.addform.validityTime[1].getTime() < 0){
          this.$Message.error("资讯数据结束时间不能小于合同结束时间");
          this.newSETime = ['','']
          this.addform.infoStartTime = '';
          this.addform.infoEndTime = '';
        }else if(this.newSETime[1].getTime() - formatStamp(this.lastDay) > 0){
          this.$Message.error("资讯数据结束时间只能在合同结束时间一个月内");
          this.newSETime = ['','']
          this.addform.infoStartTime = '';
          this.addform.infoEndTime = '';
        }
      }
      this.addform.contractStartTime = data1.getTime();
      this.addform.contractEndTime = data2.getTime();
    },
     //获取价格时间
    getQueryTime2(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      if(this.addform.validityTime[1]!==''){
        if(formatStamp(data[1]) - this.addform.validityTime[1].getTime() < 0){
          this.$Message.error("价格数据结束时间不能小于合同结束时间");
          this.priceSETime = ['','']
        }else{
          if( formatStamp(data[1]) - formatStamp(this.lastDay) > 0 ){
            this.$Message.error("价格数据结束时间只能在合同结束时间一个月内");
            this.priceSETime = ['','']
          }else{
            this.addform.dataStartTime = data1.getTime();
            this.addform.dataEndTime = data2.getTime();
          } 
        }
      }
    },
     //获取数据时间
    getQueryTime3(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      if(this.addform.validityTime[1]!==''){
        if(formatStamp(data[1]) - this.addform.validityTime[1].getTime() < 0){
          this.$Message.error("资讯数据结束时间不能小于合同结束时间");
          this.newSETime = ['','']
        }else{
          if( formatStamp(data[1]) - formatStamp(this.lastDay) > 0 ){
            this.$Message.error("资讯数据结束时间只能在合同结束时间一个月内");
            this.newSETime = ['','']
          }else{
            this.addform.infoStartTime = data1.getTime();
            this.addform.infoEndTime = data2.getTime();
          } 
        }
      }
    },
    //保存数据
    saveUser(){
      let that = this;
      let passwords;
      if(that.addform.password=='******'){
        passwords = that.addform.oldPassword;
      }else{
        passwords = that.addform.password
      }
      that.addform.enterpriseName = this.$refs.inputEnter.query;
      that.$refs["addform"].validate(valid => {
        if (valid) {
          if(that.priceSETime[0]==''&&that.priceSETime[1]==''&&that.newSETime[0]==''&&that.newSETime[1]==''){
            that.$Message.error("价格数据起止时间和资讯数据起止时间至少选填一项");
            return;
          }
          if(this.initId ==-1){
            let forms = {
              bindIps:that.addform.ipform.map(item=>{
                return item.ip
              }),
              contactsMobile: that.addform.mobilephone,
              contactsName:that.addform.contactsName,
              contactsPhone:that.addform.phone,
              contractEndTime:that.addform.contractEndTime,
              contractStartTime:that.addform.contractStartTime,
              dataEndTime:that.addform.dataEndTime || 0,
              dataStartTime:that.addform.dataStartTime || 0,
              enterpriseName:that.addform.enterpriseName,
              infoEndTime:that.addform.infoEndTime || 0,
              infoStartTime:that.addform.infoStartTime || 0,
              password:passwords,
              userName:that.addform.userName  
            }
            insertUser(forms).then(res => {
              that.$Message.success("新增成功");
              that.reback();
            });
            that.loading1 = false;
          }else{
            console.log(that.addform.contractStartTime)
            let datas = {
              bindIps:that.addform.ipform.map(item=>{
                return item.ip
              }),
              contactsMobile: that.addform.mobilephone,
              contactsName:that.addform.contactsName,
              contactsPhone:that.addform.phone,
              contractEndTime:that.addform.contractEndTime,
              contractStartTime:that.addform.contractStartTime,
              dataEndTime:that.addform.dataEndTime || 0 ,
              dataStartTime:that.addform.dataStartTime || 0,
              enterpriseName:that.addform.enterpriseName,
              infoEndTime:that.addform.infoEndTime || 0,
              infoStartTime:that.addform.infoStartTime || 0,
              password:passwords,
              userName:that.addform.userName,  
              userId:that.$route.query.id
            }
            modifyUser(datas).then(res => {
              that.$Message.success("修改成功");
              that.reback();
            });
            that.loading1 = false;
          }
        }else{
          that.loading1= false
        }     
      })
    },
    // 清空
    emptyQuery(query){
      if(query == ''){
        this.$refs.inputEnter.query=''
        this.addform.enterprise = ''
      }
    },
    // 获取企业下拉搜索
    remoteMethod(query) {
      if (query !== "") {
        this.loading = false;
        let params = query;
         setTimeout(() => {
          this.loading = false;
          let params ={
            name : query
          }
          enterpriseNameSelectTO(formData(params)).then(res => {
            this.enterpriseList = res.response;
          });
        }, 200);
      } else {
        this.options = []
      }
    },
    // 返回
    reback(){
      this.$router.push({name:'apiUserManagement'});
    },
    addIp(){
      this.addform.ipform.push({ip:''})
    },
    reduceIp(index){
      this.addform.ipform.splice(index,1)
    },
    focusPassword(){
      if(this.addform.password == "******"){
        this.addform.password = ''
      }else{
        this.addform.password = this.addform.password
      }
    },
    blurPassword(){
      if(this.addform.password==''&&this.addform.oldPassword!==''){
        this.addform.password = '******'
      }
    }
  }
}
</script>
