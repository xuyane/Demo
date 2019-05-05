<style lang="less" scoped>
.fx-boxs {
  min-height: 40px;
  width: 84%;
  z-index: 100;
  max-height: 90px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #f1f1f1;
  margin-bottom: 10px;
  margin-top: -5px;
  margin-left: 140px;
  border-radius: 4px;
}
.fx-boxs li {
  padding: 5px 15px;
}
.fx-box li:hover {
  background: #c1c1c1;
}
.read-table {
  border: 1px solid #bfbfbf;
  width: 100%;
  text-align: center;
  line-height: 50px;
  border-collapse: collapse;
}
.read-table td {
  border: 1px solid #bfbfbf;
}
.read-table .table-left {
  width: 40%;
  text-align: center;
  // border-right: 1px solid #BFBFBF;
  background-color: #e9eaef;
}
.read-table .table-right {
  width: 60%;
  text-align: left;
  padding-left: 15px;
}
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：网站管理&nbsp;&nbsp;>>&nbsp;&nbsp;栏目管理&nbsp;&nbsp;>>&nbsp;&nbsp;栏目列表
    </Row>
    </Col>
    <Col span="24">
    <Row :gutter="20">
      <Col span="4">
      <div class='leftree'>
        <Card :bordered="true">
          <p slot="title">频道列表</p>
          <div>
            <Tree :data="treeData" @on-select-change='findlist' :load-data="loadTree"></Tree>
          </div>
        </Card>
      </div>
      </Col>
      <Col span="20">
      <Row class-name="table-con">
        <Col span="24">
        <Form :model="params" :label-width="85">
          <Row type="flex" justify="space-between">
            <Col span="7">
            <FormItem label="栏目名称：">
              <Input v-model="params.name" class="search-input" placeholder="请输入栏目名称"></Input>
            </FormItem>
            </Col>
            <Col span="7">
            <FormItem label="状态：">
              <Select v-model="params.status" class="search-input" placeholder="全部">
                <Option v-for="item in selectStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="7" class="text-right">
            <Button type="primary" @click="search">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
            </Col>
          </Row>
        </Form>
        </Col>
        <div style="margin-bottom:20px">
          <Button type="primary" @click="addColumns">新增</Button>
        </div>
        <Table class="tableCommon" :data="tableData" :columns="columns" :stripe="true" :border="true">
        </Table>
        <oil-page :total="total" :page-num="params.pageNum" :page-size="params.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer">
        </oil-page>
      </Row>
      </Col>
    </Row>
    </Col>
    <!-- 新增 -->
    <Modal v-model="addModal" title="新增栏目" width="650" :styles="{top: '20px'}">
      <Form :label-width="130" ref="addForm" :rules="addRoles" :model="addForm">
        <Row>
          <FormItem label="上级频道：">
            <span>{{changePre ? changePre : '无'}}</span>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="栏目名称：" prop="name">
            <Input type="text" class="search-input" placeholder="请输入栏目名称" v-model="addForm.name" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="英文名：" prop="nameForeigns">
            <Input type="text" class="search-input" placeholder="请输入英文名" v-model="addForm.nameForeigns" />
          </FormItem>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="记录数：" prop="recordNumber">
            <Input-number :max="99" :min="1" v-model="addForm.recordNumber" class="search-input" style="width: 178px"></Input-number>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="顺序数：" prop="appNumber">
            <Input-number :max="999" :min="1" v-model="addForm.appNumber" class="search-input" style="width: 178px"></Input-number>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="是否需要授权：" prop="isNeedAuthorized">
            <Select v-model="addForm.isNeedAuthorized" class="search-input" transfer>
              <Option v-for="(item, index) in isNeedAuthorizedList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <FormItem label="URL地址：" prop="url">
            <Input type="text" class="search-input" placeholder="请输入URL地址" v-model="addForm.url" />
          </FormItem>
        </Row>
        <Row>
          <Col span="24">
          <Row>
            <Col span="18">
            <FormItem label="模板：" prop="templateName">
              <Input type="text" class="search-input" readonly v-model="templateName" />
            </FormItem>
            </Col>
            <Col span="6" class="text-right">
            <Button type="primary" @click="concatModal">关联模板</Button>
            </Col>
          </Row>
          </Col>
        </Row>
        <Row>
          <FormItem label="列表URL地址：" prop="listUrl">
            <Input type="text" class="search-input" placeholder="请输入列表URL地址" v-model="addForm.listUrl" />
          </FormItem>
        </Row>
        <Row>
          <Col span="24">
          <Row>
            <Col span="18">
            <FormItem label="列表模板：" prop="listTemplateName">
              <Input type="text" class="search-input" readonly v-model="listTemplateName" />
            </FormItem>
            </Col>
            <Col span="6" class="text-right">
            <Button type="primary" @click="concatListModal">关联模板</Button>
            </Col>
          </Row>
          </Col>
        </Row>
        <Row>
          <FormItem label="标签：" prop="labelName">
            <Select v-model="labelId" ref="input4" class="search-input" filterable remote transfer :remote-method="remoteMethod2" :loading="loading">
              <Option v-for="(item, index) in labelNameList" :value="item.id" :key="index">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <i-button :loading="submitAdd" type="primary" @click="saveColumns">保存</i-button>
        <i-button type="default" @click="cancelColumns(1)">取消</i-button>
      </div>
    </Modal>
    <!-- 查看 -->
    <Modal v-model="readModal" title="查看栏目" :styles="{top: '20px'}" width="650">
      <Row>
        <table class="read-table">
          <tr>
            <td class="table-left">栏目名称</td>
            <td class="table-right"><span>{{detail.name}}</span></td>
          </tr>
          <tr>
            <td class="table-left">英文名</td>
            <td class="table-right"><span>{{detail.nameForeigns}}</span></td>
          </tr>
          <tr>
            <td class="table-left">记录数</td>
            <td class="table-right"><span>{{detail.recordNumber}}</span></td>
          </tr>
          <tr>
            <td class="table-left">顺序数</td>
            <td class="table-right"><span>{{detail.appNumber}}</span></td>
          </tr>
          <tr>
            <td class="table-left">是否需要授权</td>
            <td class="table-right"><span>{{this.Authoriz}}</span></td>
          </tr>
          <tr>
            <td class="table-left">URL地址</td>
            <td class="table-right"><span>{{detail.url}}</span></td>
          </tr>
          <tr>
            <td class="table-left">模板</td>
            <td class="table-right"><span>{{this.templateName}}</span></td>
          </tr>
          <tr>
            <td class="table-left">列表URL地址</td>
            <td class="table-right"><span>{{detail.listUrl}}</span></td>
          </tr>
          <tr>
            <td class="table-left">列表模板</td>
            <td class="table-right"><span>{{this.listTemplateName}}</span></td>
          </tr>
          <tr>
            <td class="table-left">标签</td>
            <td class="table-right"><span>{{this.labelName}}</span></td>
          </tr>
        </table>
      </Row>
      <div slot="footer">
        <i-button type="default" @click="readModal=false">返回</i-button>
      </div>
    </Modal>
    <!-- 修改 -->
    <Modal v-model="modifyModal" title="修改栏目" width="650" :styles="{top: '20px'}">
      <Form :label-width="130" ref="edit" :rules="addRoles" :model="edit">
        <Row>
          <Col span="20">
          <FormItem label="上级频道：">
            <span>{{changePre ? changePre : '无'}}</span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
          <FormItem label="栏目名称：" prop="name">
            <Input type="text" class="search-input" v-model="edit.name" />
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
          <FormItem label="英文名：" prop="nameForeigns">
            <Input type="text" class="search-input" placeholder="请输入英文名" v-model="edit.nameForeigns" />
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem label="记录数：" prop="recordNumber">
            <Input-number :max="99" :min="1" v-model="edit.recordNumber" style="width: 178px"></Input-number>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="顺序数：" prop="appNumber">
            <Input-number :max="999" :min="1" v-model="edit.appNumber" style="width: 178px"></Input-number>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem label="是否需要授权：" prop="isNeedAuthorized">
            <Select v-model="edit.isNeedAuthorized" class="search-input" transfer>
              <Option v-for="(item, index) in isNeedAuthorizedList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="20">
          <FormItem label="URL地址：" prop="url">
            <Input type="text" class="search-input" v-model="edit.url" />
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
          <Row>
            <Col span="18">
            <FormItem label="模板：" prop="templateName">
              <Input type="text" class="search-input" readonly style="color:#123123" v-model="templateName" />
            </FormItem>
            </Col>
            <Col span="6" class="text-right">
            <Button type="primary" @click="concatEditModal">关联模板</Button>
            </Col>
          </Row>
          </Col>
        </Row>
        <Row>
          <Col span="20">
          <FormItem label="列表URL地址：" prop="listUrl">
            <Input type="text" class="search-input" v-model="edit.listUrl" />
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
          <Row>
            <Col span="18">
            <FormItem label="列表模板：" prop="listTemplateName">
              <Input type="text" class="search-input" readonly style="color: #131212" v-model="listTemplateName" />
            </FormItem>
            </Col>
            <Col span="6" class="text-right">
            <Button type="primary" @click="concateditListModal">关联模板</Button>
            </Col>
          </Row>
          </Col>
        </Row>
        <Row>
          <Col span="20">
          <FormItem label="标签：" prop="labelName">
            <Select v-model="labelId" ref="input4" class="search-input" filterable remote transfer :remote-method="remoteMethod2" :loading="loading">
              <Option v-for="(item, index) in labelNameList" :value="item.id" :key="index">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <i-button :loading="submitEdit" type="primary" @click="saveEdit">保存</i-button>
        <i-button type="default" @click="cancelColumns(2)">取消</i-button>
      </div>
    </Modal>
    <!-- 新增关联模板 -->
    <Modal v-model="mouldModal" title="关联模板" :width="700">
      <Row>
        <Form ref="selectModal" :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="12">
            <FormItem label="网站模板名称：" :label-width="110">
              <Input v-model="selectform3.templateName" class="search-input" placeholder="请输入模板名称"></Input>
            </FormItem>
            </Col>
            <Col span="12" class="text-right">
            <Button type="primary" @click="templateSearch">查询</Button>
            <Button @click="templateReset1" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table class="tableCommon" border :columns="columns4" :data="dataTable" @on-row-click="handleRowChange"></Table>
        <oil-page :total="total3" :page-num="selectform3.pageNum" :page-size="5" @page-change="pageChange2" :page-size-opts="pageSizeOpts2" show-sizer></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveMouldModal(1)">保存</i-button>
        <i-button type="default" @click="cancelMouldModal(1);">取消</i-button>
      </div>
    </Modal>
    <!-- 修改关联模板 -->
    <Modal v-model="editmouldModal" title="关联模板" :width="700">
      <Row>
        <Form ref="selectModal" :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="12">
            <FormItem label="网站模板名称：" :label-width="110">
              <Input v-model="selectform5.templateName" class="search-input" placeholder="请输入模板名称"></Input>
            </FormItem>
            </Col>
            <Col span="12" class="text-right">
            <Button type="primary" @click="templateSearch5">查询</Button>
            <Button @click="templateReset1" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table class="tableCommon" border :columns="editColumns" :data="dataTable5" @on-row-click="handleRowChange"></Table>
        <oil-page :total="total5" :page-num="selectform5.pageNum" :page-size="5" @page-change="pageChange5" :page-size-opts="pageSizeOpts2" show-sizer></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveMouldModal(2)">保存</i-button>
        <i-button type="default" @click="cancelMouldModal(2)">取消</i-button>
      </div>
    </Modal>
    <!-- 新增关联列表模板 -->
    <Modal v-model="listMouldModal" title="关联模板" :width="700">
      <Row>
        <Form ref="selectModal" :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="12">
            <FormItem label="网站模板名称：" :label-width="110">
              <Input v-model="selectform4.templateName" class="search-input" placeholder="请输入模板名称"></Input>
            </FormItem>
            </Col>
            <Col span="12" class="text-right">
            <Button type="primary" @click="templateSearch2">查询</Button>
            <Button @click="templateReset2" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table class="tableCommon" border :columns="columns5" :data="dataTable2" @on-row-click="handleRowChange"></Table>
        <oil-page :total="total4" :page-num="selectform4.pageNum" :page-size="5" @page-change="pageChange3" :page-size-opts="pageSizeOpts2" show-sizer></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveMouldModal(3)">保存</i-button>
        <i-button type="default" @click="cancelMouldModal(3)">取消</i-button>
      </div>
    </Modal>
    <!-- 修改关联列表模板 -->
    <Modal v-model="editlistMouldModal" title="关联模板" :width="700">
      <Row>
        <Form ref="selectModal" :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="12">
            <FormItem label="网站模板名称：" :label-width="110">
              <Input v-model="selectform6.templateName" class="search-input" placeholder="请输入模板名称"></Input>
            </FormItem>
            </Col>
            <Col span="12" class="text-right">
            <Button type="primary" @click="templateSearch6">查询</Button>
            <Button @click="templateReset2" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table class="tableCommon" border :columns="editListcolunns" :data="dataTable6" @on-row-click="handleRowChange"></Table>
        <oil-page :total="total6" :page-num="selectform6.pageNum" :page-size="5" @page-change="pageChange6" :page-size-opts="pageSizeOpts2" show-sizer></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveMouldModal(4)">保存</i-button>
        <i-button type="default" @click="cancelMouldModal(4)">取消</i-button>
      </div>
    </Modal>
  </Row>
