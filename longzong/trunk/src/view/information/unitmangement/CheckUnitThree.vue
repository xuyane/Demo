<style lang="less" scoped>
@import "./informationSource.less";
.unit .unit_title {
  padding-right: 20px;
}
.unit .unit_title span {
  width: 100% !important;
}
.unit_content .unit_content_left {
  width: 50% !important;
  box-sizing: border-box;
  border-right: 1px solid #bbbbbb;
}
.unit_content .unit_s_left {
  width: 25%;
  box-sizing: border-box;
}
.unit_content {
  width: 30% !important;
  box-sizing: border-box;
}
.unit_s_right {
  width: 75% !important;
  border: none !important;
}
.unit_content {
  width: 100% !important;
}
.unit_content .no_line {
  border-right: none !important;
}
.table-con {
  padding-left: 0;
}
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="">
      <!-- 信息单元开始 -->
      <Row class="unit">
        <div class="unit_title">
          <span>信息单元</span>
          <div class="unit_content">
            <div class="unit_content_left">
              <div class="unit_s_left">信息单元编码：</div>
              <div class="unit_s_right">{{code}}</div>
            </div>
            <div class="unit_content_left no_line">
              <div class="unit_s_left">信息单元名称：</div>
              <div class="unit_s_right">{{name}}</div>
            </div>
          </div>
        </div>
      </Row>
      <Row style=";padding-right:20px;">
        <p
          data-v-5e44fe16=""
          class="title"
          style="width:100%"
        >已发布信息列表</p>
      </Row>
      <!--文章开始-->
      <Row v-if="isAtril">
        <!-- 表单开始 -->
        <Form
          :model="formItem"
          :label-width="100"
        >
          <Row>
            <Col span="5">
            <FormItem label="标题:">
              <Input
                v-model="formItem.title"
                class="search-input"
                placeholder="请输入标题"
              />
            </FormItem>
            </Col>
            <Col span="5">
            <FormItem label="关键字:">
              <Input
                v-model="formItem.keyword"
                class="search-input"
                placeholder="请输入关键字"
              />
            </FormItem>
            </Col>
            <Col span="5">
            <FormItem label="发布人:">
              <Select
                v-model="formItem.publisherId"
                ref="selectPublisherId"
                filterable
                remote
                :remote-method="remoteMethodEmployee"
                :loading="loadingEmploy"
              >
                <Option
                  v-for="(option, index) in options1"
                  :value="option.value"
                  :key="index"
                >{{option.label}}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="5">
            <FormItem label="发布时间:">
              <DatePicker
                type="daterange"
                v-model="formItem.publishTime"
                placement="bottom-end"
                placeholder="请选择日期"
                style="width:200px"
              ></DatePicker>
            </FormItem>
            </Col>

            <Col
              span="4"
              class="text-right"
              style="padding-right:20px"
            >
            <Button
              type="primary"
              @click="inforSelectWZ"
            >查询</Button>
            <Button
              style="margin-left: 8px"
              @click="cancelAtril"
            >重置</Button>
            </Col>
          </Row>
        </Form>
        <!-- 表单结束 -->
        <Col span="24">
        <Row class-name="table-con">
          <Table
            :columns="columns4"
            :data="data4"
          ></Table>
          <Row>
            <oil-page
              :total="totalPublish"
              :page-num="pageNumPublish"
              :page-size="pageSizePublish"
              @page-change="pageChangePublish"
              :page-size-opts="pageSizeshowSizerPublishOptsPublish"
              :show-sizer="showSizerPublish"
            >
            </oil-page>
          </Row>
          <Row
            type="flex"
            justify="space-between"
          >
            <Col
              span="24"
              class="text-center"
            >
            <Button
              type="primary"
              @click="returnAtril"
            >返回</Button>
            </Col>
          </Row>
        </Row>
        </Col>
      </Row>
      <!--文章结束-->

      <!--短讯开始-->
      <Row v-if="isMessage">
        <!-- 表单开始 -->
        <Form
          :model="formItemMessage"
          :label-width="100"
        >
          <Row>
            <Col span="5">
            <FormItem label="短讯内容:">
              <Input
                v-model="formItemMessage.content"
                class="search-input"
                placeholder="请输入短讯内容"
              />
            </FormItem>
            </Col>
            <Col span="5">
            <FormItem label="发布人:">
              <Select
                v-model="formItemMessage.publisherId"
                filterable
                ref="selectpublisherId2"
                remote
                :remote-method="remoteMethodEmployee"
                :loading="loadingEmploy"
              >
                <Option
                  v-for="(option, index) in options1"
                  :value="option.value"
                  :key="index"
                >{{option.label}}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="5">
            <FormItem label="发布时间:">
              <DatePicker
                type="daterange"
                v-model="formItemMessage.publishTime"
                placement="bottom-end"
                placeholder="请选择日期"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            </Col>
            <Col
              span="4"
              class="text-left"
              style="padding-right:20px"
            >
            <Button
              type="primary"
              @click="infoSelectDX"
            >查询</Button>
            <Button
              style="margin-left: 8px"
              @click="cancelMessage"
            >重置</Button>
            </Col>
          </Row>
        </Form>
        <!-- 表单结束 -->
        <Col span="24">
        <Row class-name="table-con">
          <Table
            :columns="columns7"
            :data="data7"
          ></Table>
          <Row>
            <oil-page
              :total="totalMessage"
              :page-num="pageNumMessage"
              :page-size="pageSizeMessage"
              @page-change="pageChangeMessage"
              :page-size-opts="pageSizeOptsMessage"
              :show-sizer="showSizerMessage"
            >
            </oil-page>
          </Row>
          <Row
            type="flex"
            justify="space-between"
          >
            <Col
              span="24"
              class="text-center"
            >
            <Button
              type="primary"
              @click="returnMessage"
            >返回</Button>
            </Col>
          </Row>
        </Row>
        </Col>
      </Row>
      <!--短讯结束-->

      <!--短信开始-->
      <Row v-if="isShort">
        <!-- 表单开始 -->
        <Form
          :model="formItemShort"
          :label-width="100"
        >
          <Row>
            <Col span="5">
            <FormItem label="短信内容:">
              <Input
                v-model="formItemShort.content"
                class="search-input"
                placeholder="短信内容"
              />
            </FormItem>
            </Col>
            <Col span="5">
            <FormItem label="发布人:">
              <Select
                v-model="formItemShort.publisherId"
                ref="selectPublisherId3"
                filterable
                remote
                :remote-method="remoteMethodEmployee"
                :loading="loadingEmploy"
              >
                <Option
                  v-for="(option, index) in options1"
                  :value="option.value"
                  :key="index"
                >{{option.label}}</Option>
              </Select>
            </FormItem>
            </Col>
            </FormItem>
            <Col span="5">
            <FormItem label="发布时间:">
              <DatePicker
                type="daterange"
                v-model="formItemShort.publishTime"
                placement="bottom-end"
                placeholder="请选择日期"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            </Col>
            <Col
              span="4"
              class="text-left"
              style="padding-right:20px"
            >
            <Button
              type="primary"
              @click="infoSelectDuanXin"
            >查询</Button>
            <Button
              style="margin-left: 8px"
              @click="cancelShort"
            >重置</Button>
            </Col>
          </Row>
        </Form>
        <!-- 表单结束 -->
        <Col span="24">
        <Row class-name="table-con">
          <Table
            :columns="columns8"
            :data="data8"
          ></Table>
          <Row>
            <oil-page
              :total="totalShort"
              :page-size="pageSizeShort"
              @page-change="pageChangeShort"
              :page-size-opts="pageSizeOptsShort"
              :show-sizer="showSizerShort"
            >
            </oil-page>
          </Row>
          <Row
            type="flex"
            justify="space-between"
          >
            <Col
              span="24"
              class="text-center"
            >
            <Button
              type="primary"
              @click="returnShort"
            >返回</Button>
            </Col>
          </Row>
        </Row>
        </Col>
      </Row>
      <!--短信结束-->
    </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { getEmployee, editAtrilShow } from "./api/unitManageMent";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "CheckUnitThree",
  props: ["linkerData"],
  components: {
    oilPage
  },
  data() {
    return {
      formItem: {
        title: "",
        keyword: "",
        publishTime: null
      },
      code: "",
      name: "",
      isShort: false,
      isMessage: false,
      isAtril: true,
      totalPublish: 0,
      pageSizePublish: 5,
      pageNumPublish: 1,
      showSizerPublish: true,
      pageSizeOptsPublish: [5, 10, 20],
      pageSizeshowSizerPublishOptsPublish: [5, 10, 20],
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
      columns4: [
        //已发布信息弹窗table
        {
          title: "文章ID",
          key: "messageId",
          align: "center",
          width: 150
        },
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "关键字",
          key: "keyword",
          align: "center",
          width: 140
        },
        {
          title: "发布人",
          key: "publisherName",
          align: "center",
          width: 100
        },
        {
          title: "所在部门",
          key: "departMentName",
          align: "center",
          width: 100
        },
        {
          title: "发布时间",
          key: "publishTimeName",
          align: "center",
          width: 150
        },
        {
          key: "isShow",
          title: "前端是否展示",
          width: 150,
          align: "center",
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
                    console.log(event);

                    // this.data4[params.index].isShow = event;
                    console.log("打印", params);
                    console.log("打印1", event);
                    this.changeShow(params);
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
        }
      ],
      data4: [],
      columns8: [
        //已发布信息弹窗table
        {
          title: "短信内容",
          key: "content",
          align: "center",
          minWidth: 250,
          render: (h, data) => {
            var content = "";
            if (data.row.content) {
              content = data.row.content.replace(/<[^>]+>/g, "");
            }
            return h("span", content);
          }
        },
        {
          title: "发布人",
          key: "publisherName",
          align: "center",
          minWidth: 200
        },
        {
          title: "所在部门",
          key: "departMentName",
          align: "center",
          minWidth: 200
        },
        {
          title: "发布时间",
          key: "publishTimeName",
          align: "center",
          minWidth: 250
        }
      ],
      data8: [],
      columns7: [
        //已发布信息弹窗table
        {
          title: "短讯内容",
          key: "content",
          align: "center",
          minWidth: 250,
          render: (h, data) => {
            var content = "";
            if (data.row.content) {
              content = data.row.content.replace(/<[^>]+>/g, "");
            }
            return h("span", content);
          }
        },
        {
          title: "发布人",
          key: "publisherName",
          align: "center",
          minWidth: 200
        },
        {
          title: "所在部门",
          key: "departMentName",
          align: "center",
          minWidth: 200
        },
        {
          title: "发布时间",
          key: "publishTimeName",
          align: "center",
          minWidth: 250
        }
      ],
      data7: [],

      formItemMessage: {
        publishTime: null,
        content: "",
        publisherId: null
      },
      totalMessage: 0,
      pageSizeMessage: 5,
      pageNumMessage: 1,
      showSizerMessage: true,
      pageSizeOptsMessage: [5, 10, 20],
      formItemShort: {
        publishTime: null,
        publisherId: null,
        content: ""
      },
      totalShort: 0,
      pageSizeShort: 5,
      pageNumShort: 1,
      showSizerShort: true,
      pageSizeOptsShort: [5, 10, 20],
      loadingEmploy: false,
      options1: []
    };
  },
  methods: {
    changeShow(data) {
      this.$Spin.show();
      console.log('data',data);
      let status = 0;
      if (data.row.isShow == 0) {
        status = 1;
      }
      let form = {
        articleId: data.row.messageId,
        status: status,
        createTime:data.row.createTime
      };
      editAtrilShow(formData(form)).then(res => {
        this.$Spin.hide();
        if (res.status == 200) {
          data.row.isShow = status;
          this.$Message.success('修改成功');
        }
      });
    },
    // 文章返回
    returnAtril() {
      this.$router.push({ name: "unitMangement" });
    },
    // 短信返回
    returnShort() {
      this.$router.push({ name: "unitMangement" });
    },
    // 短讯返回
    returnMessage() {
      this.$router.push({ name: "unitMangement" });
    },
    // 监听分页
    pageChangePublish(page, pageSize) {
      if (page) {
        this.pageNumPublish = page;
      }
      if (pageSize) {
        this.pageSizePublish = pageSize;
      }
      this.toPublishList();
    },
    // 重置文章查询
    cancelAtril() {
      this.formItem.title = "";
      this.formItem.keyword = "";
      this.formItem.publishTime = null;
      this.formItem.publisherId = "";
      this.$refs["selectPublisherId"].$data.query = "";
    },
    //  文章查询
    inforSelectWZ() {
      this.pageNumPublish = 1;
      this.toPublishList();
    },
    // 跳转文章
    toPublishInformationList() {
      console.log("文章开始");
      this.code = this.linkerData.code;
      this.name = this.linkerData.name;
      this.type = this.linkerData.type;
      this.isAtril = true;
      this.isShort = false;
      this.isMessage = false;
      this.toPublishList();
    },
    toPublishList() {
      console.log(12345);
      let time = this.formItem.publishTime;
      let startTime = null;
      let endTime = null;
      this.$Spin.show();
      if (time != null) {
        startTime = new Date(time[0]).setHours(0, 0, 0, 0);
        console.log("endTime", time[1]);
        endTime = new Date(time[1]).setHours(23, 59, 59, 999);
      }
      axios
        .post("/information/unit/my_publish_list", {
          title: this.formItem.title,
          keyword: this.formItem.keyword,
          startTime: startTime,
          endTime: endTime,
          informationUnitId: this.$route.query.informationUnitId,
          pageNum: this.pageNumPublish,
          pageSize: this.pageSizePublish,
          status: 1,
          publisherId: this.formItem.publisherId
        })
        .then(res => {
          if (res.status === 200) {
            this.data4 = res.data.response.list;
            this.totalPublish = res.data.response.total;
            console.log("this.linkerData", this.linkerData);
          }
          this.$Spin.hide();
        })
        .catch(err => {
          console.log(err);
          this.$Spin.hide();
        });
    },

    // 短信开始
    toShortInformationList() {
      console.log("短信开始");
      this.name = this.linkerData.name;
      this.code = this.linkerData.code;
      this.type = this.linkerData.type;
      this.isAtril = false;
      this.isShort = true;
      this.isMessage = false;
      console.log("type", this.linkerData);
      this.toShortList();
    },
    toShortList() {
      let time = this.formItemShort.publishTime;
      console.log("this.formItemShort", this.formItemShort);
      let startTime = null;
      let endTime = null;
      this.$Spin.show();
      if (time != null) {
        startTime = new Date(time[0]).setHours(0, 0, 0, 0);
        console.log("endTime", time[1]);
        endTime = new Date(time[1]).setHours(23, 59, 59, 999);
      }
      axios
        .post("/information/unit/my_publish_list", {
          content: this.formItemShort.content,
          publisherId: this.formItemShort.publisherId,
          startTime: startTime,
          endTime: endTime,
          informationUnitId: this.$route.query.informationUnitId,
          pageNum: this.pageNumShort,
          pageSize: this.pageSizeShort,
          status: 2
        })
        .then(res => {
          if (res.status === 200) {
            this.data8 = res.data.response.list;
            this.totalShort = res.data.response.total;
            console.log("this.linkerData", this.linkerData);
          }
          this.$Spin.hide();
        })
        .catch(err => {
          console.log(err);
          this.$Spin.hide();
        });
    },
    // 监听分页
    pageChangeShort(page, pageSize) {
      if (page) {
        this.pageNumShort = page;
      }
      if (pageSize) {
        this.pageSizeShort = pageSize;
      }
      this.toShortList();
    },
    // 短信查询
    infoSelectDuanXin() {
      this.pageNumShort = 1;
      this.toShortList();
    },
    // 重置
    cancelShort() {
      (this.formItemShort.publishTime = null),
        (this.formItemShort.publisherId = null),
        (this.formItemShort.content = "");
      this.$refs["selectPublisherId3"].$data.query = "";
    },
    // 短信结束

    // 短讯开始
    toMessageInformationList() {
      console.log("短讯开始");
      this.name = this.linkerData.name;
      this.code = this.linkerData.code;
      this.type = this.linkerData.type;
      this.isAtril = false;
      this.isShort = false;
      this.isMessage = true;
      this.toMessageList();
    },
    toMessageList() {
      let time = this.formItemMessage.publishTime;
      let startTime = null;
      let endTime = null;
      this.$Spin.show();
      if (time != null) {
        startTime = new Date(time[0]).setHours(0, 0, 0, 0);
        console.log("endTime", time[1]);
        endTime = new Date(time[1]).setHours(23, 59, 59, 999);
      }
      this.pageNumMessage = 1;
      axios
        .post("/information/unit/my_publish_list", {
          content: this.formItemMessage.content,
          startTime: startTime,
          endTime: endTime,
          informationUnitId: this.$route.query.informationUnitId,
          pageNum: this.pageNumMessage,
          pageSize: this.pageSizeMessage,
          status: 3,
          publisherId: this.formItemMessage.publisherId
        })
        .then(res => {
          if (res.status === 200) {
            console.log("data7", res);
            this.data7 = res.data.response.list;
            this.totalMessage = res.data.response.total;
            console.log("this.linkerData222", res.data.response.list);
            console.log("this7777", res.data.response.list);
          }
          this.$Spin.hide();
        })
        .catch(err => {
          console.log(err);
          this.$Spin.hide();
        });
    },
    // 监听分页
    pageChangeMessage(page, pageSize) {
      if (page) {
        this.pageNumMessage = page;
      }
      if (pageSize) {
        this.pageSizeMessage = pageSize;
      }
      this.toMessageList();
    },
    //  短讯查询
    infoSelectDX() {
      this.pageNumMessage = 1;
      this.toMessageList();
    },
    // cancelMessage重置
    cancelMessage() {
      (this.formItemMessage.publishTime = null),
        (this.formItemMessage.publisherId = null),
        (this.formItemMessage.content = "");

      this.$refs["selectpublisherId2"].$data.query = "";
    },
    // 短讯结束

    // 查询发布人
    remoteMethodEmployee(query) {
      if (query !== "") {
        this.loadingEmploy = true;
        let params = {
          name: query
        };
        setTimeout(() => {
          this.loadingEmploy = false;
          getEmployee(formData(params)).then(res => {
            // console.log(res);
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
  }
};
</script>
