<style lang="less" scoped>
  .top-btn {
    position: absolute;
    top: 70px;
    right: 20px;
  }
  .card-container {
    width: 100%;
    background: #fff;
    .row {
      position: relative;
      display: flex;
      height: 50px;
      line-height: 46px;
      text-align: center;
      .th {
        flex: 0 0 200;
        width: 200px;
        height: 100%;
        background: #eeeff4;
        overflow: hidden;
      }
      .td {
        position: relative;
        padding: 0 10px;
        flex: 1;
        height: 100%;
        // overflow: hidden;

      }
      .height-auto {
        height: auto;
      }
    }
    .row-title {
      border-top: 1px solid #bbb;
      font-size: 16px;
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
    .text-a {
      color: #145edb;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .title-name {
    font-size: 16px;
    color: #000;
    margin: 0 0 12px 20px;
    background: #fff;
  }
  
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的用户
      </Row>
    </Col>
    <tab-header :tab-index="2"></tab-header>
    <!-- <Button type="primary" class="search-btn top-btn" @click="update">更新</Button> -->
    <Button v-if="isEdit" type="primary" class="search-btn top-btn" @click="changeEdit">编辑</Button>
    <Button v-else type="primary" class="search-btn top-btn" @click="update">更新</Button>
    <Col span="24" class="card-container" v-if="isEdit">
      <table width="100%" border="1" cellspacing="0">
        <Col span="24" class="row-title">
          <div class="text-center">营业执照</div>
        </Col>
        <Row>
          <Col span="12" class="row">
            <th class="th">统一社会信用代码:</th>
            <td class="td">{{dataList.creditCode}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th">证照编号:</th>
            <td class="td">{{dataList.licenseNo}}</td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">企业类型:</th>
            <td class="td">{{formatTypeName(dataList.companyType)}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th">企业性质:</th>
            <td class="td">{{formatNatureName(dataList.companyNature)}}</td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">企业法定代表人:</th>
            <td class="td">{{dataList.legalPerson}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th">企业负责人:</th>
            <td class="td">{{dataList.chargePerson}}</td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">注册资本:</th>
            <td class="td">{{dataList.registeredCapital}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th">成立日期:</th>
            <td class="td">{{dataList.foundDate}}</td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">经营期限:</th>
            <td class="td">
              {{dataList.businessTermStart ? formatYear(dataList.businessTermStart) : ''}} - 
              {{dataList.businessTermEnd ? formatYear(dataList.businessTermEnd) : ''}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th height-auto">营业执照:</th>
            <td class="td height-auto">
              <span class="text-a" @click="preview(dataList.licenseFilePath)">预览</span>
              <span class="text-a" @click="download(dataList.licenseFilePath)">下载</span>
              <Upload
                class="text-a"
                style="display: inline-block"
                :before-upload = "handleUpload"
                :data = "form"
                :on-success = "uploadSuccess"
                :on-remove = "removeUrl"
                :max-size = 20480
                action="/crm/usercompare/upload">
                上传
              </Upload>
            </td>
          </Col>
        </Row>
      </table>
    </Col>
    <Col span="24" class="card-container" v-else>
      <table width="100%" border="1" cellspacing="0">
        <Col span="24" class="row-title">
          <div class="text-center">营业执照</div>
        </Col>
        <Row>
          <Col span="12" class="row">
            <th class="th">统一社会信用代码:</th>
            <td class="td">
              <Input type="text" v-model="dataList.creditCode" class="search-input" placeholder="请输入统一社会信用代码"></Input>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">证照编号:</th>
            <td class="td">
              <Input type="text" v-model="dataList.licenseNo" class="search-input" placeholder="请输入证照编号"></Input>              
            </td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">企业类型:</th>
            <td class="td">
              <Select v-model="dataList.companyType" class="search-input select-box" placeholder="请选择企业类型">
                <Option v-for="item in companyTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">企业性质:</th>
            <td class="td">
              <Select v-model="dataList.companyNature" class="search-input select-box" placeholder="请选择企业性质">
                <Option v-for="item in companyNatures" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">企业法定代表人:</th>
            <td class="td">
              <Input type="text" v-model="dataList.legalPerson" class="search-input" placeholder="请输入企业法定代表人"></Input>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">企业负责人:</th>
            <td class="td">
              <Input type="text" v-model="dataList.chargePerson" class="search-input" placeholder="请输入企业负责人"></Input>              
            </td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">注册资本:</th>
            <td class="td">
              <Input type="text" v-model="dataList.registeredCapital" class="search-input" placeholder="请输入企业负责人"></Input>                            
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">成立日期:</th>
            <td class="td">
              <DatePicker v-model="dataList.foundDate" format="yyyy年MM月dd日" type="date" placeholder="请选择成立日期" class="search-input"></DatePicker>
            </td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">经营期限:</th>
            <td class="td">
              <DatePicker v-model="businessTerm" split-panels type="daterange" format="yyyy" placeholder="请选择有效期" class="search-input"></DatePicker>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th height-auto">营业执照:</th>
            <td class="td height-auto">
              <span class="text-a" @click="preview(dataList.licenseFilePath)">预览</span>
              <span class="text-a" @click="download(dataList.licenseFilePath)">下载</span>
              <Upload
                class="text-a"
                style="display: inline-block"
                :before-upload = "handleUpload"
                :data = "form"
                :on-success = "uploadSuccess"
                :on-remove = "removeUrl"
                :max-size = 20480
                action="/crm/usercompare/upload">
                上传
              </Upload>
            </td>
          </Col>
        </Row>
      </table>
    </Col>
    <Col span="24" class="card-container">
      <Row type="flex" justify="space-between">
        <div style="font-size: 16px;color: #000">危化品许可证</div>
        <Button type="primary" class="btn" @click="add">添加危化品许可证</Button>
      </Row>
      <Table class="tableCommon mar-t-10"
        :data="tableData"
        :columns="columns"
        ref="dragTable"
        :stripe="true"
        :border="true">
      </Table>
      <div class="text-center mar-t-20 mar-b-20">  
        <!-- <Button type="primary" class="search-btn" @click="update">更新</Button> -->
        <Button class="search-btn" @click="back">返回</Button>
      </div>
    </Col>
    <Modal
      v-model="addModal"
      width="600"
      :title="title">
      <Row>
        <Col span="24">
          <Form ref="formItem" :model="formItem" :rules="ruleForm" :label-width="110">
            <Col span="24">
              <FormItem label="许可证代码:" prop="licenseNo">
                <Input v-model="formItem.licenseNo" class="search-input" placeholder="请输入许可证代码"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="经营范围:" prop="businessScope">
                <Input v-model="formItem.businessScope" class="search-input" placeholder="请输入经营范围"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="有效期:">
                <DatePicker v-model="year" split-panels type="daterange" format="yyyy" placeholder="请选择有效期" class="search-input"></DatePicker>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="附件:">
                <!-- <Button>上传附件</Button> -->
                <Upload
                  :before-upload = "handleUpload2"
                  :data = "form"
                  :on-success = "uploadSuccess2"
                  :on-remove = "removeUrl2"
                  :max-size = 20480
                  action="/crm/usercompare/upload">
                  <Button>上传附件</Button>
                </Upload>
              </FormItem>
            </Col>
          </Form>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="ok">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </Row>
</template>
<script>
import TabHeader from './tabHeader'
import {
  getMemberLicense,
  getBusinessLicense,
  saveBusinessLicense,
  deleteBusinessLicense,
  downloadUserCompare,
  uploadUserCompare,
  updateBusinessLicense,
  getBusinessLicenseInfo,
  updateMemberLicense,
  queryCompanyTypeSelectList,
  queryCompanyNatureSelectList,
  saveMemberLicense
} from '../../../components/axios/crm.js'
import {
  formatStamp,
  formatTime,
  formData,
  formatTime2
} from '../../../../assets/js/common.js'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      addModal: false,
      title: '',
      addOrEdit: '',
      id: '',
      checkOrEdit: window.localStorage.getItem('checkOrEdit'),
      isEdit: true,
      memberId: window.localStorage.getItem('lzMemberId') || '',
      companyTypes: [],
      companyNatures: [],
      dataList: {},
      businessTerm: [],
      year: [],
      fileroad: '',
      fileroad2: '',
      form: {
        attachment: '',
        attachment2: ''
      },
      formItem: {
        licenseNo: '',
        businessScope: ''
      },
      ruleForm: {
        licenseNo: [
          { required: true, message: '请输入许可证代码', trigger: 'blur' }
        ],
        businessScope: [
          { required: true, message: '请输入经营范围', trigger: 'blur' }
        ]
      },
      tableData: [],
      columns: [
        {
          key: 'licenseNo',
          title: '许可证代码',
          minWidth: 80
        },
        {
          key: 'businessScope',
          title: '经营范围',
          minWidth: 80
        },
        {
          key: 'expiryDate',
          title: '有效期',
          minWidth: 80,
          render: (h, data) => {
            return h('span', {}, `${formatTime(data.row.businessTermStart)} -- ${formatTime(data.row.businessTermEnd)}`)
          }
        },
        {
          title: '附件',
          minWidth: 80,
          render: (h, data) => {
          return h('div', [
            h('span', {
              style: {
                color: '#145edb',
                cursor: 'pointer',
                marginRight: '20px'
              },
              on: {
                click: () => {
                  this.preview(data.row.licenseFilePath)
                }
              }
            }, data.row.licenseFilePath ? '预览' : ''),
            h('span', {
              style: {
                color: '#145edb',
                cursor: 'pointer',
                marginRight: '20px'
              },
              on: {
                click: () => {
                  this.download(data.row.licenseFilePath)
                }
              }
            }, data.row.licenseFilePath ? '下载' : '')
          ])
        }
        },
        {
          title: '操作',
          minWidth: 80,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#145edb',
                  margiRight: '10px',
                  cursor: 'pointer',
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.edit(data.row.id)
                  }
                }
              }, '编辑'),
              h('span', {
                style: {
                  color: '#145edb',
                  margiRight: '10px',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.delete(data.row.id)
                  }
                }
              }, '删除'),
             
            ])
          }
        },
      ]
    }
  },
  components: {
    TabHeader
  },
  created() {
    this.memberId = window.localStorage.getItem('lzMemberId')
    this.getBusinessLicense()
    this.getMemberLicense()
    this.getCompanyTypes()
    this.getCompanyNatures()
  },
  methods: {
    changeEdit() {
      this.isEdit = false
    },
    // 获取企业类型
    getCompanyTypes() {
      queryCompanyTypeSelectList().then(res => {
        this.companyTypes = res.response
      })
    },
    // 获取企业性质
    getCompanyNatures() {
      queryCompanyNatureSelectList().then(res => {
        this.companyNatures = res.response
      })
    },
     //上传文件
    handleUpload (file){
      console.log('a', this.fileroad)
      if (this.fileroad) {
        this.$Message.warning("只能上传一个文件")
        return false
      } else {
        this.form.attachment = file
      }
    },
    // 上传成功后调用
    uploadSuccess (res){
      this.fileroad = res.response
    },
    // 点击上传成功后的文件地址
    getUrl (data){
      console.log(data)
    },
    //点击删除文件地址
    removeUrl (file, fileList){
      this.fileroad = ""
    },
     //上传文件
    handleUpload2 (file){
      console.log('a', this.fileroad2)
      if (this.fileroad2) {
        this.$Message.warning("只能上传一个文件")
        return false
      } else {
        this.form.attachment = file
      }
    },
    // 上传成功后调用
    uploadSuccess2 (res){
      this.fileroad2 = res.response
    },
    // 点击上传成功后的文件地址
    getUrl2 (data){
      console.log(data)
    },
    //点击删除文件地址
    removeUrl2 (file, fileList){
      this.fileroad2 = ""
    },
    // 获取营业执照信息
    getMemberLicense() {
      this.$Spin.show()
      getMemberLicense(this.memberId).then(res => {
        console.log('vo', res.response)
        this.dataList = res.response.memberLicenseVO || {}
        console.log('datalist', this.dataList)
        this.businessTerm = [formatTime(this.dataList.businessTermStart), formatTime(this.dataList.businessTermEnd)]
        this.dataList.foundDate = this.dataList.foundDate ? formatTime(this.dataList.foundDate) : ''
        this.$Spin.hide()
        // console.log('bb', this.businessTerm)
      })
    },
    // 获取许可证信息
    getBusinessLicense() {
      this.$Spin.show()
      getBusinessLicense(this.memberId).then(res => {
        console.log(res)
        this.tableData = res.response
        this.$Spin.hide()
      })
    },
     // id换desc
    formatTypeName(id) {
      let name = ''
      this.companyTypes.map(item => {
        if(item.value == id) {
          name = item.desc
          return
        }
      })
      return name
    },
    formatNatureName(id) {
      let name = ''
      this.companyNatures.map(item => {
        if(item.value === id) {
          name = item.desc
          return
        }
      })
      return name
    },
    // 返回
    back() {
      this.$router.push({
        name: 'allUser'
      })
    },
    
    // 更新
    update() {
      let params = {
        licenseNo: this.dataList.licenseNo || '',
        creditCode: this.dataList.creditCode,
        companyType: this.dataList.companyType,
        companyNature: this.dataList.companyNature,
        legalPerson: this.dataList.legalPerson,
        chargePerson: this.dataList.chargePerson,
        registeredCapital: this.dataList.registeredCapital,
        businessTermStart: formatStamp(this.businessTerm[0]) || '',
        businessTermEnd: formatStamp(this.businessTerm[1]) || '',
        foundDate: formatStamp(this.dataList.foundDate) || '',
        licenseFilePath: this.fileroad,
        memberId: this.memberId,
        id: this.dataList.id || ''
      }
      if(!this.dataList.id) {
        console.log('save')
        saveMemberLicense(params).then(res => {
          this.$Message.success('更新成功')
        })
      }else {
        console.log('update')
        updateMemberLicense(params).then(res => {
          this.$Message.success('更新成功')
          console.log('update', res)
        })
      }
    },
    edit(id) {
      this.id = id
      this.addOrEdit = 'edit'
      this.addModal = true
      this.title = '编辑危化品许可证'
      getBusinessLicenseInfo(id).then(res => {
        console.log('bbb', res)
        this.formItem.licenseNo = res.response.licenseNo
        this.formItem.businessScope = res.response.businessScope
        this.year = [this.formatYear(res.response.businessTermStart), this.formatYear(res.response.businessTermEnd)]
      })
    },
    add() {
      this.addOrEdit = 'add'
      this.title = '添加危化品许可证'
      this.addModal = true
    },
    // 删除
    delete(id) {
      this.$Modal.confirm({
        title: '删除操作',
        content: '是否确定删除?',
        onOk: () => {
          deleteBusinessLicense(id).then(res => {
            this.$Message.success('删除成功！')
          })
        },
        onCancel: () => {
          
        }
      });
      
    },
    ok() {
      this.$refs.formItem.validate((valid) => {
        if(valid) {
          this.addModal = false
          let businessTermStart = formatStamp(this.year[0])
          let businessTermEnd = formatStamp(this.year[1])
          let params = {
            memberId: this.memberId,
            businessTermStart,
            businessTermEnd,
            licenseFilePath: this.fileroad2
            // memberId: window.localStorage.getItem('lzMemberId')
          }
          Object.assign(params, this.formItem)
          if(this.addOrEdit === 'add') {
            saveBusinessLicense(params).then(res => {
              console.log(res)
              this.$Message.success(res.message)
              this.getBusinessLicense()
            })
          } else {
            params.id = this.id
            updateBusinessLicense(params).then(res => {
              console.log(res)
              this.$Message.success(res.message)
              this.getBusinessLicense()
            })
          }
        } else {
          this.addModal = true
          console.log(res)
        }
      })
    },
    // 预览
    preview(data) {
      window.location.href = "/crm/usercompare/download?attachment=" + data;
    },
    // 下载
    download(data) {
      window.location.href = "/crm/usercompare/download?attachment=" + data;
    },
    formatYear(time) {
      return (new Date(time)).getFullYear() + ''
    },
    cancel() {
      this.addModal = false
      this.$refs.formItem.resetFields()
    }
  }
}
</script>
