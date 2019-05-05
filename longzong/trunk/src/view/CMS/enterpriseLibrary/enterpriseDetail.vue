<style scoped>
.fx-boxs {
  position: absolute;
  width: 90%;
  z-index: 100;
  max-height: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  border-left: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  box-shadow: 0 0 20px #ccc;
}
.sms-detail-con-box {
  height: 60px;
  min-height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
}
.fx-boxs li {
  padding: 5px 0;
}
.fx-box li:hover {
  background: #c1c1c1;
}
.sms-detail-con {
  height: 60px;
  min-height: 60px;
  line-height: 58px;
  white-space:nowrap;
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
.sms-detail-lr {
  height: 120px;
  line-height: 120px;
  overflow: auto;
  text-align: center;
  padding-left: 30px;
  font-size: 14px;
}
</style>
<template>
    <Row>
        <Col span="24">
        <Row class-name="current-position">
            当前位置：基础数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;企业库管理>>&nbsp;&nbsp;企业查看
        </Row>
        </Col>
        <Col span="24" class-name="search-form" style="margin-bottom: 20px">
        <Form ref="addForm" :label-width="200">

            <Col span="24">
            <Row>
                <Col span="24">
                <p class="sms-detail-con left top right tab-title">企业基础信息</p>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">企业名称:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left ">
                {{enterpriseDetailList.name}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">简称:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left right">
                {{enterpriseDetailList.shortName}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">全拼:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left ">
                {{enterpriseDetailList.qp}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">简拼:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left right">
                {{enterpriseDetailList.jp}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">英文名:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left ">
                {{enterpriseDetailList.nameEn}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">日文名:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left right">
                {{enterpriseDetailList.nameJa}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">简称英文名:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left ">
                {{enterpriseDetailList.shortNameEn}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">简称日文名:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left right">
                {{enterpriseDetailList.shortNameJa}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">企业类型:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left ">
                {{enterpriseDetailList.typeDesc}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">企业性质:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left right">
                {{enterpriseDetailList.natrueDesc}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">行业类型:</p>
                </Col>
                <Col span="6" class="sms-detail-con-box top left">
                <ul class="fx-boxs" id="fxBox">
                    <li v-for="(item, index) in industryTypes" :key="item.id">
                        <p style="max-width: 100%;text-align: left;margin-left: 20px; display:inline-block">
                            <span>{{item.name}}</span>
                        </p>
                    </li>
                </ul>
                </Col>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">邮件地址:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left  right">
                {{enterpriseDetailList.email}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">联系电话:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left">
                {{enterpriseDetailList.phone}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">传真:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left right">
                {{enterpriseDetailList.fax}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">区域:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left">
                {{enterpriseDetailList.areaName}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">邮编:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left  right">
                {{enterpriseDetailList.postcode}}
                </Col>
            </Row>
            <Row style="margin-bottom:40px; border-bottom:1px solid #000">
                <Col span="6">
                <p class="sms-detail-con top left tab-th">详细地址:</p>
                </Col>
                <Col span="18" class="sms-detail-con top left right" style="text-align:left; padding-left: 135px;">
                {{enterpriseDetailList.address}}
                </Col>
                <!-- <Col span="6" class="sms-detail-con top left"> -->
                <!-- <p class="sms-detail-con top left tab-th">详细地址(英文):</p> -->
                <!-- </Col> -->
                <!-- <Col span="6" class="sms-detail-con top left right"> -->
                <!-- {{enterpriseDetailList.email}} -->
                <!-- </Col> -->
            </Row>
            <Row>
                <Col span="24">
                <p class="sms-detail-con left top right tab-title">工商数据信息</p>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">成立日期:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left">
                {{establishDateDesc}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">注册资本(元):</p>
                </Col>
                <Col span="6" class="sms-detail-con top left right">
                {{registeredCapital}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">法人:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left">
                {{legalPerson}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">社会信用代码:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left right">
                {{creditCode}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">企业人数:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left">
                {{personNumber}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">企业产值(元):</p>
                </Col>
                <Col span="6" class="sms-detail-con top left right">
                {{capacity}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">企业网站:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left">
                {{website}}
                </Col>
                <Col span="6">
                <p class="sms-detail-con top left tab-th">证件编号:</p>
                </Col>
                <Col span="6" class="sms-detail-con top left right">
                {{licenseNo}}
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <p class="sms-detail-con left top tab-th">企业简述:</p>
                </Col>
                <Col span="18" class="sms-detail-con top left right">
                {{operateShow}}
                </Col>
            </Row>
            <Row class="left top bottom right">
                <Col span="6">
                <p class="sms-detail-lr tab-th">企业经营范围:</p>
                </Col>
                <Col span="18" class="sms-detail-lr left ">
                {{operateScope}}
                </Col>
            </Row>
            <Row>
                <Col span="24">
                <div style="display:flex; justify-content:center;margin-top:20px;">
                    <Button type="primary" class="search-btn" @click="returnHome">返回</Button>
                </div>
                </Col>
            </Row>
            </Col>
        </form>
        </Col>

    </Row>
</template>
<script>
import axios from "axios";
import { formData } from "../../../assets/js/common.js";
import timeStampChange from "../../../assets/js/timestamp_change.js";
export default {
  name: "enterpriseDetail",
  data() {
    return {
      enterpriseDetailList: [],
      form: "",
      establishDateDesc: "",
      licenseNo: "",
      legalPerson: "",
      creditCode: "",
      personNumber: "",
      operateShow: "",
      operateScope: "",
      capacity: "",
      website: "",
      registeredCapital: "",
      industryTypes: []
    };
  },
  created() {
    //初始化企业详情
    this.init();
  },
  methods: {
    //初始化企业详情
    init() {
      let id = this.$route.query.id;
      var that = this;
      var params = new URLSearchParams();
      params.append("id", id);
      axios.post("/basedata/enterprise/detail", params).then(function(res) {
        if (res.data.status == 200) {
          that.enterpriseDetailList = res.data.response;
          var arrList = res.data.response.industryTypesDesc;
          if (arrList && arrList.length > 0) {
            for (let i = 0; i < arrList.length; i++) {
              var industryTypeObj = {};
              industryTypeObj.id = arrList[i].id;
              industryTypeObj.name = arrList[i].pathName;
              that.industryTypes.push(industryTypeObj);
            }
          }
          that.licenseNo = that.enterpriseDetailList.enterpriseIcInfoVO.licenseNo;
          that.legalPerson = that.enterpriseDetailList.enterpriseIcInfoVO.legalPerson;
          that.creditCode = that.enterpriseDetailList.enterpriseIcInfoVO.creditCode;
          that.personNumber = that.enterpriseDetailList.enterpriseIcInfoVO.personNumber;
          that.operateScope = that.enterpriseDetailList.enterpriseIcInfoVO.operateScope;
          that.operateShow = that.enterpriseDetailList.description;
          that.capacity = that.enterpriseDetailList.enterpriseIcInfoVO.capacity;
          that.website = that.enterpriseDetailList.website;
          that.registeredCapital = that.enterpriseDetailList.enterpriseIcInfoVO.registeredCapital.toFixed(
            2
          );
          if (res.data.response.enterpriseIcInfoVO.establishDateDesc == "-") {
            that.establishDateDesc == "";
          } else {
            that.establishDateDesc =
              res.data.response.enterpriseIcInfoVO.establishDateDesc;
          }
        } else {
          that.$Message.warning(res.data.message);
        }
      });
    },
    returnHome() {
      let type = this.$route.query.type;
      if (type == 1) {
        this.$router.push({
          name: "enterpriseRelationship",
          query: { id: this.$route.query.mainId }
        });
      } else {
        this.$router.push({ name: "enterpriseList" });
      }
    }
  }
};
</script>
