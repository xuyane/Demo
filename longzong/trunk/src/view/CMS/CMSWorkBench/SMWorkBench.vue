<style lang="less">
@import "../../../assets/css/common.less";
@import "cmsWorkBench.less";
</style>

<template>
    <div class="cmsWorkBench">
        <div class="top-header">
          <top-header :currentRoutePath="currentRoutePath" @openPhoneCenter="openModal" @on-dial="onDial" @on-hang-up="onHangUp" @init-user-info="initUserPhoneInfo"></top-header>
        </div>
        <div class='box clearfix'>
            <left-msg :userInfo="userInfo"></left-msg>
            <Row class='cms-right-content'>
                <nav-menu :role="type"></nav-menu>
                <div class="cont-wrap" v-if="type == 2">
                    <Row :gutter="15">
                        <Col span="9">
                        <my-task></my-task>
                        </Col>
                        <Col span="15">
                            <call-record></call-record>
                        </Col>
                    </Row>
                    <Row :gutter="15" style="margin-top:15px;">
                        <Col span="24">
                            <timeout-remind></timeout-remind>
                        </Col>
                    </Row>
                </div>
                <div class="cont-wrap" v-if="type == 1">
                    <Row :gutter="15">
                        <Col span="9">
                        <my-task></my-task>
                        </Col>
                        <Col span="15">
                            <call-record></call-record>
                        </Col>
                    </Row>
                    <Row :gutter="15" style="margin-top:15px;">
                        <Col span="24">
                            <timeout-remind></timeout-remind>
                        </Col>
                    </Row>
                    <Row :gutter="15" style="margin-top:15px;">
                        <Col span="24">
                            <department-tasks></department-tasks>
                        </Col>
                    </Row>
                </div>
                <div class="cont-wrap" v-if="type == 0">
                    <Row :gutter="15">
                        <Col span="10">
                        <my-task class="moreHeight"></my-task>
                        </Col>
                        <Col span="14">
                        <timeout-remind></timeout-remind>
                        </Col>
                    </Row>
                    <Row :gutter="15" class-name="margin-top-15">
                        <Col span="24">
                            <audit-info></audit-info>
                        </Col>
                    </Row>
                    <Row :gutter="15" class-name="margin-top-15">
                        <Col span="24">
                            <alldepartment-tasks></alldepartment-tasks>
                        </Col>
                    </Row>
                </div>
            </Row>
        </div>

      <!---------------->

      <Modal footer-hide width="760" v-model="showModal" :title="modalTitle">
        <phone-center-modal :has_connected="has_connected" :calling="calling" :phoneMsgRecord="phoneMsgRecord" :callInRecord="callInRecord" :callOutRecord="callOutRecord" @change-connect="changeConnectStatus" @on-dial="onDial" @on-hang-up="onHangUp"></phone-center-modal>
      </Modal>
    </div>
</template>

<script>
import topHeader from "../../header/header.vue";
import leftMsg from "./components/leftUserMsg";
import navMenu from "./components/navMenu.vue";
import myTask from "./components/myTask.vue";
import callRecord from "./components/callRecord.vue";
import timeoutRemind from "./components/timeoutRemind.vue";
import departmentTasks from "./components/departmentTasks.vue";
import alldepartmentTasks from "./components/alldepartmentTasks.vue";
import auditInfo from "./components/auditInfo.vue";
import {
  workbenchLoginInfo,

} from "./components/api/api.js";

import axios from 'axios'
import dial from '@/assets/js/linkDial.js';
import phoneCenterModal from '@/view/components/phoneCenterModal/phoneCenterModal.vue';
import {callRecordPage} from '@/view/components/axios/phoneCenter'

export default {
    components: {
        topHeader,
        navMenu,
        leftMsg,
        myTask,
        callRecord,
        timeoutRemind,
        departmentTasks,
        alldepartmentTasks,
        auditInfo,
      phoneCenterModal
    },
    data() {
        return {
            menu: [
                {
                    key: "0",
                    name: "新增信息单元"
                },
                {
                    key: "1",
                    name: "信息单元管理"
                },
                {
                    key: "2",
                    name: "我的信息单元 "
                },
                {
                    key: "3",
                    name: "任务分派及委派"
                },
                {
                    key: "4",
                    name: "信息发布"
                },
                {
                    key: "5",
                    name: "文章查看"
                },
                {
                    key: "6",
                    name: "短信查看"
                },
                {
                    key: "7",
                    name: "短讯通查看"
                }
            ],
            userInfo:{},
            type:'',

          /***************************/

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
        };
    },
    methods: {
        getLogin(){
            workbenchLoginInfo().then(res => {
                this.userInfo = res.response ? res.response : {}
                this.type = res.response ? res.response.type : ""
            })
        },

      /********************/
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
    },
    mounted(){
        this.getLogin()

    },
  computed: {
    modalTitle() {
      return this.userPhoneInfo ? `隆众呼叫中心（我的分机号：${this.userPhoneInfo.telephoneShortNumber}）` : '隆众呼叫中心';
    },
    isGl() {
      return this.userPhoneInfo.glAdminId !== null;
    }
  }
};
</script>
