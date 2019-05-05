<template>
  <div class="textStyle editCss">
    <Row>
      <Col span="24">
        <Row class-name="current-position" >
          当前位置：
         <router-link to="/plantIndex" class="link-css">信息发布管理</router-link> 
        &nbsp;&nbsp;>>&nbsp;&nbsp;
         <router-link to="/myInformationUnit" class="link-css">我的信息单元 </router-link> 
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <a @click="goto" class="link-css">信息发布</a>
        </Row>
      </Col>
      <Col span="24" class-name="search-form">
        <Row>
          <div class="changePages">
            <span class="btnformstyle" @click="tabChange">表单方式</span>
            <span class="btneditstyle tab-active">文本编辑方式</span>
          </div>

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
            <div class="btn-modal unit_content">
              <Button @click="showBasicModal(rowList)">基本信息</Button>
              <Button @click="showContactModal(rowList)">联系人信息</Button>
              <Button @click="showRelavantModal(rowList)">相关信息单元</Button>
              <Button @click="showPublishModal(rowList)">已发布信息</Button>
            </div>
          </div>

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
                      maxlength="100"
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
                      :defaultMsg="item.content"
                      :config="config"
                      :index="index"
                      :ref="'ue'+index"
                      @contentChanged="contentChange"
                    ></UE>
                  </FormItem>
                  <FormItem label="关键字:">
                    <Input v-model="item.keyword" :maxlength="500" placeholder="请输入文章关键字"></Input>
                  </FormItem>
                  <FormItem label="摘要:">
                    <Input
                      v-model="item.summary"
                      :maxlength="600"
                      placeholder="请输入文章摘要"
                      type="textarea"
                      :rows="4"
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
                        <associate-Search
                          @query-list="editArticlePersonFunction"
                          :index="index"
                          :dataUrl="urlPublishPerson"
                          :ref="'editArticlePersonRef'+index"
                        ></associate-Search>
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
                      :maxlength="120"
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
                      maxlength="100"
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
                      :maxlength="250"
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

      <Col span="24">
        <Row class-name="current-position">
          <div class="btn-dibu">
            <Button :disabled="isSave" @click="save">暂存</Button>
            <Button :disabled="isPreview" @click="preview">预览</Button>
            <Button @click="cancel">返回列表</Button>
          </div>
        </Row>
      </Col>

      <basic-modal ref="basicModal" @hide-modal="hideBasicModal"/>

      <contact-modal ref="cantactModal" @hide-modal="hideContactModal"/>

      <relavant-modal ref="relavantModal" @hide-modal="hideRelavantModal"/>

      <publish-modal ref="publishModal" @hide-modal="hidePublishModal"/>

      <message-modal ref="messageModal" @hide-modal="hideMessageModal"/>

      <flash-modal ref="flashModal" @hide-modal="hideFlashModal"/>
    </Row>
  </div>
</template>

