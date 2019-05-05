<style lang="less" scoped>
// @import './phone.less';
.no-margin-left {
  margin-left: 0;
}
</style>

<template>
  <Row class="phone">
    <Col span="24">
    <Row class-name="current-position">
      当前位置：
        <router-link to="/plantIndex" class="link-css">呼叫中心</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/blackList" class="link-css"> 黑名单管理</router-link>
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :model="form" :label-width="80">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="电话号码:">
          <Input v-model="form.telephoneNumber" class="search-input" placeholder="请输入电话号码"></Input>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <Button type="primary" @click="searchList">查询</Button>
        <Button style="margin-left: 8px" @click="reset">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <div class="btn-container no-margin-left">
        <Button type="primary" class="" @click="addBlack">添加黑名单</Button>
      </div>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">

      </Table>
      <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </Row>
    </Col>
    <Modal v-model="showModal" title="添加黑名单" width="570">
      <Form ref="addForm" :model="addForm" :rules="addRules" :label-width="120">
        <FormItem label="电话号码" prop="telephoneNumber">
          <Input v-model="addForm.telephoneNumber" class="search-input" placeholder="请输入电话号码"></Input>
        </FormItem>
        <FormItem label="说明" prop="remarks">
          <Input v-model="addForm.remarks" type="textarea" class="search-textarea" :autosize="{minRows: 2,maxRows: 7}"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showModal=false">取消</Button>
        <Button type="primary" @click="doAdd">确定</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
import axios from "axios";
import oilPage from "../components/page/page.vue";
export default {
  name: "blackList",
  components: {
    oilPage
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
    const validateMarks = (rule, value, callback) => {
      if (value.toString().length > 200) {
        callback(new Error("说明内容不能超过200字符"));
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
        remarks: [
          {
            required: true,
            message: "请输入说明",
            trigger: "change"
          },
          { validator: validateMarks, trigger: "change" }
        ]
      },
      form: {
        telephoneNumber: "" // 电话号码
      },
      addForm: {
        telephoneNumber: "",
        remarks: ""
      },
      loading: true,
      showModal: false,
      telephoneNumber: "",
      remarks: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      columns: [
        {
          key: "id",
          title: "序号",
          align: "center",
          width: 70
        },
        {
          key: "telephoneNumber",
          align: "center",
          title: "禁止呼叫号码",
          width: 160
        },
        {
          key: "remarks",
          align: "center",
          title: "说明",
          tooltip: true,
          ellipsis: true,
          minWidth: 880
        },
        {
          title: "操作",
          align: "center",
          width: 150,
          render: (h, data) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteData(data);
                    }
                  }
                },
                "删除 "
              )
            ]);
          }
        }
      ],
      tableData: [
        {
          key: "x1"
        },
        { key: "x2" },
        { key: "x3" }
      ]
    };
  },
  methods: {
    query() {
      let form = {
        telephoneNumber: this.form.telephoneNumber,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      let _this = this;
      axios({
        url: "/callcenter/call-center/callblacklist/page",
        method: "get",
        params: form
      })
        .then(function(resp) {
          _this.tableData = resp.data.response.list;
          _this.total = resp.data.response.total;
        })
        .catch(function(err) {
          _this.$Message.warning(err.message);
        });
    },
    reset() {
      this.form = {
        telephoneNumber: "" // 电话号码
      };
    },
    deleteData(data) {
      let _this = this;
      var config = {
        title: "删除",
        content: "确认删除该配置？",
        onOk: function() {
          let form = "ids[]=" + data.row.id;
          axios({
            url: "/callcenter/call-center/callblacklist/remove",
            method: "post",
            data: form
          })
            .then(function(resp) {
              if (resp.data.status == "200") {
                _this.query();
              } else {
                _this.$Message.warning(resp.data.message);
              }
            })
            .catch(function(err) {
              _this.$Message.warning(err.message);
            });
        }
      };
      this.$Modal.warning(config);
    },
    addBlack() {
      this.showModal = true;
      this.$refs.addForm.resetFields();
      this.addForm = {
        telephoneNumber: "",
        remarks: ""
      };
    },
    doAdd() {
      let _this = this;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 校验通过
          let form = {
            telephoneNumber: this.addForm.telephoneNumber,
            remarks: this.addForm.remarks,
            creatorId: "0",
            creatorName: "900",
            createTime: "0",
            operatorId: "0",
            operatorName: "",
            lastAccess: 0,
            version: 0
          };
          axios({
            url: "/callcenter/call-center/callblacklist/add",
            method: "post",
            data: form
          })
            .then(function(resp) {
              if (resp.data.status == "200") {
                _this.$Message.success("新增成功！！！");
                _this.showModal = false;
                _this.addForm = {
                  telephoneNumber: "",
                  remarks: ""
                };
                _this.$refs.addForm.resetFields();
                _this.query();
              } else {
                _this.$Message.warning(resp.data.message);
              }
            })
            .catch(function(err) {
              _this.$Message.warning(err.message);
            });
        }
      });
    },
    searchList: function() {
      this.pageChange(1, 10);
    },
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.query();
    }
  },
  mounted() {
    this.query();
  }
};
</script>
