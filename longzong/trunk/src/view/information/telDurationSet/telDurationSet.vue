<style lang="less" scoped>
@import "./tel.less";
/*
我的电话记录
*/
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：
      <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <router-link to="/telDurationSet" class="link-css">  电话时长设置</router-link>
    </Row>
    </Col>
    <Col span="24">
    <Row :gutter="24">
      <Col span="4">
      <div class="plant-title">
        <p>人员信息列表</p>
      </div>
      <Row class="plant-content">
        <Tree :data="treeData" :load-data="findSon" @on-select-change='findlist'></Tree>
      </Row>
      </Col>
      <Col span="20" class="background-fff padding-top20">
      <Form :model="form" :label-width="80">
        <Row type="flex" justify="space-between">
          <Col span="6">
          <FormItem label="姓名:" :input-width="120">
            <Input v-model="form.name" placeholder="请输入你的姓名" class="search-input"></Input>
          </FormItem>
          </Col>
          <Col span="10" class="text-right">
          <Button type="primary" icon="ios-search" @click="search">查询</Button>
          <Button style="margin-left: 8px" icon="ios-refresh" @click="handleReset">重置</Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Table class="tableCommon" :data="dataTable" :columns="columns" ref="dragTable" :stripe="true" :border="true"></Table>
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
      </Row>
      </Col>
    </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import {
  departmentTree,
  departmentList,
  departmentEdit
} from "../unitmangement/api/telDurationSet.js";
import { formData } from "../../../assets/js/common.js";

export default {
  name: "telDurationSet",
  components: {
    oilPage
  },
  data() {
    return {
      treeData: [],
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      total: 0,
      pageNum: 1,
      form: {},
      columns: [
        {
          title: "序号",
          key: "id",
          minWidth: 100,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          minWidth: 150,
          align: "center"
        },
        {
          title: "性别",
          align: "center",
          minWidth: 50,
          key: "sex",
          render: (h, data) => {
            let label =
              data.row.sex === 0 ? "女" : data.row.sex === 1 ? "男" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
          }
        },
        {
          title: "联系电话",
          align: "center",
          minWidth: 150,
          key: "mobile"
        },
        {
          title: "所在部门",
          align: "center",
          minWidth: 150,
          key: "depatmentName"
        },
        {
          title: "职位",
          minWidth: 150,
          align: "center",
          key: "rankName"
        },
        {
          title: "通话时长(分钟)",
          align: "center",
          minWidth: 100,
          key: "callTimeQuota",
          render: (h, data) => {
            return h("div", [
              h(
                "Input",
                {
                  props: {
                    value: data.row.callTimeQuota,
                    number: true
                  },
                  on: {
                    "on-blur": vals => {
                      console.log("value" , vals);
                      if (vals.target.value) {
                         this.dataTable[data.index].callTimeQuota = vals.target.value
                        this.editCallLength(this.dataTable[data.index],data.index);
                       
                      }
                    },
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      dataTable: [],
      selectCondition: {
        treeCode: "",
        treeName: "",
        order: "asc",
        pageNum: 1,
        pageSize: 10,
        parentCode: "",
        parentId: "",
        sort: "",
        status: ""
      }
    };
  },
  created() {
    this.initTree();
    this.getlist();
  },
  methods: {
    //点击查询按钮
    search() {
      let that = this;
      that.selectCondition.name = that.form.name;
      this.selectCondition.pageNum = 1;
      this.selectCondition.pageSize = 10;
      that.pageNum = 1;
      that.pageSize = 10;
      that.getlist(that.selectCondition);
    },
    //重置时长列表
    handleReset() {
      this.form.name = "";
    },
    //编辑时长
    editCallLength(data,index) {
      let id = "";
     
      let that = this;
      var params = {
        id: data.phoneQuotaID,
        personId: data.id,
        callTimeQuota:
          data.callTimeQuota == null ? 0 : data.callTimeQuota
      };
      departmentEdit(params).then(res => {
        this.$Message.success("修改成功");
          this.dataTable[index].phoneQuotaID = res.response.id;
      });
    },
    //获取分页数据
    pageChange(page, pageSize) {
      if (page) {
        this.selectCondition.pageNum = page;
        this.pageNum = page;
      }
      if (pageSize) {
        this.selectCondition.pageSize = pageSize;
        this.pageSize = pageSize;
      }
      this.getlist(this.selectCondition);
    },

    append(data) {
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true
      });
      this.$set(data, "children", children);
    },
    //获取列表数据
    getlist() {
      let that = this;
      var params = {
        pageSize: that.pageSize,
        pageNum: that.pageNum,
        name: that.form.name == undefined ? "" : that.form.name,
        job: 1,
        departmentId:
          that.selectCondition.id == undefined ? "" : that.selectCondition.id
      };
      departmentList(formData(params)).then(res => {
        this.dataTable = res.response.list;
        this.total = res.response.total;
      });
    },
    //通过点击树的数据获取相应的表格
    findlist(data) {
      this.selectCondition = data[0];
      //data[0].selected = !data[0].selected;
      if(this.selectCondition.isClick){
        this.getlist();
      }
      
    },
    //初始化树的数据
    initTree() {
      let that = this;
      var params = {
        code: ""
      };
      departmentTree(formData(params)).then(res => {
        that.treeData = res.response;
        // let resultdata = res.response;
        // for (var i = 0; i < resultdata.length; i++) {
        //   resultdata[i].title = res.response[i].name;
        //   resultdata[i].id = res.response[i].id;
        //   if (resultdata[i].isLeaf == 0) {
        //     resultdata[i].loading = false;
        //     resultdata[i].children = [];
        //   }
        // }
        // that.treeData = resultdata;
        // console.log("treeData", that.treeData);
      });
    },
    //获取树的数据
    findSon(item, callback) {
      var that = this;
      let params = {
        code: item.code
      };
      departmentTree(formData(params)).then(res => {
        let resultdata = res.response;
        for (var i = 0; i < resultdata.length; i++) {
          resultdata[i].title = res.response[i].name;
          resultdata[i].id = res.response[i].id;
          if (resultdata[i].isLeaf == 0) {
            resultdata[i].loading = false;
            resultdata[i].children = [];
          }
        }

        callback(resultdata);
      });
    }
  }
};
</script>
