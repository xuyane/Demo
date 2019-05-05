<style scoped>
@import "./TemplateFile.less";

</style>

<template>
  <Row class='informationsortbox'>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：
      <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>                
        &nbsp;&nbsp;>>&nbsp;&nbsp;
      <router-link to="/ContrabandWords" class="link-css"> 违禁词管理</router-link>                
         &nbsp;&nbsp;>>&nbsp;&nbsp;
      <router-link to="/ContrabandWords" class="link-css">  违禁词列表</router-link>                          
      </Row>
    </i-col>
    <Col span='24'>
    <Row>
      <Col span='24'>
      <Card style="margin-bottom:20px">
        <div class="topform">
          <Form ref="formCustom" :model="formCustom" :label-width="120">
            <Row type="flex" justify="space-between">
                <Col span='8'>
                <FormItem label="违禁词:" >
                <Input type="text" v-model="formCustom.keyword" class="search-input" placeholder="请输入违禁词"></Input>
                </FormItem>
                </Col>
                <Col span='8'>
                <FormItem label="是否内容:">
                    <Select v-model="formCustom.isContentKeyword" class="search-input">
                        <Option v-for="item in ContentKeyword" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span='8'>
                <FormItem label="是否数据来源:">
                    <Select v-model="formCustom.isSourceKeyword" class="search-input">
                        <Option v-for="item in SourceKeyword" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="24" class="text-right">
                <Button type="primary" @click="TemplateQuery">查询</Button>
                <Button @click="restquery">重置</Button>
                </Col>
            </Row>
          </Form>
        </div>
      </Card>
      <Card class="tablewrap">
        <Row class="btn-container">
          <Col span="24">
          <Button type="primary" class="search-btn" @click="addUser">新增违禁词</Button>
          </Col>
        </Row>
        <Row>
          <Table border :columns="columns" :data="dataTable"></Table>
          <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" ></oil-page>
        </Row>
      </Card>
      </Col>
    </Row>
    </Col>
    <Modal v-model="showAddModal" title="新增违禁词" width="600" @on-cancel="cancelAddModal">
      <Form ref="addFormValidate" :rules="addruleValidate" :model="addform"  :label-width="130">
        <FormItem label="违禁词" prop='addName'>
          <Input v-model="addform.addName" placeholder="请输入违禁词"></Input>
        </FormItem>
         <FormItem label="是否内容:" >
              <Select v-model="addform.isContentKeyword" class="search-input" @on-change="ContentKeywordListOne">
                  <Option v-for="item in ContentKeywordList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="内容拦截等级:" >
              <Select v-model="addform.contentInterceptLevel" class="search-input" @on-change="contentInterceptLevelListOne">
                  <Option v-for="item in contentInterceptLevelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="是否数据来源:" >
              <Select v-model="addform.isSourceKeyword" class="search-input" @on-change="isSourceKeywordListOne">
                  <Option v-for="item in isSourceKeywordList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="数据来源拦截等级:" >
              <Select v-model="addform.sourceInterceptLeve" class="search-input" @on-change="sourceInterceptLeveListOne">
                  <Option v-for="item in sourceInterceptLeveList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
      </Form>
      <div slot="footer">
        <i-button  class="search-btn" type="primary" @click="confirmAddModal('addFormValidate')">确定</i-button>
        <i-button  class="search-btn" @click="cancelAddModal">取消</i-button>
      </div>
    </Modal>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../../components/page/page.vue";
