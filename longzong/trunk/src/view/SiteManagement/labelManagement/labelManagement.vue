<style lang="less" scoped>
 .fx-boxs{
    min-height: 40px;
    z-index: 100;
    max-height: 275px;
    overflow-x: hidden;
    overflow-y: auto;
    background: #fff;
    border:1px solid #f1f1f1;
    margin-bottom: 10px;
    border-radius: 4px;
}
.fx-boxs li{
    padding: 5px;
}
.fx-box li:hover{
    background: #c1c1c1;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        <!-- 当前位置：网站管理&nbsp;&nbsp;>>&nbsp;&nbsp;标签管理&nbsp;&nbsp;>>&nbsp;&nbsp;标签列表 -->
         当前位置：
         <router-link to="/plantIndex" class="link-css">网站管理</router-link>
         &nbsp;&nbsp;>>&nbsp;&nbsp;
         <router-link to="/labelManagement" class="link-css">标签管理</router-link>
         &nbsp;&nbsp;>>&nbsp;&nbsp;
         <router-link to="/labelManagement" class="link-css">标签列表</router-link>
      </Row>
    </Col>
    <Col span="24">
      <Row class-name="search-form">
        <Form :label-width="85" v-model="params">
          <Row type="flex" justify="space-between">
            <Col span="7">
              <FormItem label="标签名称：">
              <Input v-model="params.name" class="search-input" placeholder="请输入标签名称"></Input>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="状态：">
                <Select v-model="params.status" class="search-input" placeholder="请选择状态">
                  <Option v-for="item in stautsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="7" class="text-right">
              <Button type="primary" @click="search">查询</Button>
              <Button style="margin-left: 20px" @click="reset">重置</Button>
            </Col>
          </Row>
        </Form> 
      </Row>
    </Col>
    <Col span="24" class="table-con">
      <div style="margin-bottom:20px">
        <Button type="primary" @click="addLabel">新增</Button>
      </div>
      <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          :stripe="true"
          :border="true">
        </Table>
        <oil-page
          :total="total"
          :page-num="params.pageNum"
          :page-size="params.pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
    </Col>
    <!-- 新增开始 -->
    <Modal v-model="addModal" title="新增标签" width="700" :styles="{top: '20px'}"> 
        <Form :label-width="100" ref="addFormValidate" :rules="addruleValidate" :model="params2">
          <Row>
            <FormItem label="标签名称：" prop="name">
              <Input type="text" class="search-input"  placeholder="请输入标签名称" v-model="params2.name"/>
            </FormItem>  
          </Row>   
          <Row>
            <Col span="24">             
              <FormItem label="信息单元：" >
                <Row>
                <Col span="18">
                <Select
                  v-model="selectName"
                  ref="unit"
                  filterable
                  remote  
                  transfer
                  label-in-value
                  @on-change="typeChange"
                  @on-query-change="queryChange"
                  :remote-method="searchclassfylist"
                  :loading="loading">
                  <Option v-for="(option, index) in addclassList" :value="option.id" :key="index">{{option.text}}</Option>
                </Select>
                </Col>
                <Col span="6" class="text-right">
                  <Button type="primary" @click="chooseTableInfo">选择信息单元</Button>
                </Col>
                </Row>
              </FormItem> 
              <Col span="24">
                <ul class="fx-boxs" id="fxBox" style="margin-left:100px;">
                  <li v-for="(item,index) in params2.labelInformationList">
                    <p>{{item.infornamtionUnitName}}<b class="icon-delete pull-right" style="margin-right:35px" @click="removeCheck21(index)"></b></p>
                  </li>
                </ul> 
              </Col>             
            </Col>
          </Row>        
        </Form>
      <div slot="footer">
        <i-button type="primary" @click="saveAdd('addFormValidate')">保存</i-button>
        <i-button type="default" @click="addModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 新增结束 -->
    <!-- 修改开始 -->
    <Modal v-model="editModal" title="修改标签" width="850" :styles="{top: '20px'}"> 
        <Form :label-width="100" ref="editFormValidate" :rules="editruleValidate" :model="editparams2">
          <Row>
            <FormItem label="标签名称：" prop="name">
              <Input type="text" class="search-input"  placeholder="请输入标签名称" v-model="editparams2.name"/>
            </FormItem>  
          </Row>   
          <Row>
            <Col span="24">
              <Row>
                <Col span="18">
                  <FormItem label="信息单元：" >
                    <Select
                      v-model="selectName1"
                      ref="unit1"
                      filterable
                      remote  
                      transfer
                      label-in-value
                      @on-change="typeChange1"
                      @on-query-change="queryChange1"
                      :remote-method="searchclassfylist1"
                      :loading="loading">
                      <Option v-for="(option, index) in editclassList" :value="option.id" :key="index">{{option.text}}</Option>
                    </Select>
                  </FormItem>  
                </Col>
                <Col span="6" class="text-right">
                  <Button type="primary" @click="chooseTableInfo">选择信息单元</Button>
                </Col>
                <Col span="24">
                  <ul class="fx-boxs" id="fxBox" style="margin-left:100px;">
                    <li v-for="(item,index) in editparams2.labelInformationList">
                      <p v-model="item.infornamtionUnitName">{{item.infornamtionUnitName}}<b class="icon-delete pull-right" style="margin-right:35px" @click="removeCheck22(index)"></b></p>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>        
        </Form>
      <div slot="footer">
        <i-button type="primary" @click="saveEdit('editFormValidate')">保存</i-button>
        <i-button type="default" @click="editCancel()">取消</i-button>
      </div>
    </Modal>
    <!-- 修改结束 -->
    <!-- 关联信息单元开始 -->
    <Modal v-model="infoUnitModal" title="关联信息单元" :width="850">
      <Row>
        <Form ref="selectModal" v-model="params1">
          <Row type="flex" justify="space-between">
            <Col span="8">
              <FormItem label="站点：" :label-width="60">
                <Select placeholder="全部" v-model="params1.siteId">
                  <Option v-for="item in longzSitelist" :value="item.id" :key="item.id">{{ item.text }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="信息单元编码：" :label-width="120">
                <Input v-model="params1.code"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="信息单元名称：" :label-width="120">
                <Input v-model="params1.name"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-bottom:20px">
            <Col span="24" class="text-right">
              <Button type="primary" @click="connectSearch">查询</Button>
              <Button style="margin-left: 20px" @click="linkMessagereset">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table class="tableCommon" border  :columns="columns3" :data="dataTable3" @on-selection-change="modalCheck2"></Table>
        <oil-page
          :total="total1"
          :page-num="params1.pageNum"
          :page-size="params1.pageSize"
          @page-change="pageChange1"
          :page-size-opts="pageSizeOpts1"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveInfoUnit">保存</i-button>
        <i-button type="default" @click="infoUnitModal=false;">取消</i-button>
      </div> 
    </Modal>
    <!-- 关联信息单元结束 -->
    <!-- 查看弹窗开始 -->
    <Modal v-model="readModal" title="查看标签" :styles="{top: '20px'}" width="600"> 
      <Row>
        <Form :label-width="100" >
          <Row>
            <FormItem label="标签名称:">
              <Input type="text" class="search-input" v-model="detailForm.name"  placeholder="请输入标签名称"/>
            </FormItem>  
          </Row>   
          <Row>
            <FormItem label="信息单元:">
              <ul class="fx-boxs" id="fxBox">
                <li v-for="item in detailForm.detailList">
                  <p>{{item.infornamtionUnitName}}</p>
                </li>
              </ul>
            </FormItem>
          </Row>        
        </Form>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="readModal=false">返回</i-button>
      </div>
    </Modal>
    <!-- 查看弹窗结束 -->
  </Row>
</template>

<script>
import {websiteLabelList,websiteLabelDisable,websiteLabelEnable,websiteLabelDetail,informationTaskList,
websiteSelectSite,websiteLabelAdd,websiteLabelEdit,websiteLabelAddcheck,websiteLabelEditcheck,websiteSelectInforUnit} from '../../components/axios/website.js'
import { formatTime2,formData } from '../../../assets/js/common.js'
import OilPage from "../../components/page/page.vue";
export default {
  name: 'labelManagement',
  components: {
    OilPage
  },
  watch:{
		editModal(newVal,oldVal){
			if(newVal == true){
        this.$refs['addFormValidate'].resetFields()
			}
		},
		addModal(newVal,oldVal){
			if(newVal == true){
				this.$refs['addFormValidate'].resetFields()
			}
		}       
	},
  data(){
    const validateadd = (rule, value, callback) => {
			let params = {
        name:this.params2.name,
      }
      var regu = /^\s*$/g;
      if(this.params2.name == ''){
			  callback(new Error('请输入标签名称'));
			}else if( regu.test(value) ){
        callback(new Error('标签名称不能为空格'));
      }else{
        websiteLabelAddcheck(formData(params)).then(res => {
          console.log('res',res);
          if(res.response){
            callback();
          }else{
            callback(new Error('标签名称重复'));
          }   
        });
      }
    };
    const validateedit = (rule, value, callback) => {
			let params = {
        id:this.editparams2.id,
        name:this.editparams2.name,
      }
      var regu = /^\s*$/g;
      if(this.editparams2.name == ''){
			  callback(new Error('请输入标签名称'));
			}else if( regu.test(value) ){
        callback(new Error('标签名称不能为空格'));
      }else{
        websiteLabelEditcheck(formData(params)).then(res => {
          console.log('res',res);
          if(res.response){
            callback();
          }else{
            callback(new Error('标签名称重复'));
          }   
        });
      }
    };
    const validateMember = (rule, value, callback) => {
        if (this.params2.labelInformationList.length < 1) {
          console.log(111)
            callback(new Error('请选择信息单元'));
        }else {
          callback();  
        }
    };
    const validateMember1 = (rule, value, callback) => {
        if (this.editparams2.labelInformationList.length < 1) {
          console.log(111)
            callback(new Error('请选择信息单元'));
        }else {
          callback();  
        }
    };
    return{
      submitAdd:false,
      submitedit:false,
      addruleValidate: {
        name: [
          { required: true,validator: validateadd, trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "标签名称不能超过100个字符",
            trigger: "change"
          }
        ]
      },
      editruleValidate: {
        name: [
          { required: true,validator: validateedit, trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "标签名称不能超过100个字符",
            trigger: "change"
          }
        ]
      },
      params:{
        name:'',
        status:-1,
        pageNum: 1,
        pageSize: 10,
      },
      loading:false,
      selectName:'',
      selectName1:'',
      total: 0, 
      showSizer: true,
      readModal:false,
      pageSizeOpts: [10,15,20,40,50,100,200],
      pageSizeOpts1: [5,10,20,30],
      disableSiteModal:false,
      enableSiteModal:false,
      addModal:false,
      modifyModal:false,
      showselectModal:false,
      infoUnitModal:false,
      editModal:false,
      detailForm:{
        name:'',
        detailList:[]
      },
      stautsList:[
        {
          value:-1,
          label:"全部"
        },
        {
          value:0,
          label:"正常"
        },{
          value:1,
          label:"禁用"
        }
      ],
      params1:{
        siteId:'',
        code:'',
        name:'',
        pageNum: 1,
        pageSize: 5,
      },
      params2:{
        id:'',
        name:'',
        labelInformationList:[], 
        status:0
      },
      editparams2:{
        id:'',
        name:'',
        labelInformationList:[], 
        status:0
      },
      labelInformationList:[],
      editlist:[],
      addclassList:[],
      editclassList:[],
      total1:0,  
      name:'乙烯',
      tableData:[],
      treeData:[],
      columns:[
        {
          key: "id",
          title: "标签ID",
          align: "center",
          width: 150,
        },
        {
          key: "name",
          title: "标签名称",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    this.id=params.row.id
                    this.detailForm.name=params.row.name
                    this.readModal=true;
                    this.readDetail()
                  }
                },
              }, params.row.name),
            ]);
          }
        },
        {
          key: "status",
          title: "状态",
          align: "center",
          width: 180,
          render:(h,params)=>{
            const statusEle={
              "0":"正常",
              "1":"禁用"
            }
            const result=statusEle[params.row.status] ? statusEle[params.row.status] : "";
            if(result == "正常"){
							return h("div",{
								style:{
									color:'rgb(158, 205, 63)'
								},
							},result);
						}else{
							return h("div",{
								style:{
									color:'red'	
								},
							},result);
						}
          }
        },
        {
          key: "creatorName",
          title: "创建人",
          align: "center",
          width: 200,
        },
        {
          key: "createTime",
          title: "创建时间",
          align: "center",
          width: 250,
          render:(h,params)=>{
            const result=params.row.createTime ? formatTime2(params.row.createTime) : "";
            return h('div',{},result)
          }
        },
        {
          key: "operate",
          title: "操作",
          align: "center",
          width: 200,
          render: (h, data) => {
            let operate={};
            if(data.row.status==0){
              operate= h('a',{
                on:{
                  click:()=>{
                    //this.disableSiteModal=true;
                    this.disableSiteFun(data);
                  }
                }
              },'禁用')
            }else{
              operate=h('a',{
                on:{
                  click:()=>{
                    //this.enableSiteModal=true;                 
                    this.enableSiteFun(data);
                  }
                }
              },'启用')
            }
            return h('div', [
              h('a', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style:{
                  marginRight:'20px'
                },
                on: {
                  click: () => {
                    this.id=data.row.id,
                    this.editparams2.id=data.row.id
                    this.editparams2.name=data.row.name
                    this.editparams2.status=data.row.status
                    this.editModal=true;
                    this.editBtn(data)
                  }
                }
              }, '修改'),
              operate
            ])
          }
        }
      ],
      columns2:[
        {
          type: "selection",
          align: "center",
          width: 50,
        },
        {
          key: "status",
          title: "品种名称",
          align: "center",
          minWidth: 150,
        },
        {
          key: "status",
          title: "缩写",
          align: "center",
          width: 130,
        },
        {
          key: "status",
          title: "别名",
          align: "center",
          width: 120,
        },
      ],
      dataTable2:[],
      columns3:[ {
          type: "selection",
          align: "center",
          width: 50,
        },
        {
          key: "code",
          title: "信息单元编码",
          align: "center",
          minWidth: 150,
        },
        {
          key: "name",
          title: "信息单元名称",
          align: "center",
          minWidth: 250,
        },
        {
          key: "siteName",
          title: "站点",
          align: "center",
          minWidth: 150,
        },],
      dataTable3:[],
      longzSitelist:[]
    }
  },
  mounted(){
    this.tableList()
  },
  methods:{
    //获取标签表信息列表
    tableList(){
      this.params = {
        name: this.params.name==undefined ? '' : this.params.name,
        status: this.params.status==undefined ? -1 : this.params.status,
        pageNum: this.params.pageNum,
        pageSize: this.params.pageSize
      };
      websiteLabelList(formData(this.params)).then(res=>{
        if(res.response&&res.response.list){
          this.tableData=res.response.list;
          this.total=res.response.total;
        }else{
          this.$Message.error(res.Message)
        }
        //console.log(res)
      })
    },
    //新增按钮
    addLabel(){
      this.addModal=true;
      this.params2.labelInformationList=[]
      this.$refs.unit.query=''

    },
    //根据id获取标签表信息
    readDetail(){
      websiteLabelDetail(formData({id:this.id})).then(res=>{
        //console.log(res)
        this.detailForm.detailList=res.response.labelInformationList
      })
    },
    //查询
    search(){
      this.params.pageNum=1;
      this.params.pageSize=10;
      this.tableList();
    },
    //重置
    reset() {
      this.params = {
        name: "",
        status: -1,
        pageNum: 1,
        pageSize: 10
      };
     this.tableList();
    },
    //分页
    pageChange(page,size){
      if(size){
        this.params.pageNum = 1;
        this.params.pageSize = size;
			}else{
				this.params.pageNum = page;
			}
      this.tableList();
    },
    //分页
    pageChange1(page,size){
      if(size){
        this.params1.pageNum = 1;
        this.params1.pageSize = size;
			}else{
				this.params1.pageNum = page;
			}
      this.showselect();
    },
    //禁用
    disableSiteFun(data){
       let _this = this;
        var config = {
          title: "提示信息",
          content: "您确定禁用吗？",
          onOk: () => {
            let form = {id:data.row.id};
              websiteLabelDisable(formData(form)).then(res =>{
                  _this.$Message.success('禁用成功');
                  _this.tableList();
              })
          },
          onCancel: () => {
            //this.$Message.info('Clicked cancel');
          }
        };
        this.$Modal.confirm(config);

    },
    //启用
    enableSiteFun(data){
       let _this = this;
      var config = {
        title: "提示信息",
        content: "您确定启用吗？",
        onOk: () => {
          let form = {id:data.row.id};
            websiteLabelEnable(formData(form)).then(res =>{
                _this.$Message.success('启用成功');
                _this.tableList();
            })
        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      };
      this.$Modal.confirm(config);
    },
    //选择信息关联
    chooseTableInfo(){  
      this.params1.siteId="";
      this.params1.code="";
      this.params1.name="";
      this.infoUnitModal=true;
      this.showselect()
    },
    //选择信息关联
    showselect(){
      this.labelInformationList=[];
      this.editlist=[];
       this.params1={
        siteId:this.params1.siteId==undefined ? '' : this.params1.siteId,
        code:this.params1.code==undefined ? '' : this.params1.code,
        name:this.params1.name==undefined ? '' : this.params1.name,
        pageNum: this.params1.pageNum,
        pageSize: this.params1.pageSize,
      }
      informationTaskList(formData(this.params1)).then(res=>{
        //console.log(res)
        this.dataTable3=res.response.list
        this.total1=res.response.total
      });

      //下拉选择站点
      websiteSelectSite().then(res=>{
        this.longzSitelist=res.response;
        //console.log(this.longzSitelist)
      });
     
    },
    //删除滚动条某一条
    removeCheck21(index){
      this.addclassList.splice(index,1)
      this.params2.labelInformationList.splice(index,1);
      if(this.params2.labelInformationList.length<1){
        this.$refs['addFormValidate'].validate();
      }
      this.$refs.unit.query=''
    },
    removeCheck22(index){
      this.detailForm.detailList.splice(index,1);
      this.editparams2.labelInformationList.splice(index,1);
      if(this.params2.labelInformationList.length<1){
        this.$refs['editFormValidate'].validate();
      }
      this.$refs.unit1.query=''
    },
    //表格信息单元保存
    saveInfoUnit(){
      this.infoUnitModal=false;
      if(this.addModal){
            let addlistarr=[]
            addlistarr=this.labelInformationList.map((e,v)=>{
              return {
                  "informationUnitId": e.id,
                  "labelId": e.siteId,
                  "sign": e.sign,
                  "infornamtionUnitName":e.name,
                }
            });

          
          for(var i=0;i<addlistarr.length;i++){
              let isCF = false;
              for(var j=0;j<this.params2.labelInformationList.length;j++){
                if(this.params2.labelInformationList[j].informationUnitId == addlistarr[i].informationUnitId){
                  isCF = true;
                }
              }
              if(!isCF){
                this.params2.labelInformationList.push(addlistarr[i]);
                this.$refs['addFormValidate'].validate();
                
              }
            }
     }else if(this.editModal){
          var eidtarr=this.editlist.map((e,v)=>{
          return {
              "informationUnitId": e.id,
              "labelId": e.siteId,
              "sign": e.sign,
              "infornamtionUnitName":e.name,
            }
          });

          let list1 = this.editparams2.labelInformationList;
          for(var i=0;i<eidtarr.length;i++){
            let isCF = false;
            for(var j=0;j<list1.length;j++){
              if(list1[j].informationUnitId == eidtarr[i].informationUnitId){
                isCF = true;
              }
            }
            if(!isCF){
              this.editparams2.labelInformationList.push(eidtarr[i]);
              this.$refs['editFormValidate'].validate();
            }
          }
     }
  
    },
    //选择表格内信息单元  
    modalCheck2(selection){
      // console.log(selection)
      this.labelInformationList=selection
      this.editlist=selection
      // console.log(this.labelInformationList)
      // if(this.addModal){
      //   let list = this.labelInformationList;
      //   for(var i=0;i<selection.length;i++){
      //     let isCF = false;
      //     for(var j=0;j<list.length;j++){
      //       if(list[j].id == selection[i].id){
      //         isCF = true;
      //       }
      //     }
      //     if(!isCF){
      //       this.labelInformationList.push(selection[i]);
      //     }
      //   }


      // }
      
      // if(this.editModal){
      //   let list = this.editlist;
      //   for(var i=0;i<selection.length;i++){
      //     let isCF = false;
      //     for(var j=0;j<list.length;j++){
      //       if(list[j].id == selection[i].id){
      //         isCF = true;
      //       }
      //     }
      //     if(!isCF){
      //       this.editlist.push(selection[i]);
      //     }
      //   }

   
      // }

    },
    //选择信息单元-查询
    connectSearch(){
      this.params1.pageNum=1;
      this.params1.pageSize=5;
      this.showselect();
    },
    //选择信息单元-重置
    linkMessagereset(){
      this.params1={
        siteId:'',
        code:'',
        name:'',
        pageNum: 1,
        pageSize: 5,
      }
      this.showselect();
    },
    queryChange(query){
      if (!query) {
        this.selectName = null;
      }
      
    },
    queryChange1(query){
      if (!query) {
        this.selectName1 = null;
      }
      
    },
    //新增的联想输入选择
    typeChange(option){
      let that = this;
         let obj={};
         obj.informationUnitId = option.value;
         obj.infornamtionUnitName = option.label;
            let isCS=false
            for(var j=0;j<that.params2.labelInformationList.length;j++){
              if(obj.informationUnitId==that.params2.labelInformationList[j].informationUnitId){
                isCS=true
              }
              }
            if(!isCS){
              that.params2.labelInformationList.push(obj)
              that.$refs['addFormValidate'].validate();
              that.$refs.unit.query=''
            }

      if(option == ''){
        that.$refs.unit.option=''
      }
    },
    //新增下拉选择信息单元
    searchclassfylist(query){
      let that=this
      if (query !== "") {
        this.loading = false;
        let params = {
          name: query
        }
         setTimeout(() => {
          this.loading = false;
          websiteSelectInforUnit(formData(params)).then(res => {
            //console.log(res.response)
            this.addclassList=res.response
          
          });
          
        }, 200);
      } else {
        this.options1 = []
      }
    },
    //新增-保存
    saveAdd(name){
      let _this=this
      // if(this.params2.informationTaskList.length===0){
      //   this.$Message.error('')
      // }
      this.$refs[name].validate((valid) => {
          if (valid) {
            if(!this.submitAdd){
              this.submitAdd=true;
              websiteLabelAdd(this.params2).then(res=>{             
              this.addModal=false;
              if(res.status==200){
                this.$Message.success("添加成功！")
                _this.tableList()
              }else{
                this.$Message.error(res.message)
              }  
              this.submitAdd=false; 
            });

            }
            
          }
      })


    },
    //修改的联想输入选择
    typeChange1(option){
      let that = this;
         let obj={};
         obj.informationUnitId = option.value;
         obj.infornamtionUnitName = option.label;
    
        let isCS=false
        for(var j=0;j<this.editparams2.labelInformationList.length;j++){
          if(obj.informationUnitId==this.editparams2.labelInformationList[j].informationUnitId){
            isCS=true
          }
        }
        if(!isCS){
          this.editparams2.labelInformationList.push(obj)
          this.$refs['editFormValidate'].validate();
        }
        
      if(option == ''){
        this.$refs.unit1.option=''
      }
    },
    //修改下拉选择信息单元
    searchclassfylist1(query){
      let that=this
      if (query !== "") {
        this.loading = false;
        let params = {
          name: query
        }
         setTimeout(() => {
          this.loading = false;
          websiteSelectInforUnit(formData(params)).then(res => {
            //console.log(res.response)
            this.editclassList=res.response
          
          });
          
        }, 200);
      } else {
        this.options1 = []
      }
    },
    //修改按钮
    editBtn(data){ 
      this.$refs.unit1.query=''    
      websiteLabelDetail(formData({id:data.row.id})).then(res=>{
        //console.log(res)
        this.editparams2.labelInformationList=res.response.labelInformationList 
        let that=this
        // console.log(this.editparams2.labelInformationList)
        for(var i=0;i<that.editparams2.labelInformationList.length;i++){
          if(!that.editparams2.labelInformationList[i].infornamtionUnitName){
           that.editparams2.labelInformationList.splice(i,1)
            console.log(i)
          }
        }
        this.$refs['editFormValidate'].validate();
        console.log(this.editparams2.labelInformationList)   
      })
         
    },                   
    //修改-保存
    saveEdit(name){
      let _this=this;
      this.$refs[name].validate((valid) => {
          if (valid) {
            if(!this.submitedit){
              this.submitedit=true;
              websiteLabelEdit(this.editparams2).then(res=>{
              this.editModal=false;
              if(res.status==200){
                this.$Message.success("修改成功！")
                _this.tableList()
              }else{
                this.$Message.error(res.message)
              }
              this.submitedit=false;
            })
            }
            
            }
        })
     
    },
    editCancel(){
      this.editModal=false;
      this.$refs['editFormValidate'].resetFields();
    },
    connectMessage(){
      this.showselectModal=true;
    },

  }
}
</script>


