<style lang="less" scoped>
  .tab {
    padding: 20px 0 0 50px;
    background: #fff;
  }
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系&nbsp;&nbsp;>>&nbsp;&nbsp;用户管理&nbsp;&nbsp;>>&nbsp;&nbsp;
        <span v-show="tab === 1">对标信息</span>
        <span v-show="tab === 2">已采纳</span>
        <span v-show="tab === 3">已作废</span>
      </Row>
    </Col>
    <Col span="24" class="tab">
      <tab-header :tab="tab" :tab-list="tabList" @tab="tabChange"></tab-header>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="公司名称:">
              <Select
                ref="selectMethod"
                v-model="formItem.memberNameCn"
                class="search-input"
                filterable
                remote
                :remote-method="remoteMethod2"
                :loading="loading"
                placeholder="请输入公司名称">
                <Option v-for="(option, index) in companyList" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="对标服务商:">
              <Select v-model="formItem.compareCompany" class="form-select" placeholder="请选择对标服务商">
                <Option v-for="item in compareServes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="关注品种:">
              <Input v-model="formItem.attent" class="search-input" placeholder="请输入关注品种"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="对标时间:">
              <DatePicker
                v-model="compareTime"
                type="daterange"
                placeholder="请选择对标时间"
                class="search-input"></DatePicker>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary" @click="findListPage">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="transfer">新增对标</Button>
        </div>
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true">
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
  </Row>
