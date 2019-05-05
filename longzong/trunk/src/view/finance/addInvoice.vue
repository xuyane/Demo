<style lang="less" scoped>
  // @import './productOpening.less';
  textarea.ivu-input {
    border-color: #605f5f;
  }

  .bgfff {
    background: #fff;
    padding: 20px;
  }

  .product-opening-out .add-incoice-form .rise {
    margin-top: 80px;

    .lebel:before {
      content: "*";
      display: inline-block;
      margin-right: 4px;
      line-height: 1;
      font-size: 12px;
      color: #ed4014;
    }

    .rise_wrap {
      display: flex;
    }
  }
</style>

<template>
  <Row class="product-opening-out">
    <Col span="24">
    <Row v-if="!formInvoice.id" class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;开票信息维护&nbsp;&nbsp;>>&nbsp;&nbsp;新增
    </Row>
    <Row v-else class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;开票信息维护&nbsp;&nbsp;>>&nbsp;&nbsp;修改
    </Row>
    </Col>
    <Col span="24" class="product-opening-table bgfff">
    <Form ref="formInvoice" style="width:600px;" :model="formInvoice" :rules="ruleInvoice" :label-width="150" class="add-incoice-form">
      <FormItem label="会员名称:" prop='member'>
        <Select v-if="!isEdit" ref="selectMember" v-model="formInvoice.memberId" clearable filterable remote :remote-method="remoteMethod"
          :loading="loading" @on-change="getMember" @on-clear="clearMember" label-in-value class="search-input">
          <Option v-for="(option, index) in itemList" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
        <span v-else>{{formInvoice.nameAndId}}</span>
      </FormItem>
      <FormItem label="开票抬头:" prop='invoiceIssuing'>
        <Input class="search-input" v-model="formInvoice.invoiceIssuing" placeholder="请填写开票抬头"></Input>
      </FormItem>
      <FormItem label="纳税人识别号:" prop='payTaxNo'>
        <Input class="search-input" :maxlength="18" v-model="formInvoice.payTaxNo" placeholder="请输入纳税人识别号"></Input>
      </FormItem>
      <FormItem label="开户行:" prop='payBank'>
        <Input class="search-input" v-model="formInvoice.payBank" placeholder="请输入开户行"></Input>
      </FormItem>
      <FormItem label="账号:" prop='payBankNo'>
        <Input class="search-input" v-model="formInvoice.payBankNo" placeholder="请输入账号"></Input>
      </FormItem>
      <FormItem label="地址:" prop='invoiceAddress'>
        <Input class="search-input" v-model="formInvoice.invoiceAddress" placeholder="请输入地址"></Input>
      </FormItem>
      <FormItem label="电话:" prop='invoicePhone'>
        <Input class="search-input" v-model="formInvoice.invoicePhone" placeholder="请输入电话"></Input>
      </FormItem>
      <FormItem label="收件人:" prop='postName'>
        <Input class="search-input" v-model="formInvoice.postName" placeholder="请输入收件人姓名" @on-blur="changeName"></Input>
      </FormItem>
      <FormItem label="收件人邮箱:">
        <Input class="search-input" v-model="formInvoice.invoiceEmail" placeholder="请输入收件人邮箱"></Input>
      </FormItem>
      <FormItem label="收件人电话:" prop='postPhone'>
        <Input class="search-input" v-model="formInvoice.postPhone" placeholder="请输入收件人电话"></Input>
      </FormItem>
      <FormItem label="邮编:" prop='postCode'>
        <InputNumber class="search-input" v-model="formInvoice.postCode" placeholder="请输入邮编"></InputNumber>
      </FormItem>
      <FormItem label="邮寄地址:" prop='postAddress'>
        <Input class="search-input" v-model="formInvoice.postAddress" placeholder="请输入邮寄地址"></Input>
      </FormItem>
      <FormItem label="备注:">
        <Input class="search-input" v-model="formInvoice.note" type="textarea" :rows="4" placeholder="请输入备注"></Input>
      </FormItem>
    </Form>
    <div v-if="!formInvoice.id" style="width:600px;margin-top: 80px;" class="add-invoice-btn text-center">
      <Button type="primary" @click="saveReturn">保存并返回</Button>
      <Button type="primary" @click="saveAdd">保存并新建</Button>
      <Button @click="returnBack">返回</Button>
    </div>
    <div v-else style="width:600px;margin-top: 80px;" class="add-invoice-btn text-center">
      <Button type="primary" @click="editReturn">修改</Button>
      <Button @click="returnBack">返回</Button>
    </div>
    </Col>
  </Row>
