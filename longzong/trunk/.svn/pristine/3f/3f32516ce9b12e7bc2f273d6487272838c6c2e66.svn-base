<style lang="less" scoped>
.phoneMap {
  .bread-crumb {
    font-size: 14px;
    color: #000;
  }

  .f_card {
    margin: 20px 0;
  }

  .form_wrap {
    .form_item {
      width: 90%;
    }
  }

  .page {
    margin: 10px 0;
    text-align: right;
    padding-right: 18px;
  }
}
</style>

<template>
  <div class="phoneMap">
    <span class="bread-crumb">当前位置：
      <router-link to="/plantIndex" class="link-css">呼叫中心</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/phoneMap" class="link-css">
        话机映射
        </router-link>
      
      </span>

    <Card dis-hover class="f_card">
      <span slot="title">话机搜索</span>
      <div class="form_wrap">
        <Form ref="phoneMap_form" inline :label-width="120" :model="formValue">
          <Row>
            <i-Col span="8">
              <FormItem label="钢联管理员ID："  class="search-input" prop="glAdminId">
                <Input class='item_control' v-model="formValue.glAdminId"></Input>
              </FormItem>
            </i-Col>
            <i-Col span="8">
              <FormItem label="名称："  class="search-input" prop="employeeName">
                <Input class='item_control' v-model="formValue.employeeName"></Input>
              </FormItem>
            </i-Col>
            <i-Col span="8">
              <FormItem label="座机短号："  class="search-input" prop="telephoneShortNumber">
                <Input class='item_control' v-model="formValue.telephoneShortNumber"></Input>
              </FormItem>
            </i-Col>
            <i-Col span="24" class="text-right" >
              <Button type="primary" @click="onSearch">搜索</Button>
              <Button @click="onReset">重置</Button>
            </i-Col>
          </Row>
        </Form>
      </div>
    </Card>


    <Card :bordered="false" dis-hover>
      <span slot="title">话机列表</span>
      <div class="table">
        <Button type="primary" style="margin-bottom: 15px;" @click.native="openModal">新增</Button>
        <Table border :columns="columns" :data="list_page">
          <div class="page" slot="footer">
            <Page :page-size="formValue.pageSize" :current="formValue.pageNum" :total="total" show-elevator show-total show-sizer @on-change="onPageChange" @on-page-size-change="onPageSizeChange"/>
          </div>
        </Table>
      </div>
    </Card>
    <!--@visible-change="showPhoneMapModal = $event;"onVisibleChange-->
    <phoneMapModal @visible-change="onVisibleChange" @save="onSave" @update="onUpdate" :showPhoneMapModal="showPhoneMapModal" :modalType="modalType" :phoneInfo="phoneInfo"></phoneMapModal>
  </div>
</template>

<script>
import axios from "axios";
import phoneMapModal from "./privateComponents/phoneMapModal.vue";
import { select_employee } from "../components/axios/phoneCenter.js";
export default {
  name: "phoneMap",
  components: {
    phoneMapModal
  },
  data() {
    return {
      showPhoneMapModal: false,

      // 新增还是修改？
      modalType: "save",

      // 修改选中的项
      phoneInfo: {},

      formValue: {
        employeeName: "",
        glAdminId: "",
        telephoneShortNumber: "",
        pageNum: 1,
        pageSize: 10
      },

      list_page: [],

      total: 0,

      columns: [
        {
          title: "员工ID",
          key: "employeeId"
        },
        {
          title: "员工名称",
          key: "employeeName"
        },
        {
          title: "钢联管理员ID",
          key: "glAdminId"
        },
        {
          title: "电话号码",
          key: "telephoneNumber"
        },
        {
          title: "座机短号",
          key: "telephoneShortNumber"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: evt => {
                      this.openModal(evt, "update", params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.onDelete(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    onVisibleChange(status) {
      this.showPhoneMapModal = status;
    },
    onSearch() {
      this.formValue.pageNum = 1;
      this.$Spin.show();
      this.getListPage();
    },
    onReset() {
      this.$refs["phoneMap_form"].resetFields();
    },
    onPageSizeChange(pageSize) {
      this.formValue.pageNum = 1;
      this.formValue.pageSize = pageSize;
      this.$Spin.show();
      this.getListPage();
    },
    onPageChange(page) {
      this.formValue.pageNum = page;
      this.$Spin.show();
      this.getListPage();
    },

    // 打开弹窗
    openModal(evt, type = "save", params) {
      if (params) {
        this.phoneInfo = { ...params };
      }

      this.modalType = type;
      this.showPhoneMapModal = true;
    },

    onSave(params) {
      // params.glAdminId=Number(params.glAdminId)      
      this.onOperate("save", params);
    },
    onUpdate(params) {
      // params.glAdminId=Number(params.glAdminId)
      this.onOperate("update", params);
    },

    onDelete(id) {
      this.$Modal.confirm({
        title: "确认删除？",
        onOk: () => {
          this.$Spin.show();
          const fd = new FormData();
          fd.append("ids", id);
          axios.post("/callcenter/callemployeemapping/delete", fd).then(res => {
            if (Number(res.data.status) === 200) {
              this.$Notice.success({
                title: "删除成功",
                desc: res.data.message
              });
              this.formValue.pageNum = 1;
              this.onReset();
              this.getListPage();
            } else {
              this.$Spin.hide();
              this.$Notice.error({
                title: "删除失败",
                desc: res.data.message
              });
            }
          });
        }
      });
    },

    onOperate(type, params) {
      this.$Spin.show();
      axios
        .post("/callcenter/callemployeemapping/" + type, params)
        .then(res => {
          const msg = type === "save" ? "新增" : "修改";
          if (Number(res.data.status) === 200) {
            this.$Notice.success({
              title: msg + "成功",
              desc: res.data.message
            });
            this.formValue.pageNum = 1;
            this.getListPage();
            this.showPhoneMapModal = false;
            /*this.$Message.success({
              content: res.data.message,
              duration: 2,
              closable: true,
              onClose: () => {
                this.formValue.pageNum = 1;
                this.getListPage();
              }
            });*/
          } else {
            this.$Spin.hide();
            this.$Notice.error({
              title: msg + "失败",
              desc: res.data.message
            });
          }
        });
    },

    getListPage() {
      axios
        .post("/callcenter/callemployeemapping/list_page", this.formValue)
        .then(res => {
          if (Number(res.data.status) === 200) {
            const data = res.data.response;
            this.list_page = data.list;
            this.total = data.total;
            //        console.log(this.list_page);
            this.$Spin.hide();
          } else {
            this.$Notice.error({
              desc: res.data.message
            });
            this.$Spin.hide();
          }
        });
    }
  },
  created() {
    this.$Spin.show();
    this.getListPage();
  }
};
</script>
