<style lang="less" scoped>
  .tab {
    width: 400px;
    display: flex;
    background: #fff;
    color: #2D8CF0;
  }

  .tab .tab-flex {
    width: 200px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #2D8CF0;
  }

  .tab-flex.tab-active {
    background: #2D8CF0;
    color: #fff;
    border: none
  }

  .table-span {
    margin-bottom: 25px;
  }

  .table-span p {
    margin-bottom: -3px;
  }
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;任务设定&nbsp;&nbsp;>>&nbsp;&nbsp;营销任务&nbsp;&nbsp;>>&nbsp;&nbsp;部门任务
    </Row>
    </Col>

    <Col span="24" class-name="search-form">
    <Row>
      <div class="tab" style="margin-bottom:30px;">
        <div class="tab-flex" @click="changeTab1" :class="tab === 1 ? 'tab-active' : ''">部门任务</div>
        <div class="tab-flex" @click="changeTab2" :class="tab === 2 ? 'tab-active' : ''">个人分摊</div>
      </div>
    </Row>
    <Form :model="formItem" :label-width="80">
      <Row type="flex" justify="space-between">
        <Col span="6" style="margin-left:-10px;">
        <FormItem label="设定年份:">
          <DatePicker v-model="setYear" type="year" format='yyyy' placeholder="请选择" class="search-input" @on-change="getYear"></DatePicker>
          <!-- <Select v-model="formItem.timeSetting" class="search-input">
                <Option v-for="(item,index) in formItem.timeSetList" :value="item.value" :key="index">{{ item.label }}</Option>
              </Select> -->
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <Button type="primary" @click="getListOrgSalesYear">查询</Button>
        <Button style="margin-left: 8px">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row :gutter="20">
      <Col span='4'>
      <div class='leftree'>
        <Card :bordered="true">
          <p slot="title">组织架构</p>
          <div>
            <Tree :data="orgTreeForm.itemTree" @on-select-change='findlist'></Tree>
          </div>
        </Card>
      </div>
      </Col>
      <Col span='20' v-show="showData">
      <Row class-name="table-con">
        <Row type="flex" justify="space-between" class="table-span">
          <Col span="8">
          <p>部门：{{mainData.orgName}}</p>
          <br>
          <p>部门负责人：{{mainData.leaderName}}</p>
          <br>
          <p>新入目标已分派（万元）：{{mainData.targetAmountAssignmentNew}}</p>
          <br>
          <p>新入目标未分派（万元）：{{mainData.targetAmountUnAssignmentNew}}</p>
          </Col>
          <Col span="8">
          <p>总目标（万元）：{{mainData.targetAmountAll}}</p>
          <br>
          <p>续入目标（万元）：{{mainData.targetAmountOld}}</p>
          <br>
          <p>续入目标已分派（万元）：{{mainData.targetAmountAssignmentOld}}</p>
          <br>
          <p>续入目标未分派（万元）：{{mainData.targetAmountUnAssignmentOld}}</p>
          </Col>
          <Col span="8">
          <p>新入目标（万元）：{{mainData.targetAmountNew}}</p>
          <br>
          <p>总目标已分派（万元）：{{mainData.targetAmountAssignmentAll}}</p>
          <br>
          <p>总目标未分派（万元）：{{mainData.targetAmountUnAssignmentAll}}</p>
          </Col>
        </Row>
        <div style="margin-bottom:20px;">
          <Button type="primary" style="margin-right:8px" @click="newMouthTask">新入月分摊</Button>
          <Button type="primary" @click="continueMouth">续入月分摊</Button>
        </div>
        <Table class="tableCommon" :data="tableData" :columns="columns" @on-selection-change="selectChange">
        </Table>
      </Row>
      </Col>
    </Row>
    <!-- 无权限弹窗 -->
    <Modal v-model="modal" title="提示信息">
      <div style="text-align:center;">
        <p>您无权限设定此部门任务</p>
      </div>
    </Modal>
    <!-- 提示弹窗 -->
    <Modal v-model="modal2" title="提示信息">
      <div style="text-align:center;">
        <p>请完成所有目标分配后再做月分配</p>
      </div>
    </Modal>
    <!-- 保存提示弹窗开始 -->
    <Modal v-model="modal3" title="提示信息">
      <div style="text-align:center;">
        <p>您设定的目标已超出此部门待提交任务</p>
      </div>
      <div slot="footer">
        <i-button type="primary" @click="modal2=false">返回</i-button>
      </div>
    </Modal>
    <!-- 保存提示弹窗结束 -->
    </Col>
  </Row>
