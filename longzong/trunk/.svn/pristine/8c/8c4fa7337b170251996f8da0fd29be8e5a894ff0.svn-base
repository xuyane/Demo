<style lang="less" scoped>
.ivu-select-selection {
  z-index: 1000000;
}
.editor-container {
  z-index: -100000;
}
.zanshi {
  position: relative;
}
.moban {
  position: relative;
}
</style>

<template>
  <Row class="editCss">
    <Row>
      <i-col span="24">
        <Row class-name="current-position">
          当前位置：
          <router-link to="/systemIndex" class="link-css">基础数据管理</router-link> 
          &nbsp;&nbsp;>>&nbsp;&nbsp;
           <router-link to="/informationSort" class="link-css"> 信息分类管理 </router-link> 
          &nbsp;&nbsp;>>&nbsp;&nbsp; 
         <router-link to="/TemplateManagement" class="link-css"> 模板管理</router-link>        
          &nbsp;&nbsp;>>&nbsp;&nbsp; 
          <!-- 模板编辑 -->
          <a @click="goto" class="link-css">模板编辑</a>
        </Row>
      </i-col>
    </Row>
    <Row style="padding-top:20px;background:#fff">
      <Col span='20'>
      <Form
        ref="formCustom"
        :model="addform"
        :rules="ruleCustom"
        :label-width="120"
      >
        <FormItem
          label="模板分类:"
          prop='templateType'
          class="moban"
        >
          <Select
            v-model="addform.templateTypeId"
            filterable
            remote
            :remote-method="infoType"
            label-in-value
            @on-change="infoTypeChange"
            :loading="loading"
            disabled
          >
            <Option
              v-for="(option, index) in optionsType"
              :value="option.value"
              :key="index"
            >{{option.label}}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="模板名称:"
          prop='name'
        >
          <Input
            v-model="addform.name"
            placeholder="请输入模板名称"
            :maxlength="100"
          ></Input>
        </FormItem>
        <FormItem
          label="展示方式:"
          class="zanshi"
        >
          <Select
            v-model="addform.displayType"
            class="search-input"
            placeholder=""
          >
            <Option
              v-for="item in stautsList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="模板内容:"
          prop='addName'
        >
          <!-- <div class="editor-container">
            <UE
              :defaultMsg=defaultMsg
              :config=config
              ref="ue"
            ></UE>
          </div> -->
          <Input v-model="addform.content" type="textarea" :rows="20" placeholder="请输入模板内容" />
        </FormItem>
        <FormItem>
          <i-button
            :loading="searchloading"
            class="search-btn"
            type="primary"
            @click="confirmAddModal('formCustom')"
          >确定</i-button>
          <i-button
            class="search-btn"
            @click="cancelAddModal"
          >取消</i-button>
        </FormItem>
      </Form>
      </Col>
    </Row>
  </Row>
