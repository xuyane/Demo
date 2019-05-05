<style lang="less" scoped>
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：基础数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;企业库管理>>&nbsp;&nbsp;企业列表
    </Row>
    </Col>
    <Col
      span="24"
      class-name="search-form"
    >
    <Form :label-width="120">
      <Row type="flex" justify="space-between">
        <Col span="7">
          <FormItem label="企业名称:">
            <Input v-model="form.enterpeiseName" class="search-input"></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="企业简称:">
            <Input v-model="form.shortName" class="search-input"></Input>
          </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="区域:">
          <associate-Search @query-list="areaFunction" :dataUrl="urlArea" ref="breedAreaRef" class="form-select"></associate-Search>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
          <FormItem label="企业类型:">
            <Select v-model="form.enterpriseType">
              <Option v-for="item in enterpriseTypeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="企业性质:">
          <Select v-model="form.enterpriseNature">
              <Option v-for="item in enterpriseNatureList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="状态:">
            <Select v-model="form.status">
              <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
          <FormItem label="生产品种:">
            <associate-Search @query-list="productBreedFunction" :dataUrl="urlBreed" ref="breedProductRef" class="search-input"></associate-Search>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="销售品种:">
            <associate-Search @query-list="saleBreedFunction" :dataUrl="urlBreed" ref="breedSaleRef" class="form-select"></associate-Search>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="采购品种:">
            <associate-Search @query-list="purchaseBreedFunction" :dataUrl="urlBreed" ref="breedPurposeRef" class="form-select"></associate-Search>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
          <FormItem label="上级企业:">
            <associate-Search  @query-list="enterpriseParentFunction" :dataUrl="urlEnterpriseParent" ref="breedParentRef" class="form-select"></associate-Search>
          </FormItem>
        </Col>
        <Col span="7"> </Col>
        <Col span="7" class="text-right">
          <Button type="primary" @click="search">查询</Button>
          <Button @click="handleReset">重置</Button>
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
          @click="addEnterprise"
        >新增</Button>
        <Button
          id="hrefToExportTable"
          type="primary"
          class="search-btn"
          @click="importData"
        >导入</Button>
        <Button
          id="hrefToInportTable"
          type="primary"
          class="search-btn"
          @click="exportExcel"
        >导出模板</Button>
      </div>
      <Table
        class="tableCommon"
        :data="tableData"
        :columns="columns"
        ref="dragTable"
        :stripe="true"
        :border="true"
        @on-selection-change="handleRowChange"
      >>
      </Table>
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
    <!-- 导入企业弹窗 -->
    <Modal
      v-model="showMoreImportModal"
      title="导入企业"
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
            class='btn'
            value="上传文件:"
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
          class="search-btn"
          type="primary"
          @click="fileImport"
        >导入</Button>
        <Button
          class="search-btn"
          style="margin-left:8px;"
          @click="importCancel"
        >返回</Button>
      </div>
    </Modal>
    <on-or-off
      :msgContent="msgContent"
      :cid="cid"
      :cType="cType"
      :enableUrl="enableUrl"
      :disableUrl="disableUrl"
      @query="search"
      ref="showIsUseModel"
    ></on-or-off>
  </Row>
</template>

<script>
import axios from "axios";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import onOrOff from "../../components/cms/onOrOff.vue";
import oilPage from "../../components/page/page.vue";

