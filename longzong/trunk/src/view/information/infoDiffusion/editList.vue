<template>
  <Row class="editCss">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：
      <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <a @click="backPre" class="link-css">信息发布</a> 
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <a @click="goto" class="link-css">修改列表</a> 
        </Row>
    </Col>

    <Col v-if="rowList.displayType == 1" span="24" class-name="search-form">
      <div>
        <div class="unit" style="position: relative">
          <div class="unit_title">
            <span>信息单元</span>
          </div>
        </div>
        <div>
          <Form :label-width="100">
            <FormItem label="文章标题:" class="tips">
              <Input
                v-model="rowList.title"
                :maxlength="100"
                ref="title"
                placeholder="请输入文章标题"
                @on-blur="showTips('title',rowList.title)"
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
                :defaultMsg="rowList.content"
                :config="config"
                :index="0"
                ref="ue"
                @contentChanged="contentChange"
              ></UE>
            </FormItem>
            <FormItem label="关键字:">
              <Input v-model="rowList.keyword" :maxlength="500" placeholder="请输入关键字"></Input>
            </FormItem>
            <FormItem label="摘要:">
              <Input
                v-model="rowList.summary"
                :maxlength="600"
                placeholder="请输入摘要"
                type="textarea"
                :rows="4"
              />
            </FormItem>
            <Row>
              <Col span="10">
                <FormItem label="是否置顶:">
                  <Select v-model="rowList.isStick" class="search-input">
                    <Option
                      v-for="rowList in typeList"
                      :value="rowList.value"
                      :key="rowList.value"
                    >{{ rowList.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="10" offset="4">
                <FormItem label="是否开启推荐:">
                  <Select v-model="rowList.isRecommend" class="search-input">
                    <Option
                      v-for="rowList in typeList"
                      :value="rowList.value"
                      :key="rowList.value"
                    >{{ rowList.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                <FormItem label="信息来源:" class="tips">
                  <Input
                    v-model="rowList.source"
                    :maxlength="100"
                    ref="source"
                    placeholder="请输入信息来源"
                    @on-blur="showTips('source',rowList.source)"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="10" offset="4">
                <FormItem label="发布人:" class="tips">
                  <associate-Search
                    @query-list="editArticlePersonFunction"
                    :dataUrl="urlPublishPerson"
                    ref="editArticlePersonRef"
                  ></associate-Search>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Col>

    <Col v-if="rowList.displayType == 2" span="24" class-name="search-form">
      <div>
        <div class="unit" style="position: relative">
          <div class="unit_title">
            <span>信息单元</span>
          </div>
        </div>
        <div>
          <Form :label-width="100">
            <FormItem label="短信内容:" class="tips">
              <Input
                type="textarea"
                :autosize="{minRows: 5,maxRows: 8}"
                v-model="rowList.content"
                :maxlength="120"
                ref="textarea"
                @on-blur="showMessageTips(rowList.content)"
                placeholder="请输入短信内容"
              ></Input>
            </FormItem>
            <FormItem>
              <div class="btn-diaoyong">
                <Button @click="showMessageModal(item)">已发布短信</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </Col>

    <Col v-if="rowList.displayType == 3" span="24" class-name="search-form">
      <div>
        <div class="unit" style="position: relative">
          <div class="unit_title">
            <span>信息单元</span>
          </div>
        </div>
        <div>
          <Form :label-width="100">
            <FormItem label="短讯通标题:" class="tips">
              <Input
                v-model="rowList.title"
                :maxlength="100"
                ref="flashTitle"
                @on-blur="showTips('flashTitle',rowList.title)"
                placeholder="请输入短讯通标题"
              ></Input>
            </FormItem>
            <FormItem label="短讯通内容:" class="tips">
              <Input
                type="textarea"
                :autosize="{minRows: 5,maxRows: 8}"
                v-model="rowList.content"
                :maxlength="1000"
                ref="textarea"
                @on-blur="showFlashTips(rowList.content)"
                placeholder="请输入短讯通内容"
              ></Input>
            </FormItem>
            <FormItem>
              <div class="btn-diaoyong">
                <Button @click="showFlashModal(item)">已发布短讯通短信</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </Col>
    <div class="btn-dibu">
      <Button :disabled="isSave" @click="save">保存</Button>
      <Button @click="cancel">取消</Button>
    </div>

    <message-modal ref="messageModal" @hide-modal="hideMessageModal"/>

    <flash-modal ref="flashModal" @hide-modal="hideFlashModal"/>
  </Row>
</template>
<script>
import axios from "axios";
import associateSearch from "./associateSearch.vue";
import { showDetailInfo } from "../unitmangement/api/infoDiffusion";
import messageModal from "./modalList/messageModal.vue";
import flashModal from "./modalList/flashModal.vue";
import { formData } from "../../../assets/js/common.js";
import { types, debug } from "util";
import UE from "./UE.vue";
export default {
  name: "editList",
  components: {
    UE,
    messageModal,
    associateSearch,
    flashModal
  },
  data() {
    return {
      isSave: false,
      titlePictureUrl: "",
      urlPublishPerson: "/information/select/employee",
      queryItems: {},
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      rowList: "",
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
    this.initData();
  },
  methods: {
     goto() {
      window.reload();
    },
     backPre(){
      this.$router.go(-2);
    },
    contentChange(obj) {
      if (!obj.content) {
        this.$Message.info("文章内容不能为空");
        this.$refs.ue.$el.className = "ueWarning";
      } else {
        this.$refs.ue.$el.className = "";
      }
    },
    showMessageTips(val) {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      if (!val) {
        this.$nextTick(() => {
          this.$refs.textarea.$el.className = tempWarning;
        });
        this.$Message.info("短信内容不能为空");
      } else if (val.length > 120) {
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
    showFlashTips(val) {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      if (!val) {
        this.$nextTick(() => {
          this.$refs.textarea.$el.className = tempWarning;
        });
        this.$Message.info("短讯通内容不能为空");
      } else if (val.length > 1000) {
        this.$nextTick(() => {
          this.$refs.textarea.$el.className = tempWarning;
        });
        this.$Message.info("短讯通内容字数超过限制，不能超过1000个字");
      } else {
        this.$nextTick(() => {
          this.$refs.textarea.$el.className = afterWarning;
        });
      }
    },
    editArticlePersonFunction(data) {
      if (data.data) {
        this.rowList.publisherId = data.data.value;
        this.rowList.publisherName = data.data.label;
        this.$refs.editArticlePersonRef.$el.className = "";
      } else {
        this.rowList.publisherId = "";
        this.rowList.publisherName = "";
        this.$refs.editArticlePersonRef.$el.className = "selectWarning";
      }
    },
    showMessageModal(row) {
      this.$refs.messageModal.showModal();
      this.$refs.messageModal.showMessageInfo(row);
    },
    hideMessageModal() {
      this.$refs.messageModal.hideModal();
    },
    showFlashModal(row) {
      this.$refs.flashModal.showModal();
      this.$refs.flashModal.showFlashInfo(row);
    },
    hideFlashModal() {
      this.$refs.flashModal.hideModal();
    },
    initData() {
      this.queryItems = JSON.parse(this.$route.query.item);
      this.$Spin.show();
      let params = {
        messageId: this.queryItems.messageId,
        displayType: this.queryItems.displayType
      };
      let that = this;
      showDetailInfo(formData(params)).then(res => {
        that.rowList = res.response;
        if (that.rowList.displayType == 1) {
          if (["", "null", null].indexOf(that.rowList.titlePictureUrl) == -1) {
            that.titlePictureUrl = that.rowList.titlePictureUrl;
          }
          that.rowList.isRecommend = that.formatValue(that.rowList.isRecommend);
          that.rowList.isStick = that.formatValue(that.rowList.isStick);
          that.$nextTick(() => {
            that.$refs.editArticlePersonRef.getData(that.rowList.publisherName);
          });
        }
        that.$Spin.hide();
      });
      that.$Spin.hide();
    },
    formatValue(val) {
      if ([null, "null", "", 0, "0"].indexOf(val) > -1) {
        return 0;
      } else {
        return 1;
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
          case "flashTitle":
            this.$nextTick(() => {
              this.$refs["flashTitle"].$el.className = tempWarning;
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
              this.$refs["title"].$el.className = afterWarning;
            });
            break;
          case "source":
            this.$nextTick(() => {
              this.$refs["source"].$el.className = afterWarning;
            });
            break;
          case "flashTitle":
            this.$nextTick(() => {
              this.$refs["flashTitle"].$el.className = afterWarning;
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
      var that = this,
        flag = false,
        objData = that.rowList;
      if (objData.displayType == 1) {
        objData.content = that.$refs.ue.getUEContent();
        objData.titlePictureUrl = that.titlePictureUrl;
        if (!objData.title) {
          that.$Message.info("文章标题不能为空");
          that.$refs["title"].$el.className = tempWarning;
        } else if (!that.$refs.ue.getUEContent()) {
          that.$Message.info("文章内容不能为空");
          that.$refs.ue.$el.className = "ueWarning";
        } else if (!objData.source) {
          that.$Message.info("文章信息来源不能为空");
          that.$nextTick(() => {
            that.$refs["source"].$el.className = tempWarning;
          });
        } else if (!objData.publisherId) {
          that.$Message.info("文章发布人不能为空");
          that.$refs.editArticlePersonRef.$el.className = "selectWarning";
        } else {
          flag = true;
        }
      } else if (objData.displayType == 2) {
        if (!objData.content) {
          that.$Message.info("短信内容不能为空");
          that.$refs.textarea.$el.className = tempWarning;
        } else if (objData.content.length > 120) {
          that.$Message.info("短信内容已超过120字的字数限制");
          that.$refs.textarea.$el.className = tempWarning;
        } else {
          flag = true;
        }
      } else {
        if (!objData.title) {
          that.$nextTick(() => {
            that.$refs["flashTitle"].$el.className = tempWarning;
          });
          that.$Message.info("短讯通标题不能为空");
        } else if (!objData.content) {
          that.$Message.info("短讯通内容不能为空");
          that.$refs.textarea.$el.className = tempWarning;
        } else if (objData.content.length > 1000) {
          that.$Message.info("个单元，短讯通内容已超过1000字的字数限制");
          that.$refs.textarea.$el.className = tempWarning;
        } else {
          flag = true;
        }
      }
      if (flag) {
        let params = objData,
          obj = {};
        for (var i in params) {
          if (objData.displayType == 1) {
            if (i == "articleAttachementVOList" && params[i].length == 0) {
              console.log("附件列表为空");
            } else if (i == "articlePictureList" && params[i].length == 0) {
              console.log("图片列表为空");
            } else if (i == "isStick" && params[i] == 0) {
              obj[i] = params[i];
            } else if (i == "isRecommend" && params[i] == 0) {
              obj[i] = params[i];
            } else if (params[i]) {
              obj[i] = params[i];
            }
          } else if (params[i]) {
            obj[i] = params[i];
          }
        }
        obj.content = that.$escapeHTMLString(obj.content);
        that.isSave = true;
        axios({
          url: "/information/unit/edit_message",
          method: "post",
          data: formData(obj)
        })
          .then(res => {
            if (res.data.message === "OK" || res.data.status === "200") {
              that.$Message.info("保存成功");
              var data = JSON.parse(localStorage.getItem("data"));
              data.map(function(ele, index) {
                if (ele.messageId == that.queryItems.messageId) {
                  data.splice(index, 1, objData);
                }
              });
              localStorage.setItem("data", JSON.stringify(data));
              that.$router.push({ name: "previewList" });
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
      this.$router.push({ name: "previewList" });
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
@import "../taskplant/taskplant.less";
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
  margin-bottom: 20px;
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

.ueWarning {
  border: 1px solid red;
}
</style>


