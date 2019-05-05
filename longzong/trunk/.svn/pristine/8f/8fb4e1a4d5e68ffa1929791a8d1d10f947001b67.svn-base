<style lang="less" scoped>
.search-input.input-width {
  width: 220px;
}
.list-hex-search {
  background: #fff;
  padding: 30px 30px 0px 20px;
  width: 100%;
}
.mar-b-0 {
  margin-bottom: 0;
}
</style>
<template>
  <Modal
    width="1000"
    v-model="modal1"
    title="添加合同"
    @on-ok="ok"
    :footer-hide="true"
    @on-cancel="cancel"
  >
    <Row>
      <Col span="24">
      <Row class-name="list-hex-search">
        <Form
          :model="formItem"
          :label-width="80"
        >
          <Row
            type="flex"
            justify="space-between"
          >
            <Col span="12">
            <FormItem label="合同编号:">
              <Input
                v-model="formItem.code"
                class="search-input"
                placeholder="请输入合同编号"
              ></Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem
              label="合同创建时间:"
              :label-width="150"
            >
              <DatePicker
                v-model="time"
                @on-change="dateChange"
                type="daterange"
                split-panels
                placeholder="选择创建时间"
                class="search-input"
              ></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row
            type="flex"
            justify="space-between"
          >
            <Col span="12">
            <FormItem label="合同金额:">
              <Input
                v-model="formItem.totalAmoutMin"
                class="search-input"
                style="width: 180px"
                placeholder="请输入金额"
                @on-keyup="numberInput(formItem.totalAmoutMin,'min')"
              ></Input>
              <span> -- </span>
              <Input
                v-model="formItem.totalAmoutMax"
                class="search-input"
                style="width: 181px"
                placeholder="请输入金额"
                @on-keyup="numberInput(formItem.totalAmoutMax,'max')"
              ></Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem
              label="是否要票:"
              :label-width="150"
            >
              <Select
                v-model="formItem.isNeedInvoice"
                class="form-select search-input"
              >
                <Option
                  v-for="item in boolList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Col
            span="24"
            class="text-right"
          >
          <Button
            type="primary"
            @click="search"
          >查询</Button>
          <Button
            style="margin-left: 8px"
            @click="reset"
          >重置</Button>
          </Col>
        </Form>
      </Row>
      </Col>
      <Col span="24">
      <Row class-name="table-con">
        <Button
          type="primary"
          @click="lotAdd"
        >批量添加</Button>
      </Row>
      <Row class-name="table-con mar-t--20">
        <Table
          class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true"
          :loading="tableLoading"
          @on-selection-change="selectChange"
        >
        </Table>
        <div class="page-con">
          <span>第{{pageNum}}页 / 共{{Math.ceil(dataCount / pageSize)}}页 每页{{pageSize}}条 共{{dataCount}}条</span>
          <Page
            :total="dataCount"
            :page-size="pageSize"
            show-sizer
            show-elevator
            :page-size-opts="pageSizeOpt"
            @on-change="pageChange"
            @on-page-size-change="changePageSize"
            class="pull-right"
          />
        </div>
      </Row>
      </Col>
      <div
        slot="footer"
        class="text-right mar-r-20"
      >
        <Button @click="cancel">返回</Button>
      </div>
    </Row>
  </Modal>
