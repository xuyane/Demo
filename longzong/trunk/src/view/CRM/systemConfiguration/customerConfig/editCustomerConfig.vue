<template>
   <Modal v-model="showModal"  title="编辑客户数配置"   @on-cancel="doCancel"  width="400">
    <Form ref="form" :model="form" :rules="addRules" :label-width="80">
        <FormItem label="部门" prop="dept" >
          <!-- <Input-number :max="999" :min="0" v-model="form.dept" class="search-input"></Input-number> -->
          <Input type="text" v-model="form.dept" class="search-input" :autofocus='autofocus' @on-focus='showtreeModal' readonly ref='autoipt'></Input>
          <Modal
        v-model="modaltree"
        title="请选择部门"
        @on-ok="bmok"
        @on-cancel="bmcancel" style="z-index:10000;position:absolute" class="tree">
        <Tree :data="datatree" @on-select-change="selected"  @on-check-change='selectbm' :multiple='false'></Tree>
    </Modal>
        </FormItem>
        <FormItem label="业务员" prop="adminId"  class="produce">
          <!-- <FormItem label="业务员姓名:" prop='adminId' class="produce"> -->
                <!-- <Select
                    v-model="form.adminId"     
                    filterable
                    remote
                    ref='selectref'
                    @on-query-change="remoteMethod2"
                    :loading="loading2">
                    <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
                </Select> -->
              <!-- </FormItem> -->
          <Select v-model="form.adminId"  >
            <Option v-for="item in adminList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="范围" prop="num">
          <Input-number :max="999" :min="1" v-model="form.num" class="search-input"></Input-number>
        </FormItem>
      </Form>
      <div slot="footer">
                <Button type="text" size="large" @click="doCancel">取消</Button>
                <Button type="primary" size="large" @click="doEdit">确定</Button>
            </div>
  </Modal>
</template>

<script>
import axios from "axios";
import {
  saveCustomer,
  orgTree,
  updateCustomer,
  queryAdminListByOrgId,
  queryAdminListByOrgCode //业务员
} from "../../../components/axios/crm.js";
import { formData } from "../../../../assets/js/common.js";
export default {
  name: "editCustomerModal",
  data() {
    return {
      modaltree: false,
      adminList: [
        {
          id: "",
          name: ""
        }
      ],
      autofocus: false,
      loading2: false,
      options2: [],
      datatree: [],
      hadselectbm: [],
      selectedbm: [],
      addRules: {
        dept: [{ required: true, message: "请输入部门", trigger: "change" }],
        adminId: [
          {
            required: true,
            type: "number",
            message: "请输入业务员",
            trigger: "blur"
          }
        ],
        num: [
          {
            required: true,
            type: "number",
            message: "请输入范围",
            trigger: "blur"
          }
        ]
      },
      showModal: false,
      loading: true,
      form: {
        dept: "", // 部门
        adminId: 0, // 业务员
        num: 0 // 范围
      }
    };
  },
  props: {
    showEditModal: Boolean,
    editData: Object
  },
  methods: {
    //点击部门
    selected(data) {
      this.selectedbm = data;
      this.form.deptId = data[0].id;
      this.form.dept = data[0].title;
      this.modaltree = false;
      this.adminList = [];
      this.form.adminId = "";
      this.getsimlidt(data[0].value);
      data[0].selected = !data[0].selected;
    },
    getsimlidt(data) {
      let msg = {
        orgCode: data
      };
      queryAdminListByOrgCode(msg).then(resp => {
        this.adminList = resp.response;
      });
    },
    //新增多选业务员
    remoteMethod2(query) {
      if (query !== "" || query != null) {
        if (query.indexOf("(") != -1) {
          query = query.split("(")[0];
        }
        this.loading2 = true;
        setTimeout(() => {
          let data = {
            adminName: query
          };
          let that = this;
          adminListName(data).then(resp => {
            this.loading2 = false;
            const list = resp.response.map(item => {
              return {
                value: item.id,
                label: item.name + "(" + item.mobile + ")"
              };
            });
            that.options2 = list.filter(
              item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    showtreeModal() {
      this.modaltree = true;
    },
    // 部门复选框
    selectbm(data) {
      this.hadselectbm = data;
    },

    // 部门取消
    bmcancel() {
      // this.$refs.autoipt.focus();
    },
    // 部门ok
    bmok() {
      if (this.hadselectbm.length != 0) {
        var namelist = this.hadselectbm.map(item => {
          return item.title;
        });
        this.form.adminDeptId = this.hadselectbm.map(item => {
          return item.id;
        });
        this.form.deptId = this.form.adminDeptId;
        this.form.dept = namelist.join("/");
      } else {
        this.form.adminDeptId = [];
        this.form.dept = "";
      }
      // this.$refs.autoipt.focus();
    },
    cancel() {
      this.$emit("hide-edit-modal");
      // this.form = {};
      // this.$refs.form.resetFields();
      // this.form = {
      //   dept: "", // 部门
      //   adminId: [], // 业务员
      //   num: 500 // 范围
      // };
    },
    setForm(data) {
      this.form = Object.assign({}, data);
      this.form.dept = data.deptName;
      this.form.deptId = data.deptId;
      this.form.adminId = data.adminId;
      this.adminList = [
        {
          id: "",
          adminId: ""
        }
      ];
      this.adminList[0].id = data.adminId;
      this.adminList[0].name = data.adminName;
      
      this.form.adminId = data.adminId;
      this.getadminList(data.deptId)
      // this.$refs.selectref.query = data.adminName;
    },
    getadminList(a) {
      let msg = {
        orgId: a
      };
      let that = this;
      queryAdminListByOrgId(msg).then(resp => {
        that.adminList = resp.response;
      });
    },
    doCancel() {
      this.$emit("hide-edit-modal");
      //this.$refs.editModal.resetFields()
    },
    //保存配置
    doEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let that = this;
          let params = {
            id: that.form.id,
            deptId: that.form.deptId,
            adminId: that.form.adminId,
            num: that.form.num
          };
          // var params = new URLSearchParams();
          // params.append('id', that.form.id);
          // params.append('deptId', that.form.deptId);
          // params.append('adminId', that.form.adminId);
          // params.append('num', that.form.num);
          //   axios
          //     .post("/crm/sysconfiglimit/updateCustomer", params)
          //     .then(function(res) {
          //       if (res.data.status == 200) {
          //         that.$Message.warning("修改成功");
          //         that.loading = false;
          //         that.$emit("hide-edit-modal");
          //         that.$emit("query");
          //       } else {
          //         that.$Message.warning(res.data.message);
          //       }
          //     });
          updateCustomer(params).then(res => {
            that.$Message.info("修改成功");
            that.loading = false;
            that.$emit("hide-edit-modal");
            that.$emit("query");
          });
        } else {
          //  this.$Message.error("Fail!");
        }
      });
    },
    tree() {
      orgTree().then(resp => {
        // this.datatree=resp.response;
        var a = JSON.parse(resp.response);
        this.datatree = this.breedDigui(a);
      });
    },
    breedDigui(data) {
      let dgData = data.map(item => {
        if (item.children && item.children.length > 0) {
          return {
            title: item.label,
            // disableCheckbox: false,
            id: item.id,
            expand: false,
            value: item.value,
            children: this.breedDigui(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
            disableCheckbox: false,
            expand: false,
            value: item.value
          };
        }
      });
      return dgData;
    }
  },
  watch: {
    showEditModal(newVal, oldVal) {
      this.showModal = newVal;
    }
  },
  created() {
    this.tree();
  }
};
</script>


