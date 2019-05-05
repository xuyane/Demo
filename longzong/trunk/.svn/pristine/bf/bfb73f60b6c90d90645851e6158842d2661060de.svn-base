<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;过滤规则
      </Row>
    </Col>
    <tab-header :tab-index="7"></tab-header>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="addRule">新增过滤规则</Button>
        </div>
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true">
        </Table>
      </Row>
    </Col>
    <Modal 
      v-model="addRuleModal"
      :title="title"
      @on-cancel="cancel">
      <Row>
        <Form :model="formItem" :rules="addRules" :label-width="100" ref="formItemT">
          <Col>
            <FormItem label="规则类型:" prop="ruleType">
              <Select v-model="formItem.ruleType" placeholder="请选择规则类型" >
                <Option v-for="item in ruleTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="该类型包含" prop="content">
              <Input v-model="formItem.content" class="search-textarea" type="textarea" :rows="4" 
                placeholder="多个规则用','隔开"></Input>
            </FormItem>
          </Col>
        </Form>
        
      </Row>
        <div slot="footer">
          <i-button type="primary" @click="addOk">确定</i-button>
          <i-button @click="noOk">取消</i-button>
        </div>
    </Modal>
  </Row>
</template>
<script>
import TabHeader from './tabHeader.vue';
import timeStampChange from "../../../assets/js/timestamp_change.js";
import axios from "axios";
import {
  getUserfilterruleList,
  getUserfilterruleDelete,
  getUserfilterruleSave,
  getUserfilterruleEnum,
  getUserfilterruleUpdate
} from "../../components/axios/crm.js";
export default {
  data() {
    return {
      formincould:'',
      addRuleModal: false,
      title: '',
      addRules: {
        ruleType: [
          {
            type:'number',
            required: true,
            message: "请选择规则类型",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "类型内容不能为空",
            trigger: "change"
          }
        ]
      },
      formItem: {
         ruleType: "",
        content: "", 
      },
      ruleTypes: [],
      tableData: [],
      columns: [
        {
          key: 'type',
          title: '规则类型',
          minWidth: 120,
          render: (h, data) => {
            let type = ''
            if(data.row.type === 0) {
              type = '公司名称'
            }
           else if(data.row.type === 1) {
              type = '用户名'
            }
            else if(data.row.type === 2) {
              type = '手机号'
            }
            else if(data.row.type === 3) {
              type = '用户姓名 '
            }
           else {
              type = '无'
            }
            return h('span', {}, type)
          }
        },
        {
          key: 'keyword',
          title: '规则内容',
          minWidth: 260
        },
        {
          key: 'createTime',
          title: '创建时间',
          minWidth: 160,
           render:(h,data)=>{
           return h('span',{},timeStampChange.format(data.row.createTime))
         }
        },
        {
          key: 'creatorName',
          title: '创建人',
          minWidth: 100
        },
         {
          key: 'status',
          title: '状态',
          minWidth: 80,
           render: (h, data) => {
            let status = ''
            if(data.row.status === 0) {
              status = '禁用'
            }
           else {
              status = '启用'
            }
            return h('span', {}, status)
          }
        },
        {
          key: '',
          title: '操作',
          minWidth: 120,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#145edb',
                  cursor: 'pointer',
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.editData(data)
                  }
                }
              }, '修改'),
              h('span', {
                style: {
                  color: '#145edb',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.isStatus(data)
                  }
                }
              }, `${data.row.status === 1 ? '禁用' : '启用'}`)
            ])
          }
        },
      ],
    }
  },
  components: {
    TabHeader
  },
  methods: {
    // 取消
    noOk() {
      this.addRuleModal = false
      this.$emit('hide-modal')
      this.$refs.formItemT.resetFields();
    },
    // 新增过滤规则
    addRule() {
      this.addRuleModal = true;
      this.title = '新增过滤规则'
      this.formItem = {};
    },
    // 修改
    editData(data) {
      this.addRuleModal = true;
      this.title = '修改过滤规则';
      this.formItem.ruleType = data.row.type;
      this.formItem.content = data.row.keyword;
      this.formItem.id = data.row.id;
    },
    addOk() {
      let flag = true;
      this.$refs.formItemT.validate(valid => {
        if (valid) {
          let that = this;
          this.$Spin.show();
          let params= {
              type: this.formItem.ruleType,
              status: 1,
              id: this.formItem.id,
              keyword: this.formItem.content
            }
            if(this.formItem.id === undefined)
            {
              getUserfilterruleSave(params).then(resp => {
                that.$Spin.hide();
                if (resp.status == 200) {
                  that.addRuleModal = false;
                  that.getlist();
                }
              });
            }
            else{
                getUserfilterruleUpdate(params).then(resp => {
                that.$Spin.hide();
                if (resp.status == 200) {
                  that.addRuleModal = false;
                  that.getlist();
                }
              });
            }
          }
           else {
         // this.$Message.error("Fail!");
          that.addRuleModal = true
          return false

        //  flag = false;
        }
      });
     
      
       
    },
    // 取消
    cancel() {
      this.addRuleModal = false
      this.$refs.formItemT.resetFields();
    },
    // 可用禁用
    isStatus (data){
      let that = this;
      //this.$Spin.show();
      let status = 0;
      let temt = "禁用";
      if(data.row.status === 0)
      {
        temt = "启用";
        status= 1;
      }
      let params= {
          id: data.row.id,
          status: status
        }

      this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定" + temt + "吗？</p>",
        onOk: () => {
          getUserfilterruleDelete(params).then(resp => {
             // that.$Spin.hide();
              if (resp.status == 200) {
              that.getlist();
           }
           });
        },
        onCancel: () => {}
      });
     
     },
  // 获取列表
    getlist() {
      let that = this;
      this.$Spin.show();
      getUserfilterruleList().then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.tableData = data;
        }
      });
     },
     // 获取列表
    getlistEnum() {
      let that = this;
      this.$Spin.show();
      getUserfilterruleEnum().then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.ruleTypes = data;
        }
      });
    }
  },
   created(){
     this.getlistEnum();
    this.getlist();
  }
}
</script>
