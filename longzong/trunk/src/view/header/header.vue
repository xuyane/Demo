<style lang="less" scoped>
  @import "../../assets/css/z.less";
  .main-header {
    .rel();
    width: 100%;
    height: 80px;
    display: flex;
    padding: 0 20px;
    .min-width(1000px);
    .font-s18();
    color: #fff;
    background-color: #4280e8;
    .logo {
      .logo-img {
        width: 160px;
        height: 35px;
      }
      .logo-btn {
        margin-left: 50px;
        margin-right: 10px;
        height: 22px;
      }
    }
    .user-btn{
      .abs();
      right: 20px;
      height: 80px;
      .line{
          width: 1px;
          height: 40px;
          background: #27408b;
      }
      .phone-center{
          cursor: pointer;
          margin: 0 20px;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
          border: 1px solid #fff;
          border-radius: 5px;
             padding: 3px 8px 3px 3px;
          display: flex;
          align-items: center;
      }
      .btn-con {
        img{
          width: 30px;
          margin-left: 20px;
          cursor: pointer;
        }
        .phone-lg {
          width: 40px;
          margin-left: 30px;
        }
        .phone-sm {
          width: 30px;
          margin-left: 25px;
        }
      }
    }
    .search {
      border-radius:0;
      width: 280px;
      height: 32px;
      input {
        height: 32px;
      }
    }
    .ivu-input-group-prepend {
      border-radius: 0;
    }
    .ivu-select-selection {
      font-size: 16px;
    }
    .mar-left-30 {
      margin-left: 30px !important;
    }
    .logout {
      font-size:14px;
      margin-left: 10px;
      .exit{
        cursor: pointer;
      }
    }
    .plant-down{

      a{
        color:#fff;
        .icon-down{
          margin-left:-5px;
        }
      }
      .list{
        display:flex;
        justify-content: flex-start;
        align-items:center;
        width:460px;
        flex-wrap:wrap;
        padding: 10px 5px;
        background-color: #fff;
        position: absolute;
        left: -50px;
        box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
        border-radius: 5px;

        &:after{
          position:absolute;
          width: 0;
          height: 0;
          left: 20px;
          top: -20px;
          content: ' ';
          border: 10px solid transparent;
          border-width: 10px;
          border-bottom-color: #fff;
        }

      .item{
          width:135px;
          margin:10px 0 10px 10px;
          text-align:center;
          border-right: 1px solid #999;
          color: #333333;
          font-family: MicrosoftYaHei;
          padding:0;
        }
        .item:last-child{
           border:0;
        }
       .item:nth-child(3n+0){
            border:0;
        }
      }

    }
  }
</style>

