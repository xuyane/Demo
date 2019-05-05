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
      <router-link to="/topicList" class="link-css"> 专题列表 </router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <a @click="backPre" class="link-css"> 专栏列表 </a>
      &nbsp;&nbsp;>>&nbsp;&nbsp; 
       <a @click="goto" class="link-css"> 创建专栏</a>
     
    </Row>
    <Col span="24" class-name="search-form">
    <Form ref="addCreateTopicRef" :model="addCreateTopic" :rules="addRules" :label-width="170" style="padding-bottom:80px">
      <Row>
        <Col span="24">
        <FormItem label="所属专题:" class="addCreateTopicWidth">
          <p style="font-size:14px">{{topicCreate}}</p>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="专栏名称:" prop="columnName" class="addCreateTopicWidth">
          <Input placeholder="请输入专栏名称" class="search-input" v-model="addCreateTopic.columnName"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="专栏模板:" prop="columnModelId" class="addCreateTopicWidth">
          <Select class="search-input" v-model="addCreateTopic.columnModelId">
            <Option v-for="item in modelIdList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="信息行数:" prop="lineNum" class="addCreateTopicWidth">
          <Input placeholder="请输入信息行数" class="search-input" v-model="addCreateTopic.lineNum"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="专栏描述:" class="addCreateTopicWidth" prop="note">
          <Input class="search-textarea" v-model="addCreateTopic.note" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}"
            placeholder="请输入专题描述"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem class="addCreateTopicWidth">
          <Button type="primary" @click="columnSumbit">确定</Button>
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
  info,
  columnBaseSave
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
        callback(new Error("请输入所属专题"));
      }
    };
    const validatecolumnName = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请输入专栏名称"));
      }
    };
    const validatecolumnModelId = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请选择专栏模板"));
      }
    };
    const validatelineNum = (rule, value, callback) => {
      let reg = /^[1-9]\d*$/;
      if (value) {
        if (!reg.test(value)) {
          callback(new Error("请正确的格式信息行数为正整数"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入信息行数"));
      }
    };
    return {
      topicCreate: "",
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
            message: "请输入所属专题",
            trigger: "change"
          }
        ],
        columnName: [
          {
            required: true,
            validator: validatecolumnName,
            message: "请输入专栏名称",
            trigger: "change"
          },
          {
            type: "string",
            max: 50,
            message: "专栏名称不能超过50个字符",
            trigger: "blur"
          }
        ],
        columnModelId: [
          {
            required: true,
            validator: validatecolumnModelId,
            message: "请选择专栏模板",
            trigger: "change"
          }
        ],
        lineNum: [
          {
            required: true,
            validator: validatelineNum,
            trigger: "change"
          }
        ],
        note: [
          {
            type: "string",
            max: 200,
            message: "专栏描述不能超过200个字符",
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
        columnName: "",
        columnModelId: "",
        lineNum: ""
      }
    };
  },
  created() {
    this.queryWebsiteList();
    this.queryModelList();
    this.initData();
  },
  methods: {
    goto() {
      window.reload();
    },
    backPre() {
      this.$router.push({
        name: "columnList",
        query: {
          id: this.$route.query.id
        }
      });
    },
    columnSumbit() {
      this.$refs.addCreateTopicRef.validate(valid => {
        if (valid) {
          let params = {
            columnName: this.addCreateTopic.columnName,
            columnModelId: this.addCreateTopic.columnModelId,
            lineNum: this.addCreateTopic.lineNum,
            note: this.addCreateTopic.note,
            topicId: Number(this.$route.query.id)
          };
          columnBaseSave(params).then(res => {
            this.$Message.success("新增成功");
            this.$router.push({
              name: "columnList",
              query: {
                id: Number(this.$route.query.id)
              }
            });
          });
        }
      });
    },
    initData() {
      let params = {
        id: this.$route.query.id
      };
      info(params).then(res => {
        console.log(res);
        this.topicCreate = res.response.topicName;
      });
    },
    quxiao() {
      this.$router.push({
        name: "columnList",
        query: {
          id: Number(this.$route.query.id)
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