<template>
  <Card>
    <div slot="title">
      <p class='pmtj fs18' style="position:relative">我的通话统计
      </p>
      <div class='timebox'>
        <div v-for='(item,index) in timewrap' :key='index' :class="index==number? 'jdbox' : ''" @click="navchange(index)">
          <span class="onbox">{{item.option}}</span>
          <span class="downbox"></span>
        </div>
      </div>
    </div>
    <div class="callRecord">
      <Row :gutter="20">
        <Col span="12" class="left">
          <div class="top">
            <i class="icon"></i>
            <p> 总电话数(个)：<b @click="callLink" class="link">{{calls[number].callCount}}</b></p>
          </div>
          <div>
            <Row>
              <Col span='9'>
                <i-circle 
                  :trail-width="8"
                  :stroke-width="8"
                  :percent="calls[number].percent"
                  :size='100'
                  stroke-linecap="square"
                  trail-color='#f09d21'
                  stroke-color="#427fe9">
                  <span class="demo-Circle-inner" style="font-size:14px">电话数</span>
                </i-circle>
              </Col>
              <Col span='15' class="circleexplain">
                <div class="">
                  <Icon type="ios-square" color='#4180e7'></Icon>
                  <span>有效电话数(个)：<span class="blue fs16 link" @click="callLink">{{calls[number].effectiveCallCount}}</span></span>
                  
                </div>
                <div class="xiajia">
                  <Icon type="ios-square" color='#f19d21'></Icon>
                  <span>无效电话数(个)：<span class="blue fs16 link" @click="callLink">{{calls[number].invalidCallCount}}</span></span>
                </div>
              </Col>
            </Row>
          </div>
          <div class="bottom">
            <p> 待审核电话数(个)：<b @click="callLink" class="link">{{calls[number].auditCallCount}}</b></p>
          </div>
        </Col>
        <Col span="12" class="right">
          <div class="top">
            <i class="icon"></i>
            <p> 总通话时长(分钟)：<b @click="callLink" class="link">{{calls[number].allCallTime}}</b></p>
          </div>
          <div>
            <Row>
              <Col span='9'>
                <i-circle 
                  :trail-width="8"
                  :stroke-width="8"
                  :percent="calls[number].percent1"
                  :size='100'
                  stroke-linecap="square"
                  trail-color='#f09d21'
                  stroke-color="#427fe9">
                  <span class="demo-Circle-inner" style="font-size:14px">通话时长</span>
                </i-circle>
              </Col>
              <Col span='15' class="circleexplain">
                <div class="">
                  <Icon type="ios-square" color='#4180e7'></Icon>
                  <span>有效通话时长(分钟)：<span class="blue fs16 link" @click="callLink">{{calls[number].effectiveCallTime}}</span></span>
                </div>
                <div class="xiajia">
                  <Icon type="ios-square" color='#f19d21'></Icon>
                  <span>无效通话时长(分钟)：<span class="blue fs16 link" @click="callLink">{{calls[number].invalidCallTime}}</span></span>
                </div>
              </Col>
            </Row>
          </div>
          <div class="bottom">
            <p> 待审核通话时长(分钟)：<b @click="callLink" class="link">{{calls[number].auditCallTime}}</b></p>
          </div>
        </Col>
      </Row>
    </div>
  </Card>
