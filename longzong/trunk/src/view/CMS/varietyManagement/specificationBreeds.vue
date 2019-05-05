<style lang="less" scoped>
.ivu-modal-body {
  width: 100%;
  margin: auto;
}
</style>

<template>
  <Col>
  <Modal v-model="showModal" title="规格参数" @on-cancel="doCancel" width="915">
    <div>
      <FormItem label="品种名称:">
        <span>{{breedName}}</span>
      </FormItem>
    </div>
    <div class="btn-container">
      <Button type="primary" class="search-btn" style="margin-bottom:20px" @click="addSpecification">新增</Button>
      <Table class="tableCommon" border :columns="columns" :data="dataTable"></Table>
    </div>
    <div slot="footer">
      <Button style="margin-left:8px;" @click="doCancel">返回</Button>
    </div>
  </Modal>
  <Modal v-model="showSpecModal" title="添加规格参数" @on-cancel="cancel" width="750">
    <Form ref="editModal"   class="addform">
      <FormItem label="规格型号">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
            <associate-Search @query-list="specFunction" :dataUrl="specUrl" ref="specDataRef" class="form-select" @on-change="handleChange"></associate-Search>
            </Col>
          </Row>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="标准">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
            <associate-Search @query-list="standardFunction" :dataUrl="standardUrl" ref="standardDataRef" class="form-select" @on-change="handleChange"></associate-Search>
            </Col>
          </Row>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="用途">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
            <associate-Search @query-list="purposeFunction" :dataUrl="purposeUrl" ref="purposeDataRef" class="form-select" @on-change="handleChange"></associate-Search>
            </Col>
          </Row>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="形态">
        <Row>
          <Col>
          <Row>
            <Select v-model="shape" class="form-select">
              <Option v-for="item in shapeList" :value="item.value" :key="item.value">{{item.desc}}</Option>
            </Select>
          </Row>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="技术指标">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
            <associate-Search @query-list="technologyFunction" :dataUrl="technologyUrl" ref="technologyDataRef" class="form-select" @on-change="handleChange"></associate-Search>
            </Col>
          </Row>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="备注">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
            <Input type="text" v-model="desc" class="search-input"></Input>
            </Col>
          </Row>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <div slot="footer">
      <i-button :loading="loading" type="primary" @click="handleAddSubmit">确定</i-button>
      <i-button @click="cancel">取消</i-button>
    </div>
  </Modal>
  </Col>
