<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;公司合并记录
      </Row>
    </Col>
    <tab-header :tab-index="3"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="公司名称:">
              <!-- <Input v-model="formItem.memberName" class="search-input" placeholder="请输入公司名称"></Input> -->
              <associate-Search ref='refMember' @query-list="getMemberInfo" :dataUrl="memberUrl" :parameterName='memberName'></associate-Search>
            </FormItem>
          </Col>
          <!-- <Col span="7">
            <FormItem label="开票公司抬头:">
              <Input v-model="formItem.title" class="search-input" placeholder="请输入开票公司抬头"></Input>
            </FormItem>
          </Col> -->
          <Col span="7">
            <FormItem label="类型:">
              <Select v-model="formItem.mergeType" class="form-select" placeholder="请选择类型">
                <Option v-for="item in mergeTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary" @click="handleSubmit">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true">
        </Table>

        <oil-page
          :total="total"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
    </Col>
  </Row>
</template>
<script>
import TabHeader from './tabHeader';
import OilPage from '../../../components/page/page.vue';
import { formData } from "../../../../assets/js/common.js";
import { getMergeRecordList } from '../../../components/axios/crm.js';
import associateSearch from "../../../components/associateSearch/getAssociateSearch.vue";
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      mergeTypes: [
        {
          value: "0",
          desc: "普通合并"
        },
        {
          value: "1",
          desc: "更名"
        },
        {
          value: "2",
          desc: "自动合并"
        },
      ],
      memberUrl: '/crm/common/query-member-select-list',
      memberName: 'memberName',
      formItem: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      columns: [
        {
          key: 'beforeMemberName',
          title: '公司名称',
          minWidth: 120
        },
        {
          key: 'type',
          title: '类型',
          minWidth: 20,
          render: (h, data) => {
            let a = "";
            switch (data.row.type) {
              case 0:
                a = "普通合并";
                break;
              case 1:
                a = "更名";
                break;
              case 2:
                a = "自动合并";
                break;
            }

            return h("span", {}, a);
          }
        },
        {
          title: '内容',
          minWidth: 450,
          render: (h, data) => {
            var a = "原公司名称:"+data.row.beforeMemberName+", 原公司ID："+data.row.beforeMemberId+";  新公司名称:"+data.row.afterMemberName+", 新公司ID:"+data.row.afterMemberId;
            return h("span", {}, a);
          }
        },
        {
          title: '操作人',
          minWidth: 50,
          render: (h, data) => {
            var a = data.row.deptName+"-"+data.row.operatorName;
            return h("span", {}, a);
          }
        },
        {
          title: '操作',
          minWidth: 20,
          render: (h, data) => {
            return h('span', {
              style: {
                cursor: 'pointer',
                color: '#0f4fba'
              },
              on: {
                click: () => {
                  this.check(data)
                }
              }
            }, '查看')
          }
        },
      ]
    }
  },
  components: {
    TabHeader,
    OilPage,
    associateSearch
  },
  created() {
    this.getListPage(this.formItem);
  },
  methods: {
    getMemberInfo(data){
      if (data) {
        this.formItem.memberId = data.value;
      } else {
        this.formItem.memberId = "";
      }
    },
    getListPage(params) {
      let that = this;
      this.$Spin.show();
      getMergeRecordList(formData(params)).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200 && resp.response != null) {
          let data = resp.response.list;
          that.tableData = data;
          that.total = resp.response.total;
        }
      });
    },
    // 查询
    handleSubmit() {
      let data = JSON.parse(JSON.stringify(this.formItem));
      this.getListPage(data);
    },
    // 重置
    reset() {
      this.formItem = {
        pageNum: 1,
        pageSize: 10
      };
      this.$refs.refMember.model = "";
    },
    // 查看
    check(data) {
      this.$router.push({
        name: 'recordMergeDetail',
        query: {
          id: data.row.id,
          type: data.row.type
        }
      })
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.formItem.pageNum = page
      }
      if(pageSize) {
        this.formItem.pageSize = pageSize
      }
      this.getListPage(this.formItem);
    },
  }
}
</script>
