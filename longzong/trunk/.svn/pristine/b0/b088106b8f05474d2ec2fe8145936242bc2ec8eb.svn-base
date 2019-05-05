<style lang="less" scoped>
.plant-content {
  background: #fff;
  padding: 0 20px;
}
.sms-detail-con {
  height: 60px;
  min-height: 60px;
  line-height: 58px;
  white-space: nowrap;
  overflow: auto;
  text-align: center;
  font-size: 14px;
}
.top {
  border-top: 1px solid #000;
}
.bottom {
  border-bottom: 1px solid #000;
}
.left {
  border-left: 1px solid #000;
}
.right {
  border-right: 1px solid #000;
}
.margin-top-20 {
  margin-top: 20px;
}
.margin-bottom-5 {
  margin-bottom: 5px;
}
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：基础数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;企业库管理>>&nbsp;&nbsp;企业联系人
    </Row>
    </Col>
    <Col span="24" class="plant-content">
    <Row>
      <Col span="6">
      <p class="sms-detail-con left top">企业名称:</p>
      </Col>
      <Col span="6" class="sms-detail-con top left">{{enterpriseDetailList.name}}</Col>
      <Col span="6">
      <p class="sms-detail-con top left">简称:</p>
      </Col>
      <Col span="6" class="sms-detail-con top left right">{{enterpriseDetailList.shortName}}</Col>
    </Row>
    <Row>
      <Col span="6">
      <p class="sms-detail-con top left">企业类型:</p>
      </Col>
      <Col span="6" class="sms-detail-con top left">{{enterpriseDetailList.typeDesc}}</Col>
      <Col span="6">
      <p class="sms-detail-con top left">企业性质:</p>
      </Col>
      <Col span="6" class="sms-detail-con top right left">{{enterpriseDetailList.natrueDesc}}</Col>
    </Row>
    <Row>
      <Col span="6">
      <p class="sms-detail-con top left">联系电话:</p>
      </Col>
      <Col span="6" class="sms-detail-con top left">{{enterpriseDetailList.phone}}</Col>
      <Col span="6">
      <p class="sms-detail-con top left">传真号码:</p>
      </Col>
      <Col span="6" class="sms-detail-con top left right">{{enterpriseDetailList.fax}}</Col>
    </Row>
    <Row>
      <Col span="6">
      <p class="sms-detail-con top left bottom">区域:</p>
      </Col>
      <Col span="6" class="sms-detail-con top left bottom">{{enterpriseDetailList.areaName}}</Col>
      <Col span="6">
      <p class="sms-detail-con top left bottom">详细地址:</p>
      </Col>
      <Col span="6" class="sms-detail-con top right left bottom">{{enterpriseDetailList.address}}</Col>
    </Row>
    </Col>

    <Col span="24" class="plant-content margin-top-20">
    <div class="header-con">
      <h5 class="margin-bottom-5">企业联系人</h5>
    </div>
    <hr>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :label-width="120">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="姓名:">
          <Input v-model="form.name" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="性别:">
          <Select v-model="form.sex" class="form-select">
            <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="部门:">
          <Input v-model="form.department" class="search-input"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="职位:">
          <Input v-model="form.position" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="电话:">
          <Input v-model="form.phone" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="手机:">
          <Input v-model="form.mobile" class="search-input"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="状态:">
          <Select v-model="form.status" class="form-select">
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{item.desc}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="主联系人:">
          <Select v-model="form.mainPerson" class="form-select">
            <Option v-for="item in mainPersonList" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <Button type="primary" class="search-btn" @click="search">查询</Button>
        <Button type="primary" class="search-btn" @click="handleReset()">重置</Button>
        </Col>
      </Row>
    </form>
    </Col>
    </Card>
    <Col span="24" class="plant-content">
    <Row class-name="table-con">
      <div class="btn-container">
        <Button type="primary" class="search-btn" @click="createEnterpriseContact">新增</Button>
      </div>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="handleRowChange">
      </Table>
      <div class="page-con">
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
      </div>
    </Row>
    </Col>
    <Col span="24">
    <div class="btn-container" style="text-align:center">
      <Button type="primary" class="search-btn" @click="voidIndex">返回</Button>
    </div>
    </Col>
    <add-enterprise-contact-modal ref="editDataRef" :showAddModal="showAddModal" @hide-modal="hideAddModal" @queryList="search"></add-enterprise-contact-modal>
    <breed-relation-modal :showBreedRelationModal="showBreedRelationModal" @hide-modal="hideBreedRelationModal" ref="showRelationBreedRef"></breed-relation-modal>
    <check-enterprise-contact-modal :showCheckModal='showCheckModal' @hide-modal="hideCheckModal" ref="showData"></check-enterprise-contact-modal>
  </Row>
</template>

