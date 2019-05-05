<style lang="less" scoped>
.mrb-10 {
  margin-bottom: 10px;
}
.font-14 {
  font-size: 14px;
}
.font-c-blue {
  color: #145edb;
}
</style>

<template>
    <Row class="my-saleList-out">
        <Col span="24">
        <Row class-name="current-position">
            当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;产业链收入统计&nbsp;&nbsp;>>&nbsp;&nbsp;收付利润统计
        </Row>
        </Col>
        <Col span="24" class="search-form">
        <Form ref="addForm" :label-width="100" class="my-account-conter">
            <Row>
                <Col span="8">
                <FormItem label="统计时间范围:">
                    <DatePicker v-model="dateRange" @on-change="dateChange" type="daterange" split-panels placeholder="选择统计时间范围" class="search-input"></DatePicker>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="部门:">
                    <Input v-model="deptName" class="search-input" readonly @on-focus="openModal" placeholder="请选择部门"></Input>
                    <Modal v-model="showDept" title="请选择部门" @on-cancel="cancel">
                        <div style="max-height: 300px;overflow-x: hidden;">
                            <Tree ref="tree" :data="deptIdList" show-checkbox></Tree>
                        </div>
                        <div slot="footer">
                            <Button type="primary" @click="ok">确定</Button>
                            <Button @click="cancel">取消</Button>
                        </div>
                    </Modal>
                </FormItem>
                </Col>
                <Col span="8" class="text-right mrb-10">
                <Button type="primary" @click="search">查询</Button>
                <Button style="margin-left:8px;" @click="reset">重置</Button>
                </Col>
            </Row>
        </Form>
        </Col>
        <Col span="24">
            <Row class-name="table-con">
                <Col span="24 mrb-10">
                    <Col span="12">
                        <Button type="primary" @click="totalExportExcle">导出</Button>
                    </Col>
                    <Col span="12" class="text-right font-14">
                        总收入：<span class="font-c-blue mar-r-10">{{totalDetail.totalIncome}}</span>
                        总成本: <span class="font-c-blue mar-r-10">{{totalDetail.totalCost}}</span>
                        总利润: <span class="font-c-blue">{{totalDetail.totalProfit}}</span>
                    </Col>
                </Col>
                <Col span="24">
                <Table class="TableCommon" :data="totalTableData" :columns="totalColumns" ref="dragTable" :loading="loading1" :stripe="true" :border="true"></Table>
                </Col>
            </Row>
        </Col>
    </Row>
</template>

