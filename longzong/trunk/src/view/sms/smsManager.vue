<style lang="less" scoped>
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;短信套餐
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :model="form" :label-width="80">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="产品名称:">
          <Input v-model="form.smsProductName" class="search-input" placeholder="请输入产品名称"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="状态:">
          <Select v-model="form.type" filterable remote class="search-input" placeholder="请选择产品分类">
            <Option v-for="item in stautsList" :value="item.status" :key="item.status">{{ item.statusDes }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <Button type="primary" @click="search">查询</Button>
        <Button style="margin-left: 8px" @click="handleReset()">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <div class="btn-container">
        <Button type="primary" class="search-btn" @click="addSms">新增套餐</Button>
        <Button type="primary" class="search-btn" @click="upGoods()">上架</Button>
        <Modal v-model="upGoodsModal" title="产品上架" @on-ok="doUpGoods" @on-cancel="doCancel">
          <p>是否确定上架？</p>
        </Modal>
        <Button type="error" class="search-btn" @click="downGoods">下架</Button>
        <Modal v-model="downGoodsModal" title="产品下架原因" @on-cancel="doCancel">
          <Input v-model="downGoodsReason" type="textarea" :rows="4" />
          <div slot="footer">
            <Button class="search-btn" @click="doCancel">取消</Button>
            <Button type="primary" class="search-btn" @click="doDownGoods">确定</Button>
          </div>
        </Modal>
        <Button id="hrefToExportTable" type="primary" class="search-btn" @click="exportExcel">导出</Button>
      </div>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="handleRowChange">
      </Table>
      <div class="page-con">
        <span>第{{page.pageNum}}页 / 共{{Math.ceil(dataCount / page.pageSize)}}页 每页{{page.pageSize}}条 共{{dataCount}}条</span>
        <Page :total="dataCount" :page-size="page.pageSize" show-elevator class="pull-right" show-sizer :page-size-opts="pageSizeOpt"
          @on-change="getpages" @on-page-size-change="getPageSize"></Page>
      </div>
    </Row>
    </Col>
  </Row>
</template>

<script>
  import { proOnOrOff, productListPageOld, proStatusList } from '../components/axios/productCenter.js'
  import { formData } from "../../assets/js/common.js";
  export default {
    name: 'myTable',
    components: {
    },
    data() {
      return {
        upGoodsModal: false,
        downGoodsModal: false,
        upGoodsReason: '',
        downGoodsReason: '',
        ids: '',
        status: '',
        statusReason: '',
        selectRow: [],
        multipleSelection: [],
        dataCount: 0,
        page: {
          pageSize: 5,
          pageNum: 1
        },
        pageSizeOpt: [5, 10, 20, 50],
        form: {
          smsProductName: '',
          type: ''
        },
        stautsList: [],
        smsProductName: '',
        type: '',
        columns: [{
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        }, {
          key: 'id',
          align: 'center',
          title: '产品编号',
          width: 70,
        }, {
          key: 'productNameCN',
          align: 'center',
          title: '产品名称',
          minWidth: 130,
          render: (h, params) => {
            return h('div', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.$router.push({ path: '/smsDetail', query: { productId: params.row.id, productVersionId: params.row.productVersionId } })
                }
              }
            }, params.row.productNameCn);
          }
        }, {
          key: 'shortNameCn',
          align: 'center',
          title: '简称',
          minWidth: 130,
        }, {
          key: 'productPrice',
          align: 'center',
          title: '系统销售价',
          minWidth: 100,
        }, {
          key: 'specialDiscount',
          align: 'center',
          title: '优惠折扣',
          minWidth: 70,
          render: (h, data) => {
            return h('span', (data.row.specialDiscount * 100) + "%")
          }
        }, {
          key: 'afterDiscountPrice',
          align: 'center',
          title: '市场销售价',
          minWidth: 100,
        }, {
          key: 'statusDes',
          align: 'center',
          title: '状态',
          minWidth: 70,
        }, {
          key: 'createTimeDes',
          align: 'center',
          title: '创建时间',
          minWidth: 150,
        }, {
          key: 'age',
          align: 'center',
          title: '套餐内容',
          minWidth: 100,
          render: (h, params) => {
            return h('Tooltip', {
              props: {
                placement: 'bottom',
                transfer: true
              },
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              }
            }, [
                '查看',
                // h('span', {
                //   slot: 'content',
                //   style: {
                //     whiteSpace: 'normal',
                //     wordBreak: 'break-all'
                //   }
                // },params.row.sourceList ? params.row.sourceList.join(',') : '')
                 h('next-line', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal',
                    wordBreak: 'break-all'
                  },
                  props:{
                    mobileData:params.row.sourceList
                  }
                })
              ])
          }
        }, {
          title: '操作',
          align: 'center',
          width: 200,
          render: (h, data) => {
            return h('div', [
              h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#145edb',
                  marginRight: '8px',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/smsDetail', query: { productId: data.row.id, productVersionId: data.row.productVersionId } })
                  }
                }
              }, '详情'),
              h('span', {
                style: {
                  color: 'span',
                  color: '#145edb',
                  textDecoration: 'underline',
                  marginRight: '8px',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/updateSms/', query: { productId: data.row.id, productVersionId: data.row.productVersionId } })
                  }
                }
              }, '修改'),
              h('span', {
                style: {
                  color: 'span',
                  color: '#145edb',
                  textDecoration: 'underline',
                  marginRight: '8px',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.showLog(data)
                  }
                }
              }, '日志')
            ])
          }
        }],
        tableData: []
      }
    },
    created() {
      let that = this;
      that.page.productId = that.$route.params.id;
      this.getData()
    },
    methods: {
      addSms() {
        this.$router.push({
          name: 'addSms'
        })
      },
      // 短信套餐产品上架
      doUpGoods() {
        var that = this;
        var arr = this.goods;
        let multis = [];
        for (var i = 0; i < arr.length; i++) {
          multis.push(arr[i].id);
        }
        let dataForm = {
          ids: multis.join(","),
          status: 0,
          statusReason: that.upGoodsReason || ''
        }
        proOnOrOff(formData(dataForm)).then(res => {
          this.$Message.success('上架成功')
          that.selectRow = []
          that.getData(that.form);
        });
      },
      // 短信套餐产品下架
      doDownGoods() {
        var that = this;
        var arr = this.goods;
        let multis = [];
        for (var i = 0; i < arr.length; i++) {
          multis.push(arr[i].id);
        }
        if (that.downGoodsReason && that.downGoodsReason != '') {
          let dataForm = {
            ids: multis.join(","),
            status: 1,
            statusReason: that.downGoodsReason
          }
          proOnOrOff(formData(dataForm)).then(res => {
            this.$Message.success('下架成功')
            this.downGoodsModal = false
            that.getData(that.form);
            that.selectRow = []
            that.downGoodsReason = ''
          });
        } else {
          this.$Message.warning('请填入下架原因')
        }
      },
      doCancel() {
        that.downGoodsReason = ''
        this.downGoodsModal = false
        this.upGoodsModal = false
        // this.$Message.info('Clicked cancel');
      },
      handleRowChange(row) {
        this.selectRow = row
      },
      upGoods() {
        if (this.selectRow.length === 0) {
          this.$Message.warning('请勾选下架的商品');
        } else {
          this.upGoodsModal = true
          this.goods = this.selectRow

        }
      },
      downGoods() {
        if (this.selectRow.length === 0) {
          this.$Message.warning('请勾选上架的商品');
        } else {
          this.downGoodsModal = true
          this.goods = this.selectRow
        }
      },
      showLog(data) {
        this.$router.push({
          name: 'logDetails',
          query: {
            id: data.row.id
          }
        })
      },
      // 导出
      exportExcel() {
        window.location.href = '/product/product/exportShortMessage?type=2&operatorName=&operatorTime=&pageNum=' + this.page.pageNum + '&pageSize=' + this.page.pageSize + '&productNameCn=' + this.form.smsProductName + '&productCategoryCode=&breedId=&status=' + this.form.type
      },
      getData() {
        this.$Spin.show();
        let form = {
          type: 2,
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          productNameCn: this.form.smsProductName,
          status: this.form.type
        }
        productListPageOld(form).then(res => {
          this.tableData = res.response.list
          this.dataCount = res.response.total
          this.$Spin.hide();
        })
      },
      getpages(data) {
        this.page.pageNum = data;
        this.getData();
      },
      getPageSize(pageSize) {
        this.page.pageSize = pageSize;
        this.getData();
      },
      search() {
        this.getData()
      },
      // 查询产品状态列表
      init() {
        var that = this;
        proStatusList().then(res => {
          that.stautsList = res.response
        })
      },
      handleReset() {
        this.form.smsProductName = '';
        this.form.type = '';
      }
    },
    mounted() {
      this.init();
    }

  }
</script>