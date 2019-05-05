<style lang="less" scoped>
.title {
  font-size: 18px;
  font-weight: 700;
}
.active {
  color: #2d8cf0;
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

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;公司合并
      </Row>
    </Col>
    <Col span="24" class-name="search-form" v-if="!detailShow">
      <Col>
        <span class="title">已选择公司: {{mainMember.memberNameCn}}</span>
        <span><Button class="search-btn-w" @click="back">返回</Button></span>
      </Col>
      <Table class="tableCommon mar-t-20"
        maxHeight="300"
        :data="tableData"
        :columns="type === 2 ? columns2 : columns1"
        ref="dragTable"
        :stripe="true"
        :border="true">
      </Table>
      <Col span="24" class="mar-t-40">
        <Col span="8" style="padding:0 20px">
          <div class="header-title text-center">已合并</div>
          <transition-group tag="ul" name="move">
            <li class="box-merge" v-for="(item, index) in operationCompany" :key="index">
              <div class="header-name text-center" :ref="'table' + index">{{item.memberNameCn}}</div>
              <div class="content-item">
                <div class="flex flex-bewteen">
                  <div :class="{ active: mergeInfo[index + 1].memberNameState}">公司全称: {{item.memberNameCn}}</div>
                </div>
                <div class="flex flex-bewteen">
                  <div :class="{ active: mergeInfo[index + 1].shortNameState}">公司简称: {{item.shortNameCn}}</div>
                </div>
                <div class="flex flex-bewteen">
                  <div :class="{ active: mergeInfo[index + 1].companyTypeState}">企业类型: {{formatTypeName(item.companyType)}}</div>
                </div>
                <div class="flex flex-bewteen">
                  <div :class="{ active: mergeInfo[index + 1].companyNatureState}">企业性质: {{formatNatureName(item.companyNature)}}</div>
                </div>
                <div class="flex flex-bewteen">
                  <div :class="{ active: mergeInfo[index + 1].areaNameState}">所在城市: {{item.areaName}}</div>
                </div>
                <div class="flex flex-bewteen">
                  <div :class="{ active: mergeInfo[index + 1].addressState}">街道地址: {{item.address}}</div>
                </div>
                <div class="flex flex-bewteen">
                  <div :class="{ active: mergeInfo[index + 1].areaCodeState}">邮政编码: {{item.postcode}}</div>
                </div>
                <div class="flex-text"></div>
              </div>
            </li>
          </transition-group>
        </Col>
        <Col span="8" style="padding:0 20px">
          <div class="header-title text-center">标准公司</div>
          <div class="box-merge">
            <div class="header-name text-center">{{mainMember.memberNameCn}}</div>
            <div class="content-item">
              <div class="flex flex-bewteen">
                <div :class="{ active: mergeInfo[0].memberNameState}">公司全称: {{mainMember.memberNameCn}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div :class="{ active: mergeInfo[0].shortNameState}">公司简称: {{mainMember.shortNameCn}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div :class="{ active: mergeInfo[0].companyTypeState}">企业类型: {{formatTypeName(mainMember.companyType)}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div :class="{ active: mergeInfo[0].companyNatureState}">企业性质: {{formatNatureName(mainMember.companyNature)}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div :class="{ active: mergeInfo[0].areaNameState}">所在城市: {{mainMember.areaName}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div :class="{ active: mergeInfo[0].addressState}">街道地址: {{mainMember.address}}</div>
              </div>
              <div class="flex flex-bewteen">
                <div :class="{ active: mergeInfo[0].areaCodeState}">邮政编码: {{mainMember.postcode}}</div>
              </div>
              <div class="flex-text"></div>
            </div>
          </div>
        </Col>
        <Col span="8" style="padding:0 20px">
          <div class="header-title text-center">合并结果</div>
          <div class="box-merge">
            <div class="header-name text-center">{{resultCompany.memberNameCn}}</div>
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
                <div>邮政编码: {{resultCompany.postcode}}</div>
              </div>
              <div class="flex-text"></div>
            </div>
          </div>
        </Col>
        <!-- <Col span="24" class="text-center mar-t-20">暂无合并记录</Col> -->
      </Col>
      <Col span="24" class="text-center mar-t-20 mar-b-20">
        <Button type="primary" class="search-btn" @click="back">返回</Button>
      </Col>
    </Col>
    <Col span="24" v-else class="search-form text-center">
      <div>暂无合并记录</div>
      <Button class="mar-t-20 mar-b-20" @click="back">返回</Button>
    </Col>
  </Row>
</template>
<script>
import {
  getMergeRecordDetail,
  getUserType,
  queryCompanyNatureSelectList,
  queryCompanyTypeSelectList
} from '../../../components/axios/crm.js'
import dial from '@/assets/js/linkDial.js';
export default {
  data() {
    return {
      detailShow: false,
      tableData: [],
      dataDetail: {},
      id: this.$route.query.id || '',
      type: this.$route.query.type || 0,
      allType: [],
      companyTypes: [],
      companyNatures: [],
      mainMember: {},
      resultCompany: {},
      operationCompany: {},
      mergeInfo: [],
      columns1: [
        {
          key: 'memberNameCn',
          title: '公司名称',
          minWidth: 180
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
            return h('span', this.formatType(data.row.userType))
          }
        },
        {
          key: 'adminName',
          title: '业务员',
          minWidth: 120,
          render: (h, data) => {
            return h('span', `${data.row.deptName} - ${data.row.adminName}`)
          }
        },
        {
          key: 'phone',
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
                      this.onDial(data.row.phone);
                    }
                  }
                },
                data.row.phone
              )
            ]);
          }
        }
      ],
      columns2: [
        {
          key: 'memberNameCn',
          title: '公司名称',
          minWidth: 180
        },
        {
          key: 'similarity',
          title: '匹配相似度',
          minWidth: 100
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
            return h('span', this.formatType(data.row.userType))
          }
        },
        {
          key: 'adminName',
          title: '业务员',
          minWidth: 120,
          render: (h, data) => {
            return h('span', `${data.row.deptName} - ${data.row.adminName}`)
          }
        },
        {
          key: 'phone',
          title: '业务员电话',
          minWidth: 120
        }
      ]
    }
  },
  methods: {
    back() {
      window.history.back()
    },
    getDetail() {
      getMergeRecordDetail(this.id).then(res => {
        if(res.response) {
          this.dataDetail = JSON.parse(res.response)
          this.tableData = this.dataDetail.mergedMembers
          this.mainMember = this.dataDetail.mainMember
          this.resultCompany = this.dataDetail.mergeResult
          this.operationCompany = this.dataDetail.mergedMembers
          this.mergeInfo = this.dataDetail.companyMergerInfoVOs
        } else {
          this.detailShow = true
        }
      })
    },
    // 获取用户类型
    getAllType() {
      getUserType().then(res => {
        this.allType = res.response
      })
    },
    // id换desc
    formatType(id) {
      let name = ''
      this.allType.map(item => {
        if(item.value === id) {
          name =  item.desc
        }
      })
      return name
    },
    // 获取企业性质
    getCompanyNatures() {
      queryCompanyNatureSelectList().then(res => {
        this.companyNatures = res.response
      })
    },
    // 获取企业类型
    getCompanyTypes() {
      queryCompanyTypeSelectList().then(res => {
        this.companyTypes = res.response
      })
    },
    // id换desc
    formatTypeName(id) {
      let name = ''
      this.companyTypes.map(item => {
        if(item.value === id) {
          name = item.desc
          return
        }
      })
      return name
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({title: '呼叫成功：' + phone})
      });
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
  },
  created() {
    this.getDetail()
    this.getAllType()
    this.getCompanyNatures()
    this.getCompanyTypes()
  }
}
</script>
