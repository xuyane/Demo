<style lang="less" scoped>
.fx-boxs {
  position: absolute;
  width: 99%;
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
  height: 30px;
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

</style>
<template>
    <Modal v-model="showModal" title="查看企业人" @on-cancel="doCancel" width="900"> 
        <Row>
            <Col span="24">
            <p class="sms-detail-con left top right">企业联系人详情</p>
            </Col>
        </Row>
        <Row>
            <Col span="6">
            <p class="sms-detail-con left top">姓名:</p>
            </Col>
            <Col span="6" class="sms-detail-con top left">
            {{enterpriseContactList.name}}
            </Col>
            <Col span="6">
            <p class="sms-detail-con top left">性别:</p>
            </Col>
            <Col span="6" class="sms-detail-con top left right">
            {{enterpriseContactList.sexDesc}}
            </Col>
        </Row>
        <Row>
            <Col span="6">
            <p class="sms-detail-con left top">部门:</p>
            </Col>
            <Col span="6" class="sms-detail-con top left">
            {{enterpriseContactList.department}}
            </Col>
            <Col span="6">
            <p class="sms-detail-con top left">职位:</p>
            </Col>
            <Col span="6" class="sms-detail-con top left right">
            {{enterpriseContactList.position}}
            </Col>
        </Row>
        <Row>
            <Col span="6">
            <p class="sms-detail-con left top">电话:</p>
            </Col>
            <Col span="6" class="sms-detail-con top left">
            {{enterpriseContactList.phone}}
            </Col>
            <Col span="6">
            <p class="sms-detail-con top left">手机:</p>
            </Col>
            <Col span="6" class="sms-detail-con top left right">
            {{enterpriseContactList.mobile}}
            </Col>
        </Row>
        <Row>
            <Col span="6">
            <p class="sms-detail-con left top">传真:</p>
            </Col>
            <Col span="18" class="sms-detail-con top left right">
            {{enterpriseContactList.fax}}
            </Col>
        </Row>
        <Row>
            <Col span="6">
            <p class="sms-detail-con left top">邮件:</p>
            </Col>
            <Col span="18" class="sms-detail-con top left right">
            {{enterpriseContactList.email}}
            </Col>
        </Row>
        <Row>
            <Col span="6">
            <p class="sms-detail-con left top">QQ:</p>
            </Col>
            <Col span="6" class="sms-detail-con top left">
            {{enterpriseContactList.qq}}
            </Col>
            <Col span="6">
            <p class="sms-detail-con top left">微信:</p>
            </Col>
            <Col span="6" class="sms-detail-con top left right">
            {{enterpriseContactList.weChat}}
            </Col>
        </Row>
        <Row>
            <Col span="6">
            <p class="sms-detail-con left top">主联系人:</p>
            </Col>
            <Col span="18" class="sms-detail-con top left right">
            {{enterpriseContactList.isMainDesc}}
            </Col>
        </Row>
        <Row>
            <Col span="6">
            <p class="sms-detail-con left  top bottom">关联品种:</p>
            </Col>
            <Col span="18" class="sms-detail-con left right top bottom">
            <!-- <div v-for="(item,index) in contractsBreedList" :key="item.breedId">
                {{item.breedName}}
            </div> -->
            <ul class="fx-boxs" id="fxBox">
                    <li v-for="(item, index) in contractsBreedList" :key="item.breedId">
                        <p style="max-width: 100%;text-align: left;margin-left: 20px; display:inline-block">
                            <span>{{item.breedName}}</span>
                        </p>
                    </li>
                </ul>
            </Col>
        </Row>   
        <div slot="footer" >
            <i-button class="search-btn" type="primary" @click="doCancel">返回</i-button>
        </div>
    </Modal>

</template>
<script>
import axios from "axios";
export default {
  name: "enterpriseContactDetail",
  props: {
    showCheckModal: Boolean
  },
  data() {
    return {
      showModal: false,
      enterpriseContactList: [],
      contractsBreedList: []
    };
  },
  methods: {
    //初始化企业联系人详情
    getInitData(id) {
      var that = this;
      var params = new URLSearchParams();
      params.append("id", id);
      axios
        .post("/basedata/enterprise/detail_contacts", params)
        .then(function(res) {
          if (res.data.status == 200) {
            that.enterpriseContactList = res.data.response;
            that.contractsBreedList = res.data.response.contractsBreedList;
          } else {
            that.$Message.warning(res.data.message);
          }
        });
    },
    doCancel() {
      this.$emit("hide-modal");
    }
  },
  watch: {
    showCheckModal(newVal, oldVal) {
      this.showModal = newVal;
    }
  }
};
</script>
