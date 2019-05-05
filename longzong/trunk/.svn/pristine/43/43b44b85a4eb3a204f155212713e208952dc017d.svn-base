<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;用户分配
      </Row>
    </Col>
    <tab-header :tab-index="3"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="80">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="公司名称:">
              <Select
                v-model="formItem.memberId"
                ref="input1"
                class="search-input"
                filterable
                remote
                :remote-method="remoteMethod1"
                @on-query-change="emptyQuery"
                :loading="loading">
                <Option v-for="(option, index) in options1" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <!-- <Col span="7">
            <FormItem label="关注产品:">
              <Input v-model="formItem.product" class="search-input" placeholder="请输入关注产品"></Input>
            </FormItem>
          </Col> -->
          <Col span="7">
            <FormItem label="注册时间:">
              <DatePicker
                v-model="time" 
                format="yyyy/MM/dd" 
                type="daterange"
                placeholder="请选择注册时间"
                class="search-input"></DatePicker>
            </FormItem>
          </Col>

          <Col span="7">
            <FormItem label="注册来源:">
              <Select v-model="formItem.regSource" class="form-select" placeholder="请选择注册来源">
                <Option v-for="item in customerSource" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="分配时间:">
              <DatePicker
                v-model="time2" 
                format="yyyy/MM/dd" 
                type="daterange"
                placeholder="请选择分配时间"
                class="search-input"></DatePicker>
              </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary" @click="findListPage">查询</Button>
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
import { formData, formatStamp, formatTime,formatType } from "../../../../assets/js/common.js"
import { 
  getUserResource,
  getHistoricalRecordsList,
  memberSelectList  } from '../../../components/axios/crm.js';
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
       options1:[],
      loading:false,
      customerSource: [],
      time: [],
      time2: [],
      formItem: {
        isUserAllot: 3,
        memberName: '',
        registerTime:'',
        regSource: '',
        allotTime: ''
      },
      selection: [],
      tableData: [],
      columns: [
        {
          key: 'memberName',
          title: '公司名称',
          minWidth: 120
          // render: (h, data) => {
          //   return h('span', {
          //     style: {
          //       color: '#0e50be',
          //       textDecoration: 'underline',
          //       cursor: 'pointer'
          //     }
          //   }, )
          // }
        },
        {
          key: 'userName',
          title: '用户',
          minWidth: 60
          // render: (h, data) => {
          //   return h('span', {
          //     style: {
          //       color: '#0e50be',
          //       textDecoration: 'underline',
          //       cursor: 'pointer'
          //     }
          //   }, )
          // }
        },
        {
          key: 'adminName',
          title: '业务员',
          minWidth: 120
        },
        {
          key: 'customerName',
          title: '客服',
          minWidth: 60
        },
        // {
        //   key: '',
        //   title: '关注产品',
        //   minWidth: 80
        // },
        {
          key: 'registerTime',
          title: '注册时间',
          minWidth: 120
        },
        {
          key: '',
          title: '分配时间',
          minWidth: 120,
          render: (h, data) => {
            return h("span", {}, data.row.distributionTime === null ? '' : formatTime(data.row.distributionTime));
          }
        },
        // {
        //   key: 'browseRecords',
        //   title: '浏览记录',
        //   minWidth: 100
        // },
        {
          key: 'regSource',
          title: '用户来源',
          minWidth: 80,
          render: (h, data) => {
            var text = '';
            this.customerSource.map(item=>{
              if(data.row.regSource==item.value){
                text=item.desc
              }
            })
            return h("span", {}, text);
          }
        }
      ]
    }
  },
  components: {
    TabHeader,
    OilPage
  },
  created () {
    this.getUserResource();
    this.getListPage();
  },
  methods: {
    // 清空公司
    emptyQuery(query){
      if(query == ''){ 
        this.formItem.memberName = ''
        return
      }
    },
    // 获取公司名称下拉搜索
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          memberName: query
        }
        this.formItem.memberName=query;
         setTimeout(() => {
          this.loading = false;
          memberSelectList(params).then(res => {
            this.options1 = res.response;
          });
        }, 200);
      } else {
        this.options1 = []
      }
    },
      findListPage(){
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage();
    },
    // 获取列表数据
    getListPage() {
      this.$Spin.show();
      let params = {
        isUserAllot: this.formItem.isUserAllot,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        memberId: this.formItem.memberId || '',
        memberName:this.formItem.memberName||'',
        registerTimeStart: this.time[0] ? formatTime(this.time[0]) : '',
        registerTimeEnd: this.time[1] ? formatTime(this.time[1]) : '' ,
        allotTimeStart: this.time2[0] ? formatTime(this.time2[0]) : '' ,
        allotTimeEnd: this.time2[1] ? formatTime(this.time2[1]) : '' ,
        regSource: formatType(this.formItem.regSource) 
      }
      getHistoricalRecordsList(formData(params)).then(res => {
        // console.log(res)
        this.$Spin.hide();
        this.tableData = res.response.list;
        this.total = res.response.total;
      });
    },
    // 获取用户来源
    getUserResource() {
      getUserResource().then(res => {
        this.customerSource = res.response
      })
    },
    // 重置
    reset() {
      this.$refs.input1.query = ''
      this.formItem = {
        isUserAllot: 3,
        memberName: '',
        regSource: '',
        memberId:''
      };
      this.time = [];
      this.time2 = [];
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getListPage();
    },
  }
}
</script>