<style lang="less" scoped>
.title {
  font-size: 18px;
  font-weight: 700;
}
.header-title {
  height: 50px;
  line-height: 50px;
  background: #ebf2fe;
  font-size: 16px;
  color: #000;
  font-weight: 700;
}
.box-merge {
  position: relative;
  margin-top: 20px;
  border: 1px solid #bbb;
  .header-name {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: #000;
    background: #ececec;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .set-btn {
    float: right;
    width: 98px;
    height: 25px;
    text-align: center;
    // margin-top: 12px;
    line-height: 25px;
    background-color: #4280e8;
    border: solid 1px #4280e8;
    color: #fff;
  }
  .set-btn-w {
    float: right;
    width: 98px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    background-color: #ffffff;
    border: solid 1px #4280e8;
    color: #4280e8;
    cursor: pointer;
  }
  .flex-bewteen {
    justify-content: space-between;
    height: 50px;
    align-items: center;
    padding: 0 30px;
  }
  .flex-text {
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
  }
}


/* 开始过渡阶段,动画出去阶段 */
.move-enter-active,.move-leave-active {
  transition: all 0.5s ease-out;
}

.move-enter, .move-leave-active{
  transform: translateX(-400px);
  opacity: 0;
}

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;公司合并
      </Row>
    </Col>
    <Col span="24" class-name="card-container">
      <Col>
        <span class="title">已选择公司: {{mainCompany.memberNameCn}}</span>
        <span><Button class="search-btn-w" size='small' @click="back">取消合并</Button></span>
      </Col>
      <Form :model="formItem" :label-width="100" class="mar-t-20">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="用户类型:">
              <Select v-model="formItem.userType" class="form-select" placeholder="请选择用户类型">
                <Option v-for="item in userTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="部门:">
              <Input v-model="formItem.department" class="search-input" placeholder="请输入部门"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="业务员:">
              <Select
                ref="selectMethod1"
                v-model="formItem.adminName"
                class="search-input"
                filterable
                remote
                :remote-method="remoteMethod1"
                :loading="loading"
                placeholder="请输入业务员">
                <Option v-for="(option, index) in adminList" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
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
                remote
                :remote-method="remoteMethod2"
                :loading="loading"
                placeholder="请输入公司名称">
                <Option v-for="(option, index) in companyList" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <!-- <Col span="7">
            <FormItem label="开票公司抬头:">
              <Input v-model="formItem.title" class="search-input" placeholder="请输入开票公司抬头"></Input>
            </FormItem>
          </Col> -->
          <Col span="7">
            <FormItem label="用户名:">
              <Input v-model="formItem.userName" class="search-input" placeholder="请输入开票用户名"></Input>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary" @click="getListPage">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24" class-name="card-container">
      <Table class="tableCommon mar-t-20"
        maxHeight="300"
        :data="tableData"
        :columns="columns"
        ref="dragTable"
        :stripe="true"
        :border="true">
      </Table>
      
      <oil-page
        :total="total"
        :pageNum="pageNum"
        :page-size="pageSize"
        @page-change="pageChange"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer">
      </oil-page>




      <Col span="24" class="mar-t-40">
        <Col span="8" style="padding:0 20px">
          <div class="header-title text-center">等待合并</div>
          <transition-group tag="ul" name="move">
            <li class="box-merge" v-for="(item, index) in operationCompany" :key="index" v-if="index > 0">
              <div class="header-name text-center" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap" :ref="'table' + index">{{item.memberNameCn}}
                <!-- <a class="ivu-modal-close" style="top: -5px" @click="removeWaitCompany(index)"><i class="ivu-icon ivu-icon-ios-close"></i></a> -->
              </div>
              <div class="content-item">
                <div class="flex flex-bewteen">
                  <div>公司全称: {{item.memberNameCn}}</div>
                  <div>
                    <button v-show="!item.memberNameState" class="set-btn-w"
                      @click="setStandardOne(item.memberNameCn, 'memberNameState', index)">设为标准
                    </button>
                    <button v-show="item.memberNameState" class="set-btn">已设置</button>
                  </div>
                </div>
                <div class="flex flex-bewteen">
                  <div>公司简称: {{item.shortNameCn}}</div>
                  <div>
                    <button v-show="!item.shortNameState" class="set-btn-w"
                      @click="setStandardOne(item.shortNameCn, 'shortNameState', index)">设为标准</button>
                    <button v-show="item.shortNameState" class="set-btn">已设置</button>
                  </div>
                </div>
                <div class="flex flex-bewteen">
                  <div>企业类型: {{formatTypeName(item.companyType)}}</div>
                  <div>
                    <button v-show="!item.companyTypeState" class="set-btn-w"
                      @click="setStandardOne(item.companyType, 'companyTypeState', index)">设为标准</button>
                    <button v-show="item.companyTypeState" class="set-btn">已设置</button>
                  </div>
                </div>
                <div class="flex flex-bewteen">
                  <div>企业性质: {{formatNatureName(item.companyNature)}}</div>
                  <div>
                    <button v-show="!item.companyNatureState" class="set-btn-w"
                      @click="setStandardOne(item.companyNature, 'companyNatureState', index)">设为标准</button>
                    <button v-show="item.companyNatureState" class="set-btn">已设置</button>
                  </div>
                </div>
                <div class="flex flex-bewteen">
                  <div>所在城市: {{item.areaName}}</div>
                  <div>
                    <button class="set-btn-w" v-show="!item.areaNameState" 
                      @click="setStandardOne(item.areaName, 'areaNameState', index)">设为标准</button>
                    <button v-show="item.areaNameState" class="set-btn">已设置</button>
                  </div>
                </div>
                <div class="flex flex-bewteen">
                  <div>街道地址: {{item.address}}</div>
                  <div>
                    <button v-show="!item.addressState" class="set-btn-w" 
                      @click="setStandardOne(item.address, 'addressState', index)">设为标准</button>
                    <button v-show="item.addressState" class="set-btn">已设置</button>
                  </div>
                </div>
                <div class="flex flex-bewteen">
                  <div>邮政编码: {{item.areaCode}}</div>
                  <div>
                    <button v-show="!item.areaCodeState" class="set-btn-w"
                      @click="setStandardOne(item.areaCode, 'areaCodeState', index)">设为标准</button>
                    <button v-show="item.areaCodeState" class="set-btn">已设置</button>
                  </div>
                </div>
                <div class="flex-text"></div>
              </div>
            </li>
          </transition-group>
        </Col>





        <!-- <Col span="8" style="padding:0 20px">
          <div class="header-title text-center">标准公司</div>
          <div class="box-merge">
            <div class="header-name text-center">{{operationCompany[0].memberNameCn}}</div>
            <div class="content-item">
              <div class="flex flex-bewteen">
                <div>公司全称: {{operationCompany[0].memberNameCn}}</div>
                <div>
                  <button v-show="!operationCompany[0].memberNameState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].memberNameCn, 'memberNameState', 0)">设为标准
                  </button>
                  <button v-show="operationCompany[0].memberNameState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>公司简称: {{operationCompany[0].shortNameCn}}</div>
                <div>
                  <button v-show="!operationCompany[0].shortNameState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].shortNameCn, 'shortNameState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].shortNameState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>企业类型: {{formatTypeName(operationCompany[0].companyType)}}</div>
                <div>
                  <button v-show="!operationCompany[0].companyTypeState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].companyType, 'companyTypeState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].companyTypeState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>企业性质: {{formatNatureName(operationCompany[0].companyNature)}}</div>
                <div>
                  <button v-show="!operationCompany[0].companyNatureState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].companyNature, 'companyNatureState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].companyNatureState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>所在城市: {{operationCompany[0].areaName}}</div>
                <div>
                  <button class="set-btn-w" v-show="!operationCompany[0].areaNameState"
                    @click="setStandardOne(operationCompany[0].areaName, 'areaNameState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].areaNameState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>街道地址: {{operationCompany[0].address}}</div>
                <div>
                  <button v-show="!operationCompany[0].addressState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].address, 'addressState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].addressState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>邮政编码: {{operationCompany[0].areaCode}}</div>
                <div>
                  <button v-show="!operationCompany[0].areaCodeState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].areaCode, 'areaCodeState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].areaCodeState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex-text"></div>
            </div>
          </div>
        </Col> -->





        <Col span="8" style="padding:0 20px" v-if="operationCompany.length">
          <div class="header-title text-center">标准公司</div>
          <div class="box-merge">
            <div class="header-name text-center">{{operationCompany[0].memberNameCn}}</div>
            <div class="content-item">
              <div class="flex flex-bewteen">
                <div>公司全称: {{operationCompany[0].memberNameCn}}</div>
                <div>
                  <button v-show="!operationCompany[0].memberNameState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].memberNameCn, 'memberNameState', 0)">设为标准
                  </button>
                  <button v-show="operationCompany[0].memberNameState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>公司简称: {{operationCompany[0].shortNameCn}}</div>
                <div>
                  <button v-show="!operationCompany[0].shortNameState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].shortNameCn, 'shortNameState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].shortNameState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>企业类型: {{formatTypeName(operationCompany[0].companyType)}}</div>
                <div>
                  <button v-show="!operationCompany[0].companyTypeState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].companyType, 'companyTypeState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].companyTypeState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>企业性质: {{formatNatureName(operationCompany[0].companyNature)}}</div>
                <div>
                  <button v-show="!operationCompany[0].companyNatureState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].companyNature, 'companyNatureState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].companyNatureState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>所在城市: {{operationCompany[0].areaName}}</div>
                <div>
                  <button class="set-btn-w" v-show="!operationCompany[0].areaNameState"
                    @click="setStandardOne(operationCompany[0].areaName, 'areaNameState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].areaNameState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>街道地址: {{operationCompany[0].address}}</div>
                <div>
                  <button v-show="!operationCompany[0].addressState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].address, 'addressState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].addressState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex flex-bewteen">
                <div>邮政编码: {{operationCompany[0].areaCode}}</div>
                <div>
                  <button v-show="!operationCompany[0].areaCodeState" class="set-btn-w"
                    @click="setStandardOne(operationCompany[0].areaCode, 'areaCodeState', 0)">设为标准</button>
                  <button v-show="operationCompany[0].areaCodeState" class="set-btn">已设置</button>
                </div>
              </div>
              <div class="flex-text"></div>
            </div>
          </div>
        </Col>




        
        <Col span="8" style="padding:0 20px">
          <div class="header-title text-center">结果预览
            <Button type="primary" @click="resetDefault">恢复默认</button>
          </div>
          <div class="box-merge">
            <div class="header-name text-center" >{{resultCompany.memberNameCn}}</div>
            <div class="content-item">
              <div class="flex flex-bewteen">
                <div>公司全称: {{resultCompany.memberNameCn}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div>公司简称: {{resultCompany.shortNameCn}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div>企业类型: {{formatTypeName(resultCompany.companyType)}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div>企业性质: {{formatNatureName(resultCompany.companyNature)}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div>所在城市: {{resultCompany.areaName}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div>街道地址: {{resultCompany.address}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div>邮政编码: {{resultCompany.areaCode}}</div>
              </div>
              <div class="flex-text">
                <Button type="primary" style="height: 36px; margin-right: 20px" @click="confirm">确认修改</Button>
                <Button style="height: 36px; min-width: 80px" @click="back">取消</Button>
              </div>
            </div>
          </div>
        </Col>
      </Col>





      <Col span="24" class="text-center mar-t-20 mar-b-20">
        <Button type="primary" class="search-btn" @click="back">返回</Button>
      </Col>
    </Col>
  </Row>
</template>
<script>
import {
  getTransferList,
  getTransferType,
  memberSelectList,
  adminListName,
  queryCompanyTypeSelectList,
  queryCompanyNatureSelectList,
  getMergeSubmit,
  getAutoMergeDetail
} from "../../../components/axios/crm.js";
import OilPage from '../../../components/page/page.vue';
import { formData, formatType } from "../../../../assets/js/common.js";
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      tableData: [],
      loading: false,
      adminList: [],
      companyList: [],
      companyTypes: [],
      companyNatures: [],
      sourceId: this.$route.query.id,
      waitCompany: [],
      mainCompany: {},
      resultCompany: {},
      // operationCompany: [],
      operationCompany: [],
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
      formItem: {
        userType: '',
        adminName: '',
        department: '',
        userName: '',
        companyName: ''
      },
      columns: [
        {
          key: 'memberNameCn',
          title: '公司名称',
          minWidth: 360,
          render: (h, data) => {
            return h('div', [
              h('span', data.row.memberNameCn),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  float: 'right',
                  marginLeft: '8px',
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setStandard(data.row.id)
                  }
                }
              }, '设为标准'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  float: 'right',
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.joinMerge(data)
                  }
                }
              }, data.row.sign === 1 ? '取消合并' : '加入合并')
            ])
          }
        },
        {
          key: 'similarity',
          title: '匹配相似度',
          minWidth: 100,
          render: (h, data) => {
            return h('span', `${data.row.similarity * 100}%`)
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
            let a = "";
            switch (data.row.userType) {
              case 0:
                a = "免费用户";
                break;
              case 1:
                a = "试用用户";
                break;
              case 2:
                a = "正式用户";
                break;
            }
            return h("span", {}, a);
          }
        },
        {
          key: 'adminName',
          title: '业务员',
          minWidth: 120
        },
        {
          key: 'phone',
          title: '业务员电话',
          minWidth: 120
        }
      ]
    }
  },
  components: {
    OilPage
  },
  computed: {
    
  },
  created() {
    this.getListPage()
    this.getCompanyTypes()
    this.getCompanyNatures()
  },
  methods: {
    getListPage () {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        sourceId: this.sourceId,
        userType: formatType(this.formItem.userType),
        adminId: this.formItem.adminName || '',
        deptId: this.formItem.department || '',
        userName: this.formItem.userName || '',
        memberId: this.formItem.companyName || '',
        showTab: 1
      }
      this.$Spin.show()
      getAutoMergeDetail(formData(params)).then(res => {
        this.tableData = res.response.pageInfo.list
        this.total = res.response.pageInfo.total
        this.resultCompany = res.response.mainCompany
        let str = JSON.stringify(res.response.mainCompany)
        this.mainCompany = JSON.parse(str)


        const extra = {
          memberNameState: true,
          shortNameState: true,
          companyTypeState: true,
          companyNatureState: true,
          areaNameState: true,
          addressState: true,
          areaCodeState: true
        }
        this.operationCompany = [{
           ...JSON.parse(str),
           memberNameState: true,
           shortNameState: true,
           companyTypeState: true,
           companyNatureState: true,
           companyNatureState: true,
           areaNameState: true,
           addressState: true,
           areaCodeState: true
          }];


        // this.operationCompany = []
        // this.operationCompany.push(JSON.parse(str))
        // this.operationCompany.map(item => {
        //   item.memberNameState = true
        //   item.shortNameState = true
        //   item.companyTypeState = true
        //   item.companyNatureState = true
        //   item.areaNameState = true
        //   item.addressState = true
        //   item.areaCodeState = true
        // })
        this.waitCompany = []



        this.$Spin.hide()
      })
    },
    // 对某一项设置标准
    setStandardOne(value, str, index) {
      const self = this
      self.operationCompany.forEach(function(ele, i) {
        if(i === index) {
          ele[str] = !ele[str]
          switch(str) {
            case 'memberNameState':
              self.resultCompany.memberNameCn = value
              break;
            case 'shortNameState':
              self.resultCompany.shortNameCn = value
              break;
            case 'companyTypeState':
              self.resultCompany.companyType = value
              break;
            case 'companyNatureState':
              self.resultCompany.companyNature = value
              break;
            case 'areaNameState':
              self.resultCompany.areaName = value
              break;
            case 'addressState':
              self.resultCompany.address = value
              break;
            case 'areaCodeState':
              self.resultCompany.areaCode = value
              break;
          }
        } else {
          ele[str] = false
        }
      })
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
    // 确认修改
    confirm() {
      let params = {
        memberName: this.resultCompany.memberNameCn || '',
        shortName: this.resultCompany.shortNameCn || '',
        companyType: this.resultCompany.companyType,
        companyNature: this.resultCompany.companyNature,
        areaName: this.resultCompany.areaName || '',
        address: this.resultCompany.address || '',
        postcode: this.resultCompany.areaCode || '',
        memberId: this.mainCompany.id || '',
        mergeType:2
      }
      let targetIds = this.operationCompany.map((item, index) => {
        if(index > 0) {
          return item.id
        }
      })
      targetIds.shift()
      params.targetIds = targetIds
      params.companyMergerInfoVOs = this.operationCompany
      if(targetIds.length==0){
        this.$Message.warning('请先选择合并的公司')
        return
      }
      getMergeSubmit(params).then(res => {
        this.$Message.success('合并成功')
        this.$router.push({
          name: 'companyMerge'
        })
      })
    },
    // 重置
    reset() {
      this.formItem = {}
      this.$refs.selectMethod.query = ''
      this.$refs.selectMethod1.query = ''
    },
    // 加入合并/取消合并
    joinMerge(data) {
      let arr = []
      if(data.row.sign && data.row.sign === 1) {
        // this.waitCompany.map((item, index) => {
        //   if(item.id === data.row.id) {
        //     this.waitCompany.splice(index, 1)
        //   }
        // })
        this.operationCompany.map((item, index) => {
          if(item.id === data.row.id) {
            if(this.operationCompany[index].memberNameState) {
              this.operationCompany[index].memberNameState = false
              this.operationCompany[0].memberNameState = true
            }
            if(this.operationCompany[index].shortNameState) {
              this.operationCompany[index].shortNameState = false
              this.operationCompany[0].shortNameState = true
            }
            if(this.operationCompany[index].companyTypeState) {
              this.operationCompany[index].companyTypeState = false
              this.operationCompany[0].companyTypeState = true
            }
            if(this.operationCompany[index].companyNatureState) {
              this.operationCompany[index].companyNatureState = false
              this.operationCompany[0].companyNatureState = true
            }
            if(this.operationCompany[index].areaNameState) {
              this.operationCompany[index].areaNameState = false
              this.operationCompany[0].areaNameState = true
            }
            if(this.operationCompany[index].addressState) {
              this.operationCompany[index].addressState = false
              this.operationCompany[0].addressState = true
            }
            if(this.operationCompany[index].areaCodeState) {
              this.operationCompany[index].areaCodeState = false
              this.operationCompany[0].areaCodeState = true
            }
            this.operationCompany.splice(index, 1)
          }
        })
        this.tableData[data.index].sign = null
      } else {
        let o1 = {
          memberNameState: false,
          shortNameState: false,
          companyTypeState: false,
          companyNatureState: false,
          areaNameState: false,
          addressState: false,
          areaCodeState: false
        }
        let obj = Object.assign({}, data.row, o1)
        this.operationCompany.push(obj)
        this.tableData[data.index].sign = 1
      }
    },
    // 设为标准
    setStandard(id) {
      this.sourceId = id
      this.getListPage()
    },
    // 恢复默认
    resetDefault() {
      let str = JSON.stringify(this.operationCompany[0])
      this.resultCompany = JSON.parse(str)
      this.operationCompany.forEach(function(ele, index){
        if(index > 0) {
          ele.memberNameState = false,
          ele.shortNameState = false,
          ele.companyTypeState = false,
          ele.companyNatureState = false,
          ele.areaNameState = false,
          ele.addressState = false,
          ele.areaCodeState = false
        } else {
          ele.memberNameState = true,
          ele.shortNameState = true,
          ele.companyTypeState = true,
          ele.companyNatureState = true,
          ele.areaNameState = true,
          ele.addressState = true,
          ele.areaCodeState = true
        }
      })
    },
    // 取消合并
    back() {
      window.history.back()
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
        this.itemList = []
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
        this.itemList = []
      }
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.formItem.pageNum = page
      }
      if(pageSize) {
        this.formItem.pageSize = pageSize
      }
      this.getListPage();
    },
  },

}
</script>
