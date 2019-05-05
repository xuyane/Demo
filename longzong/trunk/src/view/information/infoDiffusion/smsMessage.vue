<style lang="less" scoped>
@import "postedMessage.less";
.ueWarning {
  border: 1px solid red;
}
</style>

<template>
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
        <Col span="8">
        <FormItem label="发布内容:">
          <Input v-model="form.informationContent" class="search-input" placeholder="请输入发布内容"></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="发布人:">
          <associate-Search @query-list="publishPersonFunction" class="search-input" :dataUrl="urlPublishPerson" ref="publishPersonRef"></associate-Search>
        </FormItem>
        </Col>
        <Col span="8">
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
      <Table v-show="tab == 0" :loading="loading" :data="tableData1" :columns="columns1"></Table>
      <Table v-show="tab == 1" :loading="loading" :data="tableData2" :columns="columns2"></Table>
      <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer"></oil-page>
    </Row>
    </Col>
    <Col span="24" style="text-align: center;height: 60px;line-height: 60px;background: #FFF;">
    <div class="btn-dibu">
      <Button @click="cancel">返回列表</Button>
    </div>
    </Col>

    <Modal v-model="messageModal" title="短信内容编辑" width="750">
      <Form :label-width="120">
        <FormItem label="短信内容：">
          <Input type="textarea" :autosize="{minRows: 5,maxRows: 8}" v-model="modalContent" :maxlength="120" ref="textarea" @on-blur="showMessageTips(modalContent)"
            placeholder="请输入短信内容"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :disabled="isSave" @click="saveModal">保存</Button>
        <Button type="primary" :disabled="isPublish" @click="publishModal">发布</Button>
        <Button type="primary" @click="hideModal">取消</Button>
      </div>
    </Modal>

    <Modal v-model="previewModal" title="已发布短信内容预览" width="750">
      <Form :label-width="120">
        <FormItem label="短信内容：">
          <Input v-model="previewContent" type="textarea" disabled></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="previewModal = false">取消</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
