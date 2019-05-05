<style>
</style>

<template >
  <Row class='varietybox'>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：基础数据中心&nbsp;&nbsp;>>&nbsp;&nbsp;品种管理
    </Row>
    </Col>
    <Col
      span="24"
      class-name="search-form"
    >
    <Form
      ref="form"
      :model="form"
      :label-width="120"
    >
      <Row
        type="flex"
        justify="space-between"
      >
        <Col span='7'>
        <FormItem label="品种名称:">
          <Input
            type="text"
            v-model="form.breedName"
            class="search-input"
          ></Input>
        </FormItem>
        </Col>
        <Col span='7'>
        <FormItem label="别名:">
          <Input
            type="text"
            v-model="form.keyword"
            class="search-input"
          ></Input>
        </FormItem>
        </Col>
        <Col span='7'>
        <FormItem label="缩写:">
          <Input
            type="text"
            v-model="form.shortName"
            class="search-input"
          ></Input>
        </FormItem>
        </Col>
      </Row>
      <Row
        type="flex"
        justify="space-between"
      >
        <Col span='7'>
        <FormItem label="状态:">
          <Select v-model="form.status">
            <Option
              v-for="item in statusList"
              :value="item.value"
              :key="item.value"
            >{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col
          span="7"
          class="text-right"
        >
        <Button
          type="primary"
          @click="search"
        >查询</Button>
        <Button
          style="margin-left: 8px"
          @click="reset"
        >重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <div class="btn-container">
        <Button
          type="primary"
          class="search-btn"
          @click="addBreed"
        >新增品种</Button>
        <Button
          type="primary"
          class="search-btn"
          @click="importBreed"
        >导入品种</Button>
        <Button
          type="primary"
          class="search-btn"
          @click="exportExcle"
        >导出模板</Button>
      </div>
      <Table
        class="tableCommon"
        border
        :columns="columns"
        :data="tableData"
      ></Table>
      <div class="page-con">
        <oil-page
          :total="total"
          :page-num="pageNum"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"
        ></oil-page>
      </div>
    </Row>
    </Col>

    <!-- 导入品种弹窗 -->
    <Modal
      v-model="showMoreImportModal"
      title="导入品种"
      width="690"
    >
      <Row
        type="flex"
        justify="space-between"
      >
        <Col
          span="24"
          class="mar-top-20 "
        >
        <div
          class="file-box"
          style="text-align:center"
        >
          <!-- <span class="mar-left-36">附件：</span> -->
          <input
            type='text'
            name='textfield'
            id='textfield'
            class='txt'
            style="display:none"
            v-model="values1"
          />
          <input
            type='button'
            class='search-btn'
            value="上传文件"
          />
          <input
            type="file"
            name="fileField"
            class="file"
            id="headExcel"
            @change="beforeUpload($event)"
            size="28"
          />
        </div>
        </Col>
      </Row>
      <div slot="footer">
        <Button
          :loading="loading"
          type="primary"
          @click="fileImport"
        >导入</Button>
        <Button
          style="margin-left:8px;"
          @click="importCancel"
        >返回</Button>
      </div>
    </Modal>
    <link-variety-modal
      :showLinkModal='showLinkModal'
      @hide-modal="hideLinkModal"
      ref="inputData"
    ></link-variety-modal>
    <add-variety-modal
      :showAddModal='showAddModal'
      @hide-modal="hideAddModal"
      @queryData="queryData"
    ></add-variety-modal>
    <check-variety-modal
      :showCheckModal='showCheckModal'
      @hide-modal="hideCheckModal"
      ref="showData"
    ></check-variety-modal>
    <edit-variety-modal
      :showEditModal='showEditModal'
      @hide-modal="hideEditModal"
      ref="editData"
      @queryData="queryData"
    ></edit-variety-modal>
    <specifications-variety-modal
      :showSpecificationsModal='showSpecificationsModal'
      @hide-modal="hideSpecificationsModal"
      ref="showSpecifications"
    ></specifications-variety-modal>
    <on-or-off
      :msgContent="msgContent"
      :cid="cid"
      :cType="cType"
      :enableUrl="enableUrl"
      :disableUrl="disableUrl"
      @query="queryData"
      ref="showIsUseModel"
    ></on-or-off>
  </Row>
</template>
<script>
import axios from "axios";
import linkVarietyModal from "./linkVariety.vue";
import addVarietyModal from "./addVariety.vue";
import checkVarietyModal from "./checkVariety.vue";
import editVarietyModal from "./editVariety.vue";
import specificationsVarietyModal from "./specificationBreeds.vue";
import oilPage from "../../components/page/page.vue";
import onOrOff from "../../components/cms/onOrOff.vue";
import { deleteRoleUserList } from '../../components/axios/EAC';

export default {
  name: "varietymanage",
  components: {
    linkVarietyModal,
    editVarietyModal,
    specificationsVarietyModal,
    checkVarietyModal,
    addVarietyModal,
    oilPage,
    onOrOff
  },
  data() {
    return {
      loading: false,
      fileValue: "",
      showLinkModal: false,
      showAddModal: false,
      showCheckModal: false,
      showEditModal: false,
      showSpecificationsModal: false,
      showIsUsermodal: false,
      showMoreImportModal: false,
      disableUrl: "",
      enableUrl: "",
      msgContent: "",
      values1: "",
      fileName: "",
      cid: 0,
      cType: 0,
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      form: {
        status: -1,
        breedName: "",
        keyword: "",
        shortName: ""
      },
      statusList: [],
      columns: [
        {
          title: "品种名称",
          key: "name",
          minWidth: 150,
          className: "colorblue",
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.showBreedDetail(data.row.breedId);
                  }
                }
              },
              data.row.name
            );
          }
        },
        {
          title: "缩写",
          minWidth: 150,
          key: "shortName"
        },
        {
          title: "别名",
          minWidth: 150,
          key: "keyword"
        },
        {
          title: "英文",
          key: "nameEn",
          align: "center",
          minWidth: 100
        },
        {
          title: "日文",
          key: "nameJa",
          align: "center",
          minWidth: 100
        },
        {
          title: "状态",
          key: "status",
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
          title: "创建时间",
          minWidth: 100,
          key: "createTime"
        },
        {
          title: "创建人",
          minWidth: 100,
          key: "creatorName"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
          align: "center",
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
                      this.editMsg(data.row.breedId);
                    }
                  }
                },
                " 编辑 "
              ),
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.onOrOffConfig(data.row.breedId, data.row.status);
                    }
                  }
                },
                data.row.status == 0 ? "禁用" : "启用"
              ),
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.linkBreed(data.row.breedId);
                    }
                  }
                },
                " 关联品种 "
              ),
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.specificationsMsg(data.row.breedId);
                    }
                  }
                },
                " 规格参数 "
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  created() {
    this.queryData();
    this.initStatus();
  },
  methods: {
    //初始化状态
    initStatus() {
      var that = this;
      axios({
        url: "/basedata/enum/query-all-breedType-status",
        method: "get",
        data: {}
      }).then(function(resp) {
        let obj = {
          value: -1,
          desc: "全部"
        };
        that.statusList.push(obj);
        let list = resp.data.response;
        for (let i = 0; i < list.length; i++) {
          let objList = {};
          objList.value = list[i].value;
          objList.desc = list[i].desc;
          that.statusList.push(objList);
        }
      });
    },
    //新增品种
    addBreed() {
      this.showAddModal = true;
    },
    // 导入品种
    importBreed() {
      this.showMoreImportModal = true;
    },
    //
    //导出品种
    exportExcle() {
      window.location.href = "/basedata/breed/export";
    },
    //导入文件
    fileImport() {
      let form = document.getElementById("headExcel");
      let file = form.files[0];
      if (file == null) {
        return;
      }
      let fileFormData = new FormData();
      fileFormData.append("file", file);
      this.loading = true;
      axios({
        url: "/basedata/breed/import",
        method: "post",
        data: fileFormData
      })
        .then(resp => {
          console.log(resp.data.response);
          if (resp.data.response.result) {
            this.$Message.success("导入成功");
            this.loading = false;
            //this.showMoreImportModal = false;
            this.importCancel();
            this.queryData();
            this.$Spin.hide();
          } else {
            this.$Message.warning(resp.data.response.message);
            this.loading = false;
            this.$Spin.hide();
          }
        })
        .catch(err => {
          this.loading = false;
          this.$Spin.hide();
        });
    },
    //点击选择文件
    beforeUpload(event) {
      this.file = event.target.files[0];
      this.values1 = this.file.name;
      const extension = this.file.name.split(".")[1] === "xls";
      const extension2 = this.file.name.split(".")[1] === "xlsx";
      if (!extension && !extension2) {
        this.$Message.warning("上传模板只能是 xls、xlsx格式!");
        return;
      }
      this.fileName = this.file.name;
      return false; // 返回false不会自动上传
    },
    //查询功能
    search() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.queryData();
    },
    //重置

    reset() {
      this.form.breedName = "";
      this.form.shortName = "";
      this.form.keyword = "";
      this.form.status = -1;
    },
    //查询列表数据
    queryData() {
      var that = this;
      var params = new URLSearchParams();
      params.append("pageNum", this.pageNum);
      params.append("pageSize", this.pageSize);
      params.append("name", this.form.breedName);
      params.append("shortName", this.form.shortName);
      params.append("keyword", this.form.keyword);
      params.append("status", this.form.status == -1 ? "": this.form.status);
      axios.post("/basedata/breed/list", params).then(function(res) {
        if (res.status === 200) {
          that.tableData = res.data.response.list;
          that.total = res.data.response.total;
        } else {
          that.$Message.warning(res.data.message);
        }
      });
    },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.queryData();
    },
    //激活 禁用该企业
    onOrOffConfig(id, type) {
      this.$refs.showIsUseModel.showModal = true;
      if (type == 0) {
        this.msgContent = "是否确认要禁用该品种?";
      } else if (type == 1) {
        this.msgContent = "是否确认要启用该品种?";
      } else {
        this.msgContent = "类型错误?";
        this.$refs.showIsUseModel.showModal = false;
      }
      this.enableUrl = "/basedata/breed/enable";
      this.disableUrl = "/basedata/breed/disable";
      this.cid = id;
      this.cType = type;
    },
    importCancel() {
      this.showMoreImportModal = false;
      let fileTag = document.getElementById("headExcel");
      fileTag.value = "";
    },
    //点击编辑
    editMsg(id) {
      this.$refs.editData.initData(id);
      this.showEditModal = true;
    },
    //打开规则参数
    specificationsMsg(id) {
      this.$refs.showSpecifications.initData(id);
      this.showSpecificationsModal = true;
    },

    //打开关联品种
    linkBreed(id) {
      this.$refs.inputData.initData(id);
      this.showLinkModal = true;
    },
    //查看品种详情
    showBreedDetail(id) {
      this.$refs.showData.initData(id);
      this.showCheckModal = true;
    },
    //隐藏查看模块
    hideCheckModal() {
      this.showCheckModal = false;
    },
    //隐藏新增模块
    hideAddModal() {
      this.showAddModal = false;
      this.queryData();
    },
    //隐藏编辑模块
    hideEditModal() {
      this.showEditModal = false;
      this.queryData();
    },
    //隐藏规格参数模块
    hideSpecificationsModal() {
      this.showSpecificationsModal = false;
    },
    //隐藏关联品种模块
    hideLinkModal() {
      this.showLinkModal = false;
    }
  }
};
</script>