<script>
import axios from "axios";
import basicModal from "./modalList/basicModal.vue";
import contactModal from "./modalList/contactModal.vue";
import relavantModal from "./modalList/relavantModal.vue";
import publishModal from "./modalList/publishModal.vue";
import messageModal from "./modalList/messageModal.vue";
import associateSearch from "./associateSearch.vue";
import flashModal from "./modalList/flashModal.vue";
import UE from "./UE.vue";
import {
  showPublishPage,
  savePublishPage
} from "../unitmangement/api/infoDiffusion";
import { formData } from "../../../assets/js/common.js";
import { types } from "util";
export default {
  name: "textEditStyle",
  components: {
    UE,
    basicModal,
    contactModal,
    relavantModal,
    publishModal,
    messageModal,
    associateSearch,
    flashModal
  },
  data() {
    return {
      urlPublishPerson: "/information/select/employee",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      rowList: {},
      mainData: [],
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
      isSave: false,
      isPreview: false
    };
  },
  created() {
    this.rowList = JSON.parse(this.$route.query.item);
    this.initData();
  },
  methods: {
    goto() {
      window.reload();
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
          } else if (val.length > 120 && ele.publishStatus) {
            that.$nextTick(() => {
              that.$refs[
                "messageContent" + index
              ][0].$el.className = tempWarning;
            });
            that.$Message.info("短信内容字数超过限制，不能超过120个字");
          } else {
            that.$nextTick(() => {
              that.$refs[
                "messageContent" + index
              ][0].$el.className = afterWarning;
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
          } else if (val.length > 250 && ele.publishStatus) {
            that.$nextTick(() => {
              that.$refs["flashContent" + index][0].$el.className = tempWarning;
            });
            that.$Message.info("短讯通内容字数超过限制，不能超过250个字");
          } else {
            that.$nextTick(() => {
              that.$refs[
                "flashContent" + index
              ][0].$el.className = afterWarning;
            });
          }
        }
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
            that.$refs["ue" + Index][0].$el.className = "";
          }
        }
      });
    },
    editArticlePersonFunction(obj) {
      var that = this;
      that.mainData.forEach(function(ele, index) {
        if (obj.index == index) {
          if (obj.data) {
            ele.publisherName = obj.data.label;
            ele.publisherId = obj.data.value;
            that.$refs["editArticlePersonRef" + index][0].$el.className = "";
          } else {
            ele.publisherName = "";
            ele.publisherId = "";
            that.$Message.info("文章发布人不能为空");
            that.$refs["editArticlePersonRef" + index][0].$el.className =
              "selectWarning";
          }
        }
      });
    },
    initData() {
      this.$Spin.show();
      let params = {
        informationUnitId: this.rowList.informationUnitId
      };
      var that = this;
      showPublishPage(formData(params)).then(res => {
        that.mainData = res.response;
        that.mainData.forEach(function(ele, index) {
          if (ele.displayType == 1) {
            that.$nextTick(() => {
              that.$refs["editArticlePersonRef" + index][0].getData(
                ele.publisherName
              );
            });
          }
            // 信息来源开始
            if (ele.siteId == 2) {
              ele.source = "oilchem";
            }
            // 信息来源结束
        });
        that.$Spin.hide();
      });
    },
    tabChange() {
      this.$router.push({
        name: "formStyle",
        query: {
          item: this.$route.query.item
        }
      });
    },
    showBasicModal(row) {
      this.$refs.basicModal.showModal();
      this.$refs.basicModal.showBasicInfo(row);
    },
    showContactModal(row) {
      this.$refs.cantactModal.showModal();
      this.$refs.cantactModal.showContactInfo(row);
    },
    showRelavantModal(row) {
      this.$refs.relavantModal.showModal();
      this.$refs.relavantModal.showRelavantInfo(row);
    },
    showPublishModal(row) {
      if (row.displayType == 1) {
        this.$refs.publishModal.showModal();
        this.$refs.publishModal.showPublishInfo(row);
      } else if (row.displayType == 2) {
        this.$refs.messageModal.showModal();
        this.$refs.messageModal.showMessageInfo(row);
      } else {
        this.$refs.flashModal.showModal();
        this.$refs.flashModal.showFlashInfo(row);
      }
    },
    showMessageModal(row, type) {
      this.$refs.messageModal.showModal();
      this.$refs.messageModal.showMessageInfo(row, type);
    },
    showFlashModal(row) {
      this.$refs.flashModal.showModal();
      this.$refs.flashModal.showFlashInfo(row);
    },
    hideBasicModal() {
      this.$refs.basicModal.hideModal();
    },
    hideContactModal() {
      this.$refs.cantactModal.hideModal();
    },
    hideRelavantModal() {
      this.$refs.relavantModal.hideModal();
    },
    hidePublishModal() {
      this.$refs.publishModal.hideModal();
    },
    hideMessageModal() {
      this.$refs.messageModal.hideModal();
    },
    hideFlashModal() {
      this.$refs.flashModal.hideModal();
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
          default:
            break;
        }
      } else {
        switch (type) {
          case "title":
            this.$nextTick(() => {
              this.$refs["title" + index][0].$el.className = afterWarning;
            });
            break;
          case "source":
            this.$nextTick(() => {
              this.$refs["source" + index][0].$el.className = afterWarning;
            });
            break;
          case "flashTitle":
            this.$nextTick(() => {
              this.$refs["flashTitle" + index][0].$el.className = afterWarning;
            });
            break;
          default:
            break;
        }
      }
    },
    save() {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      var that = this;
      var flagList = [];
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
            that.$nextTick(() => {
              that.$refs["title" + index][0].$el.className = afterWarning;
              that.$refs["ue" + index][0].$el.className = afterWarning;
              that.$refs["source" + index][0].$el.className = afterWarning;
              that.$refs[
                "editArticlePersonRef" + index
              ][0].$el.className = afterWarning;
            });
            flagList.push(true);
          }
        } else if (ele.displayType == 2) {
          if (!ele.content && ele.publishStatus) {
            that.$Message.info("第" + (index + 1) + "个单元，短信内容不能为空");
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else if (ele.content.length > 120 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短信内容已超过120字的字数限制"
            );
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else {
            that.$nextTick(() => {
              that.$refs[
                "messageContent" + index
              ][0].$el.className = afterWarning;
            });
            flagList.push(true);
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
          } else if (ele.content.length > 250 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通内容已超过250字的字数限制"
            );
            that.$refs["flashContent" + index][0].$el.className = tempWarning;
          } else {
            that.$nextTick(() => {
              that.$refs["flashTitle" + index][0].$el.className = afterWarning;
              that.$refs[
                "flashContent" + index
              ][0].$el.className = afterWarning;
            });
            flagList.push(true);
          }
        }
      });
      if (flagList.length == that.mainData.length) {
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
              that.$router.push({ name: "myInformationUnit" });
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
    preview() {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      var that = this;
      var isALlNone = true;
      var flagList = [];
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
            that.$nextTick(() => {
              that.$refs["title" + index][0].$el.className = afterWarning;
              that.$refs["ue" + index][0].$el.className = afterWarning;
              that.$refs["source" + index][0].$el.className = afterWarning;
              that.$refs[
                "editArticlePersonRef" + index
              ][0].$el.className = afterWarning;
            });
            flagList.push(true);
          }
        } else if (ele.displayType == 2) {
          if (!ele.content && ele.publishStatus) {
            that.$Message.info("第" + (index + 1) + "个单元，短信内容不能为空");
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else if (ele.content.length > 120 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短信内容已超过120字的字数限制"
            );
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else {
            that.$nextTick(() => {
              that.$refs[
                "messageContent" + index
              ][0].$el.className = afterWarning;
            });
            flagList.push(true);
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
          } else if (ele.content.length > 250 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通内容已超过250字的字数限制"
            );
            that.$refs["flashContent" + index][0].$el.className = tempWarning;
          } else {
            that.$nextTick(() => {
              that.$refs["flashTitle" + index][0].$el.className = afterWarning;
              that.$refs[
                "flashContent" + index
              ][0].$el.className = afterWarning;
            });
            flagList.push(true);
          }
        }
      });
      if (isALlNone) {
        that.$Message.info("没有可发布的信息单元！");
      } else if (flagList.length == that.mainData.length) {
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
    cancel() {
      this.$router.push({ name: "myInformationUnit" });
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
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
.btn-modal {
  line-height: 58px;
}
.btn-modal button {
  border: 1px solid #427fe9;
  background-color: #fff;
  color: #427fe9;
  margin-left: 10px;
}
.table-2 {
  margin-bottom: 20px;
}
.btn_upload {
  width: 100px;
  border: #427fe9;
  background-color: #427fe9;
  color: #fff;
  padding: 7px 20px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
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
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

.ueWarning {
  border: 1px solid red;
}
</style>



