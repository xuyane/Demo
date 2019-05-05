<template>
   <Modal v-model="showModal"  title="编辑限时配置" @on-ok="doEdit" :loading="loading" @on-cancel="doCancel"  width="450">
        <Form ref="form" :model="form" :rules="addRules" :label-width="100">
            <FormItem label="限时类型" >
                <Row>
                  <Col span='8'>
                    <RadioGroup v-model="limitTimeType">
                      <Radio label="0">全局</Radio>
                      <Radio label="1" >局部</Radio>
                    </RadioGroup>
                  </Col>
                  <Col span='12'>
                    <Input type="text" v-if='isShowDept' v-model="form.dept" class="search-input" @on-focus='showtreeModal' readonly></Input>
                  </Col>
                </Row>               
                <Modal
                    v-model="modaltree"
                    title="请选择部门"
                    @on-ok="bmok"
                    @on-cancel="bmcancel" style="z-index:10000;position:absolute" class="tree">
                    <Tree :data="datatree" @on-select-change="selected"  ></Tree>
                </Modal>
            </FormItem>
            <FormItem label="指定时间" >
                <Col >
                    <RadioGroup v-model="fixTime">
                        <Radio label="10">10s</Radio>
                        <Radio label="20" >20s</Radio>
                        <Radio label="30">30s</Radio>
                        <Radio label="40" >40s</Radio>
                        <Radio label="other">其他</Radio>
                    </RadioGroup>
                    <div  v-show='isShowLimitTime'>
                    <Input-number :max="999" :min="1" v-model="showTimeModal" style="width: 168px"></Input-number>
                    </div>
                </Col>
            </FormItem>
        </Form>
        <Spin size="large" fix v-if="spinShow"></Spin>
  </Modal>
</template>

<script>
import axios from "axios";
import { updateTimeConfig,orgTree } from "../../../components/axios/crm.js";
import { formData } from "../../../../assets/js/common.js";
export default {
  name: "editFixTimeConfigModal",
  data() {
    return {
      spinShow:false,
      datatree: [],
      modaltree: false,
      isShowLimitTime: false,
      isShowDept: false,
      showTimeModal: 0,
      showModal: false,
      appointTime: "",
      fixTimeConfig: "",
      addRules: {},
      limitTimeType: "0",
      fixTime: "",
      form: {},
      dept: "",
      loading: true,
      addRules: {},
      cityList: [
        {
          value: "22",
          label: "销售部"
        },
        {
          value: "23",
          label: "研发部"
        },
        {
          value: "24",
          label: "产品部"
        }
      ]
    };
  },
  props: {
    showEditModal: Boolean,
    editData: Object
  },
  methods: {
    showtreeModal() {
      this.modaltree = true;
    },
    // 部门取消
    bmcancel() {
      // this.$refs.autoipt.focus();
    },
    //点击部门
    selected(data) {
      this.selectedbm = data;
      this.form.deptId = data[0].id;
      this.form.dept = data[0].title;
      this.modaltree = false;
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
    setForm() {
      this.form = Object.assign({}, this.editData);
    },
    doCancel() {
      this.$emit("hide-edit-modal");
      //this.$refs.editModal.resetFields()
    },
    //保存配置
    doEdit() {
      var that = this;
      var time = "";
      var deptId = "";
      if (that.limitTimeType == 0) {
        deptId = 0;
      } else {
        deptId = that.form.deptId;
      }

      if (that.fixTime == "other") {
        time = that.showTimeModal;
      } else {
        time = that.fixTime;
      }

      let form = {
        id: that.form.id,
        deptId: deptId,
        num: time
      };
      // axios.post("/crm/sysconfiglimit/updateTimeConfig",form).then(function(res){
      //     if(res.data.status == 200){
      //         that.$Message.warning("修改成功");
      //         that.loading =false;
      //         that.$emit('hide-edit-modal')
      //         that.$emit('query')
      //     }else{
      //         that.$Message.warning(res.data.message);
      //     }
      // })
      that.spinShow=true;
      updateTimeConfig(form).then(res => {
        that.spinShow=false;
        that.$Message.info("修改成功");
        that.loading = false;
        that.$emit("hide-edit-modal");
        that.$emit("query");
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
            children: this.breedDigui(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
            disableCheckbox: false,
            expand: false
          };
        }
      });
      return dgData;
    }
  },
  watch: {
    showEditModal(newVal, oldVal) {
      this.showModal = newVal;
      if(newVal){
        this.tree();
      }
    },
    editData(newVal, oldVal) {
      var that = this;
      that.form = Object.assign({}, newVal);
      that.deptId = this.form.deptId;
      that.creatorId = this.form.creatorId;
      if (this.editData.num > 40) {
        that.fixTime = "other";
        that.showTimeModal = this.editData.num;
      } else {
        that.fixTime = this.editData.num.toString();
      }
      if (this.editData.deptId == 0) {
        that.limitTimeType = "0";
      } else {
        that.limitTimeType = "1";
        that.dept = this.editData.deptId.toString();
        that.form.dept = this.editData.deptName;
        that.form.deptId=this.editData.deptId;
      }
    },
    fixTime(val) {
      if (val == "other") {
        this.isShowLimitTime = true;
      } else {
        this.isShowLimitTime = false;
      }
    },
    limitTimeType(val) {
      if (val == 1) {
        this.isShowDept = true;
      } else {
        this.isShowDept = false;
      }
    }
  }
};
</script>


