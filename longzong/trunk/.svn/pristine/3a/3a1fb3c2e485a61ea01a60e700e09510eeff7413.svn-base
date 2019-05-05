<template>
  <Modal v-model="showModal" title="新增电话号码" width="750" @on-cancel="doCancel">
    <Form ref="addForm" :model="form" :rules="addRules" :label-width="150">
      <FormItem label="电话号码" prop="telephoneNumber" >
        <Input v-model="form.telephoneNumber" class="search-input" placeholder="请输入电话号码" @on-keyup="showThreeShort"></Input>
      </FormItem>
      <FormItem label="短号" prop="telephoneShortNumber">
        <Input v-model="form.telephoneShortNumber" class="search-input" placeholder="请输入短号"></Input>
      </FormItem>
      <FormItem label="服务商" prop="serviceProvider">
        <Select v-model="form.serviceProvider" class="form-select" placeholder="请选择号码归属地">
          <Option value="1">电信</Option>
          <Option value="2">移动</Option>
          <Option value="3">联通</Option>
        </Select>
      </FormItem>
      <FormItem label="号码归属地" prop="locationId">
        <Select v-model="form.locationId" class="form-select" placeholder="请选择号码归属地">
          <Option value="1">张店</Option>
          <Option value="2">临淄</Option>
          <Option value="3">上海</Option>
        </Select>
      </FormItem>
      <FormItem label="使用人员">
        <Select v-model="form.employeeId" clearable filterable remote :remote-method="remoteMethod" :loading="loading1" @on-change="changeUser" @on-clear="clearEmploy">
          <Option v-for="(option, index) in employeeNameList" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
        <div class="user-list" v-show="userList.length > 0">
          <span v-for="(item, index) in userList" :key="index">{{item.name}}({{item.deptName}})</span>
        </div>
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
      <Button type="primary" @click="doAdd">确定</Button>
    </div>
  </Modal>
</template>

<script>
import axios from "axios";
import {
    phoneNumberAdd,
    select_employee,
    getPhone
} from "../components/axios/phoneCenter.js";
import { formData } from "../../assets/js/common.js";
export default {
    name: "addPhoneModal",
    props: {
        showAddModal: Boolean
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
            addRules: {
                telephoneNumber: [
                    {
                        required: true,
                        message: "请输入电话号码",
                        trigger: "change"
                    },
                    { validator: validatePhone, trigger: "change" }
                ],
                telephoneShortNumber: [
                    {
                        required: true,
                        message: "请输入短号",
                        trigger: "change"
                    }
                ],
                serviceProvider: [
                    {
                        required: true,
                        message: "请选择服务商",
                        trigger: "change"
                    }
                ],
                locationId: [
                    {
                        required: true,
                        message: "请选择归属地",
                        trigger: "change"
                    }
                ],
                cellphoneNumber: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    { validator: validatePhone, trigger: "change" }
                ]
            },
            showModal: false, // 是否关闭弹层
            isChangeOk: false, // 是否允许座机转手机可切换标知
            form: {
                telephoneNumber: "", // 电话号码
                telephoneShortNumber: "", // 短号
                serviceProvider: "", // 服务商
                locationId: "2", // 号码归属地 2:临淄, 1:张店, 3:上海',
                employeeId: "", // 使用人员
                transferCellphone: "0", // 是否允许座机转手机 1:是, 0:否',
                cellphoneNumber: "", // 手机号
                remarks: "" // 说明
            },
            employeeNameList: [],
            loading1: false,
            isShowPhone: false,
            isChooseUser: false,
            userList: [] //使用者list
        };
    },
    methods: {
        //输入手机号短号显示后三位
        showThreeShort(){
          let str = this.form.telephoneNumber;
          if(str!==""){
            this.form.telephoneShortNumber = str.substr(str.length-3)
          }
        },
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
                    this.employeeNameList = list1;
                });
            } else {
                this.employeeNameList = [];
            }
        },
        doAdd() {
            let _this = this;
            this.$refs.addForm.validate(valid => {
                console.log("开始验证",valid);
                if (valid) {
                    // 校验通过
                    let form = {
                        telephoneNumber: parseInt(this.form.telephoneNumber),
                        telephoneShortNumber: this.form.telephoneShortNumber,
                        locationId: this.form.locationId,
                        serviceProvider: this.form.serviceProvider,
                        employeeId: this.form.employeeId,
                        transferCellphone: this.form.transferCellphone,
                        cellphoneNumber: this.isShowPhone?this.form.cellphoneNumber:"",
                        remarks: this.form.remarks,
                        status: "0",
                        reason: "",
                        creatorId: "",
                        creatorName: "",
                        createTime: 0,
                        operatorId: "",
                        operatorName: "",
                        lastAccess: 0,
                        version: 0
                    };
                    console.log("接口调用")
                    phoneNumberAdd(form).then(res => {
                        console.log("验证通过",res)
                        this.$Message.success("新增成功！！！");
                        this.form = {
                            telephoneNumber: "", // 电话号码
                            telephoneShortNumber: "", // 短号
                            serviceProvider: "", // 服务商
                            locationId: "2", // 号码归属地 2:临淄, 1:张店, 3:上海',
                            employeeId: "", // 使用人员
                            transferCellphone: "0", // 是否允许座机转手机 1:是, 0:否',
                            cellphoneNumber: "", // 手机号
                            remarks: "" // 说明
                        };
                        this.isShowPhone=false;
                        this.$refs.addForm.resetFields();
                        this.$emit("hide-modal");
                   });
                }
            });
        },
        doCancel() {
            this.$emit("hide-modal");
            this.form = {
                telephoneNumber: "", // 电话号码
                telephoneShortNumber: "", // 短号
                serviceProvider: "", // 服务商
                locationId: "2", // 号码归属地 2:临淄, 1:张店, 3:上海',
                employeeId: "", // 使用人员
                transferCellphone: "0", // 是否允许座机转手机 1:是, 0:否',
                cellphoneNumber: "", // 手机号
                remarks: "", // 说明
            };
            this.isShowPhone=false;
            this.$refs.addForm.resetFields();
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
    },
    watch: {
        showAddModal(newVal, oldVal) {
            this.showModal = newVal;
        }
    }
};
</script>
