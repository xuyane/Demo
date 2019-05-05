<style lang="less" scoped>
</style>

<template>
  <Modal v-model="showModal" title="新增品种关联关系" @on-cancel="doCancel" width="750">
    <Form ref="form" :model="form" :rules="addRules" :label-width="200" class="add-modal">
      <FormItem label="品种关联关系:" prop="breedRelation">
        <Select v-model="form.breedRelation" class="form-select">
          <Option v-for="item in breedRelationList" :value="item.value" :key="item.value">{{item.desc}}</Option>
        </Select>
      </FormItem>
      <!-- <FormItem label="品种名称:" prop="breedId">
        <Select v-model="breedId"  filterable @on-change="dataFunction" remote :remote-method="remoteMethod" :loading="loading" labelInValue>
          <Option v-for="(option, index) in itemList" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
      </FormItem> -->
      <FormItem label="品种名称:" prop='breedId'>
        <associate-Search ref="childAddData" @query-list="breedTypeFunction" :dataUrl="url"></associate-Search>
      </FormItem>
    </Form>
    <div slot="footer">
      <i-button class="search-btn" type="primary" @click="doAdd">确定</i-button>
      <i-button class="search-btn" @click="doCancel">取消</i-button>
    </div>
  </Modal>
</template>

<script>
import axios from "axios";
import { checkAddEnterpriseBreed } from "../../components/axios/baseDataManagement.js";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "addBreedRelationshipModal",
  props: {
    showAddModal: Boolean
  },
  components: {
    associateSearch
  },
  data() {
    const validateBreedRelation = (rule, value, callback) => {
      var valueData =
        this.form.breedRelation == undefined ? "" : this.form.breedRelation;
      if (valueData == 0) {
        valueData = 2;
      }

      if (valueData != -1) {
        callback();
      } else {
        callback("请输入品种关联关系");
      }
    };
    const validateBreedName = (rule, value, callback) => {
      var rId = this.form.breedId;
      var mId = this.$route.query.id;
      var breedType = this.form.breedRelation;
      var valueName = "";
      if (rId != undefined) {
        valueName = this.breedName;
      } else {
        valueName = "";
      }
      if (valueName) {
        if (rId) {
          let params = {
            breedType: breedType,
            enterpriseId: mId,
            breedId: rId
          };
          checkAddEnterpriseBreed(formData(params)).then(res => {
            if (res.response) {
              callback();
            } else {
              callback(new Error("品种名称重复"));
              this.loading = false;
            }
          });
        } else {
          callback();
        }
      } else {
        callback("请输入品种名称");
        this.loading = false;
      }
    };
    return {
      addRules: {
        breedRelation: [
          {
            validator: validateBreedRelation,
            required: true,
            trigger: "change"
          }
        ],
        breedId: [
          {
            validator: validateBreedName,
            required: true,
            trigger: "change"
          }
        ]
      },
      valueData: 1,
      itemList: [],
      breedName: "",
      form: {
        breedRelation: 0,
        breedId: null
      },
      showModal: false,
      loading: false,
      breedRelationList: [],
      data: "",
      url: "/basedata/select/breed"
    };
  },
  created() {},
  methods: {
    doAdd() {
      let that = this;
      let enterpriseId = this.$route.query.id;
      let form = {
        enterpriseId: enterpriseId,
        breedId: that.form.breedId,
        relationType: that.form.breedRelation
      };
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!that.loading) {
            that.loading = true;
            axios
              .post("/basedata/enterprise/add_relevance_breed", form)
              .then(function(res) {
                that.showAddModal = false;
                if (res.data.status == 200) {
                  that.$Message.success("新增成功");
                  that.doCancel();
                } else {
                  that.$Message.warning(res.data.message);
                }
                that.loading = false;
              });
          }
        }
      });
    },

    //获取品种名称
    breedTypeFunction(data) {
      if (data) {
        this.form.breedId = data.value;
        this.breedName = data.label;
      }
    },
    doCancel() {
      this.showModal = false;
      this.form.breedRelation = 0;
      this.$refs.childAddData.model = "";
      this.$refs.form.resetFields();
      this.$emit("hide-modal");
    },
    //获取企业关联关系的下拉列表
    initEnterpeiseRelation() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_breed_type",
        method: "post",
        data: {}
      }).then(function(resp) {
        that.breedRelationList = resp.data.response;
      });
    }
  },
  watch: {
    showAddModal(newVal, oldVal) {
      this.showModal = newVal;
      if (newVal == true) {
        //企业关联关系
        this.initEnterpeiseRelation();
      }
    }
  }
};
</script>
