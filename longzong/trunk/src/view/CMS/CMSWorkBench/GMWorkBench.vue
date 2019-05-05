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
                        <Col span="10">
                        <my-task class="moreHeight"></my-task>
                        </Col>
                        <Col span="14">
                        <timeout-remind></timeout-remind>
                        </Col>
                    </Row>
                    <Row :gutter="15" class-name="margin-top-15">
                        <Col span="24">
                            <Card :bordered="false">
                            <p class='pmtj fs18' style="position:relative">待审核信息源</p>
                            <Table class="tableCommon margin-top-15" :data="auditInfoData" :columns="auditInfoColumns" ref="dragTable" :stripe="true" :border="true">
                            </Table>
                            <oil-page :total="auditInfoTotal" :page-num="auditInfo.pageNum" :page-size="auditInfo.pageSize" @page-change="pageChangeAudit" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
                        </Card>
                        </Col>
                    </Row>
                    <Row :gutter="15" class-name="margin-top-15">
                        <Col span="24">
                        <Card :bordered="false">
                            <p class='pmtj fs18' style="position:relative">部门达标统计</p>
                            <Form :label-width="100" class="padding-top-25">
                                <Row type="flex" justify="space-between">
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
            auditInfoTotal:0,
            taskStatistics: {
                dateTimeStart: "",
                dateTimeEnd: "",
                pageSize: 10,
                pageNum: 1
            },
            auditInfo:{
                pageSize: 10,
                pageNum: 1 
            },
            menu: [
                {
                    key: "0",
                    name: "新增信息单元"
                },
                {
                    key: "1",
                    name: "信息单元管理"
                },
                {
                    key: "2",
                    name: "我的信息单元 "
                },
                {
                    key: "3",
                    name: "任务分派及委派"
                },
                {
                    key: "4",
                    name: "信息发布"
                },
                {
                    key: "5",
                    name: "文章查看"
                },
                {
                    key: "6",
                    name: "短信查看"
                },
                {
                    key: "7",
                    name: "短讯通查看"
                }
            ],
            dateTime: [],
            taskStatisticsColumns: [
                {
                    title: "部门",
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
                    username: "总编室",
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
                    username: "燃气及深加工",
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
                    username: "润滑油",
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
                    username: "重质油",
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
            ],
            auditInfoColumns: [
                {
                    title: "姓名",
                    align: 'center',
                    key: "userName",
                    minWidth: 100
                },
                {
                    title: "性别",
                    align: 'center',
                    key: "sex",
                    minWidth: 100
                },
                {
                    title: "部门",
                    align: 'center',
                    key: "department",
                    minWidth: 120
                },
                {
                    title: "职位",
                    align: 'center',
                    key: "job",
                    minWidth: 100
                },
                {
                    title: "联系电话号码",
                    align: 'center',
                    key: "telephone",
                    minWidth: 120
                },
                {
                    title: "手机号码",
                    align: 'center',
                    key: "phone",
                    minWidth: 100
                },
                {
                    title: "所在企业",
                    align: 'center',
                    key: "company",
                    minWidth: 150
                },
                {
                    title: "企业简称",
                    align: 'center',
                    key: "shortCompany",
                    minWidth: 100
                },
                {
                    title: "关联的品种",
                    align: 'center',
                    tooltip: true,
                    ellipsis: true,
                    key: "linkProduct",
                    minWidth: 150
                },
                {
                    title: "审核类型",
                    align: 'center',
                    key: "auditType",
                    minWidth: 100
                },
                {
                    title: "操作",
                    align: 'center',
                    minWidth: 60,
                    render: (h, data) => {
                        return h('div', [
                            h('span', {
                            style: {
                                color: '#145edb',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            },
                            on: {
                                click: () => {
                                this.audit(data.row.id)
                                }
                            }
                            }, '审核')
                        ])
                    }
                }
            ],
            auditInfoData: [
                {
                    userName:"张海涛",
                    sex:"男",
                    department:"销售部",
                    job:"经理",
                    telephone:"0543-6723475",
                    phone:"13791972226",
                    company:"山东宏远新材料科技有限公司",
                    shortCompany:"山东宏远",
                    linkProduct:"橡胶、聚乙二醇、硬脂酸",
                    auditType:"变更审核"
                },
                {
                    userName:"张海涛",
                    sex:"男",
                    department:"销售部",
                    job:"经理",
                    telephone:"0543-6723475",
                    phone:"13791972226",
                    company:"山东宏远新材料科技有限公司",
                    shortCompany:"山东宏远",
                    linkProduct:"橡胶、聚乙二醇、硬脂酸",
                    auditType:"变更审核"
                },
                {
                   userName:"张海涛",
                    sex:"男",
                    department:"销售部",
                    job:"经理",
                    telephone:"0543-6723475",
                    phone:"13791972226",
                    company:"山东宏远新材料科技有限公司",
                    shortCompany:"山东宏远",
                    linkProduct:"橡胶、聚乙二醇、硬脂酸",
                    auditType:"变更审核"
                },
                {
                    userName:"张海涛",
                    sex:"男",
                    department:"销售部",
                    job:"经理",
                    telephone:"0543-6723475",
                    phone:"13791972226",
                    company:"山东宏远新材料科技有限公司",
                    shortCompany:"山东宏远",
                    linkProduct:"橡胶、聚乙二醇、硬脂酸",
                    auditType:"变更审核"
                }
            ]
        };
    },
    methods: {
        pageChangeStatistics(page, pageSize) {
            if (page) {
                this.taskStatistics.pageNum = page;
            }
            if (pageSize) {
                this.taskStatistics.pageSize = pageSize;
            }
        },
        pageChangeAudit(page, pageSize){
            if (page) {
                this.auditInfo.pageNum = page;
            }
            if (pageSize) {
                this.auditInfo.pageSize = pageSize;
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
        },
        audit(id){

        }
    }
};
</script>