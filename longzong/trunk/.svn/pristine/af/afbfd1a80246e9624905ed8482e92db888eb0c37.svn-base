<style lang="less" scoped>
  .plant-content {
    //background: #fff;
    padding: 0 30px;
  }

  .sms-detail-con {
    height: 60px;
    min-height: 60px;
    line-height: 58px;
    white-space: nowrap;
    overflow: auto;
    text-align: center;
    font-size: 14px;
  }

  .top {
    border-top: 1px solid #000;
  }

  .bottom {
    border-bottom: 1px solid #000;
  }

  .left {
    border-left: 1px solid #000;
  }

  .right {
    border-right: 1px solid #000;
  }

  .margin-top-20 {
    margin-top: 30px;
  }

  .margin-bottom-5 {
    margin-bottom: 5px;
  }
  .btnBack{
    border: 1px solid #dcdee2;
    font-size: 12px;
    border-radius: 4px;
    width: 4%;
    margin: 0 48%;
    text-align: center;
    display: inline-block;
  }
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：生产报表&nbsp;&nbsp;>&nbsp;&nbsp;电话量统计
    </Row>
    </Col>
    <Col span="24" class="plant-content">
    <Row>
      <Col span="6">
      <p class="sms-detail-con left top">小组:</p>
      </Col>
      <Col span="6" class="sms-detail-con top left right">{{TelephoneStatisticsDetailVO.orgName}}</Col>
      <Col span="6">
      <p class="sms-detail-con top ">姓名:</p>
      </Col>
      <Col span="6" class="sms-detail-con top left right">{{TelephoneStatisticsDetailVO.adminName}}</Col>
    </Row>
    <Row>
      <Col span="6">
      <p class="sms-detail-con top left bottom">呼叫日期:</p>
      </Col>
      <Col span="6" class="sms-detail-con top left right bottom">{{sTime}}-{{eTime}}</Col>
      <Col span="6">
      <p class="sms-detail-con top bottom">总计:</p>
      </Col>
      <Col span="6" class="sms-detail-con top right left bottom">通时总计:{{TelephoneStatisticsDetailVO.totalTime}}秒，&nbsp;通次总计:{{TelephoneStatisticsDetailVO.totalTimes}}次</Col>
    </Row>
    <Row>
      <Col span="6">
      <p class="sms-detail-con left bottom">内部:</p>
      </Col>
      <Col span="6" class="sms-detail-con left bottom">内部通时:{{TelephoneStatisticsDetailVO.insideTime}}秒，&nbsp;内部通次:{{TelephoneStatisticsDetailVO.insideTimes}}次</Col>
      <Col span="6">
      <p class="sms-detail-con  left bottom">外部:</p>
      </Col>
      <Col span="6" class="sms-detail-con  right left bottom">外部通时:{{TelephoneStatisticsDetailVO.externalTime}}秒，&nbsp;外部通次:{{TelephoneStatisticsDetailVO.externalTimes}}次</Col>
    </Row>
    <!-- <Row>
      <Col span="6">
      <p class="sms-detail-con left bottom">总计:</p>
      </Col>
      <Col span="6" class="sms-detail-con left right bottom">{{TelephoneStatisticsDetailVO.external}}</Col>
     
    </Row>  -->
    </Col>

    <Col span="24" class="margin-top-20">
    </Col>
    <Col span="24" class-name="search-form">
    <Form :label-width="120">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="对方号码:">
          <Input v-model.trim="form.otherCode" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="6" class="text-left">
        <FormItem label="方向:" :label-width="120">
          <Select v-model.trim="form.director">
            <Option v-for="item in directorList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <Button type="primary" class="search-btn" @click="search">查询</Button>
        <Button type="primary" class="search-btn" @click="handleReset()">重置</Button>
        </Col>
      </Row>

    </form>
    </Col>
    </Card>
    <Col span="24">
    <Row class-name="table-con">
      <Table class="tableCommon" :data="tableData" :columns="columns" :border="true">
      </Table>
      <div class="page-con">
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"></oil-page>
          <span  @click="back" class="btnBack">返回</span>
      </div>
    </Row>
    </Col>
  </Row>
</template>

