<style lang="less" scoped>
.breedtree .ivu-modal-body {
  max-height: 500px;
  overflow-y: scroll;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;用户分配
      </Row>
    </Col>
    <tab-header :tab-index="2"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="80">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="公司名称:">
             <Select
                v-model="formItem.memberId"
                ref="input1"
                class="search-input"
                filterable
                remote
                clearable
                :remote-method="remoteMethod1"
                @on-query-change="emptyQuery"
                :loading="loading">
                <Option v-for="(option, index) in options1" :value="option.id" :key="index"> <{{option.id}}>{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <!-- <Col span="7">
            <FormItem label="关注产品:">
              <Input v-model="formItem.product" class="search-input" placeholder="请输入关注产品"></Input>
            </FormItem>
          </Col> -->
          <Col span="7">
            <FormItem label="注册时间:">
              <DatePicker
                v-model="time" 
                format="yyyy/MM/dd" 
                type="daterange"
                clearable
                placeholder="请选择注册时间"
                class="search-input"></DatePicker>
            </FormItem>
          </Col>

          <Col span="7">
            <FormItem label="注册来源:">
              <Select v-model="formItem.regSource" clearable class="form-select" placeholder="请选择注册来源">
                <Option v-for="item in customerSource" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="登录时间:">
              <DatePicker
                v-model="time2"
                format="yyyy/MM/dd" 
                type="daterange"
                clearable
                placeholder="请选择登录时间"
                class="search-input"></DatePicker>
            </FormItem>
          </Col>

          <Col span='7'>
            <Form-item label="关注品种:">
              <associate-Search ref='breedDataRef' class="search-input" @query-list="produceFunction" :dataUrl="url" :parameterName='name' ></associate-Search>
              <!-- <Input placeholder="请选择关注品种" clearable class="search-input" v-model="variet" @on-focus='showtreeModal' readonly></Input> -->
            </Form-item>
          </Col>
          
          <Col span="7">
            <FormItem label="通话时间:">
              <DatePicker
                v-model="calltime"
                format="yyyy/MM/dd" 
                type="daterange"
                clearable
                placeholder="请选择通话时间"
                class="search-input"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="跟踪时间:">
              <DatePicker
                v-model="gztime"
                format="yyyy/MM/dd" 
                type="daterange"
                clearable
                placeholder="请选择跟踪时间"
                class="search-input"></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="用户名:">
              <Input clearable v-model="userName"   class="search-input" placeholder="请输入用户名"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="联系方式:">
              <Input clearable  v-model="mobile"  class="search-input" placeholder="请输入联系方式"></Input>
            </FormItem>
          </Col>         
        </Row>
        <Row type="flex" >
          <Col span="7">
            <FormItem label="来源分类:">
              <Select v-model="formItem.publicResouceType" clearable class="form-select" placeholder="请选择来源分类">
                <Option v-for="item in Sourcetype" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7" offset='10' class="text-right">
            <FormItem>
              <Button type="primary" @click="findListPage">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="distribute">分配</Button>
        </div>
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true"
          @on-selection-change="selectChange">
        </Table>

        <oil-page
          :total="total"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
    </Col>
    <Modal
        v-model="modaltree"
        title="请选择品种"
        @on-ok="pzok"
        class="breedtree"
        @on-cancel="pzcancel">
        <Tree :data="breeddata" show-checkbox :load-data="loadData"  @on-check-change='selectpz'></Tree>
    </Modal>
    <Modal v-model="showhistoryModal" class="historywrap1"  width="1000" @on-cancel="confirm">
    <p slot="header" >
        <Row>
          <Col span="12">跟踪记录</Col>
          <Col span="12">通话记录</Col>
        </Row>
    </p>
    <Row>
      <Col span='12'>
        <div class="historywrap">
        <div v-if='truckData.length==0'>跟踪记录暂无数据</div>
        <div v-else>
          <!-- <div style="text-align:right"><Button type="text" size='small' @click="goedit(1)">更多>></Button></div> -->
          <Table
            size="small"
            class="tableCommon1 "
            :data="truckData"
            :columns="truccolumns"
            height='300'
            ref="dragTable1"
            :stripe="false"
            :border="false"
          ></Table>
        </div>
      </div>
      
      </Col>
      <Col span="12">
        <div v-if='callData.length==0'>通话记录暂无数据</div>
        <div v-else>
          <!-- <div style="text-align:right"><Button type="text" size='small' @click="goedit(2)">更多>></Button></div> -->
          <Table
            size="small"
            class="tableCommon1 "
            :data="callData"
            :columns="callcolumns"
            height='300'
            ref="callTable"
            :stripe="false"
            :border="false"
          ></Table>
        </div>
      </Col>
    </Row>
    <div slot="footer">
      <i-button type="primary" @click="confirm" class="search-btn"> 确定</i-button>
      <i-button @click="confirm" class="search-btn">取消</i-button>
    </div>
  </Modal>
  </Row>
</template>
<script>
import TabHeader from "./tabHeader";
import associateSearch from "../../../components/associateSearch/getAssociateSearch.vue";
import OilPage from "../../../components/page/page.vue";
import {
  formData,
  formatStamp,
  formatTime,
  formatType,
  formatTime2
} from "../../../../assets/js/common.js";
import timeStampChange from "../../../../assets/js/timestamp_change.js";
import {
  getUserResource,
  getAdminList,
  getPublicResourceAllotList,
  memberSelectList,
  checkAutomatic,
  getFollow,
  isQueryMax,
  queryBreedTree, //品种
  checkHelp,
  userServiceLogList,
  getCallRecords,
  memberBreedsList,
  queryServiceStatusList,
  userServiceLoglistNoPower,
  crmCallRecordsListNoPower
} from "../../../components/axios/crm.js";
import dial from "@/assets/js/linkDial.js";
export default {
  data() {
    return {
      url: "/crm/common/query-breed-select-list",
      name: "breedName",
      Sourcetype:[
        {
          value:'1',
          desc:'放弃用户'
        },
         {
          value:'2',
          desc:'试阅到期'
        },
         {
          value:'3',
          desc:'跟踪到期'
        },
         {
          value:'4',
          desc:'未正常联系'
        },
         {
          value:'5',
          desc:'产品正式权限到期'
        }
      ],
      userName:'',
      mobile:'',
      followTypes: [],
      followTypes2: [],
      actionmemberId: 0,
      showhistoryModal: false,
      callcolumns: [
        {
          title: "联系人",
          minWidth: 60,
          className: "colorbluer",
          // render: (h, data) => {
          //   let text = data.row.userName;

          //   if(data.row.userName == null || data.row.userName == ""){
          //     text = data.row.contactName;
          //   }

          //   return h('span', {}, text);
          // }
          render: (h, data) => {
            let text = data.row.userName;

            if (data.row.userName == null || data.row.userName == "") {
              text = data.row.contactName;
            }
            return h(
              "Tooltip",
              {
                props: {
                  placement: "top",
                  maxWidth: 400
                },
                style: {
                  display: "block",
                  color: "#2d8cf0",
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }
              },
              [
                h("span", text > 3 ? text.substring(0, 3) + "..." : text),
                h("div", {
                  slot: "content",
                  domProps: {
                    innerHTML: text
                  }
                })
              ]
            );
          }
        },
        {
          title: "电话号码",
          minWidth: 100,
          key: "phone",
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.onDial(data.row.phone);
                  }
                }
              },
              data.row.phone
            );
          }
        },
        {
          title: "通话开始时间",
          minWidth: 130,
          key: "connectStartTime",
          render: (h, data) => {
            let result = "-";

            if (
              data.row.connectStartTime != null &&
              data.row.connectStartTime > 0
            ) {
              result = formatTime2(data.row.connectStartTime);
            }

            return h("span", {}, result);
          }
        },
        {
          title: "通话结束时间",
          minWidth: 130,
          key: "connectEndTime",
          render: (h, data) => {
            let result = "-";

            if (
              data.row.connectEndTime != null &&
              data.row.connectEndTime > 0
            ) {
              result = formatTime2(data.row.connectEndTime);
            }

            return h("span", {}, result);
          }
        },
        {
          title: "时长",
          minWidth: 45,
          key: "connectTimeLen"
        }
      ],
      truccolumns: [
        {
          key: "content",
          title: "跟踪内容",
          minWidth: 120,
          render: (h, data) => {
            return h(
              "Tooltip",
              {
                props: {
                  placement: "top",
                  maxWidth: 400
                },
                style: {
                  display: "block",
                  color: "#2d8cf0",
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }
              },
              [
                h(
                  "span",
                  // {
                  //   on: {
                  //     click: () => {
                  //       // this.check(data)
                  //       this.copyText(data.row.memberName);
                  //     }
                  //   }
                  // },
                  data.row.content > 10
                    ? data.row.content.substring(0, 10) + "..."
                    : data.row.content
                ),
                h("div", {
                  slot: "content",
                  domProps: {
                    innerHTML: data.row.content
                  }
                })
              ]
            );
          }
        },
        {
          key: "status",
          title: "跟踪状态",
          minWidth: 80
        },
        {
          title: "跟踪时间",
          minWidth: 80,
          render: (h, data) => {
            return h("span", {}, formatTime(data.row.createTime));
          }
        },
        {
          key: "creatorName",
          title: "跟踪人",
          minWidth: 80
        }
      ],
      truckData: [],
      callData: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      options1: [],
      loading: false,
      customerSource: [],
      time: [],
      calltime: [],
      gztime: [],
      time2: [],
      listBreed: [],
      breeddata: [],
      hasselectpz: [],
      varietys: [],
      variet: "",
      modaltree: false,
      formItem: {
        isUserAllot: 2,
        memberName: "",
        // product: '',
        regSource: "",
        breedIds: []
      },
      selection: [],
      tableData: [],
      // tableData1: [{breedVOs:[{name:'汽油',sign:'7/85654//'},{name:'没有',sign:'7/84wddf//'},{name:'chaiyou',sign:'//'}]}],
      userId: [],
      memberId: [],
      userIds: [],
      userIdstr: "",
      productDetailData1: [],
      isCustomer: false,
      columns: [
        {
          type: "selection",
          align: "center",
          width: 60
        },
        {
          key: "memberName",
          title: "公司名称",
          minWidth: 120
        },
        {
          key: "userName",
          title: "用户",
          minWidth: 120,
          render:(h,data)=>{
            return h('span',data.row.userName+'('+data.row.name+')')
          }
        },
        {
          key: "mobile",
          title: "联系方式",
          minWidth: 120
        },
        {
          key: "breedVOs",
          title: "关注品种",
          className: "test",
          minWidth: 100,
          render: (h, data) => {
            return h(
              "Tooltip",
              {
                props: {
                  placement: "top",
                  maxWidth: 400
                },
                style: {
                  display: "block",
                  color: "#2d8cf0",
                  cursor: "pointer",
                  textOverflow: "ellipsis"
                }
              },
              [
                h(
                  "span",
                  {
                    on: {
                      click: () => {
                        // this.check(data)
                        this.copyText(this.productDetailData1);
                      },
                      mouseover: () => {
                        let msg = {
                          memberId: data.row.memberId
                        };
                        let that = this;
                        that.listBreed = [];
                        memberBreedsList(formData(msg)).then(res => {
                          let list = [];
                          if (res.response && res.response.length > 0) {
                            res.response.map(item => {
                              let str = item.name;
                              list.push(str);
                            });
                            that.listBreed = list;
                          }
                          else{
                             list.push("无");
                              that.listBreed = list;
                          }
                        });
                      }
                    }
                  },
                  "详情"
                ),
                h("div", {
                  slot: "content",
                  domProps: {
                    // innerHTML: this.productDetailData1.join('<br />')
                    innerHTML: this.listBreed.join("<br>")
                  }
                })
              ]
            );
          }
        },
        {
          key: "registerTime",
          title: "注册时间",
          minWidth: 120
        },
        {
          key: "lastConnectStartTime",
          title: "通话时间",
          minWidth: 120,
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.actionmemberId = data.row.memberId;
                    this.showhistory();
                  }
                }
              },
              data.row.lastConnectStartTime
                ? timeStampChange.format(data.row.lastConnectStartTime)
                : ""
            );
          }
        },
        {
          key: "lastServiceCreateTime",
          title: "跟踪时间",
          minWidth: 120,
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.actionmemberId = data.row.memberId;
                    this.showhistory();
                  }
                }
              },
              data.row.lastServiceCreateTime
                ? timeStampChange.format(data.row.lastServiceCreateTime)
                : ""
            );
          }
        },
        {
          key: "lastLoginTime",
          title: "最近登录时间",
          minWidth: 120
        },
        // {
        //   key: "browseRecords",
        //   title: "浏览记录",
        //   minWidth: 100
        // },
        {
          key: "regSource",
          title: "用户来源",
          minWidth: 80,
          render: (h, data) => {
            var text = '';
            this.customerSource.map(item=>{
              if(data.row.regSource==item.value){
                text=item.desc
              }
            })
            return h("span", {}, text);
          }
        },
         {
          key: "publicResouceType",
          title: "来源分类",
          minWidth: 80,
          render: (h, data) => {
            var text = "";
            switch (Number(data.row.publicResouceType)) {
              case 1:
                text = "放弃用户";
                break;
              case 2:
                text = "试阅到期";
                break;
              case 3:
                text = "跟踪到期";
                break;
              case 4:
                text = "未正常联系";
                break;
              case 5:
                text = "产品正式权限到期";
                break;
            }

            return h("span", {}, text);
          }
        },
        {
          key: "",
          title: "操作",
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.oneDistribute(data);
                    }
                  }
                },
                "分配"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: ($event) => {
                      this.follow(data);
                      $event.currentTarget.parentElement.textContent='';
                    }
                  }
                },
                "我要跟踪"
              )
            ]);
          }
        }
      ]
    };
  },
  components: {
    associateSearch,
    TabHeader,
    OilPage
  },
  created() {
    this.getUserResource();
    this.getListPage();
    this.getpztree();
    this.isSet();
    this.getAllFollowTypes();
  },
  methods: {
    produceFunction(data) {
     
      if (data) {
        this.formItem.breedIds = data.value;
      } else {
        this.formItem.breedIds = "";
      }
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({ title: "呼叫成功：" + phone });
      });
    },
    goedit(a) {
      this.$router.push({
        name: a == 1 ? "followRecord" : "callRecord"
      });
    },
    formatSeconds(seconds) {
      if (seconds == null) {
        return "";
      } else if (seconds < 60) {
        return `${seconds}秒`;
      } else if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}分${seconds % 60}秒`;
      } else {
        return `${Math.floor(seconds / 3600)}小时${Math.floor(
          (seconds - Math.floor(seconds / 3600) * 3600) / 60
        )}分${seconds % 60}秒`;
      }
    },
    getcalllist() {
      let that = this;
      this.$Spin.show();
      let params = {
        pageNum: 1,
        pageSize: 20,
        // memberId: 632186
        memberId: this.actionmemberId
      };
       that.callData = [];
      crmCallRecordsListNoPower(formData(params)).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200 && resp.response != null) {
          let data = resp.response.list;
          that.callData = data;
          // that.total = resp.response.pageInfo.total;
        } else {
          that.callData = [];
          // that.total = 0;
        }
      });
    },
    formatFollowType(val) {
      let desc = "";
      this.followTypes.map(item => {
        if (item.value === Number(val)) {
          desc = item.desc;
          return;
        }
      });
      return desc;
    },
    formatFollowType2(val) {
      let desc = "";
      this.followTypes2.map(item => {
        if (item.value === val) {
          desc = item.desc;
          return;
        }
      });
      return desc;
    },
    gethistorylist() {
      let params = {
        pageSize: 20,
        pageNum: 1,
        memberId: this.actionmemberId
        // memberId: 770341
      };
      let that = this;
      that.truckData = [];
      userServiceLoglistNoPower(formData(params)).then(resp => {
        if (resp.response) {
          that.truckData = resp.response.list;
          that.truckData.map(item => {
            item.createTime = formatTime(item.createTime);
            item.status = that.formatFollowType2(item.status);
          });
        }else{
           that.truckData = [];
        }
      });
    },
    // 获取所有跟踪状态
    getAllFollowTypes() {
      queryServiceStatusList().then(res => {
        this.followTypes = res.response.filter(item => item.value >= 0);
        this.followTypes2 = res.response;
      });
    },
    showhistory() {
      this.showhistoryModal = true;
      this.gethistorylist();
      this.getcalllist();
    },
    confirm() {
      this.showhistoryModal = false;
    },
    // 获取公司名称下拉搜索
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          isNotRlAdmin:2,
          memberName: query.replace(/\<.*?\>/g,'')
        };
        this.formItem.memberName = query.replace(/\<.*?\>/g,'');
        setTimeout(() => {
          this.loading = false;
          memberSelectList(params).then(res => {
            this.options1 = res.response;
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    // 品种弹窗出现
    showtreeModal() {
      this.modaltree = true;
    },
    //勾选品种
    selectpz(data) {
      this.hasselectpz = data;
    },
    // 品种弹窗取消
    pzcancel() {},
    // 品种弹窗确定
    pzok() {
      this.varietys = this.hasselectpz.map(item => {
        if (item.type == 0) {
          return {
            name: item.title,
            id: item.id
          };
        }
      });
      for (var i = 0; i < this.varietys.length; i++) {
        if (this.varietys[i] == undefined) {
          this.varietys.splice(i, 1);
          i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
          // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
        }
      }
      const namelist = this.varietys.map(item => {
        // if (item.name) {
        return item.name;
        // }

        //
      });
      const idList = this.varietys.map(item => {
        // if (item.id) {
        return item.id;
        // }

        //
      });
      this.formItem.breedIds = idList;
      this.variet = namelist.join("/");
    },
    loadData(a, callback) {
      setTimeout(() => {
        let msg = {
          parentCode: a.value
        };
        queryBreedTree(msg).then(resp => {
          const data = resp.response.map(option => {
            if (option.type != 0) {
              return {
                title: option.nodeName,
                value: option.nodeCode,
                id: option.nodeId,
                disableCheckbox: true,
                children: [],
                type: option.type,
                loading: false
                // render:
              };
            } else {
              return {
                title: option.nodeName,
                value: option.nodeCode,
                type: option.type,
                id: option.nodeId
                // loading: false
                // render:
              };
            }
          });
          callback(data);
        });
      }, 1000);
    },
    // 点击品种节点
    loadson(data) {},
    // 品种树
    getpztree(data) {
      let msg = {
        parentCode: data
      };
      queryBreedTree(msg).then(resp => {
        this.breeddata = resp.response.map(option => {
          if (option.type != 0) {
            return {
              title: option.nodeName,
              value: option.nodeCode,
              id: option.nodeId,
              disableCheckbox: true,
              children: [],
              type: option.type,
              loading: false
              // render:
            };
          } else {
            return {
              title: option.nodeName,
              value: option.nodeCode,
              id: option.nodeId,
              type: option.type
              // loading: false
              // render:
            };
          }
        });
      });
    },
    // 复制
    copyText(text) {
      let str = text;
      if (Array.prototype.isPrototypeOf(text)) {
        str = text.join("\n");
      }
      this.$copyText(str).then(
        res => {
          this.$Message.success("复制成功");
        },
        err => {
          this.$Message.warning("复制失败");
        }
      );
    },
    // 清空公司
    emptyQuery(query) {
      if (query == "") {
        this.formItem.memberName = "";
        return;
      }
    },
    //查询
    findListPage() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.getListPage();
    },
    // 获取列表数据
    getListPage() {
      this.$Spin.show();
      let params = {
        publicResouceType:this.formItem.publicResouceType||"",
        isUserAllot: this.formItem.isUserAllot,
        name:this.userName,
        mobile:this.mobile,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        memberId: this.formItem.memberId || "",
        memberName: this.formItem.memberName || "",
        registerTimeStart: this.time[0] ? formatTime(this.time[0]) : "",
        registerTimeEnd: this.time[1] ? formatTime(this.time[1]) : "",
        loginTimeStart: this.time2[0] ? formatTime(this.time2[0]) : "",
        loginTimeEnd: this.time2[1] ? formatTime(this.time2[1]) : "",
        regSource: formatType(this.formItem.regSource),
        breedIds: this.formItem.breedIds,
        connectStartTimeStart: this.calltime[0]
          ? formatTime(this.calltime[0])
          : "",
        connectStartTimeEnd: this.calltime[0]
          ? formatTime(this.calltime[1])
          : "",
        serviceCreateTimeStart: this.gztime[0]
          ? formatTime(this.gztime[0])
          : "",
        serviceCreateTimeEnd: this.gztime[0] ? formatTime(this.gztime[1]) : ""
      };
      getPublicResourceAllotList(formData(params)).then(res => {
        this.$Spin.hide();
        this.tableData = res.response.list;
        // let aaa=$(".test").parent().parent().parent().parent().parent().find('.ivu-table-body').find('tbody');
        // for(let i=0;i<this.tableData.length;i++){
        //   aaa.find("tr").eq(i).find("td").eq(4).find("span").text("hahha")
        // }

        //  $(".test").find('.ivu-table-cell').
        //  find('.ivu-tooltip').find('.ivu-tooltip-popper').find('.ivu-tooltip-content').find('.ivu-tooltip-inner').children().text("特特"))

        this.total = res.response.total;
      });
    },
    // 获取用户来源
    getUserResource() {
      getUserResource().then(res => {
        this.customerSource = res.response;
      });
    },
    // 重置
    reset() {
      this.$refs.input1.query = "";
      this.formItem = {
        isUserAllot: 2,
        memberName: "",
        regSource: "",
        breedIds: []
      };
      this.$refs.breedDataRef.model = "";
      this.$refs.breedDataRef.getData("");
      this.variet = [];
      this.time = [];
      this.time2 = [];
      this.calltime = [];
      this.gztime = [];
      this.mobile='';
      this.userName='';
    },
    // 判断是否是客服人员
    isSet() {
      checkHelp().then(res => {
        this.isCustomer = res.response.isCustomer;
      });
    },
    // 分配
    distribute() {
      if (!this.isCustomer) {
        this.$Message.error("您不是客服人员，不能分配!");
        return;
      } else {
        if (this.selection.length !== 0) {
          if (!window.localStorage) {
            this.$Message.warning("浏览器支持localstorage");
            return false;
          } else {
            let storage = window.localStorage;
            storage.setItem("longZhongCrmIsSign", 1);
            storage.setItem(
              "longZhongCrmIsUserAllot",
              this.formItem.isUserAllot
            );
            storage.setItem("longZhongCrmUserId", this.userIdstr);
          }
          this.$router.push({
            name: "allSalemen"
          });
        } else {
          this.$Message.warning("请勾选用户");
        }
      }
    },
    //单个分配
    oneDistribute(data) {
      if (!this.isCustomer) {
        this.$Message.error("您不是客服人员，不能分配!");
        return;
      } else {
        if (!window.localStorage) {
          alert("浏览器支持localstorage");
          return false;
        } else {
          let storage = window.localStorage;
          storage.setItem("longZhongCrmIsSign", 2);
          storage.setItem("longZhongCrmIsUserAllot", this.formItem.isUserAllot);
          storage.setItem("longZhongCrmUserId", data.row.userId);
        }
        this.$router.push({
          name: "allSalemen"
        });
      }
    },
    //我要跟踪
    follow(data) {
      // this.$Modal.confirm({
      //   title: "跟踪用户",
      //   content: "<p>是否跟踪此用户？</p>",
      //   onOk: () => {
      let form = {
        isUserAllot: this.formItem.isUserAllot,
        userId: data.row.userId
      };
      getFollow(formData(form)).then(res => {
        this.$Message.success("跟踪成功");
        // this.getListPage();
        // isQueryMax().then(res => {
        //   if (res.response.ableNum < 1) {
        //     this.$Message.success(
        //       "您的可分配数已达上限" + res.response.maxNum + ""
        //     );
        //   } else {
        //     this.$Message.success("跟踪成功");
        //     this.getListPage();
        //   }
        // });
      });
      //   },
      //   onCancel: () => {

      //   }
      // });
    },
    // 获取勾选的数据
    selectChange(selection) {
      this.selection = selection;
      this.selection.map(item => {
        this.userId.push(item.userId);
      });
      this.userIds = [...new Set(this.userId)];
      this.userIdstr = this.userIds.join(",");
    },
    // 监听分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getListPage();
    }
  }
};
</script>