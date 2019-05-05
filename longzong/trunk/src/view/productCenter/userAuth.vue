<style lang="less" scoped>
@import 'productDetail.less';
.container {
  padding: 20px;
  background: #fff;
  box-shadow: 3px 4px 12px 0px
    rgba(0, 0, 0, 0.07);
}
.ivu-table th {
  background: #ebf2fe;
}
.flex-vcenter {
  align-items: center;
}
.userAuth-box {
  overflow: hidden;
}
.big-box {
  margin-top: 30px;
  border: 1px solid #bbb;
  padding: 0 50px;
}
.userAuth-item {
  float: left;
  width: 300px;
  height: 160px;
  overflow: auto;
  border: 1px solid #bbb;
  padding: 0 10px 10px 10px;
  background: #e9eaef;
  margin-right: 20px;
}
.over-auto{
  overflow: auto;
  padding: 10px 20px;
}
</style>
<template>
   <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;产品管理&nbsp;&nbsp;>>&nbsp;&nbsp;变更用户权限
      </Row>
    </Col>
    <Col span="24" class="container">
      <h2>《{{listData.productNameCn}}》产品详情</h2>
      <div class="table">
        <div class="height-60 font-s18 flex-center">产品基本信息</div>
        <div class="flex border-top height-60">
          <div class="flex-title">产品名称:</div>
          <div class="flex-val flex-1 text-center">{{listData.productNameCn}}</div>
          <div class="flex-title ">英文名称:</div>
          <div class="flex-val flex-1 text-center">{{listData.productNameEn}}</div>
        </div>
        <div class="flex border-top height-60">
          <div class="flex-title">简称:</div>
          <div class="flex-val flex-1 text-center">{{listData.shortNameCn}}</div>
          <div class="flex-title ">英文简称:</div>
          <div class="flex-val flex-1 text-center">{{listData.shortNameEn}}</div>
        </div>
        <div class="flex border-top height-60">
          <div class="flex-title">产品分类:</div>
          <div class="flex-val flex-1 text-center">{{listData.productCategoryName}}</div>
          <div class="flex-title ">企业类型:</div>
          <div class="flex-val flex-1 text-center">{{listData.enterpriseCategory}}</div>
        </div>
        <div class="flex border-top height-60">
          <div class="flex-title">源产品:</div>
          <div class="flex-val flex-1">
            <span class="mar-l-20" v-for="(item, index) in listData.sourceProduct" :key="index">{{item.sourceName}}</span>
          </div>
        </div>
        <div class="flex border-top height-60">
          <div class="flex-title">成本价:</div>
          <div class="flex-val flex-1 text-center mar-l--50">{{listData.basePrice}}</div>
        </div>
        <div class="flex border-top height-60">
          <div class="flex-title">是否续入:</div>
          <div class="flex-val flex-1 text-center">{{listData.isContinue == 0? "否" : "是"}}</div>
          <div class="flex-title">所属站点:</div>
          <div class="flex-val flex-1 text-center">{{listData.siteName}}</div>
        </div>
        <div class="flex height-80 border-top">
          <div class="flex-title">分类合同条款:</div>
          <div class="flex-1 font-s14 over-auto">
            <p v-for="(item, index) in listData.contractList" :key="index">
              <span>{{item.priority}}、{{item.contentCn}}</span>
            </p>
          </div>
        </div>
        <div class="flex height-80 border-top">
          <div class="flex-title">英文条款:</div>
          <div class="flex-1 font-s14 over-auto">
            <p class="word-wrap" v-for="(item, index) in listData.contractList" :key="index">
              <span>{{item.priority}}、{{item.contentEn}}</span>
            </p>
          </div>
        </div>
        <div class="flex height-80 border-top">
          <div class="flex-title">产品描述:</div>
          <div class="flex-1 font-s14 over-auto">{{listData.productDesc}}</div>
        </div>
        <div class="flex height-80 border-top">
          <div class="flex-title">英文描述:</div>
          <div class="flex-1 font-s14 over-auto">
            <div class="word-wrap">{{listData.productDescEn}}</div>
          </div>
        </div>
        <div class="height-60 font-s18 flex-center border-top">当前信息{{listData.productVersion}}版本</div>
        <div class="flex height-180 border-top">
          <div class="flex-title">频道:</div>
          <div class="flex-value flex-1 pad-l-20">
            <!-- <p class="mar-t-12" v-for="n in 4" :key="n"> -->
            <p class="mar-t-12" v-for="item in listData.channelList" :key="item.name">
              {{item}}
            </p>
          </div>
        </div>
        <div class="flex height-180 border-top">
          <div class="flex-title">栏目:</div>
          <div class="flex-value flex-1 pad-l-20">
            <!-- <p class="mar-t-12" v-for="n in 4" :key="n"> -->
            <p class="mar-t-12" v-for="item in listData.itemList" :key="item.name">
              {{item}}
            </p>
          </div>
        </div>
        <div class="flex height-180 border-top">
          <div class="flex-title">信息分类:</div>
          <div class="flex-value flex-1 pad-l-20">
            <!-- <p class="mar-t-12" v-for="n in 4" :key="n"> -->
            <p class="mar-t-12" v-for="item in listData.messageCategoryList" :key="item.name">
              {{item}}
            </p>
          </div>
        </div>
        <div class="flex height-180 border-top">
          <div class="flex-title">品种:</div>
          <div class="flex-value flex-1 pad-l-20">
            <p class="mar-t-12" v-for="item in listData.breedList" :key="item.breedId">
              {{item}}
            </p>
          </div>
        </div>
        <div class="flex height-180 border-top">
          <div class="flex-title">城市:</div>
          <div class="flex-value flex-1 pad-l-20">
            <p class="mar-t-12" v-for="item in listData.areaList" :key="item.name">
              {{item}}
            </p>
          </div>
        </div>
        <div class="flex height-180 border-top">
          <div class="flex-title">企业:</div>
          <div class="flex-value flex-1 pad-l-20">
            <p class="mar-t-12" v-for="item in listData.memberList" :key="item.name">
              {{item}}
            </p>
          </div>
        </div>
      </div>
      <div class="height-60 font-s18 flex-center border-top">历史版本</div>
      <Table class="tableCommon" :columns="columns" :data="tableData"></Table>
      <Modal
      class="big-box"
      width="1000"
      @on-cancel="cancel"
      v-model="authModal">
          <div slot="header" class="font-s18 flex-center">用户权限调整</div>
          <div class="flex flex-vcenter">
            <div class="font-s16">全部用户权限调整至：</div>
            <Select v-model="versionValMessage.productVersionId" style="position: relative;width: 260px;" @on-change = 'getproductVersionMes'>
              <Option v-for="item in versionList" :value="item.productVerId" :key="item.productVerId">{{ item.productVersion }}</Option>
            </Select>
          </div>
          <div class="mar-t-20 font-s14">{{versionValMessage.productVersion}}版本信息:</div>
          <div class="userAuth-box mar-t-20">
            <div class="userAuth-item">
              <div class="box-title font-s14">频道</div>
              <div>
                <p class="mar-t-12" v-for="(item,index) in versionValMessage.channelList" :key="index">
                  {{item}}
                </p>
              </div>
            </div>
            <div class="userAuth-item">
              <div class="box-title font-s14">栏目</div>
              <div>
                <p class="mar-t-12" v-for="(item,index) in versionValMessage.itemList" :key="index">
                  {{item}}
                </p>
              </div>
            </div>
            <div class="userAuth-item">
              <div class="box-title font-s14">信息分类</div>
              <div>
                <p class="mar-t-12" v-for="item in versionValMessage.messageCategoryList" :key="item.name">
                  {{item}}
                </p>
              </div>
            </div>
          </div>
          <div class="userAuth-box mar-t-20">
            <div class="userAuth-item">
              <div class="box-title font-s14">品种</div>
              <div>
                <p class="mar-t-12" v-for="item in versionValMessage.breedList" :key="item.breedId">
                  {{item}}
                </p>
              </div>
            </div>
            <div class="userAuth-item">
              <div class="box-title font-s14">城市</div>
              <div>
                <p class="mar-t-12" v-for="item in versionValMessage.areaList" :key="item.name">
                  {{item}}
                </p>
              </div>
            </div>
            <div class="userAuth-item">
              <div class="box-title font-s14">企业</div>
              <div>
                <p class="mar-t-12" v-for="item in versionValMessage.memberList" :key="item.name">
                  {{item}}
                </p>
              </div>
            </div>
          </div>
          <div slot="footer" class="btn-back mar-b-20">
            <Button class="search-btn" type="primary" @click="changeAuthority">确定</Button>
            <Button class="search-btn mar-l-20" @click="cancel">取消</Button>
          </div>
      </Modal>
    </Col>
  </Row>
