<template>
  <div class='editCss'>
    <Row>
      <Col span="24">
      <Row class-name="current-position">
        当前位置：
        <router-link to="/plantIndex" class="link-css">信息发布管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/myInformationUnit" class="link-css">我的信息单元 </router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <a @click="goto" class="link-css">发布列表</a>
        </Row>
      </Col>
      <Col span="24" class="plant-content" style="margin-bottom: 20px">
      <div class="unit">
        <div class="unit_title">
          <span>信息单元</span>
        </div>
        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">信息单元编码：</div>
            <div class="unit_s_right">{{rowList.informationUnitCode}}</div>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">信息单元名称：</div>
            <div class="unit_s_right no-right-border">{{rowList.informationUnitName}}</div>
          </div>
        </div>
      </div>
      </Col>
      <Col span="24" class="plant-content">
      <div class="unit">
        <div class="unit_title">
          <span>信息列表</span>
        </div>
      </div>
      </Col>
      <Col span="24" class-name="search-form">
      <Form :model="form" :label-width="100">
        <Col>
        <Row type="flex" justify="space-between">
          <Col span="12">
          <FormItem label="标题:">
            <Input v-model="form.informationTitle" class="search-input" placeholder="请输入文章标题"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="关键字:">
            <Input v-model="form.informationKeyword" class="search-input" placeholder="请输入文章关键字"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="发布人:">
            <associate-Search @query-list="publishPersonFunction" class="search-input" :dataUrl="urlPublishPerson" ref="publishPersonRef"></associate-Search>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem :label="tab ==0 ? '保存时间:': '发布时间:'">
            <DatePicker v-model="form.publishTime" class="search-input" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择时间"
              @on-change="getPublishTime"></DatePicker>
          </FormItem>
          </Col>
          <Col span="24" class="text-right mar-b-10">
          <Button type="primary" @click="search">查询</Button>
          <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
        </Col>
      </Form>
      </Col>
      <Col span="24" style="margin-botton:10px">
      <Row class-name="table-con">
        <div class="tab">
          <div class="tab-flex" @click="changeTab(0)" :class="tab === 0 ? 'tab-active' : ''">未发布</div>
          <div class="tab-flex" @click="changeTab(1)" :class="tab === 1 ? 'tab-active' : ''">已发布</div>
        </div>
        <Table v-show="tab == 0" :loading="loading" :data="tableData0" :columns="columns0"></Table>
        <Table v-show="tab == 1" :loading="loading" :data="tableData1" :columns="columns1"></Table>
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"></oil-page>
      </Row>
      </Col>
      <Col span="24" style="text-align: center;height: 60px;line-height: 60px;background: #FFF;">
      <div class="btn-dibu">
        <Button @click="cancel">返回列表</Button>
      </div>
      </Col>

      <Modal v-model="messageModal" title="文章内容" class-name="verModal post-modal">
        <div>
          <Form :label-width="100">
            <FormItem label="文章标题:" class="tips">
              <Input v-model="tempArticle.title" :maxlength="100" ref="title" placeholder="请输入文章标题" @on-blur="showTips('title',tempArticle.title)"></Input>
            </FormItem>
            <FormItem label="标题图片:">
              <Col span="24">
              <Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048"
                :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" multiple type="drag" action="/information/unit/upload_image"
                style="display: inline-block;width:50px;">
                <div style="width: 50px;height:40px;line-height: 45px;">
                  <img v-if="titlePictureUrl" :src="'//mfs.oilchem.net/'+titlePictureUrl" style="width: 100%">
                  <Icon v-else type="ios-cloud-upload" size="20"></Icon>
                </div>
              </Upload>
              </Col>
            </FormItem>
            <FormItem label="文章内容:" class="tips">
              <UE :defaultMsg="UEContent" :config="config" :index="0" ref="ue" @contentChanged="contentChange"></UE>
            </FormItem>
            <FormItem label="关键字:">
              <Input v-model="tempArticle.keyword" :maxlength="500" placeholder="请输入关键字"></Input>
            </FormItem>
            <FormItem label="摘要:">
              <Input v-model="tempArticle.summary" :maxlength="600" placeholder="请输入摘要" type="textarea" :rows="4" />
            </FormItem>
            <Row>
              <Col span="10">
              <FormItem label="是否置顶:">
                <Select v-model="tempArticle.isStick">
                  <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="10" offset="4">
              <FormItem label="是否开启推荐:">
                <Select v-model="tempArticle.isRecommend">
                  <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
              <FormItem label="信息来源:" class="tips">
                <Input v-model="tempArticle.source" :maxlength="100" ref="source" placeholder="请输入信息来源" @on-blur="showTips('source',tempArticle.source)"
                  class="laiyuan"></Input>
              </FormItem>
              </Col>
              <Col span="10" offset="4">
              <FormItem label="发布人:" class="tips">
                <associate-Search @query-list="editArticlePersonFunction" :dataUrl="urlPublishPerson" ref="editArticlePersonRef"></associate-Search>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <div slot="footer">
          <Button type="primary" :disabled="isSave" @click="saveModal" v-if="showSave">保存</Button>
          <Button type="primary" :disabled="isPreview" @click="previewModal">预览</Button>
          <Button type="primary" :disabled="isPublish" @click="publishModal">发布</Button>
          <Button type="primary" @click="hideModal">取消</Button>
        </div>
      </Modal>
    </Row>
  </div>
