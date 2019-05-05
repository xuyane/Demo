<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;业绩统计&nbsp;&nbsp;>>&nbsp;&nbsp;明细确认
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form ref="form" :model="formQrItem" :label-width="100">
      <Row type="flex">
        <Col span="7" class="col">
        <FormItem label="统计月份：">
          <DatePicker type="month" placeholder="请选择考核月份" class="search-input" v-model="formQrItem.indexTime"></DatePicker>
        </FormItem>
        </Col>
        <Col span="7" class="col">
        <FormItem label="姓名：">
          <Select clearable v-model="formQrItem.adminId" filterable class="search-input" placeholder="请选择人员" @on-query-change="getEmployee">
            <Option v-for="item in employees" :value="item.key" :key="item.key">{{ item.value }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="部门：">
          <bu-men @data-list="departDatas" :emptyModel='formQrItem.orgIds' v-model="formQrItem.orgIds"></bu-men>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex">
        <Col span="7" class="col">
        <FormItem label="确认状态：">
          <Select v-model="formQrItem.deleted">
            <Option value="0">正常</Option>
            <Option value="1">删除</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7" class="col">
        <FormItem label="产品名称：">
          <Input type="text" v-model="formQrItem.productName" placeholder="请输入产品名称" class="search-input" />
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="产品版本：">
          <Input type="text" v-model="formQrItem.productVersion" placeholder="请输入产品版本" class="search-input" />
        </FormItem>
        </Col>
      </Row>
      <Row type="flex">
        <Col span="7" class="col">
        <FormItem label="合同编号：">
          <Input type="text" v-model="formQrItem.contractCode" placeholder="请输入合同编号" class="search-input" />
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="会员：">
          <Select clearable v-model="formQrItem.memberId" filterable remote @on-query-change="remoteMethod1" :loading="loading" placeholder="请选择会员">
            <Option v-for="item in companyList" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        </Col>
        <!-- <Col span="7">
            <FormItem label="合同产品ID：">
              <Input type="text" v-model="formQrItem.pfContractProductId" placeholder="请输入合同产品ID" class="search-input" />
            </FormItem>
          </Col>-->
      </Row>
      <Row>
        <Col class="text-right">
        <Button type="primary" @click="onSearch()">查询</Button>
        <Button @click="reset" style="margin-left: 8px">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24" class="table-con">
    <div style="margin-bottom:20px;">
      <!--<Button type="primary"  style="margin-right:8px" @click="doDelete()">批量确认</Button>-->
      <Button type="primary" @click="exportData">导出</Button>
    </div>
    <Table class="tableCommon" :data="tableData" :columns="columns" :stripe="true" :border="true">
      <div class="page" slot="footer">
        <Page :total="dataCount" show-elevator show-total show-sizer :page-size="formPage.pageSize" :page-size-opts="pageSizeOpt"
              @on-change="changePageNum" @on-page-size-change="changePageSize" />
      </div>
    </Table>
    </Col>
    <!-- modal end -->
    <!-- 修改modal start -->
    <Modal v-model="modifyModal" title="编辑" width="500" >
      <Form ref="modifyForm" :model="modifyForm" :label-width="150"  :rules="editruleValidate">
        <Row>
          <Col span="8">
          <FormItem label="产品合同ID：">
            <span>{{modifyForm.pfContractProductId}}</span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="产品名称：">
            <span>{{modifyForm.productName}}</span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="产品版本：">
            <span>{{modifyForm.productVersion}}</span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="产品金额：">
            <span>{{modifyForm.ackAmount}}</span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="18">
          <FormItem prop='oldAmount' label="续入金额：">
            <Input v-model="modifyForm.oldAmount" @on-blur="onBlur('oldAmount')" />
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="18">
          <FormItem prop="newAmount" label="新入金额：">
            <Input v-model="modifyForm.newAmount" type="text" @on-blur="onBlur('newAmount')" />
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="18">
          <FormItem prop="confAmount" label="会议金额：">
            <Input v-model="modifyForm.confAmount" @on-blur="onBlur('confAmount')" />
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="18">
          <FormItem label="核算月份：">
            <DatePicker type="month" placeholder="modifyForm.indexTime" class="search-input" v-model="modifyForm.indexTime"></DatePicker>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="modifyItem('modifyForm')">保存</i-button>
        <i-button type="default" @click="modifyModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 弹窗end -->
    <!-- 确定modal -->
    <Modal v-model="OkModal" title="提示信息" @on-ok="ok" @on-cancel="cancel">
      <p style="text-align: center;">请在确无误后点击确认，您删除该条绩效记录？</p>
      <div slot="footer">
        <i-button type="primary" @click="removeTj()">确认</i-button>
        <i-button type="default" @click="OkModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 无权限 -->
    <Modal v-model="NoModal" title="提示信息" @on-ok="ok" @on-cancel="cancel">
      <p style="text-align: center;">您无权限提交</p>
      <div slot="footer">
        <i-button type="primary" @click="">确认</i-button>
        <i-button type="default" @click="NoModal=false">取消</i-button>
      </div>
    </Modal>
  </Row>
</template>
<script>
  import OilPage from "../../components/page/page.vue";
  import { checkListPage, itemExport, modify, remove, employeeSelect, selectMember } from '../../components/axios/performanceManagement.js';
  import { formData, format } from "../../../assets/js/common.js";
  import buMen from '../../components/jiXiao/buMen.vue';
  export default {
    name: 'detailConfirmation',
    components: {
      OilPage,
      buMen
    },
    data() {
      const validateOldAmount=(rule , value , callback )=>{
        var regoldacount = /^\-?[0-9]*\.?[0-9]+$/g;
        let str1 = value.toString().trim()
        let str2 = value.toString().indexOf('.')
        if( !regoldacount.test(str1)){
          callback(new Error('请输入数字'))
        }else if(str1.length>15){
          callback(new Error('最多输入15位'))
        }else if(str2==0){
          callback(new Error('请输入数字'))
        }else{
          callback();
        };
      };
      const validateNewAmount=(rule , value , callback )=>{
        var regnewacount = /^\-?[0-9]*\.?[0-9]+$/g;
        let str1 = value.toString().trim()
        let str2 = value.toString().indexOf('.')
        if( !regnewacount.test(str1)){
          callback(new Error('请输入数字'))
        }else if(str1.length>15){
          callback(new Error('最多输入15位'))
        }else if(str2==0){
          callback(new Error('请输入数字'))
        }else{
          callback();
        };
      };
      const validateConfAmount=(rule , value , callback )=>{
        var regconfacount = /^\-?[0-9]*\.?[0-9]+$/g;
        let str1 = value.toString().trim()
        let str2 = value.toString().indexOf('.')
        if(!regconfacount.test(str1)){
          callback(new Error('请输入数字'))
        }else if(str1.length>15){
          callback(new Error('最多输入15位'))
        }else if(str2==0){
          callback(new Error('请输入数字'))
        }else{
          callback();
        };
      };
      return {
        editruleValidate:{
          oldAmount:[
            { validator: validateOldAmount, trigger: 'blur' },
          ],
          newAmount:[
            { validator: validateNewAmount, trigger: 'blur' },
          ],
          confAmount:[
            { validator: validateConfAmount, trigger: 'blur' },
          ]
        },
        formPage: {
          pageNum: 1,
          pageSize: 10
        },
        loading: false,
        companyList: [],
//        departData: [],
        deleteId: '',
        //      ids:[],
        employees: [],
        selectRow: [], // 勾选数据
        detailModal: false,
        modifyModal: false,
        OkModal: false,
        NoModal: false,
        dataCount: 0,
        showSizer: true,
        pageSizeOpt: [10, 20, 50],
        mouthList: [],
        nameList: [],
        departmentList: [],
        form: [],
        formItem: {

        },
        tableData: [],
        formQrItem: {
          indexTime: '',
          adminId: '',
          orgIds: [],
          deleted: '',
          productName: '',
          pfContractProductId: '',
          productVersion: '',
          memberId: '',
          contractCode: ''
        },
        modifyForm: {
          id: "",
          indexTime: '',
          adminId: '',
          orgId: '',
          deleted: '',
          productName: '',
          pfContractProductId: '',
          productVersion: '',
          ackAmount: '',
          newAmount: '',
          confAmount: '',
          oldAmount: '',
          memberId: '',
          contractCode: ''
        },
        columns: [
          {
            key: "pfContractProductId",
            title: "合同产品ID",
            align: 'center',
            width: 90
          },
          {
            key: "productName",
            title: "产品名称",
            align: 'center',
            width: 120
          },
          {
            key: "productVersion",
            title: "产品版本",
            align: 'center',
            width: 100
          },
          {
            key: "contractCode",
            title: "所属合同",
            align: 'center',
            width: 120
          },
          {
            key: "memberName",
            title: "所属会员",
            align: 'center',
            width: 120
          },
          {
            key: "subtotalAmount",
            title: "产品总金额",
            align: 'center',
            width: 120
          },
          {
            key: "ackAmount",
            title: "产品金额（已认账）",
            align: 'center',
            width: 150
          },
          {
            key: "startTime",
            title: "服务开始时间",
            align: 'center',
            width: 150
          },
          {
            key: "endTime",
            title: "服务结束时间",
            align: 'center',
            width: 150
          },
          {
            key: "indexTime",
            title: "核算月份",
            align: 'center',
            width: 120
          },
          {
            key: "newAmount",
            title: "新入金额（核算）",
            align: 'center',
            width: 130
          },
          {
            key: "oldAmount",
            title: "续入金额（核算）",
            align: 'center',
            width: 130
          },
          {
            key: "confAmount",
            title: "会议金额（核算）",
            align: 'center',
            width: 130
          },
          {
            key: "adminName",
            title: "所属业务员",
            align: 'center',
            width: 100
          },
          {
            key: "orgName",
            title: "业务员部门",
            align: 'center',
            width: 150
          },
          {
            key: "deletedDesc",
            title: "确认状态",
            align: 'center',
            width: 100
          },
          {
            key: "operatorName",
            title: "确认人",
            align: 'center',
            width: 100
          },
          {
            key: "lastAccess",
            title: "确认时间",
            align: 'center',
            width: 120
          },
          {
            key: "operate",
            title: "操作",
            align: "center",
            fixed: "right",
            width: 130,
            render: (h, data) => {
              return h('div', [
                h('a', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.modifyModal = true;
                      this.modifyForm.id = data.row.id;
                      this.modifyForm.pfContractProductId = data.row.pfContractProductId;
                      this.modifyForm.productName = data.row.productName;
                      this.modifyForm.productVersion = data.row.productVersion;
                      this.modifyForm.ackAmount = data.row.ackAmount;
                      this.modifyForm.oldAmount = data.row.oldAmount;
                      this.modifyForm.newAmount = data.row.newAmount;
                      this.modifyForm.confAmount = data.row.confAmount;
                      this.modifyForm.indexTime = data.row.indexTime;
                    }
                  }
                }, '修改 '),
                h('a', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
//                      this.deleteId = [];
                      this.OkModal = true;
                      this.deleteId = data.row.id;
                    }
                  }
                }, '确认 '),
              ])
            }
          },
        ],
        columns2: [
          {
            key: "product",
            title: "产品",
            align: 'center',
            width: 100
          },
          {
            key: "productType",
            title: "产品版本",
            align: 'center',
            width: 100
          },
          {
            key: "productType",
            title: "所属合同",
            align: 'center',
            width: 120
          },
          {
            key: "productType",
            title: "会员",
            align: 'center',
            width: 100
          },
          {
            key: "productType",
            title: "应续入金额",
            align: 'center',
            width: 100
          },
          {
            key: "productType",
            title: "本次续入",
            align: 'center',
            width: 80
          },
          {
            key: "productType",
            title: "产品到期时间",
            align: 'center',
            width: 120
          },
          {
            key: "productType",
            title: "有效续入截止时间",
            align: 'center',
            width: 150
          },
        ]
      }
    },
    created() {
      this.getModelList();
      this.departDatas();
    },
    methods: {
      // iTofixed(num,fractionDigits) {
      //   return (Math.round(num*Math.pow(10,fractionDigits))/Math.pow(10,fractionDigits)+Math.pow(10,-(fractionDigits+1))).toString().slice(0, -1)
      // },
      changePageNum(current) {
        this.formPage.pageNum = current;
        this.getModelList();
      },
      // 监听修改显示条数
      changePageSize(size) {
        this.formPage.pageSize = size;
        this.getModelList();
      },
      ok() {
      },
      cancel() {
      },
      onSearch() {
        this.formPage.pageNum = 1;
        this.formPage.pageSize = 10;
        this.getModelList();
      },
      // 远程搜索的方法
      remoteMethod1(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            let form = {
              memberName: query
            }
            selectMember(form).then(res => {
              this.companyList = res.response
            })
          }, 50);
        } else {
          this.companyList = [];
        }
      },
      departDatas(deptLabel, deptId, deptCode) {
        this.formQrItem.orgIds = deptId || [];
//        this.departData = deptId ? deptId : null;
      },
      //员工下拉列表
      getEmployeeData(name) {
        let form = {
          name: name ? name : ' '
        }
        employeeSelect(form).then(res => {
          this.employees = res.response
        })
      },
      getEmployee(data) {
        this.getEmployeeData(data)
      },
      exportData() {
//        console.log('dataCount', this.dataCount);
        if (this.dataCount >= 10000) {
          this.$Message.warning({
            content: '数据超过1万条，请分批导出',
            duration: 2
          });
        }else if (this.dataCount <= 0) {
          this.$Message.warning({
            content: '无数据',
            duration: 2
          })
        }else {
          let time = '';
          let adminId = this.formQrItem.adminId;
          let deleted = this.formQrItem.deleted;
          let memberId = this.formQrItem.memberId;
          const productName = encodeURIComponent(this.formQrItem.productName);
          if (this.formQrItem.indexTime) {
            time = +this.formQrItem.indexTime;
          }

          if (!this.formQrItem.deleted) {
            deleted = '';
          }

          if (!this.formQrItem.adminId) {
            adminId = '';
          }

          if (!this.formQrItem.memberId) {
            memberId = '';
          }

          debugger;
//          console.log('dd', productName);
          window.location.href = "/report/PfAccountDetailAdmin/item_export?orgIds=" + this.formQrItem.orgIds + "&indexTime=" + time + "&adminId=" + adminId + "&deleted=" + deleted
            + "&productName=" + productName + "&pfContractProductId=" + this.formQrItem.pfContractProductId + "&productVersion=" + this.formQrItem.productVersion + "&memberId=" + memberId + "&contractCode="
            + this.formQrItem.contractCode;

//          window.location.href = "/report/PfAccountDetailAdmin/item_export" + formData(this.formQrItem);
        }
      },
      reset() {
        this.formQrItem = {
          indexTime: '',
          adminId: '',
          orgIds: [],
          deleted: '',
          productName: '',
          pfContractProductId:'',
          productVersion: '',
          memberId: '',
          contractCode: ''
        },
          this.formPage = {
            pageNum: 1,
            pageSize: 10
          }
      },

      modifyItem(a) {
        const indexTime = new Date(this.modifyForm.indexTime).setHours(0, 0, 0, 0)

        const form = {
          confAmount: this.modifyForm.confAmount,
          newAmount: this.modifyForm.newAmount,
          oldAmount: this.modifyForm.oldAmount,
          indexTime: indexTime,
          id: this.modifyForm.id,
        }
        this.$refs[a].validate((valid)=>{

          if(valid){
            modify(form).then(res => {
              this.$Message.success("修改成功！");
              this.modifyModal = false;
              this.getModelList();
            })
          }
        })
      },
      /*   已选区列表多选
        selectChange2(selection){
          let ids = selection.map(item => {
            return item.id
          })
          this.ids = ids;
          this.selection = selection
        },*/
      /*doDelete() {
            this.deleteId = [];
            if (this.ids.length === 0) {
                  this.$Message.warning("请勾选数据");
                  return false;
              } else {
                  this.OkModal = true;
              }
          },*/
      removeTj() {
        remove(formData({
          id: this.deleteId
        })).then(() => {
          this.$Message.success("删除成功！");
          this.OkModal = false;
          this.getModelList();
        })

        /*    axios.post('/report/PfAccountDetailAdmin/remove', {
              id: 1
            }, {
    //          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(res => {
              console.log(res);
            })*/


      },
      //确认明细列表
      getModelList() {
        let form = {
          indexTime: this.formQrItem.indexTime == '' ? '' : this.formQrItem.indexTime.getTime(),
          adminId: this.formQrItem.adminId,
          deleted: this.formQrItem.deleted,
          productName: this.formQrItem.productName,
          pfContractProductId: this.formQrItem.pfContractProductId,
          productVersion: this.formQrItem.productVersion,
          memberId: this.formQrItem.memberId,
          contractCode: this.formQrItem.contractCode,
//          orgIds: this.departData == [] ? null : this.departData,
          orgIds: this.formQrItem.orgIds,
          pageNum: this.formPage.pageNum,
          pageSize: this.formPage.pageSize
        }
        this.$Spin.show();
        checkListPage(form).then(res => {
          this.tableData = res.response.list || [];
          this.dataCount = res.response.total;
          this.$Spin.hide();
        })
      },

      onBlur(type) {
        const val = Number(this.modifyForm[type]);
        if (isNaN(val)) return;
        // this.modifyForm.oldAmount   this.modifyForm['oldAmount']
        // this.modifyForm[type] = Number(this.modifyForm[type]).toFixed(2);
        // this.modifyForm[type] =  this.iTofixed(this.modifyForm[type],2);
        this.modifyForm[type] = Math.round(val * 100) / 100;
        console.log('aa', this.modifyForm[type]);
      }
    }
  }
</script>

<style lang="less" scoped>
  .col {
    margin-right: 40px;
  }

  .page {
    margin: 10px 0;
    text-align: right;
    padding-right: 18px;
  }
</style>
