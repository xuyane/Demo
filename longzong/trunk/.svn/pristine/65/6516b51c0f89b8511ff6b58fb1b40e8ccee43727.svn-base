<style lang="less" scoped>
  // .ivu-transfer-list {
  //   width: 354px;
  // }
</style>
<template>
  <Modal
    v-model="showModal"
    title="选择用户"
    width="800"
    @on-cancel="cancel"
    @on-ok="ok">
    <Row>
      <Form ref="formItem" :model="formItem" :rules="ruleForm" :label-width="100" class="select-user">
        <Row type="flex" justify="space-between">
          <Col span="11">
            <FormItem label="企业类型:">
              <Select v-model="formItem.companyType" placeholder="请选择企业类型">
                <Option v-for="item in companyTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="用户类型:">
              <Select v-model="formItem.type" placeholder="请选择用户类型">
                <Option v-for="item in userTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="11">
            <FormItem label="所在地区:">
              <!-- <Cascader :data="data4" :load-data="loadData"></Cascader> -->
              <Cascader
                :data="dataArea"
                :load-data="loadData"
                v-model="formItem.areaCode"
                class="search-input"
                placeholder="请选择地区">
              </Cascader>
            </FormItem>
          </Col>
          <Col span="11">
           <FormItem label="公司名称:">
              <Input clearable v-model="formItem.memberName" class="search-input" placeholder="请输入公司名称"></Input>
            </FormItem>
            <!-- <FormItem label="公司名称:" prop="memberId">
              <Select
                v-model="formItem.memberId"
                ref="input2"
                class="search-input"
                filterable
                clearable
                remote
                :remote-method="remoteMethod2"
                :loading="loading">
                <Option v-for="(option, index) in options2" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem> -->
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="24" class="text-right">
            <FormItem>
              <Button type="primary" @click="getListPage">查询</Button>
              <Button style="margin-left: 8px" @click="reset('formItem')">重置</Button>
            </FormItem>
          </Col>
        </Row>
        <Col span="24">
          <Transfer
            width="700"
            :data="leftData"
            :target-keys="targetKeys"
            :render-format="renderFormat"
            :titles="titles"
            @on-change="handleChange">
          </Transfer>
        </Col>
      </Form>
    </Row>
  </Modal>
