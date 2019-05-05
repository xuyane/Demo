<style lang="less" scoped>
.ivu-select-selection{
  z-index:1000000;
}
.editor-container{
  z-index:-100000;
}
.zanshi{
  position: relative;
  z-index: 1000000;
}
.moban{
  position: relative;
  z-index: 100000000000;
}
</style>

<template>
  <Modal v-model="showAddModal" title="新增栏目" width="1000" @on-cancel="cancelAddModal">
      <Form ref="formCustom" :model="addform"  :rules="ruleCustom" :label-width="120">
        <FormItem label="模板名称" prop='name'>
          <Input v-model="addform.name" placeholder="请输入模板名称"></Input>
        </FormItem>
        <FormItem label="模板分类" prop='addName' class="moban">
          <Select
              v-model="addform.templateTypeId"
              filterable
              remote
              :remote-method="infoType"
              label-in-value
              @on-change="infoTypeChange"
              :loading="loading">
              <Option v-for="(option, index) in optionsType" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="展示方式:" class="zanshi">
            <Select v-model="addform.displayType" class="search-input" placeholder="">
                <Option v-for="item in stautsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="模板内容" prop='addName'>
            <div class="editor-container">
              <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
            </div>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button :loading="searchloading" class="search-btn" type="primary" @click="confirmAddModal('addform')">确定</i-button>
        <i-button  class="search-btn" @click="cancelAddModal">取消</i-button>
      </div>
    </Modal>
</template>
<script>
import axios from "axios"
import UE  from '../components/defaultMsg/defaultMsg.vue';
import {TemplateType} from "../../components/axios/Template.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: 'showAddModal',
  components: {
    UE,
    TemplateType
  },
  props: {
    showAddModal: Boolean
  },
  data(){
    return {
      loading:false,
      optionsType:[],
      searchloading:false,
      defaultMsg: '请输入模板内容',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      addform:{
        name:"",
        displayType:0,
        enterpriseId:""
      },
      ruleCustom:{

      },
      stautsList:[
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
        },
      ]
    }
  },
  methods:{
      cancelAddModal(){
        this.addUserModal = false;
        this.$emit('hide-modal');
      },
      infoType(query){
        if (query !== '') {
            this.loading1 = true;
            let params = {
              name:query
            }
            setTimeout(() => {
                this.loading1 = false;
                TemplateType(formData(params)).then(res =>{
                    // console.log(res);
                  const list1 = res.response.map(item => {
                      return {
                          value: item.id,
                          label: item.name
                      };
                  });
                  this.optionsType = list1
                })
            }, 100); 
        } else {
            this.optionsType = [];
        }
      },
      infoTypeChange(data){
        // console.log(data);
        this.addform.enterpriseId = data.value;
      }
  },
  watch: {
    showAddModal (newVal, oldVal) {
      this.addUserModal = newVal
    }
  },
}
</script>

