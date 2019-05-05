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
            当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;产业链收入统计&nbsp;&nbsp;>>&nbsp;&nbsp;产品分类收入占比
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
                        <Button type="primary" @click="totalExportExcle">年任务导出</Button>
                    </Col>
                    <Col span="12" class="text-right font-14">
                        总收入: <span class="font-c-blue">{{totalIncome}}</span>
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
import { pfCommonTreeDeptTree,reportICAProductCategoryList, pfCommonTreeOrgTree} from "@/view/components/axios/report.js"
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
            totalColumns: [],
            totalIncome:0,
            totalSum:''
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
            reportICAProductCategoryList(this.params).then(res => {
                this.loading1 = false;
                if (res.status == 200) {
                    this.totalColumns = [];
                    let titArr = res.response.titleData;
                    this.totalSum = res.response.contentData.length;
                    for(let i=0;i<titArr.length;i++){
                        for(let item in titArr[i]){
                            this.totalColumns.push({
                                key: item,
                                title: titArr[i][item],
                                align: "center",
                                minWidth: 140
                            })
                        }
                    }
                    console.log("shour", res.response.totalIncome)
                    this.totalIncome = res.response.totalIncome;
                    console.log("数据",this.totalIncome)
                    this.totalTableData = res.response.contentData ? res.response.contentData : [];
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
            if(this.totalSum <= 0){
                this.$Message.warning('无导出内容');
                return ;
            }else if(this.totalSum > 10000){
                this.$Message.warning('数据内容大于10000条');
                return ;
            }else{
                let form_data = formData(this.params);
                    window.location.href = '/report/reportIndustryChainAmount/productCategoryListExport?' + form_data;
            }
            // let params = {
            //     deptIdList:this.params.deptIdList,
            //     startTime:this.params.startTime || '',
            //     endTime:this.params.endTime ||''
            // }
            // console.log('params',params);
            // axios({
            //     url: "/report/reportIndustryChainAmount/productCategoryListExport",
            //     method: "get",
            //     params:new FormData(params)
            // }).then(res => {
            //     console.log('res',res);

            //     // if (res.data.status === "500" || res.data.status == "100053") {
            //     //     this.$Message.warning(res.data.message?res.data.message:'');
            //     // } else {
            //     //     let form_data = formData(this.params);
            //     //     window.location.href = '/report/reportIndustryChainAmount/productCategoryListExport?' + form_data;
            //     // }
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


