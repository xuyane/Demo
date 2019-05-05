<style lang="less" scoped>
.addCreateTopicWidth {
  width: 600px;
}
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：
      <router-link to="/plantIndex" class="link-css">专题管理</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <a @click="goto" class="link-css">修改专题</a>
      
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
          <!-- <Select class="search-input" v-model="addCreateTopic.channelId" @on-change="channelIdChange">
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
          <Button type="primary" @click="editSubmit">确定</Button>
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
  info,
  update
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
        if (!reg.test(value)) {
          callback(new Error("请输入正确的格式,以html结尾"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入发布地址"));
      }
    };
    return {
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
            message: "请选择所属频道",
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
        channelId: "",
        channelName: ""
      }
    };
  },
  created() {
    this.topicListData();
    this.queryWebsiteList();
    this.queryModelList();
  },
  methods: {
    goto() {
      window.reload();
    },
    ok() {
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
    },
    selectbm(data) {
      if (data) {
        this.hadselectbm = data;
      }
    },
    cancel() {
      this.breedModel = false;
    },
    loadInfoData(item, callback) {
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
    topicListData() {
      let that = this;
      let params = {
        id: this.$route.query.id
      };
      info(params).then(res => {
        that.addCreateTopic.websiteId = res.response.websiteId;
        // that.addCreateTopic.channelId = res.response.channelId;
        that.addCreateTopic.channelId = res.response.channelName;
        // that.queryChannelListOne();
        that.addCreateTopic.topicName = res.response.topicName;
        that.addCreateTopic.modelId = res.response.modelId;
        that.addCreateTopic.publishUrl = res.response.publishUrl;
        that.addCreateTopic.keyWord = res.response.keyWord;
        that.addCreateTopic.note = res.response.note;
      });
    },
    editSubmit() {
      this.$refs.addCreateTopicRef.validate(valid => {
        if (valid) {
          let params = {
            websiteId: this.addCreateTopic.websiteId,
            // channelId:this.addCreateTopic.channelId,ownChannelIdList
            channelId: this.ownChannelIdList,
            topicName: this.addCreateTopic.topicName,
            modelId: this.addCreateTopic.modelId,
            publishUrl: this.addCreateTopic.publishUrl,
            keyWord: this.addCreateTopic.keyWord,
            note: this.addCreateTopic.note,
            id: this.$route.query.id
          };
          update(params).then(res => {
            this.$Message.success("编辑成功");
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
    handleRowChange() {},
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
      this.queryChannelList();
    },
    channelIdChange(data) {
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
        const list1 = res.response.map(item => {
          return {
            value: item.channelId,
            label: item.channelName
          };
        });
        this.ownChannelList = list1;
      });
    },
    queryChannelListOne() {
      let params = {
        channelId: "",
        siteId: this.addCreateTopic.websiteId
      };
      queryChannel(params).then(res => {
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