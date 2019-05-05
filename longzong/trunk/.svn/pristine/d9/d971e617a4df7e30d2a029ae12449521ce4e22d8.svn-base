<style lang="less" scoped>
.my-account-out .my-customer-top {
  padding-left: 15px !important;
}
.mar-top-20 {
  margin-top: 20px;
}
.btn-text {
  text-align: right;
  padding: 30px 0px 0px 0;
  span {
    margin-left: 20px;
  }
  i {
    font-style: normal;
  }
}
.my-account-conter {
  background: #fff;
}
.p-text {
  text-align: center;
}
.mar-left-36 {
  margin-left: 36px;
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
.file-box {
  position: relative;
  width: 340px;
}
.txt {
  height: 36px;
  border: 1px solid #605f5f;
  width: 180px;
  padding-left: 10px;
  margin-left: 14px;
}
.btn {
  background-color: #fff;
  border: 1px solid #605f5f;
  height: 36px;
  width: 66px;
}
.file {
  position: absolute;
  top: 0;
  right: 80px;
  height: 36px;
  opacity: 0;
  width: 260px;
  cursor: pointer;
}

 .page {
    margin: 10px 0;
    text-align: right;
   padding-right: 18px;
  }
</style>



<template>
   <Row class="my-account-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;待办任务
      </Row>
    </Col>

    <Col span="24" class-name="search-form">
        <Row class="my-customer-top mar-b-20">
            <top-account></top-account>
        </Row>

        <Form :label-width="100" ref='processForm' :model="formData">
            <Row type="flex" justify="space-between">
            <Col span="7">
                <FormItem label="流程KEY:">
                    <Input  class="search-input" v-model="formData.processDefKey"></Input>
                </FormItem>
            </Col>

            <Col span="7">
                <FormItem label="业务ID:">
                    <Input-number  class="search-input" v-model="formData.businessId"></Input-number>
                </FormItem>
            </Col>
            <Col span="7">
                <FormItem label="业务KEY:">
                    <Input  class="search-input" v-model="formData.businessKey"></Input>
                </FormItem>
            </Col>

            </Row>

            <Row type="flex" justify="space-between">
            <Col span="7">
            </Col>
            <Col span="7" class="text-right">
                <Button type="primary" @click="searchTask">查询</Button>
                <Button style="margin-left: 8px" @click="reset">重置</Button>
            </Col>
            </Row>
        </Form>
    </Col>
    <Col span="24" class="mar-top-20">
        <Row class-name="table-con">
          <Table :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
            <div class="page" slot="footer">
              <Page :total="dataCount" show-elevator show-total show-sizer :page-size="formData.pageSize"
:page-size-opts="pageSizeOpt" @on-change="changePageNum" @on-page-size-change="changePageSize" />
            </div>
          </Table>
        </Row>
    </Col>


     <Modal v-model="showModal"  title="切换" @on-ok="doAdd"  @on-cancel="closeShowModel" width="570">

      <Form ref="addForm" :model="addForm" :label-width="120">
        <FormItem label="原审批人:" prop="name"  >
          <Input v-model="addForm.assignee" class="search-input" readonly></Input>
        </FormItem>
         <FormItem label="新审批人:" :label-width="120">
                    <Select
                        v-model="value4"
                        filterable
                        remote
                        :remote-method="newQueryEmployee"
                        :loading="loading"
                        class="form-select"
                        style="margin-left: 10px"
                        placeholder="请选择新审批人">
                        <Option v-for="(option, index) in employeeList" :value="option.id" :key="index">{{option.name}}</Option>
                    </Select>
        </FormItem>
      </Form>
    </Modal>
  </Row>
</template>

<script>
import axios from "axios";
import topAccount from "./processTop.vue";
import { statusZero } from '../../components/axios/workflow.js'
export default {
  name: "myAccountIndex",
  components: {
    topAccount
  },
  data() {
    return {
      formData: {
        page: 1,
        pageSize: 10,
        processDefKey: "",
        businessId: null,
        businessKey: ""
      },
      // value1: '', // 流程KEY
      // value2: null, // 产品分类
      // value3: '', // 业务归属品种
      value4: "", // 新审批人
      value5: "", // taskId
      addForm: {
        taskId: "",
        remarks: ""
      },

      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号"
        },
        {
          key: "id",
          align: "center",
          title: "任务ID"
        },
        {
          key: "name",
          align: "center",
          title: "任务名称"
        },
        {
          key: "processName",
          align: "center",
          title: "流程名称"
        },
        {
          key: "businessId",
          align: "center",
          title: "业务ID"
        },
        {
          key: "businessKey",
          align: "center",
          title: "业务KEY"
        },
        {
          key: "assignee",
          align: "center",
          title: "办理人"
        },
        {
          key: "createTime",
          align: "center",
          title: "创建时间"
        },
        {
          title: "操作",
          align: "center",
          width: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      //console.log(data.row);
                      this.$router.push({
                        path: "/processDetail",
                        query: {
                          id: data.row.id,
                          instanceId: data.row.instanceId,
                          businessId: data.row.businessId
                        }
                      });
                    }
                  }
                },
                "办理"
              ),

              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      console.log(data.row)
                      this.openShowModal(data);
                    }
                  }
                },
                data.row == null ||
                data.row.adminIds == null ||
                data.row.adminIds.length != 1
                  ? ""
                  : "切换"
              )
            ]);
          }
        }
      ],
      tableData: [],
      showSizer: true,
      dataCount: 0,
      pageSizeOpt: [10, 20, 50],
      value1: "",
      value2: null,
      value3: "",
      showModal: false,
      selectRow: [],
      employeeList: [],
      loading: false
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    reset() {
      this.formData.processDefKey = '';
      this.formData.businessId = null;
      this.formData.businessKey = '';   
    },

    openShowModal(data) {
      //打开切换弹窗
      this.addForm.assignee = data.row.assignee;
      this.value5 = data.row.id;
      this.showModal = true;
    },
    closeShowModel() {
      this.showModal = false;
      this.value4 = "";
      this.value5 = "";
      this.employeeList = [];
    },
    doAdd() {
      axios({
        url: "/mysteel/workflow/task/switch",
        method: "get",
        params: {
          taskId: this.value5,
          employeeId: this.value4
        }
      })
        .then(resp => {
          statusZero(resp.data.status)
          if (resp.data.success == true) {
            this.$Message.success("切换成功");
          } else {
            this.$Message.success("切换失败");
          }
          this.value4 = "";
          this.value5 = "";
          this.employeeList = [];
          // 刷新页面
          this.searchTask();
        })
        .catch(err => {
          console.log(err);
        });
    },
    clear() {
      this.$Message.success("重置成功");
    },
    getListData() {
      this.$Spin.show();

      axios({
        url: "/mysteel/workflow/task/todo",
        method: "get",
        params: this.formData
      })
        .then(resp => {
          statusZero(resp.data.status)
          // console.log(resp)
          this.tableData = resp.data.data.list;
          this.dataCount = resp.data.data.total;
          this.$Spin.hide();
        })
        .catch(err => {
          console.log(err);
          this.$Spin.hide();
        });
    },
    changePageNum(current) {
      this.formData.page = current;
      this.getListData();
    },
    // 监听修改显示条数
    changePageSize(size) {
      this.formData.pageSize = size;
      this.getListData();
    },
    searchTask() {
      this.getListData();
      /*
             var that = this;
             that.$Spin.show();
            axios({
                url: '/mysteel/workflow/task/todo',
                method: 'get',
                params:{
                    page: this.pageNum,
                    pageSize: this.pageSize,
                    processDefKey:this.value1,
                    businessId:this.value2,
                    businessKey:this.value3
                }

            }).then(function(resp) {
                        // console.log(resp);
                        that.tableData = resp.data.data.list;
                        that.dataCount = resp.data.data.total;
                        that.$Spin.hide();

            }).catch(err => {
                console.log(err);
                that.$Spin.hide();
            })
            */
    },
    newQueryEmployee(query){
      const self = this;
      if(query !== ''){
        this.loading = true;
        axios.get('/mysteel/workflow/user/list',{params:{userName:query}})
        .then((res)=>{
          statusZero(res.data.status)
          this.loading = false;
          self.employeeList = res.data.list;
          console.log(res.data.list)
        })
        .catch((error)=>{
          this.loading = false;
            console.log(err);
        })
      }else{
        this.employeeList = [];
      }
    },
    // 远程搜索的方法
    queryEmployee(query) {
      const self = this;
      if (query !== "") {
        this.loading = true;
        axios
          .get(
            "http://api.banksteel.com/erp/manage/base_data/select/employee",
            {
              params: {
                param: query
              }
            }
          )
          .then(res => {
            this.loading = false;
            self.employeeList = res.data;
            console.log(self.employeeList)
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      } else {
        this.employeeList = [];
      }
    }
  }
};
</script>






