<style lang="less" scoped>
  .search-form {
    padding: 0 40px;
  }
  .title {
    color: #000;
    font-size: 14px;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 6px;
  }
  .send-box {
    padding: 6px 8px;
    width: 700px;
    height: 200px;
    border: 1px solid #bfc0c7;
    overflow: auto;
  }
  .red {
    color: red;
  }
  .des {
    margin-top: 2px;
  }
  .border-red {
    border: 1px solid red;
  }
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;发送短信
      </Row>
    </Col>
    <tab-header :tab-index="1"></tab-header>
    <Col span="24" class="search-form">
      <Form :model="formItem" :rules="addRules" ref="formItemT">
        <Col class="title">手机号码</Col>
        <Col span="12" class="flex">
          <Col span="20" class="send-box" :class="[msgShow ? 'border-red' : '']">
            <div v-for="item in rightData">{{item.label}}</div>
          </Col>
          <Col span="4" class="mar-l-20">
            <Button type="primary" @click="selectUser">选择客户</Button>
          </Col>
        </Col>
        <Col span="24" v-show="msgShow" class="red">手机号码不能为空</Col>
        <Col span="24" class="des">您已输入<span class="red">{{rightData.length}}</span>个手机号码</Col>
        <Col span="24" class="mar-t-20">
          <Button type="primary" @click="addMemberName">公司名称</Button>
          <Button  type="primary" @click="addUserName">用户名称</Button>
        </Col>
        <Col span="24" class="title">短信内容</COl>
        <Col span="12" class="flex">
          <Col>
            <FormItem prop="content">
              <Input v-model="formItem.content" class="search-textarea" type="textarea" style="width: 700px" :rows="4" placeholder="请输入短信内容"></Input>
            </FormItem>
          </Col>
          <Col class="mar-l-20">
            <Button type="primary" @click="selectTemplet">选择模板</Button>
          </Col>
        </Col>
        <Col span="24">您已输入<span class="red">{{formItem.content.length}}</span>个字符</Col>
        <Col span="24" class="mar-t-20" style="height: 36px;display: inline-block;vertical-align:top">
          <RadioGroup v-model="sendType">
            <Radio label="1" checked>立即发送</Radio>
            <Radio label="0">定时发送</Radio>
          </RadioGroup>
          <DatePicker
            v-model="time"
            v-show="sendType == 0"
            :options="disabledOptions"
            type="datetime"
            placeholder="请选择定时发送时间"
            style="width: 200px"
            class="mar-l-20">
          </DatePicker>
        </Col>
        <Col span="24" class="mar-t-20">
          <span style="display:inline-block;vertical-align:bottom">接口:</span>
          <RadioGroup v-model="types">
            <Radio v-for='(option,index) in gatewayEnum' disabled :key='option.value' :label="option.value" class="discountitem">{{option.desc}}</Radio>
          </RadioGroup>
        </Col>
        <Col span="24" style="margin-top: 10px;margin-left: 300px;padding: 20px">
          <Button type="primary" @click="sendMessageButton">确定</Button>
        </Col>
      </Form>
    </Col>
    <select-user-modal
      :showSelectModal="showSelectModal"
      @hide-modal="hideModal"
      @right-data="getRightData">
    </select-user-modal>
    <Modal
      width="1000"
      v-model="templateModal"
      title="选择模板"
      @on-cancel="cancel"
      @on-ok="ok">
      <Row>
        <Form :model="formItem2" :label-width="80">
          <Row type="flex" justify="space-between">
            <Col span="9">
              <FormItem label="模板类型:">
                <Input v-model="formItem2.type" class="search-input" placeholder="请输入短信类型"></Input>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="模板内容:">
                <Input v-model="formItem2.content" class="search-input" placeholder="请输入模板内容"></Input>
              </FormItem>
            </Col>
            <Col span="4" class="text-right">
              <Button type="primary" @click="findlist">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </Col>
          </Row>
        </Form>
        <Col span="24">
          <Table class="tableCommon"
            :data="tableData"
            :columns="columns"
            ref="dragTable"
            :stripe="true"
            :border="true">
          </Table>
          <oil-page
            :total="total"
            :page-size="pageSize"
            @page-change="pageChange"
            :page-size-opts="pageSizeOpts"
            :show-sizer="showSizer">
          </oil-page>
        </Col>
      </Row>
    </Modal>
  </Row>
