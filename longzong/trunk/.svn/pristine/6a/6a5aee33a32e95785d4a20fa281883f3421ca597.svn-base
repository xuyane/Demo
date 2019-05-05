<style lang="less" scoped>
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;任务设定&nbsp;&nbsp;>>&nbsp;&nbsp;产品任务&nbsp;&nbsp;>>&nbsp;&nbsp;月分摊
    </Row>
    </Col>
    <Col span="24" class="table-con">
    <Row>
      <span style="font-size:20px;">
        <b>部门：{{mainData.orgName}}</b>
      </span>
    </Row>
    <Row type="flex" justify="space-between" style="margin: 15px 0; font-size:16px;">
      <span>目标金额（万元）：{{mainData.targetAmount}}</span>
      <span>已分派金额（万元）：{{mainData.alreadyAmount}}</span>
      <span>剩余分派金额（万元）：{{mainData.surplusAmount}}</span>
    </Row>
    <Row style="font-size:16px;">
      <span>目标类型：{{mainData.targetType}}</span>
    </Row>
    <Table class="tableCommon" :data="tableData" :columns="columns" :stripe="true" :border="true" style="margin-top:20px;">
    </Table>
    <div class-name="table-con" style="text-align:center;margin-top:20px;">
      <Button type="primary" class="search-btn" @click="editData">编辑</Button>
      <Button type="primary" class="search-btn" @click="saveData">保存</Button>
      <Button type="default" class="search-btn" @click="returnPro">取消</Button>
    </div>
    <!-- 保存按钮弹窗 
      <Modal
        v-model="modal"
        title="提示信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>请完成所有目标分配后再保存</p>
      </Modal>-->
    </Col>
  </Row>
</template>

