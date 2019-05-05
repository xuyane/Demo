<style lang="less" scoped>
    @import './mesUnit.less';
    @import './taskplant.less';
    @import './mytaskReach.less';
/*
信息单元列表 关联指标
*/
</style>
<template>
           <!-- 相关信息单元弹窗 start-->
       <Modal v-model="relatedModal" title="相关信息单元" width="750"  @on-cancel="relatedCancel"> 
            <div class="unit" >
                <div class="unit_title">
                <span>信息单元</span>
                </div>         
                <div class="unit_content">
                <Form ref="contactform" :model="relationformItem" :label-width="120">            
                    <Row >
                    <Col span="12"><FormItem label="信息单元编码 : "><span>{{relationformItem.infromationCode}}</span></FormItem></Col>
                    <Col span="12"><FormItem label="信息单元名称 ："><span>{{relationformItem.infromationName}}</span></FormItem></Col>        
                    </Row> 
                </Form>
                </div>           
            </div>         
            <div class="unit" >
                <div class="unit_title">
                <span>相关信息单元</span>
                </div>
                <Table :columns="columns3" :data="tableData2"></Table>
            </div>
            <div slot="footer">
                <i-button type="primary" @click="closerelatedModal">返回</i-button>
            </div> 
        </Modal> 
        <!-- 相关信息单元弹窗 end -->
</template>
<script>
import { formData } from "../../../../assets/js/common.js";
import {
toRelationDetail
} from "./api/mesUnitList.js";
export default {
    name: "relationInformationTask",
     props: ["showRelationModal","linkerData"],
    data () {
        return {
            tableData2:[],
            // 关联指标结束
            columns3:[
                {
                    type:'index',
                    title:'序号',
                    align:'center',
                    width:100,
                },
                 {
                    title: '信息单元',
                    key: 'relationName',
                    align: 'center',
                    
                },
                {
                    title: '关联类型',
                    key: 'infromationTypeName',
                    align: 'center',
                    width: 150,
                },
            ],
            relatedModal:false,
            relationformItem:{
                infromationName:"",
                infromationCode:"" 
            },
        }
    },
    methods: 
    {      
       // 关联信息单元查看
        relatedInfoUnitTask()
        {
            this. relatedModal=true;
            let form = {
                taskId:this.$route.query.taskId,
                informationUnitId:this.$route.query.informationUnitId
            };
           toRelationDetail(formData(form)).then(res => {
            console.log(res);
            if(res.response.taskRelationVOList != null && res.response.taskRelationVOList.length > 0)
            {
                this.tableData2 = res.response.taskRelationVOList;
                console.log("相关信息单元",this.tableData2);
            }
            this.relationformItem = this.linkerData;
        });
        },
        closerelatedModal()
        {
            this.$emit('hide-Relation-Modal',false);
        },
        relatedCancel(){
            this.$emit('hide-Relation-Modal',false);
        }
    },
    watch:{
        showRelationModal(newV,oldV){
            this.relatedModal = newV;
        },
    }
}
</script>