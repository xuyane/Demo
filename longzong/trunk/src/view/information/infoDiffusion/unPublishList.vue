<template>
  <div class="editCss formStyle">
    <Row>
      <Col span="24">
        <Row class-name="current-position">
          当前位置：
          <router-link to="/plantIndex" class="link-css">信息发布管理</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
          <router-link to="/myInformationUnit" class="link-css">我的信息单元</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
          <a @click="goToPublishList" class="link-css">发布列表</a>&nbsp;&nbsp;>>&nbsp;&nbsp;
          <a class="link-css">信息修改</a>
        </Row>
      </Col>
      <Col span="24" class-name="search-form">
        <Row>
          <div v-for="(item,index) in mainData" :key="item.id">
            <div v-if="item.displayType == 1">
              <div class="unit" style="position: relative">
                <div class="unit_title">
                  <span>信息单元{{index+1}}</span>
                </div>
                <i-switch class="checkStatus" size="large" v-model="item.publishStatus">
                  <span slot="open">发布</span>
                  <span slot="close">不发布</span>
                </i-switch>
              </div>
              <div>
                <Form :label-width="100" :ref="'unit'+index">
                  <FormItem label="文章标题:" class="tips">
                    <Input
                      v-model="item.title"
                      :maxlength="100"
                      :ref="'title'+index"
                      @on-blur="showTips('title',item.title,index)"
                      placeholder="请输入文章标题"
                    ></Input>
                  </FormItem>
                  <FormItem label="标题图片:">
                    <Col span="24">
                      <Upload
                        :ref="'upload'+index"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="5120"
                        :headers="{'index':index}"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        multiple
                        type="drag"
                        action="/information/unit/upload_image"
                        style="display: inline-block;width:50px;"
                      >
                        <div style="width: 50px;height:40px;line-height: 45px;">
                          <img
                            v-if="item.titlePictureUrl"
                            :src="'//mfs.oilchem.net/'+item.titlePictureUrl"
                            style="width: 100%"
                          >
                          <Icon v-else type="ios-cloud-upload" size="20"></Icon>
                        </div>
                      </Upload>
                    </Col>
                  </FormItem>
                  <FormItem label="文章内容:" class="tips">
                    <UE
                      :defaultMsg="HTMLDecode(item.content)"
                      :config="config"
                      :index="index"
                      :ref="'ue'+index"
                      @contentChanged="contentChange"
                      class="ue-editor"
                    ></UE>
                  </FormItem>
                  <FormItem label="关键字:">
                    <Input
                      v-model="item.keyword"
                      placeholder="请输入文章关键字"
                      :maxlength="500"
                      :ref="'keyword'+index"
                      @on-blur="showTips('keyword', item.keyword, index)"
                    ></Input>
                  </FormItem>
                  <FormItem label="摘要:">
                    <Input
                      v-model="item.summary"
                      placeholder="请输入文章摘要"
                      type="textarea"
                      :maxlength="600"
                      :rows="4"
                      :ref="'summary'+index"
                      @on-blur="showTips('summary', item.summary, index)"
                    />
                  </FormItem>
                  <Row>
                    <Col span="10">
                      <FormItem label="是否置顶:">
                        <Select v-model="item.isStick">
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
                        <Select v-model="item.isRecommend">
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
                          v-model="item.source"
                          :maxlength="100"
                          :ref="'source'+index"
                          @on-blur="showTips('source',item.source,index)"
                          placeholder="请输入文章信息来源"
                        ></Input>
                      </FormItem>
                    </Col>
                    <Col span="10" offset="4">
                      <FormItem label="发布人:" class="tips">
                        <Input
                          v-model="item.publisherName"
                          :ref="'editArticlePersonRef'+index"
                          disabled
                        ></Input>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
            <div v-if="item.displayType == 2">
              <div class="unit" style="position: relative">
                <div class="unit_title">
                  <span>信息单元{{index+1}}</span>
                </div>
                <i-switch class="checkStatus" size="large" v-model="item.publishStatus">
                  <span slot="open">发布</span>
                  <span slot="close">不发布</span>
                </i-switch>
              </div>
              <div>
                <Form :label-width="100" :ref="'unit'+index">
                  <FormItem label="短信内容:" class="tips">
                    <Input
                      type="textarea"
                      :autosize="{minRows: 5,maxRows: 8}"
                      v-model="item.content"
                      :maxlength="360"
                      :ref="'messageContent'+index"
                      @on-blur="showMessageTips(item.content,index)"
                      placeholder="请输入短信内容"
                    ></Input>
                  </FormItem>
                  <FormItem label=" ">
                    <div class="btn-diaoyong">
                      <Button @click="showMessageModal(item)">已发布短信</Button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </div>
            <div v-if="item.displayType == 3">
              <div class="unit" style="position: relative">
                <div class="unit_title">
                  <span>信息单元{{index+1}}</span>
                </div>
                <i-switch class="checkStatus" size="large" v-model="item.publishStatus">
                  <span slot="open">发布</span>
                  <span slot="close">不发布</span>
                </i-switch>
              </div>
              <div>
                <Form :label-width="100" :ref="'unit'+index">
                  <FormItem label="短讯通标题:" class="tips">
                    <Input
                      v-model="item.title"
                      :maxlength="100"
                      :ref="'flashTitle'+index"
                      @on-blur="showTips('flashTitle',item.title,index)"
                      placeholder="请输入短讯通标题"
                    ></Input>
                  </FormItem>
                  <FormItem label="短讯通内容:" class="tips">
                    <Input
                      type="textarea"
                      :autosize="{minRows: 5,maxRows: 8}"
                      v-model="item.content"
                      :maxlength="1000"
                      :ref="'flashContent'+index"
                      @on-blur="showFlashTips(item.content,index)"
                      placeholder="请输入短讯通内容"
                    ></Input>
                  </FormItem>
                  <FormItem label=" ">
                    <div class="btn-diaoyong">
                      <Button @click="showFlashModal(item)">已发布短讯通短信</Button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </div>
          </div>
        </Row>
      </Col>
    </Row>
    <div class="footer">
      <Button type="primary" :disabled="isSave" @click="save">保存</Button>
      <Button type="primary" :disabled="isPreview" @click="preview" style="margin:0 20px;">预览</Button>
      <Button type="primary" @click="cancel">取消</Button>
    </div>
    <flash-modal ref="flashModal" @hide-modal="hideFlashModal"/>

    <message-modal ref="messageModal" @hide-modal="hideMessageModal"/>
  </div>