<script>
import axios from 'axios'
import { formatThousandPrice, formData } from "../../../assets/js/common.js";
import { pfCommonTreeDeptTree,reportICAReceiptAndPaymentList, pfCommonTreeOrgTree} from "@/view/components/axios/report.js"
export default {
    name: "editExtractReport",
    components: {

    },
    data() {
        return {
            params: {
                deptIdList: [],
                endTime: '',
                startTime: ''
            },
            deptName: '',
            dateRange:[],
            showDept: false,
            deptIdList: [],
            loading1: false,
            totalTableData: [],
            totalColumns: [
                {
                    key: "industryChain",
                    title: "产业链",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        if(data.row.orgName == '合计'){
                            return h('b', {}, data.row.orgName)
                        }else{
                            return h('span', {}, data.row.industryChain)
                        }
                    }
                },
                {
                    key: "orgName",
                    title: "所属部门",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "income",
                    title: "收入（万元）",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "directCost",
                    title: "直接成本（万元）",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "indirectCost",
                    title: "间接成本（万元）",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "profit",
                    title: "收付实现制利润（万元）",
                    align: "center",
                    minWidth: 140
                }
            ],
            totalDetail:{
                totalIncome:0,
                totalCost:0,
                totalProfit:0
            }
        }
    },
    created() {
      this.getSelectList();
    },
    methods: {
        // 监听选择日期
        dateChange (date) {
            this.params.startTime = new Date(date[0]).getTime() - 8 * 1000 * 60 * 60 || ''
            this.params.endTime = new Date(date[1]).getTime() + 16 * 1000 * 60 * 60 - 1000 || ''
        },
        openModal() {
//            this.getSelectList();
          this.showDept = true;
        },
      _breedDigui(arr = []) {
        return arr.map(item => {
          if (item.children && item.children.length > 0) {
            return {
              title: item.label,
              value: item.id,
              code: item.value,
              children: this._breedDigui(item.children)
            };
          } else {
            return {
              title: item.label,
              value: item.id,
              code: item.value,
            };
          }
        });
      },
        getSelectList() {
          pfCommonTreeOrgTree({ type: 2 }).then(res => {
//            console.log(JSON.parse(res.response));
            this.deptIdList = this._breedDigui(JSON.parse(res.response));
          })
            /*if (this.deptName == '') {
                pfCommonTreeDeptTree().then(res => {
                  this.deptIdList = JSON.parse(res.response).map(item => {
                        return {
                            code: item.value,
                            value: item.id,
                            title: item.label,
                            children: item.children.filter(child => {
                              return (child.id === 2202 || child.id === 2203);
                            }).map(option => {
                                return {
                                    code: option.value,
                                    value: option.id,
                                    title: option.label,
                                    children: option.children.map(childItem => {
                                        return {
                                            code: childItem.value,
                                            value: childItem.id,
                                            title: childItem.label,
                                            children:childItem.children.map(triItem=>{
                                                return{
                                                     code: triItem.value,
                                                     value: triItem.id,
                                                     title: triItem.label,
                                                     children:triItem.children.map(fourItem=>{
                                                        return{
                                                            code: fourItem.value,
                                                            value: fourItem.id,
                                                            title: fourItem.label,
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    });
                  this.showDept = true;
                })
            }*/
        },
        search() {
            this.getSumList();
        },
        reset() {
            this.params = {
                deptIdList: [],
                endTime: '',
                startTime: ''
            }
            this.deptName = '';
            this.dateRange = [];
        },

        //列表
        getSumList() {
            this.loading1 = true;
            reportICAReceiptAndPaymentList(this.params).then(res => {
              this.loading1 = false;
                if (res.status == 200) {
                    let totalCost = 0,cost1=res.response.totalIndirectCost ? res.response.totalIndirectCost : 0,cost2=res.response.totaldirectCost ? res.response.totaldirectCost : 0;
                    totalCost = parseFloat(cost1) + parseFloat(cost2);
                    this.totalDetail={
                        totalIncome:res.response.totalIncome ? formatThousandPrice(res.response.totalIncome) : 0,
                        totalCost:formatThousandPrice(totalCost),
                        totalProfit:res.response.totalProfit ? formatThousandPrice(res.response.totalProfit) : 0
                    }
                    this.totalTableData = res.response.receiptAndPaymentItemList ? res.response.receiptAndPaymentItemList : [];
                    if(res.response.receiptAndPaymentItemList.length > 0){
                        // console.log('有数据');
                        this.totalTableData.push({
                            directCost: res.response.totaldirectCost ? formatThousandPrice(res.response.totaldirectCost) : 0,
                            income: res.response.totalIncome ? formatThousandPrice(res.response.totalIncome) : 0,
                            indirectCost: res.response.totalIndirectCost ? formatThousandPrice(res.response.totalIndirectCost) : 0,
                            industryChain: "",
                            orgName: "合计",
                            profit: res.response.totalProfit ? formatThousandPrice(res.response.totalProfit) : 0,
                        })
                    }else{
                        // console.log('无数据');
                        this.totalTableData = []
                    }

                } else {
                    this.$Message.warning(res.message);
                }
            })
        },
        initDateRange() {
            let currentDate = new Date();
            let nextMonth = currentDate.getMonth() + 1;
            let nextMonthFirstDay = new Date(currentDate.getFullYear(), nextMonth, 1);
            let currentMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            let currentMonthLastDay = new Date(nextMonthFirstDay - 1);
            this.dateRange = [currentMonthFirstDay, currentMonthLastDay];
            this.params.startTime = new Date(this.dateRange[0]).getTime();
            this.params.endTime = new Date(this.dateRange[1]).getTime();
        },
        //导出
        totalExportExcle() {
            if(this.totalTableData.length-1 <= 0){
                this.$Message.warning('无导出内容');
                return ;
            }else if(this.totalTableData.length > 10000){
                this.$Message.warning('数据内容大于10000条');
                return ;
            }else{
                let form_data = formData(this.params);
                    window.location.href = '/report/reportIndustryChainAmount/receiptAndPaymentListExport?' + form_data;
            }
            // axios({
            //     url: "/report/reportIndustryChainAmount/receiptAndPaymentListExport",
            //     method: "get",
            //     params: this.params
            // }).then(res => {
            //     if (res.data.status === "500" || res.data.status === "100053") {
            //         this.$Message.warning(res.data.message?res.data.message:'');
            //     } else {
            //         let form_data = formData(this.params);
            //         window.location.href = '/report/reportIndustryChainAmount/receiptAndPaymentListExport?' + form_data;
            //     }
            // })
        },
        cancel() {
            this.showDept = false;
        },
        ok() {
            this.showDept = false;
            let dataList = this.$refs.tree.getCheckedNodes();
            let deptLabel = [];
            let deptId = [];
            let deptCode = [];
            dataList.map(item => {
                deptLabel.push(item.title);
                deptId.push(item.value);
                deptCode.push(item.code);
            });
            this.deptName = deptLabel.join('/');
            this.params.deptIdList = deptId;
        },
    },
    mounted(){
        this.initDateRange();
        this.getSumList();
    }

}
</script>


