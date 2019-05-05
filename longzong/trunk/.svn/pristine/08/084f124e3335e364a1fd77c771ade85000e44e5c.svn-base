<template>
  <Modal v-model="showModal" title="查看品种"  @on-cancel="doCancel" width="900">
    <Form ref="editModal" :model="form" :label-width="100">
      <Row>
        <Col span="19">
        <FormItem label="品种类别：">
          <Col v-for="(item,index) in breedParamsList" :key="index">
          <div>{{item.breedTypeRoadName}}</div>
          </Col>
        </FormItem>
        </Col>
        <Col span="5" style="position: absolute;bottom: 30px; right: 0" v-show="breedParamsList.length > 3">
        <div @click="changeShow" class="zkbox">{{spreadText}}
          <i :class="iconclass"></i>
        </div>
        </Col>
      </Row>
      <FormItem label="品种名称：">
        <span>{{form.name}}</span>
      </FormItem>
      <Row>
        <Col span="12">
        <FormItem label="全拼：">
          <span>{{form.nameQp}}</span>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="简拼：">
          <span>{{form.nameJp}}</span>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <FormItem label="英文名：">
          <span>{{form.nameEn}}</span>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="日文名：">
          <span>{{form.nameJa}}</span>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <FormItem label="缩写：">
          <span>{{form.shortName}}</span>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="缩写英文：">
          <span>{{form.shortNameEn}}</span>
        </FormItem>
        </Col>
      </Row>
      <FormItem label="缩写日文：">
        <span>{{form.shortNameJa}}</span>
      </FormItem>
      <FormItem label="别名：">
        <span>{{form.keyword}}</span>
      </FormItem>
      <FormItem label="上游品种：">
          <div v-for='(item, index) in  upperBreedList' :key='index' class="selectvwrap">
            <span>{{item.breedName}}</span>
          </div>
      </FormItem>
      <FormItem label="下游品种：">
         <div v-for='(item, index) in  lowerBreedList' :key='index' class="selectvwrap">
            <span>{{item.breedName}}</span>           
          </div>
      </FormItem>
      <FormItem label="相关品种：">
          <div v-for='(item, index) in  relevantBreedList' :key='index' class="selectvwrap">
            <span>{{item.breedName}}</span>           
          </div>
      </FormItem>
      <FormItem label="规格参数：">
        <Table class="tableCommon" :columns="columns" :data="dataTable"></Table>
      </FormItem>
      <FormItem label="描述：">
        <span>{{form.description}}</span>
      </FormItem>
    </Form>
    <div slot="footer">
      <i-button  class="search-btn" type="primary" @click="doCancel">返回</i-button>
    </div>
  </Modal>
</template>
<script>
import axios from "axios";
export default {
  name: "checkvarietyModal",
  props: {
    showCheckModal: Boolean
  },
  data() {
    return {
      breedParamsList: [],
      dataTable: [],
      iconclass: "icon-zhankai icon-1 icon",
      spreadText: "展开",
      columns: [
        {
          title: "规格型号",
          key: "specName"
        },
        {
          title: "标准",
          key: "standardName"
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
          key: "description"
        }
      ],
      upperBreedList: [], //上游品种列表
      lowerBreedList: [], //下游品种列表
      relevantBreedList: [], //关联品种列表
      showModal: false,
      isShowPhone: false,
      isChangeOk: false,
      form: {}
    };
  },
  methods: {
    //初始化数据
    initData(id) {
      var that = this;
      var params = new URLSearchParams();
      params.append("breedId", id);
      axios
        .post("/basedata/breed/detail", params)
        .then(function(res) {
          if (res.data.status == 200) {
            that.form = res.data.response;
            that.breedParamsList = res.data.response.breedTypeList;
            that.upperBreedList = res.data.response.upperBreedList;
            that.lowerBreedList = res.data.response.lowerBreedList;
            that.relevantBreedList = res.data.response.relevantBreedList;
          } else {
            that.$Message.warning(res.data.message);
          }
        });
      axios
        .post("/basedata/breed/params_detail", params)
        .then(function(res) {
          if (res.data.status == 200) {
            that.dataTable = res.data.response;
          } else {
            that.$Message.warning(res.data.message);
          }
        });
    },
    //返回按钮
    doCancel() {
      this.$emit("hide-modal");
    },
    //展开还是收起
    changeShow() {
      if (this.spreadText == "展开") {
        this.spreadText = "收起";
        this.iconclass = "icon-shousuo  icon-1 icon";
        this.varietycategory = this.form.varietycategory;
      } else {
        this.spreadText = "展开";
        this.iconclass = "icon-zhankai icon-1 icon";
        this.varietycategory = this.form.varietycategory.slice(0, 3);
      }
    }
  },
  watch: {
    showCheckModal(newVal, oldVal) {
      this.showModal = newVal;
    }
  }
};
</script>
