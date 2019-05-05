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
    <Modal v-model="publishedShortModal" title="已发布信息" width="950" @on-cancel="ShortCancel"> 
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
                <Form ref="basicform" :model="formItemShort" style="margin-top: 20px;"> 
                    <Row >
                        <Col span="6"><FormItem label="短信内容: "  :label-width="80"><Input v-model="formItemShort.content" type="text" /></FormItem></Col>
                        <Col span="6">
                         <FormItem label="发布人 ：" :label-width="100">
                        <Select
                            v-model="formItemShort.publisherId"
                            filterable
                            remote
                            :remote-method="remoteMethodEmployee"
                            :loading="loadingEmploy">
                            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                        </FormItem></Col>
                        <Col span="6">
                        <FormItem label="发布时间 ：" :label-width="100">
                            <DatePicker type="daterange" v-model="formItemShort.publishTime" placement="bottom-end" placeholder="Select date" style="width: 200px" disabled></DatePicker>
                        </FormItem>
                        </Col>    
                        <Col span="6" class="text-right">
                            <Button type="primary" @click="toShortList">查询</Button>
                            <Button style="margin-left: 8px" @click="resetShortList">重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Table :columns="columns8" :data="data8"></Table>
                <Row>
                    <oil-page
                    :total="totalShort"
                    :page-size="pageSizeShort"
                    @page-change="pageChangeShort"
                    :page-size-opts="pageSizeOptsShort"
                    :show-sizer="showSizerShort">
                    </oil-page>
                </Row>
            </div>
            <div slot="footer">
                <i-button type="primary" @click="closeShortModal">返回</i-button>
            </div> 
        </Modal>
</template>
<script>
import { formData } from "../../../assets/js/common.js";
import {
toPublishList,
getEmployee
} from "./api/mesUnitList.js";
import axios from "axios";
import oilPage from "../../components/page/page.vue"
export default {
    name: "publishShortInformation",
     props: ["showPublishShortModal","linkerData"],
    components: {
        oilPage
    },
    data () {
        return {
            publishedShortModal:false,
                columns8:[ //已发布信息弹窗table
                {
                    title: '短信内容',
                    key: 'content',
                    align: 'center',
                    minWidth: 250,
                },
                {
                    title: '发布人',
                    key: 'publishMan',
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
            data8:[],
            publishedform:{
            },
            formItemShort:{
                publishTime:null,
                publisherId:null
            },
            totalShort: 0,
            pageSizeShort: 10,
            pageNumShort: 1,
            showSizerShort: true,
            pageSizeOptsShort: [5, 10, 20, 30],
            loadingEmploy:false,
            options1: [],
        }
    },
    methods: 
    {      
        toShortInformationList()
        {
            this.publishedform = this.linkerData;
            this.toShortList();
        },
        toShortList()
        {
            let time = this.formItemShort.publishTime;
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
                content:this.formItemShort.content,
                publisherId:this.formItemShort.publisherId,
                startTime:startTime,
                endTime:endTime,
                informationUnitId:this.$route.query.informationUnitId,
                pageNum: this.pageNumShort,
                pageSize: this.pageSizeShort,
                status:1
            }).then(res => {
                if(res.status === 200) {
                    this.data8 = res.data.response.list;
                    this.totalShort = res.data.response.total;
                    console.log("this.linkerData",this.linkerData);
                }
                this.$Spin.hide();
            }).catch(err => {
                console.log(err)
                this.$Spin.hide();
            })
        },
              // 监听分页
        pageChangeShort (page, pageSize) {
            if(page) {
                this.pageNumShort = page
            }
            if(pageSize) {
                this.pageSizeShort = pageSize
            }
            this.toShortList();
        },

        closeShortModal()
        {
            this.$emit('hide-Publish-Short-Modal',false);
            this.resetShortList();
        },
        ShortCancel(){
            this.$emit('hide-Publish-Short-Modal',false);
            this.resetShortList();
        },
        resetShortList()
        {
            this.formItemShort.content = "";
            this.formItemShort.publisherId = "";
            this.formItemShort.publishTime = "";
        },
        remoteMethodEmployee (query) {
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
        showPublishShortModal(newV,oldV){
            this.publishedShortModal = newV;
        },
    }
}
</script>