</template>

<script>
import associateAreaSearch from "../../components/cms/associateAreaSearch.vue";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import OilPage from "../../components/page/page.vue";
import {
  websiteColumnList,
  websiteColumnAdd,
  websiteColumnDetail,
  websiteColumnEdit,
  websiteTemplateList,
  // websiteColumnUnique,
  websiteChannelList,
  websiteColumnEditStatus,
  websitetTemplateEditPage,
  websiteChannelDetail,
  websiteChannelTree,
  websiteLabelDetail, //根据标签获取标签吧信息
  websiteLabelList
} from "../../components/axios/website.js";
import { formatTime2, formData } from "../../../assets/js/common.js";
import {
  deleteRolePermission,
  deleteRoleUser,
deleteRole,
deleteRolePermissionList
} from "../../components/axios/EAC";
export default {
  name: "columnManagement",
  components: {
    OilPage,
    associateAreaSearch,
    associateSearch
  },
  watch: {
    addModal(newVal, oldVal) {
      if (newVal == true) {
        this.$refs["addForm"].resetFields();
      }
    },
    mouldModal(newVal, oldVal) {
      if (newVal == true) {
        this.templateSearch();
      }
    },
    listMouldModal(newVal, oldVal) {
      if (newVal == true) {
        this.templateSearch2();
      }
    },
    editmouldModal(newVal, oldVal) {
      if (newVal == true) {
        this.templateSearch5();
      }
    },
    editlistMouldModal(newVal, oldVal) {
      if (newVal == true) {
        this.templateSearch6();
      }
    }
  },
  data() {
    const validateChannel = (rule, value, callback) => {
      if (this.$refs.input3.query === "") {
        callback(new Error("请选择频道路径"));
      } else {
        callback();
      }
    };
    const validateTemplateId = (rule, value, callback) => {
      let templateName = this.templateName;
      if (templateName) {
        callback();
      } else {
        callback(new Error("请选择模板"));
      }
    };
    const validateListTemplate = (rule, value, callback) => {
      let listTemplateName = this.listTemplateName;
      if (listTemplateName) {
        callback();
      } else {
        callback(new Error("请选择列表模板"));
      }
    };
    const validateLabel = (rule, value, callback) => {
       let labelId = this.labelId;
      if (labelId) {
        callback();
      } else {
        callback(new Error("请选择标签"));
      }
    };
    return {
      editmouldModal: false,
      loading: false,
      submitEdit: false,
      submitAdd: false,
      treeData: [],
      edit: {},
      templateName: "",
      listTemplateName: "",
      params: {
        id: null,
        siteId: "",
        treeCode: "",
        treeId: "",
        name: "",
        status: "",
        pageNum: 1,
        pageSize: 10
      },
      selectform3: {
        pageNum: 1,
        pageSize: 5
      },
      selectform4: {
        pageNum: 1,
        pageSize: 5
      },
      selectform5: {
        pageNum: 1,
        pageSize: 5
      },
      selectform6: {
        pageNum: 1,
        pageSize: 5
      },
      label: {
        status: 0,
        name: ""
      },
      Authoriz: "",
      isNeedAuthorizedList: [
        {
          value: 0,
          label: "需要"
        },
        {
          value: 1,
          label: "不需要"
        }
      ],
      mould: {},
      selectRow: {},
      labelNameList: [],
      selectform: "",
      labelName: "",
      labelId: "",
      id: "",
      templateId: "",
      listTemplateId: "",
      templateId2: "",
      listTemplateId2: "",
      checkList3: {},
      checkList4: {},
      checkList5: {},
      checkList6: {},
      detail: {},
      total: 0,
      total3: 0,
      total4: 0,
      total5: 0,
      total6: 0,
      columnId: "",
      pageSizeOpts2: [5, 10, 20],
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      showSizer: true,
      readModal: false,
      addModal: false,
      modifyModal: false,
      forbiddenModal: false,
      enableSiteModal: false,
      mouldModal: false,
      listMouldModal: false,
      editlistMouldModal: false,
      addRoles: {
        name: [
          { required: true, message: "栏目名称不能为空", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "栏目名称不能超过100个字符",
            trigger: "change"
          }
        ],
        nameForeigns: [
          {
            type: "string",
            max: 100,
            message: "英文名不能超过100个字符",
            trigger: "change"
          }
        ],
        recordNumber: [
          {
            required: true,
            message: "记录数不能为空",
            trigger: "blur",
            type: "number"
          }
        ],
        url: [
          { required: true, message: "url地址不能为空", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "url地址不能超过100个字符",
            trigger: "blur"
          }
        ],
        templateName: [
          { required: true, validator: validateTemplateId, trigger: "blur" }
        ],

        labelName: [
          {
            required: true,
            validator: validateLabel,
            trigger: "blur"
          }
        ],
        listTemplateName: [
          { required: true, validator: validateListTemplate, trigger: "blur" }
        ],
        listUrl: [
          { required: true, message: "列表url不能为空", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "列表url地址不能超过100个字符",
            trigger: "blur"
          }
        ]
      },
      able: "",
      channelId: "",
      addForm: {
        isNeedAuthorized: 0,
        status: 0,
        recordNumber: 1,
        appNumber: 1
      },
      selectRow: "",
      selectData: {},
      formItem: {},
      changePre: "",
      selectStatus: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "正常"
        },
        {
          value: 1,
          label: "禁用"
        }
      ],
      tableData: [],
      dataTable2: [],
      dataTable5: [],
      dataTable6: [],
      columns: [
        {
          key: "id",
          title: "栏目ID",
          align: "center",
          minWidth: 100
        },
        {
          key: "name",
          title: "栏目名称",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.id = params.row.id;
                      this.templateId = params.row.templateId;
                      this.listTemplateId = params.row.listTemplateId;
                      this.labelId = params.row.labelId;
                      if (params.row.isNeedAuthorized === 0) {
                        this.Authoriz = "需要";
                      } else {
                        this.Authoriz = "不需要";
                      }
                      this.readModal = true;
                      this.showDetail(params);
                      // console.log
                    }
                  }
                },
                params.row.name
              )
            ]);
          }
        },
        {
          key: "channelPathName",
          title: "频道路径",
          align: "center",
          minWidth: 400
        },
        {
          key: "isNeedAuthorized",
          title: "是否需要授权",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.isNeedAuthorized === 0
                ? "需要"
                : data.row.isNeedAuthorized === 1
                  ? "不需要"
                  : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {}
              },
              label
            );
          }
        },
        {
          key: "appNumber",
          title: "顺序号",
          align: "center",
          minWidth: 100
        },
        {
          key: "status",
          title: "状态",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.status === 0
                ? "正常"
                : data.row.status === 1
                  ? "禁用"
                  : "";
            let color =
              data.row.status === 0
                ? "#9ecd3f"
                : data.row.status === 1
                  ? "red"
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
          key: "creatorName",
          title: "创建人",
          align: "center",
          minWidth: 100
        },
        {
          key: "createTime",
          title: "创建时间",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            const result = params.row.createTime
              ? formatTime2(params.row.createTime)
              : "";
            return h("div", {}, result);
          }
        },
        {
          key: "operate",
          title: "操作",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "20px"
                  },
                  on: {
                    click: () => {
                      this.modifyModal = true;
                      // this.edit = params.row;
                      // this.isNeedAuthorized = params.row.isNeedAuthorized;
                      // this.edit.channelPathName = params.row.channelPathName;
                      this.templateId2 = params.row.templateId;
                      this.listTemplateId2 = params.row.listTemplateId;
                      this.channelId = params.row.channelColumnVO.channelId;
                      this.editName(params);
                      console.log(
                        this.edit.isNeedAuthorized
                        //this.edit.channelPathName
                      );
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      // 禁用
                      if (params.row.status == 0) {
                        console.log(11);
                        console.log(params);
                        this.forbidden(params);
                      }
                      if (params.row.status == 1) {
                        console.log(params);
                        this.enable(params);
                      }
                    }
                  }
                },
                params.row.status == 1
                  ? "启用"
                  : params.row.status == 0
                    ? "禁用"
                    : ""
              )
            ]);
          }
        }
      ],
      dataTable: [],
      columns4: [
        {
          align: "center",
          title: "操作",
          width: 80,
          render: (h, data) => {
            let defaults = false;
            let id = data.row.id;
            if (this.checkList3.id === id) {
              defaults = true;
            } else {
              defaults = false;
            }
            return h("Radio", {
              props: {
                value: defaults
              },
              on: {
                input: () => {
                  this.modalCheck3(data.row);
                }
              }
            });
          }
        },
        {
          key: "templateName",
          title: "网站模板名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "templateTypeName",
          title: "网站模板分类",
          align: "center",
          minWidth: 180
        }
      ],

      editColumns: [
        {
          align: "center",
          title: "操作",
          width: 80,
          render: (h, data) => {
            let defaults = false;
            let id = data.row.id;
            if (this.checkList5.id === id) {
              defaults = true;
            } else {
              defaults = false;
            }
            return h("Radio", {
              props: {
                value: defaults
              },
              on: {
                input: () => {
                  this.modalCheck5(data.row);
                }
              }
            });
          }
        },
        {
          key: "templateName",
          title: "网站模板名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "templateTypeName",
          title: "网站模板分类",
          align: "center",
          minWidth: 180
        }
      ],
      columns5: [
        {
          align: "center",
          title: "操作",
          width: 80,
          render: (h, data) => {
            let defaults = false;
            let id = data.row.id;
            if (this.checkList4.id === id) {
              defaults = true;
            } else {
              defaults = false;
            }
            return h("Radio", {
              props: {
                value: defaults
              },
              on: {
                input: () => {
                  this.modalCheck4(data.row);
                }
              }
            });
          }
        },
        {
          key: "templateName",
          title: "网站模板名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "templateTypeName",
          title: "网站模板分类",
          align: "center",
          minWidth: 180
        }
      ],
      editListcolunns: [
        {
          align: "center",
          title: "操作",
          width: 80,
          render: (h, data) => {
            let defaults = false;
            let id = data.row.id;
            if (this.checkList6.id === id) {
              defaults = true;
            } else {
              defaults = false;
            }
            return h("Radio", {
              props: {
                value: defaults
              },
              on: {
                input: () => {
                  this.modalCheck6(data.row);
                }
              }
            });
          }
        },
        {
          key: "templateName",
          title: "网站模板名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "templateTypeName",
          title: "网站模板分类",
          align: "center",
          minWidth: 180
        }
      ]
    };
  },
  methods: {
    //树
    channelTree() {
      websiteChannelTree({
        code: "string",
        id: 0,
        isLeaf: 0,
        name: "string",
        status: 0,
        parentId: 0,
        sign: "string",
        siteId: 0
      }).then(res => {
        this.treeData = res.response.map(item => {
          if (item.isLeaf) {
            return {
              code: item.code,
              value: item.id,
              title: item.name,
              siteId: item.siteId,
              loading: false,
              status: 0,
              children: [],
              pathName: item.pathName
            };
          } else {
            return {
              code: item.code,
              value: item.id,
              title: item.name,
              siteId: item.siteId,
              pathName: item.pathName
            };
          }
        });
      });
    },
    //加载树节点
    loadTree(item, callback) {
      websiteChannelTree({
        //"code": item.code,
        id: item.value,
        status: 0,
        // "isLeaf": item.isLeaf,
        // "name": item.name,
        // "parentId": item.parentId,
        // "sign": item.sign,
        siteId: item.siteId
      }).then(res => {
        let data = res.response.map(item => {
          if (item.isLeaf) {
            return {
              code: item.code,
              value: item.id,
              title: item.name,
              siteId: item.siteId,
              loading: false,
              children: [],
              pathName: item.pathName
            };
          } else {
            return {
              code: item.code,
              value: item.id,
              title: item.name,
              siteId: item.siteId,
              pathName: item.pathName
            };
          }
        });
        callback(data);
      });
    },
    //通过数点击左边叶子节点
    findlist(treeNode) {
      this.treeArr = treeNode[0];
      if (this.treeArr) {
        this.changePre = treeNode[0].pathName;
        this.params.code = treeNode[0].code ? treeNode[0].code : null;
        //this.params.id = treeNode[0].id ? treeNode[0].id : null;
        this.params.siteId = treeNode[0].siteId ? treeNode[0].siteId : null;
        this.params.treeId = treeNode[0].value ? treeNode[0].value : null;
        this.search();
      }
    },
    // 获取栏目列表
    tableList() {
      this.form = {
        code: this.params.code == undefined ? "" : this.params.code,
        name: this.params.name,
        siteId: this.params.siteId == undefined ? "" : this.params.siteId,
        status: this.params.status == undefined ? "" : this.params.status,
        pageNum: this.params.pageNum,
        pageSize: this.params.pageSize
      };
      websiteColumnList(formData(this.form)).then(res => {
        if (res.response) {
          this.tableData = res.response.list;
          this.total = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    //取消
    cancelColumns(type) {
      if (type == 1) {
         this.addModal = false;
        this.addForm = {};
      }
      if (type == 2) {
        this.modifyModal = false;
        this.edit = {};
       
      }
      this.templateId = "";
      this.templateName = "";
      this.listTemplateId = "";
      this.listTemplateName = "";
      this.labelId = "";
    },
    // 分页
    pageChange(page, size) {
      if (size) {
        this.params.pageNum = 1;
        this.params.pageSize = size;
      } else {
        this.params.pageNum = page;
      }
      this.tableList();
    },
    pageChange2(page, size) {
      if (size) {
        this.selectform3.pageNum = 1;
        this.selectform3.pageSize = size;
      } else {
        this.selectform3.pageNum = page;
      }
      this.templateSearch(true);
    },
    pageChange3(page, size) {
      if (size) {
        this.selectform4.pageNum = 1;
        this.selectform4.pageSize = size;
      } else {
        this.selectform4.pageNum = page;
      }
      this.templateSearch2(true);
    },
    pageChange5(page, size) {
      if (size) {
        this.selectform5.pageNum = 1;
        this.selectform5.pageSize = size;
      } else {
        this.selectform5.pageNum = page;
      }
      this.templateSearch5(true);
    },
    //保存模板
    saveMouldModal(type) {
      if (type == 1) {
        this.templateName = this.selectRow.templateName;
        this.$refs.addForm.validate();
        //this.$refs.addForm.validateFields("templateName");
      }
      if (type == 2) {
        this.templateName = this.selectRow.templateName;
         //this.$refs.edit.validateFields("templateName");
        this.$refs.edit.validate();
      }
      if (type == 3) {
        this.listTemplateName = this.selectRow.templateName;
         //this.$refs.addForm.validateFields("listTemplateName");
        //this.$refs.addForm.validate();
      }
      if (type == 4) {
        this.listTemplateName = this.selectRow.templateName;
        //this.$refs.edit.validateFields("listTemplateName");
         this.$refs.edit.validate();
      }
      this.cancelMouldModal(type);

    },
    //取消列表
    cancelMouldModal(type) {
      if (type == 1) {
        this.mouldModal = false;
      }
      if (type == 2) {
        this.editmouldModal = false;
      }
      if (type == 3) {
        this.listMouldModal = false;
      }
      if (type == 4) {
        this.editlistMouldModal = false;
      }
    },
    pageChange6(page, size) {
      if (size) {
        this.selectform6.pageNum = 1;
        this.selectform6.pageSize = size;
      } else {
        this.selectform6.pageNum = page;
      }
      this.templateSearch6(true);
    },
    modalCheck3(selection) {
      this.checkList3 = selection;
      this.addForm.templateName = this.checkList3.templateName;
      this.addForm.templateId = this.checkList3.id;
    },
    modalCheck4(selection) {
      this.checkList4 = selection;
      this.listTemplateName = this.checkList4.templateName;
      this.listTemplateId = this.checkList4.id;
    },
    modalCheck5(selection) {
      this.checkList5 = selection;
      this.edit.templateName = this.checkList5.templateName;
      this.edit.templateId = this.checkList5.id;
      console.log(this.edit.templateName, this.edit.templateId);
    },
    modalCheck6(selection) {
      this.checkList6 = selection;
      this.listTemplateName = this.checkList6.templateName;
      this.listTemplateId = this.checkList6.id;
    },
    // 新增弹窗
    addColumns() {
      if (this.params.treeId) {
        this.addModal = true;
      } else {
        this.$Message.warning("请选择频道");
      }
    },
    concatEditModal() {
      this.editmouldModal = true;
    },
    concateditListModal() {
      this.editlistMouldModal = true;
    },
    // 获取频道列表
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          status: 0
        };
        setTimeout(() => {
          this.loading = false;
          websiteChannelList(formData(params)).then(res => {
            this.channelPathNameList = res.response.list;
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    // 获取标签列表
    remoteMethod2() {
      websiteLabelList(formData(this.label)).then(res => {
        this.labelNameList = res.response.list;
      });
    },
    getTemplateName() {},
    // 查询
    search() {
      this.params.pageNum = 1;
      this.params.pageSize = 10;
      this.tableList();
    },
    // 重置
    reset() {
      this.params = {
        siteId: this.params.siteId,
        treeCode: this.params.treeCode,
        treeId: this.params.treeId,
        name: "",
        status: "",
        pageNum: 1,
        pageSize: 10
      };
    },
    editName(params) {
      let that = this;
      websiteColumnDetail(
        formData({
          id: params.row.id
        })
      ).then(res => {
        that.edit = res.response;
        that.labelId = res.response.labelId;
        that.$refs.edit.validateFields("labelName");
      });
      websitetTemplateEditPage(formData({ templateId: this.templateId2 })).then(
        res => {
          that.templateName = res.response.templateName;
        }
      );
      websitetTemplateEditPage(
        formData({ templateId: this.listTemplateId2 })
      ).then(res => {
        that.listTemplateName = res.response.templateName;
        // console.log(this.detail.listTemplateName )
      });
      websiteChannelDetail(formData({ id: this.channelId })).then(res => {
        that.changePre = res.response.pathName;
        // console.log(this.detail.listTemplateName )
      });
    },
    // 查看栏目详情
    showDetail(params) {
      websitetTemplateEditPage(formData({ templateId: this.templateId })).then(
        res => {
          // console.log('111',res.response.templateName)
          this.templateName = res.response.templateName;
        }
      );
      websitetTemplateEditPage(
        formData({ templateId: this.listTemplateId })
      ).then(res => {
        this.listTemplateName = res.response.templateName;
        // console.log(this.detail.listTemplateName )
      });
      if (this.labelId) {
        websiteLabelDetail(formData({ id: this.labelId })).then(res => {
          this.labelName = res.response.name;
          console.log(this.labelName);
        });
      } else {
        this.labelName = "";
      }

      websiteColumnDetail(
        formData({
          id: this.id
        })
      ).then(res => {
        this.detail = res.response;
        // console.log(this.detail)
      });
    },
    // 监听选中项发生变化
    handleRowChange(row) {
      this.selectRow = row;
    },
    // 编辑栏目列表信息
    saveEdit() {
      let that = this;
      that.submitEdit = true;
      this.$refs.edit.validate(valid => {
        if (valid) {
            websiteColumnEdit({
              name: this.edit.name,
              // channelPathName: this.edit.channelPathName,
              url: that.edit.url,
              templateId: that.edit.templateId,
              templateName: that.templateName,
              listUrl: that.edit.listUrl,
              listTemplateId: that.listTemplateId,
              listTemplateName: that.listTemplateName,
              labelId: that.labelId,
              status: that.edit.status,
              id: that.edit.id,
              creatorId: that.edit.creatorId,
              creatorName: that.edit.creatorName,
              appNumber: that.edit.appNumber,
              nameForeigns: that.edit.nameForeigns,
              recordNumber: that.edit.recordNumber,
              createTime: that.edit.createTime,
              version: that.edit.version,
              isNeedAuthorized: that.edit.isNeedAuthorized
            }).then(res => {
              that.modifyModal = false;
              if (res.status == 200) {
                that.$Message.success("修改成功！");
                that.cancelColumns(2); 
                that.submitEdit = false;
                that.tableList();
              } else {
                that.$Message.error(res.message);
              }
              setTimeout(() => {
                this.submitEdit = false;
              }, 1000);
            });
          
        }else{
          that.submitEdit = false;
        }
      });
    },
    // 新增
    saveColumns() {
      let that = this;
       this.submitAdd = true;
      this.$refs.addForm.validate(valid => {
        if (valid) {
            let form = {
              channelColumnVO: {
                channelId: this.params.treeId,
                columnId: 1,
                id: "",
                sign: ""
              },
              name: this.addForm.name,
              url: this.addForm.url,
              templateId: this.addForm.templateId,
              templateName: this.addForm.templateName,
              listTemplateName: this.addForm.listTemplateName,
              listUrl: this.addForm.listUrl,
              listTemplateId: this.listTemplateId,
              labelId: this.labelId,
              nameForeigns: this.addForm.nameForeigns,
              recordNumber: this.addForm.recordNumber,
              appNumber: this.addForm.appNumber,
              isNeedAuthorized: this.addForm.isNeedAuthorized,
              status: "0",
              creatorName: ""
            };
            websiteColumnAdd(form).then(res => {
              this.addModal = false;
              if (res.status == 200) {
                that.$Message.success("添加成功！");
                that.submitAdd = false;
                that.cancelColumns(1); 
                that.tableList();
              } else {
                this.$Message.error(res.message);
              }
             setTimeout(() => {
                this.submitAdd = false;
              }, 1000);
            });
        }else{
           that.submitAdd = false;
        }
      });
    },
    // 启用
    enable(params) {
      let _this = this;
      var config = {
        title: "提示信息",
        content: "您确定启用吗？",
        onOk: () => {
          let form = {
            id: params.row.id,
            status: 0
          };
          websiteColumnEditStatus(formData(form)).then(res => {
            _this.$Message.success("启用成功");
            _this.tableList();
          });
        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      };
      this.$Modal.confirm(config);
    },

    forbidden(params) {
      let _this = this;
      var config = {
        title: "提示信息",
        content: "您确定禁用吗？",
        onOk: () => {
          let form = {
            id: params.row.id,
            status: 1
          };
          websiteColumnEditStatus(formData(form)).then(res => {
            _this.$Message.success("禁用成功");
            _this.tableList();
          });
        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      };
      this.$Modal.confirm(config);
    },

    concatModal() {
      this.mouldModal = true;
    },
    // 模板类型重置
    templateReset1() {
      this.selectform3 = {
        name: "",
        pageNum: 1,
        pageSize: 5
      };
    },
    templateReset2() {
      this.selectform4 = {
        name: "",
        pageNum: 1,
        pageSize: 5
      };
    },
    // 获取关联模板列表
    templateSearch(isPage) {
      if (!isPage) {
        this.selectform3.pageNum = 1;
        this.selectform3.status = 0;
      }
      websiteTemplateList(this.selectform3).then(res => {
        if (res.response && res.response.list) {
          this.dataTable = res.response.list;
          this.total3 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    templateSearch2(isPage) {
      if (!isPage) {
        this.selectform4.pageNum = 1;
        this.selectform4.status = 0;
      }
      websiteTemplateList(this.selectform4).then(res => {
        if (res.response && res.response.list) {
          this.dataTable2 = res.response.list;
          this.total4 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    templateSearch5(isPage) {
      if (!isPage) {
        this.selectform5.pageNum = 1;
        this.selectform5.status = 0;
      }
      websiteTemplateList(this.selectform5).then(res => {
        if (res.response && res.response.list) {
          this.dataTable5 = res.response.list;
          this.total5 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    templateSearch6(isPage) {
      if (!isPage) {
        this.selectform6.pageNum = 1;
        this.selectform6.status = 0;
      }
      websiteTemplateList(this.selectform6).then(res => {
        if (res.response && res.response.list) {
          this.dataTable6 = res.response.list;
          this.total6 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    // 打开关联模板弹窗
    concatListModal() {
      this.listMouldModal = true;
    }
  },
  mounted() {
    this.channelTree();
    this.tableList();
  }
};
</script>