</template>
<script>
import TabHeader from '../../../components/tab/tab'
import OilPage from '../../../components/page/page.vue'
import dial from '@/assets/js/linkDial.js';
import {
  getUserCompareList,
  adoptUserCompare,
  cancelUserCompare,
  downloadUserCompare,
  getAllSevers,
  memberSelectList
} from '../../../components/axios/crm'
import {
  formData,
  formatStamp
} from '../../../../assets/js/common.js'
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      status: '',
      tab: 1,
      loading: false,
      compareServes: [],
      compareTime: [],
      companyList: [],
      tabList: [
        {
          tab: 1,
          title: '对标信息'
        },
        {
          tab: 2,
          title: '已采纳'
        },
        {
          tab: 3,
          title: '已作废'
        }
      ],
      time: [],
      formItem: {
        compareCompany: '',
        memberNameCn: '',
        attent: ''
      },
      tableData: [],
      columns1: [
        {
          key: 'memberNameCn',
          title: '公司名称',
          minWidth: 120
        },
        {
          key: 'realName',
          title: '联系人',
          minWidth: 120
        },
        {
          key: 'mobile',
          title: '电话',
          minWidth: 120,
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
                      this.onDial(data.row.mobile);
                    }
                  }
                },
                data.row.mobile
              )
            ]);
          }
        },
        {
          key: 'compareCompany',
          title: '对标服务商',
          minWidth: 120
        },
        {
          key: 'attent',
          title: '关注品种',
          minWidth: 120
        },
        {
          key: 'advantage',
          title: '优点',
          minWidth: 120,
          render: (h, data) => {
            let list = data.row.advantage.split('，')
            return h('div', [
              h('span', list[0]),
              h('Tooltip', {
                props: {
                  placement: 'top',
                  maxWidth: 400
                },
                style: {
                  marginLeft: '5px',
                  color: '#2d8cf0',
                  cursor: 'pointer'
                },
              }, [list && list.length > 1 ? '更多' : '', 
                h('div', {
                  slot: 'content',
                  domProps: {
                    innerHTML: list.join('<br />')
                  }
                })
              ])
            ])
          }
        },
        {
          key: 'disadvantage',
          title: '缺点',
          minWidth: 120,
          render: (h, data) => {
            let list = data.row.disadvantage.split('，')
            return h('div', [
              h('span', list[0]),
              h('Tooltip', {
                props: {
                  placement: 'top',
                  maxWidth: 400
                },
                style: {
                  marginLeft: '5px',
                  color: '#2d8cf0',
                  cursor: 'pointer'
                },
              }, [list && list.length > 1 ? '更多' : '', 
                h('div', {
                  slot: 'content',
                  domProps: {
                    innerHTML: list.join('<br />')
                  }
                })
              ])
            ])
          }
        },
        {
          key: 'note',
          title: '备注',
          minWidth: 120
        },
        {
          key: 'attachment',
          title: '附件',
          minWidth: 120,
          render: (h, data) => {
            return h('div', {
              style: {
                color: '#145edb',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.download(data)
                }
              }
            }, data.row.attachment ? '下载' : '')
          }
        },
        {
          key: 'operation',
          title: '操作',
          minWidth: 120,
          render: (h, data) => {
            return h('div', {
              style: {
                display: data.row.status === 0 ? 'block' : 'none'
              }
            }, [
              h('span', {
                style: {
                  color: '#145edb',
                  cursor: 'pointer',
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.cancel(data.row.id)
                  }
                }
              }, '作废'),
              h('span', {
                style: {
                  color: '#145edb',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.adopt(data.row.id)
                  }
                }
              }, '采纳')
            ])
          }
        },
      ],
      columns2: [
        {
          key: 'memberNameCn',
          title: '公司名称',
          minWidth: 120
        },
        {
          key: 'realName',
          title: '联系人',
          minWidth: 120
        },
        {
          key: 'mobile',
          title: '电话',
          minWidth: 120,
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
                      this.onDial(data.row.mobile);
                    }
                  }
                },
                data.row.mobile
              )
            ]);
          }
        },
        {
          key: 'compareCompany',
          title: '对标服务商',
          minWidth: 120
        },
        {
          key: 'attent',
          title: '关注品种',
          minWidth: 120
        },
        {
          key: 'advantage',
          title: '优点',
          minWidth: 120,
          render: (h, data) => {
            let list = data.row.advantage.split('，')
            return h('div', [
              h('span', list[0]),
              h('Tooltip', {
                props: {
                  placement: 'top',
                  maxWidth: 400
                },
                style: {
                  marginLeft: '5px',
                  color: '#2d8cf0',
                  cursor: 'pointer'
                },
              }, [list && list.length > 1 ? '更多' : '', 
                h('div', {
                  slot: 'content',
                  domProps: {
                    innerHTML: list.join('<br />')
                  }
                })
              ])
            ])
          }
        },
        {
          key: 'disadvantage',
          title: '缺点',
          minWidth: 120,
          render: (h, data) => {
            let list = data.row.disadvantage.split('，')
            return h('div', [
              h('span', list[0]),
              h('Tooltip', {
                props: {
                  placement: 'top',
                  maxWidth: 400
                },
                style: {
                  marginLeft: '5px',
                  color: '#2d8cf0',
                  cursor: 'pointer'
                },
              }, [list && list.length > 1 ? '更多' : '', 
                h('div', {
                  slot: 'content',
                  domProps: {
                    innerHTML: list.join('<br />')
                  }
                })
              ])
            ])
          }
        },
        {
          key: 'note',
          title: '备注',
          minWidth: 120
        },
        {
          key: 'attachment',
          title: '附件',
          minWidth: 120,
          render: (h, data) => {
            return h('div', {
              style: {
                color: '#145edb',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.download(data)
                }
              }
            }, data.row.attachment ? '下载' : '')
          }
        }
      ]
    }
  },
  created() {
    this.getListPage()
    this.getAllSevers()
  },
  methods: {
    tabChange(tab) {
      this.tab = tab
      this.status = tab - 1
      this.getListPage()
    },
      findListPage(){
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage();
    },
    // 获取列表
    getListPage() {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        startTime: formatStamp(this.compareTime[0]) || '',
        endTime: formatStamp(this.compareTime[1]) || '',
        compareCompany: this.formItem.compareCompany || '',
        memberNameCn: this.formItem.memberNameCn || '',
        attent: this.formItem.attent || ''
      }
      if(this.status) {
        params.status = this.status
        this.columns = this.columns2
      } else {
        this.columns = this.columns1
      }
      this.$Spin.show()
      getUserCompareList(formData(params)).then(res => {
        console.log('compare', res)
        this.tableData = res.response.list
        this.total = res.response.total
        this.$Spin.hide()
      })
    },
    // 重置
    reset() {
      this.formItem = {},
      this.compareTime = []
      this.$refs.selectMethod.query = ''
    },
    // 采纳
    adopt(id) {
      this.$Modal.confirm({
        title: '确定操作',
        content: '<p>是否确定采纳？</p>',
        onOk: () => {
          let params = {
            id
          }
          adoptUserCompare(formData(params)).then(res => {
            this.$Message.success('采纳成功！');
            this.getListPage()
          })
        },
        onCancel: () => {
          
        }
      });
    },
    // 作废
    cancel (id) {
      this.$Modal.confirm({
        title: '确定操作',
        content: '<p>是否确定作废？</p>',
        onOk: () => {
          let params = {
            id
          }
          cancelUserCompare(formData(params)).then(res => {
            this.$Message.success('作废成功！');
            this.getListPage()
          })
        },
        onCancel: () => {
          
        }
      });
    },
    // 公司名称
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          memberName: query
        }
        memberSelectList(params).then(res => {
          this.companyList = res.response;
        })
      } else {
        this.companyList = []
      }
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({title: '呼叫成功：' + phone})
      });
    },
    // 下载
    download(data) {

      window.location.href = "/crm/usercompare/download?attachment=" + data.row.attachment;
    
    },
    // 获取对标服务商
    getAllSevers() {
      getAllSevers().then(res => {
        this.compareServes = res.response.list
      })
    },
    // 新增对标
    transfer() {
      this.$router.push({
        name: 'addBench'
      })
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getListPage()
    },
  },
  components: {
    TabHeader,
    OilPage
  }
}
</script>

