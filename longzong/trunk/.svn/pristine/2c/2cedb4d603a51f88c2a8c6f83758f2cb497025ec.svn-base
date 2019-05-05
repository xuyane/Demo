<style lang="less">
  @import "../assets/css/main.less";
  @import "../assets/css/common.less";
  .top-header {
    width: 100%;
    height: 80px;
    min-width: 1000px;
  }
  .left-menu {
    width: 220px;
    position: fixed;
    left: 0;
    top: 80px;
    bottom: 0;
    font-size: 14px;
    color: #fff;
    overflow: auto;
    background: #354052;
  }
  
  // .left-menu::-webkit-scrollbar {
  //   display: none
  // }
  .Main {
    position: fixed;
    left: 220px;
    top: 80px;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    background: #eee;
    padding: 20px 20px 0 20px;
    .single-page {
      min-width: 1040px;
    }
    overflow-x: hidden;
  }
</style>

<template>
  <div>
    <div class="top-header">
      <top-header :currentRoutePath="currentRoutePath" @openPhoneCenter="openModal" @on-dial="onDial" @on-hang-up="onHangUp" @init-user-info="initUserPhoneInfo"></top-header>
    </div>
    <div class="left-menu">
      <left-menu></left-menu>
    </div>
    <div class="Main">
      <div class="single-page">
        <!-- <keep-alive :include="[
          'allUser', 'officalUser', 'purposeUser', 'followUser', 'testUser',
          'continuedUser', 'recentContactUser', 'recentLoginUser', 'runOffUser', 'competitorUser']"> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>

    <!---------------->

    <Modal footer-hide width="760" v-model="showModal" :title="modalTitle">
      <phone-center-modal :has_connected="has_connected" :calling="calling" :phoneMsgRecord="phoneMsgRecord" :callInRecord="callInRecord" :callOutRecord="callOutRecord" @change-connect="changeConnectStatus" @on-dial="onDial" @on-hang-up="onHangUp"></phone-center-modal>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import leftMenu from './menu/menu.vue'
import topHeader from './header/header.vue'
import phoneCenterModal from './components/phoneCenterModal/phoneCenterModal.vue'
//import {loginContext} from './components/axios/EAC'
import {callRecordPage} from './components/axios/phoneCenter'
//import { glPhoneCenterInit, glPhoneCenterCallOut } from './components/axios/http'
//import {addEvent} from "../assets/js/common";
import dial from '@/assets/js/linkDial.js';


