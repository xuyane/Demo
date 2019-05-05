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
      <router-link to="/topicList" class="link-css">专题列表</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <a @click="backPre" class="link-css">专栏列表</a>
      &nbsp;&nbsp;>>&nbsp;&nbsp; 
       <a @click="goto" class="link-css">查看专栏</a>
    </Row>
    <Col span="24" class-name="search-form">
    <Form ref="addCreateTopicRef" :model="addCreateTopic" :rules="addRules" :label-width="170" style="padding-bottom:80px">
      <Row>
        <Col span="24">
        <FormItem label="所属专题:" class="addCreateTopicWidth">
          <p style="font-size:14px">{{addCreateTopic.websiteName}}</p>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="专栏名称:" class="addCreateTopicWidth">
          <p style="font-size:14px">{{addCreateTopic.columnName}}</p>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="专栏模板:" prop="modelId" class="addCreateTopicWidth">
          <p style="font-size:14px">{{addCreateTopic.columnModelName}}</p>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="信息行数:" prop="publishUrl" class="addCreateTopicWidth">
          <p style="font-size:14px">{{addCreateTopic.lineNum}}</p>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="专栏描述:" class="addCreateTopicWidth">
          <p style="font-size:14px">{{addCreateTopic.note}}</p>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="创建时间:" class="addCreateTopicWidth">
          <p style="font-size:14px">{{addCreateTopic.createTime}}</p>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="创建人:" class="addCreateTopicWidth">
          <p style="font-size:14px">{{addCreateTopic.creatorName}}</p>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="状态:" class="addCreateTopicWidth">
          <p style="font-size:14px">{{addCreateTopic.status}}</p>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem class="addCreateTopicWidth">
          <Button type="primary" style="margin-left: 20px" @click="editClomnData">修改专栏</Button>
          <Button type="primary" style="margin-left: 20px" @click="chackSeeOne">{{addCreateTopic.statusVlaue}}专栏</Button>
          <Button style="width: 68px; margin-left: 20px" @click="quxiao">取消</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    </Col>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import OilPage from "../components/page/page.vue";
import {
  queryWebsite,
  queryChannel,
  queryModel,
  columnBaseInfo,
  info,
  columnBaseStatus
} from "./api/thematicManagement.js";
import { formData, formatStamp, formatTime } from "../../assets/js/common.js";
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
    return {
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
            message: "请输入专题名称",
            trigger: "change"
          }
        ]
      },
      addCreateTopic: {
        websiteId: "",
        websiteName: "",
        topicName: "",
        publishUrl: "",
        note: "",
        modelId: "",
        keyWord: "",
        channelId: "",
        columnName: "",
        columnModelName: "",
        lineNum: "",
        note: "",
        createTime: "",
        creatorName: "",
        status: "",
        statusVlaue: ""
      }
    };
  },
  created() {
    this.queryWebsiteList();
    this.queryModelList();
    this.initData();
    this.initDataOne();
  },
  methods: {
    goto() {
      window.reload();
    },
    backPre() {
      this.$router.go(-1);
    },
    chackSeeOne() {
      this.chackSee();
    },
    chackSee() {
      let _this = this;
      if (this.addCreateTopic.statusVlaue == "启用") {
        this.addCreateTopic.statusOne = 0;
        this.addCreateTopic.statusTwo = "禁用";
      }
      if (this.addCreateTopic.statusVlaue == "禁用") {
        this.addCreateTopic.statusOne = 1;
        this.addCreateTopic.statusTwo = "启用";
      }
      var config = {
        title: "提示信息",
        content: "您确定" + this.addCreateTopic.statusVlaue + "吗？",
        onOk: () => {
          let params = {
            id: Number(this.$route.query.id),
            status: this.addCreateTopic.statusOne
          };
          columnBaseStatus(params).then(res => {
            _this.$Message.success(
              "" + this.addCreateTopic.statusVlaue + "成功"
            );
            _this.addCreateTopic.statusVlaue = _this.addCreateTopic.statusTwo;
            // _this.$router.push({
            //   name: "seeTopic",
            //   query:{id:_this.$route.query.id}
            // });
            _this.initData();
            // window.reload();
          });
        },
        onCancel: () => {}
      };
      this.$Modal.confirm(config);
    },
    editClomnData() {
      this.$router.push({
        name: "editColumn",
        query: {
          topicid: this.$route.query.topic,
          id: this.$route.query.id
        }
      });
    },
    initData() {
      let params = {
        id: Number(this.$route.query.id)
      };
      columnBaseInfo(params).then(res => {
        console.log("res", res);
        this.addCreateTopic.columnName = res.response.columnName;
        this.addCreateTopic.columnModelName = res.response.columnModelName;
        this.addCreateTopic.lineNum = res.response.lineNum;
        this.addCreateTopic.note = res.response.note;
        this.addCreateTopic.createTime = formatTime(res.response.createTime);
        this.addCreateTopic.creatorName = res.response.creatorName;
        this.addCreateTopic.status = res.response.status;
        if (this.addCreateTopic.status == "禁用") {
          this.addCreateTopic.statusVlaue = "启用";
        }
        if (this.addCreateTopic.status == "启用") {
          this.addCreateTopic.statusVlaue = "禁用";
        }
      });
    },
    initDataOne() {
      let params = {
        id: Number(this.$route.query.topic)
      };
      info(params).then(res => {
        this.addCreateTopic.websiteName = res.response.topicName;
      });
    },
    quxiao() {
      this.$router.push({
        name: "columnList",
        query: {
          id: Number(this.$route.query.topic)
        }
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