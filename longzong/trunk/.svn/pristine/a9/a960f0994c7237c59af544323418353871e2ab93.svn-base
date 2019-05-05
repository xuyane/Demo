<style lang="less">
.ivu-form-item-content {
  line-height: 28px;
}
span.text {
  padding: 0 10px;
}
.ivu-divider-horizontal.ivu-divider-with-text-left {
  margin-top: 0;
}
.ivu-divider-horizontal.ivu-divider-with-text-left:after,
.ivu-divider-horizontal.ivu-divider-with-text-left:before {
  border-top-color: #666;
}
</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的用户</Row>
    </Col>
    <tab-header :tab-index="9"></tab-header>
    <Col span="24" style="margin-top:10px;">
      <Card :bordered="false">
        <Form :model="formItem" :rules="rules" :label-width="160">
          <!--我是一个分割线-->
          <Divider orientation="left">日数据</Divider>
          <Row>
            <Col span="4">
              <FormItem label="查看权限">
                <RadioGroup v-model="formItem.dataLookDay">
                  <Radio label="1" :disabled="formItem.dayDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.dayDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="日数据查看期限:">
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.dayDataId ? false : true"
                  v-model="formItem.dataLookDayStart"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
                <span class="text">到</span>
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.dayDataId ? false : true"
                  v-model="formItem.dataLookDayEnd"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="下载权限">
                <RadioGroup v-model="formItem.dataLoadDay">
                  <Radio label="1" :disabled="formItem.dayDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.dayDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="4">
              <FormItem label="查看曲线">
                <RadioGroup v-model="formItem.curveLookDay">
                  <Radio label="1" :disabled="formItem.dayDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.dayDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="曲线查看期限:">
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.dayDataId ? false : true"
                  v-model="formItem.curveLookDayStart"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
                <span class="text">到</span>
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.dayDataId ? false : true"
                  v-model="formItem.curveLookDayEnd"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="下载曲线">
                <RadioGroup v-model="formItem.curveLoadDay">
                  <Radio label="1" :disabled="formItem.dayDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.dayDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>

          <!--我是一个分割线-->
          <Divider orientation="left">周数据</Divider>
          <Row>
            <Col span="4">
              <FormItem label="查看权限">
                <RadioGroup v-model="formItem.dataLookWeek">
                  <Radio label="1" :disabled="formItem.weekDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.weekDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="周数据查看期限:">
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.weekDataId ? false : true"
                  v-model="formItem.dataLookWeekStart"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
                <span class="text">到</span>
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.weekDataId ? false : true"
                  v-model="formItem.dataLookWeekEnd"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="下载权限">
                <RadioGroup v-model="formItem.dataLoadWeek">
                  <Radio label="1" :disabled="formItem.weekDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.weekDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="4">
              <FormItem label="查看曲线">
                <RadioGroup v-model="formItem.curveLookWeek">
                  <Radio label="1" :disabled="formItem.weekDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.weekDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="曲线查看期限:">
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.weekDataId ? false : true"
                  v-model="formItem.curveLookWeekStart"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
                <span class="text">到</span>
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.weekDataId ? false : true"
                  v-model="formItem.curveLookWeekEnd"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="下载曲线">
                <RadioGroup v-model="formItem.curveLoadWeek">
                  <Radio label="1" :disabled="formItem.weekDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.weekDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>

          <!--我是一个分割线-->
          <Divider orientation="left">月数据</Divider>
          <Row>
            <Col span="4">
              <FormItem label="查看权限">
                <RadioGroup v-model="formItem.dataLookMonth">
                  <Radio label="1" :disabled="formItem.monthDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.monthDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="月数据查看期限:">
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.monthDataId ? false : true"
                  v-model="formItem.dataLookMonthStart"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
                <span class="text">到</span>
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.monthDataId ? false : true"
                  v-model="formItem.dataLookMonthEnd"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="下载权限">
                <RadioGroup v-model="formItem.dataLoadMonth">
                  <Radio label="1" :disabled="formItem.monthDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.monthDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="4">
              <FormItem label="查看曲线">
                <RadioGroup v-model="formItem.curveLookMonth">
                  <Radio label="1" :disabled="formItem.monthDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.monthDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="曲线查看期限:">
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.monthDataId ? false : true"
                  v-model="formItem.curveLookMonthStart"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
                <span class="text">到</span>
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.monthDataId ? false : true"
                  v-model="formItem.curveLookMonthEnd"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="下载曲线">
                <RadioGroup v-model="formItem.curveLoadMonth">
                  <Radio label="1" :disabled="formItem.monthDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.monthDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>

          <!--我是一个分割线-->
          <Divider orientation="left">年数据</Divider>
          <Row>
            <Col span="4">
              <FormItem label="查看权限">
                <RadioGroup v-model="formItem.dataLookYear">
                  <Radio label="1" :disabled="formItem.yearDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.yearDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="年数据查看期限:">
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.yearDataId ? false : true"
                  v-model="formItem.dataLookYearStart"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
                <span class="text">到</span>
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.yearDataId ? false : true"
                  v-model="formItem.dataLookYearEnd"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="下载权限">
                <RadioGroup v-model="formItem.dataLoadYear">
                  <Radio label="1" :disabled="formItem.yearDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.yearDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="4">
              <FormItem label="查看曲线">
                <RadioGroup v-model="formItem.curveLookYear">
                  <Radio label="1" :disabled="formItem.yearDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.yearDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="曲线查看期限:">
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.yearDataId ? false : true"
                  v-model="formItem.curveLookYearStart"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
                <span class="text">到</span>
                <DatePicker
                  class="search-input"
                  :clearable="false"
                  :disabled="formItem.yearDataId ? false : true"
                  v-model="formItem.curveLookYearEnd"
                  type="date"
                  placeholder="请选择日期"
                  style="width: 180px"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem label="下载曲线">
                <RadioGroup v-model="formItem.curveLoadYear">
                  <Radio label="1" :disabled="formItem.yearDataId ? false : true">是</Radio>
                  <Radio label="0" :disabled="formItem.yearDataId ? false : true">否</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row style="text-align:center;">
            <Button type="primary" @click="save()" :disabled="canISave">保存</Button>
          </Row>
        </Form>
        <Spin size="large" fix v-if="loading"></Spin>
      </Card>
    </Col>
  </Row>
