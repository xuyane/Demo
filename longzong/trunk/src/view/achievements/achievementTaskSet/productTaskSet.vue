<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;任务设定&nbsp;&nbsp;>>&nbsp;&nbsp;产品任务&nbsp;&nbsp;>>&nbsp;&nbsp;部门任务
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
            <Option v-for="item in timeSetList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select> -->
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <Button type="primary" @click="getListOrgProductYear">查询</Button>
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
            <Tree :data="itemTree" @on-select-change='findlist'></Tree>
          </div>
        </Card>
      </div>
      </Col>
      <Col span='20' v-show="showData">
      <Row class-name="table-con">
        <Row type="flex" justify="space-between" class="table-p" style="">
          <Col span="12">
          <p>部门：{{mainData.orgName}}</p>
          <p>部门负责人：{{mainData.leaderName}}</p>
          </Col>
          <Col span="12">
          <p>总收入目标（万元）：{{mainData.targetAmountProduct}}</p>
          <p>总目标已分派（万元）：{{mainData.targetAmountAssignmentProduct}}</p>
          <p>总目标未分派（万元）：{{mainData.targetAmountUnAssignmentProduct}}</p>
          </Col>
        </Row>
        <div style="margin-bottom:20px;">
          <Button type="primary" style="margin-right:8px" @click="mouthTask">月分摊</Button>
        </div>
        <Table class="tableCommon" :data="tableData" :columns="columns" :stripe="true" :border="true" @on-selection-change="selectChange">
        </Table>
      </Row>
      </Col>
    </Row>
    <!-- 无权限弹窗 
      <Modal
        v-model="modal"
        title="提示信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>您无权限设定此部门任务</p>
      </Modal>
      <!-- 新入月分摊弹窗 
      <Modal
        v-model="modal2"
        title="提示信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>请完成所有目标分配后再做月分配</p>
      </Modal>-->
    </Col>
  </Row>
</template>

