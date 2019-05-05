<style lang="less" scoped>
    @import './mesUnit.less';
    @import './taskplant.less';
    @import './mytaskReach.less';
    .info-detail{
        border-left: 1px solid #ddd;
        width: 80%;
        height: 150px;
    }
    .ivu-input{
        color: black !important;
    }
/*
信息单元列表 关联指标
*/
</style>
<template >
 <!-- 基本信息弹窗 -->
       <Modal v-model="basicModal" title="信息单元" width="750" @on-cancel="cancel"> 
        <div class="unit" >
            <div class="unit_title">
            <span>基本信息</span>
            </div>         
            <div>
            <Form ref="basicform" :model="formItem" :label-width="120">  
                <FormItem label="信息单元编码:">
                    <span>{{formItem.code}}</span>
                </FormItem> 
                 <FormItem label="信息单元名称:"><span>{{formItem.name}}</span></FormItem> 
                 <FormItem label="站点:">
                       <span>{{formItem.siteName}}</span>
                    </FormItem>
                     <FormItem label="信息大类:"><span>{{formItem.typeName}}</span></FormItem>  
                 <FormItem label="产品:"><span>{{formItem.productName}}</span></FormItem>
                 <FormItem label="关联的信息分类:">
                     <Row >
                    <Col>
                        <div class="info-detail" >
                        <p v-for=" (item,index) in infromationList" :key="index">
                            <span>{{item}}</span>
                        </p>
                        </div>
                    </Col>
                </Row>
                </FormItem> 
                 <FormItem label="关联的品种:">
                        <Row >
                    <Col>
                        <div class="info-detail" >
                        <p v-for=" (item,index) in breedList" :key="index">
                            <span>{{item}}</span>
                        </p>
                        </div>
                    </Col>
                </Row>
                </FormItem> 
                 <FormItem label="关联的区域:">
                      <Row >
                    <Col>
                        <div class="info-detail" >
                        <p v-for=" (item,index) in areaList" :key="index">
                            <span>{{item}}</span>
                        </p>
                        </div>
                    </Col>
                </Row>
                </FormItem> 
                <FormItem label="关联的企业:">
                     <Row >
                    <Col>
                        <div class="info-detail" >
                        <p v-for=" (item,index) in enterpriseList" :key="index">
                            <span>{{item}}</span>
                        </p>
                        </div>
                    </Col>
                </Row>
                </FormItem> 
                
                <FormItem label="前端是否展示:"><span>{{formItem.isShowName}}</span></FormItem>
                 <FormItem label="节假日是否展示:"><span>{{formItem.isHolidayShowName}}</span></FormItem> 
                  <FormItem label="默认关键字:">
                      <!-- <div class="info-detail" style="height:auto">
                          <p>{{formItem.defaultKeyword}}</p>
                      </div> -->
                    <Input v-model="formItem.defaultKeyword" style="width:80%" type="textarea" disabled :rows="3"/>
                      <!-- <span>{{formItem.defaultKeyword}}</span>  -->
                      </FormItem>
                   <FormItem label="默认文章摘要:">
                    <Input v-model="formItem.defaultSummary" style="width:80%" type="textarea" disabled :rows="3"/>
                </FormItem>
                   <FormItem label="默认信息来源:">
                       <span>{{formItem.defaultSource}}</span>
                    </FormItem>
                <!-- <Row >
                    <Col span="12">
                        <FormItem label="信息单元编码 : "><span>{{formItem.code}}</span></FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="信息单元名称 : "><span>{{formItem.name}}</span></FormItem>
                    </Col>     
                    <Col span="12">
                        <FormItem label="关联的信息分类 : ">
                            <Col v-for="(item,index) in infromationList" :key="index">
                                <div>{{item}}</div>
                            </Col>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="关联的品种 ：">
                            <Col v-for="(item,index) in breedList" :key="index">
                                <div>{{item}}</div>
                            </Col>
                        </FormItem>
                    </Col>        
                    <Col span="12">
                        <FormItem label="关联的区域 : ">
                            <Col v-for="(item,index) in areaList" :key="index">
                                <div>{{item}}</div>
                            </Col>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="关联的企业 ：">
                            <Col v-for="(item,index) in  enterpriseList" :key="index">
                                <div>{{item}}</div>
                            </Col>
                        </FormItem>
                    </Col>
                     <Col span="12">
                        <FormItem label="信息大类 : "><span>{{formItem.typeName}}</span></FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="产品 : "><span>{{formItem.productName}}</span></FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="前端是否展示 : "><span>{{formItem.isShowName}}</span></FormItem>
                    </Col>
                     <Col span="12">
                        <FormItem label="节假日是否展示 : "><span>{{formItem.isHolidayShowName}}</span></FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="默认关键字 : "><span>{{formItem.defaultKeyword}}</span> </FormItem>
                    </Col> 
                    <Col span="24">
                        <FormItem label="默认文章摘要 : ">
                            <Input v-model="formItem.defaultSummary" type="textarea" :rows="3"/>
                        </FormItem>
                    </Col>    
                </Row>
                 -->
            </Form>
            </div>           
        </div>         
        <div class="unit" >
            <div class="unit_title">
            <span>任务信息</span>
            </div>
            <div class="btn-modal unit_content">
            <Form ref="basicform" :model="formItem">
                <Col span="8">
                    <FormItem label="发布周期:"><span>{{formItem.taskCycleName}}</span> </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="最晚发布时间点:"><span>{{formItem.checkTime}}</span> </FormItem>
                </Col> 
                <Col span="8">
                    <FormItem label="任务责任人:"><span>{{formItem.executorName}}</span> </FormItem>
                </Col> 
            </Form>
            </div>
        </div>
        <div slot="footer">
            <i-button type="primary" @click="closeModal">返回</i-button>
        </div> 
        </Modal>
        <!-- 基本信息弹窗结束 -->