</template>
<script>
import { formData, formatStamp, formatTime } from '../../../assets/js/common.js';
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import axios from "axios";
import {
  getUserType,
  getCompanyTypeEnum,
  getUsersmssendListUser,
  getAllProvice,
  getSelectList,
  memberSelectList
} from "../../components/axios/crm.js";
export default {
  props: {
    showSelectModal: Boolean
  },
   components: {
    associateSearch
  },
  data() {
    return {
      showModal: false,
      loading: false,
      titles: ['已过滤用户', '已选用户'],
      value1: [],
      companyName: "memberName",
      url: "/crm/common/query-member-select-list", //根据会员名称模糊匹配下拉选择列表
      dataArea: [],
      companyTypes: [],
      userTypes: [],
      options2: [],
      formItem: {
        companyType: '',
        type: '',
        areaCode: [],
        memberId: '',
        memberName: '',
      },
      ruleForm: {
        memberId: [
          { required: false, type: 'number', message: '请输入公司名称', trigger: 'change' }
        ]
      },
      leftData: [],
      targetKeys: [],
      rightData: []
    }
  },
  methods: {
    // 获取公司名称下拉搜索
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          memberName: query
        }
         setTimeout(() => {
          this.loading = false;
          memberSelectList(params).then(res => {
            this.options2 = res.response;
          });
        }, 200);
      } else {
        this.options2 = []
      }
    },
    ok() {
      let keys = this.targetKeys
      this.rightData = []
      console.log(keys)
      this.leftData.map(item => {
        for(let i = 0; i < keys.length; i ++){
          if(item.key === keys[i]) {
            this.rightData.push(item)
          }
        }
      })
      console.log('left', this.leftData)
      console.log('right', this.rightData)
      this.$emit('hide-modal')
      this.$emit('right-data', this.rightData)
      // console.log('right', this.rightData)
    },
    cancel() {
      this.showModal = false
      this.$emit('hide-modal')
      this.$refs.formItem.resetFields()
    },
    // 获取列表
    getListPage() {
          let that = this
          this.$Spin.show()
          let result = []
          this.leftData= []
          this.targetKeys= []
          this.rightData= []
          let numCount = 0;
          if(this.formItem.type != "")
          {
            numCount = numCount+1;
          }
          if(this.formItem.companyType != "")
          {
            numCount = numCount+1;
          }
          if(this.formItem.memberName != "")
          {
            numCount = numCount+1;
          }
          if(this.formItem.areaCode.length > 0)
          {
            numCount = numCount+1;
          }
          if(numCount == 0)
          {
            this.$Message.warning("请至少带一个查询条件！");
            that.$Spin.hide();
            return;
          }
          else
          {
              let params = {
            type: this.formItem.type || '',
            companyType: this.formItem.companyType || '',
            memberId: this.formItem.memberId || '',
            memberName: this.formItem.memberName || '',
            areaCode: this.formItem.areaCode 
          }
          getUsersmssendListUser(formData(params)).then(resp => {
            that.$Spin.hide();
            console.log('resp', resp)
            // 需要发送的用户
            if(resp.response.userMemberDetailVOs){
              this.rightData = resp.response.userMemberDetailVOs.map(item => {
                return {
                  key: item.id,
                  label: item.memberNameCn +"-"+ item.username+"("+item.mobile+")",
                  description: item.mobile
                }
              })
              this.targetKeys = resp.response.userMemberDetailVOs.map(item => {
                return item.id
              })
              this.leftData = this.rightData
            }
            // 过滤了的用户
            if(resp.response.userMemberDetailFilterVOs) {
              result = resp.response.userMemberDetailFilterVOs.map(item => {
                return {
                  key: item.id,
                  label: item.memberNameCn + "-" + item.username + "(" +item.mobile + ")",
                  description: item.mobile
                }
              })
            }
            this.leftData.push(...result)
          });
          }
          
    },
    // 获取省级
    getAllProvice() {
      let data = {
        type: 1,
        parentCode: "01"
      }
      getAllProvice(data).then(res => {
        this.dataArea = res.response.map(item => {
          return {
            value: item.code,
            label: item.name,
            children: []
          }
        })
      })
    },
    loadData() {

    },
     //根据公司名称模糊匹配下拉选择列表
    companyTypeFunction(companyData) {
      // this.companyData = companyData;
      if (companyData) {
        this.formItem.memberId = companyData.value;
        this.formItem.memberName = companyData.label;
      }
    },
    // 重置
    reset(name) {
      this.formItem.type = '';
      this.formItem.memberName = '';
      this.formItem.companyType = '';
      this.formItem.areaCode = [];
      this.$refs.breedDataRef.model = "";
      this.$refs.input2.query = ''
      this.$refs.breedDataRef.getData("");
      this.formItem = {};
    },
    // 数据渲染函数
    renderFormat(item) {
        return item.label;
    },
    // 回调函数
    handleChange(newTargetKeys) {
      this.targetKeys = newTargetKeys;
      console.log('newTargetKeys', newTargetKeys)
    },
     // 获取用户枚举列表
    getUserEnum() {
      let that = this;
      this.$Spin.show();
      getUserType().then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.userTypes = data;
        }
      });
    },
    // 获取用户枚举列表
    getCompanyEnum() {
      let that = this;
      this.$Spin.show();
      getCompanyTypeEnum().then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.companyTypes = data;
        }
      });
    }
  },
   created(){
     this.getUserEnum()
     this.getCompanyEnum()
    //  this.getListPage()
     this.getAllProvice()
  },
  watch: {
    showSelectModal(newVal, oldVal) {
      this.showModal = newVal
    }
  }
}
</script>
