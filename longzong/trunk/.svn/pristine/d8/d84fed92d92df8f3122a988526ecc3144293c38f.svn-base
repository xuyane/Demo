<style lang="less" >
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
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;通话记录
            </Row>
        </i-col>
        <Col span='24'>

            <Row :gutter="20">
                <Col span='24' >
                  <Card style="margin-bottom:20px" class-name="search-form">
                    <!-- <div class="btn-container">
                      <Button   v-for="(item,index) in items" class="search-btn" :key='index' @click="navchange(index)"  :type="index==number?'warning':'primary'">{{item.name}}</Button>
                    </div> -->
                    <Row>
                      <Col span='10'>
                        <div class="navcontainer">
                          <span class="tab" 
                            v-for="(item,index) in items" 
                            :key="index"
                            :class="index==number? 'tab-active' : ''"
                            @click="navchange(index)">
                            {{item.name}}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    
                    
                    <div  >
                        <Form ref="formCustom" :model="formCustom"  :label-width="120">
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="电话类型:"  >
                                        <Select v-model="formCustom.callType" >
                                            <Option v-for="item in callList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                    
                                    </Col>
                                <Col span='7'>
                                    <FormItem label="通话结果类型:"  >
                                        <Select v-model="formCustom.callResultType" >
                                            <Option v-for="item in resultList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="通话开始时间:"  >
                                        <DatePicker :value="value2" @on-change="changeDate" format="yyyy/MM/dd" type="daterange" placement="bottom-start" class="search-input"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="电话号码:" >
                                        <Input type="text" v-model="formCustom.phone" class="search-input"></Input>
                                    </FormItem>
                                 </Col>
                                <Col span='7'>
                                    <FormItem label="业务员部门:" >
                                        <Input type="text" v-model="formCustom.departmentName" class="search-input" @on-focus='showtreeModal' readonly></Input>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="业务员:"  >
                                         <associate-Search @query-list="getkf" :dataUrl="url1" :parameterName='name1' ref='kfref'></associate-Search>
                                    </FormItem>
                                </Col>   
                                
                                
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="公司名称:"  >
                                        <!-- <Input type="text" v-model="formCustom.memberName" class="search-input"></Input> -->
                                        <associate-Search ref='breedDataRef' @query-list="companyTypeFunction" :dataUrl="url" :parameterName='name' :parameterValue='value1' ></associate-Search>
                                    </FormItem>
                                 </Col>
                                 <Col span='7'>
                                    <FormItem label="联系人:" >
                                        <!-- <Input type="text" v-model="formCustom.userName" class="search-input"></Input> -->
                                        <Select class="companyipt"
                                          v-model="model13"
                                          filterable
                                          remote
                                          ref='breedDataRef1'
                                          :remote-method="remoteMethod1"
                                          @on-change='selectAusername'
                                          :label-in-value='true'
                                          :loading="loading1">
                                          <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                                        </Select>
                                    </FormItem>
                                 </Col>
                                
                                <Col span='7' >
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
                        <oil-page :total="total" :page-size="findlistmsg.pageSize" :page-num="findlistmsg.pageNum" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>

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
        <Tree :data="datatree" @on-select-change="selected"  @on-check-change='selectbm'></Tree>
    </Modal>
        <Spin size="large" fix v-if="spinShow"></Spin> 
    </Row>