</template>
<script>
import {
  workbenchDaycallcount,
  workbenchWeekcallcount,
  workbenchMonthcallcount
} from "./api/api.js";
export default {
    name: "callRecord",
    data() {
        return {
            number: 0,
            timewrap: [
                {
                    option: "本日通话统计"
                },
                {
                    option: "本周通话统计"
                },
                {
                    option: "本月通话统计"
                }
            ],
            calls:[
              {
                allCallTime: 0,
                callCount: 0,
                auditCallCount: 0,
                auditCallTime: 0,
                effectiveCallCount: 0,
                effectiveCallTime: 0,
                invalidCallCount: 0,
                invalidCallTime: 0,
                type: 1,
                percent:0,
                percent1:0
              },
              {
                allCallTime: 0,
                callCount: 0,
                auditCallCount: 0,
                auditCallTime: 0,
                effectiveCallCount: 0,
                effectiveCallTime: 0,
                invalidCallCount: 0,
                invalidCallTime: 0,
                type: 1,
                percent:0,
                percent1:0
              },
              {
                allCallTime: 0,
                callCount: 0,
                auditCallCount: 0,
                auditCallTime: 0,
                effectiveCallCount: 0,
                effectiveCallTime: 0,
                invalidCallCount: 0,
                invalidCallTime: 0,
                type: 1,
                percent:0,
                percent1:0
              }
            ],
            weekStart:"",
            todayStart:"",
            todayEnd:"",
            monthStart:""
        };
    },
    methods: {
        callLink(){
          let startTime = "";
          if(this.number == 0){
            startTime = this.todayStart;
          }else if(this.number == 1){
            startTime = this.weekStart;
          }else if(this.number == 2){
            startTime = this.monthStart;
          }
          this.$router.push({
            name: "myphoneRecords",
            query: {
                type: this.calls[this.number].type,
                startTime:startTime,
                endTime:this.todayEnd
            }
          });
        },
        // 排名统计
        navchange(index) {
            this.number = index;
        },
        getCalls(){
          workbenchDaycallcount().then(res => {
            if(res.response){
              let data = res.response;
              data.callCount = data.allDaycount;
              const a = data.effectiveCallCount ? data.effectiveCallCount : 0;
              const b = data.invalidCallCount ? data.invalidCallCount : 0;
              const c = a+b;
              if(c>0){
                data.percent = parseInt(a / c * 100)
              }else{
                data.percent = 0;
              }
              const a1 = data.effectiveCallTime ? data.effectiveCallTime : 0;
              const b1 = data.invalidCallTime ? data.invalidCallTime : 0;
              const c1 = a1+b1;
              if(c>0){
                data.percent1 = parseInt(a1 / c1 * 100)
              }else{
                data.percent1 = 0;
              }
              this.calls[0] = data
            }
          })
          workbenchWeekcallcount().then(res => {
            if(res.response){
              let data = res.response;
              data.callCount = data.allWeekcount;
              const a = data.effectiveCallCount ? data.effectiveCallCount : 0;
              const b = data.invalidCallCount ? data.invalidCallCount : 0;
              const c = a+b;
              if(c>0){
                data.percent = parseInt(a / c * 100)
              }else{
                data.percent = 0;
              }
              const a1 = data.effectiveCallTime ? data.effectiveCallTime : 0;
              const b1 = data.invalidCallTime ? data.invalidCallTime : 0;
              const c1 = a1+b1;
              if(c>0){
                data.percent1 = parseInt(a1 / c1 * 100)
              }else{
                data.percent1 = 0;
              }
              this.calls[1] = data
            }
          })
          workbenchMonthcallcount().then(res => {
            if(res.response){
              let data = res.response;
              data.callCount = data.allDaycount;
              const a = data.effectiveCallCount ? data.effectiveCallCount : 0;
              const b = data.invalidCallCount ? data.invalidCallCount : 0;
              const c = a+b;
              if(c>0){
                data.percent = parseInt(a / c * 100)
              }else{
                data.percent = 0;
              }
              const a1 = data.effectiveCallTime ? data.effectiveCallTime : 0;
              const b1 = data.invalidCallTime ? data.invalidCallTime : 0;
              const c1 = a1+b1;
              if(c>0){
                data.percent1 = parseInt(a1 / c1 * 100)
              }else{
                data.percent1 = 0;
              }
              this.calls[2] = data
            }
          })
        },
        getTime(){
          let now = new Date(); //当前日期 
          let nowDayOfWeek = now.getDay(); //今天本周的第几天 
          let nowDay = now.getDate(); //当前日 
          let nowMonth = now.getMonth(); //当前月 
          let nowYear = now.getFullYear(); //当前年
          let time1 = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
          time1.setHours(0, 0, 0, 0);
          this.weekStart = time1.getTime();
          let time2 = new Date(nowYear, nowMonth, 1);
          time2.setHours(0, 0, 0, 0);
          this.monthStart = time2.getTime();
          let time3 = new Date();
          time3.setHours(0, 0, 0, 0);
          this.todayStart = time3.getTime();
          let time4 = new Date();
          time4.setHours(23, 59, 59, 59);
          this.todayEnd = time4.getTime();
        },
        //格式化日期：yyyy-MM-dd 
        formatDate(date) { 
          var myyear = date.getFullYear(); 
          var mymonth = date.getMonth()+1; 
          var myweekday = date.getDate(); 

          if(mymonth < 10){ 
          mymonth = "0" + mymonth; 
          } 
          if(myweekday < 10){ 
          myweekday = "0" + myweekday; 
          } 
          return (myyear+"-"+mymonth + "-" + myweekday); 
        } 
    },
    mounted() {
      this.getTime()
      this.getCalls()
    }
};
</script>