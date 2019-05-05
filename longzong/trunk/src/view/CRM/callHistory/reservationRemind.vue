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
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;预约提醒
            </Row>
        </i-col>
        <Col span='24'>

            <Row :gutter="20">
                <Col span='24' >
                  <Card class="tablewrap">
                    <Row >
                      <Row>
                      <Col >
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
                      <Col span='2' style="margin:20px 0 10px;">
                        <Button type="primary" class="search-btn-w" @click="showadd" >新增预约提醒</Button>
                        <!-- <Button type="default"></Button> -->
                      </Col>
                    </Row>
                      <Table class="tableCommon" border :columns="columns" :data="agreementmsg" ></Table>
                        <oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>

                    </Row>
                  </Card>
                </Col>
                
            </Row>
            
        </Col>
        <Modal
        v-model="addmodal"
        title="新增预约提醒"
        @on-cancel="adddel" width='550'>
          <Form :model="formItem" ref='formItem' :rules="ruleValidate" :label-width="100">
            <FormItem label="预约时间：" prop='reservationTime'>
               <DatePicker type="datetime"  v-model="formItem.reservationTime" style="width: 200px" @on-change='selecttime'></DatePicker>
            </FormItem>
            <Row>
              <Col span='12'>
                <FormItem label="预约类型：">
                  <Select v-model="formItem.type" style="width:150px">
                    <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span='12'>
                <FormItem label="预约对象：" prop='memberId'> 
                   <associate-Search ref='breedDataRef' @query-list="companyTypeFunction" :dataUrl="url" :parameterName='name' ></associate-Search>
                </FormItem>
              </Col>
              <Col span='12'>
                <FormItem label="用户姓名" prop='userId'>
                  <!-- <Input type="text" v-model="formItem.userName" class="search-input"></Input> -->
                  <Select class=""
                    v-model="formItem.userId"
                    filterable
                    remote
                    ref='breedDataRef1'
                    :remote-method="remoteMethod1"
                    @on-change=' selectAusername'
                    :label-in-value='true'
                    :loading="loading1">
                    <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="预约事宜：" prop='note'> 
               <Input v-model="formItem.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}"  />
            </FormItem>
        
        </Form>
        <div slot="footer">
          <Button type="primary" size="large"  @click="addconfirm">确定</Button>
          <Button  size="large"  @click="adddel">取消</Button>
        </div>
      </Modal>
        <Spin size="large" fix v-if="spinShow"></Spin> 
    </Row>
