<template>
<!-- 编辑开始 -->
    <Modal v-model="editContactModel" title="编辑信息" @on-ok="handleSubmit('editFormValidate')" @on-cancel="handleReset('editFormValidate')" width="750">
    <Form ref="editFormValidate" :model="editFormValidate"  :label-width="100">
        <Row type="flex" justify="space-between">
            <Col span="12">
                <FormItem label="姓名：" prop="name">
                    <Input  v-model="editFormValidate.name" class="search-input" placeholder="请输入姓名"></Input>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="性别：" prop="sex">
                    <Select v-model="editFormValidate.sex" class="form-select">
                        <Option v-for="item in editFormValidateSex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-between">
            <Col span="12">
                <FormItem label="部门：" >
                    <Input v-model="editFormValidate.department" class="search-input"></Input>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="职位：">
                    <Input v-model="editFormValidate.position" class="search-input"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-between">
            <Col span="12">
                <FormItem label="电话号码：" >
                    <Input v-model="editFormValidate.phone" class="search-input"></Input>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="手机号码：" >
                    <Input v-model="editFormValidate.mobile" class="search-input"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-between">
            <Col span="12">
                <FormItem label="QQ号码：" >
                    <Input v-model="editFormValidate.qq" class="search-input"></Input>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="微信号码：" >
                    <Input v-model="editFormValidate.weChat" class="search-input"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-between">
            <Col span="16">
                <FormItem label="所在企业:" prop="enterpriseId"> 
                <Select
                    v-model="editFormValidate.enterpriseId"
                    filterable
                    remote
                    :remote-method="remoteMethod1"
                    @on-change="select_enterprise"
                    label-in-value
                    :loading="loading1">
                    <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col span="6">
                <Button type="primary" icon="ios-search" @click="qichacha">企查查</Button>
            </Col>
        </Row>
        <Row type="flex" justify="space-between">
            <Col span="24">
                <FormItem label="企业简称：" prop="enterpriseShortName">
                    <Input v-model="editFormValidate.enterpriseShortName" class="search-input"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-between">
            <Col span="24">
                    <FormItem label="企业类型：" prop="enterpriseType">
                    <Select
                    v-model="editFormValidate.enterpriseType"
                    label-in-value
                    >
                    <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
                </Select>
                </FormItem>
            </Col>
            
        </Row>
        <Row type="flex" justify="space-between">
            <Col span="24">
                <FormItem label="企业性质：" prop="enterpriseNature">
                    <Select
                    v-model="editFormValidate.enterpriseNature"
                    label-in-value
                    >
                    <Option v-for="(option, index) in options3" :value="option.value" :key="index">{{option.label}}</Option>
                </Select>
                </FormItem>
            </Col>
        </Row>
        <Row type="flex" justify="space-between">
            <Col span="24">
                <FormItem label="所在区域：" prop="enterpriseAreaId" >
                    <Select
                    v-model="editFormValidate.enterpriseAreaId"
                    filterable
                    remote
                    :remote-method="remoteMethod4"
                    label-in-value
                    :loading="loading2">
                    <Option v-for="(option, index) in options_area" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="24">
                <FormItem label="详细地址：" prop="enterpriseAddress">
                    <Input v-model="editFormValidate.enterpriseAddress" class="search-input" placeholder="请输入详细地址"></Input>
                </FormItem>
            </Col>
            <Col span="24">
                <FormItem label="邮编：" prop="enterprisePostcode">
                    <Input v-model="editFormValidate.enterprisePostcode" class="search-input" placeholder="请输入邮编"></Input>
                </FormItem>
            </Col>
            <Col span="24">  
                <FormItem label="关联品种：" prop="">
                    <Button type="primary" @click="addBreeds">添加品种</Button>
                </FormItem>                     
            </Col>
        </Row>
        <Row type="flex" justify="space-between">
            <Table class="tableCommon"
            :data="tableData_add"
            :columns="columns_one"
            :stripe="true"
            :border="true"
            >
            </Table>
        </Row>
        </Form>
    </Modal>
 <!-- 编辑结束 -->
