<template>
  <Card :bordered="false">
    <p class='pmtj fs18' style="position:relative">我的任务</p>
    <div>
      <div class='tasklist'>
        <i class="icon"></i>
        <div class="conten">
          <p class='blue fs16 tit'>本日<span class="black">任务</span></p>
          <p class="category">
            <span>待办任务数：<b @click="taskLink(daystasks.time)">{{daystasks.task1}}</b></span>
            <span>已完成任务数：<b @click="taskLink(daystasks.time)">{{daystasks.task2}}</b></span>
            <span>延期任务数：<b @click="taskLink(daystasks.time)">{{daystasks.task3}}</b></span>
          </p>
        </div>
      </div>
      <div class='tasklist'>
        <i class="icon"></i>
        <div class="conten">
          <p class='blue fs16 tit'>本周<span class="black">任务</span></p>
          <p class="category">
            <span>待办任务数：<b @click="taskLink(weekstasks.time)">{{weekstasks.task1}}</b></span>
            <span>已完成任务数：<b @click="taskLink(weekstasks.time)">{{weekstasks.task2}}</b></span>
            <span>延期任务数：<b @click="taskLink(weekstasks.time)">{{weekstasks.task3}}</b></span>
          </p>
        </div>
      </div>
      <div class='tasklist'>
        <i class="icon"></i>
        <div class="conten">
          <p class='blue fs16 tit'>本月<span class="black">任务</span></p>
          <p class="category">
            <span>待办任务数：<b @click="taskLink(monthstasks.time)">{{monthstasks.task1}}</b></span>
            <span>已完成任务数：<b @click="taskLink(monthstasks.time)">{{monthstasks.task2}}</b></span>
            <span>延期任务数：<b @click="taskLink(monthstasks.time)">{{monthstasks.task3}}</b></span>
          </p>
        </div>
      </div>
    </div>
  </Card>
</template>
<script>
import {
  workbenchDaytaskcount,
  workbenchWeektaskcount,
  workbenchMonthtaskcount
} from "./api/api.js";
export default {
    name: "myTask",
    data() {
        return {
          daystasks:{
            task1:0,
            task2:0,
            task3:0,
            time:0
          },
          weekstasks:{
            task1:0,
            task2:0,
            task3:0,
            time:0
          },
          monthstasks:{
            task1:0,
            task2:0,
            task3:0,
            time:0
          },
        };
    },
    methods:{
      getTasks(){
          workbenchDaytaskcount().then(res => {
            if(res.response){
              this.daystasks = {
                task1:res.response.待办任务数,
                task2:res.response.已完成任务数,
                task3:res.response.已超时任务数,
                time:res.response.任务周期
              }
            }
          })
          workbenchWeektaskcount().then(res => {
            if(res.response){
              this.weekstasks = {
                task1:res.response.待办任务数,
                task2:res.response.已完成任务数,
                task3:res.response.已超时任务数,
                time:res.response.任务周期
              }
            }
          })
          workbenchMonthtaskcount().then(res => {
            if(res.response){
              this.monthstasks = {
                task1:res.response.待办任务数,
                task2:res.response.已完成任务数,
                task3:res.response.已超时任务数,
                time:res.response.任务周期
              }
            }
          })
      },
      taskLink(val){
        this.$router.push({
            name: "myInformationUnit",
            query: {
                taskCycle: val
            }
        });
      }
    },
    mounted() {
      this.getTasks()
    }
};
</script>