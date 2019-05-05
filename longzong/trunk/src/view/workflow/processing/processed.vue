<style lang="less" scoped>
    .my-account-out .my-customer-top {
        padding-left:15px !important;
    }
    .mar-top-20 {
        margin-top: 20px;
    }
    .btn-text {
        text-align: right;
        padding: 30px 0px 0px 0;
        span {
        margin-left: 20px;
        }
        i {
        font-style: normal;
        }
    }
    .my-account-conter {
        background: #fff;
    }
    .p-text {
        text-align: center;
    }
    .mar-left-36 {
        margin-left: 36px;
    }
    .margin-bottom-20 {
        margin-bottom: 20px;
    }
    .file-box{
        position:relative;
        width:340px
    }
    .txt{
        height:36px;
        border: 1px solid #605f5f;
        width:180px;
        padding-left: 10px;
        margin-left: 14px;
    }
    .btn{
        background-color:#FFF;
        border: 1px solid #605f5f;
        height:36px;
        width:66px;
    }
    .file{
        position:absolute;
        top:0; right:80px;
        height:36px;
        opacity:0;
        width:260px;
        cursor: pointer;
    }
</style>


<template>
<Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;已办理任务
      </Row>
    </Col>

    <Col span="24" class-name="search-form">
        <Row class="my-customer-top mar-b-20">
            <top-account></top-account>
        </Row>

            <Form :label-width="80">
             <Row type="flex" justify="space-between">
                <Col span="7">
                    <FormItem label="流程KEY:">
                        <Input  class="search-input" v-model="value1"></Input>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="业务ID:">
                        <Input-number  class="search-input" v-model="value2"></Input-number>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="业务KEY:">
                        <Input  class="search-input" v-model="value3"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row type="flex" justify="space-between">
                <Col span="7">
                    <FormItem label="办理日期:">
                    <DatePicker format="yyyy-MM-dd" type="daterange" placement="right-start" size="small" placeholder="请选择日期" class="search-input"  v-model="SelectTime" ></DatePicker>
                    <!-- @on-change="getSelectTime" -->
                    </FormItem>
                </Col>

                <Col span="7">
                    <FormItem label="办理人:"  >
                        <Select v-model ="value5"
                            ref="selectEmployee"
                            clearable
                            filterable
                            remote
                            :remote-method="newQueryEmployee"
                            :loading="loading"
                            class="search-input "
                            placeholder="请选择办理人">
                            <Option v-for="(option, index) in employeeList" :value="option.id" :key="index">{{option.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>

                 <Col span="7" class="text-right">
                    <Button type="primary"  @click="query">查询</Button>
                    <Button style="margin-left: 8px"  @click="reset">重置</Button>
                </Col>
            </Row>
        </Form>
      </Col>

        <Col span="24" class="mar-top-20">
            <Row class-name="table-con">

                <Table :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" >
                    
                </Table>
                <div class="page-con">
                    <span>第{{pageNum}}页 / 共{{Math.ceil(dataCount / pageSize)}}页 每页{{pageSize}}条 共{{dataCount}}条</span>
                    <Page
                    :total="dataCount"
                    :page-size="pageSize"
                    show-sizer
                    show-elevator
                    :page-size-opts="pageSizeOpt"
                    @on-change="changePageNum"
                    @on-page-size-change="changePageSize"
                    class="pull-right"/>
                </div>
            </Row>
        </Col>
    </Col>
  </Row>
</template>

<script>
import axios from 'axios'
import topAccount from './processTop.vue'
import { statusZero } from '../../components/axios/workflow.js'
export default {
    name: 'myAccountIndex',
    components: {
        topAccount
    },
    data () {
        return{
            SelectTime:[], // 选择的时间段
            columns: [
                 {
                    type: 'index',
                    width: 60,
                    align: 'center',
                    title: "序号"
                },
                {
                    key: "instanceId",
                    align: "center",
                    title: "实例ID",
                    render: (h, data) => {
                        return h('div', [
                            h('span', {
                            style: {
                                color: 'blue',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            },
                            on: {
                                click: () => {
                                this.$router.push({path: '/instanceDetail', query: {id : data.row.instanceId}})
                                }
                            }
                            }, data.row.instanceId)
                        ])
                    }
                },
                {
                    key: "name",
                    align: "center",
                    title: "任务名称"
                },
                {
                    key: "processKey",
                    align: "center",
                    title: "流程KEY",
                },
                {
                    key: "processName",
                    align: "center",
                    title: "流程名称",
                },
                {
                    key: "businessId",
                    align: "center",
                    title: "业务ID",
                },
                {
                    key: "businessKey",
                    align: "center",
                    title: "业务KEY"
                },
                {
                    key: "assignee",
                    align: "center",
                    title: "办理人"
                }
                ,
                {
                    key: "createTime",
                    align: "center",
                    title: "创建时间"
                },
                {
                    key: "completeTime",
                    align: "center",
                    title: "办理时间",
                }
            ],
            tableData: [],
            employeeList: [],
            showSizer: true,
            loading: false,
            dataCount: 0,
            pageSize: 10,
            pageNum: 1,
            pageSizeOpt: [10, 20,50],
            value1: '',
            value2: null,
            value3: '',
            value4: '',
            value5: '',
            timeShowVal: ''
        }
    },
    created() {
        this.getListData()
    },
    methods:{
      formatDate(date) {  
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d; 
        return y + '-' + m + '-' + d;  
      },
      reset() {
        this.value1 = '';
        this.value2 = null;
        this.value3 = '';
        this.value4 = '';
        this.value5 = '';
        this.timeShowVal = '';
        this.employeeList = [];
        this.$refs.selectEmployee.query = '';
        this.SelectTime = [];
        this.SelectTime[0]='';
        this.SelectTime[1]='';
      },
     getListData() {
            this.$Spin.show();
            axios({
                url:'/mysteel/workflow/task/list',
                method: 'get',
                params:{
                    page: this.pageNum,
                    pageSize: this.pageSize,
                    processDefKey:this.value1,
                    businessId:this.value2,
                    businessKey:this.value3,
                    completeDate:this.value4,
                    adminId:this.value5
                }
            }).then(resp => {
                statusZero(resp.data.status)
                this.tableData = resp.data.data.list;
                this.dataCount = resp.data.data.total;
                this.$Spin.hide();
            }).catch(err => {
                console.log(err);
                this.$Spin.hide();
            })
        },
        changePageNum (current) {
        this.pageNum = current
        this.getListData()
        },
        // 监听修改显示条数
        changePageSize (size) {
        this.pageSize = size
        this.getListData()
        },
        query() {
            if(this.SelectTime[0]==''||this.SelectTime[1]==''){
                this.value4=''
            }else{
                this.value4 = this.formatDate(this.SelectTime[0])+" ~ "+this.formatDate(this.SelectTime[1]);
            }
             var that = this;
             that.$Spin.show();
            axios({
                url: '/mysteel/workflow/task/list',
                method: 'get',
                params:{
                    page: this.pageNum,
                    pageSize: this.pageSize,
                    processDefKey:this.value1,
                    businessId:this.value2,
                    businessKey:this.value3,
                    completeDate:this.value4,
                    adminId:this.value5
                }

            }).then(function(resp) {
                statusZero(resp.data.status)
                        // console.log(resp);
                        that.tableData = resp.data.data.list;
                        that.dataCount = resp.data.data.total;
                        that.$Spin.hide();

            }).catch(err => {
                console.log(err);
                that.$Spin.hide();
            })
        },
        getSelectTime (data) {//获取修改时间
            this.value4 = data[0]+" ~ "+data[1];
        },
        // 远程搜索的方法
        newQueryEmployee(query){
            const self = this;
            if(query !== ''){
                this.loading = true;
                axios.get('/mysteel/workflow/user/list',{params:{userName:query}})
                .then((res)=>{
                statusZero(res.data.status)
                this.loading = false;
                self.employeeList = res.data.list;
                console.log(res.data.list)
                })
                .catch((error)=>{
                this.loading = false;
                    console.log(err);
                })
            }else{
                this.employeeList = [];
            }
        },
        queryEmployee (query) {
            const self = this
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                this.loading = false;
                axios.get('http://api.banksteel.com/erp/manage/base_data/select/employee',{
                    params: {
                        param: query
                    }
                }).then(res => {
                    self.employeeList = res.data;
                    // self.breedList = self.breedList.filter(item => item.breedName.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    //console.log(self.employeeList)

                }).catch(err => {
                    console.log(err)
                })
                }, 50);
            } else {
                this.employeeList = [];
            }
        }

    },


}
</script>


