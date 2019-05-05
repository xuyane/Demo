<style lang="less" scoped>
.margin-top-20 {
  margin-top: 20px;
}
.margin-15 {
  margin-top: 15px;
  margin-bottom: 15px;
}
.plant-content {
  background: #fff;
  padding: 0 20px;
}
.character {
  font-size: 20px;
  font-weight: 400;
}
</style>
<template>
  <Row>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：
       <router-link to="/plantIndex" class="link-css">网站管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/websiteManagementTemplate" class="link-css">网站模板管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
       <router-link to="/websiteManagementTemplate" class="link-css">网站模板列表</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
          <a @click="goto" class="link-css"> 修改</a>
       
      </Row>
    </i-col>
    <Col
      span="24"
      class="plant-content"
    >
    <Row>
      <Col
        span="24"
        class="margin-top-20"
      >
      <div class="header-con">
        <span class="character">修改网站模板</span>
      </div>
      <hr class="margin-15">
      </Col>
    </Row>
    <Row>
      <Form
        ref="editFormValidate"
        :model="editForm"
        :rules="addruleValidate1"
        class="search-form"
      >
        <FormItem
          label="网站模板分类 ："
          :label-width="130"
          prop='industryTypeId'
          style="width:500px;"
        >
          <!-- <associate-Search @query-list="templateTypeFunction" :dataValue="templateTypeValue" :dataUrl="url" ref="childData"></associate-Search> -->
          <Input
            type="text"
            disabled
            class="search-input"
            v-model="editForm.templateTypeName"
          />
        </FormItem>
        <FormItem
          label="网站模板名称 ："
          :label-width="130"
          prop="templateName"
          style="width:500px;"
        >
          <Input
            type="text"
            class="search-input"
            v-model="editForm.templateName"
            placeholder="请输入模板名称"
          />
        </FormItem>
        <FormItem
          label="网站文件名称 ："
          :label-width="130"
          prop='templateFileName'
          style="width:500px;"
        >
          <Input
            type="text"
            class="search-input"
            v-model="editForm.templateFileName"
            placeholder="请输入文件名称"
          />
        </FormItem>
        <FormItem
          label="模板内容 : "
          :label-width="130"
          prop="templateContent"
        >
          <Input
            type="textarea"
            v-model="editForm.templateContent"
            :rows="12"
            placeholder="请输入模板内容"
          />
        </FormItem>
        <div style="background-color:#fff;text-align:center;">
          <i-button
            type="primary"
            @click="editSiteFun('editFormValidate')"
          >保存</i-button>
          <i-button @click="backtoMainpage">取消</i-button>
        </div>
      </Form>
    </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import associateSearch from "../../components/associateSearch/associateSearchColl.vue";
import {
  websiteTemplateEdit,
  websiteTemplateSelect,
  websiteTemplateEditPage,
  websitetTemplateEditUniqueness
} from "../../components/axios/website.js";
import { formatTime2, formData } from "../../../assets/js/common.js";
export default {
  name: "editWebsiteTemplate",
  components: {
    associateSearch
  },
  data() {
    const validatePassTemplateType = (rule, value, callback) => {
      console.log(this);
      var templateTypeId = this.templateTypeValue;
      if (!templateTypeId) {
        callback("网站模板分类为空或数据不匹配");
      } else {
        callback();
      }
    };
    const validateEdit = (rule, value, callback) => {
      let params = {
        id: this.editForm.id,
        templateName: this.editForm.templateName,
        templateTtypeId: this.templateTypeId
      };
      if (this.editForm.templateName == "") {
        callback(new Error("请输入网站模板名称"));
      }
      websitetTemplateEditUniqueness(formData(params)).then(res => {
        console.log("res", res);
        if (res.response) {
          callback();
        } else {
          callback(new Error("网站模板名称重复"));
        }
      });
    };
    return {
      loading: false,
      selectName: "",
      addclassfy: [],
      templateTypeData: "",
      templateTypeValue: "",
      templateTypeName: "",
      submitEdit: true,
      url: "/website/templatetype/templatetype_select",
      editForm: {
        id: "",
        templateName: "",
        templateFileName: "",
        templateContent: ""
      },
      addruleValidate1: {
        industryTypeId: [
          {
            required: true,
            validator: validatePassTemplateType,
            trigger: "blur"
          }
        ],
        templateName: [
          { required: true, validator: validateEdit, trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "网站模板名称不能超过100个字符",
            trigger: "change"
          }
        ],
        templateFileName: [
          {
            required: true,
            type: "string",
            message: "请选择网站文件名",
            trigger: "blur"
          },
          {
            type: "string",
            max: 50,
            message: "网站文件名不能超过50个字符",
            trigger: "change"
          }
        ],
        templateContent: [
          { required: true, message: "模板内容不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    goto() {
      window.reload();
    },
    getParams(id) {
      let that = this;
      let params = {
        templateId: id
      };
      websiteTemplateEditPage(formData(params)).then(res => {
        that.editForm = res.response;
        that.templateTypeValue = res.response.templateTypeId;
        let templateTypeName = res.response.templateTypeName;
        if (templateTypeName) {
          that.$refs.childData.getData(
            templateTypeName,
            that.templateTypeValue
          );
        }
      });
    },
    //修改模板分类的时候重新校验模板名称是否重复
    templateTypeChange1() {
      if (this.editForm.templateName) {
        this.$refs["editFormValidate"].validateField("templateName");
      }
    },

    //编辑-确认
    editSiteFun(name) {
      let that = this;
      this.editForm.templateTypeId = that.templateTypeValue;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.submitEdit) {
            this.submitEdit = false;
            websiteTemplateEdit(that.editForm).then(res => {
              if (res.status == 200) {
                this.$Message.success("编辑成功！");
                that.$router.push({
                  name: "websiteManagementTemplate",
                  query: {
                    code: that.$route.query.treeCode,
                    isExpand: this.$route.query.expand
                  }
                });
              } else {
                this.$Message.error(res.message);
              }
              setTimeout(() => {
                this.submitEdit = false;
              }, 1000);
            });
          }
        }
      });
    },
    //网站模板分类模糊搜索
    templateTypeFunction(templateTypeData) {
      this.templateTypeValue = templateTypeData.value;
      this.templateTypeName = templateTypeData.label;
    },
    //取消
    backtoMainpage() {
      this.$router.push({
        name: "websiteManagementTemplate",
        query: {
          code: this.$route.query.treeCode,
          isExpand: this.$route.query.expand
        }
      });
    }
  },
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.getParams(id);
    }
  }
};
</script>