</template>
<script>
import { postAuthorityChange, getAuthorityDetail, enableOrDis, deleteVersion, selectCompareProductVersion } from "../components/axios/productCenter.js";
import { formData } from '../../assets/js/common.js'
export default {
  data () {
    return {
      authModal: false,
      productId: this.$route.query.id,
      productVersionId: this.$route.query.vid,
      oldProductVersionId: '',
      listData: '',
      versionList: [],
      versionValMessage: [],
      columns: [
        {
          type: 'index',
          title: '序号'
        },
        {
          key: 'productVersion',
          title: '产品版本号'
        },
        {
          key: 'createTime',
          title: '创建时间'
        },
        {
          key: 'creator',
          title: '操作人'
        },
        {
          key: 'userNum',
          title: '用户数'
        },
        {
          key: 'basePrice',
          title: '成本价'
        },
        {
          key: 'state',
          title: '状态',
          render: (h, params) => {
          return params.row.statusDes === '禁用' ?
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
            }, '禁用')
            :
            h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
            }, '启用')
          }
        },
        {
          key: 'operation',
          title: '操作',
          render: (h, params) => {
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
                    this.editData(params)
                  }
                }
              }, '调整'),
              params.row.statusDes === '禁用' ? h('span', {
                style: {
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.enableOrDisabled(params,0)
                  }
                }
              }, '启用')
              :
              h('span', {
                style: {
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.enableOrDisabled(params,1)
                  }
                }
              }, '禁用'),
              params.row.statusDes === '禁用' ? h('span', {
                style: {
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.remove(params)
                  }
                }
              }, '删除') : ''
            ]);
          }
        }
      ],
      tableData: []
    }
  },
  created () {
    this.getDetail()
    this.getVersion()
  },
  methods: {
    // 调整
    editData (data) {
      this.authModal = true;
      console.log(data)
      for (let i = 0; i < this.tableData.length; i++) {
        if(data.row.productVersionId == this.tableData[i].productVersionId){
          this.oldProductVersionId = data.row.productVersionId
          this.versionValMessage = JSON.parse(JSON.stringify(this.tableData[i]))
        }
      };
    },
    // 获取版本调整下拉框数据
    getproductVersionMes (data){
      for (let i = 0; i < this.tableData.length; i++) {
        if(data == this.tableData[i].productVersionId){
          this.versionValMessage = JSON.parse(JSON.stringify(this.tableData[i]))
        }
      }
      console.log(1,data)
      console.log(2,this.tableData)
      console.log(3,this.versionValMessage)
    },
    // 确定版本调整
    changeAuthority (){
      let form = {
        productId: this.productId,
        productVersionId: this.oldProductVersionId,
        upProductVersionId: this.versionValMessage.productVersionId
      };
      console.log(form)
      postAuthorityChange(formData(form)).then(res => {
        this.$Message.success(res.message)
        this.authModal = false;
        this.getDetail()
      })
    },
    // 产品版本禁用、启用
    enableOrDisabled (data,status){
      let form = {
        productId: this.productId,
        productVersionId: data.row.productVersionId,
        status: status
      };
      enableOrDis(formData(form)).then(res => {
        this.$Message.success(res.message);
        this.getDetail();
      });
    },
    // 产品版本删除
    remove (data){
      let form = {
        productId: this.productId,
        productVersionId: data.row.productVersionId
      };
      deleteVersion(formData(form)).then(res => {
        this.$Message.success(res.message);
        this.getDetail();
      });
    },
    // 获取详情
    getDetail() {
      this.$Spin.show();
      let params = {
        productId: this.productId,
        productVersionId: this.productVersionId || 1
      };
      getAuthorityDetail(params).then(res => {
        this.listData = res.response;
        this.tableData = this.listData.hisVersionList;
        this.$Spin.hide();
      })
    },
    //获取版本
    getVersion () {
      let form = {
        proId: this.productId
      };
      selectCompareProductVersion(form).then(res => {
        this.versionList = res.response
      })
    },
    // 取消弹窗
    cancel (){
      this.authModal = false;
    }
  }
}
</script>
