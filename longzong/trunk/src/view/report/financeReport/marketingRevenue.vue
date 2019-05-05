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
.tabs-style {
    background: #fff;
    padding: 16px;
    margin-top:-16px;
    border:1px solid #ddd;
    border-top:0;
    min-height:320px;
}
.marketingRevenue-table{border-top:1px solid #ddd;border-left:1px solid #ddd;}
.marketingRevenue-table td{padding:0!important;height:auto!important;line-height:30px;}
.marketingRevenue-table thead th{padding:3px 5px;}
.marketingRevenue-table tbody td div{padding:3px 5px;height:36px;border-bottom:1px solid #ddd;white-space: nowrap;}
.marketingRevenue-table tbody td div:last-child{border-bottom:0;}
</style>

<template>
    <Row class="my-saleList-out">
        <Col span="24">
        <Row class-name="current-position">
            当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;营销收入统计
        </Row>
        </Col>
        <Col span="24">
        <Tabs type="card" @on-click="changeTab">
            <TabPane label="年统计">
                <div class="tabs-style">
                <Form ref="addForm" :label-width="100" class="my-account-conter">
                    <Row>
                        <Col span="8">
                        <FormItem label="统计日期:">
                            <DatePicker :clearable="clearable" v-model="date1" @on-change="dateChange" type="date" split-panels class="search-input"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="8" class="text-right mrb-10">
                        <Button type="primary" @click="search">查询</Button>
                        <Button style="margin-left:8px;" @click="reset">重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col span="24 mrb-10">
                        <Col span="12">
                            <Button type="primary" @click="totalExportExcle">年任务导出</Button>
                        </Col>
                        <Col span="12" class="text-right font-14">
                            统计周期： <span class="font-c-blue">{{countDate}}</span>
                        </Col>
                    </Col>
                    <Col span="24">
                    <table width="100%" class="ivu-table marketingRevenue-table" cellspacing="0">
                        <thead>
                            <tr>
                                <th rowspan="2">部门</th>
                                <th rowspan="2">经理</th>
                                <th rowspan="2">团队</th>
                                <th rowspan="2">主管</th>
                                <!-- <th rowspan="2">人数</th> -->
                                <th colspan="3">本年任务（元）</th>
                                <th colspan="4">本年收入（元）</th>
                                <th rowspan="2">本年完成率</th>
                            </tr>
                            <tr>
                                <th>新入</th>
                                <th>续入</th>
                                <th>合计</th>
                                <th>新入</th>
                                <th>续入</th>
                                <th>会议</th>
                                <th>合计</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in totalTableData1" :key="index">
                                <td><div>{{item.deptName}}</div></td>
                                <td><div>{{item.leaderName}}</div></td>
                                <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.teamName}}</div>
                                    <div></div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.leaderName}}</div>
                                    <div><b>小计</b></div>
                                </td>
                                <!-- <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.peopleNumber}}</div>
                                    <div>{{item.yearStatisticsItemVO.peopleNumber}}</div>
                                </td> -->
                                <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.newTargetAmount}}</div>
                                    <div>{{item.yearStatisticsItemVO.newTargetAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.continuedTargetAmount}}</div>
                                    <div>{{item.yearStatisticsItemVO.continuedTargetAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.totalTargetAmount}}</div>
                                    <div>{{item.yearStatisticsItemVO.totalTargetAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.newEntryAmount}}</div>
                                    <div>{{item.yearStatisticsItemVO.newEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.continuedEntryAmount}}</div>
                                    <div>{{item.yearStatisticsItemVO.continuedEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.confEntryAmount}}</div>
                                    <div>{{item.yearStatisticsItemVO.confEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.totalEntryAmount}}</div>
                                    <div>{{item.yearStatisticsItemVO.totalEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item.yearStatisticsItemVOList" :key="index1">{{item1.annualCompletionRate ? (item1.annualCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div>
                                    <div>{{item.yearStatisticsItemVO.annualCompletionRate ? (item.yearStatisticsItemVO.annualCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4"><div><b>合计</b></div></td>
                                <!--<td><div><b>{{yearStatisticsItemVO.peopleNumber}}</b></div></td>-->
                                <td><div><b>{{yearStatisticsItemVO.newTargetAmount}}</b></div></td>
                                <td><div><b>{{yearStatisticsItemVO.continuedTargetAmount}}</b></div></td>
                                <td><div><b>{{yearStatisticsItemVO.totalTargetAmount}}</b></div></td>
                                <td><div><b>{{yearStatisticsItemVO.newEntryAmount}}</b></div></td>
                                <td><div><b>{{yearStatisticsItemVO.continuedEntryAmount}}</b></div></td>
                                <td><div><b>{{yearStatisticsItemVO.confEntryAmount}}</b></div></td>
                                <td><div><b>{{yearStatisticsItemVO.totalEntryAmount}}</b></div></td>
                                <td><div><b>{{yearStatisticsItemVO.annualCompletionRate ? (yearStatisticsItemVO.annualCompletionRate*100).toFixed(2)+'%':"0.00%"}}</b></div></td>
                            </tr>
                        </tbody>
                    </table>
                    <Spin size="large" fix v-if="loading1"></Spin>
                    </Col>
                </Row>
                </div>
            </TabPane>
            <TabPane label="月统计">
                <div class="tabs-style">
                <Form ref="addForm" :label-width="100" class="my-account-conter">
                    <Row>
                        <Col span="8">
                        <FormItem label="统计时间:">
                            <DatePicker :clearable="clearable" v-model="date2" @on-change="dateChange2" type="month" placeholder="Select month" class="search-input"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="8" class="text-right mrb-10">
                        <Button type="primary" @click="search2">查询</Button>
                        <Button style="margin-left:8px;" @click="reset2">重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col span="24 mrb-10">
                        <Col span="12">
                            <Button type="primary" @click="totalExportExcle2">导出</Button>
                        </Col>
                    </Col>
                    <Col span="24">
                    <table width="100%" class="ivu-table marketingRevenue-table" cellspacing="0">
                        <thead>
                            <tr>
                                <th rowspan="2">部门</th>
                                <th rowspan="2">部门负责人</th>
                                <th rowspan="2">营销团队</th>
                                <th rowspan="2">团队负责人</th>
                                <th rowspan="2">人数</th>
                                <th rowspan="2">业务人员</th>
                                <th colspan="8">{{nowMonth}}月收入</th>
                            </tr>
                            <tr>
                                <th>新入</th>
                                <th>续入</th>
                                <th>会议</th>
                                <th>合计</th>
                                <th>新入任务</th>
                                <th>续入任务</th>
                                <th>新入完成率</th>
                                <th>续入完成率</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item,index) in totalTableData2" :key="index">
                            <tr v-if="item.leaderMonthStatisticsItemVO">
                                <td :rowspan="item.teamMonthStatisticsItemVOList.length + 2"><div>{{item.deptName}}</div></td>
                                <td :rowspan="item.teamMonthStatisticsItemVOList.length + 2"><div>{{item.leaderName}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.teamName}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.leaderName}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.peopleNumber}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.adminName}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.newEntryAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.continuedEntryAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.confEntryAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.totalEntryAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.newTargetAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.continuedTargetAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.newCompletionRate ? (item.leaderMonthStatisticsItemVO.newCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.continuedCompletionRate ? (item.leaderMonthStatisticsItemVO.continuedCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div></td>
                            </tr>
                            <tr v-for="(item2,index2) in item.teamMonthStatisticsItemVOList" :key="index2">
                                <td v-if="index2==0 && !item.leaderMonthStatisticsItemVO" :rowspan="item.teamMonthStatisticsItemVOList.length + 1"><div>{{item.deptName}}</div></td>
                                <td v-if="index2==0 && !item.leaderMonthStatisticsItemVO" :rowspan="item.teamMonthStatisticsItemVOList.length + 1"><div>{{item.leaderName}}</div></td>
                                <td>
                                    <div>{{item2.teamName}}</div>
                                </td>
                                <td>
                                    <div>{{item2.leaderName}}</div>
                                </td>
                                <td>
                                    <div>{{item2.peopleNumber}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.adminName}}</div>
                                    <div><b>小计</b></div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.newEntryAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.newEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.continuedEntryAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.continuedEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.confEntryAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.confEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.totalEntryAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.totalEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.newTargetAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.newTargetAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.continuedTargetAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.continuedTargetAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.newCompletionRate ? (item1.newCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.newCompletionRate ? (item2.teamStatisticsItemTotalVO.newCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.continuedCompletionRate ? (item1.continuedCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.continuedCompletionRate ? (item2.teamStatisticsItemTotalVO.continuedCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div>
                                </td>
                            </tr>
                            <tr v-if="item.monthStatisticsItemTotalVO">
                                <td colspan="2"><b>合计</b></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.peopleNumber}}</div></td>
                                <td><div>-</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.newEntryAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.continuedEntryAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.confEntryAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.totalEntryAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.newTargetAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.continuedTargetAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.newCompletionRate ? (item.monthStatisticsItemTotalVO.newCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.continuedCompletionRate ? (item.monthStatisticsItemTotalVO.continuedCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div></td>
                            </tr>
                            <tr v-else>
                                <td colspan="2"><b>合计</b></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr v-if="monthTotal.marketingMonthStatisticsTotalVO">
                                <td colspan="4"><div><b>营销团队合计</b></div></td>
                                <td><div><b>{{monthTotal.marketingMonthStatisticsTotalVO.peopleNumber}}</b></div></td>
                                <td><div>-</div></td>
                                <td><div><b>{{monthTotal.marketingMonthStatisticsTotalVO.newEntryAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.marketingMonthStatisticsTotalVO.continuedEntryAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.marketingMonthStatisticsTotalVO.confEntryAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.marketingMonthStatisticsTotalVO.totalEntryAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.marketingMonthStatisticsTotalVO.newTargetAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.marketingMonthStatisticsTotalVO.continuedTargetAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.marketingMonthStatisticsTotalVO.newCompletionRate ? (monthTotal.marketingMonthStatisticsTotalVO.newCompletionRate*100).toFixed(2)+'%':"0.00%"}}</b></div></td>
                                <td><div><b>{{monthTotal.marketingMonthStatisticsTotalVO.continuedCompletionRate ? (monthTotal.marketingMonthStatisticsTotalVO.continuedCompletionRate*100).toFixed(2)+'%':"0.00%"}}</b></div></td>
                            </tr>
                            <tr v-if="monthTotal.noMarketingMonthStatisticsTotalVO">
                                <td colspan="4"><div>其他非营销部门到账</div></td>
                                <td><div>{{monthTotal.noMarketingMonthStatisticsTotalVO.peopleNumber}}</div></td>
                                <td><div>-</div></td>
                                <td><div>{{monthTotal.noMarketingMonthStatisticsTotalVO.newEntryAmount}}</div></td>
                                <td><div>{{monthTotal.noMarketingMonthStatisticsTotalVO.continuedEntryAmount}}</div></td>
                                <td><div>{{monthTotal.noMarketingMonthStatisticsTotalVO.confEntryAmount}}</div></td>
                                <td><div>{{monthTotal.noMarketingMonthStatisticsTotalVO.totalEntryAmount}}</div></td>
                                <td><div>{{monthTotal.noMarketingMonthStatisticsTotalVO.newTargetAmount}}</div></td>
                                <td><div>{{monthTotal.noMarketingMonthStatisticsTotalVO.continuedTargetAmount}}</div></td>
                                <td><div>{{monthTotal.noMarketingMonthStatisticsTotalVO.newCompletionRate ? (monthTotal.noMarketingMonthStatisticsTotalVO.newCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div></td>
                                <td><div>{{monthTotal.noMarketingMonthStatisticsTotalVO.continuedCompletionRate ? (monthTotal.noMarketingMonthStatisticsTotalVO.continuedCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div></td>
                            </tr>
                            <tr v-if="monthTotal.notRecogniseMonthStatisticsTotalVO">
                                <td colspan="4"><div>未认账收入</div></td>
                                <td><div>{{monthTotal.notRecogniseMonthStatisticsTotalVO.peopleNumber}}</div></td>
                                <td><div>-</div></td>
                                <td><div>{{monthTotal.notRecogniseMonthStatisticsTotalVO.newEntryAmount}}</div></td>
                                <td><div>{{monthTotal.notRecogniseMonthStatisticsTotalVO.continuedEntryAmount}}</div></td>
                                <td><div>{{monthTotal.notRecogniseMonthStatisticsTotalVO.confEntryAmount}}</div></td>
                                <td><div>{{monthTotal.notRecogniseMonthStatisticsTotalVO.totalEntryAmount}}</div></td>
                                <td><div>{{monthTotal.notRecogniseMonthStatisticsTotalVO.newTargetAmount}}</div></td>
                                <td><div>{{monthTotal.notRecogniseMonthStatisticsTotalVO.continuedTargetAmount}}</div></td>
                                <td><div>{{monthTotal.notRecogniseMonthStatisticsTotalVO.newCompletionRate ? (monthTotal.notRecogniseMonthStatisticsTotalVO.newCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div></td>
                                <td><div>{{monthTotal.notRecogniseMonthStatisticsTotalVO.continuedCompletionRate ? (monthTotal.notRecogniseMonthStatisticsTotalVO.continuedCompletionRate*100).toFixed(2)+'%':"0.00%"}}</div></td>
                            </tr>
                            <tr v-if="monthTotal.monthStatisticsTotalVO">
                                <td colspan="4"><div><b>合计</b></div></td>
                                <td><div><b>{{monthTotal.monthStatisticsTotalVO.peopleNumber}}</b></div></td>
                                <td><div>-</div></td>
                                <td><div><b>{{monthTotal.monthStatisticsTotalVO.newEntryAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.monthStatisticsTotalVO.continuedEntryAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.monthStatisticsTotalVO.confEntryAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.monthStatisticsTotalVO.totalEntryAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.monthStatisticsTotalVO.newTargetAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.monthStatisticsTotalVO.continuedTargetAmount}}</b></div></td>
                                <td><div><b>{{monthTotal.monthStatisticsTotalVO.newCompletionRate ? (monthTotal.monthStatisticsTotalVO.newCompletionRate*100).toFixed(2)+'%':"0.00%"}}</b></div></td>
                                <td><div><b>{{monthTotal.monthStatisticsTotalVO.continuedCompletionRate ? (monthTotal.monthStatisticsTotalVO.continuedCompletionRate*100).toFixed(2)+'%':"0.00%"}}</b></div></td>
                            </tr>
                        </tfoot>
                    </table>
                    <Spin size="large" fix v-if="loading2"></Spin>
                    </Col>
                </Row>
                </div>
            </TabPane>
            <TabPane label="周统计">
                <div class="tabs-style">
                <Form ref="addForm" :label-width="100" class="my-account-conter">
                    <Row>
                        <Col span="8">
                        <FormItem label="统计时间:">
                            <DatePicker :clearable="clearable" v-model="date3" @on-change="dateChange3" type="month" placeholder="Select month" class="search-input" style="width:50%;float:left;"></DatePicker>
                            <Select v-model="weekType" @on-change="weekChange" style="width:45%;float:right;">
                                <Option v-for="item in weekList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="8" class="text-right mrb-10">
                        <Button type="primary" @click="search3">查询</Button>
                        <Button style="margin-left:8px;" @click="reset3">重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col span="24 mrb-10">
                        <Col span="12">
                            <Button type="primary" @click="totalExportExcle3">导出</Button>
                        </Col>
                    </Col>
                    <Col span="24">
                    <table width="100%" class="ivu-table marketingRevenue-table" cellspacing="0">
                        <thead>
                            <tr>
                                <th rowspan="2">营销部门</th>
                                <th rowspan="2">部门负责人</th>
                                <th rowspan="2">营销团队</th>
                                <th rowspan="2">团队负责人</th>
                                <th rowspan="2">人数</th>
                                <th rowspan="2">业务人员</th>
                                <th colspan="3">全年任务（元）</th>
                                <th colspan="4">本周收入（元）</th>
                            </tr>
                            <tr>
                                <th>新入</th>
                                <th>续入</th>
                                <th>合计</th>
                                <th>新入</th>
                                <th>续入</th>
                                <th>会议</th>
                                <th>合计</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item,index) in totalTableData3" :key="index">
                            <tr v-if="item.leaderMonthStatisticsItemVO">
                                <td :rowspan="item.teamMonthStatisticsItemVOList.length + 2"><div>{{item.deptName}}</div></td>
                                <td :rowspan="item.teamMonthStatisticsItemVOList.length + 2"><div>{{item.leaderName}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.teamName}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.leaderName}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.peopleNumber}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.adminName}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.newTargetAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.continuedTargetAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.totalargetAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.newEntryAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.continuedEntryAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.confEntryAmount}}</div></td>
                                <td><div>{{item.leaderMonthStatisticsItemVO.totalEntryAmount}}</div></td>
                            </tr>
                            <tr v-for="(item2,index2) in item.teamMonthStatisticsItemVOList" :key="index2">
                                <td v-if="index2==0 && !item.leaderMonthStatisticsItemVO" :rowspan="item.teamMonthStatisticsItemVOList.length + 1"><div>{{item.deptName}}</div></td>
                                <td v-if="index2==0 && !item.leaderMonthStatisticsItemVO" :rowspan="item.teamMonthStatisticsItemVOList.length + 1"><div>{{item.leaderName}}</div></td>
                                <td>
                                    <div>{{item2.teamName}}</div>
                                </td>
                                <td>
                                    <div>{{item2.leaderName}}</div>
                                </td>
                                <td>
                                    <div>{{item2.peopleNumber}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.adminName}}</div>
                                    <div><b>小计</b></div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.newTargetAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.newTargetAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.continuedTargetAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.continuedTargetAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.totalargetAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.totalargetAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.newEntryAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.newEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.continuedEntryAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.continuedEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.confEntryAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.confEntryAmount}}</div>
                                </td>
                                <td>
                                    <div v-for="(item1,index1) in item2.adminMonthStatisticsItemVOList" :key="index1">{{item1.totalEntryAmount}}</div>
                                    <div>{{item2.teamStatisticsItemTotalVO.totalEntryAmount}}</div>
                                </td>
                            </tr>
                            <tr v-if="item.monthStatisticsItemTotalVO">
                                <td colspan="2"><b>合计</b></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.peopleNumber}}</div></td>
                                <td><div>-</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.newTargetAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.continuedTargetAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.totalargetAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.newEntryAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.continuedEntryAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.confEntryAmount}}</div></td>
                                <td><div>{{item.monthStatisticsItemTotalVO.totalEntryAmount}}</div></td>
                            </tr>
                            <tr v-else>
                                <td colspan="2"><b>合计</b></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                                <td><div>-</div></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr v-if="weekTotal.marketingMonthStatisticsTotalVO">
                                <td colspan="6"><div><b>营销团队合计</b></div></td>
                                <td><div><b>{{weekTotal.marketingMonthStatisticsTotalVO.newTargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.marketingMonthStatisticsTotalVO.continuedTargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.marketingMonthStatisticsTotalVO.totalargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.marketingMonthStatisticsTotalVO.newEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.marketingMonthStatisticsTotalVO.continuedEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.marketingMonthStatisticsTotalVO.confEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.marketingMonthStatisticsTotalVO.totalEntryAmount}}</b></div></td>
                            </tr>
                            <tr v-if="weekTotal.noMarketingMonthStatisticsTotalVO">
                                <td colspan="6"><div>其他非营销部门到账</div></td>
                                <td><div><b>{{weekTotal.noMarketingMonthStatisticsTotalVO.newTargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.noMarketingMonthStatisticsTotalVO.continuedTargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.noMarketingMonthStatisticsTotalVO.totalargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.noMarketingMonthStatisticsTotalVO.newEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.noMarketingMonthStatisticsTotalVO.continuedEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.noMarketingMonthStatisticsTotalVO.confEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.noMarketingMonthStatisticsTotalVO.totalEntryAmount}}</b></div></td>
                            </tr>
                            <tr v-if="weekTotal.notRecogniseMonthStatisticsTotalVO">
                                <td colspan="6"><div>未认账收入</div></td>
                                <td><div><b>{{weekTotal.notRecogniseMonthStatisticsTotalVO.newTargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.notRecogniseMonthStatisticsTotalVO.continuedTargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.notRecogniseMonthStatisticsTotalVO.totalargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.notRecogniseMonthStatisticsTotalVO.newEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.notRecogniseMonthStatisticsTotalVO.continuedEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.notRecogniseMonthStatisticsTotalVO.confEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.notRecogniseMonthStatisticsTotalVO.totalEntryAmount}}</b></div></td>
                            </tr>
                            <tr v-if="weekTotal.monthStatisticsTotalVO">
                                <td colspan="6"><div><b>合计</b></div></td>
                                <td><div><b>{{weekTotal.monthStatisticsTotalVO.newTargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.monthStatisticsTotalVO.continuedTargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.monthStatisticsTotalVO.totalargetAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.monthStatisticsTotalVO.newEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.monthStatisticsTotalVO.continuedEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.monthStatisticsTotalVO.confEntryAmount}}</b></div></td>
                                <td><div><b>{{weekTotal.monthStatisticsTotalVO.totalEntryAmount}}</b></div></td>
                            </tr>
                        </tfoot>
                    </table>
                    <Spin size="large" fix v-if="loading3"></Spin>
                    </Col>
                </Row>
                </div>
            </TabPane>
        </Tabs>
        </Col>
    </Row>
</template>

<script>
import axios from 'axios'
import { formatThousandPrice, formData } from "../../../assets/js/common.js";
import { marketingRevenueYearList,marketingRevenueMonthList,marketingRevenueWeekList} from "@/view/components/axios/report.js"
export default {
    name: "editExtractReport",
    data() {
        return {
          clearable: false,
            params1: {
                endTime: '',
                startTime: ''
            },
            date1:"",
            loading1: false,
            totalTableData1: [],
            yearStatisticsItemVO:{},
            params2: {
                endTime: '',
                startTime: ''
            },
            date2:"",
            loading2: false,
            totalTableData2: [],
            params3: {
                endTime: '',
                startTime: ''
            },
            date3:"",
            loading3: false,
            totalTableData3: [],
            weekType:"",
            weekList:[],
            firstTab2:true,
            firstTab3:true,
            monthTotal:{},
            weekTotal:{},
            countDate:"",
            nowMonth:""
        }
    },
    created() {
    },
    methods: {
        // 监听选择日期
        dateChange (date) {
            this.params1.startTime = new Date(new Date(date).getFullYear(), 0, 1).getTime()
            this.params1.endTime = new Date(date).getTime() + 16 * 1000 * 60 * 60 - 1000
//            console.log(new Date(this.params1.startTime))
//            console.log(new Date(this.params1.endTime))
        },
        dateChange2 (date) {
            this.params2.startTime = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 1).getTime()
            this.params2.endTime = new Date(new Date(date).getFullYear(), new Date(date).getMonth()+1, 1).getTime()-1;
//            console.log(new Date(this.params2.startTime))
//            console.log(new Date(this.params2.endTime))
        },
        dateChange3 (newdate) {
          console.log('newdate', newdate);
          this.getWeeks(newdate.split('-', 2)[0] ,newdate.split('-', 2)[1]);
            this.weekType = 1;
            this.params3.startTime = new Date(new Date(newdate).getFullYear(), new Date(newdate).getMonth(),1).getTime();
//            let date1 = this.GetSunday(new Date(new Date(newdate).getFullYear(), new Date(newdate).getMonth(),1))
//          this.params3.endTime = new Date(new Date(date1).getFullYear(), new Date(date1).getMonth(), new Date(date1).getDate()).setHours(23,59,59,999);


          const currentMonthDay = new Date(newdate + '-01');
//          console.log('currentMonthDay', currentMonthDay);
          const day = currentMonthDay.getDay();

          const diffEnd = (day < 1 ? -7 : 0) + 6 - (day - 1);

          currentMonthDay.setDate(currentMonthDay.getDate() + diffEnd);
//          console.log(currentMonthDay.setHours(23, 59, 59, 999));
//          this.params3.endTime = currentMonthDay.setHours(23, 59, 59, 999);
          this.params3.endTime = Math.min(this.endOfMonth, currentMonthDay.setHours(23, 59, 59, 999))



//            console.log('change', new Date(this.params3.startTime))
//            console.log('change', new Date(this.params3.endTime))
        },
        weekChange(){
          const copyDate = new Date(this.date3);
          const dateStart = new Date(copyDate.setDate((this.weekType - 1) * 7 + 1));
          console.log('copyDate', copyDate);
          const dayStart = dateStart.getDay();
          const diffStart = (dayStart < 1 ? 7 : 0) + dayStart - 1;

          dateStart.setDate(dateStart.getDate() - diffStart);
          if (this.weekType >= 6) {
            const copyDate2 = new Date(this.date3);
            const dateLastEnd = new Date(copyDate2.setDate((this.weekType - 2) * 7 + 2));
            const dayLastEnd = dateLastEnd.getDay();
            const diffLastEnd = (dayLastEnd < 1 ? -7 : 0) + 6 - (dayLastEnd - 1);
            dateLastEnd.setDate(dateLastEnd.getDate() + diffLastEnd);
            this.params3.startTime = Math.min(dateLastEnd.setHours(0, 0, 0, 0), Math.max(this.startOfMonth, dateStart.setHours(0, 0, 0, 0)));
          }else {
            this.params3.startTime = Math.max(this.startOfMonth, dateStart.setHours(0, 0, 0, 0));
          }





          const copyDate3 = new Date(this.date3);
          const dateEnd = new Date(copyDate3.setDate((this.weekType - 1) * 7 + 1));
          const dayEnd = dateEnd.getDay();
          const diffEnd = (dayEnd < 1 ? -7 : 0) + 6 - (dayEnd - 1);

          dateEnd.setDate(dateEnd.getDate() + diffEnd);


//          this.params3.endTime = dateEnd.setHours(23, 59, 59, 999);
          this.params3.endTime = Math.min(this.endOfMonth, dateEnd.setHours(23, 59, 59, 999))
//          new Date(this.date3.getFullYear(), this.date3.getMonth(), 1).getTime();
          /* let firstDay = new Date(this.date3.getFullYear(),this.date3.getMonth(),1).getDay();
           if(firstDay != 1){
               if(this.weekType == 1){
                   this.params3.startTime = new Date(this.date3.getFullYear(), this.date3.getMonth(), 1).getTime();
                   let date1 = this.GetSunday(new Date(this.date3.getFullYear(), this.date3.getMonth(),1))
                   this.params3.endTime = new Date(new Date(date1).getFullYear(), new Date(date1).getMonth(), new Date(date1).getDate()).getTime() + 24 * 1000 * 60 * 60 - 1;
               }else{
                   let weekDate = this.getWeekTime(this.date3.getFullYear(),this.date3.getMonth()+1,this.weekType-1)
                   let date = weekDate.from,date1 = weekDate.to;
                   this.params3.startTime = new Date(new Date(date).getFullYear(), new Date(date).getMonth(),new Date(date).getDate()).getTime();
                   if((new Date(date1).getMonth() != new Date(date).getMonth())){
                       this.params3.endTime = new Date(new Date(date1).getFullYear(), new Date(date1).getMonth(), 1).getTime()-1;
                   }else{
                       this.params3.endTime = new Date(new Date(date1).getFullYear(), new Date(date1).getMonth(), new Date(date1).getDate()).getTime() + 24 * 1000 * 60 * 60 - 1;
                   }
               }
           }else{
               let weekDate = this.getWeekTime(this.date3.getFullYear(),this.date3.getMonth()+1,this.weekType)
               let date = weekDate.from,date1 = weekDate.to;
               this.params3.startTime = new Date(new Date(date).getFullYear(), new Date(date).getMonth(),new Date(date).getDate()).getTime();
               if((new Date(date1).getMonth() != new Date(date).getMonth())){
                   this.params3.endTime = new Date(new Date(date1).getFullYear(), new Date(date1).getMonth(), 1).getTime()-1;
               }else{
                   this.params3.endTime = new Date(new Date(date1).getFullYear(), new Date(date1).getMonth(), new Date(date1).getDate()).getTime();
               }
           }*/
           console.log('weekChange', new Date(this.params3.startTime).toLocaleDateString())
           console.log('weekChange', new Date(this.params3.endTime).toLocaleDateString())
        },
        search() {
            this.getSumList();
            this.countDate = this.formatDate(new Date(this.date1));
        },
        reset() {
            this.initDateRange();
        },
        search2() {
            this.getSumList2();
            this.nowMonth = new Date(this.date2).getMonth() + 1;
        },
        reset2() {
            this.initDateRange2();
        },
        search3() {
            this.getSumList3();
        },
        reset3() {
            this.initDateRange3();
        },
        //列表
        getSumList() {
            this.loading1 = true;
            marketingRevenueYearList(this.params1).then(res => {
                this.loading1 = false;
                if (res.status == 200) {
                    this.totalTableData1 = res.response.departmentYearStatisticsListVO || []
                    this.yearStatisticsItemVO = res.response.yearStatisticsItemVO || {}
                  // delete this.yearStatisticsItemVO.peopleNumber;
                } else {
                    this.$Message.warning(res.message);
                }
            })
        },
        getSumList2() {
            this.loading2 = true;
            marketingRevenueMonthList(this.params2).then(res => {
                this.firstTab2 = false;
                this.loading2 = false;
                if (res.status == 200) {
                    this.totalTableData2 = res.response.departmentMonthStatisticsListVO || [];
                  // console.log('totalTableData2', this.totalTableData2);
                  this.monthTotal = {
                        marketingMonthStatisticsTotalVO:res.response.marketingMonthStatisticsTotalVO,
                        monthStatisticsTotalVO:res.response.monthStatisticsTotalVO,
                        noMarketingMonthStatisticsTotalVO:res.response.noMarketingMonthStatisticsTotalVO,
                        notRecogniseMonthStatisticsTotalVO:res.response.notRecogniseMonthStatisticsTotalVO
                    }
                } else {
                    this.$Message.warning(res.message);
                }
            })
        },
        getSumList3() {
            this.loading3 = true;
            marketingRevenueWeekList(this.params3).then(res => {
                this.firstTab3 = false;
                this.loading3 = false;
                if (res.status == 200) {
                    this.totalTableData3 = res.response.departmentMonthStatisticsListVO ? res.response.departmentMonthStatisticsListVO : []
                    this.weekTotal = {
                        marketingMonthStatisticsTotalVO:res.response.marketingMonthStatisticsTotalVO,
                        monthStatisticsTotalVO:res.response.monthStatisticsTotalVO,
                        noMarketingMonthStatisticsTotalVO:res.response.noMarketingMonthStatisticsTotalVO,
                        notRecogniseMonthStatisticsTotalVO:res.response.notRecogniseMonthStatisticsTotalVO
                    }
                } else {
                    this.$Message.warning(res.message);
                }
            })
        },
        formatDate(date) {
          var myyear = date.getFullYear();
          var mymonth = date.getMonth()+1;
          var myweekday = date.getDate();

          if(mymonth < 10){
          mymonth = "0" + mymonth;
          }
          if(myweekday < 10){
          myweekday = "0" + myweekday;
          }
          return (myyear+"-"+mymonth + "-" + myweekday);
        },
        initDateRange() {
            this.date1 = new Date();
            this.params1.startTime = new Date(this.date1.getFullYear(), 0, 1).getTime();
            this.params1.endTime = new Date(this.date1.getFullYear(), this.date1.getMonth(), this.date1.getDate()+1).getTime() - 1000;

//            console.log(new Date(this.params1.startTime))
//            console.log(new Date(this.params1.endTime))
        },
        initDateRange2() {
            this.date2 = new Date();
            this.params2.startTime = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
            this.params2.endTime = new Date(new Date().getFullYear(), new Date().getMonth()+1, 1).getTime()-1;
//            console.log(new Date(this.params2.startTime))
//            console.log(new Date(this.params2.endTime))

        },
        initDateRange3() {
            this.date3 = new Date();
//            this.getWeeks(new Date().getFullYear(),new Date().getMonth()+1);
          this.getWeeks(new Date().getFullYear(), new Date().getMonth() + 1);
            this.weekType = this.getMonthWeek(new Date().getFullYear(), new Date().getMonth()+1,new Date().getDate());
//          console.log('init', this.weekType);
          /*
                      let date = this.GetMonday(new Date());
                      this.params3.startTime = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate()).getTime();
                      let date1 = this.GetSunday(new Date())
                      if(new Date(date1).getMonth() != new Date(date).getMonth()){
                        console.log('date1', date1);
                        this.params3.endTime = new Date(new Date(date1).getFullYear(), new Date(date1).getMonth()+1, 1).getTime()-1;
                      }else{
                          this.params3.endTime = new Date(new Date(date1).getFullYear(), new Date(date1).getMonth(), new Date(date1).getDate()).getTime() + 24 * 1000 * 60 * 60 - 1;
                      }*/


//          console.log(new Date('2019-1-4'));
          const day = this.date3.getDay();
          const diffStart = (day < 1 ? 7 : 0) + day - 1;

          this.date3.setDate(this.date3.getDate() - diffStart);
//          this.params3.startTime = this.date3.setHours(0, 0, 0, 0);
          this.params3.startTime = Math.max(this.startOfMonth, this.date3.setHours(0, 0, 0, 0))


          const date = new Date();
          const dayEnd = date.getDay();
          const diffEnd = (dayEnd < 1 ? -7 : 0) + 6 - (dayEnd - 1);

          date.setDate(date.getDate() + diffEnd);
//          this.params3.endTime = date.setHours(23, 59, 59, 999);
          this.params3.endTime = Math.min(this.endOfMonth, date.setHours(23, 59, 59, 999))

          console.log(new Date(this.params3.startTime));
          console.log(new Date(this.params3.endTime));
        },
        //导出
        totalExportExcle() {
            axios({
                url: "/report/report/marketingRevenue/yearStatisticsExport",
                method: "get",
                params: this.params1
            }).then(res => {
                if (res.data.status === "500") {
                    this.$Message.warning(res.data.message ? res.data.message : '');
                } else {
                    let form_data = formData(this.params1);
                    window.location.href = '/report/report/marketingRevenue/yearStatisticsExport?' + form_data;
                }
            })
        },
        totalExportExcle2() {
            axios({
                url: "/report/report/marketingRevenue/monthStatisticsExport",
                method: "get",
                params: this.params2
            }).then(res => {
                if (res.data.status === "500") {
                    this.$Message.warning(res.data.message?res.data.message:'');
                } else {
                    let form_data = formData(this.params2);
                    window.location.href = '/report/report/marketingRevenue/monthStatisticsExport?' + form_data;
                }
            })
        },
        totalExportExcle3() {
            axios({
                url: "/report/report/marketingRevenue/weekStatisticsExport",
                method: "get",
                params: this.params3
            }).then(res => {
                if (res.data.status === "500") {
                    this.$Message.warning(res.data.message?res.data.message:'');
                } else {
                    let form_data = formData(this.params3);
                    window.location.href = '/report/report/marketingRevenue/weekStatisticsExport?' + form_data;
                }
            })
        },
        changeTab(newTab){
            if(newTab == 1){
                if(this.firstTab2){
                    this.getSumList2();
                }
            }else if(newTab == 2){
                if(this.firstTab3){
                    this.getSumList3();
                }
            }
        },
        //获取当月有几个周
        getWeeks(year, month) {
          console.log(year, month);
          const date = new Date(year, month, 0);

          let w = date.getDay();
          const d = date.getDate();

          if (w === 0) {
            w = 7;
          }
          const week_count = Math.ceil((d + 7 - w) / 7);
          this.weekList = [];
          for(let i = 0;i < week_count; i++){
            this.weekList.push({
              label:'第'+(i+1)+'周',
              value:i+1
            })
          }

          /*var d = new Date();
          // 该月第一天
          d.setFullYear(year, month-1, 1);
          var w1 = d.getDay();
          if (w1 == 0) w1 = 7;
          // 该月天数
          d.setFullYear(year, month, 0);
          var dd = d.getDate();
          let week_count = dd%7==0 ? parseInt(dd/7) : parseInt(dd/7) + 1;
          this.weekList = [];
          for(var i=0;i<week_count;i++){
              this.weekList.push({
                  label:'第'+(i+1)+'周',
                  value:i+1
              })
          }*/
        },
        //获得当前日期在当月第几周
        getMonthWeek(a, b, c) {
            var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();
            return Math.ceil(
                (d + 6 - w) / 7
            );
        },
        //获取某个日期所在周周一的日期
        GetMonday(dd) {
            var week = dd.getDay(); //获取时间的星期数
            var minus = week ? week - 1 : 6;
            dd.setDate(dd.getDate() - minus); //获取minus天前的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1; //获取月份
            var d = dd.getDate();
            return y + "-" + m + "-" + d;
        },
        //获取某个日期所在周周日的日期
        GetSunday(dd) {
            var nowTime = dd.getTime() ; 
            var day = dd.getDay();
            var oneDayTime = 24*60*60*1000 ;
            var SundayTime =  nowTime + (7-day)*oneDayTime ;
            SundayTime = new Date(SundayTime)
            var y = SundayTime.getFullYear();
            var m = SundayTime.getMonth() + 1; //获取月份
            var d = SundayTime.getDate();
            return y + "-" + m + "-" + d;
        },
        //根据年月周获取周一与周日日期
        getWeekTime(year, month,weekday) {
            var d = new Date();
            // 该月第一天
            d.setFullYear(year, month-1, 1);
            var w1 = d.getDay();
            if (w1 == 0) w1 = 7;
            // 该月天数
            d.setFullYear(year, month, 0);
            var dd = d.getDate();
            // 第一个周一
            let d1;
            if (w1 != 1) d1 = 7 - w1 + 2;
            else d1 = 1;
            var monday = d1+(weekday-1)*7;
            var sunday = monday + 6;
            var from = year+"-"+month+"-"+monday;
            var to;
            if (sunday <= dd) {
                to = year+"-"+month+"-"+sunday;
            } else {
                d.setFullYear(year, month-1, sunday);
                let days=d.getDate();
                to = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+days;
            }
            let response = {
                from:from,
                to:to
            }
            return response;
        }
    },
    mounted(){
        this.countDate = this.formatDate(new Date());
        this.nowMonth = new Date().getMonth() + 1;
        this.initDateRange();
        this.initDateRange2();
        this.initDateRange3();
        this.getSumList();
    },
  computed: {
      startOfMonth() {
        const date = new Date(this.date3)
        date.setDate(1)
        return date.setHours(0, 0, 0, 0)
      },
      endOfMonth() {
        const date = new Date(this.date3)
        const month = date.getMonth()
        date.setFullYear(date.getFullYear(), month + 1, 0)
        return date.setHours(23, 59, 59, 999)
      }
  }

}
</script>


