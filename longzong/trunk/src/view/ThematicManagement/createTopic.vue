<style lang="less" scoped>
  @import url("./css/them.less");
  .addCreateTopicWidth {
    width: 600px;
  }
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      <!-- 当前位置：专题管理&nbsp;&nbsp;>>&nbsp;&nbsp;创建专题 -->
      当前位置：
      <router-link to="/plantIndex" class="link-css">专题管理</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <router-link to="/createTopic" class="link-css">创建专题</router-link>

    </Row>
    <Col span="24" class-name="search-form">
    <Form ref="addCreateTopicRef" :model="addCreateTopic" :rules="addRules" :label-width="170" style="padding-bottom:80px">
      <Row>
        <Col span="24">
        <FormItem label="所属站点:" prop="websiteId" class="addCreateTopicWidth">
          <Select class="search-input" v-model="addCreateTopic.websiteId" @on-change="siteListChange">
            <Option v-for="item in affiliatedSiteList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="所属频道:" prop="channelId" class="addCreateTopicWidth">
          <!-- <Select class="search-input" v-model="addCreateTopic.channelId" @on-open-change="channelIdChange">
                  <Option v-for="item in ownChannelList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select> -->
          <Input v-model="addCreateTopic.channelId" class="search-input" readonly @on-focus="getBreedData()" placeholder="请选择所属频道"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="专题名称:" prop="topicName" class="addCreateTopicWidth">
          <Input placeholder="请输入专题名称" class="search-input" v-model="addCreateTopic.topicName"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="专题模板:" prop="modelId" class="addCreateTopicWidth">
          <Select class="search-input" v-model="addCreateTopic.modelId">
            <Option v-for="item in modelIdList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="发布地址:" prop="publishUrl" class="addCreateTopicWidth">
          <Input placeholder="请输入发布地址" class="search-input" v-model="addCreateTopic.publishUrl"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="关键字:" class="addCreateTopicWidth" prop="keyWord">
          <Input placeholder="请输入关键字" class="search-input" v-model="addCreateTopic.keyWord"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="专题描述:" class="addCreateTopicWidth" prop="note">
          <Input class="search-textarea" v-model="addCreateTopic.note" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}"
            placeholder="请输入专题描述"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem class="addCreateTopicWidth">
          <Button type="primary" @click="addCreateTopicSubmit">确定</Button>
          <Button style="width: 68px; margin-left: 20px" @click="quxiao">取消</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    </Col>
    </Col>
    <Modal v-model="breedModel" title="频道" @on-cancel="cancel">
      <div style="max-height: 300px;overflow: auto;" class="treeOne">
        <Tree ref="infoRef" :data="infoDataTree" :load-data="loadInfoData" @on-select-change='selectbm'></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="ok">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </Row>
