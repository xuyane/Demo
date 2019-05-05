<template>
  <Modal v-model="showModal"  title="号码分配" width="570" @on-cancel="doCancel">
    <Form ref="bindModal" :model="form" :rules="bindRules" :label-width="140">
      <FormItem label="电话号码" >
        <span>{{form.telephoneNumber}}</span>
      </FormItem>
      <FormItem label="短号" >
        <span>{{form.telephoneShortNumber}}</span>
      </FormItem>
      <FormItem label="使用人员" prop="employeeName">
        <Select ref="bindUserPeople"
            v-model="form.employeeId"
            clearable
            filterable
            remote
            :remote-method="remoteMethod" @on-change="changeUser" @on-clear="clearEmploy">
            <Option v-for="(option, index) in employeeNameList" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
      </FormItem>
      <FormItem label="是否允许座机转手机" >
        <RadioGroup v-model="form.transferCellphone" @on-change="showPhone" >
          <Radio label="1" :disabled="!isChangeOk">是</Radio>
          <Radio label="0" >否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="手机号" v-if="isShowPhone" prop="cellphoneNumber">
        <Input v-model="form.cellphoneNumber" class="search-input" placeholder="请输入手机号"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="doCancel">取消</Button>
      <Button type="primary" @click="doBind" :loading="loading">确定</Button>
    </div>
  </Modal>
</template>

<script>
import axios from "axios";
import { select_employee,getPhone } from '../components/axios/phoneCenter.js'
import { formData } from "../../assets/js/common.js";
export default {
  name: 'bindPhoneModal',
  props: {
    showBindModal: Boolean,
    bindData: Object
  },
  data () {
    const validateEmployeeName = (rule, value, callback) => {
      console.log(this.form.employeeId)
      if(this.form.employeeId){
        callback()
      }else {
        callback(new Error('请选择使用人员'))
      }
    }
    const validatePhone = (rule, value, callback) => {
        if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"));
        } else if (value.toString().length > 12) {
            callback(new Error("最大长度不能超过12位"));
        } else {
            callback();
        }
    };
    return {
      bindRules: {
        employeeName: [{
          required: true, validator: validateEmployeeName, message: '请选择使用人员', trigger: 'change'
        }],
        cellphoneNumber: [
            {required: true,message: "请输入手机号",trigger: "change"},
            { validator: validatePhone, trigger: "change" }
        ]
      },
      userList: [],
      showModal: false,
      loading: false,
      isShowPhone: false,
      isChangeOk: false,
      phoneArray: [],
      form: {},
      employeeNameList:[
        // {
        //   value: '{{form.employeeId}}',
        //   label: '{{form.employeeName}}'
        // }
      ]
    }
  },
  methods: {
    //使用人员select2模糊查询接口
    remoteMethod (query) {
      if (query !== '') {
        this.loading1 = true;
        let params = {
          name:query
        }
        select_employee(params).then(res => {
            this.loading1 = false;
            const list1 = JSON.parse(res.response).map(item => {
                return {
                    value: item.id,
                    label: item.text
                };
            });
            console.log(this.employeeNameList);
            this.employeeNameList = list1;
        });
      } else {
        this.employeeNameList = [];
      }
    },
    doBind () {
      let _this = this
      this.$refs.bindModal.validate((valid) => {
        if (valid) {
          // 校验通过
          let form = 'transferCellphone=' + this.form.transferCellphone + 
          '&telephoneId=' + this.form.id + 
          '&employeeId=' + this.form.employeeId+ 
          '&cellphoneNumber=' + this.form.cellphoneNumber
          axios({
            url: '/callcenter/call-center/calltelephonesetting/setting',
            method: 'post',
            data: form
          }).then(function(resp) {
            if (resp.data.status == '200') {
              _this.$Message.success("分配成功！！！");
              _this.loading = false
              _this.showModal = false
              _this.$emit('hide-modal')
            } else {
              _this.$Message.warning(resp.data.message)
            }
          }).catch(function(err) {
            _this.loading = false
            _this.$Message.warning(err.message)
          })
        } else {
          
        }
      })
    },
    doCancel () {
      this.$refs.bindUserPeople.clearSingleSelect();
      this.$emit('hide-modal')
      this.$refs.bindModal.resetFields()
    },
    showPhone(val) {
        if (val == 0) {
            this.isShowPhone = false;
        } else if (val == 1) {
            this.isShowPhone = true;
        }
    },
    clearEmploy() {
        this.form.transferCellphone = "0";
        this.form.cellphoneNumber = "";
        this.isChangeOk = false;
        this.isShowPhone = false;
    },
    changeUser(val) {
        if (!val) {
            this.isChangeOk = false;
        } else {
            this.isChangeOk = true;
            getPhone({ employeeId: val }).then(res => {
                this.form.cellphoneNumber = res.response;
            });
        }
    },
    setForm () {
      this.form = Object.assign({}, this.bindData)
    }
  },
  watch: {
    showBindModal (newVal, oldVal) {
      this.showModal = newVal;
      this.$refs.bindModal.resetFields();
    },
    bindData (newVal, oldVal) {
      this.form = Object.assign({}, newVal)
      console.log(this.form);
      this.form.transferCellphone += ''
      if (this.form.employeeName !== '' && this.form.employeeName !== null && this.form.employeeName !== undefined) {
        this.isChangeOk = true;
      }else{
        this.isChangeOk = false;
      }
      if (this.form.transferCellphone === '1') {
        this.isShowPhone = true
      }else{
        this.isShowPhone = false
      }
    }
  }
}
</script>
