
<template>
    <div class='user-menu'>
        <div class='msgwrap'>
            <div class='userhead'>
              <img :src='information.headimg' />
            </div>
            <div class='username name'>{{userInfo.loginName}}</div>
            <div class='username'><span>所属部门：</span><span>{{userInfo.deptName}}</span></div>
            <div class='username'><span>所属职位：</span><span>{{userInfo.job}}</span></div>
            <!-- <div class='username'><span>入职时间：</span><span>{{information.hiredate}}</span></div>
            <div class='username'><span>职位状态：</span><span>{{information.statue}}</span></div>
            <div class='username'><span>在职时间：</span><span>{{information.ontime}}</span></div> -->
            <div class='username leave'>
                <div class='btnwrap'><i class="goout" ></i><span>退出登录</span></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:['userInfo'],
  data() {
    return {
      information: {
        headimg: require("../../../../assets/images/user-head.png"),
        name: "张三",
        department: "销售一部",
        position: "业务员",
        hiredate: "2016-06-28",
        statue: "在职",
        ontime: "0年6月12日"
      }
    };
  }
};
</script>

<style scoped>
/* @import "../CRMWorkBench/workBench.less"; */
</style>