import axios from "axios";
import OilPage from "../../components/page/page.vue";
import { queryMyPublishList } from "../unitmangement/api/infoDiffusion";
import { formData } from "../../../assets/js/common.js";
import associateSearch from "./associateSearch.vue";
export default {
  name: "smsMessage",
  components: {
    OilPage,
    associateSearch
  },
  data() {
    return {
      tab: 0,
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      urlPublishPerson: "/information/select/employee",
      selectForm: {
        informationContent: "",
        publisherId: "",
        inTimeS: null,
        inTimeE: null,
        publishTime: []
      },
      form: {
        informationContent: "",
        publisherId: "",
        inTimeS: null,
        inTimeE: null,
        publishTime: []
      },
      columns1: [
        {
          title: "短信ID",
          key: "messageId"
        },
        {
          title: "短信内容",
          key: "content",
          width: 400,
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
              this.$deleteTag(params.row.content)
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
      columns2: [
        {
          title: "短信ID",
          key: "messageId"
        },
        {
          title: "短信内容",
          key: "content",
          width: 400,
          render: (h, params) => {
            return h(
              "p",
              {
                style: {
                  color: "blue",
                  cursor: "pointer",
                  overflow: "hidden",
                  "text-overflow": "ellipsis",
                  "white-space": "nowrap"
                },
                on: {
                  click: () => {
                    this.preview(params.row);
                  }
                }
              },
              this.$deleteTag(params.row.content)
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
          width: 200,
          key: "publishTimeName"
        }
      ],
      loading: false,
      tableData1: [],
      tableData2: [],
      rowList: "",
      previewModal: false,
      previewContent: "",
      messageModal: false,
      modalContent: "",
      tempRow: {},
      isSave: false,
      isPublish: false
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
    preview(data) {
      this.previewModal = true;
      this.previewContent = this.$deleteTag(data.content);
    },
    showMessageTips(val) {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      if (!this.modalContent) {
        this.$nextTick(() => {
          this.$refs.textarea.$el.className = tempWarning;
        });
        this.$Message.info("短信内容不能为空");
      } else if (this.modalContent.length > 120) {
        this.$nextTick(() => {
          this.$refs.textarea.$el.className = tempWarning;
        });
        this.$Message.info("短信内容字数超过限制，不能超过120个字");
      } else {
        this.$nextTick(() => {
          this.$refs.textarea.$el.className = afterWarning;
        });
      }
    },
    getPublishTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      this.form.inTimeS = data1.setHours(0, 0, 0, 0);
      this.form.inTimeE = data2.setHours(23, 59, 59, 999);
    },
    reset() {
      this.form = JSON.parse(JSON.stringify(this.selectForm));
      this.$refs.publishPersonRef.$refs.select.clearSingleSelect();
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
        content: this.form.informationContent,
        publisherId: that.form.publisherId,
        startTime: that.form.inTimeS,
        endTime: that.form.inTimeE,
        keyword: "",
        order: "",
        sort: "",
        title: ""
      };
      queryMyPublishList(params)
        .then(res => {
          if (status == 0) {
            that.tableData1 = res.response.list;
          } else {
            that.tableData2 = res.response.list;
          }
          that.loading = false;
          that.total = res.response.total;
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
    publishPersonFunction(publishPersonData) {
      if (publishPersonData.data) {
        this.form.publisherId = publishPersonData.data.value;
      }
    },
    changeTab(index) {
      this.pageNum = 1;
      this.tab = index;
      this.reset();
      this.queryData();
    },
    editUnit(data) {
      this.isSave = false;
      this.isPublish = false;
      this.tempRow = data;
      this.messageModal = true;
      this.modalContent = this.tempRow.content;
    },
    saveModal() {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      var flag = false;
      if (!this.modalContent) {
        this.$Message.info("短信内容不能为空");
        this.$refs.textarea.$el.className = tempWarning;
      } else if (this.modalContent.length > 120) {
        this.$Message.info("短信内容已超过120字的字数限制");
        this.$refs.textarea.$el.className = tempWarning;
      } else {
        flag = true;
        this.$refs.textarea.$el.className = afterWarning;
      }
      this.tempRow.content = this.$escapeHTMLString(this.modalContent);
      let params = this.tempRow,
        obj = {};
      for (var i in params) {
        if (params[i]) {
          obj[i] = params[i];
        }
      }
      var that = this;
      if (flag) {
        that.isSave = true;
        axios({
          url: "/information/unit/edit_message",
          method: "post",
          data: formData(obj)
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
    publishModal() {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      var flag = false;
      if (!this.modalContent) {
        this.$Message.info("短信内容不能为空");
        this.$refs.textarea.$el.className = tempWarning;
      } else if (this.modalContent.length > 120) {
        this.$Message.info("短信内容已超过120字的字数限制");
        this.$refs.textarea.$el.className = tempWarning;
      } else {
        flag = true;
        this.$refs.textarea.$el.className = afterWarning;
      }
      this.tempRow.content = this.$escapeHTMLString(this.modalContent);
      let params = this.tempRow,
        obj = {};
      for (var i in params) {
        if (params[i]) {
          obj[i] = params[i];
        }
      }
      if (flag) {
        var that = this;
        that.isPublish = true;
        axios({
          url: "/information/unit/edit_message",
          method: "post",
          data: formData(obj)
        })
          .then(resp => {
            if (resp.data.message === "OK" || resp.data.status === "200") {
              var data = [
                {
                  messageId: that.tempRow.messageId,
                  type: that.tempRow.displayType
                }
              ];
              let params = {
                contents: JSON.stringify(data)
              };
              axios({
                url: "/information/unit/push_message",
                method: "post",
                data: formData(params)
              })
                .then(res => {
                  if (res.data.message === "OK" || res.data.status === "200") {
                    that.$Message.info("发布成功");
                    that.reset();
                    that.queryData();
                    that.messageModal = false;
                  } else {
                    that.$Message.error(res.data.message);
                    that.isPublish = false;
                  }
                })
                .catch(err => {
                  that.messageModal = false;
                  that.isPublish = false;
                  that.reset();
                  that.queryData();
                });
            } else {
              that.$Message.error(res.data.message);
              that.isPublish = false;
            }
          })
          .catch(err => {
            that.isPublish = false;
            that.messageModal = false;
            that.reset();
            that.queryData();
          });
      }
    },
    hideModal() {
      var afterWarning = "input ivu-input-wrapper ivu-input-type";
      this.isSave = false;
      this.isPublish = false;
      this.messageModal = false;
      this.$refs.textarea.$el.className = afterWarning;
    },
    cancel() {
      this.$router.push({ name: "myInformationUnit" });
    }
  }
};
</script>