</template>
<script>
import axios from "axios";
import messageModal from "./modalList/messageModal.vue";
import flashModal from "./modalList/flashModal.vue";
import UE from "./UE.vue";
import { getUnPublish } from "../unitmangement/api/infoDiffusion";
import { formData, checkSensitive } from "../../../assets/js/common.js";
export default {
  components: {
    UE,
    messageModal,
    flashModal
  },
  data() {
    return {
      rowList: {},
      mainData: [],
      showEnChina: "",
      isPreview: false,
      isSave: false,
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350,
        allowDivTransToP: false
      },
      typeList: [
        {
          label: "是",
          value: 0
        },
        {
          label: "否",
          value: 1
        }
      ]
    };
  },
  created() {
    this.rowList = JSON.parse(this.$route.query.item);
    this.initData();
    // this.historicalDataValueDefault();
  },
  methods: {
    initData() {
      this.$Spin.show();

      let params = {
        informationUnitId: this.rowList.informationUnitId,
        messageId: this.rowList.messageId,
        createTime: this.rowList.createTime
      };

      var that = this;

      getUnPublish(formData(params)).then(res => {
        that.mainData = res.response;
        that.mainData.forEach(function(ele, index) {
          if (ele.displayType == 1) {
            // 信息来源
            if (ele.siteId == 2 && (ele.source == "" || ele.source == null)) {
              ele.source = "Oilchem";
            }
          }
        });
        that.$Spin.hide();
      });
    },
    handleSuccess(res, file) {
      this.mainData.forEach(function(ele, index) {
        if (res.response.index == index) {
          ele.titlePictureUrl = res.response.url;
        }
      });
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
        title: "提示",
        desc: "上传图片大小不得超过 5M"
      });
    },
    contentChange(obj) {
      var that = this;
      that.mainData.forEach(function(ele, Index) {
        if (obj.index == Index) {
          if (!obj.content && ele.publishStatus) {
            that.$Message.info("文章内容不能为空");
            that.$refs["ue" + Index][0].$el.className = "ueWarning";
          } else {
            if (checkSensitive(obj.content)) {
               that.$Message.info({
                content: "文章内容" + checkSensitive(obj.content),
                duration: 3
              });
              that.$refs["ue" + Index][0].$el.className = "ueWarning";
            } else {
              that.$refs["ue" + Index][0].$el.className = "";
            }
          }
        }
      });
    },
    editArticlePersonFunction(data) {
      if (data.data) {
        this.tempArticle.publisherId = data.data.value;
        this.tempArticle.publisherName = data.data.label;
      } else {
        this.tempArticle.publisherId = "";
        this.tempArticle.publisherName = "";
      }
    },
    goToPublishList() {
      this.$router.push({
        name: "publishList",
        query: {
          item: JSON.stringify(this.rowList)
        }
      });
    },
    HTMLDecode(text) {
      var temp = document.createElement("div");
      temp.innerHTML = text;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
    },
    showTips(type, val, index) {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      if (!val) {
        switch (type) {
          case "title":
            this.$nextTick(() => {
              this.$refs["title" + index][0].$el.className = tempWarning;
            });
            this.$Message.info("文章标题不能为空");
            break;
          case "source":
            this.$nextTick(() => {
              this.$refs["source" + index][0].$el.className = tempWarning;
            });
            this.$Message.info("文章信息来源不能为空");
            break;
          case "flashTitle":
            this.$nextTick(() => {
              this.$refs["flashTitle" + index][0].$el.className = tempWarning;
            });
            this.$Message.info("短讯通标题不能为空");
            break;
          case "keyword":
          case "summary":
            this.$refs[type + index][0].$el.className = afterWarning;
          default:
            break;
        }
      } else {
        switch (type) {
          case "title":
            this.$nextTick(() => {
              if (checkSensitive(val)) {
                this.$refs["title" + index][0].$el.className = tempWarning;
                this.$Message.info({
                  content: "文章标题" + checkSensitive(val),
                  duration: 3
                });
              } else {
                this.$refs["title" + index][0].$el.className = afterWarning;
              }
            });
            break;
          case "source":
            this.$nextTick(() => {
              this.$refs["source" + index][0].$el.className = afterWarning;
            });
            break;
          case "flashTitle":
            this.$nextTick(() => {
              if (checkSensitive(val)) {
                this.$refs["flashTitle" + index][0].$el.className = tempWarning;
                this.$Message.info({
                  content: "短讯通标题" + checkSensitive(val),
                  duration: 3
                });
              } else {
                this.$refs[
                  "flashTitle" + index
                ][0].$el.className = afterWarning;
              }
            });
            break;
          case "keyword":
          case "summary":
            let text = type === "keyword" ? "文章关键词" : "文章摘要";

            if (checkSensitive(val)) {
              this.$nextTick(() => {
                this.$refs[type + index][0].$el.className = tempWarning;
                 this.$Message.info({
                  content: text + checkSensitive(val),
                  duration: 3
                });
              });
            } else {
              this.$refs[type + index][0].$el.className = afterWarning;
            }
            break;
          default:
            break;
        }
      }
    },
    showFlashModal(row) {
      this.$refs.flashModal.showModal();
      this.$refs.flashModal.showFlashInfo(row);
    },
    hideFlashModal() {
      this.$refs.flashModal.hideModal();
    },
    showMessageModal(row) {
      this.$refs.messageModal.showModal();
      this.$refs.messageModal.showMessageInfo(row);
    },
    hideMessageModal() {
      this.$refs.messageModal.hideModal();
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
    preview() {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type",
        that = this,
        flagList = [],
        isALlNone = true,
        isOk = true;

      that.mainData.forEach(function(ele, index) {
        if (ele.publishStatus) {
          isALlNone = false;
        }
        if (ele.displayType == 1) {
          ele.content = that.$refs["ue" + index][0].getUEContent();
          if (!ele.title && ele.publishStatus) {
            that.$Message.info("第" + (index + 1) + "个单元，文章标题不能为空");
            that.$nextTick(() => {
              that.$refs["title" + index][0].$el.className = tempWarning;
            });
          } else if (
            !that.$refs["ue" + index][0].getUEContent() &&
            ele.publishStatus
          ) {
            that.$Message.info("第" + (index + 1) + "个单元，文章内容不能为空");
            that.$refs["ue" + index][0].$el.className = "ueWarning";
          } else if (!ele.source && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，文章信息来源不能为空"
            );
            that.$nextTick(() => {
              that.$refs["source" + index][0].$el.className = tempWarning;
            });
          } else if (!ele.publisherId && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，文章发布人不能为空"
            );
            that.$refs["editArticlePersonRef" + index][0].$el.className =
              "selectWarning";
          } else {
            //文章标题校验敏感词
            if (checkSensitive(ele.title)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章标题" +
                  checkSensitive(ele.title),
                duration: 3
              });
              that.$refs["title" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["ue" + index][0].$el.className = afterWarning;
            }

            //文章内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs["ue" + index][0].$el.className = "ueWarning";
            } else {
              that.$refs["ue" + index][0].$el.className = afterWarning;
            }

            //文章关键词校验敏感词
            if (checkSensitive(ele.keyword)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章关键词" +
                  checkSensitive(ele.keyword),
                duration: 3
              });
              that.$refs["keyword" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["keyword" + index][0].$el.className = afterWarning;
            }

            //文章摘要校验敏感词
            if (checkSensitive(ele.summary)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章摘要" +
                  checkSensitive(ele.summary),
                duration: 3
              });
              that.$refs["summary" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["summary" + index][0].$el.className = afterWarning;
            }

            that.$nextTick(() => {
              that.$refs["source" + index][0].$el.className = afterWarning;
              that.$refs[
                "editArticlePersonRef" + index
              ][0].$el.className = afterWarning;
            });
            
            if (isOk) {
              flagList.push(true);
            }
          }
        } else if (ele.displayType == 2) {
          if (!ele.content && ele.publishStatus) {
            that.$Message.info("第" + (index + 1) + "个单元，短信内容不能为空");
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else if (ele.content.length > 360 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短信内容已超过360字的字数限制"
            );
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else {
            //短信内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，短信内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs[
                "messageContent" + index
              ][0].$el.className = tempWarning;
            } else {
              that.$nextTick(() => {
                that.$refs[
                  "messageContent" + index
                ][0].$el.className = afterWarning;
              });

              flagList.push(true);
            }
          }
        } else {
          if (!ele.title && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通标题不能为空"
            );
            that.$nextTick(() => {
              that.$refs["flashTitle" + index][0].$el.className = tempWarning;
            });
          } else if (!ele.content && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通内容不能为空"
            );
            that.$refs["flashContent" + index][0].$el.className = tempWarning;
          } else if (ele.content.length > 1000 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通内容已超过1000字的字数限制"
            );
            that.$refs["flashContent" + index][0].$el.className = tempWarning;
          } else {
            //短讯通内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "短讯通内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs["flashContent" + index][0].$el.className = tempWarning;
            } else if (checkSensitive(ele.title)) {
              //短讯通标题校验敏感词
              isOk = false;
              that.$Message.info({
                content:
                  "第" + (index + 1) + "短讯通标题" + checkSensitive(ele.title),
                duration: 3
              });
              that.$refs["flashTitle" + index][0].$el.className = tempWarning;
            } else {
              that.$nextTick(() => {
                that.$refs[
                  "flashTitle" + index
                ][0].$el.className = afterWarning;
                that.$refs[
                  "flashContent" + index
                ][0].$el.className = afterWarning;
              });
              flagList.push(true);
            }
          }
        }
      });

      if (!isOk) {
        return;
      }
      
      if (isALlNone) {
        that.$Message.info("没有可发布的信息单元！");
      } else if (
        flagList.length == that.mainData.length &&
        flagList.length > 0
      ) {
        //加上一个状态表示从修改状态预览
        for (let one of that.mainData) {
          one.status = 1;
        }

        let params = {
          contents: that.$escapeHTMLString(JSON.stringify(that.mainData))
        };

        that.isPreview = true;
        axios({
          url: "/information/unit/save_message",
          method: "post",
          data: formData(params)
        })
          .then(res => {
            if (res.data.message === "OK" || res.data.status === "200") {
              that.mainData.forEach(function(item) {
                if (item.publishStatus) {
                  localStorage.setItem(
                    "data",
                    JSON.stringify(res.data.response)
                  );

                  that.$router.push({
                    name: "previewList"
                  });
                }
              });
            } else {
              that.isPreview = false;
              that.$Message.error(res.data.message);
            }
          })
          .catch(err => {
            that.isPreview = false;
          });
      }
    },
    showMessageTips(val, index) {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      var that = this;
      that.mainData.forEach(function(ele, Index) {
        if (index == Index) {
          if (!val && ele.publishStatus) {
            that.$nextTick(() => {
              that.$refs[
                "messageContent" + index
              ][0].$el.className = tempWarning;
            });
            that.$Message.info("短信内容不能为空");
          } else if (val.length > 360 && ele.publishStatus) {
            that.$nextTick(() => {
              that.$refs[
                "messageContent" + index
              ][0].$el.className = tempWarning;
            });
            that.$Message.info("短信内容字数超过限制，不能超过360个字");
          } else {
            that.$nextTick(() => {
              if (checkSensitive(val)) {
                that.$Message.info({
                  content: "短信内容" + checkSensitive(val),
                  duration: 3
                });
                that.$refs[
                  "messageContent" + index
                ][0].$el.className = tempWarning;
              } else {
                that.$refs[
                  "messageContent" + index
                ][0].$el.className = afterWarning;
              }
            });
          }
        }
      });
    },
    showFlashTips(val, index) {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      var that = this;
      that.mainData.forEach(function(ele, Index) {
        if (index == Index) {
          if (!val && ele.publishStatus) {
            that.$nextTick(() => {
              that.$refs["flashContent" + index][0].$el.className = tempWarning;
            });
            that.$Message.info("短讯通内容不能为空");
          } else if (val.length > 1000 && ele.publishStatus) {
            that.$nextTick(() => {
              that.$refs["flashContent" + index][0].$el.className = tempWarning;
            });
            that.$Message.info("短讯通内容字数超过限制，不能超过1000个字");
          } else {
            that.$nextTick(() => {
              if (checkSensitive(val)) {
                that.$Message.info({
                content: "短讯通内容" + checkSensitive(val),
                duration: 3
              });
                that.$refs[
                  "flashContent" + index
                ][0].$el.className = tempWarning;
              } else {
                that.$refs[
                  "flashContent" + index
                ][0].$el.className = afterWarning;
              }
            });
          }
        }
      });
    },
    save() {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type",
        that = this,
        flagList = [],
        isOk = true;

      that.mainData.forEach(function(ele, index) {
        if (ele.displayType == 1) {
          ele.content = that.$refs["ue" + index][0].getUEContent();
          if (!ele.title && ele.publishStatus) {
            that.$Message.info("第" + (index + 1) + "个单元，文章标题不能为空");
            that.$nextTick(() => {
              that.$refs["title" + index][0].$el.className = tempWarning;
            });
          } else if (
            !that.$refs["ue" + index][0].getUEContent() &&
            ele.publishStatus
          ) {
            that.$Message.info("第" + (index + 1) + "个单元，文章内容不能为空");
            that.$refs["ue" + index][0].$el.className = "ueWarning";
          } else if (!ele.source && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，文章信息来源不能为空"
            );
            that.$nextTick(() => {
              that.$refs["source" + index][0].$el.className = tempWarning;
            });
          } else if (!ele.publisherId && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，文章发布人不能为空"
            );
            that.$refs["editArticlePersonRef" + index][0].$el.className =
              "selectWarning";
          } else {
            //文章标题校验敏感词
            if (checkSensitive(ele.title)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章标题" +
                  checkSensitive(ele.title),
                duration: 3
              });
              that.$refs["title" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["ue" + index][0].$el.className = afterWarning;
            }

            //文章内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs["ue" + index][0].$el.className = "ueWarning";
            } else {
              that.$refs["ue" + index][0].$el.className = afterWarning;
            }

            //文章关键词校验敏感词
            if (checkSensitive(ele.keyword)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章关键词" +
                  checkSensitive(ele.keyword),
                duration: 3
              });
              that.$refs["keyword" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["keyword" + index][0].$el.className = afterWarning;
            }

            //文章摘要校验敏感词
            if (checkSensitive(ele.summary)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章摘要" +
                  checkSensitive(ele.summary),
                duration: 3
              });
              that.$refs["summary" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["summary" + index][0].$el.className = afterWarning;
            }

            that.$refs["source" + index][0].$el.className = afterWarning;
            that.$refs[
              "editArticlePersonRef" + index
            ][0].$el.className = afterWarning;
            // });

            if (isOk) {
              flagList.push(true);
            }
          }
        } else if (ele.displayType == 2) {
          if (!ele.content && ele.publishStatus) {
            that.$Message.info("第" + (index + 1) + "个单元，短信内容不能为空");
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else if (ele.content.length > 360 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短信内容已超过360字的字数限制"
            );
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else {
            //短信内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
             that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，短信内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs[
                "messageContent" + index
              ][0].$el.className = tempWarning;
            } else {
              that.$nextTick(() => {
                that.$refs[
                  "messageContent" + index
                ][0].$el.className = afterWarning;
              });

              flagList.push(true);
            }
          }
        } else {
          if (!ele.title && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通标题不能为空"
            );
            that.$nextTick(() => {
              that.$refs["flashTitle" + index][0].$el.className = tempWarning;
            });
          } else if (!ele.content && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通内容不能为空"
            );
            that.$refs["flashContent" + index][0].$el.className = tempWarning;
          } else if (ele.content.length > 1000 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通内容已超过1000字的字数限制"
            );
            that.$refs["flashContent" + index][0].$el.className = tempWarning;
          } else {
            //短讯通内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
             that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "短讯通内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs["flashContent" + index][0].$el.className = tempWarning;
            } else if (checkSensitive(ele.title)) {
              //短讯通标题校验敏感词
              isOk = false;
             that.$Message.info({
                content:
                  "第" + (index + 1) + "短讯通标题" + checkSensitive(ele.title),
                duration: 3
              });
              that.$refs["flashTitle" + index][0].$el.className = tempWarning;
            } else {
              that.$nextTick(() => {
                that.$refs[
                  "flashTitle" + index
                ][0].$el.className = afterWarning;
                that.$refs[
                  "flashContent" + index
                ][0].$el.className = afterWarning;
              });
              flagList.push(true);
            }
          }
        }
      });

      if (!isOk) {
        return false;
      }

      if (flagList.length == that.mainData.length) {
        //加上一个状态表示从修改状态预览
        for (let one of that.mainData) {
          one.status = 1;
        }
        let params = {
          contents: that.$escapeHTMLString(JSON.stringify(that.mainData))
        };
        that.isSave = true;
        axios({
          url: "/information/unit/save_message",
          method: "post",
          data: formData(params)
        })
          .then(res => {
            if (res.data.message === "OK" || res.data.status === "200") {
              that.$Message.info("保存成功");
              that.$router.push({
                name: "publishList",
                query: {
                  item: JSON.stringify(this.rowList)
                }
              });
            } else {
              that.isSave = false;
              that.$Message.error(res.data.message);
            }
          })
          .catch(err => {
            that.isSave = false;
          });
      }
    },
    cancel() {
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
<style lang="less" scoped>
@import "../taskplant/taskplant.less";
.changePages {
  font-size: 0;
  margin-bottom: 10px;
}
.btnformstyle {
  padding: 6px 50px;
  border: 1px solid #427fe9;
  color: #427fe9;
  cursor: pointer;
  font-size: 14px;
}
.btnformstyle.tab-active {
  background-color: #427fe9;
  color: #fff;
}
.btneditstyle {
  padding: 6px 50px;
  border: 1px solid #427fe9;
  color: #427fe9;
  cursor: pointer;
  font-size: 14px;
}
.btneditstyle.tab-active {
  background-color: #427fe9;
  color: #fff;
}
.table-2 {
  margin-bottom: 20px;
}
.input_upload {
  width: 200px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.laiyuan {
  width: 250px;
}
.pailie {
  overflow: hidden;
}
.btn-diaoyong button {
  border: 1px solid #427fe9;
  background-color: #fff;
  color: #427fe9;
  margin-right: 10px;
  margin-bottom: 10px;
}
.btn-dibu {
  text-align: center;
}
.btn-dibu button {
  border: 1px solid #427fe9;
  background-color: #427fe9;
  color: #fff;
  margin-right: 10px;
  padding: 5px 50px;
}
.unit_title.jibenxinxi {
  margin-top: -20px;
  text-align: left;
}
.header1 {
  font-size: 14px;
}
.publishedList {
  margin-bottom: 30px;
}
.publishedbtn {
  margin-bottom: 20px;
}
.checkStatus {
  position: absolute;
  top: 50%;
  right: 2%;
}
.f14 {
  font-size: 14px;
}
.plant-content {
  background: #fff;
  padding: 0 20px;
}
.unit {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}
.unit .unit_title {
  padding-top: 20px;
}

.unit .unit_title span {
  height: 43px;
  width: 100%;
  background: #ebf2fe;
  border: 1px solid #bbbbbb;
  display: block;
  color: #000000;
  font-size: 16px;
  line-height: 43px;
  padding-left: 10px;
}
.footer {
  text-align: center;
  margin-bottom: 20px;
}
.ueWarning {
  border: 1px solid red;
}
</style>