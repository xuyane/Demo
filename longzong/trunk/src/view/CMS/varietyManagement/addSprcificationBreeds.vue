<template>
  <Modal v-model="showModal" title="关联品种" @on-cancel="doCancel" width="750">
    <Form ref="editModal" :model="form" :rules="editRules" :label-width="100" class="addform">
      <FormItem label="品种名称：">
        <span>{{form.breedName}}</span>
      </FormItem>
      <FormItem label="关联品种：">
      </FormItem>
      <FormItem label="规格参数">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
              <associate-Search @query-list="specFunction" :dataUrl="specNameUrl" ref="upperBreedDataRef" class="form-select" @on-change="handleChange"></associate-Search>
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
             <associate-Search @query-list="standardFunction" :dataUrl="standardUrl" ref="breedDataRef" class="form-select" @on-change="handleChange"></associate-Search>
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
            <associate-Search @query-list="purposeFunction" :dataUrl="purposeUrl" ref="breedDataRef" class="form-select" @on-change="handleChange"></associate-Search>
            </Col>
          </Row>
          </Col>        
        </Row>
      </FormItem>
      <FormItem label="形态">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
            <associate-Search @query-list="shapeFunction" :dataUrl="url" ref="breedDataRef" class="form-select" @on-change="handleChange"></associate-Search>
            </Col>
          </Row>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="技术指标">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
            <associate-Search @query-list="technologyFunction" :dataUrl="technologyUrl" ref="breedDataRef" class="form-select" @on-change="handleChange"></associate-Search>
            </Col>
          </Row>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <div slot="footer">
      <i-button :loading="loading" type="primary" @click="handleAddSubmit">确定</i-button>
      <i-button @click="doCancel">取消</i-button>
    </div>
  </Modal>
</template>
<script>
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import axios from "axios";
export default {
  name: "linkvarietyModal",
  props: {
    showLinkModal: Boolean
  },
  components: {
    associateSearch
  },
  data() {
    return {
      editRules: {},
      showModal: false,
      loading: false,
      
      url: "/basedata/select/breed",
      specData: "", 
      standardData: "", 
      purposeData: "" ,
      technologyData:""
    };
  },
  methods: {
    //初始化数据
    initData(id) {
      var that = this;
      var params = new URLSearchParams();
      params.append("breedId", id);
      axios
        .post("/basedata/breed/relation_detail", params)
        .then(function(res) {
          if (res.data.status == 200) {
            that.form.breedName = res.data.response.name;
            that.form.breedId = id;
            that.upperBreedList = res.data.response.upperBreedList;
            that.lowerBreedList = res.data.response.lowerBreedList;
            that.relevantBreedList = res.data.response.relevantBreedList;
          } else {
            that.$Message.warning(res.data.message);
          }
        });
    },
    //保存功能
    handleAddSubmit() {
      var that = this;
      this.loading = true;
      that.form.upperBreedList = this.upperBreedList;
      that.form.lowerBreedList = this.lowerBreedList;
      that.form.relevantBreedList = this.relevantBreedList;
      axios({
        url: "/basedata/breed/relation_add",
        method: "post",
        data: that.form
      }).then(function(resp) {
        if (resp.data.status == 200) {
          that.$Message.success("修改成功");
          that.loading = false;
          that.$emit("hide-modal");
        } else {
          that.$Message.error(resp.data.message);
        }
      });
    },
    doEdit() {
      let _this = this;
      _this.loading = false;
      _this.$emit("hide-modal");
    },
    doCancel() {
      this.$emit("hide-modal");
      
    },
    //获取子组件联想查询的数据
    specFunction(specData) {
      this.specData = specData
    },
    standardFunction(standardData) {
      this.standardData = standardData
    },
    purposeFunction(purposeData) {
      this.purposeData = purposeData;
    },
    technologyFunction(technologyData) {
      this.technologyData = technologyData
    },
    
    // 监听选中项发生变化
    handleChange(newTargetKeys) {
      console.log("newTargetKeys", newTargetKeys);
      this.upperBreedList = newTargetKeys;
    }
  },
  watch: {
    showLinkModal(newVal, oldVal) {
      this.showModal = newVal;
    }
  }
};
</script>
