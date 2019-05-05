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
.table-info-row a {
  color: #ff6600;
}
.leftree {
  line-height: 20px !important;
}
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      <!-- 当前位置：网站管理&nbsp;&nbsp;>>&nbsp;&nbsp;频道管理&nbsp;&nbsp;>>&nbsp;&nbsp;频道列表
       -->
       当前位置：
        <router-link to="/plantIndex" class="link-css">网站管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/frequencyManagement" class="link-css">频道管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/frequencyManagement" class="link-css">频道列表</router-link>
    </Row>
    </Col>
    <Col span="24">
    <Row :gutter="20">
      <Col span="4">
      <div class='leftree'>
        <Card :bordered="true">
          <p slot="title">频道列表</p>
          <div>
            <Tree
              :data="treeData"
              @on-select-change='findlist'
              :load-data="loadTree"
              @on-toggle-expand="findExpand"
            ></Tree>
          </div>
        </Card>
      </div>
      </Col>
      <Col span="20">
      <Row class-name="table-con">
        <Col span="24">
        <Form
          :model="params1"
          :label-width="85"
        >
          <Row
            type="flex"
            justify="space-between"
          >
            <Col span="7">
            <FormItem label="频道名称：">
              <Input
                v-model="params1.name"
                class="search-input"
                placeholder="请输入频道名称"
              ></Input>
            </FormItem>
            </Col>
            <Col span="7">
            <FormItem label="状态：">
              <Select
                v-model="params1.status"
                class="search-input"
                placeholder="全部"
              >
                <Option
                  v-for="item in stautsList"
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
              @click="search1"
            >查询</Button>
            <Button
              style="margin-left: 8px"
              @click="reset1"
            >重置</Button>
            </Col>
          </Row>
        </Form>
        </Col>
        <div style="margin-bottom:20px">
          <Button
            type="primary"
            @click="addFrequency"
          >新增</Button>
        </div>
        <Table
          class="tableCommon"
          :data="tableData"
          :columns="columns"
          :stripe="true"
          :border="true"
        >
        </Table>
        <oil-page
          :total="total"
          :page-num="params1.pageNum"
          :page-size="params1.pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"
        >
        </oil-page>
      </Row>
      </Col>
    </Row>
    </Col>

    <!-- 查看 -->
    <Modal
      v-model="readModal"
      title="查看频道"
      :styles="{top: '20px'}"
      width="650"
    >
      <Row>
        <table class="read-table">
          <tr>
            <td class="table-left">频道编码：</td>
            <td class="table-right"><span>{{form.code}}</span></td>
          </tr>
          <tr>
            <td class="table-left">频道路径：</td>
            <td class="table-right"><span>{{form.pathName}}</span></td>
          </tr>
          <tr>
            <td class="table-left">网页地址：</td>
            <td class="table-right"><span>{{form.url}}</span></td>
          </tr>
          <tr>
            <td class="table-left">关联的品种：</td>
            <td class="table-right"><template
                v-for="(item,index) in form.channelBreedVOList"
                v-key="index"
              >{{item.breedName}}　</template></td>
          </tr>
          <tr>
            <td class="table-left">关联的信息分类：</td>
            <td class="table-right"><template
                v-for="(item,index) in form.channelInformationTypeVOList"
                v-key="index"
              >{{item.informationTypeName}}<br></template></td>
          </tr>
          <tr>
            <td class="table-left">模板：</td>
            <td class="table-right"><span>{{form.templateName}}</span></td>
          </tr>
          <tr>
            <td class="table-left">关键字：</td>
            <td class="table-right"><span>{{form.keyword}}</span></td>
          </tr>
          <tr>
            <td class="table-left">描述：</td>
            <td class="table-right"><span>{{form.description}}</span></td>
          </tr>
        </table>
      </Row>
      <div slot="footer">
        <i-button
          type="default"
          @click="readModal=false"
        >返回</i-button>
      </div>
    </Modal>

    <!-- 禁用弹窗开始 -->
    <Modal
      v-model="disableSiteModal"
      title="禁用频道"
    >
      <p>是否确认禁用该频道？</p>
      <div slot="footer">
        <i-button
          type="primary"
          @click="disableSiteFun"
        >确定</i-button>
        <i-button @click="disableSiteModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 禁用弹窗结束 -->
    <!-- 启用弹窗开始 -->
    <Modal
      v-model="enableSiteModal"
      title="启用频道"
    >
      <p>是否确认启用该频道？</p>
      <div slot="footer">
        <i-button
          type="primary"
          @click="enableSiteFun"
        >确定</i-button>
        <i-button @click="enableSiteModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 启用弹窗结束 -->
  </Row>
