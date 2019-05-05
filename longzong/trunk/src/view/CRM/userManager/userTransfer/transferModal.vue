<style lang="less" scoped>
  .title {
    font-size: 16px;
    font-weight: 700;
  }
</style>
<template>

  <Modal
    width="800"
    v-model="showModal"
    title="普通划转"
    @on-cancel="cancel">
    <Row>
      <Form :model="formItem" ref="formValidate" :rules="ruleValidate" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="12" class="adminName">
            <FormItem label="业务员:" prop="adminName">
              <Select
                ref="selectMethod"
                v-model="formItem.adminName"
                multiple
                filterable
                remote
                :remote-method="remoteMethod1"
                @on-change="onChange"
                :loading="loading"
                placeholder="请输入业务员">
                <Option v-for="(option, index) in adminList" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="新业务员:" prop="newAdminId">
              <Select
                ref="selectMethod"
                v-model="formItem.newAdminId"
                class="search-input"
                filterable
                remote
                :remote-method="remoteMethod1"
                :loading="loading"
                placeholder="请输入新业务员">
                <Option v-for="(option, index) in adminList" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="12">
            <FormItem label="用户类型:">
              <Select v-model="formItem.userType" @on-change="onChange" class="form-select" placeholder="请选择用户类型">
                <Option v-for="item in userTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="划转原因:" prop="transferReason">
              <Select v-model="formItem.transferReason" class="form-select" placeholder="请选择划转原因">
                <Option v-for="item in transferReasons" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" class="mar-l-20 title">
            <span>划转公司总数:</span>
            <span>{{companyTotal}}</span>
          </Col>
          <Col span="8" class="mar-l-20 title">
            <span>划转用户总数:</span>
            <span>{{userTotal}}</span>
          </Col>
        </Row>
      </Form>
    </Row>
    <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button type="primary" @click="submit">确定</Button>
    </div>
  </Modal>
</template>
<script>
import {
  adminListName,
  getTransferType,
  getTransferCount,
  addUserTransfer
} from "../../../components/axios/crm.js";
import { formData, formatType } from '../../../../assets/js/common.js'
export default {
  props: {
    showTransferModal: Boolean
  },
  data() {
    return {
      showModal: false,
      loading: false,
      companyTotal: 0,
      userTotal: 0,
      adminList: [],
      adminListSelect: [],
      transferReasons: [],
      userTypes: [
        {
          value: 0,
          desc: '免费用户'
        },
        {
          value: 1,
          desc: '试用用户'
        },
        {
          value: 2,
          desc: '正式用户'
        }
      ],
      formItem: {
        adminName: [],
        newAdminId: null,
        userType: '',
        transferReason: null
      },
      ruleValidate: {
        adminName: [
          { required: true, type: 'array', message: '请输入业务员', trigger: 'change' }
        ],
        newAdminId:  [
          { required: true, type: 'number', message: '请输入新业务员', trigger: 'change' }
        ],
        transferReason: [
          { required: true, type: 'number', message: '请选择划转原因', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getTransferType()
  },
  methods: {
    cancel() {
      this.showModal = false
      this.$emit('hide-modal')
    },
    submit() {
      this.$refs.formValidate.validate(valid => {
        if(valid) {
          let params = {
            adminIds: this.formItem.adminName.join(','),
            newAdminId: this.formItem.newAdminId,
            userType: this.formItem.userType,
            transferReason: this.formItem.transferReason
          }
          addUserTransfer(formData(params)).then(res => {
            this.$Message.success('划转成功！')
          })
          this.$emit('hide-modal')
        } else {
          this.showModal = true
        }
      })
    },
    // 业务员列表
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          adminName: query
        }
        adminListName(params).then(res => {
          this.adminList = res.response;
        })
      } else {
        this.adminList = []
      }
    },
    // 获取类型下拉
    getTransferType() {
      getTransferType().then(res => {
        this.transferReasons = res.response
      })
    },
    // 获取数据
    getTransferCount(ids) {
      let params = {
        adminIds: ids.join(','),
        type: formatType(this.formItem.userType)
      }
      getTransferCount(params).then(res => {
        this.companyTotal = res.response.memberTransferCount
        this.userTotal = res.response.userTransferCount
      })
    },
    onChange() {
      let value = this.formItem.adminName
      console.log(value)
      if(value && value.length > 0) {
        this.adminListSelect = value
        this.getTransferCount(value)
      } else {
        this.companyTotal = 0
        this.userTotal = 0
      }
    }
  },
  watch: {
    showTransferModal(newVal, oldVal) {
      this.showModal = newVal
    }
  }
}
</script>
