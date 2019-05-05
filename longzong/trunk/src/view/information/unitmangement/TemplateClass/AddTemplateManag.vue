<style lang="less" scoped>
.ivu-select-dropdown {
  z-index: 1000000000 !important;
}

.editor-container {
  z-index: 10 !important;
}

.zanshi {
  position: relative;
}

.moban {
  position: relative;
}

#edui1 {
  z-index: 10 !important;
}

// .ivu-modal-wrap{
//    z-index: 1 !important;
// }
</style>

<template>
  <Row class="editCss" style="height:900px">
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：
        <router-link to="/systemIndex" class="link-css">基础数据管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/informationSort" class="link-css"> 信息分类管理 </router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/TemplateManagement" class="link-css"> 模板管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp; 
        <!-- 新增模板 -->
          <a @click="goto" class="link-css">新增模板</a>
        
      </Row>
    </i-col>
    <Col span='24' class='ivu-card' style="padding-top:20px">
    <Row>
      <Col span='20'>
      <Form ref="formCustom" :model="addform" :rules="ruleCustom" :label-width="120">
        <FormItem label="模板分类:" prop='templateType' class="moban">
          <!-- <Select
              v-model="addform.templateTypeId"
              filterable
              remote
              :remote-method="infoType"
              label-in-value
              @on-change="infoTypeChange"
              :loading="loading"
              disabled>
              <Option  v-for="(option, index) in optionsType" :value="option.value" :key="index">{{option.label}}</Option>
          </Select> -->
          <Input type="text" v-model="addform.pathName" disabled></Input>
        </FormItem>
        <FormItem label="模板名称:" prop='name'>
          <Input v-model="addform.name" placeholder="请输入模板名称" :maxlength="100"></Input>
        </FormItem>

        <FormItem label="展示方式:" class="zanshi">
          <Select v-model="addform.displayType" class="search-input" placeholder="">
            <Option v-for="item in stautsList" :value="item.value" :key="item.value" style="z-index:100000001">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="模板内容:" prop='addName'>
          <!-- <div class="editor-container"> -->
          <!-- <UE
              :defaultMsg=defaultMsg
              :config=config
              ref="ue"
            ></UE> -->
          <Input v-model="addform.content" type="textarea" :rows="20" placeholder="请输入模板内容" />
          <!-- </div> -->
        </FormItem>
        <FormItem>
          <Button class="search-btn" type="primary" @click="confirmAddModal('formCustom')" :disabled="isAdd">确定</Button>
          <Button class="search-btn" @click="cancelAddModal">取消</Button>
        </FormItem>
      </Form>

      </Col>
    </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import UE from "../../../CMS/components/defaultMsg/defaultMsg.vue";
import {
  TemplateType,
  informationtemplateAdd,
  AddCheckUniqueness,
  getInformationtemplateTypePath
} from "../api/unitManageMent.js";
import { formData } from "../../../../assets/js/common.js";
export default {
  // name: 'showAddModal',
  components: {
    UE,
    TemplateType
  },
  data() {
    //自定义验证
    const validateName = (rule, value, callback) => {
      if (this.addform.name == "") {
        callback(new Error("模板名称不能为空"));
      } else {
        var regu = /^\s*$/g;
        if (regu.test(this.addform.name)) {
          callback(new Error("模板名称不能包含空格"));
        } else {
          let form1 = {
            name: this.addform.name,
            templateTypeId: this.addform.templateTypeId
          };
          if (form1.templateTypeId) {
            AddCheckUniqueness(formData(form1)).then(res => {
              if (res.response) {
                callback();
              } else {
                callback(new Error("模板名称已存在"));
              }
            });
          }
        }
      }
    };
    const validateType = (rule, value, callback) => {
      if (this.addform.templateTypeId == "" || value == "") {
        callback(new Error("模板分类不能为空"));
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
      isAdd: false,
      loading: false,
      optionsType: [],
      searchloading: false,
      defaultMsg: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      addform: {
        name: "",
        displayType: 0,
        enterpriseId: "",
        templateTypeId: "",
        pathName: "",
        content: ""
      },
      //验证
      ruleCustom: {
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        templateType: [
          {
            required: true,
            validator: validateType,
            messmessage: "请选择模板分类",
            trigger: "change"
          }
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
    this.getInformationtemplateTypePath();
  },
  methods: {
    goto() {
      window.reload();
    },
    //根据页面传模板分类id获取模板分类内容
    getInformationtemplateTypePath() {
      let form = {
        informationTemplateTypeId: this.$route.query.informationTemplateTypeId
      };
      getInformationtemplateTypePath(formData(form)).then(res => {
        console.log("模板分类内容", res);
        var arr = [{ value: res.response.id, label: res.response.pathName }];
        //  this.optionsType.push(arr[0]);
        //  console.log(this.optionsType);
        //  this.addform.templateTypeId = this.optionsType[0].value;
        this.addform.templateTypeId = res.response.id;
        this.addform.pathName = res.response.pathName;
      });
    },
    cancelAddModal() {
      this.addUserModal = false;
      this.$router.push({
        name: "TemplateManagement",
        query: {
          treeNode: this.$route.query.treeCode,
          dataparams: this.$route.query.dataparams
        }
      });
    },
    infoType(query) {
      if (query !== "") {
        this.loading1 = true;
        let params = {
          name: query
        };
        setTimeout(() => {
          this.loading1 = false;
          TemplateType(formData(params)).then(res => {
            console.log("模板分类", res);
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
    //提交保存
    confirmAddModal(name) {
      let that = this;
      // console.log("富文本编辑框内容", this.$refs.ue.getUEContent());
      this.$refs[name].validate(valid => {
        if (valid) {
          that.isAdd = true;
          let form = {
            // content: this.$refs.ue.getUEContent(),
            content: this.addform.content,
            displayType: this.addform.displayType,
            templateTypeId: this.addform.templateTypeId,
            name: this.addform.name
          };

          informationtemplateAdd(form).then(res2 => {
            console.log("要保存数据", form);
            console.log("res", res2);
            that.isAdd = false;
            if (res2.status == "200") {
              that.$Message.success("新增成功");
              that.$router.push({
                name: "TemplateManagement",
                query: {
                  treeNode: that.$route.query.treeCode,
                  dataparams: that.$route.query.dataparams
                }
              });
            }
          });
        }
      });
    }
  }
};
</script>