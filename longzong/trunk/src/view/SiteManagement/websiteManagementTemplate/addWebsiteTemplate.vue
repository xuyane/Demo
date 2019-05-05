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
        <a @click="goto" class="link-css">新增</a>
       
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
        <span class="character">新增网站模板</span>
      </div>
      <hr class="margin-15">
      </Col>
    </Row>
    <Row>
      <Form
        ref="addFormValidate"
        :rules="addruleValidate"
        :model="addForm"
        class="search-form"
      >
        <FormItem
          label="网站模板分类："
          :label-width="130"
          prop="templateTypeId"
          style="width:500px;"
        >
          <Input
            type="text"
            disabled
            class="search-input"
            v-model="addForm.templateTypeName"
          />
        </FormItem>
        <FormItem
          label="网站模板名称："
          :label-width="130"
          prop='templateName'
          style="width:500px;"
        >
          <Input
            type="text"
            class="search-input"
            v-model="addForm.templateName"
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
            v-model="addForm.templateFileName"
            placeholder="请输入文件名称"
          />
        </FormItem>
        <FormItem
          label="模板内容 ： "
          :label-width="130"
          prop="templateContent"
        >
          <Input
            type="textarea"
            v-model="addForm.templateContent"
            :rows="12"
            placeholder="请输入模板内容"
          />
        </FormItem>
        <div style="background-color:#fff;text-align:center;">
          <i-button
            type="primary"
            @click="addSubmitBtn('addFormValidate')"
          >保存</i-button>
          <i-button @click="backtoMainpage">取消</i-button>
        </div>
      </Form>
    </Row>
    </Col>
  </Row>
</template>
<script>
import {
  websiteTemplateAdd,
  websiteTemplateSelect,
  websiteTypePathByCode,
  websitetTemplateAddUniqueness
} from "../../components/axios/website.js";
import { formatTime2, formData } from "../../../assets/js/common.js";
import UE from "../../CMS/components/defaultMsg/defaultMsg.vue";
import { deleteVersion } from "../../components/axios/productCenter.js";
export default {
  name: "addWebsiteTemplate",
  components: {
    UE
  },
  data() {
    const validateadd = (rule, value, callback) => {
      let params = {
        templateName: this.addForm.templateName,
        templateTtypeId: this.addForm.templateTypeId
      };
      if (this.addForm.templateName == "") {
        callback(new Error("请输入网站模板名称"));
      } else {
        websitetTemplateAddUniqueness(formData(params)).then(res => {
          console.log("res", res);
          if (res.response) {
            callback();
          } else {
            callback(new Error("网站模板名称重复"));
          }
        });
      }
    };
    return {
      loading: false,
      selectName: "",
      addclassfy: "",
      submitAdd: true,
      addForm: {
        templateTypeName: "",
        templateName: "",
        templateFileName: "",
        templateTypeId: "",
        templateContent: ""
      },
      addruleValidate: {
        templateName: [
          { required: true, validator: validateadd, trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "网站模板名称不能超过100个字符",
            trigger: "change"
          }
        ],
        templateFileName: [
          { required: true, message: "请选择网站文件名", trigger: "change" },
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
  created() {
    let code = this.$route.query.treeCode;
    var that = this;
    if (code) {
      let params = {
        code: code
      };
      websiteTypePathByCode(formData(params)).then(res => {
        if (res.response) {
          that.addForm.templateTypeName = res.response.pathName;
          that.addForm.templateTypeId = res.response.id;
        } else {
          this.$Message.error(res.message);
        }
      });
    } else {
      that.addForm.templateTypeName = "";
    }
  },
  methods: {
    goto() {
      window.reload();
    },
    //选择了模板分类之后再验证一遍模板名称
    templateTypeChange() {
      if (this.addForm.templateName) {
        this.$refs["addFormValidate"].validateField("templateName");
      }
    },
    //下拉选择网站模板分类
    searchclassfylist(query) {
      if (query !== "") {
        this.selectName = query;
        this.loading = false;
        setTimeout(() => {
          this.loading = false;
          websiteTemplateSelect(
            formData({
              name: this.selectName
            })
          ).then(res => {
            this.addclassfy = res.response;
            //console.log(res)
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    //新增网站模板弹窗-确定
    addSubmitBtn(name) {
      let that = this;
      that.$refs[name].validate(valid => {
        if (valid) {
          if (that.submitAdd) {
            that.submitAdd = false;
            websiteTemplateAdd(this.addForm).then(res => {
              if (res.status == 200) {
                this.$Message.success("添加成功！");
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
                this.submitAdd = false;
              }, 1000);
            });
          }
        }
      });
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
  }
};
</script>