</template>
<script>
import TabHeader from "./tabHeader";
import {
  getDatapermissions,
  updateDatapermissions
} from "../../../components/axios/crm.js";
import { formData } from "../../../../assets/js/common.js";
export default {
  data() {
    return {
      canISave: true,
      loading: true,
      rules: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        passwd: [{ validator: "required", trigger: "blur" }]
      },
      timeOptions: {
        dataLookDayStart: {
          name: "日数据查看期限开始日期",
          value: {}
        },
        dataLookDayEnd: {
          name: "日数据查看期限结束日期",
          value: {}
        },
        curveLookDayStart: {
          name: "日数据曲线查看期限开始日期",
          value: {}
        },
        curveLookDayEnd: {
          name: "日数据曲线查看期限结束日期",
          value: {}
        },
        dataLookWeekStart: {
          name: "周数据查看期限开始日期",
          value: {}
        },
        dataLookWeekEnd: {
          name: "周数据查看期限结束日期",
          value: {}
        },
        curveLookWeekStart: {
          name: "周数据曲线查看期限开始日期",
          value: {}
        },
        curveLookWeekEnd: {
          name: "周数据曲线查看期限结束日期",
          value: {}
        },
        dataLookMonthStart: {
          name: "月数据查看期限开始日期",
          value: {}
        },
        dataLookMonthEnd: {
          name: "月数据查看期限结束日期",
          value: {}
        },
        curveLookMonthStart: {
          name: "月数据曲线查看期限开始日期",
          value: {}
        },
        curveLookMonthEnd: {
          name: "月数据曲线查看期限结束日期",
          value: {}
        },
        dataLookYearStart: {
          name: "年数据查看期限开始日期",
          value: {}
        },
        dataLookYearEnd: {
          name: "年数据查看期限结束日期",
          value: {}
        },
        curveLookYearStart: {
          name: "年数据曲线查看期限开始日期",
          value: {}
        },
        curveLookYearEnd: {
          name: "年数据曲线查看期限结束日期",
          value: {}
        }
      },
      formItem: {
        dayDataId: "", //日数据ID
        weekDataId: "", //周数据ID
        monthDataId: "", //月数据ID
        yearDataId: "", //年数据ID
        dayCurveId: "", //日曲线ID
        weekCurveId: "", //周曲线ID
        monthCurveId: "", //月曲线ID
        yearCurveId: "", //年曲线ID

        dataLookDayStart: "", //日数据查看期限开始日期
        dataLookDayEnd: "", //日数据查看期限结束日期
        dataLookDay: "1", //日数据查看权限
        dataLoadDay: "1", //日数据下载权限
        curveLookDayStart: "", //日数据曲线查看期限开始日期
        curveLookDayEnd: "", //日数据曲线查看期限结束日期
        curveLookDay: "1", //日数据查看曲线权限
        curveLoadDay: "1", //日数据下载曲线全选

        dataLookWeekStart: "", //周数据查看期限开始日期
        dataLookWeekEnd: "", //周数据查看期限结束日期
        dataLookWeek: "0", //周数据查看权限
        dataLoadWeek: "0", //周数据下载权限
        curveLookWeekStart: "", //周数据曲线查看期限开始日期
        curveLookWeekEnd: "", //周数据曲线查看期限结束日期
        curveLookWeek: "0", //周数据查看曲线权限
        curveLoadWeek: "0", //周数据下载曲线权限

        dataLookMonthStart: "", //月数据查看期限开始日期
        dataLookMonthEnd: "", //月数据查看期限结束日期
        dataLookMonth: "0", //月数据查看权限
        dataLoadMonth: "0", //月数据下载权限
        curveLookMonthStart: "", //月数据曲线查看期限开始日期
        curveLookMonthEnd: "", //月数据曲线查看期限结束日期
        curveLookMonth: "0", //月数据查看曲线权限
        curveLoadMonth: "0", //月数据下载曲线权限

        dataLookYearStart: "", //年数据查看期限开始日期
        dataLookYearEnd: "", //年数据查看期限结束日期
        dataLookYear: "0", //年数据查看权限
        dataLoadYear: "0", //年数据下载权限
        curveLookYearStart: "", //年数据曲线查看期限开始日期
        curveLookYearEnd: "", //年数据曲线查看期限结束日期
        curveLookYear: "0", //年数据查看曲线权限
        curveLoadYear: "0" //年数据下载曲线权限
      },
      dataPower: {}
    };
  },
  components: {
    TabHeader
  },
  created() {
    this.quertDataPower();
  },
  methods: {
    //获取数据权限
    quertDataPower() {
      this.canISave = true;

      let params = {
        userId: window.localStorage.lzUserId
      };

      getDatapermissions(params)
        .then(res => {
          this.dataPower = res.response;

          let {
            dayDataId: A, //日数据ID
            weekDataId: B, //周数据ID
            monthDataId: C, //月数据ID
            yearDataId: D, //年数据ID
            dayCurveId: E, //日曲线ID
            weekCurveId: F, //周曲线ID
            monthCurveId: G, //月曲线ID
            yearCurveId: H //年曲线ID
          } = this.dataPower;

          this.loading = false;

          // 都为空就不能保存
          this.canISave =
            !A && !B && !C && !D && !E && !F && !G && !H ? true : false;

          for (var key in res.response) {
            if (key.indexOf("Start") > -1 || key.indexOf("End") > -1) {
              res.response[key] = res.response[key]
                ? new Date(res.response[key])
                : "";
            }

            if (typeof res.response[key] === "number") {
              res.response[key] = res.response[key].toString();
            }
          }

          this.formItem = { ...res.response };
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    },
    save() {
      let params = { ...this.formItem };

      for (let key in params) {
        if (key.indexOf("Start") > -1) {
          params[key] = params[key].getTime();

          let endTime =
            typeof params[key.replace("Start", "End")] === "number"
              ? params[key.replace("Start", "End")]
              : new Date(
                  params[key.replace("Start", "End")].toLocaleDateString()
                ).setHours(23, 59, 59);

          if (params[key] > endTime) {
            let info =
              this.timeOptions[key].name + "选择错误!";
            this.$Message.error(info);
            return;
          }
        }

        if (key.indexOf("End") > -1) {
          //结束时间取23:59:59秒的13位时间戳
          params[key] = new Date(params[key].toLocaleDateString()).setHours(
            23,
            59,
            59
          );

          let startTime =
            typeof params[key.replace("End", "Start")] === "number"
              ? params[key.replace("End", "Start")]
              : params[key.replace("End", "Start")].getTime();

          if (params[key] < startTime) {
            let info =
              this.timeOptions[key].name + "选择错误!";
            this.$Message.error(info);
            return;
          }
        }
      }

      updateDatapermissions(params).then(res => {
        this.$Message.success("保存成功");

        this.quertDataPower();
      });
    }
  }
};
</script>
