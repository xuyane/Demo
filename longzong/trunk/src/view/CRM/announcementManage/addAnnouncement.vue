<style lang="less" >
.edui-default .edui-toolbar .edui-combox .edui-combox-body {
  line-height: 1;
}
</style>

<template>
<Row class='varietybox'>
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;公告管理&nbsp;&nbsp;>>&nbsp;&nbsp;新增公告
            </Row>
        </i-col>
        <Col span='24'>

            <Row :gutter="20">
                <Col span='24' >
                  <Card style="margin-bottom:20px" class-name="search-form">
                    <Row >
                      <Col span='15'>
                        <Form ref="addform" :model="addform"  :rules="ruleCustom" :label-width="120">
                          <FormItem label="公告标题:" prop='title'>
                            <Input v-model="addform.title" placeholder="请输入公告标题" style="width:400px;"></Input>
                          </FormItem>
                          <FormItem label="公告内容:" prop='content'>
                            <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                          </FormItem>
                          <FormItem label="附件:" prop='name'>
                            <Upload
                              :before-upload = "handleUpload"
                              :data = "form"
                              :on-success = "uploadSuccess"
                              :on-preview = "getUrl"
                              :on-remove = "removeUrl"
                              :max-size = 20*1024
                              :action="filepath">
                              <Button style="width:190px">
                                <b class="icon-add2">+</b>
                                <span>选择文件</span>
                              </Button>
                            </Upload>
                          </FormItem>
                        </Form>
                        <Row class="btnwrap" style="text-align:center">
                          <Button type="primary" class="search-btn" @click='getUEContent' >确认发布</Button>
                          <Button  style="margin-left: 8px" class="search-btn"  @click="goback">取消</Button>
                        </Row>
                      </Col>
                    </Row> 
                  </Card>
                </Col>
              </Row>
        </Col>
        <Spin size="large" fix v-if="spinShow"></Spin> 
</Row>
</template>
<script>
import axios from "axios";
import UE from "../../components/richEdit/ueditor";
import { TemplateType } from "../../components/axios/Template.js";
import { formData } from "../../../assets/js/common.js";
import { sysnoticeinfoSave } from "../../components/axios/crm.js";
export default {
  components: {
    UE,
    TemplateType
  },
  props: {
    showEditModal: Boolean
  },
  data() {
    return {
      spinShow:false,
      form: {
        noticeFiles: ""
      },
      filepath: "crm/sysnoticeinfo/upload",
      editData: {},
      loading: false,
      optionsType: [],
      searchloading: false,
      showModal: false,
      defaultMsg: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      attUrlList: [],
      addform: {},
      ruleCustom: {
        title: [
          {
            required: true,
            type: "string",
            message: "请输入公告标题",
            trigger: "blur"
          },
          {
            required: true,
            max: 100,
            message: "公告标题100字符以内",
            trigger: "blur"
          }
        ]
      },
      stautsList: [
        {
          value: 0,
          label: "表单"
        },
        {
          value: 1,
          label: "文章"
        },
        {
          value: 2,
          label: "短信"
        },
        {
          value: 3,
          label: "短讯"
        }
      ]
    };
  },
  methods: {
    //上传成功后调用
    uploadSuccess(response) {
      // let uploadMes = {
      //   // name: response.response[0].fileName,
      //   url: response.response[0].filePath
      // }
      this.attUrlList.push(response.response[0]);
    },
    //上传文件
    handleUpload(file) {
      // file.isModify= 1;
      // file.page=0;
      // if (!this.fileroad) {
      this.form.noticeFiles = file;
      // } else {
      //   this.$Message.warning("只能上传一个文件");
      //   return false;
      // }
    },
    //点击上传成功后的文件地址
    getUrl(data) {
    },
    //点击删除文件地址
    removeUrl(file, fileList) {
      let attachArr = [];
      if (fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          attachArr.push(fileList[i].response.response);
        }
        this.attUrlList = attachArr;
      } else {
        this.attUrlList = [];
      }
    },
    getUEContent() {
      this.addform.content = this.$refs.ue.getUEContent();
      this.$refs.addform.validate(valid => {
        if (valid) {
          if (!this.addform.content) {
            this.$Message.info("请输入公告内容");
          } else {
            let msg = JSON.parse(JSON.stringify(this.addform));
            msg.noticeFiles = this.attUrlList;
            let that=this;
            that.spinShow=true;
            sysnoticeinfoSave(msg).then(resp => {
              that.spinShow=false;
              this.$router.go(-1);
            });
          }
        } else {
        }
      });
      // this.$router.push({
      //   name: 'templet'
      // })
    },
    //取消
    goback() {
      this.$router.go(-1);
    },
    cancelAddModal() {
      this.showModal = false;
      this.$emit("hide-modal");
    },
    infoType(query) {
      if (query !== "") {
        this.loading1 = true;
        let params = {
          name: query
        };
        setTimeout(() => {
          this.loading1 = false;
          TemplateType(formData(params)).then(res => {
            const list1 = res.response.map(item => {
              return {
                value: item.id,
                label: item.name
              };
            });
            this.optionsType = list1;
          });
        }, 100);
      } else {
        this.optionsType = [];
      }
    },
    infoTypeChange(data) {
      this.addform.enterpriseId = data.value;
    }
  },
  watch: {
    showEditModal(newVal, oldVal) {
      this.showModal = newVal;
    },
    editData(newVal, oldVal) {
      this.editData = newVal;
    }
  }
};
</script>