<script>
import { enterpriseContactsStatus } from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";
import axios from "axios";
import addEnterpriseContactModal from "./addEnterpriseContact.vue";
import checkEnterpriseContactModal from "./enterpriseContactDetail.vue";
import breedRelationModal from "./breedRelation.vue";
import oilPage from "../../components/page/page.vue";
export default {
  name: "enterpriseContact",
  components: {
    addEnterpriseContactModal,
    checkEnterpriseContactModal,
    breedRelationModal,
    oilPage
  },
  data() {
    return {
      productDetailList: "",
      enterpriseDetailList: "",
      type: "",
      showBreedRelationModal: false,
      showAddModal: false,
      showCheckModal: false,
      ids: "",
      status: "",
      title: "",
      statusReason: "",
      selectRow: [],
      multipleSelection: [],
      mainPersonList: [
        {
          value: -1,
          name: "全部"
        },
        {
          value: 0,
          name: "否"
        },
        {
          value: 1,
          name: "是"
        }
      ],
      sexList: [
        {
          value: -1,
          name: "全部"
        },
        {
          value: 0,
          name: "男"
        },
        {
          value: 1,
          name: "女"
        }
      ],
      statusList: [],
      total: 0,
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      pageSize: 5,
      pageNum: 1,
      form: {
        name: "",
        sex: -1,
        department: "",
        position: "",
        phone: "",
        mobile: "",
        status: -1,
        mainPerson: -1
      },
      type: "",
      columns: [
        {
          key: "name",
          align: "center",
          title: "姓名",
          minWidth: 200,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.enterpriseContactDetailById(params.row.contractsId);
                  }
                }
              },
              params.row.name
            );
          }
        },
        {
          key: "sex",
          align: "center",
          title: "性别",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.sex === 0 ? "男" : data.row.sex === 1 ? "女" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
          }
        },
        {
          key: "department",
          align: "center",
          minWidth: 100,
          title: "部门"
        },
        {
          key: "position",
          align: "center",
          minWidth: 100,
          title: "职位"
        },
        {
          key: "phone",
          align: "center",
          minWidth: 150,
          title: "电话"
        },
        {
          key: "mobile",
          align: "center",
          minWidth: 150,
          title: "手机"
        },
        {
          title: "状态",
          key: "statusSec",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.status == 0
                ? "正常"
                : data.row.status == 1
                  ? "禁用"
                  : data.row.status == 9
                    ? "已删除"
                    : "";
            let color =
              data.row.status == 0
                ? "#9ecd3f"
                : data.row.status == 1
                  ? "red"
                  : data.row.status == 9
                    ? "blue"
                    : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
        },
        {
          key: "isMain",
          align: "center",
          minWidth: 100,
          title: "主联系人",
          render: (h, data) => {
            let label =
              data.row.isMain === 1 ? "是" : data.row.isMain === 0 ? "否" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
          }
        },
        {
          title: "操作",
          align: "center",
          width: 300,
          render: (h, data) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "blue",
                    marginRight: "8px",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.editData(data.row.contractsId);
                    }
                  }
                },
                " 编辑 "
              ),
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "blue",
                    marginRight: "8px",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.onOrOffConfig(data.row.contractsId, data.row.status);
                    }
                  }
                },
                data.row.status == 1
                  ? "启用"
                  : data.row.status == 0
                    ? "禁用"
                    : ""
              ),
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "blue",
                    marginRight: "8px",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.deleteRelationship(data.row.contractsId);
                    }
                  }
                },
                "删除"
              ),
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "blue",
                    marginRight: "8px",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.createMainRelationPerson(data.row.contractsId);
                    }
                  }
                },
                data.row.isMain == 1 ? "" : "设置主联系人"
              ),
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "blue",
                    marginRight: "8px",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.relationBreed(data.row.contractsId);
                    }
                  }
                },
                "关联品种"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  created() {
    this.getData();
    //初始化企业基本详情数据
    this.init();
    //初始化下拉状态
    this.getStatus();
  },
  methods: {
    //初始化企业详情
    init() {
      let id = this.$route.query.id;
      var that = this;
      var sourceProductArr = [];
      var params = new URLSearchParams();
      params.append("id", id);
      axios.post("/basedata/enterprise/detail", params).then(function(res) {
        if (res.data.status == 200) {
          that.enterpriseDetailList = res.data.response;
        } else {
          that.$Message.warning(res.data.message);
        }
      });
    },
    //新增企业联系人
    createEnterpriseContact() {
      this.showAddModal = true;
      this.$refs.editDataRef.title = "新增企业联系人";
    },
    // 隐藏新增弹窗
    hideAddModal() {
      this.showAddModal = false;
      this.getData();
    },
    // 隐藏新增弹窗
    hideBreedRelationModal() {
      this.showBreedRelationModal = false;
      this.getData();
    },
    //隐藏查看弹窗
    hideCheckModal() {
      this.showCheckModal = false;
    },
    //设置关联品种
    relationBreed(id) {
      var mainId = this.$route.query.id;
      this.$refs.showRelationBreedRef.initData(id, mainId);
      this.showBreedRelationModal = true;
    },
    //获取状态下拉列表
    getStatus() {
      var that = this;
      let params = {};
      enterpriseContactsStatus(formData(params)).then(res => {
      let obj = {
          value: -1,
          desc: "全部"
        };
        that.statusList.push(obj);
        let list = res.response;
        for (let i = 0; i < list.length; i++) {
          let objList = {};
          objList.value = list[i].value;
          objList.desc = list[i].desc;
          that.statusList.push(objList);
        }
      });
    },
    //列表数据
    getData() {
      var params = new URLSearchParams();
      params.append("pageNum", this.pageNum);
      params.append("pageSize", this.pageSize);
      params.append("name", this.form.name == undefined ? "" : this.form.name);
      params.append("enterpriseId", this.$route.query.id);
      params.append("sex", this.form.sex == -1 ? "" : this.form.sex);
      params.append(
        "department",
        this.form.department == undefined ? "" : this.form.department
      );
      params.append(
        "position",
        this.form.position == undefined ? "" : this.form.position
      );
      params.append(
        "phone",
        this.form.phone == undefined ? "" : this.form.phone
      );
      params.append(
        "mobile",
        this.form.mobile == undefined ? "" : this.form.mobile
      );
      params.append(
        "status",
        this.form.status == -1 ? "" : this.form.status
      );
      params.append(
        "isMain",
        this.form.mainPerson == -1 ? "" : this.form.mainPerson
      );

      axios
        .post("/basedata/enterprise/relevance_contacts_list", params)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.response.list;
            this.total = res.data.response.total;
          }
          this.$Spin.hide();
        })
        .catch(err => {});
    },
    //查看企业联系人
    enterpriseContactDetailById(id) {
      this.$refs.showData.getInitData(id);
      this.showCheckModal = true;
    },
    //获取列表分页每页显示的记录数
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getData();
    },
    //查询
    search() {
      this.pageNum = 1;
      this.pageSize = 5;
      this.getData();
    },
    //重置
    handleReset() {
      this.form.name = "";
      this.form.sex = -1;
      this.form.dept = "";
      this.form.position = "";
      this.form.phone = "";
      this.form.mobile = "";
      this.form.department = "";
      this.form.status = -1;
      this.form.mainPerson = -1;
    },
    //获取单行
    handleRowChange(row) {
      this.selectRow = row;
    },
    //点击编辑
    editData(id) {
      this.$refs.editDataRef.initData(id);
      this.$refs.editDataRef.title = "修改企业联系人";
      this.showAddModal = true;
    },
    //设置主联系人
    createMainRelationPerson(id) {
      let enterpriseId = this.$route.query.id;
      let that = this;
      that.$Modal.confirm({
        title: "提示信息",
        content: "是否要设置主联系人?",
        onOk: () => {
          var params = new URLSearchParams();
          params.append("contactsId", id);
          params.append("enterpriseId", enterpriseId);
          axios
            .post("/basedata/enterprise/set_mainContacts", params)
            .then(function(res) {
              if (res.data.status == 200) {
                that.$Message.info({
                  content: "设置成功",
                  duration: 3
                });
                that.search();
              } else {
                that.$Message.warning(res.data.message);
              }
            });
        },
        onCancel: () => {
          this.$Message.info("取消操作");
        }
      });
    },
    //返回首页
    voidIndex() {
      this.$router.push({
        path: "/enterpriseList"
      });
    },
    //激活或禁用
    onOrOffConfig(id, type) {
      let that = this;
      let contentInfo =
        type == 0 ? "是否确认要禁用该联系人吗?" : "是否确定要启用该联系人吗?";
      this.$Modal.confirm({
        title: "提示信息",
        content: contentInfo,
        onOk: () => {
          let params = new URLSearchParams();
          params.append("id", id);
          if (type == 1) {
            axios
              .post("/basedata/enterprise/enable_contacts", params)
              .then(function(res) {
                if (res.data.status == 200) {
                  that.$Message.info({
                    content: "启用成功",
                    duration: 3
                  });
                  that.search();
                } else {
                  that.$Message.warning(res.data.message);
                }
              });
          }
          if (type == 0) {
            axios
              .post("/basedata/enterprise/disable_contacts", params)
              .then(function(res) {
                if (res.data.status == 200) {
                  that.$Message.info({
                    content: "禁用成功",
                    duration: 3
                  });
                  that.search();
                } else {
                  that.$Message.warning(res.data.message);
                }
              });
          }
        },
        onCancel: () => {
          this.$Message.info("取消操作");
        }
      });
    },
    //删除联系人
    deleteRelationship(id) {
      let that = this;
      this.$Modal.confirm({
        title: "提示信息",
        content: "是否确认要删除?",
        onOk: () => {
          let params = new URLSearchParams();
          params.append("id", id);
          axios
            .post("/basedata/enterprise/delete_relevance_contacts", params)
            .then(function(res) {
              if (res.status === 200) {
                that.$Message.info({
                  content: "删除成功",
                  duration: 3
                });
                that.search();
              } else {
                that.$Message.warning(res.data.message);
              }
            });
        },
        onCancel: () => {
          this.$Message.info("取消操作");
        }
      });
    }
  }
};
</script>
