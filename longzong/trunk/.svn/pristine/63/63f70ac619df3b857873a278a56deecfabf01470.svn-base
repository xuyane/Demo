<style lang="less" scoped>
  .info-model-proVer{
    font-weight: 900;
    margin-bottom: 10px;
  }
</style>

<template>
  <Row>
    <Modal v-model="showModal"  title="请选择产品" width="1000" @on-cancel="cancelModal">
      <Col span="24" class-name="search-form">
        <Form :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="7">
              <FormItem label="产品名称:">
                <Input v-model="value1" class="search-input" placeholder="请输入产品名称"></Input>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="产品分类:">
                <Cascader v-model="productClassify" :data="typeList" class="search-input" @on-change="getproductClassify" placeholder="请选择产品分类"></Cascader>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="产品状态:">
                <Select v-model="value4" class="search-input" placeholder="请选择产品状态">
                  <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span="7">
              <FormItem label="信息分类:">
                <Input v-model="msgCategoryName" class="search-input" readonly @on-focus="getBreedData('信息分类')" placeholder="请选择业务归属品种"></Input>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="品种:">
                <Input v-model="value3" class="search-input" readonly @on-focus="getBreedData('品种')" placeholder="请选择业务归属品种"></Input>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="区域:">
                <Input v-model="areaName" class="search-input" readonly @on-focus="getBreedData('区域')" placeholder="请选择业务归属品种"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span="7">
            <FormItem label="所属站点:">
              <Select
                v-model="site"
                @on-change="getChannel"
                class="search-input"
                placeholder="请输入所属站点">
                <Option v-for="(option, index) in siteList" :value="option.siteId" :key="index">{{option.siteName}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="频道:">
              <Cascader change-on-select v-model="channel" :data="channelList" :load-data='channelLoad' class="search-input" @on-change="getColumn" @on-visible-change="channelOpen" placeholder="请输入频道"></Cascader>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="栏目:">
              <Select
                v-model="column"
                class="search-input"
                @on-open-change="columnOpen"
                placeholder="请输入栏目">
                <Option v-for="(option, index) in columnList" :value="option.columnId" :key="index">{{option.columnName}}</Option>
              </Select>
            </FormItem>
          </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span="7">
              <FormItem label="企业:">
                <Select
                  v-model="cropIds"
                  filterable
                  remote
                  @on-query-change="remoteMethod1"
                  :loading="loading"
                  @on-open-change="clearQuery"
                  ref = "cropName"
                  placeholder="请输入企业名称">
                  <Option v-for="(option, index) in companyList" :value="option.memberId" :key="index">{{option.memeberName}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="7">
              <Checkbox style="margin-left: 100px" v-model="queryFlag">关联历史版本</Checkbox>
            </Col>
            <Col span="7" class="text-right">
              <Button type="primary" @click="getListPage">查询</Button>
              <Button style="margin-left: 8px" @click="clear">重置</Button>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col span="24">
        <Row class-name="table-con">
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
      <div slot="footer">
        <Button type="primary" @click="orgBreed">保存</Button>
        <Button type="default" @click="cancelModal">取消</Button>
      </div>
    </Modal>
    <Modal v-model="infoModal">
      <p slot="header">
        <span>{{title}}</span>
      </p>
      <div v-for="item in infoData" :key="item">
        <p class="info-model-proVer">{{item.proVerStr}}:</p>
        <div v-if="item.data.length > 0">
          <p v-for="option in item.data" :key="option">{{option}}</p>
        </div>
        <p v-else>无</p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="close">关闭</Button>
      </div>
    </Modal>
    <Modal
      v-model="breedModel"
      :title="modalTitle"
      @on-cancel="cancel">
      <div style="max-height: 300px;overflow: auto;">
        <Tree v-if="modalTitle == '信息分类'" ref="infoRef" :data="infoDataTree" :load-data="loadInfoData" show-checkbox ></Tree>
        <Tree v-else-if="modalTitle == '品种'" ref="breedRef" :data="breedList" :load-data="loadBreedDataList" show-checkbox ></Tree>
        <Tree v-else :data="cityDataTree" ref="cityRef" :load-data="loadCityData" show-checkbox ></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="ok">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
import axios from 'axios'
import OilPage from "../../components/page/page.vue";
import { formData } from "../../../assets/js/common.js";
import { loadBreedData, breedMap ,arrQC } from '../../components/productCenter/productCenter.js'
import { proRelData, productListPage, proCategoryList, proOnOrOff, getProductTreeList, proExport, memberList, msgCategoryList, selectAreaList, breedTypeList, selectSiteList, selectChannelList, selectColumnList  } from "../../components/axios/productCenter.js";
export default {
  name: 'myTable',
  components: {
    OilPage
  },
  props: ["productModel","strategyIndex","productTreeType"],
  data () {
    return {
      showModal: false,
      productClassify: [],
      queryFlag: false,
      stratIndex: 0,
      productType: 0,
      areaName: '',
      msgCategoryName: '',
      areaIds: [],
      msgCategoryIds: [],
      cropIds: '',
      breedIds: [],
      modalTitle: '',
      infoDataTree: [],
      cityDataTree: [],
      companyList: [],
      breedModel: false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      infoModal: false,
      loading: false,
      title: '',
      site: '',
      channel: [],
      channelId: [],
      column: '',
      siteList: [],
      channelList: [],
      columnList: [],
      breedList: [],
      typeList: [],
      infoData: [],
      cityData: [],
      statusList: [
        {
          value: '0',
          label: '上架'
        },
        {
          value: '1',
          label: '下架'
        }
      ],
      value1: '', // 产品名称
      value2: '', // 产品分类
      value3: '', // 业务归属品种
      value4: '', // 产品状态
      columns: [
        {
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },
        {
          key: 'productNameCn',
          align: 'center',
          title: '产品名称',
          minWidth: 130
        },
        {
          key: 'shortNameCn',
          align: 'center',
          title: '简称',
          minWidth: 130,
        },
        {
          key: 'productCategoryName',
          align: 'center',
          title: '产品分类',
          minWidth: 130,
        },
        {
          key: 'productCategoryName',
          align: 'center',
          title: '产品分类',
          minWidth: 130
        },
        {
          key: 'siteName',
          align: 'center',
          title: '所属站点',
          minWidth: 130
        },
        {
          key: 'channel',
          align: 'center',
          title: '频道',
          minWidth: 100,
          render: (h, data) => {
            return h('div', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.showChannel(data)
                }
              }
            }, '查看')
          }
        },
        {
          key: 'column',
          align: 'center',
          title: '栏目',
          minWidth: 100,
          render: (h, data) => {
            return h('div', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.showColumn(data)
                }
              }
            }, '查看')
          }
        },
        {
          key: 'msgCatagoryList',
          align: 'center',
          title: '信息分类',
          minWidth: 130,
          render: (h, data) => {
            return h('div', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.showInfo(data)
                }
              }
            }, '查看')
          }
        },
        {
          key: 'breedsList',
          align: 'center',
          title: '品种',
          minWidth: 100,
          render: (h, data) => {
            return h('div', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.showType(data)
                }
              }
            }, '查看')
          }
        }, {
          key: 'cityList',
          align: 'center',
          title: '区域',
          minWidth: 100,
          render: (h, data) => {
            return h('div', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.showCity(data)
                }
              }
            }, '查看')
          }
        }, {
          key: 'cropList',
          align: 'center',
          title: '企业',
          minWidth: 100,
          render: (h, data) => {
            return h('div', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.showCrop(data)
                }
              }
            }, '查看')
          }
        },
        {
          key: 'afterDiscountPrice',
          align: 'center',
          title: '折后定价',
          minWidth: 100,
        },
        {
          key: 'statusDes',
          align: 'center',
          title: '状态',
          minWidth: 70,
        },
        {
          title: '操作',
          align: 'center',
          minWidth: 80,
          fixed: 'right',
          render: (h, data) => {
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
                    this.addProduct(data)
                  }
                }
              }, '添加')
            ])
          }
        }
      ],
      tableData: [],
      selection: []
    }
  },
  created () {
    this.getListPage()
    this.getCategoryList()
    this.getSite()
  },
  methods: {
    //获取所属站点
    getSite (){
      selectSiteList().then(res => {
        this.siteList = res.response
      })
    },
    //获取频道
    getChannel (){
      this.channel = []
      if(this.site){
        selectChannelList({
          siteId: this.site || '',
          channelId: ''
        }).then(res => {
          this.channelList = res.response.map(item => {
            if(item.isLeaf == 0){
              return {
                value: item.channelId,
                label: item.channelName,
                children: [],
                loading: false
              }
            } else {
              return {
                value: item.channelId,
                label: item.channelName
              }
            }
          })
        })
      }
    },
    //获取频道动态加载
    channelLoad (item,callback){
      this.channel = []
      this.column = ''
      item.loading = true;
      selectChannelList({
        siteId: this.site || '',
        channelId: item.value
      }).then(res => {
        let channelList = res.response.map(item => {
          if(item.isLeaf == 0){
            return {
              value: item.channelId,
              isLeaf: item.isLeaf,
              label: item.channelName,
              children: [],
              loading: false
            }
          }else {
            return {
              value: item.channelId,
              isLeaf: item.isLeaf,
              label: item.channelName
            }
          }
        })
        item.loading = false
        item.children = channelList
        callback()
      })
    },
    //获取栏目
    getColumn (data){
      let channelId = [];
      channelId.push(data[data.length-1])
      console.log(2222,data)
      this.channelId = channelId
      this.column = ''
      if(this.channelId.length > 0){
        selectColumnList({
          channelIdList: this.channelId.join(',')
        }).then(res => {
          this.columnList = res.response
        })
      }
    },
    //获取频道展开
    channelOpen (data){
      if(data){
        if(!this.site || this.site == ''){
          this.$Message.warning("请选择站点")
        }
      }
    },
    //获取栏目展开
    columnOpen (data){
      if(data){
        if(this.channelId.length == 0){
          this.$Message.warning("请选择频道")
        }
      }
    },
    //获取产品分类code
    getproductClassify (value, selectedData){
      this.productClassify = value
      this.value2 = value[value.length-1]
    },
    // 获取产品列表
    getListPage () {
      console.log(11111,this.channelId)
      this.$Spin.show();
      let cropIdsArr = [];
      let itemIds = [];
      if(this.cropIds && this.cropIds != ""){
        cropIdsArr.push(this.cropIds)
      }
      if(this.column && this.column != ""){
        itemIds.push(this.column)
      }
      let form = {
        type: 1,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        productNameCn: this.value1,
        queryFlag: this.queryFlag ? 1 : 0,
        productCategoryCode: this.value2,
        breedIds: this.breedIds,
        areaIds: this.areaIds,
        msgCategoryIds: this.msgCategoryIds,
        cropIds: cropIdsArr,
        status: this.value4,
        siteCode: this.site ? String(this.site) : '',
        channelIds: this.channelId,
        itemIds: itemIds
      }
      productListPage(form).then(res => {
        if(res.response.total > 0){
          this.tableData = res.response.list
        }else {
          this.tableData = []
        }
        this.total = res.response.total
        this.$Spin.hide();
      })
    },
    productDigui(data) {
      let dgData = data.map(item => {
        if (item.children.length > 0) {
          return {
            label: item.productCategoryName,
            value: item.productCategoryCode,
            children: this.productDigui(item.children)
          };
        } else {
          return {
            label: item.productCategoryName,
            value: item.productCategoryCode,
          };
        }
      });
      return dgData;
    },
    // 获取产品分类列表
    getCategoryList () {
      proCategoryList().then(res => {
        this.typeList = this.productDigui(res.response)
      })
    },
    // 清空
    clear () {
      this.value1 = ''
      this.value2 = ''
      this.value3 = ''
      this.value4 = ''
      this.areaName = ''
      this.msgCategoryName = ''
      this.cropIds = ''
      this.productClassify = []
      this.areaIds = []
      this.breedIds = []
      this.msgCategoryIds = []
      this.queryFlag = false
      this.site = '',
      this.channel = []
      this.channelId = []
      this.column = ''
      this.channelList = []
      this.columnList = []
    },
    // table勾选框触发事件
    selectChange (selection) {
      this.selection = selection
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
    // 远程搜索的方法
    remoteMethod1 (query) {
      const self = this
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let form = {
            memberName: query
          }
          memberList(form).then(res => {
            self.companyList = res.response
          })
        }, 50);
      } else {
        this.companyList = [];
        this.cropIds = '';
      }
    },
    close () {
      this.infoModal = false
    },
    // 查看业务归类品种
    showAttach (data) {
      console.log(data)
      this.title = '业务归类品种'
      this.infoModal = true
      this.infoData = data.row.breedShareList
    },
    // 查看频道
    showChannel (data) {
      this.title = '频道'
      this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_channel')
    },
    // 查看栏目
    showColumn (data) {
      this.title = '栏目'
      this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_item')
    },
    // 查看信息分类
    showInfo (data) {
      this.title = '信息分类'
      this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_msgCategory')
    },
    // 查看品种
    showType (data) {
      this.title = '品种'
      this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_breed')
    },
    // 查看城市
    showCity (data) {
      this.title = '城市'
      this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_area')
    },
    // 查看企业
    showCrop (data){
      this.title = '企业'
      this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_member')
    },
    // 获取产品关联数据
    getRelData (proId, proVerIdList, type) {
      this.$Spin.show()
      let form = {
        proId,
        proVerIdList,
        type
      }
      proRelData(form).then(res => {
        this.$Spin.hide()
        this.infoModal = true
        this.infoData = res.response
      })
    },
    loadBreedDataList (item, callback) {
      loadBreedData(item, callback, [])
    },
    // 品种树
    getBreedData (title) {
      this.modalTitle = title
      if(title == "信息分类"){
        if(this.site && this.site != ''){
          this.getInfoData();
          this.breedModel = true;
        }else {
          this.$Message.warning("请选择站点")
        }
      }else if(title == "品种"){
        this.breedModel = true;
        let form = {
          breedCode: ''
        }
        getProductTreeList(form).then(res => {
          this.breedList = breedMap(res.response)
        })
      }else {
        this.breedModel = true;
        this.getCityData()
      }
    },
    // 获取信息分类
    getInfoData () {
      this.$Spin.show();
      let form = {
        id: '',
        siteId: this.site || '',
      }
      msgCategoryList(form).then(res => {
        this.infoDataTree = res.response.map(item => {
          if(item.isLeaf === 1) {
            return {
              id: item.id,
              title: item.name,
              loading: false,
              children: [],
              route: item.path
            }
          } else {
            return {
              id: item.id,
              title: item.name,
              route: item.path
            }
          }
        })
        this.$Spin.hide();
      })
    },
    // 异步加载
    loadInfoData (item, callback) {
      // this.infoId = item.id
      let form = {
        id: item.id,
        siteId: this.site || ''
      }
      msgCategoryList(form).then(res => {
        let infoDataTree = res.response.map(item => {
          if(item.isLeaf === 1) {
            return {
              id: item.id,
              title: item.name,
              loading: false,
              children: [],
              route: item.path
            }
          } else {
            return {
              id: item.id,
              title: item.name,
              route: item.path
            }
          }
        })
        callback(infoDataTree)
      })
    },
    // 获取城市信息
    getCityData () {
      this.$Spin.show();
      let form = {
        id: ''
      }
      selectAreaList(form).then(res => {
        this.cityDataTree = res.response.map(item => {
          if(item.isLeaf === 1) {
            return {
              id: item.id,
              title: item.name,
              loading: false,
              children: [],
              route: item.path
            }
          }else {
            return {
              id: item.id,
              title: item.name,
              route: item.path
            }
          }
        })
        this.$Spin.hide();
      })
    },
    loadCityData (item, callback) {
      let form = {
        id: item.id
      }
      selectAreaList(form).then(res => {
        let cityDataTree = res.response.map(item => {
          if(item.isLeaf === 1) {
            return {
              id: item.id,
              title: item.name,
              loading: false,
              children: [],
              route: item.path
            }
          }else {
            return {
              id: item.id,
              title: item.name,
              route: item.path
            }
          }
        })
        callback(cityDataTree)
      })
    },
    // 品种树弹窗确定
    ok (){
      if(this.modalTitle == "信息分类"){
        let infoList = this.$refs.infoRef.getCheckedNodes();
        this.msgCategoryIds = infoList.map(item => {
          return item.id
        });
        let msgCategoryName = infoList.map(item => {
          return item.title
        });
        this.msgCategoryName = msgCategoryName.join(',')
      }else if(this.modalTitle == "品种"){
        let breedList = this.$refs.breedRef.getCheckedNodes();
        let breedArr = [];
        let breedIdArr = [];
        for (let i = 0; i < breedList.length; i++) {
          if(breedList[i].breedId){
            breedArr.push(breedList[i])
          }else {
            breedIdArr.push(breedList[i].nodeId)
          }
        }
        breedTypeList({
          breedTypeIdList: breedIdArr
        }).then(res => {
          let BreedNameList = res.response.map(item => {
            return {
              breedId: item.nodeId,
              breedName: item.nodeName,
            }
          })
          let concatArr = breedArr.concat(BreedNameList)
          let selectedBreed = arrQC(concatArr)
          this.breedIds = selectedBreed.map(item => {
            return item.breedId
          });
          let value3 = selectedBreed.map(item => {
            return item.breedName
          });
          this.value3 = value3.join(',')
        })
      }else {
        let cityList = this.$refs.cityRef.getCheckedNodes();
        this.areaIds = cityList.map(item => {
          return item.id
        });
        let areaName = cityList.map(item => {
          return item.title
        });
        this.areaName = areaName.join(',')
      }
      this.breedModel = false;
    },
    cancel (){
      this.breedModel = false;
    },
    //添加
    addProduct (data){
      let arr = []
      arr.push(data.row)
      this.$emit('sing-add', arr,this.stratIndex,this.productType);
      this.cancelModal()
    },
    cancelModal (){
      this.showModal = false;
      this.$emit('close-modal', this.showModal);
    },
    orgBreed (){
      console.log(this.selection)
      this.$emit('sing-add', this.selection,this.stratIndex,this.productType);
      this.cancelModal()
    },
    //企业下拉框收缩时清除搜索词
    clearQuery (data){
      if(!data){
        if(!this.cropIds || this.cropIds == ''){
          this.$refs.cropName.query = ''
        }
      }
    }
  },
  watch: {
    productModel (newVal, oldVal) {
      this.showModal = newVal
      this.getListPage()
    },
    strategyIndex (newVal, oldVal) {
      this.stratIndex = newVal
    },
    productTreeType (newVal, oldVal) {
      this.productType = newVal
    }
  }
}
</script>