</template>

<script>
  import axios from "axios";
  import { orgTree, listOrgSalesYear, saveOrgNewSalesYear, saveOrgOldSalesYear, resetOrgSalesYear } from "../../components/axios/performanceManagement.js";
  import { formData } from "../../../assets/js/common.js";
  export default {
    name: 'marketingTaskSet',
    components: {
    },
    data() {
      return {
        modal: false,
        modal2: false,
        modal3: false,
        tab: 1,
        showData: false,
        setYear: '',
        formItem: {
          timeSetting: '',
          timeSetList: [
            { value: 2018, label: 2018 },
            { value: 2017, label: 2017 },
            { value: 2016, label: 2016 },
          ],
        },
        selection: '',
        orgTreeForm: {
          orgId: '2088',
          type: 1,
          itemTree: [],
        },
        orgIdList:["2088"],
        mainData: {
          orgName: '',
          targetAmountAll: '',
          targetAmountNew: '',
          targetAmountOld: '',
          targetAmountAssignmentAll: '',
          targetAmountAssignmentNew: '',
          targetAmountAssignmentOld: '',
          targetAmountUnAssignmentAll: '',
          targetAmountUnAssignmentNew: '',
          targetAmountUnAssignmentOld: '',
          leaderName: '',
          lastYear: '',
          selectYear: '',
        },
        tableData: [
          {
            orgName: '',
            targetAmountLastYearNew: '',
            actualAmountLastYearNew: '',
            completionRateLastYearNew: '',
            targetAmountLastYearOld: '',
            actualAmountLastYearOld: '',
            completionRateLastYearOld: '',
            targetAmountSelectYearNew: '',
            targetAmountSelectYearOld: '',
            operate: '',
            name: '',
            isInput1: false,
            isInput2: false,
            isText1: false,
            isText2: false,

          }
        ],
        columns: [
          {
            type: 'selection',
            title: '选择',
            align: 'center',
            width: 50
          },
          {
            key: "orgName",
            title: "部门名称",
            align: "center",
            width: 210,
          },
          {
            title: "2017",
            align: "center",
            className:'column0',
            children: [
              {
                title: "新入",
                align: "center",
                width: 200,
                children: [
                  {
                    key: "targetAmountLastYearNew",
                    title: "目标",
                    align: "center",
                    width: 100,
                  },
                  {
                    key: "actualAmountLastYearNew",
                    title: "实际",
                    align: "center",
                    width: 100,
                  },
                  {
                    key: "completionRateLastYearNew",
                    title: "完成率",
                    align: "center",
                    width: 100,
                  },
                ]
              },
              {
                title: "续入",
                align: "center",
                width: 210,
                children: [
                  {
                    key: "targetAmountLastYearOld",
                    title: "目标",
                    align: "center",
                    width: 100,
                  },
                  {
                    key: "actualAmountLastYearOld",
                    title: "实际",
                    align: "center",
                    width: 100,
                  },
                  {
                    key: "completionRateLastYearOld",
                    title: "完成率",
                    align: "center",
                    width: 100,
                  },
                ]
              },
            ]
          },
          {
            title: "2018",
            align: "center",
            className:'column1',
            children: [
              {
                title: "新入",
                align: "center",
                width: 100,
                children: [
                  {
                    key: "targetAmountSelectYearNew",
                    title: "目标",
                    align: "center",
                    width: 100,
                    render: (h, data) => {
                      if (data.row.isInput1) {
                        return h('Input', {
                          props: {
                            value: data.row.targetAmountSelectYearNew
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmountNew(data, e)
                            }
                          }
                        })
                      } else {
                        return h('a', {
                          on: {
                            click: () => {
                              this.showDetail(data.row.orgId, data.row.selectYear);
                              // this.$router.push({ name: 'mouthTaskSetCheck', query: { orgId: data.row.orgId, selectYear: data.row.selectYear } })
                            }
                          }
                        }, data.row.targetAmountSelectYearNew)
                      }

                    }
                  },
                ]
              },
              {
                title: "续入",
                align: "center",
                width: 100,
                children: [
                  {
                    key: "targetAmountSelectYearOld",
                    title: "目标",
                    align: "center",
                    width: 120,
                    render: (h, data) => {
                      if (data.row.isInput2) {
                        return h('Input', {
                          props: {
                            value: data.row.targetAmountSelectYearOld
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmountOld(data, e)
                            }
                          }
                        })
                      } else {
                        return h('a', {
                          on: {
                            click: () => {
                              this.showTaskDetail(data.row.orgId, data.row.selectYear);

                            }

                          }
                        }, data.row.targetAmountSelectYearOld)
                      }

                    }
                  },
                ]
              },
            ]
          },
          {
            key: "operate",
            title: "操作",
            align: "center",
            minWidth:250,
            render: (h, data) => {
              if (!data.row.isText1 && !data.row.isText2) {
                return h('div', [
                  h('a', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '20px'
                    },
                    on: {
                      click: () => {
                        this.newTargetSetting(data)
                      }
                    }
                  }, '新入任务设定  '),
                  h('a', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '20px'
                    },
                    on: {
                      click: () => {
                        this.continueTargetSetting(data)
                      }
                    }
                  }, '续入任务设定  ')
                ])
              } else if (data.row.isText2) {
                // 续入任务设定
                return h('div', [
                  h('a', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '20px'
                    },
                    on: {
                      mousedown: () => {
                        let that=this
                        setTimeout(function(){that.setOrgOldSalesYear(data)}, 1000);
                        // this.setOrgOldSalesYear(data)
                      }
                    }
                  }, '保存  '),
                  h('a', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      mousedown: () => {
                        let that=this
                        setTimeout(function(){that.resetOperationOld(data)}, 1000);
                        // this.resetOperationOld(data)
                      }
                    }
                  }, '重置  '),
                ])
              } else if (data.row.isText1) {
                return h('div', [
                // 新入任务设定
                  h('a', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '20px'
                    },
                    on: {
                      mousedown: () => {
                        let that=this
                        setTimeout(function(){that.setOrgNewSalesYear(data)}, 1000);
                        // this.setOrgNewSalesYear(data)
                      }
                    }
                  }, '保存  '),
                  h('a', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      mousedown: () => {
                        let that=this
                        setTimeout(function(){that.resetOperationNew(data)}, 1000);
                        // this.resetOperationNew(data)
                      }
                    }
                  }, '重置  '),
                ])
              }
            }
          },
        ]
      }
    },
    created() {
      /*
      * orgTreeForm: {
          orgId: '2088',
          type: 1,
          itemTree: [],
        },
      * */
      if (sessionStorage.getItem("markOrgId")) {
        this.orgTreeForm = {
          orgId: sessionStorage.getItem("markOrgId"),
          type: 1,
          itemTree: [],
        }
//        this.orgTreeForm.orgId = sessionStorage.getItem("markOrgId");
      }

      let date = new Date();
      this.setYear = String(date.getFullYear());
      this.formItem.timeSetting = String(date.getFullYear());
      this.changeTab1();
      this.getListOrgSalesYear();
    },
    methods: {
       //判断跳转续入目标
      showTaskDetail(orgId, selectYear){
        let that=this;
        axios.get('/report/pfObject/isLastOrg', {
          params: {
            orgId: orgId
          }
        })
          .then(function (res) {
            if (res.data.response) {
              that.$router.push({ name: 'conMouthTaskSetCheck', query: { orgId: orgId, selectYear: selectYear } })

            } else {
              that.$Message.error("非底层部门不能查看")
              return false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //判断跳转详情页面
      showDetail(orgId, selectYear) {
        let that=this;
        axios.get('/report/pfObject/isLastOrg', {
          params: {
            orgId: orgId
          }
        })
          .then(function (res) {
            if (res.data.response) {
              that.$router.push({ name: 'mouthTaskSetCheck', query: { orgId: orgId, selectYear: selectYear } })
            } else {
              that.$Message.error("非底层部门不能查看")
              return false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    // 部门任务页签
    changeTab1() {
      this.tab = 1;
      this.getOrgTree();
    },

    // 个人分摊页签
    changeTab2() {
      this.tab = 2;
      this.$router.push({ name: 'personalTaskSet' })
    },

    //获取绩效营销部门组织机构树
    getOrgTree() {
      let form = {
        type: this.orgTreeForm.type
      }
      console.log('orgTreeForm', this.orgTreeForm);
      orgTree(form).then(res => {
        const data = JSON.parse(res.response);
        this.orgTreeForm.itemTree = this.treeItem(data);
        console.log("树",this.orgTreeForm.itemTree)
      })
    },
    treeItem(data) {
      let dgData = data.map(item => {
        if (item.children && item.children.length > 0) {
          return {
            id: item.id,
            value: item.value,
            title: item.label,
            status: item.status,
            expand: item.id == this.orgTreeForm.orgId,
            selected: this.orgTreeForm.orgId == item.id,
            children: this.treeItem(item.children)
          };
        } else {
          return {
            id: item.id,
            value: item.value,
            title: item.label,
            status: item.status,
            expand: false,
            selected: this.orgTreeForm.orgId == item.id,
            children: item.children
          };
        }

      });
      return dgData;
    },
    //通过点击树的数据获取相应的数据
    findlist(data) {
      console.log('click', data);
      if (data.length > 0) {
        this.orgTreeForm.orgId = data[0].id;
//        console.log(this.orgTreeForm.orgId);
      }
    },
    //获取年份
    getYear(date) {
      this.formItem.timeSetting = date
    },
    //营销业绩：部门任务-年列表
    getListOrgSalesYear() {

      this.$Spin.show();
      let form = {
        orgId: this.orgTreeForm.orgId,
        selectYear: this.formItem.timeSetting
      }
      form.times = new Date().getTime();
      listOrgSalesYear(form).then(res => {
        this.mainData.orgName = res.response.orgName;
        this.mainData.targetAmountAll = res.response.targetAmountAll;
        this.mainData.targetAmountNew = res.response.targetAmountNew;
        this.mainData.targetAmountOld = res.response.targetAmountOld;
        this.mainData.targetAmountAssignmentAll = res.response.targetAmountAssignmentAll;
        this.mainData.targetAmountAssignmentNew = res.response.targetAmountAssignmentNew;
        this.mainData.targetAmountAssignmentOld = res.response.targetAmountAssignmentOld;
        this.mainData.targetAmountUnAssignmentAll = res.response.targetAmountUnAssignmentAll;
        this.mainData.targetAmountUnAssignmentNew = res.response.targetAmountUnAssignmentNew;
        this.mainData.targetAmountUnAssignmentOld = res.response.targetAmountUnAssignmentOld;
        this.mainData.leaderName = res.response.leaderName;
        this.mainData.lastYear = res.response.lastYear;
        this.mainData.selectYear = res.response.selectYear;
        // this.columns[2].title = res.response.lastYear;
        // this.columns[3].title = res.response.selectYear;
        $(".column0").parent().find("th").eq(2).find("span").text(res.response.lastYear)
        $(".column1").parent().find("th").eq(3).find("span").text(res.response.selectYear)
        this.tableData = res.response.pfObjectOrgSalesYearListItemRepVO;
        if (this.tableData != null) {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].isInput1 = false;
            this.tableData[i].isInput2 = false;
            this.tableData[i].isText1 = false;
            this.tableData[i].isText2 = false;

          }
        }
        this.showData = true;
        this.$Spin.hide();
      })
    },

    // 新入月分摊
    newMouthTask() {
      console.log('orgId', this.orgTreeForm.orgId);
      window.sessionStorage.setItem('markOrgId', this.orgTreeForm.orgId);
      var that = this
      if (this.selection.length > 1 || this.selection.length == 0) {
        this.$Message.error("请选择一个部门！")
      } else {
        let orgId = this.selection[0].orgId;
        let selectYear = this.formItem.timeSetting;
        axios.get('/report/pfObject/isLastOrg', {
          params: {
            orgId: orgId
          }
        })
          .then(function (res) {
            if (res.data.response) {
              that.$router.push({ name: 'mouthTaskSet', query: { orgId: orgId, selectYear: selectYear } });

            } else {
              that.$Message.error("只有底层部门才需要月分配");
              return false
            }
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    },
    // 续入月分摊
    continueMouth() {
      var that = this;
      if (this.selection.length > 1 || this.selection.length == 0) {
        this.$Message.error("请选择一个部门！")
      } else {
        let orgId = this.selection[0].orgId;
        let selectYear = this.formItem.timeSetting;
        axios.get('/report/pfObject/isLastOrg', {
          params: {
            orgId: orgId
          }
        })
          .then(function (res) {
            if (res.data.response) {
              that.$router.push({ name: 'continueMouthTaskSet', query: { orgId: orgId, selectYear: selectYear } })
            } else {
              that.$Message.error("只有底层部门才需要月分配")
              return false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        // this.$router.push({ name: 'continueMouthTaskSet', query: { orgId: orgId, selectYear: selectYear } })
      }
    },

    // table勾选框触发事件
    selectChange(selection) {
      this.selection = selection
    },

    //设置新入输入框的值
    changeAmountNew(data, e) {
      let value = e.target.value
      if (value == '') {
        value = 0
      }
      this.tableData[data.index].targetAmountSelectYearNew = value
      data.row.targetAmountSelectYearNew=value;
    },

    //新入任务设定
    newTargetSetting(data) {
      this.tableData[data.index].isInput1 = true;
      this.tableData[data.index].isText1 = true;
      const arr = new Array(...this.tableData);
      this.tableData = arr;

    },

    //保存年新入任务设定
    setOrgNewSalesYear(data) {
      this.$Spin.show()
      let form = {
        orgId: data.row.orgId,
        parentOrgId: data.row.parentOrgId,
        selectYear: this.mainData.selectYear,
        targetAmount: data.row.targetAmountSelectYearNew
      }
      form.times = new Date().getTime();
      saveOrgNewSalesYear(form).then(res => {
        this.getListOrgSalesYear()
      })
    },

    //重置新入
    resetOperationNew(data) {
      this.$Spin.show()
      let form = {
        orgId: data.row.orgId,
        selectYear: this.mainData.selectYear,
        type: 1
      }
      resetOrgSalesYear(form).then(res => {
        this.getListOrgSalesYear()
      })
    },

    //设置续入输入框的值
    changeAmountOld(data, e) {
      let value = e.target.value
      if (value == '') {
        value = 0
      }
      data.row.targetAmountSelectYearOld=value;
      this.tableData[data.index].targetAmountSelectYearOld = value
      const arr2 = new Array(...this.tableData);
      this.tableData = arr2;

    },
    //续入目标设定
    continueTargetSetting(data) {
      this.tableData[data.index].isInput2 = true;
      this.tableData[data.index].isText2 = true;
      const arr2 = new Array(...this.tableData);
      this.tableData = arr2;

    },

    //保存年续入任务设定
    setOrgOldSalesYear(data) {
      this.$Spin.show()
      let form = {
        orgId: data.row.orgId,
        parentOrgId: data.row.parentOrgId,
        selectYear: this.mainData.selectYear,
        targetAmount: data.row.targetAmountSelectYearOld
      }
      form.times = new Date().getTime();
      saveOrgOldSalesYear(form).then(res => {
        this.getListOrgSalesYear()
      })
    },

    //重置续入
    resetOperationOld(data) {
      this.$Spin.show()
      let form = {
        orgId: data.row.orgId,
        selectYear: this.mainData.selectYear,
        type: 2
      }
      resetOrgSalesYear(form).then(res => {
        this.getListOrgSalesYear()
      })
    },


  }
  }
</script>