</template>
<script>
import axios from "axios";
import UE from "../../../CMS/components/defaultMsg/editdefaultMsg.vue";
import {
  TemplateType,
  editInformationTemplate,
  SaveEditInformationTemplate,
  editCheckUniquenessT
} from "../api/unitManageMent.js";
import { formData } from "../../../../assets/js/common.js";
export default {
  components: {
    UE,
    TemplateType
  },
  props: {
    showEditModal: Boolean,
    editData: Object
  },
  data() {
    //自定义验证
    const validateName = (rule, value, callback) => {
      if (this.addform.name == "") {
        callback(new Error("模板名称不能为空"));
      }
      let that = this;

      let form1 = {
        name: this.addform.name,
        id: this.addform.id,
        templateTypeId: this.addform.templateTypeId
      };
      editCheckUniquenessT(formData(form1)).then(res => {
        if (res.response) {
          callback();
        } else {
          callback(new Error("模板名称已存在"));
        }
      });
    };
    const validateType = (rule, value, callback) => {
      if (this.addform.templateTypeId == "") {
        callback(new Error("模板名称不能为空"));
      } else {
        callback();
      }
    };
    const validateContent = (rule, value, callback) => {
      if (this.addform.content == "") {
        callback(new Error("模板内容不能为空"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      optionsType: [],
      searchloading: false,
      showModal: false,
      defaultMsg: "请输入模板内容",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      addform: {
        id: 0,
        name: "",
        displayType: 0,
        enterpriseId: "",
        templateTypeId: 0
      },
      ruleCustom: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        templateType: [
          { required: true, validator: validateType, trigger: "blur" }
        ],
        addName: [
          { required: true, validator: validateContent, trigger: "blur" }
        ]
      },
      stautsList: [
        {
          value: 0,
          label: "表单"
        },
        {
          value: 1,
          label: "文章"
        },
        {
          value: 2,
          label: "短信"
        },
        {
          value: 3,
          label: "短讯"
        }
      ]
    };
  },
  created() {
    this.getEditPage();
  },
  methods: {
    goto(){
     window.reload()
    },
    cancelAddModal() {
      this.showModal = false;
      this.$emit("hide-modal");
      this.$router.push({
                name: "TemplateManagement",
                query: { treeNode: this.$route.query.treeCode,dataparams:this.$route.query.dataparams }
              });
    },
    //获取模板分类列表
    infoType(query) {
      if (query !== "") {
        this.loading1 = true;
        let params = {
          name: query
        };
        setTimeout(() => {
          this.loading1 = false;
          TemplateType(formData(params)).then(res => {
            // console.log(res);
            const list1 = res.response.map(item => {
              return {
                value: item.id,
                label: item.pathName
              };
            });
            this.optionsType = list1;
          });
        }, 100);
      } else {
        this.optionsType = [];
      }
    },
    infoTypeChange(data) {
      // console.log(data);
      this.addform.enterpriseId = data.value;
    },
    //查询所要编辑模板的信息
    getEditPage() {
      let that = this;
      let form = {
        informationTemplateId: this.$route.query.informationTemplateId
      };
      console.log(form);
      editInformationTemplate(formData(form)).then(res => {
        console.log(res.response);
        this.addform.name = res.response.name;
        this.addform.templateTypeId = res.response.templateTypeId;
        this.addform.displayType = res.response.displayType;
        // this.defaultMsg = res.response.content;
        this.addform.content = res.response.content;
        this.addform.id = res.response.id;
        let formlist = {
          name: res.response.informationTemplateTypePath
        };
        TemplateType(formData(formlist)).then(res => {
          // console.log(res);
          const list1 = res.response.map(item => {
            return {
              value: item.id,
              label: item.pathName
            };
          });
          this.optionsType = list1;
        });
        console.log("addform", that.addform);
      });
    },
    //保存所要编辑信息模板信息
    confirmAddModal(name) {
      let that = this;
      console.log("add", this.addform);
      let form = {
        // content: this.$refs.ue.getUEContent(),
        content: this.addform.content,
        displayType: this.addform.displayType, //展示方式
        name: this.addform.name,
        id: this.addform.id,
        templateTypeId: this.addform.templateTypeId
      };
      this.$refs[name].validate(valid => {
        if (valid) {
          SaveEditInformationTemplate(form).then(res2 => {
            console.log(res2);
            if (res2.status == "200") {
              that.$Message.success("更新成功");
              that.$router.push({
                name: "TemplateManagement",
                query: { treeNode: that.$route.query.treeCode ,dataparams:that.$route.query.dataparams}
              });
            }
          });
        }
      });
    }
  },
  watch: {
    showEditModal(newVal, oldVal) {
      this.showModal = newVal;
    },
    editData(newVal, oldVal) {
      this.editData = newVal;
      console.log("接受所要编辑的内容", this.editData);

      console.log(this.defaultMsg);
    }
  }
};
</script>

