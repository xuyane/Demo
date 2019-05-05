<template>
  <div class="editCss">
    <Row>
      <Col span="24">
        <Row class-name="current-position">
          当前位置：
          <router-link to="/plantIndex" class="link-css">信息发布管理</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
          <router-link to="/myInformationUnit" class="link-css">我的信息单元</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
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
            <Row>
              <Col class-name="table-con">
                <div class="tab">
                  <div
                    class="tab-flex"
                    @click="unPublished(0)"
                    :class="tab === 0 ? 'tab-active' : ''"
                  >未发布</div>
                  <template v-for="item in informationUnitTypeLst">
                    <div
                      class="tab-flex"
                      v-show="item==1"
                      @click="publishArticles(1)"
                      :class="tab === 1 ? 'tab-active' : ''"
                    >已发布-文章</div>
                    <div
                      class="tab-flex"
                      v-show="item==2"
                      @click="publishMessage(2)"
                      :class="tab === 2 ? 'tab-active' : ''"
                    >已发布-短信</div>
                    <div
                      class="tab-flex"
                      v-show="item==3"
                      @click="publishSms(3)"
                      :class="tab === 3 ? 'tab-active' : ''"
                    >已发布-短讯</div>
                  </template>
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span="6" v-show="this.status == 0 || this.status == 1 || this.status == 3">
                <FormItem label="标题:">
                  <Input v-model="form.informationTitle" class="search-input" placeholder="请输入标题"></Input>
                </FormItem>
              </Col>
              <Col span="6" v-show="this.status == 0  ">
                <FormItem label="关键字:">
                  <Input
                    v-model="form.informationKeyword"
                    class="search-input"
                    placeholder="请输入关键字"
                  ></Input>
                </FormItem>
              </Col>
              <Col :span="status == 2 ? 8 : 6" v-show="this.status == 2 ">
                <FormItem label="发布内容:">
                  <Input
                    v-model="form.informationContent"
                    class="search-input"
                    placeholder="请输入发布内容"
                  ></Input>
                </FormItem>
              </Col>
              <Col :span="status == 2 ? 8 : 6">
                <FormItem label="发布人:">
                  <Select
                    v-model="form.publisherId"
                    ref="publishPersonRef"
                    filterable
                    remote
                    @on-query-change="remoteMethod1"
                    :loading="loading"
                    placeholder="请选择发布人"
                  >
                    <Option
                      v-for="(item,index) in companyList"
                      :value="item.id"
                      :key="index"
                    >{{item.text}}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="status == 2 ? 8 : 6">
                <FormItem :label="this.status == 0 ? '保存时间:': '发布时间:'">
                  <DatePicker
                    v-model="form.publishTime"
                    class="search-input"
                    format="yyyy-MM-dd"
                    type="daterange"
                    placement="top-start"
                    placeholder="请选择时间"
                    @on-change="getPublishTime"
                    :clearable="clearable"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="6" v-show="this.status == 1 ||  this.status == 3">
                <FormItem label="修改时间">
                  <DatePicker
                    v-model="form.modifyTime"
                    class="search-input"
                    format="yyyy-MM-dd"
                    type="daterange"
                    placement="top-start"
                    placeholder="请选择时间"
                    @on-change="getModifyTime"
                    :clearable="clearable"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="24" class="text-right mar-b-10">
                <Button type="primary" @click="newDataQuery">查询</Button>
                <Button style="margin-left: 8px" @click="reset">重置</Button>
              </Col>
            </Row>
          </Col>
        </Form>
      </Col>
      <Col span="24" style="margin-botton:10px">
        <Row class-name="table-con">
          <Table :loading="loading" :data="tableData1" :columns="columns1"></Table>
          <oil-page
            :total="total"
            :page-num="pageNum"
            :page-size="pageSize"
            @page-change="pageChange"
            :page-size-opts="pageSizeOpts"
            :show-sizer="showSizer"
          ></oil-page>
        </Row>
      </Col>
      <Col span="24" style="text-align: center;height: 60px;line-height: 60px;background: #FFF;">
        <div class="btn-dibu">
          <Button @click="returnList">返回列表</Button>
        </div>
      </Col>
    </Row>
    <Modal v-model="messageModalThree" title="详情" width="800" :mask-closable="false">
      <Row style="max-height:200px;overflow-y:auto">
        <Form :label-width="100">
          <FormItem label="短讯内容:" prop="content">
            <Input v-model="sms.content" placeholder="请输入短讯内容" type="textarea" :rows="8" disabled/>
          </FormItem>
        </Form>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="hideModalTree">取消</Button>
      </div>
    </Modal>
    <Modal v-model="messageModalTwo" title="详情" width="800" :mask-closable="false">
      <Row style="max-height:200px;overflow-y:auto">
        <Form :label-width="100">
          <FormItem label="短信内容:" prop="content">
            <Input
              v-model="message.content"
              placeholder="请输入短信内容"
              type="textarea"
              disabled
              :rows="8"
            />
          </FormItem>
        </Form>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="hideModalTwo">取消</Button>
      </div>
    </Modal>
    <Modal v-model="messageModal" title="文章内容" class-name="verModal post-modal">
      <div>
        <Form :label-width="100">
          <FormItem label="文章标题:" class="tips">
            <Input
              v-model="tempArticle.title"
              :maxlength="100"
              ref="title"
              placeholder="请输入文章标题"
              @on-blur="showTips('title',tempArticle.title)"
            ></Input>
          </FormItem>
          <FormItem label="标题图片:">
            <Col span="24">
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                multiple
                type="drag"
                action="/information/unit/upload_image"
                style="display: inline-block;width:50px;"
              >
                <div style="width: 50px;height:40px;line-height: 45px;">
                  <img
                    v-if="titlePictureUrl"
                    :src="'//mfs.oilchem.net/'+titlePictureUrl"
                    style="width: 100%"
                  >
                  <Icon v-else type="ios-cloud-upload" size="20"></Icon>
                </div>
              </Upload>
            </Col>
          </FormItem>
          <FormItem label="文章内容:" class="tips">
            <UE
              :defaultMsg="UEContent"
              :config="config"
              :index="0"
              ref="ue"
              @contentChanged="contentChange"
            ></UE>
          </FormItem>
          <FormItem label="关键字:">
            <Input
              v-model="tempArticle.keyword"
              :maxlength="500"
              placeholder="请输入关键字"
              ref="keyword"
              @on-blur="showTips('keyword', tempArticle.keyword)"
            ></Input>
          </FormItem>
          <FormItem label="摘要:">
            <Input
              v-model="tempArticle.summary"
              :maxlength="600"
              placeholder="请输入摘要"
              type="textarea"
              :rows="4"
              ref="summary"
              @on-blur="showTips('summary', tempArticle.summary)"
            />
          </FormItem>
          <Row>
            <Col span="10">
              <FormItem label="是否置顶:">
                <Select v-model="tempArticle.isStick">
                  <Option
                    v-for="item in typeList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="10" offset="4">
              <FormItem label="是否开启推荐:">
                <Select v-model="tempArticle.isRecommend">
                  <Option
                    v-for="item in typeList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10">
              <FormItem label="信息来源:" class="tips">
                <Input
                  v-model="tempArticle.source"
                  :maxlength="100"
                  ref="source"
                  placeholder="请输入信息来源"
                  @on-blur="showTips('source',tempArticle.source)"
                  class="laiyuan"
                ></Input>
              </FormItem>
            </Col>
            <Col span="10" offset="4">
              <FormItem label="发布人:">
                <Input v-model="tempArticle.publisherName" placeholder="请输入发布人" disabled/>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="previewModal" :loading="isRunOne">发布</Button>
        <Button type="primary" @click="hideModal">取消</Button>
      </div>
    </Modal>
    <!-- 短讯修改开始 -->
    <Modal v-model="editMessageModal" title="短讯编辑" :mask-closable="false" width="800">
      <Form :label-width="100" :rules="ruleCustom" ref="formValidate">
        <FormItem label="发布人:">
          <Input v-model="editArticle.publisherName" disabled placeholder="请输入发布人"/>
        </FormItem>
        <FormItem label="短讯标题:" prop="title">
          <Input
            v-model="editArticle.title"
            placeholder="请输入短讯标题"
            ref="flashTitle"
            @on-blur="showTips('flashTitle', editArticle.title)"
          ></Input>
        </FormItem>
        <FormItem label="短讯内容:" prop="content">
          <Input
            v-model="editArticle.content"
            placeholder="请输入短讯内容"
            type="textarea"
            @on-keyup="keyup(editArticle.content)"
            ref="flashContent"
            :maxlength="1000"
            :rows="8"
          />
          <span style="float:right">
            <i style="color:red;font-style: normal;">{{editArticle.length}}</i> /1000
          </span>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="saveModal('formValidate')" :loading="isRun">保存</Button>
        <Button type="primary" @click="hideModalOne">取消</Button>
      </div>
    </Modal>
    <!-- 短讯修改结束 -->
  </div>