</template>
<script>
import axios from 'axios'
import { getInvoiceapplyList } from '../components/axios/finance.js'
import { formData } from '../../assets/js/common.js'
export default {
  props: {
    showModal: Boolean,
    tableCodes: {
      type: Array
    }
  },
  data() {
    return {
      dataCount: 4,
      pageSize: 5,
      pageNum: 1,
      pageSizeOpt: [5, 10, 20],
      selectionId: [],
      selectionAmoutUnAck: [],
      modal1: false,
      columns: [
        {
          type: 'selection',
          width: 40,
          align: 'center'
        },
        {
          title: '合同编号',
          width: 100,
          key: 'code',
          render: (h, data) => {
            return h('span', {
              style: {
                color: '#145edb',
                cursor: 'pointer',
                textDecoration: 'underline'
              },
              on: {
                click: () => {
                  this.goheCode(data.row.code);
                }
              }
            }, data.row.code)
          }
        },
        {
          title: '合同名称',
          key: 'name'
        },
        {
          title: '合同日期',
          key: 'createTimeDes',
          width: 150
        },
        {
          title: '是否要票',
          width: 80,
          key: 'isNeedInvoice'
        },
        {
          title: '业务员',
          width: 80,
          key: 'creatorName'
        },
        {
          title: '合同金额',
          key: 'totalAmount'
        },
        {
          title: '未认账金额',
          key: 'amoutUnAck'
        },
        {
          title: '可开票金额',
          key: 'openingInvoiceAmount'
        },
        {
          title: '操作',
          align: 'center',
          width: 70,
          render: (h, data) => {
            if (data.row.openingInvoiceAmount > 0) {
              return h('span', {
                style: {
                  color: '#145edb',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.singleAdd(data)
                  }
                }
              }, '添加')
            }
          }
        }
      ],
      tableData: [

      ],
      formItem: {
        code: "",
        startTime: "",
        endTime: "",
        totalAmoutMin: '',
        totalAmoutMax: '',
        isNeedInvoice: ''
      },
      time: "",
      boolList: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ],
      tableLoading: false
    }
  },
  watch: {
    showModal(newVal, oldVal) {
      this.modal1 = newVal;
      this.search();
    }
  },
  methods: {
    goheCode(contractNo) {
      let routeData = this.$router.resolve({
        name: "waittingCheck",
        query: {
          contractCode: contractNo
        }
      });
      window.open(routeData.href, '_blank');
    },
    //金额只允许输入数字
    numberInput(value, type) {
      if (value != "") {
        if (type == "min") {
          this.formItem.totalAmoutMin = value.replace(/[^\d.]/g, "");
        }
        if (type == "max") {
          this.formItem.totalAmoutMax = value.replace(/[^\d.]/g, "");
        }
      }
    },
    dateChange(date) {
      this.formItem.startTime = this.formatToSecond(date[0]) - 8 * 1000 * 60 * 60
      this.formItem.endTime = this.formatToSecond(date[1]) + 16 * 1000 * 60 * 60 - 1000
    },
    // 转时间戳
    formatToSecond(date) {
      return new Date(date).getTime()
    },
    ok() {
      this.modal1 = false;
      this.$emit("hide-modal");
    },
    cancel() {
      this.modal1 = false;
      this.$emit("hide-modal");
    },
    // 查询
    search() {
      let form = {
        code: this.formItem.code,
        startTime: this.formItem.startTime,
        endTime: this.formItem.endTime,
        isNeedInvoice: this.formItem.isNeedInvoice == undefined ? "" : this.formItem.isNeedInvoice,
        totalAmoutMin: this.formItem.totalAmoutMin,
        totalAmoutMax: this.formItem.totalAmoutMax,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        flag: 1
      }
      this.tableLoading = true;
      let formDat = formData(form)
      getInvoiceapplyList(
        formDat
      )
        .then(res => {
          this.tableLoading = false;
          this.tableData = res.response.list ? res.response.list : []
          this.dataCount = res.response.total
          this.checkSet();
        })
    },
    // 重置
    reset() {
      this.formItem = {
        code: "",
        startTime: "",
        endTime: "",
        totalAmoutMin: '',
        totalAmoutMax: '',
        isNeedInvoice: ''
      }
      this.time = "";
    },
    checkSet() {
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i]._checked = false;
        for (var j = 0; j < this.tableCodes.length; j++) {
          if (this.tableCodes[j] === this.tableData[i].code) {
            this.tableData[i]._checked = true;
            this.selectionId.push({ amount: this.tableData[i].amoutUnAck ? this.tableData[i].amoutUnAck : 0, id: this.tableData[i].id, code: this.tableData[i].code })
            //this.selectionAmoutUnAck.push(this.tableData[i].amoutUnAck ? this.tableData[i].amoutUnAck : 0)
          }
        }
        this.tableData[i]._disabled = false;
        if (this.tableData[i].openingInvoiceAmount <= 0) {
          this.tableData[i]._disabled = true;
        }
      }
    },
    singleAdd(res) {
      this.tableData[res.index]._checked = true;
      let data = res.row;
      if (data.amoutUnAck > 0) {
        this.$Modal.confirm({
          title: '未认账金额确认',
          content: "未认账金额为：" + data.amoutUnAck,
          onOk: () => {
            let dataList = [];
            let amoutUnAckList = 0;
            amoutUnAckList = data.amoutUnAck
            dataList.push({ amount: amoutUnAckList, id: data.id, code: data.code })
            this.$emit("addData", dataList, amoutUnAckList)
          },
          cancelText: '取消'
        });
      } else {
        let dataList = [];
        let amoutUnAckList = 0;
        amoutUnAckList = data.amoutUnAck
        dataList.push({ amount: amoutUnAckList, id: data.id, code: data.code })
        this.$emit("addData", dataList, amoutUnAckList)
      }
    },
    // 监听跳转分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page
      }
      if (pageSize) {
        this.pageSize = pageSize
      }
      this.search()
    },
    // 监听修改显示条数
    changePageSize(size) {
      this.pageSize = size
    },
    selectChange(selection) {
      console.log(selection)
      //dataList.push({amount:amoutUnAckList,id:data.id})
      this.selectionId = selection.map(item => {
        return { amount: item.amoutUnAck, id: item.id, code: item.code }
      })
      this.selectionAmoutUnAck = selection.map(item => {
        return item.amoutUnAck
      })
    },
    lotAdd() {
      let newCodes = [], amounts = [];
      for (var i = 0; i < this.selectionId.length; i++) {
        let val = this.selectionId[i];
        if (newCodes.indexOf(val) === -1) {
          newCodes.push(val)
          amounts.push(val.amount)
        }
      }
      this.selectionId = newCodes;
      this.selectionAmoutUnAck = amounts;
      let num = 0;
      for (let i = 0; i < this.selectionAmoutUnAck.length; i++) {
        num += parseFloat(this.selectionAmoutUnAck[i])
      }
      if (num > 0) {
        this.$Modal.confirm({
          title: '未认账金额确认',
          content: "未认账金额为：" + num,
          onOk: () => {
            this.$emit("addData", this.selectionId, num)
          },
          cancelText: '取消'
        });
      } else {
        this.$Message.warning('请选择合同！');
        // this.$emit("addData",this.selectionId,num)
      }
    }
  },
  mounted() {
    this.search();
  }
}
</script>
