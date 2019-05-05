<style lang="less" scoped>

.navcontainer {
    padding: 0px 20px 0 0px;
    background: #fff;
    span {
      display: inline-block;
      min-width: 112px;
      height: 35px;
      line-height: 35px;
      color: #fff;
      font-size: 14px;
      background: #4280e8;
      text-align: center;
      margin-right: 20px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .tab-active {
      background: #f09d21;
    }
  }
</style>
<template>
  <Row class='varietybox'>
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;系统配置&nbsp;&nbsp;>>&nbsp;&nbsp;自动分配业务员
            </Row>
        </i-col>
        <Col span='24'>
            <Row :gutter="20">
                <Col span='24' >
                  <Card  > 
                    <Row>
                      <Col span='10'>
                        <div class="navcontainer">
                          <span 
                            v-for="(item,index) in type" 
                            :key="index"
                            :class="index==number? 'tab-active' : ''"
                            @click="change(index)">
                            {{item.value}}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <!-- <div class="btn-container">
                      <Button   v-for="(item,index) in type" class="search-btn" :key='index' @click="change(index)"  :type="index==number?'warning':'primary'">{{item.value}}</Button>
                    </div> -->
                    <Row>
                      
                      <div class="btn-container" style="margin-top:10px">
                        <Button type="primary" class="search-btn" @click="newbtn">新增规则</Button>
                        <Button type="primary" class="search-btn" @click="activedallbtn">激活全部</Button>
                        <Button type="primary" class="search-btn" @click="disabledallbtn">禁用全部</Button>
                        <Tooltip max-width="500" placement="top-start" content="规则生效后，外部注册的用户直接分配给业务员，自动分配客服和客服手工分配功能不可用；如果同一时间内多个规则，讲按照以下优先级进行生效，建议不要设置冲突的规则。工作：临时->上午,下午->工作时间;          周末：临时->上午,下午->周末->永久" title="分配规则说明">
                          <Icon type="ios-alert-outline" size='20' color='red' />
                        </Tooltip>
                      </div>
                      <div>
                        <div> 
                          <Table class="tableCommon" :columns="columns1" :data="data1"></Table>
                          <oil-page :total="total" :page-size="pageSize" :page-num="pageNum" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
                        </div>
                        
                      </div>
                    </Row>
                  </Card>
                </Col>
                
            </Row>
            
        </Col>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </Row>
</template>

<script>
import timeStampChange from "../../../../assets/js/timestamp_change.js";
import oilPage from "../../../components/page/page.vue";
import { formData } from "../../../../assets/js/common.js";
import axios from "axios";
import {
  saleManList, // 获取自动分配业务员配置信息列表
  disableOne, //禁用
  disableAll,//禁用全部
  activateAll,//激活全部
  activateOne,//激活某一个
} from "../../../components/axios/crm.js";
export default {
  components: {
    oilPage
  },
  data() {
    return {
      spinShow:false,
      type: [{ value: "当前规则" }, { value: "历史规则" }],
      number: 0,
      pageSizeOpts: [10, 20, 50, 100, 200],
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      total: 0,
      findlistmsg: {
        type: 0,
        pageSize: 10,
        pageNum: 1
      },
      columns1: [
        {
          title: "规则名称",
          minWidth: 150,
          key: "ruleName"
        },
        {
          title: "生效时间",
          minWidth: 150,
          key: "effectTime"
        },
        {
          title: "是否重复",
          minWidth: 150,
          key: "repeatType"
        },
        {
          title: "创建时间",
          minWidth: 150,
          key: "createTime"
        },
        {
          title: "设置人",
          minWidth: 150,
          key: "creatorName"
        },
        {
          title: "状态",
          minWidth: 150,
          key: "status"
        },
        {
          title: "操作",
          minWidth: 150,
          key: "action",
          render: (h, data) => {
            if (data.row.status == "待审批") {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      // color: '#145edb',
                      // textDecoration: 'underline',
                      // cursor: 'pointer',
                      // marginRight: "20px"
                    },
                    on: {
                      click: () => {
                        this.checkpending(data);
                      }
                    }
                  },
                  "审批"
                )
              ]);
            } else if (data.row.status == "有效") {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      color: "red"
                      // textDecoration: 'underline',
                      // cursor: 'pointer',
                      // marginRight: "20px"
                    },
                    on: {
                      click: () => {
                        this.disable(data);
                      }
                    }
                  },
                  "禁用"
                )
              ]);
            } else if (data.row.status == "禁用") {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      color: "#9ecd3f"
                      // textDecoration: 'underline',
                      // cursor: 'pointer',
                      // marginRight: "20px"
                    },
                    on: {
                      click: () => {
                        this.active(data);
                      }
                    }
                  },
                  "激活"
                )
              ]);
            }
          }
        }
      ],
      data1: []
    };
  },
  methods: {
    //新增规则
    newbtn() {
      console.log(123)
      this.$router.push({
        name: "newRulers"
      });
    },
    // 禁用全部
    disabledallbtn() {
      // if(a){
      // this.$Message.info({
      //   render: h => {
      //     return h("span", [
      //       "请先配置负责分配的客服！",
      //       h("a",{
      //         on: {
      //               click: () => {
      //                 // this.$router.push({ path: "/enterpriseContact" });
      //               }
      //             }
      //       }, "前往配置 "),
      //     ]);
      //   },
      //   duration: 10
      // });
      // }else{
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要禁用全部规则吗？禁用后将影响用户数据分配</p>",
        onOk: () => {
          let that=this;
          disableAll().then(res => {
            that.$Message.info({content:'禁用全部规则成功！',duration: 3})
            that.getlist(that.findlistmsg)
          });
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
      
      // }
    },
        // 激活全部
    activedallbtn() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要激活规则吗？激活后将影响用户数据分配</p>",
        onOk: () => {
           let that=this;
          activateAll().then(res => {
            that.$Message.info({content:'规则激活成功！',duration: 3});
            that.getlist(that.findlistmsg)
          });
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    // 待审批
    checkpending(data) {
      this.$router.push({
        name: "checkPending",
        query: {
          id: data.row.id,
        }
      });
    },
    //禁用
    disable(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要禁用规则吗？禁用后将影响用户数据分配</p>",
        onOk: () => {
          var dataid = {
            ruleId: data.row.id
          };
          var that = this;
          disableOne(dataid).then(res => {
            that.data1[data.index].status = "禁用";
            that.$Message.info({
              content: "禁用规则成功！",
              duration: 3
            });
          });
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
        //激活
    active(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要激活规则吗？激活后将影响用户数据分配</p>",
        onOk: () => {
          var dataid = {
            ruleId: data.row.id
          };
          var that = this;
          activateOne(dataid).then(res => {
            that.data1[data.index].status = "有效";
            that.$Message.info({
              content: "激活规则成功！",
              duration: 3
            });
          });
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    // type切换
    change(index) {
      this.number = index;
      this.pageSize = 10;
      this.pageNum = 1;
      this.findlistmsg = {
        type: index,
        pageSize: 10,
        pageNum: 1
      };
      this.getlist(this.findlistmsg);
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
    // 获取自动分配业务员配置信息列表
    getlist(data) {
      var that = this;
      that.spinShow=true;
      saleManList(data).then(res => {
        that.spinShow=false
        var data = res.response.list;
        for (var i = 0; i < data.length; i++) {
          data[i].createTime = timeStampChange.format(
            res.response.list[i].createTime
          );
        }
        that.data1 = data;
        this.total = res.response.total;
      });
    }
  },
  created() {
    this.getlist(this.findlistmsg);
  }
};
</script>