</template>
<script>
import axios from "axios";
import associateSearch from "./associateSearch.vue";
import OilPage from "../../components/page/page.vue";
import UE from "./UE.vue";
import {
  getMyPublishList,
  articlePreview,
  saveAndPublish,
  editIsShow,
  pubshModifyMessage,
  getModifyMessageAndPush,
  getEmployee,
  queryMyPublishList
} from "../unitmangement/api/infoDiffusion";
import {
  formatTime,
  formData,
  checkSensitive
} from "../../../assets/js/common.js";
export default {
  components: {
    associateSearch,
    OilPage,
    UE
  },
  data() {
    const validateTitle = (rule, value, callback) => {
      this.editArticle.title = this.editArticle.title.replace(/\s+/g, "");
      if (this.editArticle.title == "") {
        callback(new Error("标题不能为空"));
      } else {
        callback();
      }
    };
    const validateContent = (rule, value, callback) => {
      this.editArticle.content = this.editArticle.content.replace(/\s+/g, "");
      if (this.editArticle.content == "") {
        callback(new Error("内容不能为空"));
      } else {
        callback();
      }
    };
    return {
      companyList: [],
      ruleCustom: {
        title: [{ validator: validateTitle, trigger: "blur", required: true }],
        content: [
          { validator: validateContent, trigger: "blur", required: true }
        ]
      },
      editMessageModal: false,
      editArticle: {
        length: ""
      },
      showSave: false,
      tempArticle: {},
      messageModal: false,
      UEContent: "",
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
      isPreview: false,
      isPublish: true,
      tempRow: {},
      titlePictureUrl: "",
      messageModalThree: false,
      messageModalTwo: false,
      loading: false,
      clearable: false,
      form: {
        informationTitle: "",
        informationKeyword: "",
        informationContent: "",
        publisherId: "",
        publishTime: "",
        modifyTime: "",
        publishTimeS: "",
        publishTimeE: "",
        modifyTimeS: "",
        modifyTimeE: ""
      },
      rowList: [],
      urlPublishPerson: "/information/select/employee",
      status: 0,
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData1: [],
      columns1: [],
      informationUnitTypeLst: [],
      tab: 0,
      sms: {
        title: "",
        content: "",
        publisherName: "",
        departMentName: "",
        publishTime: ""
      },
      message: {
        content: "",
        publisherName: "",
        publishTime: ""
      },
      isRun: false,
      isRunOne: false
    };
  },
  mounted() {
    this.rowList = JSON.parse(this.$route.query.item);

    if (this.rowList.callbackType == 1 || this.rowList.callbackType == 3) {
      this.getQuery();
    } else {
      if(this.tab == 0){
        this.initPublishTime();
      }
      this.newData();
    }
  },
  methods: {
    //初始化保存时间 默认30天 但是不能跨年
    initPublishTime() {
      //如果当前是一月份 直接取今年的1月1日
      let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() === 0 ? 0 : date.getMonth() - 1,
        day = date.getMonth() === 0 ? 1 : date.getDate(),
        prve = new Date(year, month, day);

      this.form.publishTime = [prve, date];
      this.form.publishTimeS = prve.setHours(0, 0, 0, 0);
      this.form.publishTimeE = date.setHours(23, 59, 59, 999);
    },
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let form = {
            name: query
          };
          getEmployee(formData(form)).then(res => {
            this.companyList = res.response;
          });
        }, 50);
      } else {
        this.form.publisherId = "";
        this.companyList = [];
      }
    },
    newDataQuery() {
      this.pageNum = 1;
      this.newData();
    },
    returnList() {
      this.$router.push({
        name: "myInformationUnit",
        query: {
          item: JSON.stringify(this.rowList)
        }
      });
    },
    getQuery() {
      if (this.rowList.callbackType == 1) {
        this.publishArticles(1);
      }
      if (this.rowList.callbackType == 3) {
        this.publishSms(3);
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
          case "keyword":
          case "summary":
            this.$refs[type].$el.className = afterWarning;
          default:
            break;
        }
      } else {
        switch (type) {
          case "title":
            this.$nextTick(() => {
              if (checkSensitive(val)) {
                this.$refs["title"].$el.className = tempWarning;
                this.$Message.info("文章标题" + checkSensitive(val));
              } else {
                this.$refs["title"].$el.className = afterWarning;
              }
            });
            break;
          case "source":
            this.$nextTick(() => {
              this.$refs["source"].$el.className = afterWarning;
            });
            break;
          case "flashTitle":
            this.$nextTick(() => {
              if (checkSensitive(val)) {
                this.$refs["flashTitle"].$el.className = tempWarning;
                this.$Message.info("短讯标题" + checkSensitive(val));
              } else {
                this.$refs["flashTitle"].$el.className = afterWarning;
              }
            });
            break;
          case "keyword":
          case "summary":
            let text = type === "keyword" ? "文章关键词" : "文章摘要";

            if (checkSensitive(val)) {
              this.$nextTick(() => {
                this.$refs[type].$el.className = tempWarning;
                this.$Message.info(text + checkSensitive(val));
              });
            } else {
              this.$refs[type].$el.className = afterWarning;
            }
            break;
          default:
            break;
        }
      }
    },
    goto() {
      window.reload();
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
    contentChange(obj) {
      if (!obj.content) {
        this.$Message.info("文章内容不能为空");
        this.$refs.ue.$el.className = "ueWarning";
      } else {
        if (checkSensitive(obj.content)) {
          this.$Message.info("文章内容" + checkSensitive(obj.content));
          this.$refs.ue.$el.className = "ueWarning";
        } else {
          this.$refs.ue.$el.className = "";
        }
      }
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
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
    saveModal(name) {
      let params = {
        messageId: this.editArticle.messageId,
        informationUnitId: this.rowList.informationUnitId || "",
        title: this.editArticle.title,
        displayType: 3,
        content: this.editArticle.content,
        createTime: this.editArticle.createTime
      };

      var tempWarning = "input ivu-input-wrapper ivu-input-type warning";

      if(checkSensitive(params.title)){
        this.$Message.info("短讯标题" + checkSensitive(params.title));
        this.$refs.flashTitle.$el.className = tempWarning;
        return;
      }else if(checkSensitive(params.content)){
        this.$Message.info("短讯内容" + checkSensitive(params.content));
        this.$refs.flashContent.$el.className = tempWarning;
        return;
      }

      this.isRun = true;

      this.$refs[name].validate(valid => {
        if (valid) {
          getModifyMessageAndPush(formData(params)).then(res => {
            if (res.status == 200) {
              this.$Message.info("发布成功");
              this.reset();
              this.newData();
              this.editMessageModal = false;
              this.isRun = false;
            } else {
              this.$Message.error("发布失败");
              this.reset();
              this.newData();
              this.editMessageModal = false;
              this.isRun = false;
            }
          });
        } else {
          // this.$Message.error("发布失败");
          // this.newData();
        }
      });
    },
    previewModal() {
      var isOK = true;

      this.tempArticle.content = this.$escapeHTMLString(
        this.$refs.ue.getUEContent()
      );
      this.tempArticle.titlePictureUrl = this.titlePictureUrl;

      var tempWarning = "input ivu-input-wrapper ivu-input-type warning";
      for (var i in this.tempArticle) {
        if (i == "isStick" || i == "isRecommend") {
          this.tempArticle[i] = 1;
        }

        switch (i) {
          case "title":
            if (checkSensitive(this.tempArticle.title)) {
              this.$Message.info(
                "文章标题" + checkSensitive(this.tempArticle.title)
              );
              this.$refs["title"].$el.className = tempWarning;
              isOK = false;
            }
            break;

          case "content":
            if (checkSensitive(this.tempArticle.content)) {
              this.$Message.info(
                "文章内容" + checkSensitive(this.tempArticle.content)
              );
              this.$refs.ue.$el.className = "ueWarning";
              isOK = false;
            }
            break;

          case "keyword":
            if (checkSensitive(this.tempArticle.keyword)) {
              this.$Message.info(
                "文章关键词" + checkSensitive(this.tempArticle.keyword)
              );
              this.$refs.keyword.$el.className = tempWarning;
              isOK = false;
            }
            break;
          case "summary":
            if (checkSensitive(this.tempArticle.summary)) {
              this.$Message.info(
                "文章摘要" + checkSensitive(this.tempArticle.summary)
              );
              this.$refs.summary.$el.className = tempWarning;
              isOK = false;
            }
            break;
        }
      }

      if (isOK) {
        this.isRunOne = true;
        pubshModifyMessage(formData(this.tempArticle)).then(res => {
          if (res.status == 200) {
            this.$Message.info("发布成功");
            this.reset();
            this.newData();
            this.messageModal = false;
            this.isRunOne = false;
          } else {
            this.$Message.error("发布成功");
            this.reset();
            this.newData();
            this.messageModal = false;
            this.isRunOne = false;
          }
        });
      }
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
        // this.$refs.editArticlePersonRef.$el.className = "";
      });
    },
    hideModalOne() {
      this.editMessageModal = false;
      this.isRun = false;
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
            that.newData();
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
          that.newData();
        });
    },
    newData() {
      let array = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.status,
        informationUnitId: this.rowList.informationUnitId,
        publisherId: this.form.publisherId,
        startTime: this.form.publishTimeS,
        endTime: this.form.publishTimeE,
        keyword: this.form.informationKeyword,
        title: this.form.informationTitle,
        modifyStartTime: this.form.modifyTimeS,
        modifyEndTime: this.form.modifyTimeE,
        content: this.form.informationContent,
        order: "",
        sort: ""
      };
      
      //不可以跨年查询
      if (this.tab == 0 && this.form.publishTime) {
        let date = this.form.publishTime,
          date1 = new Date(date[0]),
          date2 = new Date(date[1]);
        if (date1.getFullYear() !== date2.getFullYear()) {
          this.$Message.info("不可以跨年查询,请选择相同年份数据!");
          return;
        }
      }

      this.$Spin.show();
      getMyPublishList(array).then(res => {
        if (res.status == 200) {
          if ([0, 1, 2, 3].includes(this.status)) {
            if (this.status == 0) {
              this.columns1 = this.handlerTableHeader(
                res.response.unpubulishRows,
                this.status,
                res.response.list
              );
            } else {
              this.columns1 = this.handlerTableHeader(
                res.response.publishRows,
                this.status,
                res.response.list
              );
            }

            this.tableData1 = res.response.list;
            this.total = res.response.total;
            this.$Spin.hide();
          }
          this.informationUnitTypeLst = res.response.informationUnitTypeLst;
        }
      });
    },
    handlerTableHeader(data, status, params) {
      let array = {
        title: "操作",
        key: "operate",
        render: (h, params) => {
          params.row.informationUnitCode =
            this.rowList.informationUnitCode || "";
          params.row.informationUnitName =
            this.rowList.informationUnitName || "";
          if (status == 0) {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "unPublishList",
                        query: {
                          item: JSON.stringify(params.row)
                        }
                      });
                    }
                  }
                },
                "修改"
              )
            ]);
          } else if (status == 1) {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.editUnit(params.row, 1);
                    }
                  }
                },
                "修改"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      params.row.informationUnitId =
                        this.rowList.informationUnitId || "";
                      this.$router.push({
                        name: "viewLog",
                        query: {
                          item: JSON.stringify(params.row)
                        }
                      });
                    }
                  }
                },
                "查看日志"
              )
            ]);
          } else if (status == 3) {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      // this.editUnit(params.row, 1);
                      this.messageEdit(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      params.row.informationUnitId =
                        this.rowList.informationUnitId || "";
                      this.$router.push({
                        name: "viewLog",
                        query: {
                          item: JSON.stringify(params.row)
                        }
                      });
                    }
                  }
                },
                "查看日志"
              )
            ]);
          }
        }
      };
      if (status == 0 || status == 1 || status == 3) {
        data.push(array);
      }
      if (status == 0) {
        data.map((v, k) => {
          if (v.key == "title") {
            let string = {
              render: (h, params) => {
                return h(
                  "span",
                  {
                    style: {
                      overflow: "hidden",
                      "text-overflow": "ellipsis",
                      "white-space": "nowrap"
                    },
                    attrs: {
                      title: params.row.title
                    }
                  },
                  params.row.title
                );
              }
            };
            // data[k].push(string);
            Object.assign(data[k], string);
          }
        });
      }
      if (status == 1) {
        data.map((v, k) => {
          if (v.key == "title") {
            let string = {
              render: (h, params) => {
                return h(
                  "a",
                  {
                    style: {
                      overflow: "hidden",
                      "text-overflow": "ellipsis",
                      "white-space": "nowrap"
                    },
                    on: {
                      click: () => {
                        this.editStatusOne(params.row, 1);
                      }
                    }
                  },
                  params.row.title
                );
              }
            };
            // data[k].push(string);
            Object.assign(data[k], string);
          }
          if (v.key == "isShow") {
            let string = {
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
            };
            // data[k].push(string);
            Object.assign(data[k], string);
          }
        });
      }
      if (status == 2) {
        data.map((v, k) => {
          if (v.key == "content") {
            let string = {
              render: (h, params) => {
                return h(
                  "a",
                  {
                    style: {
                      overflow: "hidden",
                      "text-overflow": "ellipsis",
                      "white-space": "nowrap"
                    },
                    on: {
                      click: () => {
                        this.editStatusTwo(params.row, 1);
                      }
                    }
                  },
                  params.row.content
                );
              }
            };
            Object.assign(data[k], string);
          }
        });
      }
      if (status == 3) {
        data.map((v, k) => {
          if (v.key == "title") {
            let string = {
              render: (h, params) => {
                return h(
                  "a",
                  {
                    style: {
                      overflow: "hidden",
                      "text-overflow": "ellipsis",
                      "white-space": "nowrap"
                    },
                    on: {
                      click: () => {
                        this.editStatusThree(params.row, 1);
                      }
                    }
                  },
                  params.row.title
                );
              }
            };
            Object.assign(data[k], string);
          }
        });
      }

      return data;
    },
    messageEdit(row) {
      this.editMessageModal = true;
      this.editArticle.title = row.title || "";
      this.editArticle.content = row.content || "";
      this.editArticle.messageId = row.messageId;
      this.editArticle.publisherName = row.publisherName || "";
      this.editArticle.createTime = row.createTime || "";
      this.$refs.formValidate.validateField("title");
      this.$refs.formValidate.validateField("content");
      if (this.editArticle.content.length <= 1000) {
        this.editArticle.length = this.editArticle.content.length;
      }
    },
    keyup(val) {
      this.editArticle.length = this.editArticle.content.length;

      if (checkSensitive(val)) {
        var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
            afterWarning = "input ivu-input-wrapper ivu-input-type";

        this.$Message.info("短讯内容" + checkSensitive(val));
        this.$refs.flashContent.$el.className = tempWarning;
      }else{
        this.$refs.flashContent.$el.className = afterWarning;
      }
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
          that.newData();
        }, 300);
      });
    },
    editUnit(data, index) {
      this.showEnChina = data.siteId;
      if (index == 1) {
        this.showSave = false;
      } else {
        this.showSave = true;
      }
      this.tempArticle.publisherName = data.publisherName;
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
      this.isRunOne = false;
    },
    editStatusThree(data) {
      this.sms.title = data.title;
      this.sms.content = data.content;
      this.sms.publisherName = data.publisherName;
      this.sms.departMentName = data.departMentName;
      this.sms.publishTime = formatTime(data.publishTime);
      this.messageModalThree = true;
    },
    editStatusTwo(data) {
      this.message.content = data.content;
      this.message.publisherName = data.publisherName;
      this.message.publishTime = formatTime(data.publishTime);
      this.message.departMentName = data.departMentName;
      this.messageModalTwo = true;
    },
    editStatusOne(data) {
      let messageData = {
        articleId: data.messageId || ""
      };
      articlePreview(formData(messageData)).then(res => {
        if (res.status == 200) {
          window.open(
            "https://templates.oilchem.net/article_chs.html?articleId=" +
              data.messageId +
              "&channelId=" +
              res.response.channelId +
              "&columnId=" +
              res.response.columnId +
              "&debug=1"
          );
        }
      });
    },
    hideModalTree() {
      this.messageModalThree = false;
    },
    hideModalTwo() {
      this.messageModalTwo = false;
    },
    unPublished(item) {
      this.pageNum = 1;
      this.tab = item;
      this.status = 0;
      this.reset();
      this.newData();
    },
    publishArticles(item) {
      this.pageNum = 1;
      this.tab = item;
      this.status = 1;
      this.reset();
      this.newData();
    },
    publishMessage(item) {
      this.pageNum = 1;
      this.tab = item;
      this.status = 2;
      this.reset();
      this.newData();
    },
    publishSms(item) {
      this.pageNum = 1;
      this.tab = item;
      this.status = 3;
      this.reset();
      this.newData();
    },
    publishPersonFunction(publishPersonData) {
      if (publishPersonData.data) {
        this.form.publisherId = publishPersonData.data.value;
      }
    },
    reset() {
      this.$refs.publishPersonRef.query = "";
      // this.$refs.publishPersonRef.$refs.select.query = "";
      this.form.informationTitle = "";
      this.form.informationKeyword = "";
      this.form.informationContent = "";
      this.form.publisherId = "";
      this.form.publishTime = "";
      this.form.modifyTime = "";
      this.form.publishTimeS = "";
      this.form.publishTimeE = "";
      this.form.modifyTimeS = "";
      this.form.modifyTimeE = "";
      if(this.tab == 0){
        this.initPublishTime()
      }
      this.newData();
    },
    getPublishTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);

      //不可以跨年查询
      if (data1.getFullYear() !== data2.getFullYear()) {
        this.$Message.info("不可以跨年查询,请选择相同年份数据!");
      } else {
        this.form.publishTimeS = data1.setHours(0, 0, 0, 0);
        this.form.publishTimeE = data2.setHours(23, 59, 59, 999);
      }
    },
    getModifyTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      this.form.modifyTimeS = data1.setHours(0, 0, 0, 0);
      this.form.modifyTimeE = data2.setHours(23, 59, 59, 999);
    },
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.newData();
    }
  }
};
</script>
<style lang="less" scoped>
@import "postedMessage.less";
.ueWarning {
  border: 1px solid red;
}
</style>
