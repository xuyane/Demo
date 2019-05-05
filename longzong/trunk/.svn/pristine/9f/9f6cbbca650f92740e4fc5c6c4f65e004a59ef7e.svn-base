<style lang="less">
@import "../../../assets/css/common.less";
@import "cmsWorkBench.less";
</style>

<template>
    <div class="cmsWorkBench">
        <div class="top-header">
            <top-header></top-header>
        </div>
        <div class='box clearfix'>
            <left-msg></left-msg>
            <Row class='right-content'>
                <nav-menu></nav-menu>
                <div class="cont-wrap">
                    <Row :gutter="15">
                        <Col span="9">
                        <my-task></my-task>
                        </Col>
                        <Col span="15">
                        <call-record></call-record>
                        </Col>
                    </Row>
                    <Row :gutter="15" style="margin-top:15px;">
                        <Col span="24">
                        <timeout-remind></timeout-remind>
                        </Col>
                    </Row>
                    <Row :gutter="15" style="margin-top:15px;">
                        <Col span="24">
                        <Card :bordered="false">
                            <p class='pmtj fs18' style="position:relative">部门任务达标统计</p>
                            <Form :label-width="100" class="padding-top-25">
                                <Row type="flex" justify="space-between">
                                    <Col span="7">
                                    <FormItem label="姓名:">
                                        <Input v-model="taskStatistics.userName" class="search-input" placeholder="请输入姓名"></Input>
                                    </FormItem>
                                    </Col>
                                    <Col span="7">
                                    <FormItem label="查询时间段:">
                                        <DatePicker v-model="dateTime" format="yyyy-MM-dd" type="daterange" placeholder="请选择查询时间段" class="search-input" @on-change="getDateTime"></DatePicker>
                                    </FormItem>
                                    </Col>
                                    <Col span="7" class="text-right">
                                    <Button type="primary" @click="taskStatisticsSearch">查询</Button>
                                    <Button style="margin-left: 8px" @click="taskStatisticsClear">重置</Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Table class="tableCommon" :data="taskStatisticsData" :columns="taskStatisticsColumns" ref="dragTable" :stripe="true" :border="true">
                            </Table>
                            <oil-page :total="taskStatisticsTotal" :page-num="taskStatistics.pageNum" :page-size="taskStatistics.pageSize" @page-change="pageChangeStatistics" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
                        </Card>
                        </Col>
                    </Row>
                </div>

            </Row>
        </div>
    </div>
</template>

<script>
import topHeader from "../../header/header.vue";
import leftMsg from "../../CRM/leftUserMsg/leftUserMsg";
import navMenu from "./components/navMenu.vue";
import myTask from "./components/myTask.vue";
import callRecord from "./components/callRecord.vue";
import timeoutRemind from "./components/timeoutRemind.vue";
import oilPage from "../../components/page/page";
export default {
    components: {
        topHeader,
        navMenu,
        leftMsg,
        myTask,
        callRecord,
        timeoutRemind,
        oilPage
    },
    data() {
        return {
            pageSizeOpts: [10, 20, 50, 100, 200],
            showSizer: true,
            taskStatisticsTotal: 0,
            taskStatistics: {
                userName: "",
                dateTimeStart: "",
                dateTimeEnd: "",
                pageSize: 10,
                pageNum: 1
            },
            dateTime: [],
            taskStatisticsColumns: [
                {
                    title: "姓名",
                    align: "center",
                    key: "username",
                    minWidth: 120
                },
                {
                    title: "总任务数",
                    align: "center",
                    children: [
                        {
                            title: "标准任务数",
                            key: "standardTotalTask",
                            align: "center",
                            minWidth: 120
                        },
                        {
                            title: "实际完成任务数",
                            key: "factTotalTask",
                            align: "center",
                            minWidth: 120
                        }
                    ]
                },
                {
                    title: "发布任务数",
                    align: "center",
                    children: [
                        {
                            title: "标准任务数",
                            key: "standardPublishTask",
                            align: "center",
                            minWidth: 120
                        },
                        {
                            title: "实际完成任务数",
                            key: "factPublishTask",
                            align: "center",
                            minWidth: 120
                        }
                    ]
                },
                {
                    title: "采集任务数",
                    align: "center",
                    children: [
                        {
                            title: "标准任务数",
                            key: "standardCollectTask",
                            align: "center",
                            minWidth: 120
                        },
                        {
                            title: "实际完成任务数",
                            key: "factCollectTask",
                            align: "center",
                            minWidth: 120
                        }
                    ]
                },
                {
                    title: "达标率",
                    align: "center",
                    children: [
                        {
                            title: "发布达标率",
                            key: "publishRate",
                            align: "center",
                            minWidth: 120
                        },
                        {
                            title: "采集达标率",
                            key: "collectRate",
                            align: "center",
                            minWidth: 120
                        },
                        {
                            title: "总达标率",
                            key: "totalRate",
                            align: "center",
                            minWidth: 120
                        }
                    ]
                }
            ],
            taskStatisticsData: [
                {
                    username: "李彦",
                    standardTotalTask: 49,
                    factTotalTask: 49,
                    standardPublishTask: 48,
                    factPublishTask: 48,
                    standardCollectTask: 1,
                    factCollectTask: 1,
                    publishRate: "100%",
                    collectRate: "100%",
                    totalRate: "100%"
                },
                {
                    username: "李彦",
                    standardTotalTask: 49,
                    factTotalTask: 49,
                    standardPublishTask: 48,
                    factPublishTask: 48,
                    standardCollectTask: 1,
                    factCollectTask: 1,
                    publishRate: "100%",
                    collectRate: "100%",
                    totalRate: "100%"
                },
                {
                    username: "李彦",
                    standardTotalTask: 49,
                    factTotalTask: 49,
                    standardPublishTask: 48,
                    factPublishTask: 48,
                    standardCollectTask: 1,
                    factCollectTask: 1,
                    publishRate: "100%",
                    collectRate: "100%",
                    totalRate: "100%"
                },
                {
                    username: "李彦",
                    standardTotalTask: 49,
                    factTotalTask: 49,
                    standardPublishTask: 48,
                    factPublishTask: 48,
                    standardCollectTask: 1,
                    factCollectTask: 1,
                    publishRate: "100%",
                    collectRate: "100%",
                    totalRate: "100%"
                },
                {
                    username: "汇总信息",
                    standardTotalTask: 290,
                    factTotalTask: 278,
                    standardPublishTask: 278,
                    factPublishTask: 280,
                    standardCollectTask: 10,
                    factCollectTask: 7,
                    publishRate: "96.79%",
                    collectRate: "93.33%",
                    totalRate: "95.26%"
                }
            ]
        };
    },
    methods: {
        pageChangeStatistics(page, pageSize) {
            //分页
            if (page) {
                this.taskStatistics.pageNum = page;
            }
            if (pageSize) {
                this.taskStatistics.pageSize = pageSize;
            }
        },
        taskStatisticsSearch() {},
        taskStatisticsClear() {},
        getDateTime(data) {
            let data1 = (data[0] + " 00:00:00").toString();
            let data2 = (data[1] + " 23:59:59").toString();
            let data1_val = new Date(
                Date.parse(data1.replace(/-/g, "/"))
            ).getTime();
            let data2_val = new Date(
                Date.parse(data2.replace(/-/g, "/"))
            ).getTime();
            this.taskStatistics.dateTimeStart = data1_val;
            this.taskStatistics.dateTimeEnd = data2_val;
        }
    }
};
</script>