<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;发票邮寄管理
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="80">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="票号:">
              <Input v-model="formItem.value1" class="search-input" placeholder="请输入票号"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="会员名称:">
             <Select v-model="formItem.value2" :filterable="true" :remote-method="remoteMethod" class="search-input" placeholder="请输入会员名称">
                  <Option v-for="item in options" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            <!-- <Input v-model="formItem.value2" class="search-input" placeholder="请输入会员名称"></Input> -->
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="填写人:">
              <Input v-model="formItem.value3" class="search-input" placeholder="请输入领用人"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="快递单号:">
              <Input v-model="formItem.value4" class="search-input" placeholder="请输入快递单号"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="填写日期:">
             <DatePicker type="daterange" @on-change="dateChange" v-model="createTime" placeholder="选择时间"  placement="bottom-end" class="search-input" ></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="所在部门:">
              <select-department @data-list="departDatas" :emptyModel='formItem.adminDeptName'></select-department>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="有无邮寄:">
              <Select v-model="formItem.posted" class="search-input">
                <Option v-for="item in boolList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary" @click="search">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <!-- <Button type="primary" class="search-btn" @click="exportExcel">导出</Button> -->
          <Button type="success" class="search-btn" @click="add">批量添加</Button>
          <!-- <Button type="success" class="search-btn" @click="add">批量导入</Button> -->
          <Button type="error" class="search-btn" @click="lotDelete">批量删除</Button>
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
    <Modal class="modal1"
      v-model="modal1"
      title="批量添加"
      ok-text="确认"
      cancel-text="返回"
      @on-ok="ok"
      @on-cancel="cancel"
      width="1000">
      <Table class="tableCommon"
        :data="tableData1"
        :columns="columns1"
        :stripe="true"
        border>
      </Table>
    </Modal>
  </Row>
