<style>
.produce .ivu-select-selection {
  height: auto !important;
}
</style>

<template>
   <Modal v-model="showModal"  title="新增客户数配置"  width="400"  @on-cancel="cancel">
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
                    multiple
                    remote
                    :remote-method="remoteMethod2"
                    :loading="loading2">
                    <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
                </Select> -->
              <!-- </FormItem> -->
            <Select v-model="form.adminId" multiple >
                <Option v-for="item in adminList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="范围" prop="num">
          <Input-number :max="999" :min="1" v-model="form.num" class="search-input"></Input-number>
        </FormItem>
      </Form>
      <div style="text-align: center;" class="btn-container" slot="footer">
        <Button type="primary" class="search-btn" @click="saveConfig">确定</Button>
        <Button  class="search-btn" @click="cancel">取消</Button>
      </div>
      
    </Modal>
</template>

<script>
import axios from "axios";
import {
  saveCustomer,
  orgTree,
  queryAdminListByOrgCode, //业务员
} from "../../../components/axios/crm.js";
import { formData } from "../../../../assets/js/common.js";
export default {
  name: "addCustomModal",
  data() {
    return {
      adminList:[],
      autofocus:false,
      loading2: false,
      options2: [],
      datatree: [],
      hadselectbm: [],
      selectedbm:[],
      addRules: {
        dept: [{ required: true, message: "请输入部门", trigger: "change" }],
        adminId: [
          {
            required: false,
            type: "array",
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
      modaltree: false,
      showModal: false,
      loading: true,
      form: {
        dept: "", // 部门
        adminId: [], // 业务员
        num: 500 // 范围
      }
    };
  },
  props: {
    showAddModal: Boolean
  },
  methods: {
    //点击部门
    selected(data){
      this.selectedbm=data;
      this.form.deptId=data[0].id;
      this.form.dept=data[0].title;
      this.modaltree=false;
      this.form.adminId=[];
      this.getsimlidt(data[0].value);
      data[0].selected = !data[0].selected;
    },
    getsimlidt(data){
      let msg={
        orgCode:data
      }
      queryAdminListByOrgCode(msg).then(resp=>{
          this.adminList=resp.response;
      })
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
      // if (this.hadselectbm.length != 0) {
      //   var namelist = this.hadselectbm.map(item => {
      //     return item.title;
      //   });
      //   this.form.adminDeptId = this.hadselectbm.map(item => {
      //     return item.id;
      //   });
      //   this.form.deptId=this.form.adminDeptId;
      //   this.form.dept = namelist.join("/");
      // } else {
      //   this.form.adminDeptId = [];
      //   this.form.dept = "";
      // }
      // this.$refs.autoipt.focus();
    },
    cancel() {
      this.$emit("hide-add-modal");
      this.form = {};
      this.$refs.form.resetFields();
      this.form= {
        dept: "", // 部门
        adminId: [], // 业务员
        num: 500 // 范围
      }
    },
    //保存配置
    saveConfig() {
      this.$refs.form.validate(valid => {
        if (valid) {
          var that = this;
          var time = "";
          let form = {
            adminIds: that.form.adminId,
            deptId: that.form.deptId,
            num: that.form.num
          };
          if(form.adminIds.length==0){
            delete form.adminIds
          }
          // axios
          //   .post("/crm/sysconfiglimit/saveCustomer", form)
          //   .then(function(res) {
          //     if (res.data.status == 200) {
          //       that.$Message.warning("新增成功");
          //       that.loading = false;
          //       that.$emit("hide-add-modal");
          //       that.$emit("query");
          //     } else {
          //       that.$Message.warning(res.data.message);
          //     }
          //   });
          saveCustomer(form).then(res => {
            that.$Message.info("新增成功");
            that.loading = false;
            that.$emit("hide-add-modal");
            that.$emit("query");
          });
        } else {
          // this.$Message.error("Fail!");
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
            value:item.value,
            children: this.breedDigui(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
            disableCheckbox: false,
            expand: false,
             value:item.value,
          };
        }
      });
      return dgData;
    }
  },
  watch: {
    showAddModal(newVal, oldVal) {
      this.showModal = newVal;
    },
  },
  created() {
    this.tree();
  }
};
</script>


