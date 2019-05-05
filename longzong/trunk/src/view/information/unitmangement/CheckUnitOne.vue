<style lang="less" scoped>
@import './addInformationSettings.less';
.search-input input{
    border: 1px solid #dcdee2;
    border-radius: 4px;
}
.info-detail{
    border-left: 1px solid #ddd;;
}
</style>
<template>
  <Row class="checkUnit">
    <Col span="24">
      <Row class-name="add-container">
        <p class="title">信息单元基本信息</p>
        <Col span="24" class="product-opening-table">
        <Form ref="formItem" :model="formItem" :rules='ruleValidate' :label-width="150">
            <FormItem label="信息单元名称:">
                <Input v-model="formItem.name"  placeholder="" style="width:60%" disabled/>
            </FormItem>
              <FormItem label="信息单元编码:">
                <Input v-model="formItem.code"  placeholder="" style="width:60%" disabled/>
              </FormItem>
             <FormItem label="站点:" >
                <Input v-model="formItem.siteName" placeholder="" style="width:60%" disabled/>
            </FormItem>
            <FormItem label="信息大类:" >
                <Input v-model="formItem.typeName"  placeholder="" style="width:60%" disabled/>
            </FormItem>
              <FormItem label="产品:" >
                <Input v-model="formItem.productName"  placeholder="" style="width:60%" disabled/>
            </FormItem>
            <FormItem label="关联信息分类:">
                 <Row >
                    <Col >
                        <div class="info-detail" style="width:60%">
                        <p v-for="(item, index) in infromationList" :key="index">
                            <span>{{item}}</span>
                        </p>
                        </div>
                    </Col>
                </Row>
            </FormItem>
                <FormItem label="关联品种:">
                   <Row >
                        <Col>
                            <div class="info-detail" style="width:60%">
                            <p v-for="(item, index) in breedList" :key="index" >
                                <span>{{item}}</span>
                            </p>
                            </div>
                        </Col>
                    </Row>
            </FormItem>
          <FormItem label="关联的区域:">
                 <Row >
                    <Col >
                        <div class="info-detail" style="width:60%">
                        <p v-for="(item, index) in areaList" :key="index">
                            <span>{{item}}</span>
                        </p>
                        </div>
                    </Col>
                </Row>
          </FormItem>
           <FormItem label="关联的企业:">
                <Row>
                    <Col>
                        <div class="info-detail" style="width:60%">
                        <p v-for="(item, index) in enterpriseList" :key="index">
                            <span>{{item}}</span>
                        </p>
                        </div>
                    </Col>
                </Row>
           </FormItem>
            
            <FormItem label="前端是否展示:" prop="productClassify">
                <Input v-model="formItem.isShowName" placeholder="" style="width:60%" disabled/>
            </FormItem>
            <FormItem label="节假日是否展示:" prop="productClassify">
                <Input v-model="formItem.isHolidayShowName" placeholder="" style="width:60%" disabled/>
            </FormItem>
            <FormItem label="默认关键字">
                <Input v-model="formItem.defaultKeyword" placeholder="请输入默认关键字" style="width:60%" disabled/>
            </FormItem>
            <Row>
                <FormItem label="默认文章摘要:">
                <Col span="20">
                    <Input  v-model="formItem.defaultSummary" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入默认文章摘要" style="width:68%" disabled/>
                </Col>
                </FormItem>
            </Row>
            <FormItem label="默认信息来源网:">
                <Input v-model="formItem.defaultSource" placeholder="请输入默认信息来源网" style="width:60%" disabled/></Input>
            </FormItem>
            <p class="title">信息任务</p>
            <Row type="flex" >
                <Col span="5">
                    <FormItem label="发布周期:" prop="productClassify">
                        <Input v-model="formItem.taskCycleName" placeholder="请输入发布周期" style="width:100%" disabled/>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="发布时间:">
                     <Input  v-model="formItem.publishDate" :autosize="{minRows: 5,maxRows: 5}" placeholder="" style="width:68%" disabled/>
                    </FormItem>
                </Col>
                 <Col span="7">
                    <FormItem label="最晚发布时间:">
                     <Input  v-model="formItem.checkTime" :autosize="{minRows: 5,maxRows: 5}" placeholder="" style="width:68%" disabled/>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="任务责任人:" prop="productClassify">
                <Input  v-model="formItem.executorName" :autosize="{minRows: 5,maxRows: 5}" placeholder="" style="width:68%" disabled/>
            </FormItem>
            <Row>
                <FormItem label="备注:" disabled>
                    <Input  v-model="formItem.description" :autosize="{minRows: 5,maxRows: 5}" placeholder="" style="width:68%" disabled/>
                </FormItem>
            </Row>
            <FormItem>
                <Button type="primary" @click="returnBack">返回</Button>
            </FormItem>
        </Form>
        </col>
      </Row>
    </Col>
  </Row>
</template>
<script>
import {
toInfromationDetail
} from "./api/unitManageMent";
import { formData } from "../../../assets/js/common.js";
     export default {
        data () {
            return {
                typeList: [],
                   formItem:{
                },
                infromationList:[],
                breedList:[],
                areaList:[],
                enterpriseList:[],
                selectedBreed: [
                    {
                        breedId: 1,
                        breedName: '22'
                    },
                    {
                        breedId: 2,
                        breedName: '22'
                    }
                ],
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入信息单元名称', trigger: 'blur' }
                    ],
                    site: [
                        { required: true, message: '请输入站点名称', trigger: 'blur' }
                    ],
                    info: [
                        { required: true, message: '请输入关联信息名称', trigger: 'change' }
                    ]
                },
                infroamtionData:{}
            }
        },
        watch: {
            listData (newVal, oldVal) {
                this.productData = newVal
                this.selectedBreed = this.productData.breedList.map(item => {
                    return {
                    breedId: item.id,
                    breedName: item.name
                    }
                })
            }
        },
        created()
        {
            this.toeDetail();
        },
        methods: {
                 toeDetail()
                {
                    let form = {
                    formationUnitId: this.$route.query.informationUnitId,
                    };
                    this.taskId =  this.$route.query.taskId;
                toInfromationDetail(formData(form)).then(res => {
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
                        console.log("res.response",res.response);
                        this.formItem = res.response;
                           let obj = {
                                    name : res.response.name,
                                    code : res.response.code,
                                    type : res.response.bigType
                            }
                            this.infroamtionData = obj;
                        this.$emit('return-Linker-Data',this.infroamtionData)
                    }
            }); 
            },
            // 返回
            returnBack()
            {
                this.$router.push({name:"unitMangement"});
            } 
        }
    }
</script>