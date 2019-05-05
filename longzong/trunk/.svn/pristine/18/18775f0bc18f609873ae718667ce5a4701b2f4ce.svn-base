<template>
  <Row class="phone">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;员工查询
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form ref="addForm"  :label-width="70">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="员工ID:">
              <Input v-model="formData.userId" class="search-input" placeholder="请输入员工ID"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="姓名:">
              <Input v-model="formData.userName" class="search-input" placeholder="请输入姓名"></Input>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary"  @click="query">查询</Button>
            <Button style="margin-left: 8px"  @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <Table :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
          <div class="page" slot="footer">
            <Page
                        :total="total"
                        show-elevator show-total
                        :page-size="formData.pageSize"
                        :page-size-opts="pageSizeOpts"
                        @on-change="changePageNum"
                        @on-page-size-change="changePageSize" :show-sizer="showSizer"/>
                    </div>
          </div>
        </Table>
      </Row>
    </Col>
  </Row>
</template>

<script>
import axios from 'axios'
import { statusZero } from '../../components/axios/workflow.js'
export default {
  name: 'userInfoQuery',
  data () {
    return {
      formData: {
        pageNum: 1,
        pageSize: 10,
        userId:'', // 员工ID
        userName:'' // 姓名
      },
      loading: true,
      showModal: false,
      total: 0,
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      columns: [{
        key: 'id',
        align: 'center',
        title: 'ID',
        width: 100
      }, {
        key: 'name',
        align: 'center',
        title: '姓名'
      }, {
        key: 'mobile',
        align: 'center',
        title: '手机号'
      }, {
        key: 'depart',
        align: 'center',
        title: '部门'
      }, {
        key: 'username',
        align: 'center',
        title: '登录名'
      }, {
        key: 'departCode',
        align: 'center',
        title: '部门编码'
      }],
      tableData: []
    }
  },
  methods: {
    query () {
      let  _this = this
      _this.$Spin.show();
      axios({
        url:'/mysteel/workflow/user/list',
        method: 'get',
        params: this.formData
      }).then(function(resp) {
        statusZero(resp.data.status)
        _this.tableData = resp.data.list
        _this.total = resp.data.total
        _this.$Spin.hide();
      }).catch(function(err) {
        _this.$Message.warning(err.message)
      })
    },
    reset () {
      this.formData.userId = ''
      this.formData.userName = ''
      this.formData.pageNum = 1
      this.formData.pageSize = 10
    },
    changePageNum(current) {
      this.formData.pageNum = current;
      this.query();
    },
    // 监听修改显示条数
    changePageSize(size) {
      this.formData.pageSize = size;
      this.query();
   }
  },
  mounted () {
    this.query()
  }
}
</script>
<style lang="less" scoped>
.page {
    margin: 10px 0;
    text-align: right;
   padding-right: 18px;
}
</style>