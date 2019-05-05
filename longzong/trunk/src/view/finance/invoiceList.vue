<style lang="less" scoped>
// @import './productOpening/productOpening.less';
</style>

<template>
  <Row class="product-opening-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;开票信息维护
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :model="form" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="会员名称:" >
              <!-- <Input v-model="form.member" class="search-input" placeholder="请输入会员名称"></Input> -->
              <Select v-model="form.member" filterable class="search-input" @on-query-change="getCustom">
                  <Option v-for="item in customList" :value="item.id" :key="item.id">{{ item.nameAndId }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="创建时间:">
              <DatePicker type="daterange" @on-change="dateChange" v-model="createTime" placeholder="选择时间"  placement="bottom-end" class="search-input" ></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="创建人:">
              <Input v-model="form.creatorName" class="search-input" placeholder="请输入创建人"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="开户行:">
              <Input v-model="form.payBank" class="search-input" placeholder="请输入开户行"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="纳税人识别号:">
              <Input v-model="form.payTaxNo" class="search-input" placeholder="请输入纳税人识别号"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="所在部门:">
              <select-department @data-list="getDepData" :emptyModel='form.deptIdList'></select-department>
              <!-- <Cascader :data="departmentList" v-model="form.deptIdList" class="search-input" placeholder="请输入所在部门"></Cascader> -->
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="24" class="text-right mar-b-20">
            <Button type="primary"  @click="search">查询</Button>
            <Button style="margin-left: 8px"  @click="handleReset()">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24" class="product-opening-table">
      <Row>
        <Col span="24">
          <Button type="primary" class="search-btn" @click="add">新增</Button>
        </Col>
        <Col span="24" class="mar-t-20">
          <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true"></Table>
          <oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
        </Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
import axios from 'axios';
// import https from '../components/axios/http.js';
import oilPage from '../components/page/page.vue';
import SelectDepartment from '../components/finance/selectDepartment.vue';
import { memberBasicInfo } from '../components/axios/finance.js';
import { formData, formatStamp } from '../../assets/js/common';
export default {
  name: 'blackList',
  components: {
    oilPage,
    SelectDepartment
  },
  data () {
    return {
      createTimeS: '',
      createTimeE: '',
      createTime: '',
      defaultForm:{
        "createTimeE": null,
            "createTimeS": null,
            "creatorName": "",
            "deptIdList": null,
            "member": "",
            "pageNum": 1,
            "pageSize": 10,
            "payBank": "",
            "payTaxNo": ""
      },
      form: {
            "createTimeE": null,
            "createTimeS": null,
            "creatorName": "",
            "deptIdList": null,
            "member": "",
            "pageNum": 1,
            "pageSize": 10,
            "payBank": "",
            "payTaxNo": ""
      },
      customList:[],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pageSizeOpts: [10,15,20,40,50,100],
      showSizer: true,
      columns: [
        {
          key: 'memberId',
          align: 'center',
          title: '会员ID',
          minWidth:100
        }, {
          key: 'member',
          align: 'center',
          title: '会员名称',
          minWidth:150
        }, {
          key: 'payTaxNo',
          align: 'center',
          title: '纳税人识别号',
          minWidth:160
        }, {
          key: 'payBank',
          align: 'center',
          title: '开户行',
          minWidth:180
        }, {
          key: 'invoiceAddressPhone',
          align: 'center',
          title: '地址、电话',
          minWidth:200
        }, {
          key: 'postName',
          align: 'center',
          title: '收件人',
          minWidth:100
        }, {
          key: 'postPhone',
          align: 'center',
          title: '收件人电话',
          minWidth:130
        }, {
          key: 'postAddress',
          align: 'center',
          title: '邮寄地址',
          minWidth:180
        }, {
          key: 'postCode',
          align: 'center',
          title: '邮编',
          minWidth:80
        }, {
          key: 'creatorName',
          align: 'center',
          title: '创建人',
          minWidth:90
        }, {
          key: 'deptName',
          align: 'center',
          title: '所在部门',
          minWidth:150
        }, {
          key: 'createTime',
          align: 'center',
          title: '创建时间',
          minWidth:150
        }, {
          title: '操作',
          align: 'center',
          minWidth: 120,
          fixed: 'right',
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginRight: '20px'
                },
                on: {
                  click: () => {
                    this.edit(data.row.id)
                  }
                }
              }, '编辑'),
              h('span', {
                style: {
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.delete(data.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: [],
      departmentList: [{
          value: 'shanghai',
          label: '上海研发中心',
          children: [
              {
                  value: 'gugong',
                  label: '平台研发'
              },
              {
                  value: 'tiantan',
                  label: '测试'
              },
              {
                  value: 'wangfujing',
                  label: '上海前端开发部'
              }
          ]
      }, {
          value: 'chanpin',
          label: '产品部',
      }, {
          value: 'nanchang',
          label: '南昌研发中心',
          children: [
              {
                  value: 'ncqd',
                  label: '南昌前端开发部'
              },
              {
                  value: 'ncjg',
                  label: '南昌架构部',
                  children: [
                    {
                      value: 'ncjg',
                      label: '南昌研发',
                    }
                  ]
              }
          ]
      }]
    }
  },
  created (){
    this.getList ();
  },
  methods: {
    //获取客户列表
    getCustom(st){
      var that=this;
      axios({
        url: "/finance/common/selectMemberByAdmin",
        method: 'get',
        params:{
          memberName:st ? st:''
        }
      }).then(function(res){
        if(res.data.status == 200){
            that.customList = res.data.response;
        };
        that.$Spin.hide();
      }).catch(err => {
        that.$Spin.hide();
      });
    },
    //获取list列表数据
    getList () {
      let that = this;
      this.form.pageNum = this.pageNum;
      this.form.pageSize = this.pageSize;
      this.$Spin.show();
      memberBasicInfo(that.form).then(res => {
          that.tableData = res.response.list ? res.response.list : []
          this.total = res.response.total ? res.response.total : 0
          that.$Spin.hide();
      })
    },
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getList()
    },
    // 监听创建时间
    dateChange (date) {
      this.form.createTimeS = formatStamp(date[0]) - 8 * 1000 * 60 * 60
      this.form.createTimeE = formatStamp(date[1]) + 16 * 1000 * 60 * 60 - 1000
    },
    search () {//查询按钮
      this.pageNum = 1;
      this.pageSize = 10;
      this.getList()
    // var that=this;
    //   axios({
    //     url: 'finance/memberinvoiceinfo/listPage',
    //     method: 'post',
    //     data:that.form
    //   }).then(function(res){
    //     if(res.status === 200){
    //       that.tableData = res.data.response.list
    //     };
    //     that.$Spin.hide();
    //   }).catch(err => {
    //     that.$Spin.hide();
    //   });
    },
    //获取所在部门
    getDepData (value,selectedData){
      if(selectedData.length > 0){
        this.form.deptIdList = selectedData;
      }else {
        this.form.deptIdList = null
      }
    },
    handleReset () {//清空查询条件
      this.pageNum = 1;
      this.pageSize = 10;
      this.form = JSON.parse(JSON.stringify(this.defaultForm));
      this.createTime = '';
    },
    //删除操作
    delete (data){
      var that=this;
      this.$Modal.confirm({
          title: "提示信息",
          content: "您确定删除？",
          onOk: () => {
            let FormDa = formData({id:data.id});
            //that.$Message.success(data.memberId + "你被删除了");
            axios({
              url: 'finance/memberinvoiceinfo/delete',
              method: 'post',
              data:FormDa
            }).then(function(res){
              if(res.status === 200){
                that.$Message.success("删除成功！");
                that.getList ();
              };
              that.$Spin.hide();
            }).catch(err => {
              that.$Spin.hide();
            });
            },
          onCancel: () => {

          }
      });
    },
    //修改操作
    edit (id){
      this.$router.push({
        name: 'addInvoice',
        query:{ id }
      })
    },

    add (){
      this.$router.push({
        name: 'addInvoice'
      })
    }
  }
}
</script>
