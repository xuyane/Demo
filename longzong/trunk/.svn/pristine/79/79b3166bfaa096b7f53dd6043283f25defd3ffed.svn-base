<style lang="less" scoped>
.red {
  color: red;
}
.product-item {
  display: inline-block;
  height: 28px;
  line-height: 24px;
  margin-bottom: 10px;
  background: #2d8cf0;
  color: #fff;
  padding: 2px 5px;
  margin-right: 10px;
}
.nowrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<template>
  <Modal
    v-model="showModal"
    title="权限试用"
    width="1000"
    @on-cancel="cancel">
    <Row>
      <Form :model="formItem" :label-width="80">
        <Row type="flex" justify="space-between">
          <Col span="6">
            <FormItem label="产品名称:">
              <Input v-model="formItem.productName" class="search-input" placeholder="请输入产品名称"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="产品分类:">
              <Cascader
                v-model="formItem.proclass"
                :data="productClass"
                trigger="hover"
                class="search-input"
                @on-change='getproductClass'>
              </Cascader>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="品种:">
              <!-- <Input type="text" v-model="pznameipt" class="search-input" @on-focus='showpzModal' readonly></Input> -->
              <associate-Search ref='breedDataRef' @query-list="produceFunction" :dataUrl="url" :parameterName='name' ></associate-Search>
            </FormItem>
          </Col>
          <Col span='6' >
            <FormItem label="地区:"  >
              <Input type="text" clearable  v-model="areaIdname" class="search-input" @on-focus='showtreeModal' readonly></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="6">
            <FormItem label="所属站点:">
              <Select
                v-model="site"
                @on-change="getChannel"
                class="search-input"
                placeholder="请输入所属站点">
                <Option v-for="(option, index) in siteList" :value="option.id" :key="index">{{option.siteName}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="频道:">
              <Input type="text" v-model="channelnameipt" class="search-input" @on-focus='showpdModal' readonly></Input>
              <!-- <Cascader change-on-select v-model="channel" :data="channelList" :load-data='channelLoad' class="search-input" @on-change="getColumn" @on-visible-change="channelOpen" placeholder="请输入频道"></Cascader> -->
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="栏目:">
              <!-- <Select
                v-model="column"
                class="search-input"
                @on-open-change="columnOpen"
                placeholder="请输入栏目">
                <Option v-for="(option, index) in columnList" :value="option.id" :key="index">{{option.name}}</Option>
              </Select> -->
              <Input type="text" v-model="lanmunameipt" class="search-input" @on-focus='showlmModal' readonly></Input>
            </FormItem>
          </Col>
          <Col span="6" class="text-right">
            <Button type="primary" @click="searchList">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
      <Col span="24">
        <Table
          class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true" 
          :border="true"
          height='300'
          @on-selection-change="selectionChange"
          @on-select-cancel='cancelone'
          @on-select-all-cancel='cancelall'>
        </Table>

        <oil-page
          :total="total"
          :page-num="pageNum"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"> 
        </oil-page>
      </Col>
      <Col span="24" style="margin-bottom: 5px;"  v-if="productSelects && productSelects.length > 0">
        <span>已购产品:</span>
        <span class="product-item" v-for="(item,index) in productSelects" :key="item.id">{{item.productNameCn}} <Icon type="md-close" @click="haddeletone(index)" /></span>
      </Col>
      <Col span="24" style="margin-bottom: 5px;" v-if="selectedNow && selectedNow.length > 0">
        <span>已选产品:</span>
        <span class="product-item" v-for="(item,index) in selectedNow" :key="item.id">{{item.productNameCn}} <Icon type="md-close" @click="deleteone(index)" /> </span>
      </Col>
      <Col span="12" class="mar-b-10">
          
        <!-- <DatePicker clearable v-model="endTimeData" @on-change="onChange" type="date" :options="options4" placeholder="试用天数" style="width: 200px"></DatePicker> -->
              <span>试用天数:</span>

              <DatePicker
                v-model="endTimeData"
                @on-change='onChangeData' 
                type="date"
                :options="options4"
                placeholder="请选择试用天数"
                style="width: 200px;display:inline-block">
              </DatePicker>
       
         <!-- <span>试用天数:</span>
        <span>
          <Select v-model="formItem.day" @on-change="onChange" style="width: 200px" placeholder="请选择产品分类">
            <Option v-for="item in dayTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </span> -->
      </Col>
      <Col span="24">
        <span>权限起始时间：{{timeStr}}</span>
        <span class="red">（该用户已试用网站资讯服务:{{getCount}}次,短信服务:{{getCount2}}次,短讯通服务:{{getCount3}}次,石化通服务:{{getCount4}}次）</span>
      </Col>
      <Col span="24" style="margin-top: 10px">
        <Col>跟踪记录:</Col>
        <Col class="red">
          <Input v-model="texts" class="search-textarea" type="textarea" :rows="4"></Input>
        </Col>
      </Col>
    </Row>
    <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button @click="ok" type="primary">确定</Button>
    </div>
    <Modal
        v-model="modalpztree"
        title="请选择品种"
        @on-ok="pzcancel"
        class="breedtree"
        @on-cancel="pzcancel">
        <Tree :data="breeddata" ref='treepz' show-checkbox :load-data="pzloadData"  @on-check-change='selectpz'></Tree>
    </Modal>
    <Modal
        v-model="modalpdtree"
        title="请选择频道"
        @on-cancel="pdcancel"
        class="breedtree">
       <Tree :data="channelList" :load-data="pdloadData1"  ref='treepd' @on-check-change='pdselect' show-checkbox  ></Tree>
       <div slot="footer">
          <i-button type="primary" @click="pdok1" class="search-btn"> 确定</i-button>
          <i-button @click="pdcancel" class="search-btn">取消</i-button>
        </div>
        </Modal>
        <Modal
        v-model="modallmtree"
        title="请选择栏目"
        @on-cancel="lmcancel"
        class="breedtree">
       <Tree :data="lanmuList" :load-data="lmloadData1"  ref='treelm' @on-check-change='lmselect' show-checkbox  ></Tree>
       <div slot="footer">
          <i-button type="primary" @click="lmcancel" class="search-btn"> 确定</i-button>
          <i-button @click="lmcancel" class="search-btn">取消</i-button>
        </div>
        </Modal>
        <Modal
        v-model="modaltree"
        title="请选择地区"
        @on-cancel="dqcancel"
        class="breedtree">
       <Tree :data="datatree1" :load-data="loadData1"  ref='treedq1' show-checkbox  ></Tree>
       <div slot="footer">
          <i-button type="primary" @click="dqok1" class="search-btn"> 确定</i-button>
          <i-button @click="dqcancel" class="search-btn">取消</i-button>
        </div>
        </Modal>
        <Spin size="large" fix v-if="spinShow"></Spin>
  </Modal>
</template>
<script>
import OilPage from "../../../components/page/page.vue";
import {
  formData,
  formatStamp,
  formatTime,
  format
} from "../../../../assets/js/common.js";
import {
  getUserproductListQuery,
  getUserproductGetCount,
  getUserproductListProductCategoryVO,
  getUserproductListProductTreeVO,
  getUserproductListBreedAssociateVO,
  getUserproductList,
  getUserproductUpdateState,
  getUserproductSaveList,
  selectSiteList,
  selectChannelList,
  selectColumnList,
  queryBreedTree,
  queryAreaTree
} from "../../../components/axios/crm.js";
import associateSearch from "../../../components/associateSearch/getAssociateSearch.vue";
export default {
  props: {
    rowData: Object,
    showProductModal: Boolean
  },
  data() {
    return {
      spinShow: false,
      areaIdname: "",
      areaId: [],
      datatree1: [],
      modaltree: false,
      lanmuList: [],
      modallmtree: false,
      lanmunameipt: "",
      pddatatree1: [],
      modalpdtree: false,
      channelnameipt: "",
      pznameipt: "",
      hasselectpz: [],
      breeddata: [],
      modalpztree: false,
      total: 0,
      pageSize: 5,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30, 100],
      showModal: false,
      userId: null,
      findlistmsg: {},
      texts: "",
      now: null,
      end: null,
      endTimeData: new Date(new Date().getTime() + 3600 * 1000 * 24 * 14),
      // breeds: [],
      url: "/crm/common/query-breed-select-list",
      name: "breedName",
      timeStr: "",
      getCount: 0,
      getCount2: 0,
      getCount3: 0,
      getCount4: 0,
      lineData: {},
      productSelects: [],
      selectedNow: [],
      products: [],
      productClass: [],
      site: "",
      channel: [],
      channelId: [],
      column: "",
      siteList: [],
      channelList: [],
      columnList: [],
      options4: {
        disabledDate(date) {
          //const disabledDay = date.getDate();
          return (
            (date &&
              date.valueOf() < Date.now() + 24 * 60 * 60 * 1000 - 86400000) ||
            date.valueOf() > Date.now() + 14 * 24 * 60 * 60 * 1000
          );
        }
      },
      dayTypes: [
        {
          value: 1,
          desc: "1天"
        },
        {
          value: 2,
          desc: "2天"
        },
        {
          value: 3,
          desc: "3天"
        },
        {
          value: 4,
          desc: "4天"
        },
        {
          value: 5,
          desc: "5天"
        },
        {
          value: 6,
          desc: "6天"
        },
        {
          value: 7,
          desc: "7天"
        },
        {
          value: 8,
          desc: "8天"
        },
        {
          value: 9,
          desc: "9天"
        },
        {
          value: 10,
          desc: "10天"
        },
        {
          value: 11,
          desc: "11天"
        },
        {
          value: 12,
          desc: "12天"
        },
        {
          value: 13,
          desc: "13天"
        },
        {
          value: 14,
          desc: "14天"
        }
      ],
      formItem: {
        day: 14,
        productName: "",
        proclass: [],
        breedId: ""
      },
      selection: [],
      tableData: [],
      columns: [
        {
          type: "selection",
          minWidth: 60,
          align: "center"
        },
        {
          title: "序号",
          minWidth: 60,
          align: "center",
          render: (h, data) => {
            return h(
              "span",
              data.index + this.pageSize * (this.pageNum - 1) + 1
            );
          }
        },
        {
          key: "productNameCn",
          title: "产品名称",
          minWidth: 130
        },
        {
          key: "shortNameCn",
          title: "简称",
          minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top"
                  },
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer"
                  }
                },
                [
                  h(
                    "span",
                    {
                      on: {
                        click: () => {
                          // this.copyText(this.userInfolData)
                        }
                      }
                    },
                    data.row.shortNameCn.length > 5
                      ? data.row.shortNameCn.substring(0, 5) + "..."
                      : data.row.shortNameCn
                  ),
                  h("div", {
                    slot: "content",
                    domProps: {
                      innerHTML: data.row.shortNameCn
                    }
                  })
                ]
              )
            ]);
          }
        },
        {
          key: "productCategoryCodeName",
          title: "产品分类",
          minWidth: 80
        },
        {
          key: "productPrice",
          title: "价格",
          minWidth: 80,
          render: (h, data) => {
            return h(
              "span",
              data.row.productPrice + this.getunit(data.row.unit)
            );
          }
        },
        {
          key: "specialDiscount",
          title: "优惠折扣",
          minWidth: 80
        },
        {
          key: "afterDiscountPrice",
          title: "折后定价",
          minWidth: 80,
          render: (h, data) => {
            return h(
              "span",
              data.row.afterDiscountPrice + this.getunit(data.row.unit)
            );
          }
        },
        {
          key: "",
          title: "权限起始时间",
          minWidth: 140,
          render: (h, data) => {
            if (data.row.productDelayApplyStatus === 0) {
              return h("div", [
                h(
                  "span",
                  `${formatTime(data.row.startTime)} ~ ${formatTime(
                    data.row.endTime
                  )}`
                ),
                h(
                  "span",
                  {
                    style: {
                      color: "blue"
                    }
                  },
                  "(待审核)"
                )
              ]);
            }
            if (data.row.productDelayApplyStatus === 1) {
              return h("div", [
                h(
                  "span",
                  `${formatTime(data.row.startTime)} ~ ${formatTime(
                    data.row.endTime
                  )}`
                )
              ]);
            }
          }
        },
        {
          title: "操作",
          minWidth: 80,

          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#145edb",
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.stopUse(data);
                    }
                  }
                },
                data.row.productDelayApplyStatus === 1 ? "停用" : ""
              )
            ]);
          }
        }
      ]
    };
  },
  components: {
    OilPage,
    associateSearch
  },
  methods: {
    haddeletone(index) {
      let data = {
        row: this.productSelects[index]
      };
      data.row.userProductId = this.productSelects[index].id;
      console.log(this.productSelects[index]);
      this.stopUse(data);
    },
    deleteone(index) {
      let obj = JSON.parse(JSON.stringify(this.selectedNow[index]));
      this.tableData.map(item => {
        for (var i = 0; i < this.selectedNow.length; i++) {
          if (this.selectedNow[i].id == item.id) {
            item._checked = true;
          }
        }
      });
      this.tableData.map(item => {
        if (item.id == obj.id) {
          item._checked = false;
        }
      });
      this.selectedNow.splice(index, 1);
      this.tableData = this.tableData.slice(0);
    },
    gettreedata(a) {
      let data = {
        id: a
      };
      let that = this;
      queryAreaTree(data).then(res => {
        that.datatree1 = res.response.map(item => {
          if (item.isLeaf == 1) {
            return {
              children: [],
              loading: false,
              title: item.name,
              name: item.name,
              id: item.id
            };
          } else {
            return {
              title: item.name,
              name: item.name,
              id: item.id
            };
          }
        });
      });
    },
    showtreeModal() {
      this.modaltree = true;
      this.gettreedata(0);
    },
    dqok1() {
      let selectnode = this.$refs.treedq1.getCheckedNodes();
      if (selectnode.length > 0) {
        let namelist = selectnode.map(item => {
          return item.name;
        });
        this.areaIdname = namelist.join("/");
        this.areaId = selectnode.map(item => {
          return item.id;
        });
        this.modaltree = false;
      } else {
        this.$Message.warning("请先勾选至少一个地区");
      }
    },
    dqcancel() {
      this.modaltree = false;
    },
    loadData1(item, callback) {
      setTimeout(() => {
        let data = {
          id: item.id
        };
        queryAreaTree(data).then(res => {
          let msg = res.response;
          const data = msg.map(item => {
            if (item.isLeaf == 1) {
              item.children = [];
              item.loading = false;
            }
            item.title = item.name;
            return item;
          });
          callback(data);
        });
      }, 1000);
    },
    lmloadData1(item, callback) {
      setTimeout(() => {
        let data = {
          channelIds: item.value
        };
        selectColumnList(data).then(res => {
          let msg = res.response[0].columnDTOList;
          const data = msg.map(item => {
            if (item.isLeaf == 0) {
              item.children = [];
              item.loading = false;
            }
            item.value = item.id;
            item.title = item.name;
            return item;
          });
          callback(data);
        });
      }, 1000);
    },
    lmselect(data) {
      this.lanmunameipt = this.$refs.treelm
        .getCheckedNodes()
        .map(item => {
          return item.title;
        })
        .join(",");
      this.columnList = data;
    },
    lmcancel() {
      this.modallmtree = false;
    },
    showlmModal() {
      if (this.channel == 0) {
        this.$Message.warning("请选择频道");
      } else {
        this.modallmtree = true;

        // this.lanmuList.map(item=>{
        //   item.children=[];
        //   item.checked=false;
        // })
        // this.$forceUpdate()
      }
    },
    pdloadData1(item, callback) {
      setTimeout(() => {
        let data = {
          siteId: this.site || "",
          channelId: item.value
        };
        selectChannelList(data).then(res => {
          let msg = res.response;
          const data = msg.map(item => {
            if (item.isLeaf == 0) {
              item.children = [];
              item.loading = false;
            }
            item.value = item.id;
            item.title = item.name;
            return item;
          });
          callback(data);
        });
      }, 1000);
    },
    pdselect(data) {
      this.channel = data;
      this.channelnameipt = data
        .map(item => {
          return item.title;
        })
        .join(",");
    },
    showpdModal() {
      if (!this.site || this.site == "") {
        this.$Message.warning("请选择站点");
      } else {
        this.modalpdtree = true;
      }
    },
    pdcancel() {
      this.modalpdtree = false;
    },
    pdok1() {
      this.modalpdtree = false;
      this.lanmuList = this.channel.map(item => {
        return {
          children: [],
          title: item.title,
          value: item.value,
          check: false,
          loading: false
        };
      });
    },
    pzloadData(item, callback) {
      setTimeout(() => {
        let msg = {
          parentCode: item.value
        };
        queryBreedTree(msg).then(resp => {
          const data = resp.response.map(option => {
            if (option.type != 0) {
              return {
                title: option.nodeName,
                value: option.nodeCode,
                id: option.nodeId,
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
              };
            }
          });
          callback(data);
        });
      }, 1000);
    },
    pzcancel() {
      this.modalpztree = false;
    },
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
    showpzModal() {
      this.modalpztree = true;
    },
    selectpz(data) {
      this.hasselectpz = data;
      this.pznameipt = data
        .map(item => {
          return item.title;
        })
        .join(",");
    },
    cancel() {
      this.$emit("hide-modal1");
      this.selection = [];
      this.selectedNow = [];
    },
    ok() {
      let dd = formatStamp(this.endTimeData);
      let params = [];
      let flag = true;
      if (this.selectedNow.length <= 0) {
        this.$Message.warning("请选择试用产品！");
        return;
      }
      if (this.timeStr.trim() == "") {
        this.$Message.warning("请选择试用天数！");
        return;
      }
      params = this.selectedNow.map(item => {
        let code = this.selectedNow[0].productCategoryCode.substring(0, 3);
        let dibiCode = item.productCategoryCode.substring(0, 3);
        if (code != dibiCode) {
          flag = false;
        }
        return {
          type: 0,
          status: 1,
          userId: this.lineData.userId,
          startTime: new Date().getTime(),
          endTime: dd,
          productId: item.id,
          productNameCn: item.productNameCn,
          productVersion: item.proVer,
          productVersionId: item.proVerId,
          content: this.texts,
          productCategoryCode: item.productCategoryCode,
          version: 0,
          lastAccess: this.now
        };
      });

      // if (!flag) {
      //   this.$Message.warning("网站资讯服务不能和移动资讯服务一起试用！");
      //   return;
      // }
      //let codedd = this.selectedNow[0].productCategoryCode.substring(0, 3);
      for(var i = 0; i<this.selectedNow.length; i++){
          console.log('this.selectedNow[i]',this.selectedNow[i]);
          if (this.selectedNow[i].productCategoryCode.substring(0, 6) == "002001" && this.formItem.day > 7) {
            this.$Message.warning("短信最大试用天数为7天！");
            return;
          }
      }
      
      if (this.texts == "") {
        this.$Message.warning("跟踪记录必填");
        return;
      }
      this.spinShow = true;
      getUserproductSaveList(params).then(res => {
        this.spinShow = false;
        this.$Message.success("新增成功！");
        this.$emit("hide-modal");
        this.selectedNow = [];
      });
    },
    // 获取列表
    getListPage() {
      let that = this;
      let itemIds = [];
      if (this.column && this.column != "") {
        itemIds.push(this.column);
      }
      that.tableData = [];
      that.total = 0;
      let params = {
        userId: this.lineData.userId,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        productName: this.formItem.productName || "",
        areaId: this.areaId,
        breedId: this.formItem.breedId || "",
        productCategoryCode: this.formItem.productCategoryCode || "",
        siteId: this.site ? String(this.site) : ""
        // channelIds: this.channelId,
        // columns: itemIds
      };
      params.channelIds = this.channel.map(item => {
        return item.value;
      });
      params.columns = this.columnList.map(item => {
        return item.value;
      });
      // params.breedId = this.hasselectpz.map(item => {
      //   return item.id;
      // });
      getUserproductListQuery(formData(params)).then(resp => {
        if (resp.response != null) {
          that.tableData = resp.response.list;
          that.tableData.map(item => {
            item._checked = false;
            if (item.productDelayApplyStatus === 1) {
              item._disabled = true;
              item._checked = true;
            } else if (item.productDelayApplyStatus === 0) {
              item._disabled = true;
            }
            for (var i = 0; i < that.selectedNow.length; i++) {
              if (that.selectedNow[i].id == item.id) {
                item._checked = true;
              }
            }
          });

          that.total = resp.response.total;
        }
      });
    },
    getTimeStr(val) {
      if (isNaN(val)) {
        return "";
      }
      this.now = new Date().getTime();
      this.end = this.now + val * 24 * 3600 * 1000;
      return `${formatTime(this.now)} ~ ${formatTime(this.end)}`;
    },
    // 查询
    searchList() {
      this.pageNum = 1;
      this.pageSize = 5;
      this.getListPage();
      // this.getAllUserData()
    },
    // 重置
    reset() {
      this.formItem = {
        day: 14,
        productName: "",
        proclass: [],
        breedId: ""
      };
      this.$refs.breedDataRef.model = "";
      this.$refs.breedDataRef.getData("");
      this.site = "";
      this.channel = [];
      this.channelId = [];
      this.column = "";
      this.channelList = [];
      this.columnList = [];
      this.channelnameipt = "";
      this.lanmunameipt = "";
      this.hasselectpz = [];
      this.pznameipt = "";
      this.$refs.treepz.getCheckedNodes().map(item => {
        item.checked = false;
      });
      this.$refs.treelm.getCheckedNodes().map(item => {
        item.checked = false;
      });
      this.$refs.treepd.getCheckedNodes().map(item => {
        item.checked = false;
      });
      this.areaId = [];
      this.areaIdname = "";
    },
    //获取所属站点
    getSite() {
      selectSiteList().then(res => {
        this.siteList = res.response;
      });
    },
    //获取频道
    getChannel() {
      this.channel = [];
      this.column = "";
      if (this.site) {
        selectChannelList({
          siteId: this.site || "",
          channelId: ""
        }).then(res => {
          this.channelList = res.response.map(item => {
            if (item.isLeaf == 0) {
              return {
                value: item.id,
                title: item.name,
                children: [],
                loading: false
              };
            } else {
              return {
                value: item.id,
                title: item.name
              };
            }
          });
        });
      }
    },
    //获取频道动态加载
    channelLoad(item, callback) {
      this.channel = [];
      item.loading = true;
      selectChannelList({
        siteId: this.site || "",
        channelId: item.value
      }).then(res => {
        let channelList = res.response.map(item => {
          if (item.isLeaf == 1) {
            return {
              value: item.channelId,
              isLeaf: item.isLeaf,
              label: item.channelName,
              children: [],
              loading: false
            };
          } else {
            return {
              value: item.channelId,
              isLeaf: item.isLeaf,
              label: item.channelName
            };
          }
        });
        item.loading = false;
        item.children = channelList;
        callback();
      });
    },
    //获取栏目
    getColumn(data) {
      let channelId = [];
      channelId.push(data[data.length - 1]);
      this.channelId = channelId;
      this.column = "";
      if (this.channelId.length > 0) {
        selectColumnList({
          channelIds: this.channelId.join(",")
        }).then(res => {
          this.columnList = res.response[0].columnDTOList;
        });
      }
    },
    //获取频道展开
    channelOpen(data) {
      if (data) {
        if (!this.site || this.site == "") {
          this.$Message.warning("请选择站点");
        }
      }
    },
    //获取栏目展开
    columnOpen(data) {
      if (data) {
        if (this.channelId.length == 0) {
          this.$Message.warning("请选择频道");
        }
      }
    },
    //数组合并去重
    mergeArray(arr1, arr2) {
      var _arr = new Array();
      for (var i = 0; i < arr1.length; i++) {
        _arr.push(arr1[i]);
      }
      for (var i = 0; i < arr2.length; i++) {
        var flag = true;
        for (var j = 0; j < arr1.length; j++) {
          if (arr2[i].id == arr1[j].id) {
            flag = false;
            break;
          }
        }
        if (flag) {
          _arr.push(arr2[i]);
        }
      }
      return _arr;
    },
    test(arr1, arr2) {
      var arr3 = [];
      for (var i = 0; i < arr1.length; i++) {
        var flag = true;
        for (var j = 0; j < arr2.length; j++) {
          if (arr1[i].id == arr2[j].id) flag = false;
        }
        if (flag) {
          arr3.push(arr1[i]);
        }
      }
      return arr3;
    },
    cancelall(data, row) {
      this.selectedNow = this.test(this.selectedNow, this.tableData);
    },
    cancelone(data, row) {
      var a;
      this.selectedNow.map((item, index) => {
        if (item.id == row.id) {
          a = index;
        }
      });
      this.selectedNow.splice(a, 1);
    },
    selectionChange(selection) {
      console.log("selection", selection);
      let newlist = selection.filter(item => !item._disabled);
      this.selectedNow = this.mergeArray(this.selectedNow, newlist);
      let that = this;
      var a = selection.map(item => {
        if (item.productCategoryCode.slice(0, 6) == "002001") {
          that.endTimeData = new Date(
            new Date().getTime() + 3600 * 1000 * 24 * 7
          );
          that.timeStr = this.getTimeStr(7);
          that.formItem.day = 7;
          return;
        } else {
          that.endTimeData = new Date(
            new Date().getTime() + 3600 * 1000 * 24 * 14
          );
          that.timeStr = this.getTimeStr(14);
          that.formItem.day = 14;
        }
      });

      // let arr1 = []
      // let arr2 = []
      // arr1 = arr1.filter(item => !item._disabled).map(item => {
      //   item.isChecked = true
      // })
      // arr2.push(...this.products, ...arr1)
      // this.productSelects = arr2
    },

    // 单位 0-人民币 1-美元 2欧元
    getunit(a) {
      switch (a) {
        case 0:
          a = "人民币";
          break;
        case 1:
          a = "美元";
          break;
        case 2:
          a = "欧元";
          break;
      }
      return a;
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
    },
    onChangeData(val) {
      (this.now = new Date().getTime()), (this.end = formatStamp(val));
      let valueNum = (this.end - this.now) / 1000 / 24 / 3600;
      this.formItem.day = valueNum;
      this.timeStr = this.getTimeStr(valueNum);
    },
    // 产品分类
    getUserproductListProductCategory() {
      this.$Spin.show();
      getUserproductListProductTreeVO().then(res => {
        this.$Spin.hide();
        this.productClass = this.breedDigui(res.response);
      });
    },
    breedDigui(a) {
      let dgData = a.map(item => {
        if (item.children.length > 0) {
          return {
            label: item.productCategoryName,
            value: item.productCategoryCode,
            children: this.breedDigui(item.children)
          };
        } else {
          return {
            label: item.productCategoryName,
            value: item.productCategoryCode
          };
        }
      });
      return dgData;
    },
    getproductClass(value) {
      this.formItem.productCategoryCode = value[value.length - 1];
    },
    // 品种
    // getUserproductListBreedAssociate() {
    //   let that = this;
    //   this.$Spin.show();
    //   getUserproductListBreedAssociateVO().then(resp => {
    //     that.$Spin.hide();
    //     if (resp.status == 200) {
    //       let data = resp.response;
    //       that.breeds = data;
    //     }
    //   });
    // },
    produceFunction(data) {
      if (data) {
        this.formItem.breedId = data.value;
      } else {
        this.formItem.breedId = "";
      }
    },
    // 次数
    getUserproductGetNum() {
      let that = this;
      let userId = this.lineData.userId;
      this.$Spin.show();
      let params1 = {
        userId: userId,
        productCode: "001"
      };
      params1.data = new Date().getTime();
      getUserproductGetCount(params1).then(res => {
        that.$Spin.hide();
        this.getCount = res.response;
      });
      let params2 = {
        userId: userId,
        productCode: "002001"
      };
      params2.data = new Date().getTime();
      getUserproductGetCount(params2).then(res => {
        that.$Spin.hide();
        this.getCount2 = res.response;
      });
      let params3 = {
        userId: userId,
        productCode: "002002"
      };
      params3.data = new Date().getTime();
      getUserproductGetCount(params3).then(res => {
        that.$Spin.hide();
        this.getCount3 = res.response;
      });
      let params4 = {
        userId: userId,
        productCode: "002003"
      };
      params4.data = new Date().getTime();
      getUserproductGetCount(params4).then(res => {
        that.$Spin.hide();
        this.getCount4 = res.response;
      });
    },
    // 已选产品
    getUserproductListVue() {
      let that = this;
      let userId = this.lineData.userId;
      this.$Spin.show();
      let params = {
        userId
      };
      getUserproductList(params).then(res => {
        that.$Spin.hide();
        this.productSelects = res.response;
        // .map(item => {
        //   return {
        //     id: item.id,
        //     name: item.productNameCn
        //   }
        // })
        this.products = this.productSelects;
      });
    },
    // 停用
    stopUse(data) {
      console.log(data);
      this.$Modal.confirm({
        title: "提示信息",
        content: `确定要停用产品【${data.row.productNameCn}】?`,
        onOk: () => {
          let params = {
            id: data.row.userProductId
          };
          this.spinShow = true;
          getUserproductUpdateState(params).then(res => {
            this.spinShow = false;
            this.$Message.success("停用成功！");
            this.getListPage();
            this.getUserproductListVue();
          });
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
    }
  },
  created() {
    // this.getListPage()
    // this.getTimeStr()
  },
  watch: {
    rowData(newVal, oldVal) {
      this.lineData = newVal;
    },
    showProductModal(newVal, oldVal) {
      this.showModal = newVal;
      if (newVal) {
        this.getSite();
        this.getUserproductGetNum();
        this.getUserproductListVue();
        this.getUserproductListProductCategory();
        // this.getUserproductListBreedAssociate()
        this.timeStr = this.getTimeStr(14);
        this.getListPage();
        this.getpztree("");
        // 清空跟踪记录
        this.texts = "";
        // 清空搜索项
        this.reset();
        // 重置列表
        this.searchList();
      }
    }
  }
};
</script>