<script>
  import axios from "axios";
  import { orgTree, listOrgProductYear, saveOrgProductYear, resetOrgProductYear } from "../../components/axios/performanceManagement.js";
  import { formData } from "../../../assets/js/common.js";
  export default {
    name: 'productTaskSet',
    components: {},
    data() {
      return {
        tab: 1,
        showData: false,
        itemTree: [],
        selection: '',
        //modal:false,
        //modal2:false
        formItem: {
          timeSetting: '',
          orgId: '2088'
        },
        mainData: {
          orgName: '',
          targetAmountProduct: '',
          leaderName: '',
          lastYear: '',
          selectYear: ''
        },
        tableData: [
          {
            orgName: '',
            targetAmountLastYear: '',
            actualAmountLastYear: '',
            completionRateLastYear: '',
            targetAmountSelectYear: '',
            targetAmountAssignmentProduct: '',
            targetAmountUnAssignmentProduct: '',
            isInput: false
          }
        ],
        // timeSetList: [
        //   { value: 2018, label: 2018 },
        //   { value: 2017, label: 2017 },
        //   { value: 2016, label: 2016 }
        // ],
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
            minWidth: 160
          },
          {
            title: "上一年",
            align: "center",
            className: "column0",
            children: [
              {
                key: "targetAmountLastYear",
                title: "目标",
                align: "center",
                width: 200
              },
              {
                key: "actualAmountLastYear",
                title: "实际",
                align: "center",
                width: 200
              },
              {
                key: "completionRateLastYear",
                title: "完成率",
                align: "center",
                width: 200
              },
            ]
          },
          {
            title: "所选年",
            align: "center",
            className: "column1",
            children: [
              {
                key: "targetAmountSelectYear",
                title: "目标",
                align: "center",
                width:200,
                render: (h, data) => {
                  if (data.row.isInput) {
                    return h('Input', {
                      props: {
                        value: data.row.targetAmountSelectYear
                      },
                      on: {
                        'on-blur': (e) => {
                          this.changeAmount(data, e)
                        }
                      }
                    })
                  } else {
                    return h('a', {
                      on: {
                        click: () => {
                          let orgId = data.row.orgId;
                          let selectYear = this.mainData.selectYear;
                          this.showDetail(data.row.orgId,selectYear)
                          // this.$router.push({ name: 'productMouthTaskCheck', query: { orgId: orgId, selectYear: selectYear } })
                        }
                      }
                    }, data.row.targetAmountSelectYear)
                  }
                }
              },
            ]
          }, 
          {
            key: "operate",
            title: "操作",
            align: "center",
            width: 150,
            render: (h, data) => {
              if (data.row.isInput) {
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
                        setTimeout(function(){that.saveOperation(data)}, 1000);
                        // this.saveOperation(data)
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
                        setTimeout(function(){that.resetOperation(data)}, 1000);
                        // this.resetOperation(data)
                      }
                    }
                  }, '重置  ')
                ])
              } else {
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
                        this.targetSetting(h, data)
                      }
                    }
                  }, '任务设定  ')
                ])
              }
            }
          }
        ]
      }
    },
    created() {
      let date = new Date()
      this.setYear = String(date.getFullYear());
      this.formItem.timeSetting = String(date.getFullYear());
      this.changeTab1();
      this.getListOrgProductYear()
    },
    methods: {
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
              that.$router.push({ name: 'productMouthTaskCheck', query: { orgId: orgId, selectYear: selectYear } })
            } else {
              that.$Message.error("非底层部门不能查看")
              return false
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
      //获取年份
      getYear(date) {

        this.formItem.timeSetting = date
      },
      //获取绩效营销部门组织机构树
      getOrgTree() {
        let that = this;
        that.$Spin.show()
        let form = {
          type: 2
        }
        orgTree(form).then(res => {
          that.itemTree = that.treeItem(JSON.parse(res.response));
          that.$Spin.hide();
          console.log("树",that.itemTree);
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
              expand: item.value == '03' ? true : false,
              children: this.treeItem(item.children)
            };
          } else {
            return {
              id: item.id,
              value: item.value,
              title: item.label,
              status: item.status,
              expand: true,
              children: item.children
            };
          }
        });
        return dgData;
      },
      //通过点击树的数据获取相应的数据
      findlist(data) {
        this.formItem.orgId = data[0].id
      },
      //产品业绩：部门任务-年列表
      getListOrgProductYear() {
        let that = this
        that.$Spin.show()
        let form = {
          orgId: that.formItem.orgId,
          selectYear: that.formItem.timeSetting
        }
          form.times = new Date().getTime();
        listOrgProductYear(form).then(res => {
          that.mainData.orgName = res.response.orgName
          that.mainData.targetAmountProduct = res.response.targetAmountProduct
          that.mainData.leaderName = res.response.leaderName
          that.mainData.lastYear = res.response.lastYear
          that.mainData.selectYear = res.response.selectYear
          that.mainData.targetAmountAssignmentProduct = res.response.targetAmountAssignmentProduct
          that.mainData.targetAmountUnAssignmentProduct = res.response.targetAmountUnAssignmentProduct
          // that.columns[2].title = res.response.lastYear
          // that.columns[3].title = res.response.selectYear
          $(".column0").parent().find("th").eq(2).find("span").text(res.response.lastYear)
          $(".column1").parent().find("th").eq(3).find("span").text(res.response.selectYear)
          
          that.tableData = res.response.pfObjectOrgProductYearListItemRepVOs;

          
          if (that.tableData && that.tableData.length > 0) {
            for (let i = 0; i < that.tableData.length; i++) {
              that.tableData[i].isInput = false
            }
          }
          that.showData = true
          that.$Spin.hide()
        })
      },
      changeTab1() {
        this.getOrgTree()
        //this.getListOrgProductYear()
      },
      changeTab2() {
        this.$router.push({ name: 'personalProTaskSet' })
      },
      //任务设定
      targetSetting(h, data) {
        this.tableData[data.index].isInput = true;
        const arr = new Array(...this.tableData);
        this.tableData = arr;
      },
      //月分摊
      mouthTask() {
        let that = this;
        if (this.selection.length > 1 || this.selection.length == 0) {
          this.$Message.error("请选择一个部门！")
        } else {
          let orgId = this.selection[0].orgId;
          let selectYear = this.mainData.selectYear;

          axios.get('/report/pfObject/isLastOrg', {
            params: {
              orgId: orgId
            }
          })
            .then(function (res) {
              if (res.data.response) {
                that.$router.push({ name: 'productMouthTaskSet', query: { orgId: orgId, selectYear: selectYear } })
              } else {
                that.$Message.error("只有底层部门才需要月分配")
                return false
              }
            })
            .catch(function (error) {
              console.log(error);
            });

          // this.$router.push({ name: 'productMouthTaskSet', query: { orgId: orgId, selectYear: selectYear } })
        }
      },
      // table勾选框触发事件
      selectChange(selection) {
        this.selection = selection
      },
      //保存
      saveOperation(data) {
        this.$Spin.show()
        let form = {
          orgId: data.row.orgId,
          parentOrgId: data.row.parentOrgId,
          selectYear: this.mainData.selectYear,
          targetAmount: data.row.targetAmountSelectYear
        }
        form.times = new Date().getTime();
        saveOrgProductYear(form).then(res => {
          this.getListOrgProductYear()
        })
      },
      //重置
      resetOperation(data) {
        this.$Spin.show()
        let form = {
          orgId: data.row.orgId,
          selectYear: this.mainData.selectYear
        }
        resetOrgProductYear(form).then(res => {
          this.getListOrgProductYear()
        })
      },
      //设置输入框的值
      changeAmount(data, e) {
        let value = e.target.value
        if (value == '') {
          value = 0
        }
        this.tableData[data.index].targetAmountSelectYear = value
        data.row.targetAmountSelectYear = value
      }
    }
  }
</script>

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

  .table-p {
    font-size: 14px;
    margin-bottom: 15px;
    margin-left: 10px;
  }

  .table-p p {
    margin-bottom: 8px;
  }
</style>