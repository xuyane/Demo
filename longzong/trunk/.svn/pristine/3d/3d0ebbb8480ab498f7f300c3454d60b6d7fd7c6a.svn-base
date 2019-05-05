
<template>
    <div class='box clearfix'>
        <div class='msgwrap'>
            <div class='userhead'>
              <img :src='information.headimg' />
            </div>
            <div class='username name'>{{information.name}}</div>
            <div class='username'><span>所属部门：</span><span>{{information.deptName}}</span></div>
            <div class='username'><span>所属职位：</span><span>{{information.rankCode}}</span></div>
            <div class='username'><span>入职时间：</span><span>{{information.jobTime}}</span></div>
            <div class='username'><span>职位状态：</span><span>{{information.job}}</span></div>
            <div class='username'><span>在职时间：</span><span>{{information.ontime}}</span></div>
            <div class='username leave'>
                <div class='btnwrap'  @click="logoutApi"><i class="goout" ></i><span>退出登录</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { formatTime, formatTime2 } from '../../../assets/js/common.js'
import {
queryLoginInfo
} from "../../components/axios/crm.js";
export default {
  data() {
    return {
      information: {

        name: "张三",
        department: "销售一部",
        position: "业务员",
        hiredate: "2016-06-28",
        statue: "在职",
        ontime: "0年6月12日"
      }
    };
  },
  methods:{  
    //登出事件
    logoutApi(){
      axios.get('/login/logout.htm').then(res => {
        window.location.href = 'https://mgt.oilchem.net/login/login.htm'
      })
    },
    getusermsg(){
      let that=this;
      this.$Spin.show();
      let params ={};
      params.times = new Date().getTime();

      queryLoginInfo(params).then(resp=>{
        that.$Spin.hide();
        that.information=resp.response;
        that.information.headimg= require("../../../assets/images/user-head.png")
        that.information.job=resp.response.job?'在职':'离职'
        that.information.jobTime=formatTime(resp.response.jobTime);
      })
    }
  },
  created(){
    this.getusermsg()
  }
};
</script>

<style scoped>
/* @import "../CRMWorkBench/workBench.less"; */
</style>