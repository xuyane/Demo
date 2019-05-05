<template>
  <Card :bordered="false" class="timeoutRemind">
    <p class='pmtj fs18' style="position:relative">快超时任务提醒</p>
    <div class="nav-tab">
      <span v-for='(item,index) in tabOption' :key='index' :class="index==currentNav? 'active' : ''" @click="changeNav(index)">{{item.name}}</span>
    </div>
    <template v-if="currentNav == 0">
    <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
    </Table>
    <oil-page :total="total" :page-num="params1.pageNum" :page-size="params1.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </template>
    <template v-if="currentNav == 1">
    <Table class="tableCommon" :data="tableData1" :columns="columns" ref="dragTable" :stripe="true" :border="true">
    </Table>
    <oil-page :total="total1" :page-num="params2.pageNum" :page-size="params2.pageSize" @page-change="pageChange1" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </template>
  </Card>
</template>
<script>
import oilPage from "../../../components/page/page";
import {
  workbenchHalfhourtaskwarning,
  workbenchHourtaskwarning,
  taskwarningurl
} from "./api/api.js";
import { formData } from '../../../../assets/js/common.js'
export default {
    name: "timeoutRemind",
    components: {
        oilPage
    },
    data() {
        return {
            params1:{
                nowDate:new Date().getTime(),
                pageSize:10,
                pageNum:1,
            },
            params2:{
                nowDate:new Date().getTime(),
                pageSize:10,
                pageNum:1,
            },
            pageSizeOpts: [10, 20, 50, 100, 200],
            showSizer: true,
            total: 0,
            total1: 0,
            currentNav: 0,
            tabOption: [
                {
                    name: "到期时间不超过半小时"
                },
                {
                    name: "到期时间不超过一小时"
                }
            ],
            columns: [
                {
                    key: "taskId",
                    title: "序号",
                    width: 100,
                    align: "center"
                },
                {
                    title: "任务名称",
                    align: 'center',
                    key: "name",
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
                                this.taskLink(data.row.taskId)
                            }
                          }
                        }, data.row.name)
                      ])
                    }
                },
                {
                    title: "最晚发布时间",
                    align: 'center',
                    key: "checkTime"
                },
                {
                    title: "发布频率",
                    align: 'center',
                    key: "publicFrequency"
                }
            ],
            tableData: [],
            tableData1: []
        };
    },
    methods: {
        taskLink(taskId){
            taskwarningurl(formData({informationUnitId:taskId})).then(res => {
                if(res.response){
                    this.$router.push({
                        name: "formStyle",
                        query: {
                            item: JSON.stringify({
                                informationUnitCode:res.response.informationUnitCode, 
                                informationUnitName:res.response.informationUnitName,
                                taskId:res.response.taskId,
                                informationUnitId:res.response.informationUnitId
                            })
                        }
                    });
                }
            })
            
        },
        changeNav(index) {
            this.currentNav = index;
        },
        pageChange(page, pageSize) {
            //分页
            if(page) {
                this.params1.pageNum = page
            }
            if(pageSize) {
                this.params1.pageSize = pageSize
                this.params1.pageNum = 1
            }
            this.getTable1()
        },
        pageChange1(page, pageSize) {
            //分页
            if(page) {
                this.params2.pageNum = page
            }
            if(pageSize) {
                this.params2.pageSize = pageSize
                this.params2.pageNum = 1
            }
            this.getTable2()
        },
        getTable1(){
            workbenchHalfhourtaskwarning(this.params1).then(res => {
                if(res.response.list){
                 this.tableData = res.response.list;
                 this.total = res.response.total;
                }
            })
        },
        getTable2(){
            workbenchHourtaskwarning(this.params2).then(res => {
                if(res.response){
                 this.tableData1 = res.response.list;
                 this.total1 = res.response.total;
                }
            })
        }
    },
    mounted() {
        this.getTable1()
        this.getTable2()
    }
};
</script>