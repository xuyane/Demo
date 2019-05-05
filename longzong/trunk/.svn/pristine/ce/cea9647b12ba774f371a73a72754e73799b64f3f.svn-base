<style lang="less" scoped>
/* // @import './phone.less'; */

.error_tip {
  color: #ff0000;
}
.mar-10 {
  margin: 10px 0;
}
.fs16 {
  font-size: 16px;
}
.no-margin-left {
  margin-left: 0;
}
</style>

<template>
  <Row class="phone">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：
        <router-link to="/plantIndex" class="link-css">呼叫中心</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/personnelTelephoneManagement" class="link-css">人员话机管理</router-link>
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form ref="Form" :model="formModel" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="话机类型:" prop="type">
              <Select v-model="formModel.type" class="search-input">
                <Option value="">全部</Option>
                <Option
                  v-for="item in telphoneList"
                  :value="item.value"
                  :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="座机号:" prop="telephoneNumber">
              <Input v-model="formModel.telephoneNumber" class="search-input" placeholder="请输入座机号"></Input>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <FormItem label="分机号:" prop="telephoneShortNumber">
              <Input v-model="formModel.telephoneShortNumber" class="search-input" placeholder="请输入分机号"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="人员姓名:" prop="employeeId">
              <Select
                class="search-input"
                filterable
                remote
                v-model="formModel.employeeId"
                :remote-method="remoteMethod"
                :loading="searchLoading"
                placeholder="请输入人员姓名">
                <Option v-for="item in employees" :value="item.id" :key="item.id">{{item.text}}</Option>
              </Select>
              <!--<Input v-model="formModel.employeeName" class="search-input" placeholder="请输入人员姓名"></Input>-->
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="钢联管理员id:" prop="glAdminId">
              <Select v-model="formModel.glAdminId" class="search-input" clearable>
                <Option value="">全部</Option>
                <Option
                  v-for="item in glAdminIdArray"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary" @click="onSearch">查询</Button>
            <Button style="margin-left: 8px" @click="onReset">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true"></Table>
        <oil-page :total="total" :page-num="formModel.pageNum" :page-size="formModel.pageSize" @page-change="pageChange":page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
      </Row>
    </Col>

    <!-- 编辑弹框 -->
    <Modal v-model="showEditModal" title="修改人员话机设置" width="750" @on-visible-change="onVisibleChange">
      <Form ref="editForm" :model="editData" :rules="editFormValidate" :label-width="150">
        <Row type="flex" justify="space-around">
          <Col span="12">
          <FormItem label="所属部门:">
            <span>{{editData.orgName}}</span>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="人员姓名:">
            <span>{{editData.employeeName}}</span>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span="12">
          <FormItem label="话机类型:">
            <span>{{editData.typeDesc}}</span>
            <!--<Select v-model="editData.type" class="search-input">
              <Option
                v-for="item in telphoneList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>-->
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="钢联管理员id:" prop="glAdminId">
            <i-Input v-model="editData.glAdminId" class="search-input" v-if="TelType[editData.type] === '上海'" number />
            <span v-else>{{editData.glAdminId}}</span>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="12">
          <FormItem label="座机号:" prop="telephoneNumber">
            <i-Input v-model="editData.telephoneNumber" class="search-input" placeholder="请输入座机号" number />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="分机号:" prop="telephoneShortNumber">
            <i-Input v-model="editData.telephoneShortNumber" class="search-input" placeholder="请输入分机号" number />
          </FormItem>
          </Col>
        </Row>
      </Form>
      <Row class="text-center" slot="footer">
        <Button type="primary" @click="editPeoplePhone">保存</Button>
        <Button style="margin-left:30px;" @click="showEditModal = false">取消</Button>
      </Row>
    </Modal>

    <!--更新通话纪录弹框-->
    <Modal v-model="showUpdateModal" title="更新通话纪录" width="750">
      <Form :model="updateRecord" :label-width="150">
        <Row type="flex" justify="space-around">
          <Col span="12">
            <FormItem label="所属部门:">
              <span>{{updateRecord.orgName}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="人员姓名:">
              <span>{{updateRecord.employeeName}}</span>
            </FormItem>
          </Col>
        </Row>

        <Row type="flex" justify="space-between">
          <Col span="12">
            <FormItem label="座机号:">
                <span>{{updateRecord.telephoneNumber}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="分机号:">
                <span>{{updateRecord.telephoneShortNumber}}</span>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="12">
            <FormItem label="更新开始日期:">
              <Date-picker type="datetime" v-model="updateDate" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row class="text-center" slot="footer">
        <Button type="primary" @click="editPhoneRecord">保存</Button>
        <Button style="margin-left:30px;" @click="showUpdateModal = false">取消</Button>
      </Row>
    </Modal>

  </Row>
</template>

<script>
import oilPage from "../components/page/page.vue";
import { rts } from "../components/jsonp/oilJsonp.js";
import {
  peoplePhoneList,
  peoplePhoneEdit,
  phoneRecordEdit,
  select_employee,
  checkPeoplePhone
} from "../components/axios/phoneCenter.js";

export default {
  name: "phoneCenter",
  components: {
    oilPage
  },
  data() {
    return {
      formModel: {
        type: "",  //话机类型
        telephoneNumber: "", //座机号
        telephoneShortNumber: "", //分机号
        employeeId: "", //人员姓名
        glAdminId: "", //钢联管理员id:已设置, 2:未设置
        pageSize: 10,
        pageNum: 1,
      },

      searchLoading: false,

      employees: [],

        //话机类型
      telphoneList: [
        {
          value: 1,
          label: "上海话机"
        },
        {
          value: 0,
          label: "山东话机"
        }
      ],

      // 钢联管理员id:已设置, 2:未设置,
      glAdminIdArray: [
        {
          value: 1,
          label: "已设置"
        },
        {
          value: 0,
          label: "未设置"
        }
      ],
      showEditModal: false,
      showUpdateModal: false,
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      total: 0,


      editData: {}, // 编辑弹窗的数据
      editFormValidate: {
        glAdminId: [
          { required: true, type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
        telephoneNumber: [
          { required: true, type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
        telephoneShortNumber: [
          { required: true, type: 'number', message: '请输入数字', trigger: 'blur' },
        ]
      },


      updateRecord: {}, // 跟新的数据
      tableData: [],

      // 更新开始日期
      updateDate: '',

      columns: [
        {
          key: "orgName",
          align: "center",
          title: "所属部门",
          width: 280
        },
        {
          key: "employeeName",
          align: "center",
          title: "姓名",
          width: 200
        },
        {
          key: "glAdminId",
          align: "center",
          title: "钢联管理员id",
          minWidth: 220
        },
        {
          key: "typeDesc",
          align: "center",
          title: "话机类型",
          minWidth: 200
        },
        {
          key: "telephoneNumber",
          align: "center",
          title: "座机号",
          minWidth: 200,
        },

        {
          key: "telephoneShortNumber",
          align: "center",
          title: "分机号",
          minWidth: 200
        },
        {
          title: "操作",
          align: "center",
          minWidth: 300,
          render: (h, data) => {
            return h("div", [
              h("a", {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  style: {
                    marginRight: "30px",
                  },
                  on: {
                    click: () => {
                      this.saveGlAdminId = data.row.glAdminId;
//                      this.editData = { ...data.row };telephoneNumber telephoneShortNumber
                      this.editData = {
                        id: data.row.id,
                        orgName: data.row.orgName,
                        employeeName: data.row.employeeName,
                        type: data.row.type,
                        typeDesc: data.row.typeDesc,
                        glAdminId: Number(data.row.glAdminId),
                        telephoneNumber: Number(data.row.telephoneNumber),
                        telephoneShortNumber: Number(data.row.telephoneShortNumber)
                      };
                      this.showEditModal = true;
                    }
                  }
                }, "编辑"),
              h("a", {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.updateRecord = { ...data.row };
                      this.showUpdateModal = true;
                    }
                  }
                }, "更新通话记录")
            ]);
          }
        }
      ]
    };
  },
/*
  watch: {
    'editData.type'(newVal) {
      if (!newVal) {
        this.editData.glAdminId = 0;
      }else {
        this.editData.glAdminId = this.saveGlAdminId;
      }
    }
  },*/

  methods: {
    onVisibleChange(visib) {
      if (!visib) {
        this.editData = {};
        this.$refs['editForm'].resetFields();
      }
    },

    // 修改话机设置
    editPeoplePhone() {
      this.$refs['editForm'].validate(valid => {
        if (valid) {
          if (!this.editData.type) {
            this.editData.glAdminId = null;
          }
          this.$Spin.show();
          checkPeoplePhone(this.editData).then(res => {
//            console.log('checkPeoplePhone', res);
            if (res.response) {
//              this.$Message.warning(res.response);
              this.$Modal.confirm({
                title: res.response,
                onOk: () => {
                  this._savePhoneConfig(this.editData);
                },
                onCancel: () => {
                  this.$Spin.hide();
                }
              })
            }else {
              this._savePhoneConfig(this.editData);
            }
          }).catch(error => {
            console.error(error);
            this.$Spin.hide();
          });
        }
      });
    },

    _savePhoneConfig(editData) {


      peoplePhoneEdit(editData).then(res => {
        this.$Message.success(res.message);
        this.onReset();
        this.formModel.pageNum = 1;
        this.formModel.pageSize = 10;
        this.getList();
        this.showEditModal = false;
      }).catch(error => {
        console.error(error);
        this.$Spin.hide();
      });
    },

    // 更新通话记录
    editPhoneRecord() {
      /*console.log('updateDate', this.updateDate);
      console.log('updateRecord', this.updateRecord);*/
      if (this.updateDate) {
        this.$Spin.show();
        phoneRecordEdit({
          startTime: +this.updateDate,
          ...this.updateRecord
        }).then(res => {
          this.$Message.success(res.message);
          this.formModel.pageNum = 1;
          this.formModel.pageSize = 10;
          this.getList();
          this.showUpdateModal = false;
        });
      }else {
        this.$Message.error('请选择日期！');
      }
    },

    remoteMethod(keyword) {
      this.searchLoading = true;
      this.getEmployees(keyword);
    },

    onSearch() {
      this.$Spin.show();
      this.getList();
    },

    onReset() {
      this.$refs['Form'].resetFields();
    },

    getList() {
      peoplePhoneList(this.formModel).then(res => {
        this.tableData = res.response.list;
        this.total = res.response.total;
        this.$Spin.hide();
      });
    },

    // 获取员工集合
    getEmployees: function (keyword = '') {
      select_employee({name: keyword}).then(res => {
        this.employees = JSON.parse(res.response);
        this.searchLoading = false;
      });
    },

    pageChange(page, pageSize) {
      //分页
      if (page) {
        this.formModel.pageNum = page;
      }
      if (pageSize) {
        this.formModel.pageSize = pageSize;
      }
      this.$Spin.show();
      this.getList();
    }
  },
  created() {
    this.$Spin.show();

    // 话机类型
    this.TelType = ['山东', '上海'];

    this.getList();
    this.getEmployees();
  }
};
</script>
