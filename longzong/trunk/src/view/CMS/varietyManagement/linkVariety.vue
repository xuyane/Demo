<template>
  <Modal v-model="showModal" title="关联品种" @on-cancel="doCancel" width="750">
    <Form ref="editModal" :model="form" :rules="editRules" :label-width="100" class="addform">
      <FormItem label="品种名称：">
        <span>{{form.breedName}}</span>
      </FormItem>
      <FormItem label="关联品种：">
      </FormItem>
      <FormItem label="上游品种">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
            <associate-Search @query-list="breedFunction1" :dataUrl="url" :breedData="breedData" ref="upperBreedDataRef" class="form-select" @on-change="handleChange"></associate-Search>
            </Col>
          </Row>
          </Col>
          <Col class="hadwrap">
          <div v-for='(item, index) in  upperBreedList' :key='item.breedId' class="selectvwrap">
            <span>{{item.breedName}}</span>
            <!-- <Icon type="ios-close-outline" size='16' color='red' @click="removeselect1(index)" /> -->
            <b class="icon-delete" @click="removeselect1(index)"></b>
          </div>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="下游品种">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
            <associate-Search @query-list="breedFunction2" :dataUrl="url" :breedData="breedData" ref="floorBreedDataRef" class="form-select" @on-change="handleChange"></associate-Search>
            </Col>
          </Row>
          </Col>
          <Col class="hadwrap">
          <div v-for='(item, index) in  lowerBreedList' :key='item.breedId' class="selectvwrap">
            <span>{{item.breedName}}</span>
            <!-- <Icon type="ios-close-outline" size='16' color='red' @click="removeselect2(index)" /> -->
            <b class="icon-delete" @click="removeselect2(index)"></b>
          </div>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="相关品种">
        <Row>
          <Col>
          <Row>
            <Col span="24" style='margin-right:20px;'>
            <associate-Search @query-list="breedFunction3" :dataUrl="url" :breedData="breedData" ref="breedDataRef" class="form-select" @on-change="handleChange"></associate-Search>
            </Col>
          </Row>
          </Col>
          <Col class="hadwrap">
          <div v-for='(item, index) in  relevantBreedList' :key='item.breedId' class="selectvwrap">
            <span>{{item.breedName}}</span>
            <!-- <Icon type="ios-close-outline" size='16' color='red' @click="removeselect3(index)" /> -->
            <b class="icon-delete" @click="removeselect3(index)"></b>
          </div>
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
import associateSearch from "../../components/associateSearch/associateSearchBreed.vue";
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
      form: {
        breedId: "",
        breedName: "",
        upperBreedList: [], //上游品种列表
        lowerBreedList: [], //下游品种列表
        relevantBreedList: [] //关联品种列表
      },
      url: "/basedata/select/breed_not_repate",
      breedData: null,
      upperBreedList: [], //上游品种列表
      lowerBreedList: [], //下游品种列表
      relevantBreedList: [] //关联品种列表
    };
  },
  methods: {
    //初始化数据
    initData(id) {
      var that = this;
      var params = new URLSearchParams();
      params.append("breedId", id);
      axios.post("/basedata/breed/relation_detail", params).then(function(res) {
        if (res.data.status == 200) {
          that.form.breedName = res.data.response.name;
          that.form.breedId = id;
          that.breedData = id;
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
      this.form.upperBreedList = [];
      this.form.lowerBreedList = [];
      this.form.relevantBreedList = [];
    },
    //获取子组件联想查询的数据
    breedFunction1(breedData) {
      let breed = {};
      if (breedData) {
        breed.breedId = breedData.value;
        breed.breedName = breedData.label;
        if (this.upperBreedList == null) {
          this.upperBreedList = [];
        }
        if (this.isRepeatBreed(breed.breedId, 1)) {
          this.upperBreedList.push(breed);
          this.$refs.upperBreedDataRef.queryChange();
        }
      }
    },
    breedFunction2(breedData) {
      let breed = {};
      if (breedData) {
        breed.breedId = breedData.value;
        breed.breedName = breedData.label;
        if (this.lowerBreedList == null) {
          this.lowerBreedList = [];
        }
        if (this.isRepeatBreed(breed.breedId, 2)) {
          this.lowerBreedList.push(breed);
          this.$refs.floorBreedDataRef.queryChange();
        }
      }
    },
    breedFunction3(breedData) {
      let breed = {};
      if (breedData) {
        breed.breedId = breedData.value;
        breed.breedName = breedData.label;
        if (this.relevantBreedList == null) {
          this.relevantBreedList = [];
        }
        if (this.isRepeatBreed(breed.breedId, 3)) {
          this.relevantBreedList.push(breed);
          this.$refs.breedDataRef.queryChange();
        }
      }
    },
    //删除关联品种
    removeselect1(index) {
      this.upperBreedList.splice(index, 1);
    },
    removeselect2(index) {
      this.lowerBreedList.splice(index, 1);
    },
    removeselect3(index) {
      this.relevantBreedList.splice(index, 1);
    },
    //判断品种是否重复
    isRepeatBreed(value, n) {
      var items = [];
      if (n == 1) {
        items = this.upperBreedList;
      }
      if (n == 2) {
        items = this.lowerBreedList;
      }
      if (n == 3) {
        items = this.relevantBreedList;
      }
      if (items.length > 0) {
        let breedArr = [];
        for (let j = 0; j < items.length; j++) {
          breedArr.push(items[j].breedId);
        }
        if (breedArr.indexOf(value) == -1) {
          return true;
        }
      } else {
        return true;
      }
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