</template>

<script>
import OilPage from "../../components/page/page.vue";
import {
  websiteChannelTree,
  websiteChannelList,
  websiteChannelDetail,
  websiteChannelDisable,
  websiteChannelEnable,
  websiteChannelBreed,
  websiteChannelBreedPage,
  websiteChannelInforType,
  websiteChannelInforTypePage,
  websiteChannelSite,
  websiteTemplateList
} from "../../components/axios/website.js";
import { formatTime2, formData } from "../../../assets/js/common.js";
import { itemExport } from "../../components/axios/performanceManagement";
export default {
  name: "frequencyManagement",
  components: {
    OilPage
  },
  watch: {
    readModal(newVal, oldVal) {
      if (newVal == true) {
        this.searchDetail();
      }
    }
  },
  data() {
    return {
      isEdit: false,
      editId: "",
      editCode: "",
      changePre: "",
      treeArr: {},
      paramBreed: "",
      optionsBreed: [],
      paramInfortype: "",
      optionsInfortype: [],
      loading1: true,
      loading2: true,
      addForm: {
        channelBreedVOList: [],
        channelInformationTypeVOList: [],
        channelInformationVOlist: [],
        channelSiteVO: [],
        name: "",
        url: "",
        keyword: "",
        description: "",
        templateId: "",
        templateName: ""
      },
      detailId: "",
      total: 0,
      showSizer: true,
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      pageSizeOpts1: [5, 10, 20],
      readModal: false,
      showselectModal: false,
      addModal: false,
      infoUnitModal: false,
      mouldModal: false,
      modalTitle: "新增频道",
      disableSiteModal: false,
      enableSiteModal: false,
      selectform: {},
      changePre: "",
      formValidate: {},
      form: {},
      siteList: [],
      params1: {
        siteId: "",
        treeCode: "",
        expand: "",
        treeId: "",
        name: "",
        status: "",
        pageNum: 1,
        pageSize: 10
      },
      stautsList: [
        {
          value: "-1",
          desc: "全部"
        },
        {
          value: "0",
          desc: "正常"
        },
        {
          value: "1",
          desc: "禁用"
        }
      ],
      tableData: [],
      treeData: [],
      columns: [
        {
          key: "code",
          title: "频道编码",
          align: "center",
          minWidth: 150
        },
        {
          key: "pathName",
          title: "频道路径",
          align: "center",
          minWidth: 400,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.readModal = true;
                      this.detailId = params.row.id;
                    }
                  }
                },
                params.row.pathName
              )
            ]);
          }
        },
        {
          key: "type",
          title: "频道类型",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const statusEle = {
              "0": "品种类",
              "1": "资讯类"
            };
            const result = statusEle[params.row.type]
              ? statusEle[params.row.type]
              : "";
            if (result == "品种类") {
              return h("div", result);
            } else {
              return h("div", result);
            }
          }
        },
        {
          key: "status",
          title: "状态",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const statusEle = {
              "0": "正常",
              "1": "禁用"
            };
            const result = statusEle[params.row.status]
              ? statusEle[params.row.status]
              : "";
            if (result == "正常") {
              return h(
                "div",
                {
                  style: {
                    color: "rgb(158, 205, 63)"
                  }
                },
                result
              );
            } else {
              return h(
                "div",
                {
                  style: {
                    color: "red"
                  }
                },
                result
              );
            }
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
          minWidth: 150,
          render: (h, data) => {
            let operate = {};
            if (data.row.status == 0) {
              operate = h(
                "a",
                {
                  on: {
                    click: () => {
                      this.detailId = data.row.id;
                      this.disableSiteModal = true;
                    }
                  }
                },
                "禁用"
              );
            } else {
              operate = h(
                "a",
                {
                  on: {
                    click: () => {
                      this.detailId = data.row.id;
                      this.enableSiteModal = true;
                    }
                  }
                },
                "启用"
              );
            }

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
                      let that = this;
                      this.setHistorySession(() => {
                        if (!that.params1.expand) {
                          that.params1.expand = that.$route.query.isExpand;
                        }
                        let treeCode = that.treeArr.code;
                        let treeId = that.treeArr.treeId;
                        if (!treeCode) {
                          treeCode = that.$route.query.treeNode;
                        }
                        if (!treeId) {
                          treeId = that.$route.query.treeId;
                        }
                        that.$router.push({
                          name: "updateFrequencyManagement",
                          query: {
                            id: data.row.id,
                            treeCode: treeCode,
                            treeId: that.treeArr.id,
                            expand: that.params1.expand,
                            siteId: data.row.siteId
                          }
                        });
                      });
                    }
                  }
                },
                "编辑  "
              ),

              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small",
                    target: "_blank"
                  },
                  style: {
                    marginRight: "5px",
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      // window.location.href = data.row.url
                      window.open(data.row.url);
                    }
                  }
                },
                "预览"
              ),
              operate
            ]);
          }
        }
      ],

      dataTable: [],

      submitAdd: false,
      submitEdit: false
    };
  },
  methods: {
    siteSearch() {
      websiteChannelSite().then(res => {
        this.siteList = res.response;
      });
    },

    changeBreed(option) {
      this.checkList1.push({
        id: option.value,
        name: option.label
      });
    },

    removeCheck3(index) {
      this.checkList3 = {};
      this.addForm.templateName = "";
      this.addForm.templateId = "";
    },
    searchDetail() {
      websiteChannelDetail(formData({ id: this.detailId })).then(res => {
        this.form = res.response;
      });
    },
    search1() {
      this.params1.pageNum = 1;
      this.params1.pageSize = 10;
      this.tableList();
    },
    reset1() {
      this.params1 = {
        siteId: this.params1.siteId,
        treeCode: this.params1.treeCode,
        treeId: this.params1.treeId,
        isExpand: this.params1.expand,
        name: "",
        status: "",
        pageNum: 1,
        pageSize: 10
      };
      //this.channelTree();
    },
    disableSiteFun() {
      websiteChannelDisable(
        formData({
          id: this.detailId
        })
      ).then(res => {
        this.disableSiteModal = false;
        if (res.status == 200) {
          this.$Message.success("禁用成功！");
          this.tableList();
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    enableSiteFun() {
      websiteChannelEnable(
        formData({
          id: this.detailId
        })
      ).then(res => {
        this.enableSiteModal = false;
        if (res.status == 200) {
          this.$Message.success("启用成功！");
          this.tableList();
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    addFrequency() {
      let siteId = this.params1.siteId;
      let expand = this.params1.expand;
      if (expand === "") {
        expand = this.$route.query.isExpand;
      }
      if (siteId) {
        this.setHistorySession(() => {
          this.$router.push({
            name: "updateFrequencyManagement",
            query: {
              id: -1,
              treeCode: this.treeArr.code,
              pathName: this.changePre,
              siteId: this.params1.siteId,
              expand: expand
            }
          });
        });
      } else {
        this.$Message.warning("请选择站点");
      }
    },
    findlist(treeNode) {
      var currentUrl = window.location.href;
      if (
        currentUrl.indexOf("treeId") > -1 ||
        currentUrl.indexOf("treeNode") > -1
      ) {
        currentUrl = this.delParam(currentUrl);
        window.location.href = currentUrl;
      }

      this.treeArr = treeNode[0];
      console.log(this.treeArr);
      if (this.treeArr) {
        this.changePre = this.treeArr.pathName;
        this.params1.siteId = this.treeArr.siteId ? this.treeArr.siteId : null;
        this.params1.treeCode = this.treeArr.code ? this.treeArr.code : null;
        this.params1.treeId = this.treeArr.id ? this.treeArr.id : null;
        //this.params1.expand = treeNode[0].expand ? treeNode[0].expand : null;
        this.search1();
      }
    },
    delParam(paramKey) {
      var url = window.location.href; //页面url
      var urlParam = window.location.search.substr(1); //页面参数
      var beforeUrl = url.substr(0, url.indexOf("?")); //页面主地址（参数之前地址）
      var nextUrl = "";

      var arr = new Array();
      if (urlParam != "") {
        var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
        for (var i = 0; i < urlParamArr.length; i++) {
          var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
          //如果键雨要删除的不一致，则加入到参数中
          if (paramArr[0] != paramKey) {
            arr.push(urlParamArr[i]);
          }
        }
      }
      if (arr.length > 0) {
        nextUrl = "?" + arr.join("&");
      }
      url = beforeUrl + nextUrl;
      return url;
    },
    pageChange(page, size) {
      if (size) {
        this.params1.pageNum = 1;
        this.params1.pageSize = size;
      } else {
        this.params1.pageNum = page;
      }
      this.tableList();
    },

    loadTree(item, callback) {
      websiteChannelTree({
        //"code": item.code,
        id: item.value,
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
    channelTree() {
      websiteChannelTree({
        compareCode:
          this.$route.query.treeNode == undefined
            ? ""
            : this.$route.query.treeNode,
        siteId:
          this.$route.query.siteNId == undefined
            ? ""
            : this.$route.query.siteNId,
        isExpand:
          this.$route.query.isExpand == undefined
            ? ""
            : this.$route.query.isExpand
      }).then(res => {
        // console.log(res.response);
        // const sessionOne = JSON.parse(window.sessionStorage.getItem('frequencyManagementList'));
        this.treeData = res.response;
      });
    },
    findExpand(treeNode) {
      this.params1.expand = treeNode.expand;
    },
    tableList() {
      this.params1.status =
        this.params1.status == undefined ? "" : this.params1.status;
      //this.params1.treeId = this.params1.treeId ?
      let form = {};
      if (this.params1.treeId) {
        form = {
          siteId: this.params1.siteId,
          treeCode: this.params1.treeCode,
          treeId: this.params1.treeId,
          name: this.params1.name,
          expand: this.params1.expand,
          status: this.params1.status,
          pageNum: this.params1.pageNum,
          pageSize: this.params1.pageSize
        };
      } else {
        form = {
          siteId: this.params1.siteId == "" ? 1 : this.params1.siteId,
          name: this.params1.name,
          treeCode:
            this.$route.query.treeNode == undefined
              ? ""
              : this.$route.query.treeNode,
          treeId:
            this.$route.query.treeId == undefined
              ? ""
              : this.$route.query.treeId,
          status: this.params1.status,
          pageNum: this.params1.pageNum,
          pageSize: this.params1.pageSize
        };
      }
      websiteChannelList(formData(form)).then(res => {
        if (res.response && res.response.list) {
          this.tableData = res.response.list;
          this.total = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
        if (window.sessionStorage.getItem("frequencyManagementList")) {
          //          console.log('clear');
          window.sessionStorage.removeItem("frequencyManagementList");
        }
      });
    },
    setHistorySession(cb) {
      const frequencyManagementList = {
        ...this.params1,
        treeArr: this.treeArr
      };
      window.sessionStorage.setItem(
        "frequencyManagementList",
        JSON.stringify(frequencyManagementList)
      );
      if (cb) cb();
    }
  },
  mounted() {
    const session = JSON.parse(
      window.sessionStorage.getItem("frequencyManagementList")
    );
    console.log(session);
    if (session) {
      this.params1.name = session.name;
      this.params1.status = session.status;
      this.params1.pageNum = session.pageNum;
      this.params1.pageSize = session.pageSize;
    }
    this.channelTree();
    this.tableList();
    this.siteSearch();
  }
};
</script>


