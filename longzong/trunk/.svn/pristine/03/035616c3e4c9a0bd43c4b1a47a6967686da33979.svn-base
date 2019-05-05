<style lang="less" >

.navwrap .ivu-col span:first-child {
  border-right: none;
}
.navcontainer {
  padding: 0px 20px 0 0px;
  background: #fff;
  .tab {
    display: inline-block;
    min-width: 112px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    font-size: 14px;
    background: #4280e8;
    text-align: center;
    margin-left: 20px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .tab-active {
    background: #f09d21;
  }
}
</style>
<template >
    <Row class='varietybox'>
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;服务记录
            </Row>
        </i-col>
        <Col span='24'>

            <Row :gutter="20">
                <Col span='24' >
                  <Card style="margin-bottom:20px" class-name="search-form">

                    <div  >
                        <Form ref="formCustom" :model="formCustom"  :label-width="100">
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="业务员:"  >
                                         <associate-Search @query-list="getkf" :dataUrl="url1" :parameterName='name1' ref='kfref'></associate-Search>
                                    </FormItem>
                                </Col>   
                                <Col span='7'>
                                    <FormItem label="业务员部门:" >
                                        <Input type="text" v-model="formCustom.creatorDeptName" class="search-input" @on-focus='showtreeModal' readonly></Input>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="产品:" >
                                        <Select v-model="formCustom.productId"  ref='breedDataRefpro' filterable multiple remote :remote-method="remoteMethodpro" :loading="loading2" >
                                          <Option v-for="(item,index) in produceList" :value="item.id" :key="item.index">{{ item.name }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="公司名称:"  >
                                        <associate-Search ref='breedDataRef' @query-list="companyTypeFunction" :dataUrl="url" :parameterName='name'></associate-Search>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="用户姓名:" >
                                        <!-- <Input type="text" v-model="formCustom.userName" class="search-input"></Input> -->
                                        <Select 
                                          v-model="formCustom.userId"
                                          filterable
                                          remote
                                          ref='breedDataRef1'
                                          :remote-method="remoteMethod1"
                                         
                                          :label-in-value='true'
                                          :loading="loading1">
                                          <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="跟踪状态:" >
                                        <Select v-model="formCustom.status">
                                            <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.desc }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                
                              </Row>
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="跟踪日期:"  >
                                        <DatePicker :value="value2" @on-change="changeDate" format="yyyy/MM/dd" type="daterange" placement="bottom-start" class="search-input"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="是否报价:" >
                                        <Select v-model="formCustom.isQuoted">
                                            <Option  value="1" >是</Option>
                                            <Option  value="0" >否</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="是否提供卡号:" >
                                        <Select v-model="formCustom.isProvideCard">
                                            <Option  value="1" >是</Option>
                                            <Option  value="0" >否</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                
                            </Row>
                            <Row type="flex" justify="space-between">
                               
                               <Col span='7' offset='17'>
                                    <FormItem style="text-align:right" >
                                        <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                                        <Button @click="handleReset" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                  </Card>
                  <Card class="tablewrap">
                    <Row >
                      <Table class="tableCommon" border :columns="columns" :data="agreementmsg" ></Table>
                        <oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>

                    </Row>
                  </Card>
                </Col>
                
            </Row>
            
        </Col>
        <Modal
        v-model="modaltree"
        title="请选择部门"
        @on-ok="bmok"
        @on-cancel="bmcancel">
        <Tree :data="datatree" @on-select-change="selected" @on-check-change='selectbm'></Tree>
    </Modal>
       <Spin size="large" fix v-if="spinShow"></Spin> 
    </Row>
</template>
<script>
import oilPage from "../components/page/page.vue";
import timeStampChange from "../../assets/js/timestamp_change.js";
import { formData } from "../../assets/js/common.js";
import axios from "axios";
import {
  userServiceLogList,
  productList,
  orgTree,
  queryServiceStatusList,
  userSelectList,
  queryProductSelectList
} from "../components/axios/crm.js";
import associateSearch from "../components/associateSearch/getAssociateSearch.vue";
export default {
  name: "myAgreement",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      spinShow:false,
      produceList:[],
      loading2:false,
      model13: "",
      loading1: false,
      options1: [],
      agreementmsg:[],
      typeList: [],
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
      value2: [],
      items: [{ name: "个人", id: 0 }, { name: "全部", id: 1 }],
      number: 0,
      hadselectbm: [],
      modaltree: false,
      datatree: [],
      loading1: false,
      name: "memberName",
      value1: "",
      url: "/crm/common/query-member-select-list", //根据会员名称模糊匹配下拉选择列表
      selectitem: [],
      produceList: [], //选购产品列表
      pageSizeOpts: [10, 20, 50, 100, 200],
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      total: 0,
      issure: {},
      modal1: false,
      formCustom: {},
      ruleCustom: {},

      columns: [
        {
          title: "公司全称",
          key: "memberName",
          minWidth: 100,
          className: "colorbluer",
           render: (h, data) => {
            return h('Tooltip', {
              props: {
                placement: 'top',
                maxWidth: 400
              },
              style: {
                display: 'block',
                color: '#2d8cf0',
                cursor: 'pointer',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }
            }, [
              h('span', {
                on: {
                  click: () => {
                    // this.check(data)
                    this.copyText(data.row.memberName)
                  }
                }
              }, data.row.memberName),
              h('div', {
                slot: 'content',
                domProps: {
                  innerHTML: data.row.memberName
                }
              })
            ])
          }
        },
        {
          title: "用户名",
          width: 160,
          className: "colorbluer",
          key: "userName"
        },
        {
          title: "产品",
          minWidth: 160,
          key: "productName",
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    // this.checkinfor(data);
                  }
                }
              },
              data.row.productName
            );
          }
        },
        {
          title: "跟踪内容",
          minWidth: 160,
          key: "content"
        },
        {
          title: "跟踪状态",
          minWidth: 120,
          key: "status",
          render: (h, data) => {
            return h("span", this.formatFollowType(data.row.status));
          }
        },
        {
          title: "是否报价",
          minWidth: 100,
          key: "isQuoted",
          render: (h, data) => {
            var a = "";
            switch (data.row.isQuoted) {
              case 0:
                a = "否";
                break;
              case 1:
                a = "是";
                break;
            }
            return h("span", {}, a);
          }
        },
        {
          title: "是否提供卡号",
          minWidth: 120,
          render: (h, data) => {
            var a = "";
            switch (data.row.isProvideCard) {
              case 0:
                a = "否";
                break;
              case 1:
                a = "是";
                break;
            }
            return h("span", {}, a);
          }
        },
        {
          title: "跟踪时间",
          minWidth: 160,
          render: (h, data) => {
            return h("span", {}, timeStampChange.format(data.row.createTime)
            );
          }
        },
        {
          title: "跟踪人",
          minWidth: 100,
          key: "creatorName"
        }
      ]
    };
  },
  methods: {
    formatFollowType(val) {
      let desc = ''
      this.typeList.map(item => {
        if(item.value === val) {
          desc = item.desc
          return
        }
      })
      return desc
    },
        //点击部门
    selected(data){
      this.modaltree=false;
      this.formCustom.creatorDeptName=data[0].title;
      this.formCustom.creatorDeptId=data[0].id;
      data[0].selected = !data[0].selected;
    },
       // 选购产品
    remoteMethodpro(query) {
      if (query !== "") {
        this.loading2 = true;
        setTimeout(() => {
          let data = {
            productName: query
          };
          var that = this;
          queryProductSelectList(data).then(resp => {
            that.loading2 = false;
            // const list = resp.response.list.map(item => {
            //   return {
            //     value: item.id,
            //     label: item.productNameCn
            //   };
            // });

            that.produceList = resp.response;
          });
        }, 200);
      } else {
        this.produceList = [];
      }
    },
        //用户名
    selectAusername(data) {
      this.formCustom.userName = data.label;
      this.formCustom.userId = data.value;
    },
    remoteMethod1(query) {
      if (query !== "") {
        this.loading1 = true;
        setTimeout(() => {
          let data = {
            userName: query
          };
          let that = this;
          userSelectList(data).then(resp => {
            this.loading1 = false;
            const list = resp.response.map(item => {
              return {
                value: item.id,
                label: item.name
              };
            });
            this.options1 = list.filter(
              item =>
                item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    // nav切换
    navchange(index) {
      this.number = index;
    },

    // 选择日期
    changeDate(date){
      this.formCustom.createTimeStart = date[0];
      this.formCustom.createTimeEnd = date[1];
    },

    // 查询
    handleSubmit(name) {
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      let data = JSON.parse(JSON.stringify(this.formCustom));
      if (data.creatorDeptName) {
        delete data.creatorDeptName;
      }
      this.getlist(data);
    },
    // 复制
    copyText(text) {
      let str = text
      if(Array.prototype.isPrototypeOf(text)) {
        str = text.join('\n')
      }
      this.$copyText(str).then(res => {
        this.$Message.success('复制成功')
      }, err => {
        this.$Message.warning('复制失败')
      })
    },
    //重置
    handleReset() {
      this.formCustom = {};
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.$refs.kfref.model = "";
      this.$refs.breedDataRef.model = "";
      this.$refs.breedDataRef.getData("");
      this.value2 = [];
      this.$refs.breedDataRef1.model = "";
      this.$refs.breedDataRef1.query = "";
      this.$refs.breedDataRefpro.model = "";
      this.$refs.breedDataRefpro.query = "";
      
    },

    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
        this.formCustom.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
        this.formCustom.pageSize = pageSize;
      }
      this.getlist(this.formCustom);
    },

    //合同列表
    getlist(data) {
      let that = this;
      this.spinShow=true,
      userServiceLogList(formData(data)).then(resp => {
        that.spinShow=false
        if (resp.status == 200 && resp.response != null) {
          let data = resp.response.list;
          that.agreementmsg = data;
          that.total = resp.response.total;
        }
        else{
          that.agreementmsg = [];
          that.total = 0;
        }
      });
    },

    //根据公司名称模糊匹配下拉选择列表
    companyTypeFunction(companyData) {
      if (companyData) {
        this.formCustom.memberId = companyData.value;
      }else{
        this.formCustom.memberId = "";
      }
    },

    showtreeModal() {
      this.modaltree = true;
    },

    // 部门ok
    bmok() {
      if (this.hadselectbm.length != 0) {
        var namelist = this.hadselectbm.map(item => {
          return item.title;
        });
        this.formCustom.creatorDeptId = this.hadselectbm.map(item => {
          return item.id;
        });
        this.formCustom.creatorDeptName = namelist.join("/");
      } else {
        this.formCustom.creatorDeptId = [];
        this.formCustom.creatorDeptName = "";
      }
    },
    // 部门取消
    bmcancel() {},
    tree() {
      orgTree().then(resp => {
        // this.datatree=resp.response;
        var a = JSON.parse(resp.response);
        this.datatree = this.breedDigui(a);
      });
    },
    // 跟踪状态
    getUserServiceStatus(){
      queryServiceStatusList().then(resp => {
        this.typeList = resp.response;
      });
    },
    // 部门复选框
    selectbm(data) {
      this.hadselectbm = data;
    },
    breedDigui(data) {
      let dgData = data.map(item => {
        if (item.children && item.children.length > 0) {
          return {
            title: item.label,
            disableCheckbox: false,
            id: item.id,
            children: this.breedDigui(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
            disableCheckbox: false
          };
        }
      });
      return dgData;
    },
    getkf(data) {
      if (data) {
        this.formCustom.creatorId = data.value;
      } else {
        this.formCustom.creatorId = "";
      }
    }
  },
  created() {
    this.formCustom.pageSize = 10;
    this.formCustom.pageNum = 1;
    this.getlist(this.formCustom);
    this.tree();
    this.getUserServiceStatus();
  }
};
</script>