</template>
<script>
import { formData } from "../../../../assets/js/common.js";
import {
  toInfromationDetail
} from "./api/mesUnitList.js";
export default {
    name: "showDetailModal",
     props: ["showDetailModal"],
    data () {
        return {
            formItem:{
                name:"",
                code:"",
                siteName:"",
                isShowName:"",
                defaultSummary:"",
                defaultKeyword:"",
                checkTime:"",
                executorName:"",
                taskCycleName:""
            },
            basicModal:false,
            infromationList:[],
            breedList:[],
            areaList:[],
            enterpriseList:[],
        }
    },
    created()
    {
        // this.toInformationDetailRequest();
    },
    methods: 
    {      
        toInformationDetailRequest()
        {
            let form = {
                formationUnitId: this.$route.query.informationUnitId,
            };
            toInfromationDetail(formData(form)).then(res => {
               //  debugger
                if(res.status == 200)
                {
                    if(res.response.infoInformationUnitRelationList != null && res.response.infoInformationUnitRelationList.length > 0 )
                    {
                        var myArray1=new Array();
                        var myArray2=new Array();
                        var myArray3=new Array();
                        var myArray4=new Array();
                        // 关联关系，0表示与信息分类的关联关系，1表示与品种的关联关系，2表示与区域的关联关系，3表示与企业的关联关系
                        res.response.infoInformationUnitRelationList.forEach((item, index) => {
                         //   debugger
                            if(item.relationType == 0)
                            {
                                myArray1.push(" "+ item.roadName);
                            }
                            else if(item.relationType == 1)
                            {
                                 myArray2.push(" "+item.roadName);
                            }
                            else if(item.relationType == 2)
                            {
                                myArray3.push(" "+item.roadName);
                            }
                            else
                            {
                                 myArray4.push(" "+item.roadName);
                            }
                        });

                        this.infromationList = myArray1,
                        this.breedList= myArray2,
                        this.areaList = myArray3,
                        this.enterpriseList = myArray4
                    }
                     this.formItem = res.response;
                     console.log(this.formItem)
                }
            });
        },
        closeModal()
        {
            this.$emit('hide-Modal',false);
        },
        cancel(){
            this.$emit('hide-Modal',false);
        }
    },
    watch:{
        showDetailModal(newV,oldV){
            this.basicModal = newV;
        },
    }
}
</script>