</template>
<script>
import axios from "axios";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import {
  saveParamsAdd,
  getBreedShapeSelect
} from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "specificationsModal",
  props: {
    showSpecificationsModal: Boolean
  },
  components: {
    associateSearch
  },
  data() {
    return {
      showModal: false,
      showSpecModal: false,
      specData: "",
      standardData: "",
      purposeData: "",
      technologyData: "",
      showModal: false,
      breedName: "",
      loading: false,
      mainId: 0,
      columns: [
        {
          title: "规格型号",
          key: "specName",
          align: "center"
        },
        {
          title: "标准",
          key: "standardName",
          align: "center",
          loading: true
        },
        {
          title: "用途",
          key: "purposeName"
        },
        {
          title: "形态",
          key: "shapeName"
        },
        {
          title: "技术指标",

          key: "technologyName"
        },
        {
          title: "备注",
          key: "description",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, data) => {
            return h("div", [
              h("i", {
                props: {
                  type: "text",
                  size: "small"
                },
                class: "icon-remove2 icon",
                on: {
                  click: () => {
                    this.deleteData(data.row.id);
                  }
                }
              })
            ]);
          }
        }
      ],
      dataTable: [],
      shapeList: [],
      shape: "",
      loading: false,
      name: "",
      desc: "",
      formData: {},
      specUrl: "/basedata/select/breed_spec",
      standardUrl: "/basedata/select/breed_standard",
      purposeUrl: "/basedata/select/breed_purpose",
      technologyUrl: "/basedata/select/breed_technology"
    };
  },
  created() {
    this.initShapeStatus();
  },
  methods: {
    remoteMethod(query) {
      console.log("query", query);
    },
    //初始化数据
    initData(id) {
      this.mainId = id;
      var that = this;
      var params = new URLSearchParams();
      params.append("breedId", id);
      axios.post("/basedata/breed/params_detail", params).then(function(res) {
        if (res.data.status == 200) {
          that.dataTable = res.data.response;
          that.breedName = res.data.response.breedName;
        } else {
          that.$Message.warning(res.data.message);
        }
      });
    },

    initShapeStatus() {
      var that = this;
      axios({
        url: "/basedata/enum/shape",
        method: "get",
        data: {}
      }).then(function(resp) {
        that.shapeList = resp.data.response;
      });
    },
    //打开品种参数窗口
    addSpecification() {
      this.showSpecModal = true;
    },
    //关闭修改品种参数窗口
    cancel() {
      this.showSpecModal = false;
      that.$refs.specDataRef.model = "";
      that.$refs.standardDataRef.model = "";
      that.$refs.purposeDataRef.model = "";
      that.$refs.technologyDataRef.model = "";
      that.shape = "";
      that.desc = "";
    },

    handleAddSubmit() {
      var that = this;
      this.loading = true;
      let purposeId =
        that.purposeData.value == undefined ? "" : that.purposeData.value;
      let shapeId = that.shape == undefined ? "" : that.shape;
      let specId = that.specData.value == undefined ? "" : that.specData.value;
      let standardId = that.standardData.value == undefined ? "": that.standardData.value;
      let technologyId = that.technologyData.value == undefined ? "": that.technologyData.value;
      let params = {
        breedId: this.mainId,
        description: this.desc,
        purpose: purposeId,
        shape: shapeId,
        spec: specId,
        standard: standardId,
        technology: technologyId
      };
      if (
        purposeId == "" &&
        shapeId == "" &&
        standardId == "" &&
        technologyId == "" &&
        specId == ""
      ) {
        that.showSpecModal = false;
        that.loading = false;
        that.$refs.specDataRef.model = "";
        that.$refs.standardDataRef.model = "";
        that.$refs.purposeDataRef.model = "";
        that.$refs.technologyDataRef.model = "";
        that.shape = "";
        that.desc = "";
        that.initData(that.mainId);
      } else {
        saveParamsAdd(params).then(res => {
          that.$Message.success("新增成功");
          that.showSpecModal = false;
          that.loading = false;
          that.$refs.specDataRef.model = "";
          that.$refs.standardDataRef.model = "";
          that.$refs.purposeDataRef.model = "";
          that.$refs.technologyDataRef.model = "";
          that.shape = "";
          that.desc = "";
          that.initData(that.mainId);
        });
      }
    },
    // 删除一条数据
    deleteData(id) {
      let that = this;
      this.$Modal.confirm({
        title: "提示信息",
        content: "是否确认要删除?",
        onOk: () => {
          var params = new URLSearchParams();
          params.append("id", id);
          axios
            .post("/basedata/breed/params_delete", params)
            .then(function(res) {
              if (res.status === 200) {
                that.$Message.info({
                  content: "删除成功",
                  duration: 3
                });
                that.initData(that.mainId);
              } else {
                that.$Message.warning(res.data.message);
              }
            });
        },
        onCancel: () => {
          this.$Message.info("取消操作");
        }
      });
    },
    doEdit() {},
    doCancel() {
      this.showModal = false;
      this.$emit("hide-modal");
      this.$refs.specDataRef.model = "";
      this.$refs.standardDataRef.model = "";
      this.$refs.purposeDataRef.model = "";
      this.$refs.technologyDataRef.model = "";
      that.shape = "";
      that.desc = "";
    },
    specFunction(specData) {
      this.specData = specData;
    },
    standardFunction(standardData) {
      this.standardData = standardData;
    },
    purposeFunction(purposeData) {
      this.purposeData = purposeData;
    },
    technologyFunction(technologyData) {
      this.technologyData = technologyData;
    },
    // 监听选中项发生变化
    handleChange(newTargetKeys) {
      console.log("newTargetKeys", newTargetKeys);
      this.upperBreedList = newTargetKeys;
    }
  },
  watch: {
    showSpecificationsModal(newVal, oldVal) {
      this.showModal = newVal;
    }
  }
};
</script>