</template>

<script>
import axios from "axios";
import { formData } from "../../../assets/js/common.js";
import {Variety, getentErpeise,enterpeiseType,enterpriseNature,enterpriseArea,detailEnterprise,VarietyType,detailContacts} from "../unitmangement/api/unitManageMent";
export default{
    name: 'editContactModel',
    props: {
        showEditModal: Boolean,
        editDataNum: Object
    },
    data(){
        return {
            editId:'',
            options3:[],
            options1:[],
            options2:[],
            Variety:[],
            loading2:false,
            loading1:false,
            editContactModel:false,
            options_area:[],
            options_Variety: [],
            tableData_add:[],
            editFormValidateSex:[
                {
                    value: 0,
                    label: "男"
                },
                {
                    value: 1,
                    label: "女"
                }
            ],
            tableData_add:[],
             editFormValidate: {
                id: "",
                name: "", // 姓名
                sex: null, // 性别
                department: "", // 部门
                position: "", // 职位
                phone: "", // 联系电话号码
                mobile: "", // 手机号码
                qq: "", // QQ号码
                weChat: "", // 微信号码
                enterpriseName: "", // 所在企业
                enterpriseId:"", // 所在企业ID
                enterpriseShortName: "", // 企业简称
                enterpriseType: "", // 企业类型
                enterpriseNature: "", // 企业性质
                enterpriseAreaId: "", // 所在区域ID
                enterpriseAddress: "", // 详细地址
                enterprisePostcode: "", // 邮编
                enterpriseNameOne:'',
                taskContactsBreedRelationVOList:[],
                
            },
            columns_one:
            [
                {
                    key: "breedName",
                    title: "品种名称",
                    align: "center",
                },
                {
                    key: "breedTypeName",
                    title: "品种类型",
                    align: "center",
                },
                {
                title: "操作",
                align: "center",
                render: (h, data) => {
                    return h('div', [
                        h('div', {
                            style: {
                            marginRight: '8px',
                            cursor: 'pointer',
                            color:'#F42C2C',
                            float:"left",
                            },
                            on: {
                            click: () => {
                                this.deleteBreed(data)
                            }
                            }
                        }, '删除')
                    ])
                }
            }
        ]
        }
    },
    created (){
       
    },
    methods:{
        handleSubmit(){

        },
        qichacha(){
            window.open("https://www.qichacha.com/"); 
        },
        // 查询详情
        detailContact(){
            console.log("详情id", this.editFormValidate.id);
            if(this.editFormValidate.id != ''){
                let params = {
                    id: this.editFormValidate.id
                }
                // 查询详情方法
                detailContacts(formData(params)).then(res =>{
                    
                    this.editFormValidate.id = res.response.id;
                    this.editFormValidate.name = res.response.name;
                    this.editFormValidate.sex =res.response.sex;
                    this.editFormValidate.department = res.response.department;
                    this.editFormValidate.position = res.response.position;
                    this.editFormValidate.phone = res.response.phone;
                    this.editFormValidate.mobile = res.response.mobile;
                    this.editFormValidate.qq = res.response.qq;
                    this.editFormValidate.weChat = res.response.weChat;
                    // 匹配企业
                    this.remoteMethod1(res.response.enterpriseName);
                    this.editFormValidate.enterpriseId = res.response.enterpriseId;
                    // 进行区域匹配 
                    this.select_enterprise(this.editFormValidate.enterpriseId);  
                    this.tableData_add = res.response.taskContactsBreedRelationVOList;
                    console.log("品种表格",res.response.taskContactsBreedRelationVOList)                                                                           
                })
            }    
        },
        // 关联品种会话框 
        addBreeds(){
            this.showAddBreedsModal = true;
        }, 
        // 删除关联品种
        deleteBreed (data){       
            this.tableData_add.splice(data.index,1); 
        },  
        // 企业类型
        getRemoteMethod2 (){
            enterpeiseType().then(res =>{
            
                const list1 = res.response.map(item => {
                    return {
                        value: item.value,
                        label: item.desc
                    };
                });
                this.options2 = list1
            })
        },
        // 查询企业性质
        getRemoteMethod3 (){
            enterpriseNature().then(res =>{
                
                const list1 = res.response.map(item => {
                    return {
                        value: item.value,
                        label: item.desc
                    };
                });
                this.options3 = list1
            })
        },
    
        // 企业搜索
        remoteMethod1 (query) {
            console.log('搜索企业名称', query)
            if (query !== '') {
                this.loading1 = true;
                let params = {
                    name:query
                }
               
                this.loading1 = false;
                getentErpeise(formData(params)).then(res =>{
                    
                const list1 = res.response.map(item => {
                    return {
                        value: item.id,
                        label: item.text
                    };
                });
                this.options1 = list1
                })
              
            
            } else {
                this.options1 = [];
            }
        },

        // 选择企业
        select_enterprise(id){
           
            var reg=/^[0-9]+.?[0-9]*$/;
            console.log("是数值型："+reg.test(id));
            let params = {};
            if(reg.test(id)){
                params = {
                    id:id
                }
            }else{
                params = {
                    id:id.value
                }
            }
            let that = this;
            that.editFormValidate.enterpriseNameOne = id.label;
            detailEnterprise(formData(params)).then(res =>{
                if(res.status == "200"){
                    that.editFormValidate.enterpriseShortName = res.response.jp;
                    that.editFormValidate.enterpriseType = res.response.type;
                    that.editFormValidate.enterpriseNature = res.response.nature;
                    that.editFormValidate.enterpriseAddress = res.response.address;
                    that.editFormValidate.enterprisePostcode = res.response.areaCode;
                    that.remoteMethod4(res.response.areaName);
                    that.editFormValidate.enterpriseAreaId = res.response.areaId;                  
                }
            }) 
        },
        // 查询区域
        remoteMethod4(query){
            // debugger;
            if (query !== '') {
                this.loading2 = true;
                let params = {
                name:query
                }
                
                this.loading2 = false;
                enterpriseArea(formData(params)).then(res =>{    
                console.log(res);
                const list1 = res.response.map(item => {
                    return {
                        value: item.id,
                        label: item.text
                    };
                });
                this.options_area = list1
                })
               
            } else {
                this.options_area = [];
            }
        },
         // 下拉品种名称
        VarietyOne(query){
            if (query !== '') {
                this.loading1 = true;
                let params = {
                    name:query
                }
             
                this.loading1 = false;
                Variety(formData(params)).then(res =>{
                    // this.Varietyid = res.response.id;
                    // console.log('Variety',res);
                const list1 = res.response.map(item => {
                    return {
                        value: item.id,
                        label: item.text
                    };
                });
                this.options_Variety = list1
                console.log('99',this.options_Variety)
                })
              
            } else {
                this.options_area = [];
            }
        },
        // 下拉品种类型
        VarietyType (){
            VarietyType().then(res =>{
                
                const list1 = res.response.map(item => {
                    return {
                        value: item.value,
                        label: item.desc
                    };
                });
                this.tableData_one = list1
            })
        },
        // 重置编辑会话框
        handleReset (name){
           this.editContactModel = false;
           this.$emit('hide-modal');
           this.$refs[name].resetFields();
        }
    },
    watch: {
        showEditModal (newV, oldV){
            this.editContactModel = newV
        }, 
        editDataNum(newV, oldV){
            this.editFormValidate = newV;
            this.detailContact();
            this.getRemoteMethod2();
            this.getRemoteMethod3();
            this.VarietyType();
        },
    }
}
</script>

<style lang="less" scoped>

</style>