</template>
<script>
import TabHeader from './tabHeader.vue';
import SelectUserModal from './selectUserModal';
import OilPage from '../../components/page/page'
import { formData, formatStamp, formatTime } from '../../../assets/js/common.js';
import {
  getUsersmsgatewayEnum,
  getUsersmstemplateList,
  getUsersmstemplateListPage,
  getUsersmssendSave
} from "../../components/axios/crm.js";
export default {
  data() {
    return {
      total: 0,
      pageSize: 5,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      formItem2: {
        type: '',
        content: ''
      },
      sendType: '1',
      time: '',
      showSelectModal: false,
      templateModal: false,
      msgShow: false,
      tableData: [],
      selectData: {},
      selection: {},
      gatewayEnum: [],
      rightData: [],
      disabledOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now()
        }
      },
      columns: [
        {
          title: '选中',
          align: 'center',
          key: 'checkBox',
          width: 60,
          render:(h, params)=>{
            return h('div', [
              h('Checkbox', {
                props:{
                  value: params.row.checkBox
                },
                on:{
                  'on-change': (e) => {
                    this.tableData.forEach((items)=>{      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, 'checkBox', false)
                    });
                    this.tableData[params.index].checkBox = e;  //再将勾选的对象的checkBox设置为true
                    this.selectData = this.tableData[params.index]
                  }
                }
              })
            ])
          }
        },
        {
          key: 'name',
          title: '模板类型',
          minWidth: 100
        },
        {
          key: 'content',
          title: '模板内容',
          minWidth: 120
        }
      ],
      addRules: {
        content: [
          {
            required: true,
            message: "短信内容不能为空",
            trigger: "change"
          }
        ]
      },
      formItem: {
        content: ''
      },
      types: 1
    }
  },
  components: {
    TabHeader,
    SelectUserModal,
    OilPage
  },
  methods: {
    // 选择用户
    selectUser() {
      this.showSelectModal = true
    },
    // 选择模板
    selectTemplet() {
      this.templateModal = true
    },
    cancel() {
      this.templateModal = false
    },
    reset() {
      this.formItem2 = {}
    },
    ok() {
      this.selection = this.selectData
      this.formItem.content = this.selection.content
      this.formItem.templateId = this.selection.id
      this.types = this.selection.gateway
    },
    hideModal () {
      this.showSelectModal = false
    },
    findlist(){
      this.pageNum=1;
      this.pageSize=5;
      this.getList();
    },
    getlist() {
      let that = this;
      this.$Spin.show();
      let params = {
        name: this.formItem2.type || '',
        content: this.formItem2.content || '',
        status: 1,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      getUsersmstemplateListPage(formData(params)).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          this.tableData = resp.response.list
          this.total = resp.response.total
        }
      });
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getlist()
    },
    addMemberName() {
      this.formItem.content += '${memberName}'
    },
    addUserName() {
      this.formItem.content += '${username}'
    },
    // 获取枚举列表
    getlistEnum() {
      let that = this;
      this.$Spin.show();
      getUsersmsgatewayEnum().then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.gatewayEnum = data;
        }
      });
    },
    getRightData(rightData) {
      this.rightData = rightData;
      let mobile = "";
      if(rightData && rightData.length > 0) {
        this.msgShow = false
      }
      for(let i=0; i<this.rightData.length; i++) {
        if(i === this.rightData.length-1)
        {
          mobile += this.rightData[i].description;
        }else{
          mobile += this.rightData[i].description+",";
        }
      }
      this.formItem.mobile = mobile;
    },
    sendMessageButton() {
      let that = this;
      let flag = true;
      this.$refs.formItemT.validate(valid => {
        if(this.rightData && this.rightData.length > 0) {
          this.msgShow = false
        } else {
          this.msgShow = true
        }
        if (valid) {
          this.$Spin.show();
          let distributionTimeS = formatStamp(this.time)
          let params= {
            mobile: this.formItem.mobile,
            gateway: this.types,
            type:1,
            isResend:0,
            status:1,
            isSend:this.sendType,
            sendTime: distributionTimeS,
            templateId: this.formItem.templateId,
            content: this.formItem.content
          }
          getUsersmssendSave(params).then(resp => {
            that.$Spin.hide();
            if (resp.status == 200) {
              this.$Message.success(resp.message);
              setTimeout(function(){
                window.location.reload();
              },2000)
              
            }
            else
            {
              this.$Message.warning(resp.message);
              window.location.reload();
            }
          })
        }
      })
    },
  },
   created(){
    this.getlist();
    this.getlistEnum();
  }
}
</script>