<script>
  import { listOrgProductMonth, saveOrgProductMonth } from "../../components/axios/performanceManagement.js";
  import { formData } from "../../../assets/js/common.js";
  export default {
    name: 'productMouthTaskSet',
    components: {},
    data() {
      return {
        modal: false,
        orgId: this.$route.query.orgId,
        selectYear: this.$route.query.selectYear,
        mainData: {
          orgId: '',
          orgName: '',
          selectYear: '',
          targetAmount: '',
          targetType: '',
          alreadyAmount: '',
          surplusAmount: '',
        },
        tableData: [
          {
            configMonth1: '',
            targetAmount1: '',
            configMonth2: '',
            targetAmount2: '',
            configMonth3: '',
            targetAmount3: '',
            configMonth4: '',
            targetAmount4: '',
            isInput1: false,
            isInput2: false,
            isInput3: false,
            isInput4: false,
            isInput5: false,
            isInput6: false,
            isInput7: false,
            isInput8: false,
            isInput9: false,
            isInput10: false,
            isInput11: false,
            isInput12: false,
            configMon1: '',
            configMon2: '',
            configMon3: '',
            configMon4: '',
          }
        ],
        columns: [
          {
            title: "第一季度目标",
            align: "center",
            children: [
              {
                key: "configMon1",
                title: "月份",
                align: "center",
                render: (h, data) => {

                  return h('div', [
                    h('span', {
                    }, data.row.configMon1 + '月')
                  ])
                }
              },
              {
                key: "targetAmount1",
                title: "目标值",
                align: "center",
                render: (h, data) => {

                  if (data.row.configMon1 == '1') {
                    if (data.row.isInput1) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            value: data.row.targetAmount1,
                            size: 'small'
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 1)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount1)
                      ])
                    }
                  } else if (data.row.configMon1 == '2') {
                    if (data.row.isInput2) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            value: data.row.targetAmount1,
                            size: 'small'
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 1)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount1)
                      ])
                    }
                  } else if (data.row.configMon1 == '3') {
                    if (data.row.isInput3) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            value: data.row.targetAmount1,
                            size: 'small'
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 1)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount1)
                      ])
                    }
                  }
                }
              }
            ]
          },
          {
            title: "第二季度目标",
            align: "center",
            children: [
              {
                key: "configMon2",
                title: "月份",
                align: "center",
                render: (h, data) => {

                  return h('div', [
                    h('span', {
                    }, data.row.configMon2 + '月')
                  ])
                }
              },
              {
                key: "targetAmount2",
                title: "目标值",
                align: "center",
                render: (h, data) => {
                  // console.log("季度数据", data)
                  if (data.row.configMon2 == '4') {
                    if (data.row.isInput4) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            size: 'small',
                            value: data.row.targetAmount2,
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 2)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount2)
                      ])
                    }
                  }
                  else if (data.row.configMon2 == '5') {
                    if (data.row.isInput5) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            size: 'small',
                            value: data.row.targetAmount2,
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 2)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount2)
                      ])
                    }
                  }
                  else if (data.row.configMon2 == '6') {
                    if (data.row.isInput6) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            size: 'small',
                            value: data.row.targetAmount2,
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 2)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount2)
                      ])
                    }
                  }

                }
              }
            ]
          },
          {
            title: "第三季度目标",
            align: "center",
            children: [
              {
                key: "configMon3",
                title: "月份",
                align: "center",
                render: (h, data) => {

                  return h('div', [
                    h('span', {
                    }, data.row.configMon3 + '月')
                  ])
                }
              },
              {
                key: "targetAmount3",
                title: "目标值",
                align: "center",
                render: (h, data) => {

                  if (data.row.configMon3 == '7') {
                    if (data.row.isInput7) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            value: data.row.targetAmount3,
                            size: 'small'
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 3)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount3)
                      ])
                    }
                  } else if (data.row.configMon3 == '8') {
                    if (data.row.isInput8) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            value: data.row.targetAmount3,
                            size: 'small'
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 3)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount3)
                      ])
                    }
                  } else if (data.row.configMon3 == '9') {
                    if (data.row.isInput9) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            value: data.row.targetAmount3,
                            size: 'small'
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 3)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount3)
                      ])
                    }
                  }
                }
              }
            ]
          },
          {
            title: "第四季度目标",
            align: "center",
            children: [
              {
                key: "configMon4",
                title: "月份",
                align: "center",
                render: (h, data) => {

                  return h('div', [
                    h('span', {
                    }, data.row.configMon4 + '月')
                  ])
                }
              },
              {
                key: "targetAmount4",
                title: "目标值",
                align: "center",
                render: (h, data) => {
                  if (data.row.configMon4 == '10') {
                    if (data.row.isInput10) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            value: data.row.targetAmount4,
                            size: 'small'
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 4)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount4)
                      ])
                    }
                  } else if (data.row.configMon4 == '11') {
                    if (data.row.isInput11) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            value: data.row.targetAmount4,
                            size: 'small'
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 4)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount4)
                      ])
                    }
                  } else if (data.row.configMon4 == '12') {
                    if (data.row.isInput12) {
                      return h('div', [
                        h('i-input', {
                          props: {
                            // type: 'number',
                            value: data.row.targetAmount4,
                            size: 'small'
                          },
                          on: {
                            'on-blur': (e) => {
                              this.changeAmount(data, e, 4)
                            }
                          }
                        })
                      ])
                    } else {
                      return h('div', [
                        h('span', {
                        }, data.row.targetAmount4)
                      ])
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    },
    created() {
      this.getListOrgProductMonth()
    },
    methods: {
      //编辑
      //编辑
      editData() {
        var data = new Date();
        let m = data.getMonth() + 1;
        // let m = 10;
        if (m == 1) {
          this.tableData.map(item => {
            item.isInput1 = true;
            item.isInput2 = true;
            item.isInput3 = true;
            item.isInput4 = true;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 2) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = true;
            item.isInput3 = true;
            item.isInput4 = true;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 3) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = true;
            item.isInput4 = true;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 4) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = true;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 5) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 6) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 7) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 8) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 9) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = false;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 10) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = false;
            item.isInput9 = false;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 11) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = false;
            item.isInput9 = false;
            item.isInput10 = false;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (m == 12) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = false;
            item.isInput9 = false;
            item.isInput10 = false;
            item.isInput11 = false;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        }




      },


      //列表数据
      getListOrgProductMonth() {
        this.$Spin.show()
        let form = {
          orgId: this.orgId,
          selectYear: this.selectYear
        }
        form.time=new Date().getTime();
        
        listOrgProductMonth(form).then(res => {
          this.mainData.orgId = res.response.orgId;
          this.mainData.orgName = res.response.orgName;
          this.mainData.selectYear = res.response.selectYear;
          this.mainData.targetAmount = res.response.targetAmount;
          this.mainData.targetType = res.response.targetType;
          this.mainData.alreadyAmount = res.response.alreadyAmount;
          this.mainData.surplusAmount = res.response.surplusAmount;
          this.tableData = res.response.pfObjectOrgMonthSeeVOs;
          this.tableData.map(item => {
            let data1 = new Date(item.configMonth1).getMonth() + 1;
            let data2 = new Date(item.configMonth2).getMonth() + 1;
            let data3 = new Date(item.configMonth3).getMonth() + 1;
            let data4 = new Date(item.configMonth4).getMonth() + 1;
            item.configMon1 = data1;
            item.configMon2 = data2;
            item.configMon3 = data3;
            item.configMon4 = data4;
          })
          if (this.tableData != null) {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].isInput1 = false;
              this.tableData[i].isInput2 = false;
              this.tableData[i].isInput3 = false;
              this.tableData[i].isInput4 = false;
              this.tableData[i].isInput5 = false;
              this.tableData[i].isInput6 = false;
              this.tableData[i].isInput7 = false;
              this.tableData[i].isInput8 = false;
              this.tableData[i].isInput9 = false;
              this.tableData[i].isInput10 = false;
              this.tableData[i].isInput11 = false;
              this.tableData[i].isInput12 = false;
            }
          }
          this.$Spin.hide();
        })
      },
      //返回
      returnPro() {
        this.$router.push({ name: "productTaskSet" })
      },
      //保存
      saveData() {
        if (this.validateData()) {
          this.$Spin.show()
          let items = []
          this.tableData.map(item => {
            items.push({
              id: item.id1,
              configMonth: item.configMonth1,
              targetAmount: item.targetAmount1
            })
            items.push({
              id: item.id2,
              configMonth: item.configMonth2,
              targetAmount: item.targetAmount2
            })
            items.push({
              id: item.id3,
              configMonth: item.configMonth3,
              targetAmount: item.targetAmount3
            })
            items.push({
              id: item.id4,
              configMonth: item.configMonth4,
              targetAmount: item.targetAmount4
            })
          })
          let form = {
            orgId: this.mainData.orgId,
            selectYear: this.mainData.selectYear,
            pfObjectOrgMonthSaveVOs: items
          }
          saveOrgProductMonth(form).then(res => {
            this.tableData.map(item => {
              item.isInput1 = false;
              item.isInput2 = false;
              item.isInput3 = false;
              item.isInput4 = false;
              item.isInput5 = false;
              item.isInput6 = false;
              item.isInput7 = false;
              item.isInput8 = false;
              item.isInput9 = false;
              item.isInput10 = false;
              item.isInput11 = false;
              item.isInput12 = false;

            })
            const arr = new Array(...this.tableData);
            this.tableData = arr;
            // this.$router.push({ name: 'productTaskSet' })
            this.$router.push({ name: 'productTaskSet' })            
            this.$Spin.hide()
          })
        }
      },
      //设置输入框的值
      changeAmount(data, e, num) {
        let value = e.target.value
        if (value == '') {
          value = 0
        }
        if (num == 1) {
          this.tableData[data.index].targetAmount1 = Number(Number(value).toFixed(2))
        } else if (num == 2) {
          this.tableData[data.index].targetAmount2 = Number(Number(value).toFixed(2))
        } else if (num == 3) {
          this.tableData[data.index].targetAmount3 = Number(Number(value).toFixed(2))
        } else if (num == 4) {
          this.tableData[data.index].targetAmount4 = Number(Number(value).toFixed(2))
        }
      },
      //校验数据
      validateData() {
        let totalAmount = Number(0)
        for (let i = 0; i < this.tableData.length; i++) {
          totalAmount = Number((totalAmount + Number(this.tableData[i].targetAmount1)).toFixed(2))
          totalAmount = Number((totalAmount + Number(this.tableData[i].targetAmount2)).toFixed(2))
          totalAmount = Number((totalAmount + Number(this.tableData[i].targetAmount3)).toFixed(2))
          totalAmount = Number((totalAmount + Number(this.tableData[i].targetAmount4)).toFixed(2))
        }
        if (totalAmount != Number(this.mainData.targetAmount)) {
          this.$Message.error("月分摊总金额不等于目标金额")
          return false
        }
        return true
      }
    }
  }
</script>