export default {
  name: "enterpriseList",
  components: {
    associateSearch,
    onOrOff,
    oilPage
  },
  data() {
    return {
      showIsUsermodal: false,
      showMoreImportModal: false,
      loading: false,
      disableUrl: "",
      enableUrl: "",
      msgContent: "",
      values1: "",
      cid: 0,
      cType: 0,
      selectRow: [],
      total: 0,
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      urlEnterpriseParent: "/basedata/select/enterpeise_name", //上级企业接口
      urlBreed: "/basedata/select/breed", //品种接口
      urlArea: "/basedata/select/area", //区域接口
      enterpriseId: "",
      statusList: [],
      enterpriseTypeList: [],
      enterpriseNatureList:[],
      form: {
        enterpeiseName: "", //企业名称
        shortName: "",//企业简称
        enterpriseNature: -1, //企业性质
        enterpriseType: -1, //企业类型
        area: "", //区域
        enterpriseParent: "", //上级企业
        status: -1, //状态
        produceBreed: "", //生产品种
        saleBreed: "", //销售品种
        purchaseBreed: "" //采购品种
      },
      columns: [
        {
          key: "name",
          align: "center",
          title: "企业名称",
          minWidth: 300,
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
                    this.$router.push({
                      path: "/enterpriseDetail",
                      query: { id: params.row.id }
                    });
                  }
                }
              },
              params.row.name
            );
          }
        },
        {
          key: "shortName",
          align: "center",
          minWidth: 100,
          title: "简称"
        },
        {
          key: "typeDesc",
          align: "center",
          minWidth: 100,
          title: "企业类型"
        },
        {
          key: "natrueDesc",
          align: "center",
          minWidth: 100,
          title: "企业性质"
        },
        {
          key: "statusDesc",
          align: "center",
          minWidth: 100,
          title: "状态",
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
          title: "企业名英文",
          key: "nameEn",
          align: "center",
          minWidth: 100
        },
        {
          title: "企业名日文",
          key: "nameJa",
          align: "center",
          minWidth: 100
        },
        {
          title: "企业简称英文",
          key: "shortNameEn",
          align: "center",
          minWidth: 100
        },
        {
          title: "企业简称日文",
          key: "shortNameJa",
          align: "center",
          minWidth: 100
        },
        {
          key: "createTimeDesc",
          align: "center",
          minWidth: 150,
          title: "创建时间"
        },
        {
          key: "creatorName",
          align: "center",
          minWidth: 100,
          title: "创建人"
        },
        {
          title: "操作",
          align: "center",
          minWidth: 300,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "span",
                    color: "blue",
                    textDecoration: "underline",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/updateEnterpriseInfo",
                        query: {
                          id: data.row.id
                        }
                      });
                    }
                  }
                },
                "编辑"
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
                      this.onOrOffConfig(data.row.id, data.row.status);
                    }
                  }
                },
                data.row.status == 0 ? "禁用" : "启用"
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
                      this.$router.push({
                        path: "/enterpriseRelationship",
                        query: { id: data.row.id }
                      });
                    }
                  }
                },
                "企业关联关系"
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
                      this.$router.push({
                        path: "/enterpriseBreedRelationship",
                        query: { id: data.row.id }
                      });
                    }
                  }
                },
                "关联品种"
              ),
              h(
                "span",
                {
                  style: {
                    color: "span",
                    color: "blue",
                    textDecoration: "underline",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/enterpriseContact",
                        query: { id: data.row.id }
                      });
                    }
                  }
                },
                "企业联系人"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  created() {
    this.initStatus();
    this.initEnterpriseType();
    this.initEnterpriseNature();
    //初始化数据
    this.getData();
  },
  methods: {
    //初始化企业类型
    initEnterpriseType() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_type",
        method: "post",
        data: {}
      }).then(function(resp) {
        let obj = {
          value: -1,
          desc: "全部"
        };
        that.enterpriseTypeList.push(obj);
        let list = resp.data.response;
        for (let i = 0; i < list.length; i++) {
          let objList = {};
          objList.value = list[i].value;
          objList.desc = list[i].desc;
          that.enterpriseTypeList.push(objList);
        }
      });
    },
    //初始化企业性质
    initEnterpriseNature() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_nature",
        method: "post",
        data: {}
      }).then(function(resp) {
        var obj = {
          value: -1,
          desc: "全部"
        };
        that.enterpriseNatureList.push(obj);
        let list = resp.data.response;
        for (let i = 0; i < list.length; i++) {
          let objList = {};
          objList.value = list[i].value;
          objList.desc = list[i].desc;
          that.enterpriseNatureList.push(objList);
        }
      });
    },
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
    //新增
    addEnterprise() {
      this.$router.push({
        name: "updateEnterpriseInfo",
        query: {
          id: -1
        }
      });
    },
    //取消
    doCancel() {
      this.$Message.info("Clicked cancel");
    },
    //获取列表数据
    getData() {
      var that = this;
      var params = new URLSearchParams();
      params.append("pageNum", this.pageNum);
      params.append("pageSize", this.pageSize);
      params.append(
        "name",
        this.form.enterpeiseName == undefined ? "" : this.form.enterpeiseName
      );
      params.append(
        "shortName",
        this.form.shortName == undefined ? "" : this.form.shortName
      );
      params.append(
        "type",
        this.form.enterpriseType == -1 ? "" : this.form.enterpriseType
      );
      params.append(
        "nature",
        this.form.enterpriseNature == -1
          ? ""
          : this.form.enterpriseNature
      );
      params.append(
        "areaId",
        this.form.area == undefined ? "" : this.form.area
      );
      params.append(
        "parentId",
        this.form.enterpriseParent == undefined
          ? ""
          : this.form.enterpriseParent
      );
      params.append(
        "status",
        this.form.status == -1 ? "" : this.form.status
      );
      params.append(
        "produceBreedId",
        this.form.produceBreed == undefined ? "" : this.form.produceBreed
      );
      params.append(
        "saleBreedId",
        this.form.saleBreed == undefined ? "" : this.form.saleBreed
      );
      params.append(
        "purchaseBreedId",
        this.form.purchaseBreed == undefined ? "" : this.form.purchaseBreed
      );

      axios.post("/basedata/enterprise/list", params).then(function(res) {
        if (res.status === 200 && res.data.response) {
          that.tableData = res.data.response.list;
          that.total = res.data.response.total;
        } else {
          that.$Message.warning(res.data.message);
        }
      });
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
      this.pageSize = 10;
      this.getData();
    },

    //重置
    handleReset() {
      this.form.enterpeiseName = "";
      this.form.shortName = "";
      this.form.enterpriseNature = -1;
      this.form.status = -1;
      this.form.enterpriseType = -1;
      this.$refs.breedAreaRef.$refs.select.clearSingleSelect();
      this.$refs.breedParentRef.$refs.select.clearSingleSelect();
      this.$refs.breedProductRef.$refs.select.clearSingleSelect();
      this.$refs.breedSaleRef.$refs.select.clearSingleSelect();
      this.$refs.breedPurposeRef.$refs.select.clearSingleSelect();
      this.form.enterpriseParent = "";
      this.form.area = "";
      this.form.saleBreed = "";
      this.form.purchaseBreed = "";
      this.form.produceBreed = "";
    },
    //获取单行
    handleRowChange(row) {
      this.selectRow = row;
    },
    //导入
    fileImport() {
      this.showMoreImportModal = true;
    },

    //激活 禁用该企业
    onOrOffConfig(id, type) {
      this.$refs.showIsUseModel.showModal = true;
      if (type == 0) {
        this.msgContent = "是否确认要禁用该企业?";
      } else if (type == 1) {
        this.msgContent = "是否确认要启用该企业?";
      } else {
        this.msgContent = "类型错误?";
        this.$refs.showIsUseModel.showModal = false;
      }
      this.enableUrl = "/basedata/enterprise/enable";
      this.disableUrl = "/basedata/enterprise/disable";
      this.cid = id;
      this.cType = type;
    },
    //获取从上级企业子组件传过来的值
    enterpriseParentFunction(enterpriseParent) {
      this.form.enterpriseParent = enterpriseParent.value;
    },
    //获取从区域子组件传过来的值
    areaFunction(area) {
      this.form.area = area.value;
    },
    //获取从品种子组件传过来的值
    productBreedFunction(bread) {
      this.form.produceBreed = bread.value;
    },
    saleBreedFunction(bread) {
      this.form.saleBreed = bread.value;
    },
    purchaseBreedFunction(bread) {
      this.form.purchaseBreed = bread.value;
    },
    //导入数据
    importData() {
      this.showMoreImportModal = true;
    },
    //导出模板
    exportExcel() {
      window.location.href = "/basedata/enterprise/export_templet";
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
    //关联品种关系
    enterpriseBreedRelationship() {},
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
        url: "/basedata/enterprise/import",
        method: "post",
        data: fileFormData
      })
        .then(resp => {
          if (resp.data.status == "200") {
            this.$Message.success("导入成功");
            this.loading = false;
            this.importCancel();
            this.getData();
            this.$Spin.hide();
          } else {
            this.$Message.success(resp.data.message);
            this.loading = false;
            this.$Spin.hide();
          }
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
          this.$Spin.hide();
        });
    },
    importCancel() {
      this.showMoreImportModal = false;
      let fileTag = document.getElementById("headExcel");
      fileTag.value = "";
    }
  }
};
</script>
