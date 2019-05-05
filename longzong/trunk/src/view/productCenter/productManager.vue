<style lang="less" scoped>
  .info-model-proVer {
    font-weight: 900;
    margin-bottom: 10px;
  }
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;产品管理
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :label-width="100">
      <Row type="flex" justify="space-between">
        <Col span="6">
        <FormItem label="产品名称:">
          <Input v-model="value1" class="search-input" placeholder="请输入产品名称"></Input>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="产品分类:">
          <Cascader v-model="productClassify" :data="typeList" class="search-input" @on-change="getproductClassify" placeholder="请选择产品分类"></Cascader>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="产品状态:">
          <Select v-model="value4" filterable remote clearable   placeholder="请选择产品状态">
              <!-- class="search-input" -->
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="信息分类:">
          <Input v-model="msgCategoryName" class="search-input" readonly @on-focus="getBreedData('信息分类')" placeholder="请选择信息分类"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="6">
        <FormItem label="品种:">
          <Input v-model="value3" class="search-input" readonly @on-focus="getBreedData('品种')" placeholder="请选择品种"></Input>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="区域:">
          <Input v-model="areaName" class="search-input" readonly @on-focus="getBreedData('区域')" placeholder="请选择区域"></Input>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="企业:">
          <Select v-model="cropIds" filterable clearable remote @on-query-change="remoteMethod1" :loading="loading" @on-open-change="clearQuery"
            ref="cropName" placeholder="请输入企业名称">
            <Option v-for="(option, index) in companyList" :value="option.memberId" :key="index">{{option.memeberName}}</Option>
          </Select>

        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="产品关联:">
          <Select v-model="relationBreedStatus" filterable remote clearable  ref="valueName"  placeholder="请选择产品关联">
              <!-- class="search-input" -->
            <Option v-for="item in statusListGuanlian" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="6">
        <FormItem label="所属站点:">
          <Select v-model="site" filterable remote clearable  ref="siteNames" @on-change="getChannel"  placeholder="请输入所属站点">
              <!-- class="search-input" -->
            <Option v-for="(option, index) in siteList" :value="option.siteId" :key="index">{{option.siteName}}</Option>
          </Select>

        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="频道:">
          <Cascader change-on-select v-model="channel" :data="channelList" :load-data='channelLoad' class="search-input" @on-change="getColumn"
            @on-visible-change="channelOpen" placeholder="请输入频道"></Cascader>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="栏目:">
          <Select v-model="column" filterable remote clearable ref="columnNames" @on-open-change="columnOpen" placeholder="请输入栏目">
              <!-- class="search-input" -->
            <Option v-for="(option, index) in columnList" :value="option.columnId" :key="index">{{option.columnName}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6" class="text-center">
        <Checkbox class="mar-t-10"  v-model="queryFlag" >关联历史版本</Checkbox>
        <Button type="primary" @click="searchListPage" >查询</Button>
        <Button style="margin-left: 8px;" @click="clear" >重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <div class="btn-container">
        <Button type="primary" class="search-btn" @click="addProduct">新增产品</Button>
        <Button type="primary" class="search-btn" @click="showOnModal">上架</Button>
        <Button type="error" class="search-btn" @click="showOffModal">下架</Button>
        <Button type="primary" class="search-btn" @click="exportExcel">导出</Button>

        <!-- <Button type="primary" class="search-btn" @click="exportExcel" :loading="loading2">导出</Button> -->
      </div>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange">
      </Table>

      <oil-page :total="total" :page-size="pageSize" :page-num="pageNum" @page-change="pageChange" :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer">
      </oil-page>
    </Row>
    </Col>
    <Modal v-model="onModal" title="上架产品" @on-ok="onProduct(0)" @on-cancel="cancel">
      <p>是否确定上架？</p>
    </Modal>
    <Modal v-model="offModal" title="下架原因" @on-cancel="cancel">
      <Input v-model="statusReason" type="textarea"></Input>
      <div slot="footer">
        <Button class="search-btn" @click="cancel">取消</Button>
        <Button type="primary" class="search-btn" @click="onProduct(1)">确定</Button>
      </div>
    </Modal>
    <Modal v-model="infoModal">
      <p slot="header">
        <span>{{title}}</span>
      </p>
      <div v-for="(item,index) in infoData" :key="index">
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
    <Modal v-model="breedModel" :title="modalTitle" @on-cancel="cancel">
      <div style="max-height: 300px;overflow: auto;">
        <Tree v-if="modalTitle == '信息分类'" ref="infoRef" :data="infoDataTree" :load-data="loadInfoData" show-checkbox></Tree>
        <Tree v-else-if="modalTitle == '品种'" ref="breedRef" :data="breedList" :load-data="loadBreedDataList" show-checkbox></Tree>
        <Tree v-else :data="cityDataTree" ref="cityRef" :load-data="loadCityData" show-checkbox></Tree>
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
  axios.defaults.withCredentials = true
  import OilPage from "../components/page/page.vue";
  import { formData } from "../../assets/js/common.js";
  import { loadBreedData, breedMap, arrQC } from '../components/productCenter/productCenter.js'
  import { proRelData, productListPage, proCategoryList, proOnOrOff, getProductTreeList, proExport, memberList, msgCategoryList, selectAreaList, breedTypeList, selectSiteList, selectChannelList, selectColumnList } from "../components/axios/productCenter.js";
  export default {
    name: 'myTable',
    components: {
      OilPage
    },
    data() {
      return {
        loading2: false,
        productClassify: [],
        queryFlag: false,
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
        selection: '',
        statusReason: '',
        infoModal: false,
        onModal: false,
        offModal: false,
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
        typeData: [],
        cityData: [],
        form: {
          name: '',
          age: '',
          address: ''
        },
        statusList: [
          {
            value: '-1',
            label: '全部'
          },
          {
            value: '0',
            label: '上架'
          },
          {
            value: '1',
            label: '下架'
          }
        ],
        statusListGuanlian:[
          {
            value: '-1',
            label: '全部'
          },
          {
            value: '1',
            label: '已关联'
          },
          {
            value: '0',
            label: '未关联'
          }
        ],
        value1: '', // 产品名称
        value2: '', // 产品分类
        value3: '', // 业务归属品种
        value4: '', // 产品状态
        relationBreedStatus:'',//产品关联
        columns: [
          {
            type: 'selection',
            title: '选择',
            align: 'center',
            width: 50
          },
          {
            key: 'id',
            title: '编号',
            align: 'center',
            width: 70
          },
          {
            key: 'productNameCn',
            align: 'center',
            title: '产品名称',
            minWidth: 130,
            render: (h, data) => {
              return h('div', {
                style: {
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                on: {
                  click: () => {
                    this.showDetail(data)
                  }
                }
              }, data.row.productNameCn)
            }
          },
          {
            key: 'shortNameCn',
            align: 'center',
            title: '简称',
            minWidth: 130
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
          },
          {
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
          },
          {
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
            key: 'productPrice',
            align: 'center',
            title: '系统销售价',
            minWidth: 100,
          },
          {
            key: 'specialDiscount',
            align: 'center',
            title: '优惠折扣',
            minWidth: 80,
            render: (h, data) => {
              return h('span', (data.row.specialDiscount * 100).toFixed(2) + "%")
            }
          },
          {
            key: 'afterDiscountPrice',
            align: 'center',
            title: '市场销售价',
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
            minWidth: 280,
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
                      this.showDetail(data)
                    }
                  }
                }, '详情'),
                h('span', {
                  style: {
                    marginRight: '8px',
                    color: '#145edb',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.editData(data)
                    }
                  }
                }, '修改'),
                h('span', {
                  style: {
                    marginRight: '8px',
                    color: '#145edb',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.details(data.row.id)
                    }
                  }
                }, '日志'),
                h('span', {
                  style: {
                    marginRight: '8px',
                    color: '#145edb',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.editUserAuth(data)
                    }
                  }
                }, '变更用户权限'),
                h('span', {
                  style: {
                    color: '#145edb',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.showVersion(data)
                    }
                  }
                }, '产品版本')
              ])
            }
          }
        ],
        tableData: [],
        selection: []
      }
    },
    created() {
      this.getListPage()
      this.getCategoryList()
      this.getSite()
    },
    methods: {
      //获取所属站点
      getSite() {
        selectSiteList({ v: Math.random() * 1000 }).then(res => {
          // let array ={
          //   siteId:'-1',
          //   siteName:'全部'
          // }
          // this.siteList.push(array);
          // this.siteList=this.siteList.concat(res.response);
          this.siteList=res.response;
        })
      },
      //获取频道
      getChannel() {
        this.channel = []
        this.column = ''
        if (this.site) {
          selectChannelList({
            siteId: this.site || '',
            channelId: ''
          }).then(res => {
            this.channelList = res.response.map(item => {
              if (item.isLeaf == 0) {
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
      channelLoad(item, callback) {
        this.channel = []
        item.loading = true;
        selectChannelList({
          siteId: this.site || '',
          channelId: item.value
        }).then(res => {
          let channelList = res.response.map(item => {
            if (item.isLeaf == 0) {
              return {
                value: item.channelId,
                isLeaf: item.isLeaf,
                label: item.channelName,
                children: [],
                loading: false
              }
            } else {
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
      getColumn(data) {
        let channelId = [];
        channelId.push(data[data.length - 1])
        this.channelId = channelId
        this.column = ''
        if (this.channelId.length > 0) {
          selectColumnList({
            channelIdList: this.channelId.join(',')
          }).then(res => {
            this.columnList = res.response
          })
        }
      },
      //获取频道展开
      channelOpen(data) {
        if (data) {
          if (!this.site || this.site == '') {
            this.$Message.warning("请选择站点")
          }
        }
      },
      //获取栏目展开
      columnOpen(data) {
        if (data) {
          if (this.channelId.length == 0) {
            this.$Message.warning("请选择频道")
          }
        }
      },
      //获取产品分类code
      getproductClassify(value, selectedData) {
        this.productClassify = value
        this.value2 = value[value.length - 1]
      },
      details(logId) {//查看日志详情
        this.$router.push({
          name: 'logDetails',
          query: {
            id: logId
          }
        })
      },
      // 获取产品列表
      getListPage() {
        this.$Spin.show();
        let cropIdsArr = [];
        let itemIds = [];
        if (this.cropIds && this.cropIds != "") {
          cropIdsArr.push(this.cropIds)
        }
        if (this.column && this.column != "") {
          itemIds.push(this.column)
        }
        let form = {
          type: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          queryFlag: this.queryFlag ? 1 : 0,
          productNameCn: this.value1,
          productCategoryCode: this.value2,
          breedIds: this.breedIds,
          areaIds: this.areaIds,
          msgCategoryIds: this.msgCategoryIds,
          cropIds: cropIdsArr,
          status: this.value4,
          siteCode: this.site ? String(this.site) : '',
          channelIds: this.channelId,
          itemIds: itemIds,
          relationBreedStatus:this.relationBreedStatus,
          v: Math.random() * 1000
        }
        productListPage(form).then(res => {
          if (res.response.total > 0) {
            this.tableData = res.response.list
          } else {
            this.tableData = []
          }
          this.total = res.response.total
          this.$Spin.hide();
        })
      },
      searchListPage() {
        this.pageNum = 1
        this.getListPage()
      },
      productDigui(data) {
        console.log('data',data);
        let array = {
          productCategoryCode:'-1',
          productCategoryName:'全部',
          children:[]
        }
        data.unshift(array);
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
      getCategoryList() {
        proCategoryList({ v: Math.random() * 1000 }).then(res => {
          this.typeList = this.productDigui(res.response)
        })
      },
      // 清空
      clear() {
        this.value1 = ''
        this.value2 = ''
        this.value3 = ''
        this.value4 = ''
        this.relationBreedStatus = ''
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
      handlePageSize() {
        // 1
      },
      handlePage() {
        // 2
      },
      // table勾选框触发事件
      selectChange(selection) {
        this.selection = selection
      },
      // 监听分页
      pageChange(page, pageSize) {
        if (page) {
          this.pageNum = page
        }
        if (pageSize) {
          this.pageSize = pageSize
        }
        this.getListPage()
      },
      // 远程搜索的方法
      remoteMethod1(query) {
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
      // 新增
      addProduct() {
        this.$router.push({
          name: 'addProduct'
        })
      },
      // 显示对话框
      showOnModal() {
        if (this.selection.length > 0) {
          this.onModal = true
        } else {
          this.$Message.warning('请先勾选需要上架的产品')
        }
      },
      // 显示上架对话框
      showOffModal() {
        if (this.selection.length > 0) {
          this.offModal = true
        } else {
          this.$Message.warning('请先勾选需要下架的产品')
        }
      },
      // 上下架
      onProduct(status) {
        const self = this
        let arr = []
        for (let i = 0; i < this.selection.length; i++) {
          arr.push(this.selection[i].id);
        }
        let params = {
          ids: arr.join().replace("'", ""),
          status: status,
          statusReason: this.statusReason || ''
        }
        if (status === 0) {
          proOnOrOff(formData(params)).then(function (res) {
            self.$Message.info('上架成功！')
            self.selection = []
            self.getListPage()
            self.statusReason = ''
          })
        } else {
          if (this.statusReason && this.statusReason != '') {
            proOnOrOff(formData(params)).then(function (res) {
              self.$Message.info('下架成功！')
              self.offModal = false
              self.selection = []
              self.getListPage()
              self.statusReason = ''
            })
          } else {
            self.$Message.warning('请填入下架原因')
          }
        }
      },
      cancel() {
        console.log('取消')
      },
      close() {
        this.infoModal = false
      },
      // 导出
      exportExcel() {
        // this.loading2=true;
        window.location.href = '/product/product/newexport?type=1&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize + '&productNameCn=' + this.value1 + '&productCategoryCode=' + this.value2 + '&breedIds=' + this.breedIds + '&status=' + this.value4 + '&queryFlag=' + (this.queryFlag ? 1 : 0) + '&msgCategoryIds=' + this.msgCategoryIds + '&cropIds=' + (this.cropIds || '') + '&areaIds=' + this.areaIds;
        // let forms={
        //   type:1,
        //   pageNum:this.pageNum,
        //   pageSize:this.pageSize,
        //   productNameCn:this.value1,
        //   productCategoryCode:this.value2,
        //   breedIds:this.breedIds,
        //   status:this.value4,
        //   queryFlag:this.queryFlag ? 1 : 0,
        //   msgCategoryIds:this.msgCategoryIds,
        //   cropIds:this.cropIds||'',
        //   areaIds:this.areaIds,
        // }
        // axios({
        //     url: "/product/product/newexport",
        //     method: "get",
        //     params: forms
        //   }).then(res => {
        //     if (res.data.status === "500" || res.data.status === "100042") {
        //       this.$Message.warning(res.data.message);
        //     } else if (res.data.status === "100043") {
        //       this.$Modal.warning({
        //         render: (h) => {
        //           return h('Alert', {
        //             props: {
        //               type: 'warning'
        //             },
        //             style: {
        //               'background-color': 'transparent',
        //               'border-color': 'transparent'
        //             }
        //           }, '当前数据超过一万条，请分批导出');
        //         }
        //       })
        //     } else {
        //       let form_data = formData(forms);
        //       window.location.href = '/product/product/newexport' + form_data;
        //     }
        //     this.loading = false;
        //   })
      },
      // 修改
      editData(data) {
        let id = data.row.id
        let vid = data.row.productVersionId
        this.$router.push({
          name: 'addProduct',
          query: {
            id,
            vid,
            sign: 1
          }
        })
      },
      // 查看详情
      showDetail(data) {
        let id = data.row.id
        let vid = data.row.productVersionId
        this.$router.push({
          name: 'productDetail',
          query: {
            id,
            vid
          }
        })
      },
      editUserAuth(data) {
        let id = data.row.id
        let vid = data.row.productVersionId
        this.$router.push({
          name: 'userAuth',
          query: {
            id,
            vid
          }
        })
      },
      showVersion(data) {
        let id = data.row.id
        let vid = data.row.productVersionId
        this.$router.push({
          name: 'productEdition',
          query: {
            id,
            vid
          }
        })
      },
      // 查看频道
      showChannel(data) {
        this.title = '频道'
        this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_channel')
      },
      // 查看栏目
      showColumn(data) {
        this.title = '栏目'
        this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_item')
      },
      // 查看信息分类
      showInfo(data) {
        this.title = '信息分类'
        this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_msgCategory')
      },
      // 查看品种
      showType(data) {
        this.title = '品种'
        this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_breed')
      },
      // 查看城市
      showCity(data) {
        this.title = '城市'
        this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_area')
      },
      // 查看企业
      showCrop(data) {
        this.title = '企业'
        this.getRelData(data.row.id, data.row.historyProductVerIDList, 'product_member')
      },
      // 获取产品关联数据
      getRelData(proId, proVerIdList, type) {
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
      loadBreedDataList(item, callback) {
        loadBreedData(item, callback, [])
      },
      // 品种树
      getBreedData(title) {
        this.modalTitle = title
        if (title == "信息分类") {
          if (this.site && this.site != '') {
            this.getInfoData();
            this.breedModel = true;
          } else {
            this.$Message.warning("请选择站点")
          }
        } else if (title == "品种") {
          this.breedModel = true;
          let form = {
            breedCode: ''
          }
          getProductTreeList(form).then(res => {
            this.breedList = breedMap(res.response)
          })
        } else {
          this.breedModel = true;
          this.getCityData()
        }
      },
      // 获取信息分类
      getInfoData() {
        this.$Spin.show();
        let form = {
          id: '',
          siteId: this.site || ''
        }
        msgCategoryList(form).then(res => {
          this.infoDataTree = res.response.map(item => {
            if (item.isLeaf === 1) {
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
      loadInfoData(item, callback) {
        // this.infoId = item.id
        let form = {
          id: item.id,
          siteId: this.site || ''
        }
        msgCategoryList(form).then(res => {
          let infoDataTree = res.response.map(item => {
            if (item.isLeaf === 1) {
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
      getCityData() {
        this.$Spin.show();
        let form = {
          id: ''
        }
        selectAreaList(form).then(res => {
          this.cityDataTree = res.response.map(item => {
            if (item.isLeaf === 1) {
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
      loadCityData(item, callback) {
        let form = {
          id: item.id
        }
        selectAreaList(form).then(res => {
          let cityDataTree = res.response.map(item => {
            if (item.isLeaf === 1) {
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
          callback(cityDataTree)
        })
      },
      // 品种树弹窗确定
      ok() {
        if (this.modalTitle == "信息分类") {
          let infoList = this.$refs.infoRef.getCheckedNodes();
          this.msgCategoryIds = infoList.map(item => {
            return item.id
          });
          let msgCategoryName = infoList.map(item => {
            return item.title
          });
          this.msgCategoryName = msgCategoryName.join(',')
        } else if (this.modalTitle == "品种") {
          let breedList = this.$refs.breedRef.getCheckedNodes();
          let breedArr = [];
          let breedIdArr = [];
          for (let i = 0; i < breedList.length; i++) {
            if (breedList[i].breedId) {
              breedArr.push(breedList[i])
            } else {
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
        } else {
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
      cancel() {
        this.statusReason = ''
        this.offModal = false
        this.onModal = false
        this.breedModel = false;
      },
      //企业下拉框收缩时清除搜索词
      clearQuery(data) {
        if (!data) {
          if (!this.cropIds || this.cropIds == '') {
            this.$refs.cropName.query = ''
          }
        }
      }
    },
    mounted() {
      // 1
    }
  }
</script>