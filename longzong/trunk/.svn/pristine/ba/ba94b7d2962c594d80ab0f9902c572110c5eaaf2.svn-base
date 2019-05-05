<template>
  <div class="daily-account-detail">
    <span class="bread-crumb">当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;到账统计&nbsp;&nbsp;>>每日账务&nbsp;&nbsp;>>每日账务流水</span>
    <Card dis-hover class="f_card">
      <span slot="title">账务搜索</span>
      <div class="form_wrap">
        <Form ref="account_form" :model="formValue" :label-width="110" inline>
          <FormItem label="时间：" class="form_item">
            <DatePicker :editable="editable" :clearable="editable" type="daterange" placeholder="请选择" v-model="dateArr" class='item_control'></DatePicker>
          </FormItem>
          <FormItem label="账号：" class="form_item" prop="accountNo">
            <i-Input class='item_control' v-model="formValue.accountNo" clearable></i-Input>
          </FormItem>
          <FormItem label="来源（户名）：" class="form_item" prop="transferFrom" style="margin-left: 45px;">
            <i-Input class='item_control' v-model="formValue.transferFrom" clearable></i-Input>
          </FormItem>
          <FormItem style="width: 100%;text-align: right;">
            <Button type="primary" @click="onSearch">搜索</Button>
            <Button @click="onReset">重置</Button>
          </FormItem>
        </Form>
      </div>
    </Card>


    <Card :bordered="false" dis-hover>
      <span slot="title">账务流水列表</span>
      <div class="table">
        <Table :columns="columns" :data="tableData" :loading="loading">
          <div class="page" slot="footer">
            <Page :page-size="formValue.pageSize" :current="formValue.pageNum" :total="total" show-elevator show-total show-sizer @on-change="onPageChange" @on-page-size-change="onPageSizeChange" />
          </div>
        </Table>
      </div>
    </Card>
  </div>
</template>
<script>
  import { efaccounttransferDetail } from "@/view/components/axios/report.js"
  export default {
    name: 'dailyAccountDetail',
    data() {
      return{
        editable: false,
        loading: false,
        dateArr: [],
        tableData: [],
        total: 0,
        formValue: {
          accountNo: '',
          startTime: '',
          endTime: '',
          transferFrom: '',
          pageNum: 1,
          pageSize: 10
        },
        columns: [{
          key: "accountTypeDesc",
          align: "center",
          title: "账户类型",
          minWidth: 80
        }, {
          key: "accountNo",
          align: "center",
          title: "账号",
          minWidth: 80
        }, {
          key: "transferFrom",
          align: "center",
          title: "来源(户名)",
          minWidth: 180
        }, {
          key: "totalAmount",
          align: "center",
          title: "到账（退款）金额",
          minWidth: 180
        }, {
          key: "transferTimeDesc",
          align: "center",
          title: "时间",
          minWidth: 200
        }]
      }
    },
    created() {
      this.dateArr = this.initDateArr;
      this.loading = true;
      this._getList();
    },
    computed: {
      initDateArr() {
        const queryTime = JSON.parse(this.$route.query.times);
        return [new Date(queryTime.startTime), new Date(queryTime.endTime)];
      }
    },
    methods: {
      onSearch() {
        this.loading = true;
        this.formValue.pageNum = 1;
        this._getList();
      },
      onReset() {
        this.$refs['account_form'].resetFields();
        this.dateArr = this.initDateArr;
      /*  this.formValue.startTime = +this.dateArr[0];
        this.formValue.endTime = this.dateArr[1].setHours(23, 59, 59, 999);*/
      },

      onPageSizeChange(pageSize){
        this.formValue.pageNum = 1;
        this.formValue.pageSize = pageSize;
        this.loading = true;
        this._getList();
      },
      onPageChange(page){
        this.formValue.pageNum = page;
        this.loading = true;
        this._getList();
      },

      _getList() {
        if (!this.dateArr[0] || !this.dateArr[1]) {
          this.formValue.startTime = this.formValue.endTime = '';
        }else {
          this.formValue.startTime = +this.dateArr[0];
          this.formValue.endTime = this.dateArr[1].setHours(23, 59, 59, 999);
        }

        efaccounttransferDetail(this.formValue).then(res => {
          this.tableData = res.response.list;
          this.total = res.response.total;
          this.loading = false;
        });
      }
    }
  }
</script>
<style scoped lang="less">
  .daily-account-detail{
    .bread-crumb{
      font-size: 14px;
      color: #000;
    }

    .f_card{
      margin: 20px 0;
    }

    .form_wrap {
      .form_item {
        width: 28%;
        .item_control{
          width: 100%;
        }
      }
    }

    .page {
      margin: 10px 0;
      text-align: right;
      padding-right: 18px;
    }
  }
</style>
