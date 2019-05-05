<style lang="less" scoped>
</style>

<template>
  <Modal v-model="showModal" title="新增企业关联关系" @on-cancel="doCancel" width="750">
    <Form ref="form" :model="form" :rules="addRules" :label-width="200" class="add-modal">
      <FormItem label="企业关联关系:" prop="enterpeiseRelation">
        <Select v-model="form.enterpeiseRelation" class="form-select">
          <Option v-for="item in enterpeiseRelationList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
        </Select>
      </FormItem>
      <!-- <FormItem label="企业名称:" prop="enterpeiseName">
        <Select v-model="enterpeiseName" filterable @on-change="dataFunction" remote :remote-method="remoteMethod" :loading="loading" labelInValue>
          <Option v-for="(option, index) in itemList" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
      </FormItem> -->
      <FormItem label="企业名称:" prop='relationId'>
        <associate-Search ref="childAddData" @query-list="industryTypeFunction" :dataUrl="url"></associate-Search>
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
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import { getEnterprisenameRelationRepeat } from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "addEnterpriseRelationshipModal",
  props: {
    showAddModal: Boolean
  },
  components: {
    associateSearch
  },
  data() {
    const validateEnterpeiseRelation = (rule, value, callback) => {
      var valueData =
        this.form.enterpeiseRelation == undefined
          ? ""
          : this.form.enterpeiseRelation;
      if (valueData == 0) {
        valueData = 2;
      }

      if (valueData != -1) {
        callback();
      } else {
        callback("请输入企业关联关系");
      }
    };
    const validateEnterpeiseName = (rule, value, callback) => {
      var rId = this.form.relationId;
      var mId = this.$route.query.id;
      var valueName = "";
      if (this.form.relationId != undefined) {
        valueName = this.relationName;
      } else {
        valueName = "";
      }
      if (valueName) {
        if (rId) {
          let params = {
            mainId: mId,
            relationId: rId
          };
          getEnterprisenameRelationRepeat(formData(params)).then(res => {
            if (res.response) {
              callback();
            } else {
              callback(new Error("企业名称重复"));
              this.loading = false;
            }
          });
        } else {
          callback();
        }
      } else {
        callback("请输入企业名称");
        this.loading = false;
      }
    };
    return {
      addRules: {
        enterpeiseRelation: [
          {
            validator: validateEnterpeiseRelation,
            required: true,
            trigger: "change"
          }
        ],
        relationId: [
          {
            validator: validateEnterpeiseName,
            required: true,
            trigger: "change"
          }
        ]
      },

      relationName: "",
      itemList: [],
      form: {
        enterpeiseRelation: 1,
        relationId: null
      },
      showModal: false,
      loading: false,
      enterpeiseRelationList: [],
      data: "",
      url: "/basedata/select/enterpeise_name"
    };
  },
  methods: {
    doAdd() {
      let that = this;
      let enterpriseId = this.$route.query.id;
      let form = {
        enterpriseId: enterpriseId,
        relationId: that.form.relationId,
        relationType: that.form.enterpeiseRelation
      };
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!that.loading) {
            that.loading = true;
            axios
              .post("/basedata/enterprise/add_relevance_enterprise", form)
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

    doCancel() {
      this.showModal = false;
      this.form.enterpeiseRelation = 1;
      this.$refs.childAddData.model = "";
      this.$refs.form.resetFields();
      this.$emit("hide-modal");
    },
    //获取企业名称
    industryTypeFunction(data) {
      if (data) {
        this.form.relationId = data.value;
        this.relationName = data.label;
      }
    },
    //获取企业关联关系的下拉列表
    initEnterpeiseRelation() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_relation",
        method: "post",
        data: {}
      }).then(function(resp) {
        that.enterpeiseRelationList = resp.data.response;
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
