<style lang="less" scoped>
    @import './mesUnit.less';
    @import '../taskplant/taskplant.less';
    @import '../mytaskReach/mytaskReach.less';
/*
信息单元列表 关联指标
*/
</style>
<template> 
  <!-- 已发布信息弹窗 -->
    <Modal v-model="publishedModal" title="已发布信息" width="950" @on-cancel="piulishCancel"> 
            <div class="unit" >
                <div class="unit_title">
                <span>信息单元</span>
                </div>         
                <div class="unit_content">
                <Form ref="publishedform" :model="publishedform" :label-width="120">            
                    <Row >
                    <Col span="12"><FormItem label="信息单元编码 : ">{{ publishedform.infromationCode}}</FormItem></Col>
                    <Col span="12"><FormItem label="信息单元名称 ：">{{ publishedform.infromationName}}</FormItem></Col>        
                    </Row> 
                </Form>
                </div>           
            </div>         
            <div class="unit" >
                <div class="unit_title publishedList">
                    <span>已发布信息列表</span>
                </div>
                <Form ref="basicform" :model="formItem" style="margin-top: 20px;"> 
                    <Row >
                        <Col span="8"><FormItem label="标题 : "  :label-width="80"><Input v-model="formItem.title" type="text" /></FormItem></Col>
                        <Col span="8"><FormItem label="关键字 ："  :label-width="80"><Input v-model="formItem.keyword" type="text" /></FormItem></Col>
                        <Col span="8">
                        <FormItem label="发布时间 ：" :label-width="100">
                            <DatePicker type="daterange" v-model="formItem.publishTime" placement="bottom-end" placeholder="Select date" style="width: 200px" disabled></DatePicker>
                        </FormItem>
                        </Col>    
                    </Row>
                    <Row type="flex" justify="space-between">
                        <Col span="16" class="text-right">
                            <Button type="primary" @click="toPublishList">查询</Button>
                            <Button style="margin-left: 8px" @click="resetPublishList">重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Table :columns="columns4" :data="data4"></Table>
                <Row>
                    <oil-page
                    :total="totalPublish"
                    :page-size="pageSizePublish"
                    @page-change="pageChangePublish"
                    :page-size-opts="pageSizeOptsPublish"
                    :show-sizer="showSizerPublish">
                    </oil-page>
                </Row>
            </div>
            <div slot="footer">
                <i-button type="primary" @click="closePublishModal">返回</i-button>
            </div> 
        </Modal>
</template>
<script>
import { formData } from "../../../assets/js/common.js";
import {
toPublishList
} from "./api/mesUnitList.js";
import axios from "axios";
import oilPage from "../../components/page/page.vue"
export default {
    name: "publishInformation",
     props: ["showPublishModal","linkerData"],
    components: {
        oilPage
    },
    data () {
        return {
            publishedModal:false,
                  columns4:[ //已发布信息弹窗table
                {
                    title: '文章ID',
                    key: 'id',
                    align: 'center',
                    width: 150,
                },
                {
                    title: '标题',
                    key: 'title',
                    align: 'center',
                },
                {
                    title: '关键字',
                    key: 'keyword',
                    align: 'center',
                    width: 140,
                },
                {
                    title: '发布人',
                    key: 'publishMan',
                    align: 'center',
                    width: 100,
                },
                {
                    title: '发布时间',
                    key: 'publishTimeName',
                    align: 'center',
                    width: 150,
                }
            ],
            data4:[],
            publishedform:{
            },
            formItem:{
                infoType:"",
                publishTime:null,
            },
            totalPublish: 0,
            pageSizePublish: 10,
            pageNumPublish: 1,
            showSizerPublish: true,
            pageSizeOptsPublish: [5, 10, 20, 30],
        }
    },
    methods: 
    {      
        toPublishInformationList()
        {
            this.publishedform = this.linkerData;
            this.toPublishList();
        },
        toPublishList()
        {
            let time = this.formItem.publishTime;
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
                title:this.formItem.title,
                keyword:this.formItem.keyword,
                startTime:startTime,
                endTime:endTime,
                informationUnitId:this.$route.query.informationUnitId,
                pageNum: this.pageNumPublish,
                pageSize: this.pageSizePublish,
                status:1
            }).then(res => {
                if(res.status === 200) {
                    this.data4 = res.data.response.list;
                    this.totalPublish = res.data.response.total;
                    console.log("this.linkerData",this.linkerData);
                }
                this.$Spin.hide();
            }).catch(err => {
                console.log(err)
                this.$Spin.hide();
            })
        },
              // 监听分页
        pageChangePublish (page, pageSize) {
            if(page) {
                this.pageNumPublish = page
            }
            if(pageSize) {
                this.pageSizePublish = pageSize
            }
            this.toPublishList();
        },

        closePublishModal()
        {
            this.resetPublishList();
            this.$emit('hide-Publish-Modal',false);
        },
        piulishCancel(){
            this.$emit('hide-Publish-Modal',false);
        },
        resetPublishList()
        {
            this.formItem.title = "";
            this.formItem.keyword = "";
            this.formItem.publishTime = "";
        }
    },
    watch:{
        showPublishModal(newV,oldV){
            this.publishedModal = newV;
        },
    }
}
</script>
