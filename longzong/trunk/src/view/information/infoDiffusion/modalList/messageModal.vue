<template lang="html">
  <div class="list">
    <Modal v-model="messageModalVisible" :title="typeWords.title" class-name="verModal">
      <div class="warp">
        <div class="unit_title">
          <span>信息单元</span>
        </div>
        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">信息单元编码1：</div>
            <div class="unit_s_right">{{unitCode}}</div>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">信息单元名称：</div>
            <div class="unit_s_right no-right-border">{{unitName}}</div>
          </div>
        </div>
      </div>
      <div class="unit">
        <div class="unit_title publishedList">
          <span>{{typeWords.listTitle}}</span>
        </div>
        <Form :model="form" :label-width="100" style='margin-top: 10px'>
          <Col>
          <Row type="flex" justify="space-between">
            <Col span="8">
            <FormItem label="发布内容:">
              <Input v-model="form.informationContent" class="search-input" :placeholder="typeWords.placeHolder"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="发布人:">
              <associate-Search @query-list="publishPersonFunction" class="search-input" :dataUrl="urlPublishPerson" ref="publishPersonRef"></associate-Search>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="发布时间:">
              <DatePicker v-model="form.publishTime" class="search-input" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择发布时间"
                @on-change="getPublishTime"></DatePicker>
            </FormItem>
            </Col>
            <Col span="24" class="text-right">
            <Button type="primary" @click="search">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
            </Col>
          </Row>
          </Col>
        </Form>
        <Table style="margin-top: 10px" :columns="tableColumns" :data="tableData"></Table>
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"></oil-page>
      </div>
      <div slot="footer">
        <i-button type="primary" @click="hideModal">返回</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import associateSearch from "../associateSearch.vue";
import OilPage from "../../../components/page/page.vue";
import {
  queryMyPublishList,
  basicModal
} from "../../unitmangement/api/infoDiffusion";
import { formData } from "../../../../assets/js/common.js";
export default {
  components: {
    OilPage,
    associateSearch
  },
  data() {
    return {
      type: '短信',
      messageModalVisible: false,
      urlPublishPerson: "/information/select/employee",
      pageSizeOpts: [5, 10, 20],
      showSizer: true,
      pageSize: 5,
      pageNum: 1,
      total: 0,
      selectForm: {
        informationContent: "",
        publisherId: "",
        inTimeS: null,
        inTimeE: null,
        publishTime: []
      },
      form: {
        informationContent: "",
        publisherId: "",
        inTimeS: null,
        inTimeE: null,
        publishTime: []
      },
      tableData: [],
      tableColumns: [
        {
          title: "发布内容",
          key: "content",
          ellipsis: true,
          render: (h, data) => {
            return h("span", {
              domProps: {
                innerHTML: data.row.content
              }
            });
          }
        },
        {
          title: "发布人",
          key: "publisherName"
        },
        {
          title: "所在部门",
          key: "departMentName"
        },
        {
          title: "发布时间",
          key: "publishTimeName"
        }
      ],
      rowList: {},
      unitCode: "",
      unitName: "",
      informationUnitId: ""
    };
  },
  computed: {
    typeWords() {
      return {
        title: `已发布${this.type}信息`,
        listTitle: `已发布${this.type}信息列表`,
        placeHolder: `请输入${this.type}内容`
      }
    }
  },
  methods: {
    getPublishTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      this.form.inTimeS = data1.setHours(0,0,0,0);
      this.form.inTimeE = data2.setHours(23,59,59,999);
    },
    publishPersonFunction(publishPersonData) {
      if (publishPersonData.data) {
        this.form.publisherId = publishPersonData.data.value;
      }
    },
    showModal() {
      this.messageModalVisible = true;
    },
    showMessageInfo(row, type) {
      this.type = type || '短信';
      this.informationUnitId = row.informationUnitId;
      this.showBasic(row.informationUnitId);
      this.showData();
    },
    showBasic(id) {
      var that = this;
      let params = {
        formationUnitId: id
      };
      basicModal(formData(params)).then(res => {
        that.unitCode = res.response.code;
        that.unitName = res.response.name;
      });
    },
    search() {
      this.pageNum = 1;
      this.showData();
    },
    showData(id) {
      var that = this;
      let params = {
        pageNum: that.pageNum,
        pageSize: that.pageSize,
        status: 2,
        informationUnitId: that.informationUnitId,
        content: this.form.informationContent,
        publisherId: that.form.publisherId,
        startTime: that.form.inTimeS,
        endTime: that.form.inTimeE,
        keyword: "",
        order: "",
        sort: "",
        title: ""
      };
      queryMyPublishList(params).then(res => {
        that.tableData = res.response.list;
        that.total = res.response.total;
      });
    },
    reset() {
      this.form = JSON.parse(JSON.stringify(this.selectForm));
      this.$refs.publishPersonRef.$refs.select.clearSingleSelect();
    },
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.showData();
    },
    hideModal() {
      this.messageModalVisible = false;
    }
  }
};
</script>

<style scoped>
.warp .unit_title span {
  height: 43px;
  width: 100%;
  padding-left: 10px;
  background: #ebf2fe;
  border: 1px solid #bbbbbb;
  display: block;
  color: #000000;
  font-size: 18px;
  line-height: 43px;
}

.unit_content {
  height: 59px;
  line-height: 59px;
  margin-bottom: 20px;
  border-left: 1px solid #bbbbbb;
  border-right: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
}

.unit_content .unit_content_left {
  height: 59px;
  float: left;
  width: 50%;
}

.unit_content .no_line {
  border-right: none;
}

.unit_content .unit_s_left,
.unit_content .unit_s_right {
  font-size: 14px;
  width: 38%;
  color: #000000;
  height: 58px;
  line-height: 59px;
  text-align: center;
  border-right: 1px solid #bbbbbb;
  float: left;
  background: #e9eaef;
}

.unit_content .unit_s_right {
  width: 62%;
}

.unit_content .no-right-border {
  border-right: 0;
}
</style>
