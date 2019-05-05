<style lang="less" scoped>
    @import './mesUnit.less';
    @import '../taskplant/taskplant.less';
    @import '../mytaskReach/mytaskReach.less';
/*
信息单元列表 关联指标
*/
</style>
<template>
<Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：信息发布管理&nbsp;&nbsp;>>&nbsp;&nbsp;信息单元列表&nbsp;&nbsp;>>&nbsp;&nbsp;关联指标
      </Row>
    </Col>
     <Col span="24" class="plant-content">
        <!--人员信息start-->
        <div class="unit">
            <div class="unit_title">
                <span>人员信息</span>
            </div>
            <div class="unit_content">
                <div class="unit_content_left">
                    <div class="unit_s_left">信息单元编码：</div>
                    <div class="unit_s_right" >{{ infromationCode }}</div>
                </div>
                <div class="unit_content_left no_line">
                    <div class="unit_s_left">信息单元名称：</div>
                    <div class="unit_s_right no-right-border" >{{ infromationName }}</div>
                </div>
            </div>
            <div class="height-50">
                <Col class="border-up-no"> 
                    <Button  class="margin-zy20px" @click="basicInformation">基本信息</Button>
                    <Button  class="margin-zy20px" @click="infoContacts">信息联系人</Button>
                    <Button  class="margin-zy20px" @click="relatedInfoUnit">相关信息单元</Button>
                    <Button  class="margin-zy20px" @click="publishedInfo">已发布信息</Button>
                </Col>
            </div>
        </div>
        <!--人员信息end-->
        <Row>
            <Col span="24" class="text-align-center font-size1 height-50">关联指标</Col>
            <Col span="24">
                <Table class="tableCommon" border :columns="columns1" :data="data6"></Table>
            </Col>
            <Col span="24" class="text-align-center height-50">
                <Button type="primary" class="margin-zy20px"  @click="saveTaskQuotaRelation">保存</Button>
                <Button type="primary" class="margin-zy20px" @click="cancelTaskQuotaRelation">取消</Button>
            </Col>
        </Row>
        <!-- 已发布信息弹窗结束 -->
        <to-base-information-detail-modal :showDetailModal="showDetailModal" @hide-Modal="hideDetailModal" ref="baseIfo" ></to-base-information-detail-modal>
        <to-base-information-linker-detail-modal :showLinkerDetailModal="showLinkerDetailModal" :linkerData="linkerData" @hide-linker-Modal="hideLinkerDetailModal" ref="linkerIfo" ></to-base-information-linker-detail-modal>
        <to-base-information-relation-modal :showRelationModal="showRelationModal" :linkerData="linkerData" @hide-Relation-Modal="hideRelationModal" ref="relationIfo" ></to-base-information-relation-modal>
        <to-base-information-publish-modal :showPublishModal="showPublishModal" :linkerData="linkerData" @hide-Publish-Modal="hidePublishModal" ref="publishIfo" ></to-base-information-publish-modal>
        <!--短信-->
        <to-base-information-publish-short-modal :showPublishShortModal="showPublishShortModal" :linkerData="linkerData" @hide-Publish-Short-Modal="hidePublishShortModal" ref="publishShortIfo" ></to-base-information-publish-short-modal>
        <!--短讯-->
        <to-base-information-publish-message-modal :showPublishMessageModal="showPublishMessageModal" :linkerData="linkerData" @hide-Publish-Message-Modal="hidePublishMessageModal" ref="publishMessageIfo" ></to-base-information-publish-message-modal>
    </Col>
</Row>
</template>
<script>
import toBaseInformationDetailModal from "./baseTaskInformation.vue";
import toBaseInformationLinkerDetailModal from "./informationLinker.vue";
import toBaseInformationRelationModal from "./relationInformationTask.vue";
import toBaseInformationPublishModal from "./publishInformation.vue";
import toBaseInformationPublishShortModal from "./publishShortInformation.vue";
import toBaseInformationPublishMessageModal from "./publishMessageInformation.vue";
import {
  getTaskQuotaRelation,
  saveTaskQuotaRelation,
  toRelationDetail,
  findInformationType
} from "./api/mesUnitList.js";
import { formData } from "../../../assets/js/common.js";