<script>
  import {
    detailQueryTelNumberPage,
    detailQueryTelNumberTable
  } from "../../components/axios/produceReport.js";
  import { formData } from "../../../assets/js/common.js";
  import axios from "axios";
  import oilPage from "../../components/page/page.vue";
  export default {
    name: "telephoneStatisticsInfo",
    components: {
      oilPage
    },
    data() {
      return {
        total: 0,
        pageSizeOpts: [10, 20, 30, 50],
        showSizer: true,
        pageSize: 10,
        pageNum: 1,
        TelephoneStatisticsDetailVO: "",
        form: {
          otherCode: "",
          director: 0
        },
        directorList: [
          {
            value: 0,
            desc: "全部"
          },
          {
            value: 1,
            desc: "呼入"
          },
          {
            value: 2,
            desc: "呼出"
          }
        ],
        columns: [
          {
            key: "extCode",
            align: "center",
            title: "分机",
            minWidth: 100
          },
          {
            key: "otherCode",
            align: "center",
            title: "对方号码",
            minWidth: 120
          },
          {
            key: "locationIdDesc",
            align: "center",
            minWidth: 100,
            title: "区域"
          },
          {
            key: "callTypeDesc",
            align: "center",
            minWidth: 100,
            title: "方向"
          },
          {
            key: "callResultTypeDesc",
            align: "center",
            minWidth: 100,
            title: "呼叫结果"
          },
          {
            key: "callTime",
            align: "center",
            minWidth: 150,
            title: "呼叫时间"
          },
          {
            key: "callTimeLen",
            align: "center",
            minWidth: 150,
            title: "呼叫时长（秒）"
          },
          {
            key: "connectTime",
            align: "center",
            minWidth: 150,
            title: "接通时间"
          },
          {
            key: "connectTimeLen",
            align: "center",
            minWidth: 150,
            title: "通话时长（秒）"
          },
          {
            key: "disconnectTime",
            align: "center",
            minWidth: 150,
            title: "断开时间"
          },
          {
            key: "id",
            align: "center",
            minWidth: 100,
            title: "ID"
          },
          {
            title: "录音",
            align: "center",
            width: 350,
            render: (h, data) => {
              var htmls =
                '<audio controls src="' +
                data.row.fileUrl +
                '">您的浏览器不支持 h5音频 标签。</audio>';
              return h("div", {
                domProps: {
                  innerHTML: htmls
                }
              });
            }
          }
        ],
        tableData: [],
        sTime: "",
        eTime: ""
      };
    },
    created() {
      this.getInfo();
      this.getData();
    },
    methods: {
      back(){
        this.$router.push('telephoneStatistics')
      },
      //详情数据
      getInfo() {
        var that = this;
        var params = {
          employeeId: this.$route.query.employeeId,
          startTime: this.$route.query.startTime,
          endTime: this.$route.query.endTime,
        };
        detailQueryTelNumberTable(params)
          .then(res => {
            that.TelephoneStatisticsDetailVO = res.response || "";
            that.sTime = that.dateType(that.$route.query.startTime, 0);
            that.eTime = that.dateType(that.$route.query.endTime, 0);
          })
          .catch(() => {
            that.loading = false;
          });
      },
      //转换为日期
      dateType(date, type) {
        date = Number(date)
        var time = new Date(date);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        if (type == 0) {
          return y + '/' + this.add0(m) + '/' + this.add0(d);
        } else {
          return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
        }

      },
      add0(v) {
        if (v < 10) {
          return "0" + v
        } else {
          return v
        }
      },
      //列表数据
      getData() {
        var that = this;
        var director;
        if (this.form.director == 0) {
          director = ''
        } else {
          director = this.form.director
        }
        var params = {
          pageNum: that.pageNum,
          pageSize: that.pageSize,
          employeeId: this.$route.query.employeeId,
          startTime: this.$route.query.startTime,
          endTime: this.$route.query.endTime,
          //callType: this.$route.query.callType,
          otherCode: this.form.otherCode,
          director: director
        };
        detailQueryTelNumberPage(params)
          .then(res => {
            if (res.response && res.response.list) {
              that.tableData = res.response.list || [];
              that.total = res.response.total;
              for (var i = 0; i < that.tableData.length; i++) {
                that.tableData[i].callTime = that.dateType(that.tableData[i].callTime, 1);
                that.tableData[i].connectTime = that.dateType(that.tableData[i].connectTime, 1);
                that.tableData[i].disconnectTime = that.dateType(that.tableData[i].disconnectTime, 1);
              }

            } else {
              that.tableData = [];
              that.total = 0;
            }
          })
          .catch(() => {
            that.loading = false;
          });
      },
      //获取列表分页每页显示的记录数
      pageChange(page, pageSize) {
        if (page) {
          this.pageNum = page;
        }
        if (pageSize) {
          this.pageSize = pageSize;
        }
        this.getData();
      },
      //查询
      search() {
        this.pageNum = 1;
        this.pageSize = 10;
        this.getData();
      },
      //重置
      handleReset() {
        this.form.otherCode = "";
        this.form.director = 0;
      }
    }
  };
</script>