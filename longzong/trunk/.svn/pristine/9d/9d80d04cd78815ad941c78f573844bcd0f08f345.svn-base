
<style lang="less" scoped>
.tab {
  padding: 20px 0 0 50px;
  background: #fff;
}
</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：对外接口管理&nbsp;&nbsp;>>&nbsp;&nbsp;接口用户管理>>&nbsp;&nbsp;
        <span v-show="tab === 1">国内市场价</span>
        <span v-show="tab === 2">国际市场价</span>
        <span v-show="tab === 3">国内出厂价</span>
        <span v-show="tab === 4">国际原油价</span>
        <span v-show="tab === 5">成品油主营批发价</span>
        <span v-show="tab === 6">成品油主营零售价</span>
        <span v-show="tab === 7">基准价</span>
      </Row>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="addPriceConfig">新增配置</Button>

          <Button type="primary" class="search-btn" @click="exportConfigCode">导出配置指标</Button>
          <span>价格数据时间:</span>
          <DatePicker
            v-model="queryTime1"
            format="yyyy-MM-dd"
            type="datetime"
            :editable="editableStr"
            class="search-input"
            style="width:300px"
          ></DatePicker>
          <span>to</span>
          <DatePicker
            v-model="queryTime2"
            format="yyyy-MM-dd"
            type="datetime"
            :disabled="disabled"
            :editable="editableStr"
            class="search-input"
            style="width:300px"
          ></DatePicker>
          <Button type="primary" class="search-btn" @click="exportCodeData">导出指标数据</Button>
        </div>
      </Row>
    </Col>
    <Col span="24" class="tab">
      <tab-header :tab="tab" :tab-list="tabList" @tab="tabChange"></tab-header>
    </Col>
    <Col span="24" v-if="tab === 1">
      <home-market></home-market>
    </Col>
    <Col span="24" v-if="tab === 2">
      <international-market></international-market>
    </Col>
    <Col span="24" v-if="tab === 3">
      <domesticex-factory></domesticex-factory>
    </Col>
    <Col span="24" v-if="tab === 4">
      <international-crudeoil></international-crudeoil>
    </Col>
    <Col span="24" v-if="tab === 5">
      <wholesale-price></wholesale-price>
    </Col>
    <Col span="24" v-if="tab === 6">
      <retail-price></retail-price>
    </Col>
    <Col span="24" v-if="tab === 7">
      <base-price></base-price>
    </Col>
    <Col span="24" style="text-align:center;">
      <Button
        type="primary"
        @click="goback"
        style="width:150px;font-size:15px;border-radius:5px;"
      >返回</Button>
    </Col>
  </Row>
</template>

<script>
import axios from "axios";
import {
  getNextMonth,
  formatStamp,
  formatTime
} from "../../assets/js/common.js";
import TabHeader from "../components/tab/tab.vue";
import homeMarket from "./homeMarketPrice.vue";
import internationalMarket from "./internationalMarketPrice.vue";
import DomesticexFactory from "./DomesticExFactoryPrice.vue";
import InternationalCrudeoil from "./internationalCrudeOilPrice.vue";
import wholesalePrice from "./wholesalePrice.vue";
import retailPrice from "./retailPriceOfRefinedOil.vue";
import basePrice from "./basePrice.vue";
export default {
  components: {
    TabHeader,
    homeMarket,
    internationalMarket,
    DomesticexFactory,
    InternationalCrudeoil,
    wholesalePrice,
    retailPrice,
    basePrice
  },
  data() {
    return {
      time: [],
      tab: 1,
      queryTime1: new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
      queryTime2:  new Date(),
      startTime: "",
      endndTime: "",
      editableStr: false,
      disabled:true,
      lastDay: "", //选择第一个时间后计算第二个时间最大范围
      tabList: [
        {
          tab: 1,
          title: "国内市场价"
        },
        {
          tab: 2,
          title: "国际市场价"
        },
        {
          tab: 3,
          title: "国内出厂价"
        },
        {
          tab: 4,
          title: "国际原油价"
        },
        {
          tab: 5,
          title: "成品油主营批发价"
        },
        {
          tab: 6,
          title: "成品油主营零售价"
        },
        {
          tab: 7,
          title: "基准价"
        }
      ]
    };
  },
  created() {
    if (this.$route.query.tab) {
      this.tab = parseInt(this.$route.query.tab);
    } else {
      this.tab = 1;
    }
    this.currentName = this.$router.history.current.name;
  },
  methods: {
    goback() {
      this.$router.push({ name: "apiUserManagement" });
    },
    tabChange(tab) {
      this.tab = tab;
    },
    //获取时间
    getQueryTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      this.startTime = data1.getTime();
      this.endndTime = data2.getTime();
    },
    // timeRule() {
    //   let getMonth = getNextMonth(formatTime(this.queryTime[0]));
    //   if (this.queryTime[1].getTime() - formatStamp(getMonth) > 0) {
    //     this.$Message.error("导出数据的时间范围需在一个月内");
    //     this.startTime = "";
    //     this.endndTime = "";
    //     this.queryTime = [
    //       new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
    //       new Date()
    //     ];
    //   }
    // },
    //导出配置指标
    exportConfigCode() {
      let id = this.$route.query.id;
      window.location.href = "/openapi/price/exportConfig?userId=" + id;
    },
    //导出指标数据
    exportCodeData() {
      let startTime = formatTime(this.queryTime1);
      let endTime = formatTime(this.queryTime2);
      let getMonth = getNextMonth(startTime);
      let s1 = new Date(getMonth).getTime();
      let s2 = new Date(endTime).getTime();
      let s3 = new Date(startTime).getTime();
      let s = s1-s2;
      if(s<0){
        this.$Message.error('导出数据的时间范围需在一个月内')
        return;
      }
      let id = this.$route.query.id;
      window.location.href =
        "/openapi/price/exportConfigData?userId=" +
        id +
        "&startTime=" +
        s3 +
        "&endTime=" +
        s1;
    },
    addPriceConfig() {
      this.$router.push({
        name: "newPriceAllocation",
        query: {
          id: this.$route.query.id,
          type: this.tab
        }
      });
    }
  }
};
</script>