<template>
  <div class="main-header">
    <Row type="flex" align="middle" class-name="logo" style="margin-top: -15px;">
      <img src="../../assets/images/logo.png" class="logo-img">
      <img src="../../assets/images/logo-btn.png" class="logo-btn">
      <router-link :to="workBenchPath" tag="span" style="cursor: pointer;">工作台</router-link>
      <Dropdown trigger="click" class="plant-down" style="margin: 0 20px" @on-click="plantChange">
        <a href="javascript:void(0)">
            平台管理
           <Icon type="md-arrow-dropdown" color="#fff"/>
        </a>
        <DropdownMenu slot="list" class="list">
            <DropdownItem name="memberIndex" class="item">用户管理系统</DropdownItem>
            <DropdownItem name="plantIndex" class="item">平台资讯管理</DropdownItem>
            <DropdownItem name="financeIndex" class="item" >财务系统</DropdownItem>
            <DropdownItem name="systemIndex" class="item">系统管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</DropdownItem>
            <DropdownItem name="dataCenterIndex" class="item">数据中心&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</DropdownItem>
            <DropdownItem name="reportIndex" class="item">报表管理</DropdownItem>
            <DropdownItem name="achievementsIndex" class="item">绩效管理 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</DropdownItem>
         <DropdownItem name="workflowIndex" class="item" >工作流&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    </Row>
    <!--v-if="userPhoneInfo"-->
    <Row type="flex" align="middle" class-name="user-btn">
    <span class="line"></span>
        <span class="phone-center" @click="$emit('openPhoneCenter')">
         <Icon type="ios-person-add-outline" color="#fff" style="font-size:25px;margin-right:3px"/>
         呼叫中心</span>

      <div class="search">
        <Input v-model.number="phoneNumber" placeholder="请输入电话号码"></Input>
      </div>
      <Row type="flex" align="middle" class-name="btn-con">
        <img :src="callBtnImg" class="phone-lg" @click="onDial">
        <img src="../../assets/images/phone-out.png" class="phone-lg" @click="onHangUp">
        <template v-if="userPhoneInfo.loginName">
          <span class="line" style="margin-left:20px"></span>
          <img src="../../assets/images/user.png" style="width:25px;">
          <div class="logout">{{userPhoneInfo.loginName }}
            <span v-show="userPhoneInfo.ids">{{userPhoneInfo.ids}}</span>
            <span v-show="userPhoneInfo.telephoneShortNumber"> (分机号：{{userPhoneInfo.telephoneShortNumber}})，</span>
            <span class="exit" @click="logoutApi">[&nbsp;安全退出&nbsp;]</span>
          </div>
        </template>
      </Row>
    </Row>
  </div>
</template>

<script>
import axios from 'axios';
import CallInBtnImg from '../../assets/images/phone-in.png';
import CallOutBtnImg from '../../assets/images/phone-prev.png';
import {workbenchLoginInfo,} from '../CMS/CMSWorkBench/components/api/api.js';
export default {
  name: 'topHeader',
  mounted() {
    setTimeout(() => {
      const userPhoneInfo = JSON.parse(window.localStorage.getItem('userPhoneInfo'));
      if (userPhoneInfo) {
//        console.log('header', userPhoneInfo);
        this.userPhoneInfo = userPhoneInfo;
//        this.name=this.userPhoneInfo.loginName;
//        this.excode=this.userPhoneInfo.excode;
        this.$emit('init-user-info', userPhoneInfo);
      }/*else{
        workbenchLoginInfo().then(res => {

          this.name=res.response.name;
        })
      }*/
    }, 3000);
  },
  data () {
    return {
//      excode:'',
      select1: 'http',
      phoneNumber: '',
      workBenchPath: '',
      userPhoneInfo: {},
//      name:''
    }
  },

  props: {
    currentRoutePath: {
      type: String,
      default: '/'
    }
  },

  computed: {
    callBtnImg() {
      return this.phoneNumber.toString().length ? CallInBtnImg : CallOutBtnImg;
    }
  },

  watch: {
    currentRoutePath(newVal) {
      if (newVal) {
        const webUrl = this.userPhoneInfo.webUrl;
//        console.log('webUrl', webUrl);
        this.workBenchPath = webUrl && webUrl.length > 2 ? webUrl.substr(2) : newVal;
//        console.log('workBenchPath', this.workBenchPath);
      }
    }
  },

  methods: {
    //拨打事件
    onDial(){
      let number = this.phoneNumber.toString();
      if (number.length > 4 && number.charAt(0) !== '0'){
        number = '0' + number;
      }

      if(number) {
        this.$emit('on-dial', number);
      }else {
        this.$Message.error({
          content: '请输入正确的电话号码',
          duration: 3
        })
      }
    },
    //挂断电机号
    onHangUp(){
      this.$emit('on-hang-up');
    },
    //登出事件
    logoutApi(){
      axios.get('/login/logout.htm').then(res => {
        window.localStorage.removeItem('userPhoneInfo');
        window.location.href = 'https://mgt.oilchem.net/login/login.htm'
      })
    },
    plantChange(name){
      this.$router.push({
        name: name
      });
    }
  }
}
</script>