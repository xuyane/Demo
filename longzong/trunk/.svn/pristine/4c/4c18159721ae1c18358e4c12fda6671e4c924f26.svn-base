<style lang="less" scoped>
    @import './mesUnit.less';
    @import './taskplant.less';
    @import './mytaskReach.less';
/*
信息单元列表 关联指标
*/
</style>
<template> 
  <!-- 已发布信息弹窗 -->
    <Modal v-model="publishedMessageModal" title="已发布信息" width="950" @on-cancel="messageCancel"> 
            <div class="unit" >
                <div class="unit_title">
                <span>信息单元</span>
                </div>         
                <div class="unit_content">
                <Form ref="messageform" :model="messageform" :label-width="120">            
                    <Row >
                    <Col span="12"><FormItem label="信息单元编码:">{{ messageform.infromationCode}}</FormItem></Col>
                    <Col span="12"><FormItem label="信息单元名称:">{{ messageform.infromationName}}</FormItem></Col>        
                    </Row> 
                </Form>
                </div>           
            </div>         
            <div class="unit" >
                <div class="unit_title publishedList">
                    <span>已发布信息列表</span>
                </div>
                <Form ref="formItemMessage" :model="formItemMessage" style="margin-top: 20px;"> 
                    <Row >
                        <Col span="6"><FormItem label="短讯标题: "  :label-width="80">
                            <Input v-model="formItemMessage.title" type="text" />
                            </FormItem>
                            </Col>
                        <Col span="6">
                         <FormItem label="发布人:" :label-width="100">
                        <Select
                            v-model="formItemMessage.publisherId"
                            ref="selectPublisherId"
                            filterable
                            remote
                            :remote-method="remoteMethodEmployee"
                            :loading="loadingEmploy">
                            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                        </FormItem></Col>
                        <Col span="6">
                        <FormItem label="发布时间:" :label-width="100">
                            <DatePicker type="daterange" v-model="formItemMessage.publishTime" placement="bottom-end" placeholder="请选择日期" style="width: 200px"></DatePicker>
                        </FormItem>
                        </Col>    
                        <Col span="6" class="text-right">
                            <Button type="primary" @click="SelectMessageList">查询</Button>
                            <Button style="margin-left: 8px" @click="resetMessageList">重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Table :columns="columns7" :data="data7"></Table>
                <Row>
                    <oil-page
                    :total="totalMessage"
                    :page-size="pageSizeMessage"
                    @page-change="pageChangeMessage"
                    :page-size-opts="pageSizeOptsMessage"
                    :show-sizer="showSizerMessage">
                    </oil-page>
                </Row>
            </div>
            <div slot="footer">
                <i-button type="primary" @click="closeMessageModal">返回</i-button>
            </div> 
        </Modal>
</template>
<script>
import { formData } from "../../../../assets/js/common.js";
import {
getEmployee
} from "./api/mesUnitList.js";
import axios from "axios";
import oilPage from "../../../components/page/page.vue"
export default {
    name: "publishMessageInformation",
     props: {
         showPublishMessageModal:Boolean,
         linkerData:Object},
    components: {
        oilPage
    },
    data () {
        return {
            publishedMessageModal:false,
            columns7:[ //已发布信息弹窗table
               {
                    title: '标题',
                    key:'title',
                    align: 'center',
                    minWidth: 250,
                },
                {
                    title: '发布人',
                    key: 'publisherName',
                    align: 'center',
                    minWidth: 200,
                },
                {
                    title: '所在部门',
                    key: 'departMentName',
                    align: 'center',
                    minWidth: 200,
                },
                {
                    title: '发布时间',
                    key: 'publishTimeName',
                    align: 'center',
                    minWidth: 250,
                }
            ],
            data7:[],
            messageform:{
            },
            formItemMessage:{
                publishTime:null,
                title:"",
                publisherId:null
            },
            totalMessage: 0,
            pageSizeMessage: 5,
            pageNumMessage: 1,
            showSizerMessage: true,
            pageSizeOptsMessage: [5, 10, 20],
            loadingEmploy:false,
            options1: [],
        }
    },
    methods: 
    {      
        toMessageInformationList()
        {
            this.messageform = this.linkerData;
            this.toMessageList();
        },
        toMessageList()
        {
            let time = this.formItemMessage.publishTime;
            let startTime =null;
            let endTime = null;
             this.$Spin.show();
             if(time != null)
             {
                 startTime = new Date(time[0]).getTime();
                 console.log("endTime",time[1]);
                 endTime = new Date(time[1]).getTime();
             }
            axios.post('/information/unit/my_publish_list',{
                title:this.formItemMessage.title,
                startTime:startTime,
                endTime:endTime,
                informationUnitId:this.$route.query.informationUnitId,
                pageNum: this.pageNumMessage,
                pageSize: this.pageSizeMessage,
                status:3,
                publisherId:this.formItemMessage.publisherId
            }).then(res => {
                if(res.status === 200) {
                    console.log('data7',res);
                    this.data7 = res.data.response.list;
                    this.totalMessage = res.data.response.total;
                    console.log("this.linkerData222",res.data.response.list);
                    console.log("this7777",res.data.response.list);
                }
                this.$Spin.hide();
            }).catch(err => {
                console.log(err)
                this.$Spin.hide();
            })
        },
        SelectMessageList(){
            this.pageNumMessage=1;
            this.toMessageList();
        },
              // 监听分页
        pageChangeMessage (page, pageSize) {
            if(page) {
                this.pageNumMessage = page
            }
            if(pageSize) {
                this.pageSizeMessage = pageSize
            }
            this.toMessageList();
        },

        closeMessageModal()
        {
            this.$emit('hide-Publish-Message-Modal',false);
            this.resetMessageList();
        },
        messageCancel(){
            this.$emit('hide-Publish-Message-Modal',false);
            this.resetMessageList();
        },
        resetMessageList()
        {
            this.formItemMessage.title = "";
            this.formItemMessage.publisherId = "";
            this.formItemMessage.publishTime = "";
            this.$refs['selectPublisherId'].$data.query='';
        },
        remoteMethodEmployee (query) {
         console.log("1 this.distributionTask1",  this.distributionTask1)
        if (query !== '') {
            this.loadingEmploy = true;
            let params = {
              name:query
            }
            setTimeout(() => {
                this.loadingEmploy = false;
                getEmployee(formData(params)).then(res =>{
                    // console.log(res);
                  const list1 = res.response.map(item => {
                      return {
                          value: item.id,
                          label: item.text
                      };
                  });
                  this.options1 = list1
                })
            }, 200); 
        } else {
            this.options1 = [];
        }
    },
    },
    watch:{
        showPublishMessageModal(newV,oldV){
            this.publishedMessageModal = newV;
        },
    }
}
</script>