</template>
<script>
import oilPage from "../../components/page/page.vue";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import { formatTime2,formData } from "../../../assets/js/common.js";
import axios from "axios";
import {
  getCallRecords,
  orgTree,
  userSelectList
} from "../../components/axios/crm.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import dial from '@/assets/js/linkDial.js';
export default {
  name: "myAgreement",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      spinShow:false,
      model13: "",
      loading1: false,
      options1: [],
      callList: [
        { value: "", label: "请选择" },
        { value: "1", label: "呼入" },
        { value: "2", label: "呼出" }
      ],
      resultList: [
        { value: "", label: "请选择" },
        { value: "0", label: "未知" },
        { value: "1", label: "接通" },
        { value: "2", label: "未接" }
      ],
      typeList: [
        {
          value: "0",
          label: "正式用户"
        },
        {
          value: "1",
          label: "免费用户"
        },
        {
          value: "2",
          label: "试用用户"
        }
      ],
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
      value2: [],
      items: [{ name: "通话记录", id: 0 }, { name: "预约提醒", id: 1 }],
      number: 0,
      hadselectbm: [],
      modaltree: false,
      datatree: [],
      loading1: false,
      companyData: "",
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
      findlistmsg: {
        pageSize: 10,
        pageNum: 1
      },
      columns: [
        {
          title: "公司名称",
          key: "memberName",
          minWidth: 100,
          className: "colorbluer",
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
              data.row.memberName
            );
          }
        },
        {
          title: "联系人",
          minWidth: 114,
          className: "colorbluer",
          render: (h, data) => {
            let text = data.row.userName;

            if(data.row.userName == null || data.row.userName == ""){
              text = data.row.contactName;
            }
            
            return h('span', {}, text);
          }
        },
        {
          title: "电话号码",
          minWidth: 120,
          key: "phone",
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.onDial(data.row.phone);
                    }
                  }
                },
                data.row.phone
              )
            ]);
          }
        },
        {
          title: "业务员",
          minWidth: 100,
          key: "employeeName",
          render: (h, data) => {
            let text = "";

            if (data.row.employeeName) {
              text =
                data.row.departmentName +
                "-" +
                data.row.employeeName +
                "(" +
                data.row.extCode +
                ")";
            }

            return h("span", {}, text);
          }
        },
        {
          title: "电话类型",
          minWidth: 80,
          key: "callType",
          render: (h, data) => {
            let callTypetext = "";
            switch (data.row.callType) {
              case 1:
                callTypetext = "呼入";
                break;
              case 2:
                callTypetext = "呼出";
                break;
            }
            return h("span", {}, callTypetext);
          }
        },
        {
          title: "通话开始时间",
          minWidth: 150,
          key: "connectStartTime",
          render: (h, data) => {
            let result = "";

            if (data.row.connectStartTime != null && data.row.connectStartTime > 0) {
              result = formatTime2(data.row.connectStartTime);
            }

            return h("span", {}, result);
          }
        },
        {
          title: "通话结束时间",
          minWidth: 150,
          key: "connectEndTime",
          render: (h, data) => {
            let result = "";

            if (data.row.connectEndTime != null && data.row.connectEndTime > 0) {
              result = formatTime2(data.row.connectEndTime);
            }

            return h("span", {}, result);
          }
        },

        {
          title: "时长",
          minWidth: 80,
          key: "connectTimeLen"
        },
        {
          title: "操作",
          key: "action",
          width: 350,
          // fixed: 'right',
          className: "colorbluer",
          align: "center",
           render: (h, data) => {
            var htmls ='<audio controls src="'+data.row.fileUrl +'">您的浏览器不支持 h5音频 标签。</audio>';
            return h("div", {
              domProps: {
                innerHTML: htmls
              }
            });
          }
        }
      ],
      agreementmsg: []
    };
  },
  methods: {
    //点击部门
    selected(data) {
      this.modaltree = false;
      this.formCustom.departmentName = data[0].title;
      this.formCustom.departmentId = data[0].id;
      data[0].selected = !data[0].selected;
    },
    remoteMethod1(query) {
      if (this.formCustom.memberId) {
        if (query !== "") {
          this.loading1 = true;
          setTimeout(() => {
            let data = {
              memberId: this.formCustom.memberId,
              realName: query
            };
            let that = this;
            userSelectList(data).then(resp => {
              this.loading1 = false;
              const list = resp.response.map(item => {
                return {
                  value: item.id,
                  label: item.realName
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
      } else {
        this.$Message.info("请先选择公司名称");
      }
    },
    // nav切换
    navchange(index) {
      // this.number = index;
      if (index == 1) {
        this.$router.push({
          name: "reservationRemind"
        });
      }
    },
    // 选择日期
    changeDate(date) {
      this.formCustom.connectStartTimeStart = date[0];
      this.formCustom.connectStartTimeEnd = date[1];
    },
    // 试听录音
    auditions(data) {},
    // 下载录音
    downloadRecord(data) {},
    // 查询
    handleSubmit(name) {
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.findlistmsg = JSON.parse(JSON.stringify(this.formCustom));
      // if ( this.findlistmsg.departmentName) {
      //   delete  this.findlistmsg.departmentName;
      // }
      this.getlist(this.findlistmsg);
    },
    //重置
    handleReset() {
      this.formCustom = {};
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.$refs.breedDataRef.model = "";
      this.$refs.breedDataRef.getData("");
      this.$refs.kfref.model = "";
      this.value2 = [];
      this.$refs.breedDataRef1.model = "";
      this.$refs.breedDataRef1.query = "";
    },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
        this.findlistmsg.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
        this.findlistmsg.pageSize = pageSize;
      }
      this.getlist(this.findlistmsg);
    },

    //通话记录列表
    getlist(data) {
      let that = this;
      this.spinShow=true;
      getCallRecords(formData(data)).then(resp => {
        that.spinShow=false;
        if (resp.status == 200 && resp.response.pageInfo != null) {
          /*let data = resp.response.pageInfo.list;
          for (var i = 0; i < data.length; i++) {
            data[i].connectStartTime = timeStampChange.format(
              resp.response.pageInfo.list[i].connectStartTime
            );
            data[i].connectEndTime = timeStampChange.format(
              resp.response.pageInfo.list[i].connectEndTime
            );
          }*/
          that.agreementmsg = resp.response.pageInfo.list;
          that.total = resp.response.pageInfo.total;
        } else {
          that.agreementmsg = [];
          that.total = 0;
        }
      });
    },
    //用户名
    selectAusername(data) {
      this.formCustom.userName = data.label;
      this.formCustom.userId = data.value;
    },
    //根据公司名称模糊匹配下拉选择列表
    companyTypeFunction(companyData) {
      if (companyData) {
        this.formCustom.memberId = companyData.value;
        this.model13 = "";
        this.loading1 = false;
        this.options1 = [];
      } else {
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
        this.formCustom.departmentId = this.hadselectbm.map(item => {
          return item.id;
        });
        this.formCustom.departmentName = namelist.join("/");
      } else {
        this.formCustom.departmentId = [];
        this.formCustom.departmentName = "";
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
        this.formCustom.employeeId = data.value;
      } else {
        this.formCustom.employeeId = "";
      }
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({title: '呼叫成功：' + phone})
      });
    },
  },
  created() {
    // this.$Spin.show();

    this.getlist(this.findlistmsg);
    this.tree();
  }
};
</script>
