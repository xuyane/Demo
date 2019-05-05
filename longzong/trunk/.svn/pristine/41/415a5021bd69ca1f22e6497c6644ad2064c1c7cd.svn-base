<template>
  <div class="editCss">
    <Row>
      <Col span="24">
        <Row class-name="current-position">
          当前位置：
          <router-link to="/plantIndex" class="link-css">信息发布管理</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
          <router-link to="/myInformationUnit" class="link-css">我的信息单元</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
          <a @click="goToPublishList" class="link-css">发布列表</a>&nbsp;&nbsp;>>&nbsp;&nbsp;
          <a class="link-css" v-if="rowList.displayType == 1">文章日志</a>
          <a class="link-css" v-else-if="rowList.displayType == 3">短讯日志</a>
        </Row>
      </Col>
    </Row>
    <div class="title" v-if="rowList.displayType == 1">文章ID : {{rowList.messageId}}</div>
    <Col span="24" style="margin-botton:10px">
      <Row class-name="table-con">
        <Table
          highlight-row
          :loading="loading"
          :columns="tableColumns[rowList.displayType]"
          :data="tableData"
        ></Table>
        <oil-page
          :total="total"
          :page-num="pageNum"
          :page-size="pageSize"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"
          @page-change="pageChange"
        ></oil-page>
        <div class="footer">
          <Button type="primary" @click="goToPublishList">返回</Button>
        </div>
      </Row>
    </Col>

    <Modal v-model="showDetail" title="查看详情" width="1000" :mask-closable="false">
      <Row>
        <Col span="12" class="detail-text">修改人:{{detail.lastModifierName}}</Col>
        <Col span="12" class="detail-text">修改时间:{{detail.publishTime}}</Col>
      </Row>
      <Row>
        <table class="log-modal" width="100%">
          <thead>
            <tr>
              <th width="50%">
                <div class="log-title" :title="detail.oldTitle">{{detail.oldTitle}}</div>
              </th>
              <th width="50%">
                <div class="log-title" :title="detail.newTitle">{{detail.newTitle}}</div>
              </th>
            </tr>
          </thead>
          <tbody align="center">
            <tr>
              <td class="log-content">{{detail.oldContent}}</td>
              <td class="log-content">{{detail.newContent}}</td>
            </tr>
          </tbody>
        </table>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="showDetail = false">返回</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { formData, formatTime2 } from "../../../assets/js/common.js";
import OilPage from "../../components/page/page.vue";
import {
  getArticleModifyList,
  getMessageModifyList,
  getMessageModifyDetails
} from "../unitmangement/api/infoDiffusion";
export default {
  components: {
    OilPage
  },
  data() {
    return {
      showDetail: false,
      rowList: {},
      loading: true,
      // 表头
      tableColumns: {
        // 文章类
        1: [
          {
            title: "序号",
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "原标题",
            key: "oldArticleTitle",
            render: (h, params) => {
              return h(
                "span",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  attrs: {
                    title: params.row.oldArticleTitle
                  }
                },
                params.row.oldArticleTitle
              );
            }
          },
          {
            title: "新标题",
            key: "newArticleTitle",
            render: (h, params) => {
              return h(
                "span",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  attrs: {
                    title: params.row.newArticleTitle
                  }
                },
                params.row.newArticleTitle
              );
            }
          },
          {
            title: "修改人",
            key: "publisherName"
          },
          {
            title: "修改时间",
            key: "modifyTime"
          },
          {
            title: "操作",
            key: "operate",
            render: (h, params) => {
              return h("div", [
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        let { oldArticleId, newArticleId } = params.row,
                          articleId = this.rowList.messageId,
                          year = new Date().getFullYear();

                        const URL = `https://templates.oilchem.net/article_histroy?oldArticleId=${oldArticleId}&newArticleId=${newArticleId}&articleId=${articleId}&year=${year}`;

                        window.open(URL);
                      }
                    }
                  },
                  "查看详情"
                )
              ]);
            }
          }
        ],
        3: [
          {
            title: "序号",
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "原标题",
            key: "oldTitle",
            render: (h, params) => {
              return h(
                "span",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  attrs: {
                    title: params.row.oldTitle
                  }
                },
                params.row.oldTitle
              );
            }
          },
          {
            title: "新标题",
            key: "newTitle",
            render: (h, params) => {
              return h(
                "span",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  attrs: {
                    title: params.row.newTitle
                  }
                },
                params.row.newTitle
              );
            }
          },
          {
            title: "修改人",
            key: "lastModifierName"
          },
          {
            title: "修改时间",
            key: "publishTime",
            render: (h, params) => {
              return h("div", [
                h("span", {}, formatTime2(params.row.publishTime))
              ]);
            }
          },
          {
            title: "操作",
            key: "operate",
            render: (h, params) => {
              return h("div", [
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        let row = params.row,
                          data = {
                            firstId: row.oldId,
                            secondId: row.newId,
                            firstPublishTime: row.publishTime,
                            secondPublishTime: row.publishTime
                          };

                        getMessageModifyDetails(formData(data)).then(res => {
                          this.detail = res.response;
                          this.detail.lastModifierName = row.lastModifierName;
                          this.detail.publishTime = formatTime2(
                            row.publishTime
                          );
                          this.showDetail = true;
                        });
                      }
                    }
                  },
                  "查看详情"
                )
              ]);
            }
          }
        ]
      },
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData: [],
      detail: {}
    };
  },
  created() {
    this.rowList = JSON.parse(this.$route.query.item);

    this.queryLog();
  },
  methods: {
    //查询日志
    queryLog() {
      let params = {
        messageId: this.rowList.messageId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };

      if (this.rowList.displayType == 1) {
        getArticleModifyList(formData(params)).then(res => {
          this.loading = false;
          this.tableData = res.response.list;
          this.total = res.response.total;
        });
      } else {
        params.order = "desc";
        params.sort = "id";

        getMessageModifyList(formData(params)).then(res => {
          this.loading = false;
          this.tableData = res.response.list;
          this.total = res.response.total;
        });
      }
    },
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }

      this.queryLog();
    },
    goToPublishList() {
      this.rowList.callbackType = this.rowList.displayType;
      this.$router.push({
        name: "publishList",
        query: {
          item: JSON.stringify(this.rowList)
        }
      });
    }
  }
};
</script>
<style>
.title {
  padding-bottom: 10px;
  font-size: 14px;
}
.footer {
  padding-top: 20px;
  text-align: center;
}
.log-modal {
  border-collapse: collapse;
}
.log-modal th,
.log-modal td {
  border: 1px solid #bbb;
}
.log-title {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 480px;
  padding: 0 10px;
}
.log-content {
  padding: 10px;
  font-size: 14px;
  text-align: left;
  line-height: 28px;
  text-indent: 30px;
}
.detail-text {
  font-size: 14px;
  text-align: center;
}
</style>
