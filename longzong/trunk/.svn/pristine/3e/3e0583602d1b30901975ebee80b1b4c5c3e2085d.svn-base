<template>
  <Modal v-model="showModal" :title="modalTitle" width="750" @on-ok="onOk" @on-visible-change="visibleChange">
    <Form ref="phoneMapModal_form" :label-width="150" :model="formValue" :rules="ruleValidate">
      <FormItem label="使用人员" prop="employeeId">
        <Select
          filterable
          remote
          label-in-value
          v-model="formValue.employeeId"
          :remote-method="remoteMethod"
          :loading="loading1"
          @on-change="onSelectChange">
          <Option v-for="item in employees" :value="item.value" :key="item.value">{{item.label}}</Option>
        </Select>
      </FormItem>


      <FormItem label="钢联管理员ID" prop="glAdminId">
        <!-- <Input class="search-input" placeholder="请输入钢联管理员ID" v-model.trim="formValue.glAdminId"></Input> -->
        <Dropdown trigger="click" style="width: 100%;" @on-click="selectGlId">
          <Input class="search-input" v-model.trim="formValue.glAdminId" placeholder="请输入钢联管理员ID"  ref="glAdminId"/>
          <DropdownMenu slot="list">
            <DropdownItem v-if="!glAdminIds.length" name="">暂无匹配数据</DropdownItem>
            <DropdownItem v-else v-for="item in glAdminIds" :key="item.adminId" :name="item.adminId">{{item.adminId}}——{{item.adminName}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </FormItem>
      <FormItem label="电话号码" prop="telephoneNumber">
        <Input class="search-input" placeholder="请输入电话" v-model.trim="formValue.telephoneNumber"></Input>
      </FormItem>
      <FormItem label="座机短号" prop="telephoneShortNumber">
        <Input class="search-input" placeholder="请输入座机短号" v-model.trim="formValue.telephoneShortNumber"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="onCancel">取消</Button>
      <Button type="primary" @click="onOk">确定</Button>
    </div>
  </Modal>
</template>

<script>
  import {select_employee} from "../../components/axios/phoneCenter.js";
  import {getGlAdminIds} from "../../components/axios/phoneCenter";
  import axios from 'axios';


  export default {
    name: "phoneMapModal",
    props: {
      showPhoneMapModal: {
        type: Boolean,
        default: false
      },
      modalType: {
        type: String,
        detault: 'save'
      },
      phoneInfo: Object
    },
    data() {
      return {
        showModal: false,

        // 远程搜索
        loading1: false,
        employees: [],
        glAdminIds: [],

        formValue: {
          id: '',
          employeeId: '',
          glAdminId: '',
          employeeName: '',
          telephoneNumber: '',
          telephoneShortNumber: ''
        },
        ruleValidate: {
          /*  employeeId: [
              { required: true, message: '请选择员工', trigger: 'change' }
            ],*/
          glAdminId: [
            { required: true, message: '此项必填', trigger: 'change' }
          ],
          telephoneNumber: [
            { required: true, message: '此项必填', trigger: 'blur' }
          ],
          telephoneShortNumber: [
            { required: true, message: '此项必填', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
    },
    computed: {
      modalTitle() {
        return this.modalType === 'save' ? '新增话机' : '修改话机';
      }
    },
    watch: {
      showPhoneMapModal(newVal) {
        if (this.modalType === 'save') {
          this.$refs['phoneMapModal_form'].resetFields();
          this.formValue.id = '';
        }
        this.showModal = newVal;
      },
      phoneInfo(newVal){
        if(newVal){
          for(const attr in this.formValue){
            let item = newVal[attr];
            if (item) {
              this.formValue[attr] = item;
            }
            this.formValue.glAdminId=String(this.formValue.glAdminId)
          }
        }
      },

      /*'formValue': {
        handler(newVal) {
          if (this.modalType === 'save') return;
          if (!newVal.employeeId) {
            this.formValue.employeeId = this.phoneInfo['employeeId'];
          }
        },
        deep: true
      }*/

      'formValue.employeeId'(newVal) {
        if (this.modalType === 'save') return;
        if (!newVal) {
          this.formValue.employeeId = this.phoneInfo['employeeId'];
        }
      }
    },
    methods: {
      onOk(){
        this.formValue.glAdminId=String( this.formValue.glAdminId)
        this.$refs['phoneMapModal_form'].validate(valid => {
          if (!this.formValue['employeeId']) {
            this.$Modal.warning({
              title: '请选择一位员工'
            });
            return;
          }
          if (valid) {
            this.$emit(this.modalType, this.formValue);
          }
        });
      },


      onCancel(){
        this.visibleChange(false);
      },
      visibleChange(status){
        /* if (!status) {
           this.$refs['phoneMapModal_form'].resetFields();
           this.formValue.id = '';
         }*/
//        this.showModal = false;
        if (!status) {
          this.$emit('visible-change', status);
        }
      },


      remoteMethod(keyword) {
        let searchWord = null;
        if (Number(keyword) === this.formValue.employeeId) {
          searchWord = this.formValue.employeeName;
        }else {
          searchWord = keyword;
        }
        const index = searchWord.indexOf('(');
        if (index !== -1) {
          searchWord = searchWord.slice(0, index);
        }

        if (searchWord) {
          this.loading1 = true;
          this.getEmployees(searchWord);
        } else {
          this.employeeNameList = [];
        }
      },

      onSelectChange(employee){
        if (employee) {
          this.formValue.employeeName = employee.label;

          let name = employee.label;
          const index = employee.label.indexOf('(');
          if (index !== -1) {
            name = employee.label.slice(0, index);
            getGlAdminIds({ name }).then(res => {
              this.glAdminIds = JSON.parse(res.response);
            });
         /*   axios.get('/cmsweb/searchAdmin4Lz.ms', {
              params: { name }
            }).then(res => {
              this.glAdminIds = res.data;
            })*/
          }
        }
      },

      selectGlId(name) {
        // this.$refs['glAdminId'].focus();
        name=String(name)
        this.formValue.glAdminId = name || '';
        // this.$refs['glAdminId'].blur();
      },

      // 获取员工集合
      getEmployees(keyword = ''){
        select_employee({ name: keyword }).then(res => {
          this.employees = JSON.parse(res.response).map(item => {
            return {
              value: item.id,
              label: item.text
            };
          });
          this.loading1 = false;
        });
      }
    }
  };
</script>
