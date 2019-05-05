<template>
  <Modal v-model="showModal" title="修改电话号码" @on-cancel="doCancel" width="750">
    <Form ref="editModal" :model="form" :rules="editRules" :label-width="150">
      <FormItem label="电话号码">
        <span>{{form.telephoneNumber}}</span>
      </FormItem>
      <FormItem label="短号">
        <span>{{form.telephoneShortNumber}}</span>
      </FormItem>
      <FormItem label="服务商">
        <span>{{serviceProvider}}</span>
      </FormItem>
      <FormItem label="号码归属地">
        <span>{{locationId}}</span>
      </FormItem>
      <FormItem label="使用人员">
        <Select v-model="form.employeeId" filterable remote clearable :remote-method="remoteMethod" :loading="loading1" @on-change="changeUser" @on-clear="clearEmploy">
          <Option v-for="(option, index) in employeeNameList" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
      </FormItem>
      <FormItem label="是否允许座机转手机">
        <RadioGroup v-model="form.transferCellphone" @on-change="showPhone">
          <Radio label="1" :disabled="!isChangeOk">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="手机号" v-if="isShowPhone" prop="cellphoneNumber">
        <Input v-model="form.cellphoneNumber" class="search-input" placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem label="说明">
        <Input v-model="form.remarks" type="textarea" class="search-input" :autosize="{minRows: 2,maxRows: 7}"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="doCancel">取消</Button>
      <Button type="primary" @click="doEdit">确定</Button>
    </div>
  </Modal>
</template>

<script>
import axios from "axios";
import {
    select_employee,
    phoneNumberModify,
    getPhone
} from "../components/axios/phoneCenter.js";
import { formData } from "../../assets/js/common.js";
export default {
    name: "editPhoneModal",
    props: {
        showEditModal: Boolean,
        editData: Object
    },
    data() {
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
            editRules: {
                cellphoneNumber: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    { validator: validatePhone, trigger: "change" }
                ]
            },

            showModal: false,
            loading: false,
            loading1: false,
            isShowPhone: false,
            isChangeOk: false,
            form: {},
            employeeNameList: [],
            serviceProvider: '',
            locationId: "",
            employeeId:""
        };
    },
    methods: {
        //使用人员select2模糊查询接口
        remoteMethod(query) {
            if (query !== "") {
                this.loading1 = true;
                let params = {
                    name: query
                };
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
        doEdit() {
            this.$refs.editModal.validate(valid => {
                if (valid) {
                    // 校验通过
                    let form = {
                        id: this.form.id,
                        telephoneNumber: this.form.telephoneNumber,
                        telephoneShortNumber: this.form.telephoneShortNumber,
                        locationId: this.form.locationId,
                        employeeId: this.form.employeeId,
                        transferCellphone: parseInt(this.form.transferCellphone),
                        cellphoneNumber: this.isShowPhone?this.form.cellphoneNumber:"",
                        remarks: this.form.remarks
                    };
                    phoneNumberModify(form).then(res => {
                        if (res.data.status == "200") {
                            this.$Message.success("修改成功！");
                            this.loading = false;
                            this.showModal = false;
                            this.$emit("hide-modal");
                        } else {
                            this.$Message.warning(resp.data.message);
                        }
                    });
                }else{
                  console.log("验证没通过")
                }
            });
        },
        setForm () {
          this.form = Object.assign({}, this.editData);
          let s = this.form.employeeName+"("+this.form.employeeOrganizationName+")";
          this.employeeNameList=[{
            label:s,
            value:this.form.employeeId
          }]
          //console.log(this.form);
        },
        doCancel() {
            this.$emit("hide-modal");
            this.$refs.editModal.resetFields();
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
            this.form.telephoneNumber = "";
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
        }
    },
    watch: {
        showEditModal(newVal, oldVal) {
            this.showModal = newVal;
        },
        editData(val) {
          
            this.form = Object.assign({}, val);
            this.form.transferCellphone += "";
            
            if (this.form.transferCellphone === "1") {
                this.isShowPhone = true;
                this.isChangeOk = true;
            }
            //this.form = Object.assign({}, this.editData);
          
            if (
                this.form.employeeName !== "" &&
                this.form.employeeName !== null &&
                this.form.employeeName !== undefined
            ){
              let s = val.employeeName+"("+val.employeeOrganizationName+")";
              this.employeeNameList=[{
                label:s,
                value:val.employeeId
              }]
              // select_employee({name: val.employeeName}).then(res => {
              //   const list1 = JSON.parse(res.response).map(item => {
              //       return {
              //           value: item.id,
              //           label: item.text
              //       };
              //   });
              //   this.employeeNameList = list1;
              //  // this.form.employeeId = val.employeeId;
                      
              // });
              
               
            }

            
            
            //转换服务商
            this.serviceProvider = this.form.serviceProvider === 1 ? '电信' : (this.form.serviceProvider === 2) ? '移动' : (this.form.serviceProvider === 3) ? '联通' : ''
            //转换归属地
            this.locationId =
                this.form.locationId === 1
                    ? "张店"
                    : this.form.locationId === 2
                        ? "临淄"
                        : this.form.locationId === 3 ? "上海" : "";
        }
    },
    mounted() {
      let s = this.form.employeeName+"("+this.form.employeeOrganizationName+")";
      this.employeeNameList=[{
        label:s,
        value:this.form.employeeId
      }]
    },
};
</script>