export default {
    name:"mesUnitList",
components: {
    toBaseInformationDetailModal,
    toBaseInformationLinkerDetailModal,
    toBaseInformationRelationModal,
    toBaseInformationPublishModal,
    toBaseInformationPublishShortModal,
    toBaseInformationPublishMessageModal
  },
    data () {
        return {
            infromationCode:"",
            infromationId:"",
            infromationName:"",
            linkerData:{},
            showDetailModal: false,
            showLinkerDetailModal:false,
            showRelationModal: false,
            showPublishModal:false,
            showPublishShortModal:false,
            showPublishMessageModal:false,
            // 关联指标开始
            quotaCode:"",
            quotaName:"",
            dataCenterCode:"",
            taskId:"",
      
            columns1: [
                {
                    title: '指标源码',
                    key: 'quotaCode',
                    render: (h, data) => {
                        let that = this;
                        return h('Input',{
                            props:{
                                type:'text',
                                value:data.row.quotaCode //此处如何让数据双向绑定
                            },
                            on:{
                                'on-blur':(event) => {
                                    console.log(event);
                                    // data.row.quotaCode = event.target.value
                                    that.data6[data.index].quotaCode = event.target.value;
                                }
                            }
                        })
                    }
                },
                {
                    title: '指标名称',
                    key: 'quotaName',
                    render: (h, data) => {
                        let that = this;
                        return h('Input',{
                            props:{
                                type:'text',
                                value:data.row.quotaName//此处如何让数据双向绑定
                            },
                            on:{
                                'on-blur':(event) => {
                                    console.log(event)
                                    that.data6[data.index].quotaName = event.target.value;
                                }
                            }
                        })
                    }
                },
                {
                    title: '数据中心指标编码',
                    key: 'dataCenterCode',
                    render: (h, data) => {
                        let that = this;
                        return h('Input',{
                            props:{
                                type:'text',
                                value:data.row.dataCenterCode //此处如何让数据双向绑定
                            },
                            on:{
                                'on-blur':(event) => {
                                    console.log(event)
                                    that.data6[data.index].dataCenterCode = event.target.value;
                                }
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, data) => {
                    return h('div', [
                        h('span', {
                            class:  "icon-add",
                            style:{
                                float:"left",
                                marginTop:'7px'
                            }
                        }),
                        h('div', {
                            style: {
                            marginRight: '8px',
                            cursor: 'pointer',
                            color:'#84AF2C',
                            float:'left'
                            },
                            on: {
                            click: () => {
                                this.write(data)
                            }
                            }
                        }, '增加'),
                        h('span', {
                            class:  "icon-remove",
                            style:{
                                float:"left",
                                marginTop:'7px'
                            }
                        }),
                        h('div', {
                            style: {
                            marginRight: '8px',
                            color: '#145edb',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            color:'#F42C2C'
                            },
                            on: {
                            click: () => {
                                this.delete(data)
                            }
                            }
                        }, '删除')
                    ])
                }
                }
            ],
            data6: [
                {
                    quotaCode: "",
                    quotaName: "",
                    dataCenterCode: ""
                }
            ]
        }
    },
    created() {
    this.getTaskQuotaRelation();
  },
    methods: {
        getTaskQuotaRelation()
        {
             let form = {
                taskId : this.$route.query.taskId,
                informationUnitId:this.$route.query.informationUnitId
             };
             console.log('11111',this.$route.query.informationUnitId);
             this.taskId =  this.$route.query.taskId;
            getTaskQuotaRelation(formData(form)).then(res => {
                console.log(res);
                if(res.response.quotaVOList != null && res.response.quotaVOList.length > 0)
                {
                    this.data6 = res.response.quotaVOList;
                }
               this.infromationId = res.response.id;
               this.infromationCode = res.response.code;
               this.infromationName = res.response.name;
               let obj = {
                   infromationName : res.response.name,
                   infromationCode : res.response.code
               }
               this.linkerData = obj;
            });
        },

        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        remove (index) {
            this.data6.splice(index, 1);
        },
        write () {
            let obj1 = {
                quotaCode: "",
                quotaName: "",
                dataCenterCode: ""
            }
            this.data6.push(obj1)
        },
        delete (data) {
            console.log(data);
            this.data6.length <= 1 ? this.$Message.warning('已经最后一行了') : this.dataTable.splice(data.index,1); 
        },
        saveTaskQuotaRelation()
        {
            console.log("data6", this.data6);
            var myArray=new Array();
            this.data6.forEach((item, index) => {
                let qutarelation = {
                    taskId:this.taskId,
                    quotaCode:item.quotaCode,
                    quotaName:item.quotaName,
                    dataCenterCode:item.dataCenterCode
                };
                myArray[index] = qutarelation;

                });
                let dataForm = {
                    quotaVOList : myArray
                }

           saveTaskQuotaRelation(dataForm).then(res => {
               if(res.status == 200)
               {
                    let that = this;
                    that.$Message.success("信息单元关联指标成功");
                    this.$Spin.show();
                    that.$router.push({name:"unitMangement"});
               }
               else
               {
                    that.$Message.success("信息单元关联指标出现异常");
               }
               
        });
        },
        cancelTaskQuotaRelation()
        {
            this.$router.push({name:"unitMangement"});
        },

        // 跳转基本信息
        basicInformation()
        {
            this.showDetailModal = true;
            this.$refs.baseIfo.toInformationDetailRequest();
        },
        // 隐藏基本信息
        hideDetailModal(data){
            this.showDetailModal = data;
        },
        // 跳转信息单元联系人
        infoContacts()
        {
            this.showLinkerDetailModal = true;
            this.$refs.linkerIfo.getListPage();
        },
        // 隐藏信息联系人
        hideLinkerDetailModal(data)
        {
            this.showLinkerDetailModal = data;
        },
        // 跳转相关信息单元
        relatedInfoUnit()
        {
            this.showRelationModal = true;
            this.$refs.relationIfo.relatedInfoUnitTask();
        },
        // 隐藏相关信息
        hideRelationModal(data)
        {
            this.showRelationModal = data;
        },
        // 已发布信息
        publishedInfo(){
            console.log("123",213131);
            let form = {
                informationUnitId:this.$route.query.informationUnitId
             };
            findInformationType(formData(form)).then(res => {
                console.log("res",res);
                if(res.status == 200)
                {
                    if(res.response != null)
                    {
                         // 文章
                        if(res.response == 1)
                        {
                            this.showPublishModal=true;
                            this.$refs.publishIfo.toPublishInformationList();
                        }
                        else if(res.response == 2) // 短信
                        {
                            this.showPublishShortModal=true;
                            this.$refs.publishShortIfo.toShortInformationList();
                        }
                        else
                        {
                            this.showPublishMessageModal=true;  // 短讯
                            this.$refs.publishMessageIfo.toMessageInformationList();
                        }
                    }
                }
            })
        },
        // 隐藏已发布文章信息
        hidePublishModal(data)
        {
            this.showPublishModal = data;
        },

        // 隐藏已发布短息信息
        hidePublishShortModal(data)
        {
            this.showPublishShortModal = data;
        },

        // 隐藏已发布短讯信息
        hidePublishMessageModal(data)
        {
            this.showPublishMessageModal = data;
        }
    }
}
</script>    