</template>

<script>
  import axios from 'axios';
  import selectMember from '../components/finance/selectMember.vue';
  import { addInsert, editInsert, insertDetail, getMemberList, getMemberAdminList } from '../components/axios/finance.js';
  import { validMP } from '../../assets/js/common';

  export default {
    name: "enterpriseList",
    components: {
      selectMember
    },
    data() {
      const ratepayingMember = (rule, value, callback) => {

        if (!this.formInvoice.memberId) {
          callback(new Error('请选择会员名称'));
        } else {
          callback();
        }
      };
      const ratepayingNums = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入纳税人识别号'));
        } else {
          if (value.length === 18) {
            callback();
          } else {
            callback(new Error('请输入18位的纳税人识别号'));
          }
        }
      };
      return {
        formInvoiceDefault: {
          id: null,
          invoiceAddressPhone: '',
          invoiceAddress: '',
          invoicePhone: '',
          invoiceEmail: "",
          member: '',
          memberId: null,
          note: '',
          payBank: '',
          payBankNo: '',
          payTaxNo: "",
          postAddress: '',
          postCode: null,
          postName: '',
          postPhone: '',
          invoiceIssuing: ''
        },
        formInvoice: {
          id: this.$router.id || null,
          invoiceAddressPhone: '',
          invoiceAddress: '',
          invoicePhone: '',
          invoiceEmail: "",
          member: '',
          memberAndId: '',
          memberId: null,
          note: '',
          payBank: '',
          payBankNo: '',
          payTaxNo: "",
          postAddress: '',
          postCode: null,
          postName: '',
          postPhone: '',
          invoiceIssuing: ''
        },
        form: {},
        ruleInvoice: {
          member: [
            { required: true, validator: ratepayingMember, message: '请选择会员名称', trigger: 'change' }
          ],
          payTaxNo: [
            { required: true, validator: ratepayingNums, trigger: 'blur' }
          ],
          payBank: [
            { required: true, message: '请输入开户行', trigger: 'blur' }
          ],
          payBankNo: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          //          invoicePhone: [
          //            {  required: true, validator: validMP, trigger: 'blur' }
          //          ],
          invoiceAddress: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          invoiceIssuing: [{
            required: true, message: '请填写开票抬头', trigger: 'blur'
          }]
        },
        loading: false,
        memberNameList: [],
        selectList: ['a全部', 'b会议', 'c报告'],
        itemList: [],
        isFirst: true,
        isEdit: false
      }
    },

    methods: {

      //判断是否为中文
      checkLenAndIsChinese(input) {
        var reg = /^[\u4e00-\u9fa5]+$/;
        var flag = true;
        if (!reg.test(input)) {
          flag = false;
        }
        return flag;
      },

      //去除空格
      trima(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
      },

      //验证姓名
      changeName(data) {
        if (data.target.value != '') {
          let name = this.trima(data.target.value);
          let chinese = this.checkLenAndIsChinese(name);
          if (!chinese) {
            this.$Message.error("请输入中文")
            this.formInvoice.postName = ''
          } else if (name.length < 2 || name.length > 10) {
            this.$Message.error("输入字数范围为2-10")
            this.formInvoice.postName = ''
          }
        }
      },
      getMember(data) {
        this.formInvoice.memberAndId = data && data.label;
        this.formInvoice.member = data && data.label;
        if (this.formInvoice.memberId != undefined) {
          let len = String(this.formInvoice.memberId).length
          this.formInvoice.member = this.formInvoice.member.substring(len + 2);
        }

      },
      clearMember() {

      },
      remoteMethod(query) {
        if (query == this.formInvoice.memberId) {
          return;
        }
        let that = this;
        if (query !== "") {
          that.loading = true;
          let params = {
            memberName: query
          };
          getMemberAdminList(params).then(res => {
            that.loading = false;
            const list = res.response.map(item => {
              return {
                value: item.id,
                label: item.nameAndId
              };
            });
            that.itemList = list;
          })
        } else {
          this.itemList = [];
        }
      },
      returnBack() {
        this.$router.push({
          name: 'invoiceList'
        })
      },


      saveReturn() {
        let that = this;

        this.form = {
          id: this.formInvoice.id,
          invoiceAddressPhone: this.formInvoice.invoiceAddress + ',' + this.formInvoice.invoicePhone,
          invoiceEmail: this.formInvoice.invoiceEmail,
          member: this.formInvoice.member,
          memberId: this.formInvoice.memberId,
          note: this.formInvoice.note,
          payBank: this.formInvoice.payBank,
          payBankNo: this.formInvoice.payBankNo,
          payTaxNo: this.formInvoice.payTaxNo,
          postAddress: this.formInvoice.postAddress,
          postCode: this.formInvoice.postCode,
          postName: this.formInvoice.postName,
          postPhone: this.formInvoice.postPhone,
          invoiceIssuing: this.formInvoice.invoiceIssuing
        }
        this.$refs.formInvoice.validate(valid => {
          if (valid) {
            addInsert(this.form).then(resp => {
              that.$Message.success(resp.message);
              this.returnBack();
            });
          } else {
            this.$Message.error('请输入必填项!');
          }
        })
      },
      saveAdd() {
        let that = this;
        this.form = {
          id: this.formInvoice.id,
          invoiceAddressPhone: this.formInvoice.invoiceAddress + ',' + this.formInvoice.invoicePhone,
          invoiceEmail: this.formInvoice.invoiceEmail,
          member: this.formInvoice.member,
          memberId: this.formInvoice.memberId,
          note: this.formInvoice.note,
          payBank: this.formInvoice.payBank,
          payBankNo: this.formInvoice.payBankNo,
          payTaxNo: this.formInvoice.payTaxNo,
          postAddress: this.formInvoice.postAddress,
          postCode: this.formInvoice.postCode,
          postName: this.formInvoice.postName,
          postPhone: this.formInvoice.postPhone,
          invoiceIssuing: this.formInvoice.invoiceIssuing
        }
        this.$refs.formInvoice.validate((valid) => {
          if (valid) {
            addInsert(this.form).then(resp => {

              that.$Message.success(resp.message);
              that.formInvoice = JSON.parse(JSON.stringify(that.formInvoiceDefault));
            })
          } else {
            this.$Message.error('请输入必填项!');
          }
        })
      },

      editReturn() {
        let that = this;

        this.form = {
          id: this.formInvoice.id,
          invoiceAddressPhone: this.formInvoice.invoiceAddress + ',' + this.formInvoice.invoicePhone,
          invoiceEmail: this.formInvoice.invoiceEmail,
          member: this.formInvoice.member,
          memberId: this.formInvoice.memberId,
          note: this.formInvoice.note,
          payBank: this.formInvoice.payBank,
          payBankNo: this.formInvoice.payBankNo,
          payTaxNo: this.formInvoice.payTaxNo,
          postAddress: this.formInvoice.postAddress,
          postCode: this.formInvoice.postCode,
          postName: this.formInvoice.postName,
          postPhone: this.formInvoice.postPhone,
          invoiceIssuing: this.formInvoice.invoiceIssuing
        }
        this.$refs.formInvoice.validate(valid => {
          if (valid) {
            editInsert(this.form).then(resp => {
              that.$Message.success(resp.message);
              this.returnBack();
            })
          } else {
            this.$Message.error('请输入必填项!');
          }
        })
      }
    },
    mounted() {
      const that = this;
      const id = this.$route.query.id;
      if (id) {
        const formDa = new FormData();
        formDa.append("memberInvoiceInfoId", id);
        insertDetail(formDa).then(res => {
          that.formInvoice = res.response;
          let addressPhoneArr = res.response.invoiceAddressPhone.split(",")
          that.formInvoice.invoiceAddress = addressPhoneArr[0]
          that.formInvoice.invoicePhone = addressPhoneArr[1]
          if (
            this.formInvoice.member !== "" &&
            this.formInvoice.member !== null &&
            this.formInvoice.member !== undefined
          ) {
            this.itemList = [{
              label: this.formInvoice.memberAndId,
              value: this.formInvoice.memberId
            }]
          }
          that.$Spin.hide();
        })
      }
    }
  }
</script>