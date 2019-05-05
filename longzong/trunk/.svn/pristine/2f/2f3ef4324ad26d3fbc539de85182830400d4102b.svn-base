<style lang="less" scoped>
.plant-content{
    background: #fff;
    padding:0 20px;
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
.margin-top-20{
  margin-top: 20px;
}
.margin-bottom-5{
  margin-bottom: 5px;
}
</style>

<template>
  <Row>
    <Col span="24" class="plant-content">
    <Row class-name="current-position">
      当前位置：基础数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;企业库管理>>&nbsp;&nbsp;品种关联关系
    </Row>
    </Col>
    <Col span="24" class="plant-content">
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">企业名称:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">{{enterpriseDetailList.name}}</Col>
        <Col span="6">
        <p class="sms-detail-con top left">简称:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">{{enterpriseDetailList.shortName}}</Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con top left">企业类型:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">{{enterpriseDetailList.typeDesc}}</Col>
        <Col span="6">
        <p class="sms-detail-con top left">企业性质:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">{{enterpriseDetailList.natrueDesc}}</Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con top left">联系电话:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">{{enterpriseDetailList.phone}}</Col>
        <Col span="6">
        <p class="sms-detail-con top left">传真号码:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">{{enterpriseDetailList.fax}}</Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con top left bottom">区域:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left bottom">{{enterpriseDetailList.areaName}}</Col>
        <Col span="6">
        <p class="sms-detail-con top left bottom">详细地址:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right bottom">{{enterpriseDetailList.address}}</Col>
      </Row>
    </Col>
    <Col span="24" class="plant-content margin-top-20">
    <div class="header-con">
      <h5 class="margin-bottom-5">企业品种关联关系</h5>
    </div>
    <hr>
    </Col>
    <Col span="24" class-name="plant-content search-form margin-top-20">
    <Form :label-width="120">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="品种名称:">
          <Input v-model="breedName" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7" class="">
        <FormItem label="品种关联关系:">
          <Select v-model="breedRelationShip" class="form-select  col-75">
            <Option v-for="item in breedRelationShipList" :value="item.value" :key="item.value">{{item.desc}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <Button type="primary" class="search-btn" @click="search">查询</Button>
        <Button type="primary" class="search-btn" @click="handleReset()">重置</Button>
        </Col>
      </Row>
    </form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="createEnterpriseRelationship">新增</Button>
        </div>
        <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
        </Table>
        <div class="page-con">
          <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
        </div>
      </Row>
    </Col>
    <Col span="24">
      <div class="btn-container" style="text-align:center">
        <Button type="primary" class="search-btn" @click="voidIndex">返回</Button>
      </div>
    </Col>
    <add-breed-relationship-modal :showAddModal="showAddModal" @hide-modal="hideAddModal" @queryList="getData"></add-breed-relationship-modal>
    <check-variety-modal :showCheckModal='showCheckModal' @hide-modal="hideCheckModal" ref="showData"></check-variety-modal>
  </Row>
</template>

<script>
import axios from "axios";
import addBreedRelationshipModal from "./addBreedRelationship.vue";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import oilPage from "../../components/page/page.vue";
import checkVarietyModal from "../varietyManagement/checkVariety.vue";

export default {
  name: "enterpriseRelationship",
  components: {
    addBreedRelationshipModal,
    associateSearch,
    oilPage,
    checkVarietyModal
  },
  data() {
    return {
      enterpriseDetailList: [],
      selectRow: [],
      breedName: "",
      breedRelationShip: -1,
      breedRelationShipList: [],
      showAddModal: false,
      showCheckModal: false,
      url: "/basedata/select/area",
      areaData: "",
      pageSizeOpts: [5,10, 20],
      showSizer: true,
      pageSize: 5,
      pageNum: 1,
      total: 0,
      type: "",
      columns: [
        {
          key: "breedName",
          align: "center",
          title: "品种名称",
          minWidth: 200,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  color: "#145edb",
                  textDecoration: "underline",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.showBreedDetail(params.row.breedId);
                  }
                }
              },
              params.row.breedName
            );
          }
        },
        {
          key: "breedShortName",
          align: "center",
          minWidth: 100,
          title: "缩写"
        },
        {
          key: "breedKeyword",
          align: "center",
          minWidth: 100,
          title: "别名"
        },
        {
          key: "relationTypeName",
          align: "center",
          minWidth: 200,
          title: "企业品种关联关系"
        },
        {
          title: "操作",
          align: "center",
         minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#145edb",
                    marginRight: "8px",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.cancelRelationship(data.row.id);
                    }
                  }
                },
                "取消关联"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  created() {
    //初始化企业基本详情数据
    this.init();
    //企业关联关系
    this.initEnterpeiseRelation();
    //获取企业关联关系列表数据
    this.getData();
  },
  methods: {
    //初始化企业详情
    init() {
      let id = this.$route.query.id;
      var that = this;
      var sourceProductArr = [];
      var params = new URLSearchParams();
      params.append("id", id);
      axios.post("/basedata/enterprise/detail", params).then(function(res) {
        if (res.data.status == 200) {
          that.enterpriseDetailList = res.data.response;
        } else {
          that.$Message.warning(res.data.message);
        }
      });
    },
    //查看品种详情
    showBreedDetail(id) {
      this.$refs.showData.initData(id);
      this.showCheckModal = true;
    },
    //隐藏查看模块
    hideCheckModal() {
      this.showCheckModal = false;
    },
    //新增品种关联关系
    createEnterpriseRelationship() {
      this.showAddModal = true;
    },
    doCancel() {
      this.$Message.info("Clicked cancel");
    },
    //获取企业关联关系的下拉列表
    initEnterpeiseRelation() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_breed_type",
        method: "post",
        data: {}
      }).then(function(resp) {
        let obj = {
          value: -1,
          desc: "全部"
        };
        that.breedRelationShipList.push(obj);
        let list = resp.data.response;
        for (let i = 0; i < list.length; i++) {
          let objList = {};
          objList.value = list[i].value;
          objList.desc = list[i].desc;
          that.breedRelationShipList.push(objList);
        }
      });
        
    },
    //获取品种关联关系列表数据
    getData() {
      let id = this.$route.query.id;
      var that = this;
      var sourceProductArr = [];
      var params = new URLSearchParams();
      params.append("enterpriseId", that.$route.query.id);
      params.append("breedName", that.breedName == undefined ? "" : that.breedName);
      params.append("relationType", that.breedRelationShip == -1 ? "" : that.breedRelationShip);
      params.append("pageNum", that.pageNum);
      params.append("pageSize", that.pageSize);
      axios
        .post("/basedata/enterprise/relevance_breed_list", params)
        .then(function(res) {
          if (res.data.status == 200) {
            that.tableData = res.data.response.list;
            that.total = res.data.response.total;
          } else {
            that.$Message.warning(res.data.message);
          }
        });
    },
    // 隐藏新增弹窗
    hideAddModal() {
      this.showAddModal = false;
      this.getData();
    },
    //页数
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
      this.pageSize = 5;
      this.getData();
    },
    //返回首页
    voidIndex() {
      this.$router.push({
        path: "/enterpriseList"
      });
    },
    //重置
    handleReset() {
      this.breedName = "";
      this.breedRelationShip = -1;
    },
    //是否取消关联关系
    cancelRelationship(id) {
      let that = this;
      this.$Modal.confirm({
        title: "提示信息",
        content: "是否确认要取消品种关联?",
        onOk: () => {
          var params = new URLSearchParams();
          params.append("id", id);
          axios
            .post("/basedata/enterprise/delete_relevance_breed", params)
            .then(function(res) {
              if (res.data.status == 200) {
                that.$Message.info({
                  content: "取消成功",
                  duration: 3
                });
                that.search();
              } else {
                that.$Message.warning(res.data.message);
              }
            });
        },
        onCancel: () => {
          this.$Message.info("取消操作");
        }
      });
    }
  },
  watch: {
    showAddModal(newVal, oldVal) {
      this.showModal = newVal;
    }
  }
};
</script>
