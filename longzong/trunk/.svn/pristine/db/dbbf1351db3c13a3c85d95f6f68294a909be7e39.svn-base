<style lang="less" scoped>
  .mar-top-20 {
    margin-top: 20px;
  }

  .page {
    margin: 10px 0;
    text-align: right;
    padding-right: 18px;
  }

  .time {
    width: 45% !important;
  }
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;质检异常上报
    </Row>
    </Col>
    <Col span='24' class-name="search-form">
    <Form ref="form" :model="formItem" :label-width="80">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="姓名：">
          <Select v-model="formDatas.employeeId" :remote-method="keyWordQuery" :clearable="true" filterable>
            <Option v-for="item in selName" :value="item.key" :key="item.key">{{ item.value }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="部门：">
          <bu-men @data-list="getDepData" :emptyModel='formDatas.departIds'></bu-men>
        </FormItem>
        </Col>
        <!-- <Col span="7">
          <FormItem label="考核周期">
            <DatePicker type="daterange" format="yyyy/MM" v-model="dates" placement="bottom" @on-change="getDates" placeholder="请选择时间段" style="width:90%;"></DatePicker>
          </FormItem>
        </Col> -->
        <Col span="8">
        <FormItem label="考核周期：" :label-width="100">
          <DatePicker type="month" format="yyyy-MM" v-model="startTime" placement="bottom" @on-change="getStartDates" placeholder="请选择开始周期"
            class="time search-input "></DatePicker>
          <span>-</span>
          <DatePicker type="month" format="yyyy-MM" v-model="endTime" placement="bottom" @on-change="getEndDates" placeholder="请选择结束周期"
            class="time search-input"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <!-- <Row>
        <Col span="7">
        <FormItem label="结束周期">
          <DatePicker type="month" format="yyyy/MM" v-model="endTime" placement="bottom" @on-change="getEndDates" placeholder="请选择时间段" style="width:90%;"></DatePicker>
        </FormItem>
        </Col>
      </Row> -->
      <Row style="margin-bottom:20px;">
        <Col span="24" class="text-right">
        <Button type="primary" @click="onSearch">查询</Button>
        <Button style="margin-left: 8px" @click="reset">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24" class="mar-top-20">
    <Row class-name="table-con">
      <div style="margin-bottom:20px;">
        <Button type="primary" style="margin-right:8px" @click="moreAdd">批量添加</Button>
        <Button type="primary" @click="exportExcel">导出</Button>
      </div>
      <Table class="tableCommon" :data="tableData" :columns="columns" :stripe="true" :border="true">
        <div class="page" slot="footer">
          <Page :total="dataCount" show-elevator show-total show-sizer :page-size="formDatas.pageSize" :page-size-opts="pageSizeOpt"
            @on-change="changePageNum" @on-page-size-change="changePageSize" />
        </div>
      </Table>
    </Row>
    </Col>
    <!-- 批量添加弹窗start -->
    <Modal v-model="moreAddModal" title="批量添加" width="1000">
      <Row>
        <Col span="10">
        <Form>
          <FormItem label="异常类型 ：" :label-width="90">
            <Select v-model="errorType" style="width:200px">
              <Option v-for="item in typeList" :value="item.value" :key="item.label">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
        </Col>
        <Col span="14">&nbsp;</Col>
        <Col span="24">
        <Table class="tableCommon" :data="tableData2" :columns="columns2" :stripe="true" :border="true"></Table>
        </Col>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveLists">保存</i-button>
        <i-button type="default" @click="moreAddModal=false">返回</i-button>
      </div>
    </Modal>
    <!-- 弹窗end -->


    <!-- 编辑弹窗 -->
    <Modal v-model="editModal" title="编辑" width="1000" @on-ok="okGet" @on-cancel="cancel">
      <Row>
        <Col span="24">
        <Table class="tableCommon" :data="tableDataEdit" :columns="columnsEdit" :stripe="true" :border="true">
        </Table>
        </Col>
      </Row>
    </Modal>
    <!-- 弹窗end -->
  </Row>
</template>
<script>
  import axios from "axios";
  import { formatStamp, formatTime, formData } from "../../../assets/js/common.js";
  import buMen from '../../components/jiXiao/buMen.vue';
  import { testUpReport, uploadMes, employeeSelect, yesOrNoEdits, newAddLogs, delAbnormalLogs, detailOutput, editUploadData, messTypeList, autoputDept, saveOrgProductYear } from "../../components/axios/performanceManagement";
  export default {
    name: 'qualityTestReport',
    components: {
      buMen
    },
    data() {
      return {
        formDatas: {
          pageNum: 1,
          pageSize: 10,
          departIds: [],
          employeeId: null,
          indexTimeE: null,
          indexTimeS: null
        },
        infoType: '', //信息类型
        typeList: [{
          value: "0",
          label: "质检异常"
        },
        {
          value: "1",
          label: "客户投诉"
        }
        ],
        tableDataEdit: [],
        columnsEdit: [{
          key: "id",
          title: "ID",
          align: "center",
          minWidth: 70
        }, {
          key: "errorType",
          title: "异常类型",
          align: "center",
          minWidth: 150,
          render: (h, data) => {
            return h('Select', {
              props: {
                value: data.row.errorType,
                labelInValue: true
              },
              on: {
                'on-change': (res) => {
                  this.tableDataEdit[data.row._index].errorType = res.value;
                }
              }
            }, [
                h('Option', {
                  props: {
                    type: 'text',
                    size: 'small',
                    value: 0
                  },
                }, "质检异常"),
                h('Option', {
                  props: {
                    type: 'text',
                    size: 'small',
                    value: 1
                  },
                }, "客户投诉")
              ])
          }
        },
        {
          key: "indexTime",
          title: "日期",
          align: "",
          minWidth: 150,
          render: (h, data) => {
            return h('DatePicker', {
              props: {
                format: "yyyy-MM-dd",
                type: "date",
                value: data.row.indexTime
              },
              on: {
                'on-change': (res) => {
                  this.tableDataEdit[data.row._index].indexTime = res;
                }
              }
            }, )
          }
        },
        {
          key: "msgType",
          title: "信息类型",
          align: "",
          minWidth: 150,
          render: (h, data) => {
            return h('Select', {
              props: {
                value: Number(data.row.msgType),
                labelInValue: true
              },
              on: {
                'on-change': (res) => {
                  this.tableDataEdit[data.row._index].msgType = res.value;
                }
              }
            },
              this.mesTypeLists.map(item => {
                return h('Option', {
                  props: {
                    value: Number(item.key),
                    label: item.value
                  }
                });
              })
            )
          }
        },
        {
          key: "errorDesp",
          title: "异常描述",
          minWidth: 150,
          render: (h, data) => {
            return h('Input', {
              props: {
                type: "text",
                value: data.row.errorDesp,
                maxlength: 100
              },
              on: {
                'on-blur': (res) => {
                  this.tableDataEdit[data.row._index].errorDesp = res.target.value;
                }
              }
            }, )
          }
        }, {
          key: "errorUrl",
          title: "异常地址",
          minWidth: 160,
          render: (h, data) => {
            return h('Input', {
              props: {
                type: "text",
                value: data.row.errorUrl,
                maxlength: 100
              },
              on: {
                'on-blur': (res) => {
                  this.tableDataEdit[data.row._index].errorUrl = res.target.value;
                }
              }
            })
          }
        }, {
          key: "supportName",
          title: "反馈人",
          minWidth: 150,
          render: (h, data) => {
            return h('Input', {
              props: {
                type: "text",
                value: data.row.supportName,
                maxlength: 30
              },
              on: {
                'on-blur': (res) => {
                  this.tableDataEdit[data.row._index].supportName = res.target.value;
                }
              }
            }, )
          }
        }, {
          key: "operatTime",
          title: "记录时间",
          minWidth: 120
        }, {
          key: "done",
          title: "操作",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            return h('a', {
              on: {
                click: () => {
                  this.deleteMes(data, data.row.id);
                }
              }
            }, '删除')
          }
        }],
        checkCycleArr: {
          checkCycle: null
        },
        departmentList: [{ value: "默认值value", label: "默认label" }],
        checkCycleList: [{ value: "默认值value", label: "默认label" }],
        nameList: [],
        selName: [],
        // dates:[],  //必须返回一个数组
        startTime: '',
        endTime: '',
        editDates: [],
        errorType: null,
        moreAddModal: false,
        editModal: false,
        removeModal: false,
        showSizer: true,
        dataCount: 0,
        pageSizeOpt: [10, 20, 50],
        forms: {
          supportName: null,
        },
        formItem: {
          "departIds": [],
          "employeeId": null,
          "indexTimeE": null,
          "indexTimeS": null,
          "pageNum": 1,
          "pageSize": 10
        },
        tableData: [
          {
            name: '',
            department: '',
            check: '',
            qualityCount: '',
            complainCount: '',
            locking: '',
          }
        ],
        columns: [
          {
            key: "employeeName",
            title: '姓名',
            align: 'center',
            minWidth: 120
          },
          {
            key: "orgWname",
            title: "所在部门",
            align: "center",
            minWidth: 200
          },
          {
            key: "indexTime",
            align: "center",
            title: "考核周期",
            minWidth: 120
          },
          {
            key: "count0",
            align: "center",
            title: "质检异常次数",
            minWidth: 120,
          },
          {
            key: "count1",
            align: "center",
            title: "客户投诉次数",
            minWidth: 120
          },
          {
            key: "status",
            align: "center",
            title: "是否锁定",
            minWidth: 80,
          },
          {
            key: "operate",
            align: "center",
            title: "操作",
            minWidth: 180,
            render: (h, data) => {
              if (data.row.status == "否") {
                return h('div', [
                  h('a', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        let sendObj = {
                          //employeeId:data.row.employeeId ? Number(data.row.employeeId):null,
                          employeeId: data.row.employeeId,
                          indexTime: data.row.indexTime
                        }
                        //判断是否可以编辑
                        yesOrNoEdits(sendObj).then(rps => {
                          if (rps.status == "200" && rps.message == "OK") {
                            this.editModal = true;
                            this.getupdateMes(data.row);
                          }
                        })

                      }
                    }
                  }, '编辑明细'),
                ])
              } else {

                return h('div', [
                  h('a', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {

                    }
                  }, '-'),
                ])
              }

            }
          },
        ],
        mesTypeLists: [],
        nameListArr: [],
        tableData2: [{
          "address": "",
          "departId": 0,
          "departName": "",
          "desc": "",
          "employeeId": 0,
          "employeeName": "",
          "indexTime": formatTime(new Date()),
          "msgType": 0,
          "supportName": ""
        }],
        columns2: [ // 弹窗table
          {
            title: '序号',
            type: "index",
            align: 'center',
            minWidth: 80,
          },
          {
            title: '姓名',
            key: 'employeeName',
            align: 'center',
            minWidth: 130,
            render: (h, data) => {
              return h('Select', {
                props: {
                  value: String(data.row.employeeId),
                  filterable: true,
                  labelInValue: true
                },
                on: {
                  "on-change": vals => {
                    autoputDept({ employeeId: vals.value }).then(res => {
                      if (res.status == "200") {
                        this.tableData2[data.index].employeeName = vals.label;
                        this.tableData2[data.index].employeeId = vals.value;
                        this.tableData2[data.index].departId = res.response.departId;
                        this.tableData2[data.index].departName = res.response.departName;
                      }
                    })
                  },
                  'on-query-change': (res) => {
                    // this.tableDataEdit[data.row._index].departName=res.value;
                    this.keyWordQuery(res, data.index);
                  }
                }
              },
                this.nameListArr[data.index] && this.nameListArr[data.index].map(res => {
                  return h("Option",
                    {
                      props: {
                        value: res.key,
                        label: res.value,
                        key: res.key
                      }
                    }, res.value);
                })
              )
            }
          },
          {
            title: '所属部门',
            key: 'departName',
            align: 'center',
            minWidth: 180
          },
          {
            title: '日期',
            key: 'indexTime',
            align: 'center',
            minWidth: 160,
            render: (h, data) => {
              return h('div', [
                h('DatePicker', {
                  props: {
                    format: "yyyy-MM-dd",
                    type: "date",
                    value: data.row.indexTime
                  },
                  on: {
                    "on-change": (res) => {
                      this.tableData2[data.row._index].indexTime = res;
                    }
                  }
                }, )
              ])
            }
          },
          {
            title: '信息类型',
            key: 'msgType',
            align: 'center',
            minWidth: 150,
            render: (h, data) => {
              let that = this;
              return h("Select", {
                props: {
                  labelInValue: true,
                  value: data.row.msgType,
                  filterable: true,
                },
                on: {
                  "on-change": (resp) => {//选中值发生改变事件
                    this.tableData2[data.index].msgType = resp.value;
                  }
                }
              }, [
                  that.mesTypeLists.map(item => {
                    return h("Option",
                      {
                        props: {
                          value: Number(item.key)
                        }
                      },
                      item.value);
                  })
                ])
            }
          },
          {
            title: '异常描述',
            key: 'desc',
            align: 'center',
            minWidth: 180,
            render: (h, data) => {
              return h('div', [
                h('Input', {
                  props: {
                    type: 'text',
                    value: data.row.desc,
                    size: 'small',
                    maxlength: 100
                  }, on: {
                    'on-blur': (res) => {
                      this.tableData2[data.row._index].desc = res.target.value;
                      if (this.tableData2[data.row._index].desc.length > 100) {
                        this.$Message.warning("异常描述不能超过100个字符！");
                      }
                    }
                  }
                }, )
              ])
            }
          },
          {
            title: '异常地址',
            key: 'address',
            align: 'center',
            minWidth: 180,
            render: (h, data) => {
              return h('div', [
                h('Input', {
                  props: {
                    type: 'text',
                    value: data.row.address,
                    size: 'small',
                    maxlength: 100
                  }, on: {
                    'on-blur': (res) => {
                      this.tableData2[data.row._index].address = res.target.value;
                      if (this.tableData2[data.row._index].address.length > 100) {
                        this.$Message.warning("异常地址不能超过100个字符！");
                      }
                    }
                  }
                }, )
              ])
            }
          },
          {
            title: "反馈人",
            align: "center",
            key: "supportName",
            minWidth: 120,
            maxlength: 30,
            render: (h, data) => {
              return h('div', [
                h('Input', {
                  props: {
                    type: 'text',
                    value: data.row.supportName,
                    size: 'small'
                  }, on: {
                    'on-blur': (res) => {
                      this.tableData2[data.row._index].supportName = res.target.value;
                      if (this.tableData2[data.row._index].supportName.length > 30) {
                        this.$Message.warning("反馈人不能超过30个字符！");
                      }
                    }
                  }
                }, )
              ])
            }
          },
          {
            title: '操作',
            key: 'done',
            align: 'center',
            minWidth: 160,
            render: (h, data) => {
              return h('div', [
                h('span', {
                  class: "icon-add",
                  style: {
                    float: "left",
                    marginTop: '7px'
                  }
                }),
                h('div', {
                  style: {
                    marginRight: '8px',
                    cursor: 'pointer',
                    color: '#84AF2C',
                    float: 'left'
                  },
                  on: {
                    click: () => {
                      let obj = {
                        departName: '',
                        departId: null,
                        indexTime: null,
                        msgType: null,
                        desc: '',
                        address: '',
                        employeeId: null,
                        employeeName: '',
                        supportName: ""
                      };
                      this.tableData2.push(obj);
                    }
                  }
                }, '增加'),
                h('span', {
                  class: "icon-remove",
                  style: {
                    float: "left",
                    marginTop: '7px'
                  }
                }),
                h('div', {
                  style: {
                    marginRight: '8px',
                    cursor: 'pointer',
                    color: '#F42C2C',
                    float: "left",
                  },
                  on: {
                    click: () => {
                      this.tableData2.splice(data.row._index, 1);
                    }
                  }
                }, '删除')
              ])
            }
          },
        ]
      }
    },
    created() {
      this.queryList();
      this.mesTypeClick()
    },
    methods: {
      //返回
      back() {
        this.editModal = false;
      },
      //重置查询条件
      reset() {
        this.formDatas = {
          departIds: [],
          employeeId: null,
          indexTimeE: null,
          indexTimeS: null,
          pageNum: 1,
          pageSize: 10
        }
        // this.dates=[];
        this.startTime = '';
        this.endTime = ''
      },
      //信息类型枚举
      mesTypeClick() {
        const that = this;
        messTypeList().then(resp => {
          that.mesTypeLists = resp.response;
        })
      },
      //导出excel 导出按钮事件
      exportExcel() {
        if (this.dataCount >= 10000) {
          this.$Message.warning({
            content: '数据超过1万条，请分批导出',
            duration: 2
          });
        } else if (this.dataCount <= 0) {
          this.$Message.warning({
            content: '无数据',
            duration: 2
          })
        } else {
          let obj = {
            "departIds": this.formDatas.departIds ? this.formDatas.departIds : "",
            "employeeId": this.formDatas.employeeId ? this.formDatas.employeeId : "",
            // "indexTimeE": this.dates[1]? formatStamp(this.dates[1]):"",
            // "indexTimeS": this.dates[0]? formatStamp(this.dates[0]):"",
            "indexTimeE": this.endTime ? formatStamp(this.endTime) : "",
            "indexTimeS": this.startTime ? formatStamp(this.startTime) : "",
            "pageNum": 1,
            "pageSize": 10
          }
          const urls = "/report/zxBjqa/export?departIds=" + obj.departIds + "&employeeId=" + obj.employeeId + "&indexTimeE=" + obj.indexTimeE + "&indexTimeS=" + obj.indexTimeS;
          window.location.href = urls;
        }

      },

      //开始周期
      getStartDates(val) {
        this.formDatas.indexTimeS = val ? formatStamp(val) : null;
      },
      //结束周期
      getEndDates(val) {
        this.formDatas.indexTimeE = val ? formatStamp(val) : null;
      },
      onSearch() {
        this.formDatas.pageNum = 1;
        this.formDatas.pageSize = 10;
        this.queryList();
      },
      //查询数据list
      queryList() {
        //列表查询调用接口
        let that = this;
        this.$Spin.show();
        testUpReport(this.formDatas).then(res => {
          this.$Spin.hide();
          if (res.status = "200") {
            this.tableData = res.response.list || [];
            this.dataCount = res.response.total;
          }
        })
      },
      //获取部门树
      getDepData(value, selectedData) {
        this.formDatas.departIds = selectedData;
      },
      changePageNum(current) {
        this.formDatas.pageNum = current;
        this.queryList();
      },
      // 监听修改显示条数
      changePageSize(size) {
        this.formDatas.pageSize = size;
        this.queryList();
      },
      //批量添加
      moreAdd() {
        this.moreAddModal = true;
        this.errorType = null;
        let obj = {
          departName: '',
          departId: null,
          indexTime: null,
          msgType: null,
          desc: '',
          address: '',
          employeeId: null,
          employeeName: '',
          supportName: ""
        };
        this.tableData2 = [];
        this.tableData2.push(obj);



      },
      //弹窗中的确定按钮事件
      ok() {

      },
      //查询人员关键字公共接口
      keyWordQuery(vals, index) {
        let that = this;
        //调用人员接口
        employeeSelect({ name: vals }).then(res => {
          if (res.status = "200") {
            that.nameList[index] = res.response;
//            console.log('nameList', that.nameList);
            that.nameListArr = [...that.nameList];

            that.selName = res.response
          }          
        })
      },
      //弹窗中的取消按钮事件
      cancel() {

      },
      //编辑事件中的确定按钮
      okGet() {
        const that = this;
        let nArr = that.tableDataEdit.map((res, v, arr) => {
          res.indexTime = new Date(res.indexTime).setHours(0, 0, 0, 0)
          return {
            "employeeId": res.employeeId,
            "errorDesp": res.errorDesp,
            "errorType": Number(res.errorType),
            "errorUrl": res.errorUrl,
            "id": res.id,
            "indexTime": formatStamp(res.indexTime),
            "msgType": Number(res.msgType),
            "supportName": res.supportName
          };
        });
        //调用修改异常上报数据api
        editUploadData(nArr).then(re => {
          if (re.status == "200") {
            that.$Message.success(re.message);
          }
        })
      },
      //删除弹窗中的确认键 是否删除（list表格）
      deleteMes(data, dt) {

        const that = this;

        this.$Modal.confirm({
          title: '删除提示：',
          content: '<p>你确定要删除？</p>',
          onOk: () => {
            //调用删除api
            delAbnormalLogs(formData({ id: dt })).then(res => {
              if (res.status = "200") {
                this.$Message.success(res.message);
                that.tableDataEdit.splice(data.row._index, 1);
                that.queryList();
                if (that.tableDataEdit.length == 0) {
                  this.editModal = false;
                }

              }
            })




          },
          onCancel: () => {
            this.$Message.info('取消删除');
          }
        });
      },
      //批量添加中的保存按钮事件
      saveLists() {
        if (!this.errorType) {
          this.$Message.warning('请选择异常类型');
          return;
        }
        for (let a = 0; a < this.tableData2.length; a++) {
          if (this.tableData2[a].msgType == null) {
            this.$Message.warning('请选择信息类型');
            return;
          }

        }
        let test = false;
        this.tableData2.map(item => {
          if (item.employeeName == "" || item.departName == "" || item.desc == "" || item.supportName == "" || item.indexTime == "") {
            test = false
          } else {
            test = true
          }

        })
        if (test) {
          let myFormDa = this.tableData2.map((va, v, arr) => {
            va.indexTime = new Date(va.indexTime).setHours(0, 0, 0, 0)
            arr[v].indexTime = va.indexTime ? formatStamp(va.indexTime) : null;
            arr[v].msgType = va.msgType ? Number(va.msgType) : null;
            arr[v].employeeId = va.employeeId ? Number(va.employeeId) : null;
            return arr;
          })
          let allObj = {
            "errorType": this.errorType ? Number(this.errorType) : null,
            "personDetailVOs": myFormDa[0]
          }
          newAddLogs(allObj).then(res => {
            if (res.status == "200") {
              this.queryList();
              this.$Message.success(res.message);
              this.moreAddModal = false;
              this.tableData2 = [{
                "address": "",
                "departId": 0,
                "departName": "",
                "desc": "",
                "employeeId": 0,
                "employeeName": "",
                "indexTime": 0,
                "msgType": 0,
                "supportName": ""
              }];

            }
          })
        } else {
          this.$Message.error("请填写完整信息")
        }

      },
      //调用质检异常上报信息
      getupdateMes(da) {
        let that = this;
        that.tableDataEdit = [
          // {
          //   employeeId:da.employeeId,
          //   employeeName:da.indexTime,
          //   errorDesp:'',
          //   errorType:'',
          //   errorUrl:'',
          //   id:'',
          //   indexTime:'',
          //   msgType:'',
          //   operatTime:'',
          //   orgId:'',
          //   orgWname:'',
          //   supportName:''
          // }
        ];
        let mes = {
          employeeId: da.employeeId,
          indexTime: da.indexTime,
          v: Math.random()
        };
        uploadMes(mes).then(res => {
          if (res.status = "200" && res.response.length > 0) {
            //  res.response.map((rsp,v,arr)=>{
            //    arr[v].msgType ="\'"+rsp.msgType+"\'";
            //    return arr;
            //  })
            that.tableDataEdit = res.response;

            //调用信息类型枚举
            //that.mesTypeClick();

          }

        })
      }
    }
  }
</script>
