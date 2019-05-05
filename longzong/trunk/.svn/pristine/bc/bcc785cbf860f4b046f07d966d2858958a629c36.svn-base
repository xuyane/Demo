<style lang="less" scoped>
  // @import './categorymanagement.less';
  .tab {
    width: 400px;
    display: flex;
    background: #fff;
    color: #fff;
  }

  .tab .tab-flex {
    width: 200px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #2d8cf0;
    color: #2d8cf0;
  }

  .tab-flex.tab-active {
    background: #2d8cf0;
    color: #fff;
    border: none;
  }
</style>
<template>
  <Row>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：
        <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/toAudit" class="link-css">联系人审核</router-link>
      </Row>
    </i-col>
    <Col span="24" class-name="search-form">
    <Form :label-width="100">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="姓名">
          <Input v-model="value1" class="search-input" placeholder="请输入姓名"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="性别">
          <Select v-model="value2" class="search-input" placeholder="全部">
            <Option v-for="item in gender" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="电话号码:">
          <Input v-model="value3" class="search-input" placeholder="请输入电话号码"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="手机号码:">
          <Input v-model="value5" class="search-input" placeholder="请输入手机号码"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="所在企业">
          <Select v-model="value4" filterable remote :remote-method="remoteMethod1" clearable ref="suozaizujian" :loading="loading1">
            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <Button type="primary" @click="getListPageSeach">查询</Button>
        <Button style="margin-left: 8px" @click="clear">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con" >
      <div class="tab" style="margin-bottom: 20px">
        <div class="tab-flex" @click="changeTab1" :class="tab === 1 ? 'tab-active' : ''">待审核</div>
        <div class="tab-flex" @click="changeTab2" :class="tab === 2 ? 'tab-active' : ''">已审核</div>
      </div>

      <Table class="tableCommon" v-show="tab === 1" :data="tableData" :columns="columns"></Table>
      <Table class="tableCommon" v-show="tab === 2" :data="tableData0" :columns="columns0"></Table>

      <Modal v-model="shenheModal" title="审核信息联系人" width="800">
        <Form ref="shenheform" :model="shenheform" :label-width="120">
          <Row>
            <Col span="12">
            <FormItem label="姓名 : ">
              <P>{{shenheform.name}}&nbsp;</P>
              <p v-if="examineName" style="color:#FF0000">变更前：{{shenheform.examineName}}</p>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="性别 ：">
              <p style="display:inline-block">{{ shenheform.sex}}&nbsp;</p>
              <p v-if="examineSex" style="color:#FF0000">变更前：{{shenheform.examineSex}}</p>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="部门 : ">
              <p>{{ shenheform.department}}&nbsp;</p>
              <p v-if="examineDepartment" style="color:#FF0000">变更前：{{shenheform.examineDepartment}}</p>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="职位 : ">
              <p>{{ shenheform.position}}&nbsp;</p>
              <p v-if="examinePosition" style="color:#FF0000">变更前：{{shenheform.examinePosition}}</p>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="联系电话号码 : ">
              <p>{{shenheform.phone}}&nbsp;</p>
              <p v-if="examinePhone" style="color:#FF0000">变更前：{{shenheform.examinePhone}}</p>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="手机号码 ：">
              <P>{{ shenheform.mobile}}&nbsp;</P>
              <p v-if="examineMobile" style="color:#FF0000">变更前：{{shenheform.examineMobile}}</p>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="QQ号码 : ">
              <p>{{shenheform.qq}}&nbsp;</p>
              <p v-if="examineQq" style="color:#FF0000">变更前：{{shenheform.examineQq}}</p>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="微信号码 ：">
              <P>{{ shenheform.WeChat}}&nbsp;</P>
              <p v-if="examineWeChat" style="color:#FF0000">变更前：{{shenheform.examineWeChat}}</p>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="企业类型 :">
              <p>{{ shenheform.enterpriseType}}&nbsp;</p>
              <p v-if="examineEnterpriseType" style="color:#FF0000">变更前：{{shenheform.examineEnterpriseType}}</p>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="企业性质 :">
              <p>{{ shenheform.enterpriseNature}}&nbsp;</p>
              <p v-if="examineEnterpriseNature" style="color:#FF0000">变更前：{{shenheform.examineEnterpriseNature}}</p>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem label="所在企业 :">
              <p>{{ shenheform.enterpriseName}}&nbsp;</p>
              <p v-if="examineEnterpriseName" style="color:#FF0000">变更前：{{shenheform.examineEnterpriseName}}</p>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem label="所在区域 :">
              <p>{{ shenheform.enterpriseArea}}&nbsp;</p>
              <p v-if="examineEnterpriseArea" style="color:#FF0000">变更前：{{shenheform.examineEnterpriseArea}}</p>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem label="详细地址 :">
              <p>{{ shenheform.enterpriseAddress}}&nbsp;</p>
              <p v-if="examineEnterpriseAddress" style="color:#FF0000">变更前：{{shenheform.examineEnterpriseAddress}}</p>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem label="邮编 :">
              <p>{{ shenheform.enterprisePostcode}}&nbsp;</p>
              <p v-if="examineEnterprisePostcode" style="color:#FF0000">变更前：{{shenheform.examineEnterprisePostcode}}</p>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem label="关联品种 : ">
              <div>
                <Table class="tableCommon" :data="tableData1" :columns="columns1"></Table>
              </div>
              <div v-if="examineTableDataOne" style="color:#FF0000">
                变更前：
                <Table class="tableCommon" :data="examineTableData" :columns="examinecolumns1"></Table>
              </div>
            </FormItem>
            </Col>
          </Row>
          <!-- <Row >
                        <Col span="24">
                            <FormItem label="关联的信息单元 : ">
                               <Table class="tableCommon" :data="tableData2" :columns="columns2"></Table>
                            </FormItem>
                        </Col>       
                    </Row> -->
          <Row>
            <Col span="24">
            <FormItem label="审核意见 : ">
              <Input v-model="shenheform.description" type="textarea" :autosize="{minRows: 5,maxRows: 10}"></Input>
              <div style="color:#FF0000" v-if="descriptionDisplay">请输入审核意见</div>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <i-button type="primary" :loading="loadingConfirm" @click="confirmModal">通过</i-button>
          <i-button type="primary" :loading="loadingReject" @click="rejectModal">驳回</i-button>
          <i-button type="primary" @click="cancelModal">取消</i-button>
        </div>
      </Modal>
      <Check-Info :showEditModal="showEditModal" @hide-modal="hideEditModal" :checkData="checkData"></Check-Info>
      <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer">
      </oil-page>
    </Row>
    </Col>
  </Row>
  </Col>

  </Row>
