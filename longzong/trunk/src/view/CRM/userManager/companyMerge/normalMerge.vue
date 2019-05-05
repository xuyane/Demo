<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;公司合并
      </Row>
    </Col>
    <tab-header :tab-index="2"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="用户类型:">
              <Select v-model="formItem.userType" class="form-select" placeholder="请选择用户类型">
                <Option v-for="item in userTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="业务员:">
              <!-- <Input v-model="formItem.admin" class="search-input" placeholder="请输入业务员"></Input> -->
              <associate-Search @query-list="getAdminInfo" :dataUrl="adminUrl" :parameterName='adminName' ref='refAdmin'></associate-Search>
            </FormItem>
          </Col>
          <!-- <Col span="7">
            <FormItem label="业务员电话:">
              <Input v-model="formItem.admin" class="search-input" placeholder="请输入业务员电话"></Input>
            </FormItem>
          </Col> -->

          <Col span="7">
            <FormItem label="公司名称:">
              <!-- <Input v-model="formItem.memberName" class="search-input" placeholder="请输入公司名称"></Input> -->
              <associate-Search ref='refMember' @query-list="getMemberInfo" :dataUrl="memberUrl" :parameterName='memberName'></associate-Search>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <!-- <Col span="7">
            <FormItem label="开票公司抬头:">
              <Input v-model="formItem.title" class="search-input" placeholder="请输入开票公司抬头"></Input>
            </FormItem>
          </Col> -->
          <Col span="7">
            <FormItem label="用户名:">
              <Input v-model="formItem.userNameLike" class="search-input" placeholder="请输入用户名"></Input>
            </FormItem>
          </Col>
          <Col span="17" class="text-right">
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
import { getOrdinaryMergeList } from '../../../components/axios/crm.js';
import associateSearch from "../../../components/associateSearch/getAssociateSearch.vue";
import dial from '@/assets/js/linkDial.js';
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      userTypes: [
        {
          value: "0",
          desc: "免费用户"
        },
        {
          value: "1",
          desc: "试用用户"
        },
        {
          value: "2",
          desc: "正式用户"
        },
      ],
      adminUrl: '/crm/common/query-adminList-by-name',
      adminName: 'adminName',
      memberUrl: '/crm/common/query-member-select-list',
      memberName: 'memberName',
      formItem: {
        pageNum: 1,
        pageSize: 10,
        showTab: 2
      },
      tableData: [],
      columns: [
        {
          key: 'memberNameCn',
          title: '公司名称',
          minWidth: 180
        },
        // {
        //   key: '',
        //   title: '开票公司抬头',
        //   minWidth: 120
        // },
        {
          key: 'userName',
          title: '用户名',
          minWidth: 100
        },
        {
          key: 'userType',
          title: '用户类型',
          minWidth: 100,
          render: (h, data) => {
            let a = "";
            switch (data.row.userType) {
              case 0:
                a = "免费用户";
                break;
              case 1:
                a = "试用用户";
                break;
              case 2:
                a = "正式用户";
                break;
            }
            return h("span", {}, a);
          }
        },
        {
          key: 'adminName',
          title: '业务员',
          minWidth: 120
        },
        {
          key: 'adminPhone',
          title: '业务员电话',
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.onDial(data.row.adminPhone);
                    }
                  }
                },
                data.row.adminPhone
              )
            ]);
          }
        },
        {
          key: '',
          title: '操作',
          minWidth: 80,
          render: (h, data) => {
            return h('span', {
              style: {
                cursor: 'pointer',
                color: '#0f4fba'
              },
              on: {
                click: () => {
                  this.merge(data.row.id)
                }
              }
            }, '合并')
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
    getAdminInfo(data) {
      if (data) {
        this.formItem.adminId = data.value;
      } else {
        this.formItem.adminId = "";
      }
    },
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
      getOrdinaryMergeList(formData(params)).then(resp => {
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
        pageSize: 10,
        showTab: 2
      };
      this.$refs.refAdmin.model = "";
      this.$refs.refMember.model = "";
    },
    merge(id) {
      console.log('id', id)
      this.$router.push({
        name: 'mergeDetail',
        query: {
          id
        }
      })
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({title: '呼叫成功：' + phone})
      });
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
