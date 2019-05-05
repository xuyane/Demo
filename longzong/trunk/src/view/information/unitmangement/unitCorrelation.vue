<style lang="less" scoped>
@import './informationSource.less';
.unit .unit_title span,.unit_content{
    width: 100%;
}
.unit_content .unit_content_left{
    width: 50%
}
.unit_content .unit_s_left{
    width: 40%;
}
.unit_content .unit_s_right{
    width: 60%;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：信息发布管理&nbsp;&nbsp;>>&nbsp;&nbsp;新建信息单元
      </Row>
    </Col>
    <Col span="24">
      <Row class-name="add-container">
        <div class="step-container">
          <span class="step1 active">基本信息设置</span>
          <span class="step2 active">信息联系人设置</span>
          <span class="step2 active">关联相关信息单元</span>
        </div>
        <!-- 信息单元开始 -->
        <div class="unit">
            <div class="unit_title">
                <span>信息单元</span>
            </div>
            <div class="unit_content">
                <div class="unit_content_left">
                    <div class="unit_s_left">信息单元编码：</div>
                    <div class="unit_s_right">{{infromationCode}}</div>
                </div>
                <div class="unit_content_left no_line">
                    <div class="unit_s_left">信息单元编码：</div>
                    <div class="unit_s_right">{{infromationName}}</div>
                </div>
            </div>
        </div>
         <!-- 信息单元结束 -->
        <p class="title">关联的相关信息单元</p>
        <Col span="24">
          <Row class-name="table-con">
            <div class="btn-container">
              <Button type="primary" class="search-btn" @click="addInfomation">新增相关信息单元</Button>
            </div>
              <Table border :columns="columns1" :data="data6"></Table>
            </Table>
                <Row type="flex" justify="space-between" style="margin-top:20px">
                    <Col span="24" class="text-center">
                            <Button type="primary" @click="beforeText">上一步</Button>
                            <Button type="primary" @click="save" style="margin-left: 8px">完成</Button>
                    </Col>
                </Row>
            </Row>
    </Col>
        
      </Row>
    </Col>

     <!-- 新增信息单元开始 -->
     <Modal v-model="createInfromation" title="新增信息单元" width="600px" @on-cancel="deleteAddInformation">
        <Form ref="createInfromationModel" :model="createInfromationModel" :rules='ruleValidate' :label-width="120">
            <Row >
                <Col span="24">
                  <FormItem label="序号:">
                   <Input v-model="createInfromationModel.sortNumber" class="search-input" placeholder="请输入序号" style="width: 300px"></Input>
                    <!-- <i-button type="primary">新增信息单元</i-button> -->
                     <infomation  @close="close2"></infomation>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="信息单元:"  prop="siteOne">
                    <Select
                        v-model="createInfromationModel.relationTaskId"
                        filterable
                        remote
                        :remote-method="remoteMethodEmployee"
                        :loading="loadingEmploy">
                        <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                  </FormItem>
                </Col>       
            </Row>
        </Form>
        <div slot="footer">
            <i-button type="primary" @click="saveRelationInfromation"  :disabled="isClose" >保存</i-button>
             <i-button type="primary" @click="cancelRelationInfromation">取消</i-button>
        </div>
      </Modal> 
  </Row>
  
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { formData } from "../../../assets/js/common.js";
import infomation from "./addInformationUnit";
import {
   getRelationTaskDetail,
  taskSelect,
  saveTaskSelect,
  doDelete,
  taskSelectOther
}from "./api/unitManageMent";
export default {
  name:"unitCorrelation",
  components:{
    oilPage,
    infomation
  },
data () {
    
     const validateInfoSite = (rule, value, callback) => {
                //console.log('ii',this.$refs.formItem.Site);
                    if (this.createInfromationModel.relationTaskId == '') {
                        callback(new Error('不能为空'));
                    } else {
                        callback();
                    }
                };
            return {
                  isClose:false,//新增信息单元关联时提交保存后按钮暂时禁止点击
                createInfromationModel:{
                        sortNumber:null,
                        relationTaskId:null
                    },
                options1:[],
                loadingEmploy:false,
                createInfromation:false,
                itemtaskListOne:[],
                publishedModal:false,
                taskId : this.$route.query.taskId,
                linkerData:{},
                showDetailModal: false,
                showLinkerDetailModal:false,
                showPublishModal:false,
                showPublishShortModal:false,
                showPublishMessageModal:false,
                infromationCode:"",
                infromationId:"",
                infromationName:"",
                infoType:[
                    { value: 1, label: "全部" },
                    { value: 2, label: "文章类" },
                    { value: 3, label: "行情类" },
                ],
                columns1: [
                    {
                        title: "序号",
                        key: "sortNumber",
                        align: "center"
                    },
                     {
                    title: "信息单元",
                    key: "relationName",
                    align: "center",
                    loading: true,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, data) => {
                            return h('div', [
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
                ],
                ruleValidate:{
                      siteOne :[
                        {  required: true,validator:validateInfoSite,trigger:'change'}
                    ],
                },
              
            }
        },
        created() {
            this.getRelationTaskDetail();
            console.log("idflag",this.isClose)
            },
        methods: {
            close2(val){
                this.createInfromation = val;
            },
            delete(data)
            {
                // debugger
                let form ={
                    id:data.row.id,
                }
                doDelete(formData(form)).then(res =>{

                if(res.status == 200)
                {
                    this.data6.splice(data.index,1);
                     this.createInfromationModel.sortNumber = this.data6.length+1;
                }
                })
            },
            addInfomation(){
                this.isClose = false;
                this.createInfromation = true;
            },
            getRelationTaskDetail()
            {
                let form = 
                {
                    taskId : this.$route.query.taskId,
                    informationUnitId:this.$route.query.formationUnitId
                };
                getRelationTaskDetail(formData(form)).then(res => {
                let that = this;
                if(res.response.taskRelationVOList != null && res.response.taskRelationVOList.length > 0)
                {
                    const list = res.response.taskRelationVOList.map(item => { 
                        return {
                             sortNumber:item.sortNumber,
                            relationName:item.relationName,
                            id:item.id
                            };
                        });
                    that.data6 = res.response.taskRelationVOList;
                    that.createInfromationModel.sortNumber = list.length+1;
                     console.log('list', list);
                     console.log(that.createInfromationModel.sortNumber)
                }

               let obj = {
                   infromationName : res.response.name,
                   infromationCode : res.response.code
               }
               this.linkerData = obj;

               this.infromationId = res.response.id;
               this.infromationCode = res.response.code;
               this.infromationName = res.response.name;
                console.log('data66', that.data6);
            });
            },
            deleteAddInformation()
            {
                this.cancelRelationInfromation();
            },
            cancelRelationInfromation()
             {
                this.createInfromationModel.relationTaskId= null;
                // this.createInfromationModel.sortNumber = null;
                this.createInfromation = false;
                this.isClose = false;

            },
            saveRelationInfromation()
            {
                this.isClose = true;
                let params ={
                    relationTaskId:this.createInfromationModel.relationTaskId,
                    taskId:this.taskId,
                    sortNumber:this.createInfromationModel.sortNumber
                };
                saveTaskSelect(params).then(res =>{
                    this.isClose = false;//按钮可以点击
                    console.log(this.isClose)
                    if(res.status == 200)
                    {
                        this.createInfromation = false;
                        this.$Message.success("信息单元关联成功");
                        this.getRelationTaskDetail();
                        this.createInfromationModel.relationTaskId= null;
                        this.createInfromationModel.sortNumber = null;
                    }
              })
            },
            // 模糊搜索任务
            remoteMethodEmployee (query) {
                console.log("1 this.createInfromationModel",  this.createInfromationModel)
                if (query !== '') {
                    this.loadingEmploy = true;
                    let params = {
                    name:query,
                    taskId:this.$route.query.taskId
                    }
                    setTimeout(() => {
                        this.loadingEmploy = false;
                        taskSelectOther(formData(params)).then(res =>{
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
        beforeText()
        {
            this.$router.push({
            name: "informationSource",
            query: { 
             taskId: this.$route.query.taskId,
             formationUnitId: this.$route.query.formationUnitId
            }
      });
        },
        save(){
            this.$router.push({
            name: "unitMangement",
      });
        }
    }
    }
</script>