</template>
<script>
import oilPage from "../../components/page/page.vue";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import { formData } from "../../../assets/js/common.js";
import axios from "axios";
import {
  userreServationList,
  userReservationSave, //保存预约
  getStatus,
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
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("预约时间不能为空"));
      } else {
        callback();
      }
    };
    return {
      spinShow:false,
      options1: [],
      loading1: false,

      ruleValidate: {
        memberId: [
          {
            required: true,
            type: "number",
            message: "请选择预约对象",
            trigger: "change"
          }
        ],
        reservationTime: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        userId: [
          {
            required: true,
            type: "number",
            message: "请选择用户",
            trigger: "change"
          }
        ],
        note: [
          {
            required: true,
            type: "string",
            message: "请输入预约事宜",
            trigger: "blur"
          },
          {
            required: true,
            max: 200,
            message: "最多200个字符",
            trigger: "blur"
          }
        ]
      },
      formItem: {
        type: "0"
      },
      typeList: [
        {
          value: "0",
          label: "临时"
        },
        {
          value: "1",
          label: "每日"
        },
        {
          value: "2",
          label: "每周"
        },
        {
          value: "3",
          label: "每月"
        }
      ],
      // timeList: [
      //   {
      //     value: "0",
      //     label: "不提前"
      //   },
      //   {
      //     value: "1",
      //     label: "5分钟"
      //   }
      // ],
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
      value2: [],
      items: [{ name: "通话记录", id: 0 }, { name: "预约提醒", id: 1 }],
      number: 1,
      hadselectbm: [],
      addmodal: false,
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
      ruleCustom: {},
      findlistmsg: {},
      columns: [
        {
          title: "时间",
          minWidth: 114,
          key: "reservationTime",
          render: (h, data) => {
            return h("span",{},data.row.reservationTime?timeStampChange.format(data.row.reservationTime):data.row.reservationTime);
          }
        },
        {
          title: "预约类型",
          minWidth: 180,
          key: "type",
          render: (h, data) => {
            var a = "";
            switch (data.row.type) {
              case 0:
                a = "临时";
                break;
              case 1:
                a = "每日";
                break;
              case 2:
                a = "每周";
                break;
              case 3:
                a = "每月";
                break;
            }
            return h("span", {}, a);
          }
        },
        {
          title: "预约对象",
          minWidth: 100,
          key: "userName"
        },
        {
          title: "联系人",
          minWidth: 180,
          key: "userName"
        },
        {
          title: "电话号码",
          minWidth: 150,
          key: "phonetwo",
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
                      this.onDial(data.row.phonetwo);
                    }
                  }
                },
                data.row.phonetwo
              )
            ]);
          }
        },
        {
          title: "预约事宜",
          minWidth: 150,
          key: "note"
        }
      ],
      agreementmsg: [
        // {
        //   companyname: "公司名字",
        //   userName: "用户名",
        //   contractCode: "合同编号",
        //   contractStatus: "合同状态",
        //   totalAmount: "洽谈金额",
        //   produce: "选购产品",
        //   createTime: "创建日期",
        //   accountTime: "到账日期",
        //   checkTime: "认账日期",
        //   adminName: "业务员",
        //   mobile: "业务员电话"
        // }
      ]
    };
  },
  methods: {
    //用户名
    selectAusername(data) {
      this.formItem.userName = data.label;
      this.formItem.userId = data.value;
    },
    remoteMethod1(query) {
      if (this.formItem.memberId) {
        if (query !== "") {
          this.loading1 = true;
          setTimeout(() => {
            let data = {
              memberId: this.formItem.memberId,
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
    selecttime(date) {
     
    },
    // nav切换
    navchange(index) {
      // this.number = index;
      if (index == 0) {
        this.$router.push({
          name: "callHistory"
        });
      }
    },

    // 新增弹窗出现
    showadd() {
      this.addmodal = true;
    },
    // 新增确定
    addconfirm() {
      this.$refs.formItem.validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.formItem));
          data.type = Number(data.type);
          data.reservationTime = new Date(data.reservationTime).getTime();
          let that = this;
          this.spinShow=true;
          userReservationSave(data).then(resp => {
            that.spinShow=false;
            that.$Message.info(resp.message);
            that.addmodal = false;
          });
          
        } else {
          // this.$Message.error("Fail!");
        }
      });
    },
    // 新增取消
    adddel() {
      this.$refs.formItem.resetFields();
      this.addmodal = false;
    },
    addmsg() {
      this.showAddModal = true;
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

    //合同列表
    getlist(data) {
      let that = this;
      this.spinShow=true;
      // if(data.adminDeptValue){
      //   delete data.adminDeptValue
      // }
      userreServationList(data).then(resp => {
        that.spinShow=false;
        if (resp.status == 200) {
          let data = resp.response.list;
          // for (var i = 0; i < data.length; i++) {
          //   data[i].createTime = timeStampChange.format(
          //     resp.response.list[i].createTime
          //   );
          //   data[i].accountTime = timeStampChange.format(
          //     resp.response.list[i].accountTime
          //   );
          //   data[i].checkTime = timeStampChange.format(
          //     resp.response.list[i].checkTime
          //   );
          // }
          that.agreementmsg = data;
          that.total = resp.response.total;
        }
      });
    },

    //根据公司名称模糊匹配下拉选择列表
    companyTypeFunction(companyData) {
      // this.companyData = companyData;
      if (companyData) {
        this.formItem.memberName = companyData.label;
        this.formItem.memberId = companyData.value;

        this.loading1 = false;
        this.options1 = [];
      }else{
         this.formItem.memberName = '';
        this.formItem.memberId = '';

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
    this.findlistmsg.pageSize = 10;
    this.findlistmsg.pageNum = 1;
    this.getlist(this.findlistmsg);
  }
};
</script>