</template>
<script>
  import axios from "axios";
  import {
    getentErpeise,
    detailContactsAudit,
    editContactsAudit,
    enterpeiseType,
    enterpeiseNature,
    detailEnterprise,
    allenterpeiseName,
    contactsAudit
  } from "../unitmangement/api/unitManageMent";
  import OilPage from "../../components/page/page.vue";
  import { formData } from "../../../assets/js/common.js";
  import CheckInfo from "./checkInfo.vue";
  export default {
    name: "toAudit",
    components: {
      OilPage,
      CheckInfo
    },
    data() {
      return {
        loadingConfirm: false,
        loadingReject: false,
        checkData: {},
        showEditModal: false,
        examineDepartment: false,
        examineSex: false,
        examineName: false,
        examinePosition: false,
        examinePhone: false,
        examineMobile: false,
        examineEnterpriseName: false,
        examineTableDataOne: false,
        descriptionDisplay: false,
        examineEnterpriseType: false,
        examineQq: false,
        examineWeChat: false,
        examineEnterpriseNature: false,
        examineEnterpriseArea: false,
        examineEnterpriseAddress: false,
        examineEnterprisePostcode: false,
        gender: [
          {
            name: "全部",
            value: ""
          },
          {
            name: "男",
            value: "0"
          },
          {
            name: "女",
            value: "1"
          }
        ],
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        auditStatus: "",
        options1: [],
        loading1: false,
        tab: 1,
        shenheModal: false,
        shenheform: {
          examineDepartment: "",
          examineName: "",
          examineSex: "",
          examinePosition: "",
          examinePhone: "",
          examineMobile: "",
          examineEnterpriseName: "",
          examineEnterpriseType: "",
          examineEnterpriseNature: "",
          examineEnterpriseArea: "",
          examineEnterpriseAddress: "",
          examineEnterprisePostcode: "",
          examineQq: "",
          examineWeChat: "",
          id: "",
          auditStatus: "",
          name: "",
          sex: "",
          department: "",
          position: "",
          phone: "",
          mobile: "",
          enterpriseName: "",
          enterpriseType: "",
          enterpriseNature: "",
          enterpriseArea: "",
          enterpriseAddress: "",
          enterprisePostcode: "",
          breeds: "",
          relationTaskList: "",
          taskContactsBreedRelationVOList: "",
          description: "",
          QQ: "",
          WeChat: ""
        },
        total: 0,
        pageSize: 10,
        pageNum: 1,
        pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
        showSizer: true,
        tableData: [],
        columns: [
          {
            title: "姓名",
            key: "name",
            minWidth: 100
          },
          {
            title: "性别",
            key: "sex",
            width: 100,
            render: (h, data) => {
              return h("span", data.row.sex === 1 ? "女" : "男");
            }
          },
          {
            title: "部门",
            key: "department",
            minWidth: 100
          },
          {
            title: "职位",
            key: "position",
            minWidth: 100
          },
          {
            title: "联系电话号码",
            key: "phone",
            minWidth: 150
          },
          {
            title: "手机号码",
            key: "mobile",
            minWidth: 150
          },
          {
            title: "所在企业",
            key: "enterpriseName",
            minWidth: 250
          },
          {
            title: "企业简称",
            key: "enterpriseShortName",
            minWidth: 150
          },
          {
            title: "关联的品种",
            key: "breeds",
            minWidth: 250
          },
          {
            title: "审核的类型",
            key: "auditStatus",
            minWidth: 150,
            render: (h, data) => {
              let auditStatus = "新增审核";
              if (data.row.status == 0 && data.row.auditStatus == 0) {
                auditStatus = "新增审核";
              }
              if (data.row.status == 1 && data.row.auditStatus == 0) {
                auditStatus = "变更审核";
              }
              if (data.row.status == 9 && data.row.auditStatus == 0) {
                auditStatus = "变更审核";
              }
              return h("span", auditStatus);
            }
          },
          {
            title: "操作",
            minWidth: 100,
            render: (h, data) => {
              if (data.row.auditStatus == 0) {
                return h("div", [
                  h(
                    "a",
                    {
                      on: {
                        click: () => {
                          this.show(data);
                        }
                      }
                    },
                    "审核"
                  )
                ]);
              }
            }
          }
        ],
        columns0: [
          {
            title: "姓名",
            key: "name",
            minWidth: 100,
            render: (h, params) => {
              return h("div", [
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.checkname(params);
                      }
                    }
                  },
                  params.row.name
                )
              ]);
            }
          },
          {
            title: "性别",
            key: "setx",
            minWidth: 100,
            render: (h, data) => {
              return h("span", data.row.sex === 1 ? "女" : "男");
            }
          },
          {
            title: "部门",
            key: "department",
            minWidth: 150
          },
          {
            title: "职位",
            key: "position",
            minWidth: 100
          },
          {
            title: "联系电话号码",
            key: "phone",
            minWidth: 150
          },
          {
            title: "手机号码",
            key: "mobile",
            minWidth: 150
          },
          {
            title: "所在企业",
            key: "enterpriseName",
            minWidth: 250
          },
          {
            title: "企业简称",
            key: "enterpriseShortName",
            minWidth: 150
          },
          {
            title: "关联的品种",
            key: "breeds",
            minWidth: 150
          },
          {
            title: "审核类型",
            key: "auditStatus",
            minWidth: 150,
            render: (h, data) => {
              let auditStatus = "新增审核";
              if (data.row.status == 1 && data.row.auditStatus == 1) {
                auditStatus = "新增审核";
              }
              if (data.row.status == 9 && data.row.auditStatus == 2) {
                auditStatus = "新增审核";
              }
              if (data.row.status == 1 && data.row.auditStatus == 3) {
                auditStatus = "变更审核";
              }
              if (data.row.status == 1 && data.row.auditStatus == 4) {
                auditStatus = "变更驳回";
              }
              return h("span", auditStatus);
            }
          },
          {
            title: "审核结果",
            key: "auditStatus",
            minWidth: 100,
            render: (h, data) => {
              let color = "";
              let auditStatus = "新增审核";
              if (data.row.auditStatus == 1 || data.row.auditStatus == 3) {
                color = "#6c9b0c";
                auditStatus = "通过";
              }
              if (data.row.auditStatus == 2 || data.row.auditStatus == 4) {
                color = "#f52a1b";
                auditStatus = "驳回";
              }
              return h("span", { style: { color } }, auditStatus);
            }
          }
        ],
        tableData0: [],
        tableData1: [],
        examineTableData: [],
        columns1: [
          {
            title: "品种名称",
            key: "breedName"
          },
          {
            title: "品种类型",
            key: "breedTypeName"
          }
        ],
        examinecolumns1: [
          {
            title: "品种名称",
            key: "breedName"
          },
          {
            title: "品种类型",
            key: "breedTypeName"
          }
        ],
        columns2: [
          {
            title: "信息单元",
            key: "name",
            align: "left"
          }
        ],
        tableData2: [],
        TypeEnter: ""
      };
    },
    created() {
      this.changeTab1();
      // 获取我的联系人审核列表
      //this.getListPage();
    },
    methods: {
      getListPageSeach() {
        this.pageNum = 1;
        this.pageSize = 10;
        this.getListPage();
      },
      checkname(params) {
        console.log("checkname", params);
        this.checkData = params;
        this.showEditModal = true;
      },
      hideEditModal() {
        this.showEditModal = false;
      },
      //显示弹窗
      show(data) {
        console.log(data);
        this.shenheform.description = "";
        let form = { id: data.row.id };
        detailContactsAudit(formData(form)).then(res => {
          console.log("回显数据", res);
          this.shenheform.id = res.response.id;
          this.shenheform.name = res.response.name;
          if (res.response.sex == 0) {
            this.shenheform.sex = "男";
          }
          if (res.response.sex == 1) {
            this.shenheform.sex = "女";
          }
          this.shenheform.department = res.response.department;
          this.shenheform.position = res.response.position;
          this.shenheform.enterpriseName = res.response.enterpriseName;
          this.shenheform.enterpriseAddress = res.response.enterpriseAddress;
          this.shenheform.enterprisePostcode = res.response.enterprisePostcode;

          if (res.response.taskContactsVO.enterpriseType == null) {
            this.examineEnterpriseType = false;
            this.shenheform.examineEnterpriseType = "";
          } else if (res.response.taskContactsVO.enterpriseType == "变更前为空") {
            this.examineEnterpriseType = true;
            this.shenheform.examineEnterpriseType = "";
          } else {
            this.examineEnterpriseType = true;
            this.shenheform.examineEnterpriseType =
              res.response.taskContactsVO.enterpriseType;
          }
          this.convertType(
            res.response.enterpriseType,
            res.response.taskContactsVO.enterpriseType
          );

          if (res.response.taskContactsVO.enterpriseNature == null) {
            this.examineEnterpriseNature = false;
            this.shenheform.examineEnterpriseNature = "";
          } else if (res.response.taskContactsVO.enterpriseType == "变更前为空") {
            this.examineEnterpriseNature = true;
            this.shenheform.examineEnterpriseNature = "";
          } else {
            this.examineEnterpriseNature = true;
            this.shenheform.examineEnterpriseNature =
              res.response.taskContactsVO.enterpriseNature;
          }
          this.convertNature(
            res.response.enterpriseNature,
            res.response.taskContactsVO.enterpriseNature
          );

          if (res.response.taskContactsVO.enterpriseAreaId == null) {
            this.examineEnterpriseArea = false;
            this.shenheform.examineEnterpriseArea = "";
          } else if (
            res.response.taskContactsVO.enterpriseAreaId == "变更前为空"
          ) {
            this.examineEnterpriseArea = true;
            this.shenheform.examineEnterpriseArea = "";
          } else {
            this.examineEnterpriseArea = true;
            this.shenheform.examineEnterpriseArea =
              res.response.taskContactsVO.enterpriseAreaId;
            this.shenheform.examineEnterpriseArea =
              res.response.taskContactsVO.enterpriseAreaName;
          }
          // this.convertArea(res.response.enterpriseId);
          this.shenheform.enterpriseArea = res.response.enterpriseAreaName;
          // this.examineConvertArea(res.response.taskContactsVO.enterpriseId);

          this.shenheform.mobile = res.response.mobile;
          this.shenheform.qq = res.response.qq;
          this.shenheform.WeChat = res.response.weChat;
          this.shenheform.phone = res.response.phone;
          let breeds = res.response.breeds;
          if (res.response.taskContactsBreedRelationVOList) {
            this.tableData1 = res.response.taskContactsBreedRelationVOList;
          }
          if (res.response.relationTaskList) {
            this.tableData2 = res.response.relationTaskList;
          }
          // 变更前examineTableData1
          if (
            res.response.taskContactsVO.taskContactsBreedRelationVOList == null
          ) {
            this.examineTableDataOne = false;
            this.examineTableData = [];
          } else if (res.response.taskContactsVO.name == "变更前为空") {
            this.examineTableDataOne = true;
            this.examineTableData = [];
          } else {
            this.examineTableDataOne = true;
            this.examineTableData =
              res.response.taskContactsVO.taskContactsBreedRelationVOList;
          }

          if (res.response.taskContactsVO.name == null) {
            this.examineName = false;
            this.shenheform.examineName = "";
          } else if (res.response.taskContactsVO.name == "变更前为空") {
            this.examineName = true;
            this.shenheform.examineName = "";
          } else {
            this.examineName = true;
            this.shenheform.examineName = res.response.taskContactsVO.name;
          }

          if (res.response.taskContactsVO.sex == null) {
            this.examineSex = false;
            this.shenheform.examineSex = "";
          } else if (res.response.taskContactsVO.sex == "变更前为空") {
            this.examineSex = true;
            this.shenheform.examineSex = "";
          } else {
            this.examineSex = true;
            this.shenheform.examineSex =
              res.response.taskContactsVO.sex == 0 ? "男" : "女";
          }

          if (res.response.taskContactsVO.department == null) {
            this.examineDepartment = false;
            this.shenheform.examineDepartment = "";
          } else if (res.response.taskContactsVO.department == "变更前为空") {
            this.examineDepartment = true;
            this.shenheform.examineDepartment = "";
          } else {
            this.examineDepartment = true;
            this.shenheform.examineDepartment =
              res.response.taskContactsVO.department;
          }

          if (res.response.taskContactsVO.position == null) {
            this.examinePosition = false;
            this.shenheform.examinePosition = "";
          } else if (res.response.taskContactsVO.position == "变更前为空") {
            this.examinePosition = true;
            this.shenheform.examinePosition = "";
          } else {
            this.examinePosition = true;
            this.shenheform.examinePosition =
              res.response.taskContactsVO.position;
          }

          if (res.response.taskContactsVO.phone == null) {
            this.examinePhone = false;
            this.shenheform.examinePhone = "";
          } else if (res.response.taskContactsVO.phone == "变更前为空") {
            this.examinePhone = true;
            this.shenheform.examinePhone = "";
          } else {
            this.examinePhone = true;
            this.shenheform.examinePhone = res.response.taskContactsVO.phone;
          }

          if (res.response.taskContactsVO.mobile == null) {
            this.examineMobile = false;
            this.shenheform.examineMobile = "";
          } else if (res.response.taskContactsVO.mobile == "变更前为空") {
            this.examineMobile = true;
            this.shenheform.examineMobile = "";
          } else {
            this.examineMobile = true;
            this.shenheform.examineMobile = res.response.taskContactsVO.mobile;
          }

          if (res.response.taskContactsVO.qq == null) {
            this.examineQq = false;
            this.shenheform.examineQq = "";
          } else if (res.response.taskContactsVO.qq == "变更前为空") {
            this.examineQq = true;
            this.shenheform.examineQq = "";
          } else {
            this.examineQq = true;
            this.shenheform.examineQq = res.response.taskContactsVO.qq;
          }

          if (res.response.taskContactsVO.weChat == null) {
            this.examineWeChat = false;
            this.shenheform.examineWeChat = "";
          } else if (res.response.taskContactsVO.weChat == "变更前为空") {
            this.examineWeChat = true;
            this.shenheform.examineWeChat = "";
          } else {
            this.examineWeChat = true;
            this.shenheform.examineWeChat = res.response.taskContactsVO.weChat;
          }

          if (res.response.taskContactsVO.enterpriseName == null) {
            this.examineEnterpriseName = false;
            this.shenheform.examineEnterpriseName = "";
          } else if (res.response.taskContactsVO.enterpriseName == "变更前为空") {
            this.examineEnterpriseName = true;
            this.shenheform.examineEnterpriseName = "";
          } else {
            this.examineEnterpriseName = true;
            this.shenheform.examineEnterpriseName =
              res.response.taskContactsVO.enterpriseName;
          }

          if (res.response.taskContactsVO.enterpriseAddress == null) {
            this.examineEnterpriseAddress = false;
            this.shenheform.examineEnterpriseAddress = "";
          } else if (
            res.response.taskContactsVO.enterpriseAddress == "变更前为空"
          ) {
            this.examineEnterpriseAddress = true;
            this.shenheform.examineEnterpriseAddress = "";
          } else {
            this.examineEnterpriseAddress = true;
            this.shenheform.examineEnterpriseAddress =
              res.response.taskContactsVO.enterpriseAddress;
          }

          if (res.response.taskContactsVO.enterprisePostcode == null) {
            this.examineEnterprisePostcode = false;
            this.shenheform.examineEnterprisePostcode = "";
          } else if (
            res.response.taskContactsVO.enterprisePostcode == "变更前为空"
          ) {
            this.examineEnterprisePostcode = true;
            this.shenheform.examineEnterprisePostcode = "";
          } else {
            this.examineEnterprisePostcode = true;
            this.shenheform.examineEnterprisePostcode =
              res.response.taskContactsVO.enterprisePostcode;
          }
        });
        // 显示审核框
        this.shenheModal = true;
      },
      // 转换企业类型开始
      convertType(newVal, oldVal) {
        enterpeiseType().then(res => {
          let one = res.response;
          one.map((v, k) => {
            if (v.value == oldVal) {
              this.shenheform.examineEnterpriseType = v.desc;
            }
            if (v.value == newVal) {
              this.shenheform.enterpriseType = v.desc;
            }
          });
        });
      },
      // 转换企业结束
      // 转换企业性质开始
      convertNature(newVal, oldVal) {
        enterpeiseNature().then(res => {
          let two = res.response;
          two.map((v, k) => {
            if (v.value == oldVal) {
              this.shenheform.examineEnterpriseNature = v.desc;
            }
            if (v.value == newVal) {
              this.shenheform.enterpriseNature = v.desc;
            }
          });
        });
      },
      // 转换企业性质结束
      // 根据企业ID返回区域开始
      convertArea(newVal) {
        let params = {
          id: newVal
        };
        detailEnterprise(formData(params)).then(res => {
          this.shenheform.enterpriseArea = res.response.areaName;
          console.log(res);
        });
      },
      examineConvertArea(newVal) {
        let params = {
          id: newVal
        };
        detailEnterprise(formData(params)).then(res => {
          this.shenheform.examineEnterpriseArea = res.response.areaName;
        });
      },
      // 根据企业ID返回区域结束
      // 获取我的联系人审核列表
      getListPage() {
        this.$Spin.show();
        // axios
        //   .post("/information/contacts_audit/list", {
        //     pageNum: this.pageNum,
        //     pageSize: this.pageSize,
        //     auditStatus: this.auditStatus,
        //     name: this.value1,
        //     sex: this.value2,
        //     phone: this.value3,
        //     mobile: this.value5,
        //     enterpriseId: this.value4
        //   })
        //   .then(res => {
        //     if (res.status === 200) {
        //       console.log("待审核tab?已审核tab:" + this.tab);
        //       if (this.tab == 1) {
        //         this.tableData = res.data.response.list;
        //       } else {
        //         this.tableData0 = res.data.response.list;
        //       }
        //       this.total = res.data.response.total;
        //     }

        //     this.$Spin.hide();
        //   })
        //   .catch(err => {
        //     console.log(err);
        //     this.$Spin.hide();
        //   });
        let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          auditStatus: this.auditStatus,
          name: this.value1,
          sex: this.value2,
          phone: this.value3,
          mobile: this.value5,
          enterpriseId: this.value4
        };
        contactsAudit(params).then(res => {
          if (this.tab == 1) {
            this.tableData = res.response.list;
          } else {
            this.tableData0 = res.response.list;
          }
          this.total = res.response.total;
          this.$Spin.hide();
        });
      },
      // 监听分页
      pageChange(page, pageSize) {
        if (page) {
          this.pageNum = page;
        }
        if (pageSize) {
          this.pageSize = pageSize;
        }
        this.getListPage();
      },

      clear() {
        this.value1 = "";
        this.value2 = "";
        this.value3 = "";
        this.value4 = "";
        this.value5 = "";
        this.$refs.suozaizujian.clearSingleSelect();
      },
      //点击切换到待审核
      changeTab1() {
        this.tab = 1;
        this.auditStatus = 1;
        // 获取我的联系人审核列表
        this.getListPage();
      },
      //点击切换到已审核
      changeTab2() {
        this.tab = 2;
        this.auditStatus = 0;
        // 获取我的联系人审核列表
        this.getListPage();
      },
      //通过审核
      confirmModal(shenheform) {
        this.loadingConfirm = true;
        this.descriptionDisplay = false;
        let params = {
          id: this.shenheform.id,
          auditStatus: 0,
          description: this.shenheform.description
        };
        editContactsAudit(params).then(res => {
          this.$Message.success("审核成功!");
          this.loadingConfirm = false;
          // 加载列表
          this.changeTab2();
        });
        this.shenheModal = false;
      },
      //驳回审核
      rejectModal() {
        this.loadingReject = true;
        if (this.shenheform.description == "") {
          this.descriptionDisplay = true;
          this.loadingReject = false;
          return;
        }
        let that = this;
        let params = {
          id: that.shenheform.id,
          auditStatus: 1,
          description: that.shenheform.description
        };
        editContactsAudit(params).then(res => {
          that.$Message.success("驳回成功!");
          that.loadingReject = false;
          // 加载列表
          that.changeTab2();
          that.shenheModal = false;
          that.descriptionDisplay = false;
        });
      },
      //取消审核
      cancelModal() {
        this.shenheModal = false;
        this.descriptionDisplay = false;
      },
      // 企业搜索
      remoteMethod1(query) {
        console.log("搜索企业名称", query);
        if (query !== "") {
          this.loading1 = true;
          let params = {
            name: query
          };
          setTimeout(() => {
            this.loading1 = false;
            allenterpeiseName(formData(params)).then(res => {
              const list1 = res.response.map(item => {
                return {
                  value: item.id,
                  label: item.text
                };
              });
              this.options1 = list1;
            });
          }, 200);
        } else {
          this.options1 = [];
        }
      }
      // 获取企业性质
    }
  };
</script>