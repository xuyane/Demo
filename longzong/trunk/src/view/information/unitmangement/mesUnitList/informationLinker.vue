<style lang="less" scoped>
    @import './mesUnit.less';
    @import './taskplant.less';
    @import './mytaskReach.less';
/*
信息单元列表 关联指标
*/
</style>
<template>
         <!-- 联系人信息弹窗 -->
         <Modal v-model="contactModal" title="信息联系人" width="850" @on-cancel="cancelLinker">
            <div class="unit" >
                <div class="unit_title">
                <span>信息单元</span>
                </div>
                <div class="unit_content">
                <Form ref="contactform" :model="formItemLinker" :label-width="120">
                    <Row >
                    <Col span="12"><FormItem label="信息单元编码 : "><span>{{formItemLinker.code}}</span></FormItem></Col>
                    <Col span="12"><FormItem label="信息单元名称 ："><span>{{formItemLinker.name}}</span></FormItem></Col>
                    </Row>
                </Form>
                </div>
            </div>
            <div class="unit" >
                <div class="unit_title">
                    <span>联系人列表</span>
                </div>
                <Table
                    :data="tableData1"
                    :columns="columns2"
                    ref="dragTable"
                    :stripe="true"
                    :border="true">
                </Table>
                <Row>
                <oil-page
                :total="total"
                :page-size="pageSize"
                @page-change="pageChange"
                :page-size-opts="pageSizeOpts"
                :show-sizer="showSizer">
                </oil-page>
                </Row>
            </div>
            <div slot="footer">
                <i-button type="primary" @click="closeLinkerModal">返回</i-button>
            </div>
        </Modal>
        <!-- 联系人信息弹窗结束 -->
</template>
<script>
import { formData } from "../../../../assets/js/common.js";
import axios from "axios";
import oilPage from "../../../components/page/page.vue"
import {

} from "./api/mesUnitList.js";
import dial from '@/assets/js/linkDial.js';
export default {
    name: "showLinkerDetailModal",
    props: ["showLinkerDetailModal","linkerData"],
    components: {
        oilPage
    },
    data () {
        return {
            // 联系人
            formItemLinker:{
                name:"",
                code:""
            },
              columns2:[ //联系人信息table
                 {
                    key: "name",
                    title: "姓名",
                    align: "center",
                    minWidth: 100
                 },
                {
                    title: '性别',
                    key: 'sex',
                    align: 'center',
                    width: 50,
                    render:(h,data)=>{
                        return h("span",data.row.sex === 1 ? '女' : '男');
                    }
                },
                {
                    title: '部门',
                    key: 'department',
                    align: 'center',
                    width: 100,
                },
                {
                    title: '职位',
                    key: 'position',
                    align: 'center',
                    width: 150,
                },
                {
                    title: '联系电话号码',
                    key: 'phone',
                    align: 'center',
                    width: 150,
                    render: (h, params) => {
                        let that = this;
                        if(params.row.phone.indexOf(",")>0){
                        var arrayStr = params.row.phone.split(',');
                        return h('div',arrayStr.map(function(item,index){
                            console.log('ceshi',item);
                            return h('p', {
                                style:{
                                disPlay:'block',
                                cursor:'pointer',
                                color:'#2d8cf0'
                                },
                                on: {
                                click: () => {
                                    that.onDial(item);
                                }
                                },
                            }, arrayStr.length-1==index ? item+'' : item+',')
                        }))
                        }else{
                        if(params.row.phone){
                            return h('div', [
                            // h('span',params.row.mobile),
                            h('a', {
                                style:{
                                // paddingLeft:'5px'
                                },
                                on: {
                                click: () => {
                                    this.call(params.row.phone);
                                }
                                },
                            }, params.row.phone),
                            ])
                        }
                        }
                    }
                },
                {
                    title: '手机号码',
                    key: 'mobile',
                    align: 'center',
                    width: 150,
                    render: (h, params) => {
                        let that = this;
                        if(params.row.mobile.indexOf(",")>0){
                        var arrayStr = params.row.mobile.split(',');
                        return h('div',arrayStr.map(function(item,index){
                            console.log('ceshi',item);
                            return h('p', {
                                style:{
                                disPlay:'block',
                                cursor:'pointer',
                                color:'#2d8cf0'
                                },
                                on: {
                                click: () => {
                                    that.call(item);
                                }
                                },
                            }, arrayStr.length-1==index ? item+'' : item+',')
                        }))
                        }else{
                        if(params.row.mobile){
                            return h('div', [
                            // h('span',params.row.mobile),
                            h('a', {
                                style:{
                                // paddingLeft:'5px'
                                },
                                on: {
                                click: () => {
                                    this.call(params.row.mobile);
                                }
                                },
                            }, params.row.mobile),
                            ])
                        }
                        }
                    }
                },
                {
                    title: '所在公司',
                    key: 'enterpriseName',
                    align: 'center',
                    width:300
                },
            ],
            tableData1:[],
            contactModal:false,
            total: 0,
            pageSize: 5,
            pageNum: 1,
            showSizer: true,
            pageSizeOpts: [5, 10, 20],
        }
    },
    created()
    {
        // this.toInformationDetailRequest();
    },
    methods:
    {
      call(data) {
        if (!data) return;
        dial(data);
      },

        // 监听分页
        pageChange (page, pageSize) {
            if(page) {
                this.pageNum = page
            }
            if(pageSize) {
                this.pageSize = pageSize
            }
            this.getListPage();
        },
         // 获取我的联系人列表
        getListPage () {
            this.$Spin.show();
            axios.post('/information/contacts/list',{
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name:this.value1,
                sex:this.value2,
                mobile:this.value3,
                enterpriseName:this.value4,
                taskId:this.$route.query.taskId,
            }).then(res => {
                if(res.status === 200) {
                    console.log("联系人列表",res)
                    this.tableData1 = res.data.response.list;
                    this.total = res.data.response.total;
                    this.formItemLinker.code = this.linkerData.infromationCode;
                    this.formItemLinker.name = this.linkerData.infromationName;

                    console.log("this.linkerData",this.linkerData);
                }
                this.$Spin.hide();
            }).catch(err => {
                console.log(err)
                this.$Spin.hide();
            })
        },

        // 关闭
        closeLinkerModal()
        {
            this.$emit('hide-linker-Modal',false);
        },
        cancelLinker(){
            this.$emit('hide-linker-Modal',false);
        }
    },
    watch:{
        showLinkerDetailModal(newV,oldV){
            this.contactModal = newV;
        },
    }
}
</script>
