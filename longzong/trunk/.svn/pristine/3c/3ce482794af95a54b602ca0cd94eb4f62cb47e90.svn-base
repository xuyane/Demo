<template>
  <Card :bordered="false">
                            <p class='fs18' style="position:relative">部门任务达标统计</p>
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
                        </Card>
</template>
<script>
import {
  deptmentcount
} from "./api/api.js";
export default {
    name: "departmentTasks",
    components: {
    },
    data() {
        return {
            showSizer: true,
            taskStatistics: {
                userName: "",
                startTime: "",
                endTime: ""
            },
            dateTime: [],
            taskStatisticsColumns: [
                {
                title: " ",
                align: "center",
                children: [
                    {
                    key: "name",
                    title: "姓名",
                    align: "center",
                    width: 80,
                    render: (h, params) => {
                        if (params.row.name == "汇总信息") {
                        return h("div", [
                            h(
                            "span",
                            {
                                style: {
                                color: "black",
                                "font-weight": 600
                                }
                            },
                            params.row.name
                            )
                        ]);
                        } else {
                        return h("div", [
                            h(
                            "a",
                            {
                                on: {
                                click: () => {
                                    localStorage.setItem(
                                        "department",
                                        JSON.stringify({
                                            departMentId: params.row.departMentId, // 个人所在部门Id
                                            id: params.row.id, // 个人Id
                                            name: params.row.name, // 个人名字
                                            queryTime:this.dateTime
                                        })
                                    );
                                    this.$router.push({
                                        name: "personalTaskReach"
                                    });
                                }
                                }
                            },
                            params.row.name
                            )
                        ]);
                        }
                    }
                    }
                ]
                },
                {
                title: "总任务数",
                align: "center",
                children: [
                    {
                    title: "标准任务数",
                    align: "center",
                    render: (h, data) => {
                        let label =
                        data.row.standardPublishCount + data.row.standardGatherCount;
                        return h(
                        "span",
                        {
                            props: {
                            type: "text",
                            size: "small"
                            }
                        },
                        label
                        );
                    }
                    },
                    {
                    title: "实际完成任务数",
                    align: "center",
                    render: (h, data) => {
                        let label =
                        data.row.actualPublishCount + data.row.actualGatherCount;
                        return h(
                        "span",
                        {
                            props: {
                            type: "text",
                            size: "small"
                            }
                        },
                        label
                        );
                    }
                    }
                ]
                },
                {
                title: "发布任务数",
                align: "center",
                children: [
                    {
                    key: "standardPublishCount",
                    title: "标准任务数",
                    align: "center"
                    },
                    {
                    key: "actualPublishCount",
                    title: "实际完成任务数",
                    align: "center"
                    }
                ]
                },
                {
                key: "total",
                title: "采集任务数",
                align: "center",
                children: [
                    {
                    key: "standardGatherCount",
                    title: "标准任务数",
                    align: "center"
                    },
                    {
                    key: "actualGatherCount",
                    title: "实际完成任务数",
                    align: "center"
                    }
                ]
                },
                {
                key: "total",
                title: "总任务数",
                align: "center",
                children: [
                    {
                    key: "totalRate",
                    title: "总达标率",
                    align: "center",
                    render: (h, data) => {
                        let label = this.countRate(
                        data.row.actualGatherCount + data.row.actualPublishCount,
                        data.row.standardGatherCount + data.row.standardPublishCount
                        );
                        return h(
                        "span",
                        {
                            props: {
                            type: "text",
                            size: "small"
                            }
                        },
                        label
                        );
                    }
                    },
                    {
                    title: "发布达标率",
                    align: "center",
                    render: (h, data) => {
                        let label = this.countRate(
                        data.row.actualPublishCount,
                        data.row.standardPublishCount
                        );
                        return h(
                        "span",
                        {
                            props: {
                            type: "text",
                            size: "small"
                            }
                        },
                        label
                        );
                    }
                    },
                    {
                    key: "collectRate",
                    title: "采集达标率",
                    align: "center",
                    render: (h, data) => {
                        let label = this.countRate(
                        data.row.actualGatherCount,
                        data.row.standardGatherCount
                        );
                        return h(
                        "span",
                        {
                            props: {
                            type: "text",
                            size: "small"
                            }
                        },
                        label
                        );
                    }
                    }
                ]
                }
            ],
            taskStatisticsData: []
        };
    },
    methods: {
        taskStatisticsSearch() {
            this.getTableData();
        },
        taskStatisticsClear() {
            this.taskStatistics.userName = "";
            this.taskStatistics.startTime = "";
            this.taskStatistics.endTime = "";
            this.dateTime = [];
        },
        getCurrentMonthFirst() {
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = "01";
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getDateTime(data) {
            let data1 = (data[0] + " 00:00:00").toString();
            let data2 = (data[1] + " 23:59:59").toString();
            let data1_val = new Date(
                Date.parse(data1.replace(/-/g, "/"))
            ).getTime();
            let data2_val = new Date(
                Date.parse(data2.replace(/-/g, "/"))
            ).getTime();
            this.taskStatistics.startTime = data1_val;
            this.taskStatistics.endTime = data2_val;
        },
        getTableData(){
            let that = this;
            var params = {
                name: that.taskStatistics.userName,
                startTime: that.taskStatistics.startTime,
                endTime: that.taskStatistics.endTime
            };
            deptmentcount(params)
            .then(res => {
                if(res.response){
                    that.taskStatisticsData = res.response.list ? res.response.list : [];
                }
                
            })
        },
        countRate(val1, val2) {
            if (val1 == 0) {
                return "0%";
            } else if (val2 == 0) {
                return "100%";
            } else {
                return ((val1 / val2) * 100).toFixed(2) + "%";
            }
        }
    },
    mounted() {
        this.dateTime = [this.getCurrentMonthFirst(), this.getNowFormatDate()];
        this.getTableData();
    }
};
</script>