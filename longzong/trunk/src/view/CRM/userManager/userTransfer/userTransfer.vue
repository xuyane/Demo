<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;划转列表
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="80">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="业务员:">
              <Select
                ref="selectMethod"
                v-model="formItem.adminName"
                class="search-input"
                filterable
                clearable
                remote
                :remote-method="remoteMethod1"
                :loading="loading"
                placeholder="请输入业务员">
                <Option v-for="(option, index) in adminList" :value="option.name" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="原业务员:">
              <Select
                ref="selectMethod"
                v-model="formItem.originAdminName"
                class="search-input"
                filterable
                clearable
                remote
                :remote-method="remoteMethod1"
                :loading="loading"
                placeholder="请输入原业务员">
                <Option v-for="(option, index) in adminList" :value="option.name" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="划转时间:">
              <DatePicker
                v-model="transferTime"
                type="daterange"
                placeholder="请选择划转时间"
                class="search-input"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="公司名称:">
              <Select
                ref="selectMethod"
                v-model="formItem.companyName"
                class="search-input"
                filterable
                clearable
                remote
                :remote-method="remoteMethod2"
                :loading="loading"
                placeholder="请输入公司名称">
                <Option v-for="(option, index) in companyList" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="用户类型:">
              <Select v-model="formItem.userType" class="form-select" placeholder="请选择用户类型">
                <Option v-for="item in userTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="用户名:">
              <Input v-model="formItem.userName" clearable class="search-input" placeholder="请输入用户名"></Input>
            </FormItem>
          </Col>
          <Col span="24" class="text-right">
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
          <Button type="primary" class="search-btn" @click="transfer">划转</Button>
          <Button type="primary" class="search-btn" @click="lotTransfer">批量划转</Button>
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
    <transfer-modal
      :showTransferModal="showTransferModal"
      @hide-modal="hideModal">
    </transfer-modal>
    <lot-transfer-modal
      :showTransferModal="lotTransferModal"
      @hide-modal="hideModal">
    </lot-transfer-modal>
  </Row>
</template>
<script>
import OilPage from '../../../components/page/page.vue'
import TransferModal from './transferModal'
import LotTransferModal from './lotTransferModal'
import dial from '@/assets/js/linkDial.js';
import {
  getTransferList,
  getTransferType,
  memberSelectList,
  adminListName
} from "../../../components/axios/crm.js";
import { formatStamp, formatTime2, formData, formatType } from '../../../../assets/js/common.js'
export default {
  data() {
    return {
      showTransferModal: false,
      lotTransferModal: false,
      loading: false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      companyList: [],
      adminList: [],
      userTypes: [
        {
          value: 0,
          desc: '免费用户'
        },
        {
          value: 1,
          desc: '试用用户'
        },
        {
          value: 2,
          desc: '正式用户'
        }
      ],
      transferReasons: [],
      transferTime: [],
      formItem: {
        adminName: '',
        originAdminName: '',
        companyName: '',
        userType: '',
        userName: ''
      },
      tableData: [],
      columns: [
        {
          key: 'companyName',
          title: '公司名称',
          minWidth: 150,
           render: (h, data) => {
            return h('Tooltip', {
              props: {
                placement: 'top',
                maxWidth: 400
              },
              style: {
                display: 'block',
                color: '#2d8cf0',
                cursor: 'pointer',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }
            }, [
              h('span', {
                on: {
                  click: () => {
                    this.check(data)
                  }
                }
              }, data.row.companyName),
              h('div', {
                slot: 'content',
                domProps: {
                  innerHTML: data.row.companyName
                }
              })
            ])
          }
        },
        {
          key: 'userName',
          title: '用户名',
          minWidth: 100
        },
        {
          key: 'userType',
          title: '用户类型',
          minWidth: 100,
          render: (h, data) => {
            return h('span', 
              this.userTypes.map(item => {
                if(data.row.userType == item.value) {
                  return item.desc
                }
              })
            )
          }
        },
        {
          key: 'adminName',
          title: '业务员',
          minWidth: 120
        },
        {
          key: 'adminMobile',
          title: '业务员电话',
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
                      this.onDial(data.row.adminMobile);
                    }
                  }
                },
                data.row.adminMobile
              )
            ]);
          }
        },
        {
          key: 'originAdminName',
          title: '原业务员',
          minWidth: 120
        },
        {
          key: 'originAdminMobile',
          title: '原业务员电话',
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
                      this.onDial(data.row.originAdminMobile);
                    }
                  }
                },
                data.row.originAdminMobile
              )
            ]);
          }
        },
        {
          key: 'transferReason',
          title: '划转原因',
          minWidth: 100,
          render: (h, data) => {
            return h('span', 
              this.transferReasons.map(item => {
                if(data.row.transferReason == item.value) {
                  return item.desc
                }
              })
            )
          }
        },
        {
          key: 'transferResult',
          title: '划转结果',
          minWidth: 80,
          render: (h, data) => {
            return h('span',
              data.row.transferResult === '1' ? '成功' : '失败'
            )
          }
        },
        {
          key: 'note',
          title: '备注',
          minWidth: 100
        },
        {
          key: 'transferTime',
          title: '划转时间',
          minWidth: 160,
          render: (h, data) => {
            return h('span', formatTime2(data.row.transferTime))
          }
        }
      ]
    }
  },
  components: {
    OilPage,
    TransferModal,
    LotTransferModal
  },
  created() {
    this.getListPage()
    this.getTransferType()
  },
  methods: {
    findListPage(){
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage();
    },
    getListPage() {
      this.$Spin.show()
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        startTransferTime: formatStamp(this.transferTime[0]) || '',
        endTransferTime: formatStamp(this.transferTime[1]) || '',
        adminName: this.formItem.adminName || '',
        originAdminName: this.formItem.originAdminName || '',
        memberId: this.formItem.companyName || '',
        userType: formatType(this.formItem.userType),
        userName: this.formItem.userName || '',
      }
      getTransferList(formData(params)).then(res => {
        this.$Spin.hide()
        this.tableData = res.response.list
        this.total = res.response.total
      })
    },
    // 获取类型下拉
    getTransferType() {
      getTransferType().then(res => {
        this.transferReasons = res.response
      })
    },
    queryChange(val) {
      if(!val) {
        this.formItem.adminName = ''
      }
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
    // 业务员列表
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          adminName: query
        }
        adminListName(params).then(res => {
          this.adminList = res.response;
        })
      } else {
        this.adminList = []
      }
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({title: '呼叫成功：' + phone})
      });
    },
    // 重置
    reset() {
      this.formItem = {}
      this.transferTime = []
      this.$refs.selectMethod.query = ''
    },
    // 划转
    transfer () {
      this.showTransferModal = true
    },
    // 批量划转
    lotTransfer () {
      this.lotTransferModal = true
    },
    hideModal() {
      this.showTransferModal = false
      this.lotTransferModal = false
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
  }
}
</script>