</template>

<script>
import axios from "axios";
import OilPage from "../../components/page/page.vue";
import associateSearch from "./associateSearch.vue";
import UE from "./UE.vue";
import {
  queryMyPublishList,
  editIsShow,
  saveAndPublish
} from "../unitmangement/api/infoDiffusion";
import { formData } from "../../../assets/js/common.js";
import { debug } from "util";
import flashModalVue from "./modalList/flashModal.vue";
export default {
  name: "postedMessage",
  components: {
    OilPage,
    associateSearch,
    UE
  },
  data() {
    return {
      showEnChina: "",
      showSave: false,
      UEContent: "",
      tab: 0,
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      urlPublishPerson: "/information/select/employee",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      isDisplaySelect: [
        {
          value: 0,
          label: "展示"
        },
        {
          value: 1,
          label: "隐藏"
        }
      ],
      selectForm: {
        informationTitle: "",
        informationKeyword: "",
        publisherId: "",
        inTimeS: null,
        inTimeE: null,
        publishTime: []
      },
      form: {
        informationTitle: "",
        informationKeyword: "",
        publisherId: 0,
        inTimeS: null,
        inTimeE: null,
        publishTime: []
      },
      columns0: [
        {
          title: "文章ID",
          key: "messageId"
        },
        {
          title: "文章标题",
          width: 200,
          key: "title",
          render: (h, params) => {
            return h(
              "p",
              {
                style: {
                  overflow: "hidden",
                  "text-overflow": "ellipsis",
                  "white-space": "nowrap"
                }
              },
              params.row.title
            );
          }
        },
        {
          title: "关键字",
          width: 200,
          key: "keyword",
          render: (h, params) => {
            return h(
              "p",
              {
                style: {
                  overflow: "hidden",
                  "text-overflow": "ellipsis",
                  "white-space": "nowrap"
                }
              },
              params.row.keyword
            );
          }
        },
        {
          title: "发布人",
          key: "publisherName"
        },
        {
          title: "所在部门",
          key: "departMentName"
        },
        {
          title: "保存时间",
          width: 200,
          key: "publishTimeName"
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
                      this.editUnit(params.row);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      columns1: [
        {
          title: "文章ID",
          key: "messageId"
        },
        {
          title: "文章标题",
          width: 200,
          key: "title",
          render: (h, params) => {
            return h(
              "p",
              {
                style: {
                  overflow: "hidden",
                  "text-overflow": "ellipsis",
                  "white-space": "nowrap"
                }
              },
              params.row.title
            );
          }
        },
        {
          title: "关键字",
          width: 200,
          key: "keyword",
          render: (h, params) => {
            return h(
              "p",
              {
                style: {
                  overflow: "hidden",
                  "text-overflow": "ellipsis",
                  "white-space": "nowrap"
                }
              },
              params.row.keyword
            );
          }
        },
        {
          title: "发布人",
          key: "publisherName"
        },
        {
          title: "所在部门",
          key: "departMentName"
        },
        {
          title: "发布时间",
          key: "publishTimeName"
        },
        {
          title: "是否展示",
          key: "isShow",
          render: (h, params) => {
            return h(
              "Select",
              {
                style: {
                  style: "border: 1px solid #dddee1"
                },
                props: {
                  value: params.row.isShow,
                  size: "small"
                },
                on: {
                  "on-change": event => {
                    this.tableData1[params.index].isDisplay = event;
                    this.isShowFunction(params.row, event);
                  }
                }
              },
              this.isDisplaySelect.map(function(item) {
                return h(
                  "Option",
                  {
                    props: { value: item.value }
                  },
                  item.label
                );
              })
            );
          }
        },
        {
          title: "操作",
          key: "operate",
          render: (h, params) => {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let now =
              year + "-" + this.addZero(month) + "-" + this.addZero(day);
            let listTime = this.tableData1[
              params.row._index
            ].publishTimeName.substring(0, 10);
            if (listTime == now) {
              return h("div", [
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.editUnit(params.row, 1);
                      }
                    }
                  },
                  "编辑"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.editUnit(params.row, 0);
                      }
                    }
                  },
                  "-"
                )
              ]);
            }
          }
        }
      ],
      tableData0: [],
      tableData1: [],
      loading: false,
      rowList: [],
      messageModal: false,
      typeList: [
        {
          label: "是",
          value: 0
        },
        {
          label: "否",
          value: 1
        }
      ],
      tempRow: {},
      tempArticle: {},
      titlePictureUrl: "",
      isPublish: true,
      isPreview: false,
      isSave: false
    };
  },
  created() {
    this.rowList = JSON.parse(this.$route.query.item);
    this.queryData();
  },
  methods: {
    goto() {
      window.reload();
    },
    // 时间格式
    addZero(m) {
      return m < 10 ? "0" + m : m;
    },
    contentChange(obj) {
      if (!obj.content) {
        this.$Message.info("文章内容不能为空");
        this.$refs.ue.$el.className = "ueWarning";
      } else {
        this.$refs.ue.$el.className = "";
      }
    },
    getPublishTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      this.form.inTimeS = data1.setHours(0, 0, 0, 0);
      this.form.inTimeE = data2.setHours(23, 59, 59, 999);
    },
    reset() {
      this.$refs.publishPersonRef.$refs.select.clearSingleSelect();
      this.form = JSON.parse(JSON.stringify(this.selectForm));
    },
    search() {
      this.pageNum = 1;
      this.queryData();
    },
    queryData() {
      var that = this;
      that.loading = true;
      let status = this.tab;
      let params = {
        pageNum: that.pageNum,
        pageSize: that.pageSize,
        status: status,
        informationUnitId: this.rowList.informationUnitId,
        publisherId: that.form.publisherId,
        startTime: that.form.inTimeS,
        endTime: that.form.inTimeE,
        keyword: that.form.informationKeyword,
        title: that.form.informationTitle,
        content: "",
        order: "",
        sort: ""
      };
      queryMyPublishList(params)
        .then(res => {
          var data = res.response.list;
          if (status == 0) {
            that.tableData0 = data;
          } else {
            that.tableData1 = data;
          }
          that.total = res.response.total;
          that.loading = false;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.queryData();
    },
    isShowFunction(row, status) {
      var that = this;
      let params = {
        articleId: row.messageId,
        createTime: row.createTime,
        status: status
      };
      editIsShow(formData(params)).then(res => {
        this.$Message.success("修改成功");
        setTimeout(function() {
          that.queryData();
        }, 300);
      });
    },
    changeTab(index) {
      this.pageNum = 1;
      this.tab = index;
      this.reset();
      this.queryData();
    },
    publishPersonFunction(publishPersonData) {
      if (publishPersonData.data) {
        this.form.publisherId = publishPersonData.data.value;
      }
    },
    editArticlePersonFunction(data) {
      if (data.data) {
        this.tempArticle.publisherId = data.data.value;
        this.tempArticle.publisherName = data.data.label;
        this.$refs.editArticlePersonRef.$el.className = "";
      } else {
        this.tempArticle.publisherId = "";
        this.tempArticle.publisherName = "";
        this.$refs.editArticlePersonRef.$el.className = "selectWarning";
      }
    },
    editUnit(data, index) {
      this.showEnChina = data.siteId;
      if (index == 1) {
        this.showSave = false;
      } else {
        this.showSave = true;
      }
      this.$refs.editArticlePersonRef.getData(data.publisherName);
      this.$refs.ue.resetContent(data.content);
      this.tempRow = data;
      this.messageModal = true;
      this.isSave = false;
      this.isPreview = false;
      for (var i in this.tempRow) {
        this.tempArticle[i] = this.tempRow[i];
      }
      if (["", "null", null].indexOf(this.tempArticle.titlePictureUrl) == -1) {
        this.titlePictureUrl = this.tempArticle.titlePictureUrl;
      }
    },
    showTips(type, val) {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      if (!val) {
        switch (type) {
          case "title":
            this.$nextTick(() => {
              this.$refs["title"].$el.className = tempWarning;
            });
            this.$Message.info("文章标题不能为空");
            break;
          case "source":
            this.$nextTick(() => {
              this.$refs["source"].$el.className = tempWarning;
            });
            this.$Message.info("文章信息来源不能为空");
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case "title":
            this.$nextTick(() => {
              this.$refs["title"].$el.className = afterWarning;
            });
            break;
          case "source":
            this.$nextTick(() => {
              this.$refs["source"].$el.className = afterWarning;
            });
            break;
          default:
            break;
        }
      }
    },
    saveModal() {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      var flag = false;
      if (!this.tempArticle.title) {
        this.$nextTick(() => {
          this.$refs["title"].$el.className = tempWarning;
        });
        this.$Message.info("文章标题不能为空");
      } else if (!this.$refs.ue.getUEContent()) {
        this.$Message.info("文章内容不能为空");
        this.$refs.ue.$el.className = "ueWarning";
      } else if (!this.tempArticle.source) {
        this.$nextTick(() => {
          this.$refs["source"].$el.className = tempWarning;
        });
        this.$Message.info("文章信息来源不能为空");
      } else if (!this.tempArticle.publisherId) {
        this.$Message.info("文章发布人不能为空");
        this.$refs.editArticlePersonRef.$el.className = "selectWarning";
      } else {
        flag = true;
        this.$nextTick(() => {
          this.$refs["title"].$el.className = afterWarning;
          this.$refs.ue.$el.className = "";
          this.$refs["source"].$el.className = afterWarning;
          this.$refs.editArticlePersonRef.$el.className = "";
        });
      }
      if (flag) {
        this.tempArticle.content = this.$escapeHTMLString(
          this.$refs.ue.getUEContent()
        );
        this.tempArticle.titlePictureUrl = this.titlePictureUrl;
        for (var i in this.tempArticle) {
          if (i == "isStick" || i == "isRecommend") {
            this.tempArticle[i] = 1;
          }
        }
        var that = this;
        that.isSave = true;
        axios({
          url: "/information/unit/edit_message",
          method: "post",
          data: formData(that.tempArticle)
        })
          .then(res => {
            if (res.data.message === "OK" || res.data.status === "200") {
              that.messageModal = false;
              that.$Message.info("保存成功");
              that.reset();
              that.queryData();
            } else {
              that.isSave = false;
              that.$Message.error(res.data.message);
            }
          })
          .catch(err => {
            that.messageModal = false;
            that.isSave = false;
            that.reset();
            that.queryData();
          });
      }
    },
    previewModal() {
      var that = this;
      that.tempArticle.content = that.$escapeHTMLString(
        that.$refs.ue.getUEContent()
      );
      that.tempArticle.titlePictureUrl = that.titlePictureUrl;
      for (var i in this.tempArticle) {
        if (i == "isStick" || i == "isRecommend") {
          that.tempArticle[i] = 1;
        }
      }
      that.isPreview = true;
      saveAndPublish(formData(that.tempArticle)).then(res => {
        console.log("res", res,this.showEnChina);
        if (res.response.channelId && res.response.columnId) {
          if (this.showEnChina == 1) {
            window.open(
              `https://templates.oilchem.net/article_chs.html?articleId=${
                that.tempArticle.messageId
              }&channelId=${res.response.channelId}&columnId=${
                res.response.columnId
              }&debug=1`
            );
          }
          if(this.showEnChina == 2){
            window.open(
              `https://templates.oilchem.net/article_ens.html?articleId=${
                that.tempArticle.messageId
              }&channelId=${res.response.channelId}&columnId=${
                res.response.columnId
              }&debug=1`
            );
          }

          that.isPublish = false;
          that.isPreview = false;
        } else {
          that.isPreview = false;
          that.$Message.info("该信息单元没关联栏目和频道,无法预览");
        }
      });
    },
    publishModal() {
      var data = [
        {
          messageId: this.tempRow.messageId,
          type: this.tempRow.displayType
        }
      ];
      let params = {
        contents: JSON.stringify(data)
      };
      var that = this;
      that.isPublish = true;
      axios({
        url: "/information/unit/push_message",
        method: "post",
        data: formData(params)
      })
        .then(res => {
          if (res.data.message === "OK" || res.data.status === "200") {
            that.messageModal = false;
            that.$Message.info("发布成功");
            that.reset();
            that.queryData();
          } else {
            that.$Message.error(res.data.message);
            that.isPublish = false;
          }
        })
        .catch(err => {
          that.messageModal = false;
          that.isPublish = false;
          that.$Message.info("发布失败");
          that.reset();
          that.queryData();
        });
    },
    hideModal() {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      this.messageModal = false;
      this.isSave = false;
      this.isPreview = false;
      this.isPublish = true;
      this.$nextTick(() => {
        this.$refs["title"].$el.className = afterWarning;
        this.$refs.ue.$el.className = "";
        this.$refs["source"].$el.className = afterWarning;
        this.$refs.editArticlePersonRef.$el.className = "";
      });
    },
    cancel() {
      this.$router.push({ name: "myInformationUnit" });
    },
    handleSuccess(res, file) {
      this.titlePictureUrl = res.response.url;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "postedMessage.less";
#article {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  overflow: scroll;
}

.notice {
  position: fixed;
  display: flex;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  background: #2b85e4;
  color: #ffffff;
}

.notice p {
  flex: 1;
  text-align: center;
}

.ueWarning {
  border: 1px solid red;
}
</style>