</template>
<script>
  import axios from "axios";
  import OilPage from "../components/page/page.vue";
  import {
    queryWebsite,
    queryChannel,
    queryModel,
    save
  } from "./api/thematicManagement.js";
  export default {
    components: {
      OilPage
    },
    data() {
      const validatewebsiteId = (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("请选择站点"));
        }
      };
      const validatechannelId = (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("请选择所属频道"));
        }
      };
      const validatetopicName = (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("请输入专题名称"));
        }
      };
      const validatemodelId = (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("请选择专题模板"));
        }
      };
      const validatepublishUrl = (rule, value, callback) => {
        let reg = /\.html$/;
        if (value) {
          console.log(reg.test(value));
          if (!reg.test(value)) {
            console.log(33);
            callback(new Error("请输入正确的格式,以html结尾"));
          } else {
            callback();
          }
        } else {
          console.log(555);
          callback(new Error("请输入发布地址"));
        }
      };
      return {
        ownChannelIdList: "",
        hadselectbm: [],
        infoDataTree: [],
        breedModel: false,
        modelIdList: [],
        AssoInforClass: false,
        total: 0,
        pageSize: 10,
        pageNum: 1,
        showSizer: true,
        pageSizeOpts: [5, 10, 20, 30],
        tableData_info: [],
        columns_info: [
          {
            type: "selection",
            minWidth: 60,
            align: "center"
          },
          {
            title: "模板名称",
            key: '"templateName'
          }
        ],
        affiliatedSiteList: [],
        ownChannelList: [],
        addRules: {
          websiteId: [
            {
              required: true,
              validator: validatewebsiteId,
              message: "请选择站点",
              trigger: "change"
            }
          ],
          channelId: [
            {
              required: true,
              validator: validatechannelId,
              trigger: "change"
            }
          ],
          topicName: [
            {
              required: true,
              validator: validatetopicName,
              trigger: "change"
            },
            {
              type: "string",
              max: 50,
              message: "专题名称不能超过50个字符",
              trigger: "blur"
            }
          ],
          modelId: [
            {
              required: true,
              validator: validatemodelId,
              trigger: "change"
            }
          ],
          publishUrl: [
            {
              required: true,
              validator: validatepublishUrl,
              trigger: "change"
            }
          ],
          keyWord: [
            {
              type: "string",
              max: 50,
              message: "关键字不能超过50个字符",
              trigger: "blur"
            }
          ],
          note: [
            {
              type: "string",
              max: 200,
              message: "专题描述不能超过200个字符",
              trigger: "blur"
            }
          ]
        },
        addCreateTopic: {
          websiteId: "",
          topicName: "",
          publishUrl: "",
          note: "",
          modelId: "",
          keyWord: "",
          channelId: ""
        }
      };
    },
    created() {
      this.queryWebsiteList();
      this.queryModelList();
    },
    methods: {
      selectbm(data) {
        console.log(1666, data);
        if (data) {
          this.hadselectbm = data;
        }
      },
      ok() {
        console.log(this.hadselectbm);
        if (this.hadselectbm.length > 0) {
          //  var namelist = this.hadselectbm.map(item => {
          //   return item.title;
          // });
          var namelist = this.hadselectbm[0].title;
          // this.ownChannelIdList = this.hadselectbm.map(item => {
          //   return item.id;
          // });
          this.ownChannelIdList = this.hadselectbm[0].id;
          this.addCreateTopic.channelId = namelist;
          this.breedModel = false;
        } else {
          this.ownChannelIdList = "";
          this.addCreateTopic.channelId = "";
          this.$Message.warning("请选择频道");
          this.breedModel = true;
        }
        console.log("ownChannelIdList", this.ownChannelIdList);
      },
      cancel() {
        this.breedModel = false;
      },
      loadInfoData(item, callback) {
        console.log("item", item);
        // this.infoId = item.id
        let form = {
          channelId: item.id,
          siteId: this.addCreateTopic.websiteId || ""
        };
        queryChannel(form).then(res => {
          let infoDataTree = res.response.map(item => {
            if (item.isLeaf == 0) {
              return {
                id: item.channelId,
                title: item.channelName,
                loading: false,
                children: []
              };
            } else {
              return {
                id: item.channelId,
                title: item.channelName
              };
            }
          });
          callback(infoDataTree);
        });
      },
      getBreedData() {
        if (
          this.addCreateTopic.websiteId &&
          this.addCreateTopic.websiteId != ""
        ) {
          this.getInfoData();
          this.breedModel = true;
        } else {
          // this.$Message.warning("请选择所属站点")
          this.$refs.addCreateTopicRef.validateField("websiteId");
        }
      },
      getInfoData() {
        let params = {
          channelId: "",
          siteId: this.addCreateTopic.websiteId || ""
        };
        console.log(params);
        queryChannel(params).then(res => {
          this.infoDataTree = res.response.map(item => {
            if (item.isLeaf == 0) {
              return {
                id: item.channelId,
                title: item.channelName,
                loading: false,
                children: []
              };
            } else {
              return {
                id: item.channelId,
                title: item.channelName
              };
            }
          });
        });
      },
      channelOpen(data) {
        if (data) {
          if (this.addCreateTopic.channelId == "") {
            this.$refs.addCreateTopicRef.validateField("websiteId");
          }
        }
      },
      addCreateTopicSubmit() {
        this.$refs.addCreateTopicRef.validate(valid => {
          if (valid) {
            let params = {
              websiteId: this.addCreateTopic.websiteId,
              channelId: this.ownChannelIdList,
              topicName: this.addCreateTopic.topicName,
              modelId: this.addCreateTopic.modelId,
              publishUrl: this.addCreateTopic.publishUrl,
              keyWord: this.addCreateTopic.keyWord,
              note: this.addCreateTopic.note
            };
            save(params).then(res => {
              this.$Message.success("新增成功");
              // this.$refs.addCreateTopicRef.resetFields();
              this.$router.push({ name: "topicList" });
            });
          }
        });
      },
      quxiao() {
        this.$router.push({
          name: "topicList"
        });
      },
      handleRowChange() { },
      createdTopic() {
        this.AssoInforClass = true;
      },
      queryModelList() {
        queryModel().then(res => {
          const list1 = res.response.map(item => {
            return {
              value: item.id,
              label: item.templateName
            };
          });
          this.modelIdList = list1;
        });
      },
      pageChange(page, pageSize) {
        if (page) {
          this.pageNum = page;
        }
        if (pageSize) {
          this.pageSize = pageSize;
        }
        // this.getListPage();
      },
      siteListChange(data) {
        this.addCreateTopic.websiteId = data;
        this.addCreateTopic.channelId = "";
        // this.queryChannelList();
        // this.getChannel();
      },
      channelIdChange(data) {
        console.log(data);
        if (this.addCreateTopic.channelId == "") {
          this.$refs.addCreateTopicRef.validateField("websiteId");
        }
      },
      queryWebsiteList() {
        queryWebsite().then(res => {
          const list1 = res.response.map(item => {
            return {
              value: item.siteId,
              label: item.siteName
            };
          });
          this.affiliatedSiteList = list1;
        });
      },
      queryChannelList() {
        let params = {
          channelId: this.addCreateTopic.channelId,
          siteId: this.addCreateTopic.websiteId
        };
        queryChannel(params).then(res => {
          console.log("res", res);
          const list1 = res.response.map(item => {
            return {
              value: item.channelId,
              label: item.channelName
            };
          });
          this.ownChannelList = list1;
        });
      }
    }
  };
</script>