</template>
<script>
import axios from 'axios'
import { getInvoicePostList, getCommonSelect, getDepartList } from '../components/axios/http.js'
import OilPage from '../components/page/page.vue'
import SelectDepartment from '../components/finance/selectDepartment.vue';
import { formatThousandPrice } from "../../assets/js/common.js";
export default {
  watch:{
  },
  data() {
    return {
      createTime:"",
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [10,15,20,40,50,100],
      modal1: false,
      selection: [],
      loading: false,
      options: [],
      customList:[],
      postList: [],
      departData: [],
      boolList: [
        {value: 1, label: '有'},
        {value: 0, label: '无'}
      ],
      columns: [
        {
          type: 'selection',
          minWidth: 60,
          align: 'center'
        },
        {
          key: 'invoiceNum',
          title: '票号',
          align: 'center',
          minWidth:150
        },
        {
          key: 'member',
          title: '会员名称',
          align: 'center',
          minWidth:150
        },
        {
          key: 'totalAmount',
          title: '发票金额',
          align: 'center',
          minWidth:100,
          render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.totalAmount))
          }
        },
        {
          key: 'postName',
          title: '收件人',
          align: 'center',
          minWidth:150
        },
        {
          key: 'postPhone',
          title: '收件人联系方式',
          align: 'center',
          minWidth:160
        },
        {
          key: 'postAddress',
          title: '邮寄地址',
          align: 'center',
          minWidth:160
        },
        {
          key: 'postNo',
          title: '快递单号',
          align: 'center',
          minWidth:130
        },
        {
          key: 'postCropName',
          title: '快递公司',
          align: 'center',
          minWidth:180
        },
        {
          key: 'adminName',
          title: '业务员',
          align: 'center',
          minWidth:150
        },
        {
          key: 'adminDeptName',
          title: '所在部门',
          align: 'center',
          minWidth:150
        },
        {
          key: 'receiveTimeDes',
          title: '领用时间',
          align: 'center',
          minWidth: 150
        },
        {
          key: 'createTimeDesc',
          title: '填写时间',
          align: 'center',
          minWidth: 160
        },
        {
          title: '操作',
          align: 'center',
          minWidth:100,
          fixed: 'right',
          render: (h, data) => {
            if(data.row.postStatus == 1){
              if(data.row.id){
                return h('div', [
                  h('span', {
                    style: {
                      marginRight: '8px',
                      color: '#145edb',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.lotDelete(data)
                      }
                    }
                  }, '删除'),
                ])
              }
            }else{
              if(data.row.id){
                return h('div', [
                  h('span', {
                    style: {
                      marginRight: '8px',
                      color: '#145edb',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.write(data);
                      }
                    }
                  }, '填写'),
                  h('span', {
                    style: {
                      marginRight: '8px',
                      color: '#145edb',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.lotDelete(data)
                      }
                    }
                  }, '删除'),
                ])
              }else{
                return h('div', [
                  h('span', {
                    style: {
                      marginRight: '8px',
                      color: '#145edb',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.write(data);
                      }
                    }
                  }, '填写')
                ])
              }
            }
            
          }
        }
      ],
      tableData: [],
      columns1: [
        {
          key: 'invoiceNum',
          title: '票号',
          align: 'center',
          minWidth:160
        },
        {
          key: 'member',
          title: '会员名称',
          align: 'center',
          minWidth:160
        },
        {
          key: 'postName',
          title: '收件人',
          align: 'center',
          minWidth:100,
          render: (h, data) => {
            const self = this
            return h('Input', {
              props: {
                type: 'text',
                value: data.row.postName == "-" ? "" :  data.row.postName
              },
              on: {
                'on-change' (event) {
                  data.row.postName = event.target.value;
                  self.tableData1[data.index] = data.row;
                }
              }
            })
          }
        },
        {
          key: 'postPhone',
          title: '联系电话',
          minWidth:130,
          align: 'center',
          render: (h, data) => {
            const self = this
            return h('Input', {
              props: {
                type: 'text',
                value: data.row.postPhone == "-" ? "" :  data.row.postPhone
              },
              on: {
                'on-change' (event) {
                  data.row.postPhone = event.target.value
                  self.tableData1[data.index] = data.row
                }
              }
            })
          }
        },
        {
          key: 'postAddress',
          title: '邮寄地址',
          align: 'center',
          minWidth:180,
          render: (h, data) => {
            const self = this
            return h('Input', {
              props: {
                type: 'text',
                value: data.row.postAddress == "-" ? "" :  data.row.postAddress
              },
              on: {
                'on-change' (event) {
                  data.row.postAddress = event.target.value
                  self.tableData1[data.index] = data.row
                }
              }
            })
          }
        },
        {
          key: 'postNo',
          minWidth:180,
          title: '快递单号',
          align: 'center',
          render: (h, data) => {
            const self = this
            return h('Input', {
              props: {
                type: 'text',
                value: data.row.postNo == "-" ? "" :  data.row.postNo
              },
              on: {
                'on-change' (event) {
                  data.row.postNo = event.target.value
                  self.tableData1[data.index] = data.row
                }
              }
            })
          }
        },
        {
          key: 'postCropName',
          title: '快递公司',
          align: 'center',
          minWidth:120,
          render: (h, data) => {
            const self = this
            return h('Select', {
              props: {
                label: data.row.postCropName == "-" ? "" :  data.row.postCropName,
                //value: data.row.postCropName == "-" ? "" :  data.row.postCropName
              },
              on: {
                'on-change' (event) {
                  data.row.postCropName = event
                  self.tableData1[data.index] = data.row
                }
              }
            }, [
              // h('Option', {
              //   props: {
              //     value: data.row.postCropName
              //   }
              // }, data.row.postCropName)
              this.postList.map(item => {
                return h('Option', {
                  props: {
                    value: item.value,
                    label: item.desc
                  }
                }, item.desc)
              })
            ])
          }
        }
      ],
      tableData1: [],
      formItem:{
        value1:null,
        value2:null,
        value3:null,
        value4:null,
        endTime:null,
        startTime:null,
        adminDeptName:[]
      }
    }
  },
  components: {
    OilPage,
    SelectDepartment
  },
  created() {
    this.getDataList()
    this.departDatas()
    this.getPostList()
  },
  methods: {
    getDataList(){//查询事件
    let item = this.formItem;
      let params ={
        invoiceNum: item.value1 || '',      // 票号
        memberId: item.value2 || null,      // 会员id
        adminName: item.value3 || '',       // 领用人
        postNo: item.value4 || '',          // 快递单号
        adminDeptId: null,    // 所在部门id
        adminDeptIdList: item.adminDeptName && item.adminDeptName.length > 0 ? item.adminDeptName  : null, // 部门id集合
        endCreateTime: item.endTime, // 结束填写时间
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        posted: item.posted === "" ? null : item.posted,           // 有无邮寄
        startCreateTime: item.startTime // 开始填写时间
     }
      getInvoicePostList(params).then(res => {
        this.tableData = res.response.list ? res.response.list : []
        this.total = res.response.total
      })
    },
    search(){
      this.pageNum = 1;
      this.pageSize = 10;
      this.getDataList();
    },
    // 重置
    reset () {
      this.createTime = ""
      this.pageNum = 1;
      this.pageSize = 10;
      this.formItem={
        value1:null,
        value2:null,
        value3:null,
        value4:null,
        adminDeptName:[],
        posted:null,
        endTime:null,
        startTime:null
      }
    },
    ok(){//弹窗 中 确定按钮事件
      let invoicePostReqVOList = this.tableData1.map(option => { 
        let postCropId = option.postCropName;
        if(postCropId == "-"){
          postCropId = "";
        }
        for(var i=0;i<this.postList.length;i++){
          if(option.postCropName == this.postList[i].desc){
            postCropId = this.postList[i].value;
          }
        }
        return {
          invoiceInfoId:option.invoiceInfoId,
          invoiceNum: option.invoiceNum,
          member: option.member,
          memberId: option.memberId,
          postAddress: option.postAddress,
          postCode: 0,
          postCropId: postCropId,
          postName: option.postName,
          postNo: option.postNo,
          postPhone: option.postPhone,
        }
      })
      axios.post('/finance/invoicePost/insert', {
          "invoicePostReqVOList": invoicePostReqVOList
      }).then(res => {
        if(res.data.message === 'OK') {
          this.$Message.success('添加成功！')
          this.selection = [];
          this.getDataList()
        } else {
          this.$Message.warning(res.data.message)
        }
      })

    },
    cancel () {

    },
    // 获取部门列表
    departDatas (deptLabel,deptId,deptCode){
       this.formItem.adminDeptName = deptId ? deptId : null;
    },
    // 获取快递公司列表
    getPostList () {
      // axios.get('/finance/common/select', {
      //   params: {
      //     type: 'PostCropTypeEnum'
      //   }
      // }).then(res => {
      //   if(res.data.message === 'OK') {
      //     this.postList = res.data.response
      //   }
      // })
      getCommonSelect ({
        type: 'PostCropTypeEnum'
      }).then(res => {
        this.postList = res.response
      })
    },
    // 监听跳转分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getDataList()
    },
    selectChange (selection) {
      this.selection = selection
    },
    // 监听选择日期
    dateChange (date) {
      this.formItem.startTime = this.formatTime(date[0]) - 8 * 1000 * 60 * 60
      this.formItem.endTime = this.formatTime(date[1]) + 16 * 1000 * 60 * 60 - 1000
    },
    remoteMethod (st) {
      let that=this;
      axios({
        url: "/finance/common/selectMember",
        method: 'get',
        params:{
          memberName:st ? st:''
        }
      }).then(function(res){
         console.log(res);
        if(res.data.status == 200){     
            that.options = res.data.response;
        };
        that.$Spin.hide();
      }).catch(err => {
        console.log(err)
        that.$Spin.hide();
      });
    },
    // 填写
    write (data) {
      this.tableData1 = [];
      this.modal1 = true;
      this.tableData1.push(this.tableData[data.index]);
    },
    // 导出
    exportExcel () {
      console.log('导出')
    },
    // 批量添加
    add(){
      if(this.selection.length > 0) {
        this.tableData1 = this.selection
        this.modal1 = true
      }else{
        this.$Message.warning('请先勾选数据')
      }
    },
    delete (data) {
      this.tableData.splice(data.index, 1)
    },
    // 批量删除
    lotDelete (data) {
      var _this=this;
      var dataArr=this.selection;
      var rowData=[];
      dataArr.forEach(function(e,v){
          if(e.id){
              rowData.push(e.id);
         }
      })
      if (this.selection.length > 0 || data) {
        this.$Modal.confirm({
          title: '提示信息',
          content: '确定删除吗？',
          onOk: () => {
          var form =null;
          if(data.row){
                form="ids[]=" + data.row.id;
          }else{
                form="ids[]="+rowData.join(",");
          }
          axios({
            url: "/finance/invoicePost/delete",
            method: "post",
            data: form
          })
            .then(resp => {
              if (resp.data.status == "200") {
                this.getDataList();
              } else {
                // _this.$Message.warning(resp.data.message);
              }
            })
          },
          onCancel: () => {
            console.log('cancel')
          }
        });
      } else {
        this.$Message.warning('请先勾选数据');
      }
    },
    //获取客户列表
    getCustomList(){
      var that=this;
      axios({
        url: "/finance/common/selectMember?memberName=''",
        method: 'get',
        data:{}
      }).then(function(res){
         console.log(res);
        if(res.data.status == 200){

            that.customList = res.data.response;
        };
        that.$Spin.hide();
      }).catch(err => {
        console.log(err)
        that.$Spin.hide();
      });
    },
    formatTime (date) {
      return new Date(date).getTime()
    }
  }
}
</script>