export default {
  name: 'Main',
  components: {
    leftMenu,
    topHeader,
    phoneCenterModal
  },
  data(){
    return{
      showModal: false,

      // 是否连接cclink
      has_connected: false,
//      has_connected: true,

      // 是否正在打电话
      calling: false,


      // 登陆上下文
      login_context: {},

      // 呼出记录
      callOutRecord: [],

      // 呼入记录
      callInRecord: [],

      // 消息记录
      phoneMsgRecord: [],

      userPhoneInfo: {},

      currentRoutePath: '/'
    }
  },

  computed: {
    modalTitle() {
      return this.userPhoneInfo ? `隆众呼叫中心（我的分机号：${this.userPhoneInfo.telephoneShortNumber}）` : '隆众呼叫中心';
    },
    isGl() {
      return this.userPhoneInfo.glAdminId !== null;
    }
  },
  methods: {
    initUserPhoneInfo(info) {
      this.userPhoneInfo = info;
      this.currentRoutePath = this.$route.path;
//      console.log('in', this.userPhoneInfo);
      this.getPhoneCenterDatas();
    },

    // 打开呼叫弹窗
    openModal(){
      if (this.isGl) return;
      if (this.has_connected) {
        this.getPhoneCenterDatas();
        this.showModal = true;
      }else {
        this.$Message.warning({
          content: '未连接呼叫中心',
          duration: 3,
          closable: true
        });
      }
    },

    // 呼出
    onDial(phone) {
      dial(phone, res => {
        if (!res.isGl && !this.showModal) {
          this.openModal();
        }
        this.getMsgRecords().then(msg => {
          this.phoneMsgRecord = msg;
          const time = formatDate(+new Date());
          this.addMsgRecord({
            callTypeDesc: '正在拨号',
            otherCode: phone,
            time
          });
          this.$Notice.success({title: '呼叫成功：' + phone});
        });
      });
    },


    // 切换连接状态
    changeConnectStatus(status) {
      this.has_connected = status;
      if (!this.has_connected) {
        this._disConnect();
      }else {
        this._connectCClink();
      }
    },

    // 挂断
    onHangUp() {
      if (this.isGl) return;
      const calling = window.localStorage.getItem('calling');
      console.log('挂断', calling);
      if (!calling) return;
      CCLink.Ext_DropCall(calling);
      this.calling = false;
      window.localStorage.removeItem('calling');

      const time = formatDate(+new Date());
      this.addMsgRecord({
        callTypeDesc: '已挂机',
        otherCode: calling,
        time
      });

      console.log('已挂断');
      this.$Notice.info({title: '已挂断'});
    },

    // 断开cclink
    _disConnect() {
      if (!CCLink || this.isGl) return;
      CCLink.Link_DisConnectServer();
      this.has_connected = false;
      window.localStorage.removeItem('hasConnected');
      window.localStorage.removeItem('calling');
      this.$Notice.warning({
        title: '已断开连接',
        duration: 2
      });
    },



    // 获取呼叫记录
    getPhoneCenterDatas() {
      axios.all([
        this.getRecords(this.userPhoneInfo.ids, 1),
        this.getRecords(this.userPhoneInfo.ids, 2),
        this.getMsgRecords()
      ]).then(axios.spread((callInRes, callOutRes, msg) => {
        if (Number(callInRes.status) === 200) {
            this.callInRecord = callInRes.response.slice(0, 6);
//            console.log('in', this.callInRecord);
          }

          if (Number(callOutRes.status) === 200) {
            this.callOutRecord = callOutRes.response.slice(0, 6);
//            console.log('in-out', this.callOutRecord);
          }

          this.phoneMsgRecord = msg;

//            this._connectServer();
        if (window.localStorage.getItem('hasConnected')) {
            this.has_connected = true;
          }
      }));
    },


    // 获取呼叫记录
    getRecords(adminId, type){
      if (adminId && type) {
        return callRecordPage({ adminId, type });
      }
    },


    // 获取消息记录
    getMsgRecords() {
      const sessionMsg = window.sessionStorage.getItem('phoneMsg');
      const msgArr = sessionMsg ? JSON.parse(sessionMsg) : [];
      return new Promise(resolve => {
        resolve(msgArr);
      })
    },


    // 增加消息记录
    addMsgRecord(msg) {
      this.getMsgRecords().then(res => {
        res.unshift(msg);
        this.phoneMsgRecord = res;
        window.sessionStorage.setItem('phoneMsg', JSON.stringify(res));
      })
    },


    _connectCClink() {
      if (!CCLink) {
        this.has_connected =  false;
        return;
      }
      if (!this.userPhoneInfo.linkHost || !this.userPhoneInfo.linkPort) {
        this.has_connected =  false;
        return;
      }

      // 连接服务器
      const err_link = CCLink.Link_ConnectServer(this.userPhoneInfo.linkHost, this.userPhoneInfo.linkPort, 1);
      if (err_link) {
        this.$Notice.error({
          title: '连接呼叫中心服务器失败',
          desc: err_link
        });
        this.has_connected =  false;
        return;
      }

      // 绑定分机
      const err_assign = CCLink.Ext_Assign(this.userPhoneInfo.telephoneShortNumber, this.userPhoneInfo.telephoneShortNumber); //绑定到分机设备
      if (err_assign) {
        this.$Notice.error({
          title: '绑定分机失败',
          desc: err_assign
        });
        this.has_connected =  false;
        return;
      }

      // 将分机签入队列
      CCLink.Ext_CheckInQueue(this.userPhoneInfo.telephoneShortNumber);
      window.localStorage.setItem('hasConnected', 'true');
      this.has_connected =  true;
      this.$Notice.success({
        title: '连接呼叫中心服务器成功',
        duration: 2
      });
    }
  }
}
</script>