import {TemplateList,jingyongOne,qiyongOne,KeywordList,keywordUniqueness,keywordAdd,keywordDelete,editIsContentKeyword,editContent,editContentTwo,editContentThree,editContentFrour} from "../api/unitManageMent.js";
import { formData } from "../../../../assets/js/common.js";
export default {
  name: "ue",
  components: {
    oilPage,
    TemplateList
  },
  data() {
    const validateadd = (rule, value, callback) => {
        let params = {
            keyword:this.addform.addName
        }
        if(this.addform.addName == ''){
          callback(new Error('请输入违禁词'));
        }
        keywordUniqueness(formData(params)).then(res => {
          console.log('res',res);
          if(res.response){
              callback();
          }else{
            callback(new Error('违禁词名称重复'));
          }   
        });
    };
    return {
      restAdd:true,
      showAddModal: false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [10,15,20,40,50,100,200],
      showIsUsermodal: false,
      disableUrl: "",
      enableUrl: "",
      msgContent: "",
      statusList: [],
      addform:{
        addName:'',
        isContentKeyword:1,
        contentInterceptLevel:1,
        isSourceKeyword:1,
        sourceInterceptLeve:1
      },
      addruleValidate:{
        addName: [
              { required: true,validator: validateadd, trigger: 'blur' },
              {
                  type: "string",
                  max: 100,
                  message: "违禁词不能超过50个字符",
                  trigger: "blur"
              }
          ]
      },
      ContentKeyword: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      ContentKeywordList: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 0,
          label: "否"
        }
      ],
      SourceKeyword:[
        {
          value: -1,
          label: "全部"
        },
        {
          value: 1,
          label: "是"
        },
        {
          value: 0,
          label: "否"
        }
        
      ],
      contentInterceptLevelList:[
        {
          value: 1,
          label: "警告"
        },
        {
          value: 2,
          label: "禁止"
        }
      ],
      isSourceKeywordList:[
        {
          value: 1,
          label: "是"
        },
        {
          value: 0,
          label: "否"
        }
        
      ],
      sourceInterceptLeveList:[
        {
          value: 1,
          label: "警告"
        },
        {
          value: 2,
          label: "禁止"
        }
      ],
      informationTypeRoadName: "",
      formCustom:{
        keyword:'',
        isContentKeyword:-1,
        isSourceKeyword:-1
      },
      columns: [
        {
          title: "违禁词",
          key: "keyword",
          align: "center"
        },
        {
          title: "是否内容",
          key: "isContentKeyword",
          align: "center",
          //params.row.isContentKeyword
          render: (h, params) => {
            return h(
              "Select",
              {
                style: {
                  style: "border: 1px solid #dddee1"
                },
                props: {
                  value: params.row.isContentKeyword,
                  size: "small"
                },
                on: {
                  "on-change": (event) => {
                    var i = event ;
                    console.log(i);
                    this.contentOne(params,event);
                  }
                }
              },
              this.ContentKeywordList.map(function(item) {
                return h(
                  "Option",
                  {
                    props: { value: item.value }
                  },
                  item.label
                );
              })
            );
          }
        },
        {
          title: "内容拦截等级",
          key: "contentInterceptLevel",
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                style: {
                  style: "border: 1px solid #dddee1"
                },
                props: {
                  value: params.row.contentInterceptLevel,
                  size: "small"
                },
                on: {
                  "on-change": event => {
                    this.contentTwo(params,event);
                  }
                }
              },
              this.contentInterceptLevelList.map(function(item) {
                return h(
                  "Option",
                  {
                    props: { value: item.value }
                  },
                  item.label
                );
              })
            );
          }
        },
        {
          title: "是否数据来源",
          key: "isSourceKeyword",
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                style: {
                  style: "border: 1px solid #dddee1"
                },
                props: {
                  value: params.row.isSourceKeyword,
                  size: "small"
                },
                on: {
                  "on-change": event => {
                    this.contentThree(params,event);
                  }
                }
              },
              this.isSourceKeywordList.map(function(item) {
                return h(
                  "Option",
                  {
                    props: { value: item.value }
                  },
                  item.label
                );
              })
            );
          }
        },  
        {
          title: "数据来源拦截等级",
          key: "sourceInterceptLeve",
          align: "center",
          render: (h, params) => {
            return h(
              "Select",
              {
                style: {
                  style: "border: 1px solid #dddee1"
                },
                props: {
                  value: params.row.sourceInterceptLeve,
                  size: "small"
                },
                on: {
                  "on-change": event => {
                    this.contentFrour(params,event);
                  }
                }
              },
              this.sourceInterceptLeveList.map(function(item) {
                return h(
                  "Option",
                  {
                    props: { value: item.value }
                  },
                  item.label
                );
              })
            );
          }
        },
        {
          title: "创建人",
          align: "center",
          key: "creatorName"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "span",
                    color: "blue",
                    textDecoration: "underline",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.editUser(data);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      dataTable: [],
      editor: null,
    };
  },
  created(){
    this.getlist();
  },
  methods:{
    // 是否内容
    contentOne(data,event){
      // debugger;
      let one = ''
      console.log(111,event)
      if(event === 0){
        one = '否'
      }
      if(event === 1){
        one = '是'
      }
      console.log(1111,one)
      let params = {
        id : data.row.id,
        isContentKeywordStr:one
      }
      editContent(formData(params)).then(res =>{
          this.$Message.success('编辑成功!');
          this.getlist();
      })
    },
    contentTwo(data,event){
      // debugger;
      let one = ''
      console.log(111,event)
      if(event === 1){
        one = '警告'
      }
      if(event === 2){
        one = '禁止'
      }
      console.log(1111,one)
      let params = {
        id : data.row.id,
        contentInterceptLevelStr:one
      }
      editContentTwo(formData(params)).then(res =>{
          this.$Message.success('编辑成功!');
          this.getlist();
      })
    },
    contentThree(data,event){
      // debugger;
      let one = ''
      console.log(111,event)
      if(event === 0){
        one = '否'
      }
      if(event === 1){
        one = '是'
      }
      console.log(1111,one)
      let params = {
        id : data.row.id,
        isSourceKeywordStr:one
      }
      editContentThree(formData(params)).then(res =>{
          this.$Message.success('编辑成功!');
          this.getlist();
      })
    },
    contentFrour(data,event){
      // debugger;
      let one = ''
      console.log(111,event)
      if(event === 1){
        one = '警告'
      }
      if(event === 2){
        one = '禁止'
      }
      console.log(1111,one)
      let params = {
        id : data.row.id,
        sourceInterceptLevelStr:one
      }
      editContentFrour(formData(params)).then(res =>{
          this.$Message.success('编辑成功!');
          this.getlist();
      })
    },
    restquery(){
      this.formCustom.keyword='';
      this.formCustom.isContentKeyword = -1;
      this.formCustom.isSourceKeyword = -1;
    },
    ContentKeywordListOne(data){
      this.addform.isContentKeyword = data;
    },
    contentInterceptLevelListOne(data){
      this.addform.contentInterceptLevel = data
    },
    isSourceKeywordListOne(data){
      this.addform.isSourceKeyword = data
    },
    sourceInterceptLeveListOne(data){
      this.addform.sourceInterceptLeve = data
    },
    getlist(){
      let params = {
        keyword:this.formCustom.keyword,
        isContentKeyword:this.formCustom.isContentKeyword,
        isSourceKeyword:this.formCustom.isSourceKeyword,
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
      KeywordList(params).then(res =>{
        console.log(res);
        this.dataTable = res.response.list;
        this.total = res.response.total;
      })
    },
    // 查询
    TemplateQuery(){
        this.pageNum = 1;
        this.pageSize = 10;
        this.getlist();
    },
    addUser(){
      this.addform.addName='';
      this.addform.isContentKeyword=1;
      this.addform.contentInterceptLevel=1;
      this.addform.isSourceKeyword=1;
      this.addform.sourceInterceptLeve=1;
      this.showAddModal = true;

    },
    //获取分页数据
    pageChange(page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getlist();
    },
    cancelAddModal(){
      this.addform.addName='';
      this.addform.isContentKeyword=1;
      this.addform.contentInterceptLevel=1;
      this.addform.isSourceKeyword=1;
      this.addform.sourceInterceptLeve=1;
      this.showAddModal = false;
      this.$refs.addFormValidate.resetFields();
    },
    confirmAddModal(name){
      this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.restAdd == true){
              this.restAdd = false;
              let params = {
                keyword:this.addform.addName,
                isContentKeyword:this.addform.isContentKeyword,
                contentInterceptLevel:this.addform.contentInterceptLevel,
                isSourceKeyword:this.addform.isSourceKeyword,
                sourceInterceptLeve:this.addform.sourceInterceptLeve
              }
              keywordAdd(params).then(res => {
                console.log(res);
                this.$Message.success('新增成功!');
                this.showAddModal = false ;
                this.getlist();
                this.restAdd = true;
              });
            }
          } else {
              // this.$Message.error('Fail!');
              this.restAdd = true;
          }
      })
    },
    editUser(data){
      let _this = this;
        var config = {
            title: "提示信息",
            content: "您确定删除？",
            onOk: () => {
            let form = {id:data.row.id};
            console.log(data);
                keywordDelete(formData(form)).then(res =>{
                    this.$Message.success("删除成功!");
                    this.pageNum = 1
                    this.getlist();
                })
            },
            onCancel: () => {
            
            }
        };
        this.$Modal.confirm(config);
    }

  }
   
  }
</script>
