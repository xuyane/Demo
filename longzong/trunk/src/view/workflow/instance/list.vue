<!--<style lang="less" scoped src='./list.less'></style>-->
<style lang="less">
  .instance {
    //min-width: 1800px;
    overflow-x: auto;
    .bread-crumb{
      font-size: 14px;
      color: #000;
    }

    .f_card{
      margin: 20px 0;
    }

    .form_wrap {
      .form_item {
        width: 90%;
      }
    }

    .page {
      margin: 10px 0;
      text-align: right;
      padding-right: 18px;
    }
  }
</style>


<template>
  <div class="instance">
    <span class="bread-crumb">当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;流程实例</span>

    <Card dis-hover class="f_card">
      <span slot="title">流程实例</span>
      <div class="form_wrap">
        <Form :model="formValues" inline :label-width="80">
          <Row>
            <Col span="8">
            <FormItem label="流程KEY" class="form_item">
              <Input class='item_control' v-model="formValues.processDefKey"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="业务ID" class="form_item">
              <Input class='item_control' v-model="formValues.businessId"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="业务KEY" class="form_item">
              <Input class='item_control' v-model="formValues.businessKey"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="已结束" class="form_item">
              <Select v-model="formValues.finished">
                <Option :value="item.value" v-for="item in statusList" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="end" >
            <Col span="4">
            <FormItem>
              <ButtonGroup>
                <Button type="primary" @click="onSearch">查询</Button>
                <Button @click="onReset">重置</Button>
              </ButtonGroup>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </Card>


    <Card :bordered="false" dis-hover>
      <span slot="title">流程列表</span>
      <div class="table">
        <Button type="primary" style="margin-bottom: 15px;" :to="{name: 'addInstance'}">增加</Button>
        <Row span="24">
        <Table :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange">
          <div class="page" slot="footer">
            <Page
              :total="dataCount"
              :page-size="pageSize"
              show-sizer
              show-elevator
              :page-size-opts="pageSizeOpt"
              @on-change="changePageNum"
              @on-page-size-change="changePageSize"/>
          </div>
        </Table>
        </Row>
      </div>
    </Card>


    <!--流程图-->
    <Modal
      fullscreen
      footer-hide
      v-model="processImgModal"
      title="流程图">
      <div>
        <img :src="processImgPath">
      </div>
    </Modal>

  </div>
</template>

<script>
import axios from 'axios';
import {processImgHost} from '../../../assets/js/common';
import { statusZero } from '../../components/axios/workflow.js'
import {  formData } from "../../../assets/js/common.js";
import { setTimeout } from 'timers';
  export default {
    name: 'myTable',

    data () {
      return {
        // 流程图modal
        processImgModal: false,
        processImgPath: '',
        dataCount: 0,
        pageSize: 5,
        pageNum: 1,
        pageSizeOpt: [2, 5, 10, 20],
        selection: '',
        statusReason: '',
//        infoModal: false,
//        onModal: false,
//        offModal: false,
        loading: false,
        title: '',
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
            value: 'true',
            label: '是'
          },
          {
            value: 'false',
            label: '否'
          }
        ],
        formValues: {
          page: 1,
          pageSize: 10,
          processDefKey: '',
          businessId: '',
          businessKey: '',
          finished: ''
        },

        processDefKey: '', // 流程KEY
        businessId: '', // 业务ID
        businessKey: '', // 业务KEY
        finished: '', // 已结束
        columns: [
          {
            type: 'selection',
            title: '选择',
            align: 'center',
            maxwidth: 30
          }, {
            key: 'processKey',
            title: '流程KEY',
            align: 'center',
            minwidth: 300,
            render: (h, data) => {
              return h('div', [
                h('span', {
                  style: {
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$router.push({path: '/processDetailInfo', query: {id : data.row.processId}})
                    }
                  }
                }, data.row.processKey)
              ])
            }
          }, {
            key: 'processVersion',
            align: 'center',
            title: '版本',
            minwidth:100
          }, {
            key: 'processName',
            align: 'center',
            title: '流程名称',
            minwidth: 300
          }, {
            key: 'status',
            align: 'center',
            title: '状态',
            render: (h, data) => {
              return h('div', data.row.status == -1 ? '已结束' : (data.row.status == 1 ? '正常' : '挂起'))
            },
            width: 100
          }, {
            key: 'businessId',
            align: 'center',
            title: '业务ID',
            width: 100
          }, {
            key: 'businessKey',
            align: 'center',
            title: '业务KEY',
            width: 100
          }, {
            key: 'startTime',
            align: 'center',
            title: '开始时间'
          }, {
            key: 'endTime',
            align: 'center',
            title: '结束时间'
          }, {
            title: '操作',
            align: 'center',
            width: 150,
            render: (h, data) => {
              return h('div', [
                h('span', {
                  style: {
                    marginRight: '8px',
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$router.push({path: 'instanceDetail', query: {id : data.row.id}})
                    }
                  }
                }, '详情'),
                h('span', {
                  style: {
                    marginRight: '8px',
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.processImg(data.row.id);
                    }
                  }
                }, '流程图')
              ])
            }
          }
        ],
        tableData: [],
        selection: []
      }


    },
    created () {
      this.$Spin.show();
      this.getListPage();
    },
    methods: {
      // 获取产品列表
      getListPage(){
        let datas = this.formValues; 
        axios.get("/mysteel/workflow/instance/list", {
          params: this.formValues
        })
        .then(res => {
          statusZero(res.data.status)
          this.tableData = res.data.data.list;
          this.dataCount = res.data.data.total;
          this.$Spin.hide();
        })
      },

      onSearch(){
        this.formValues.page = 1;
        this.formValues.pageSize = 10;
        this.$Spin.show();
        this.getListPage();
      },

      onReset(){
        this.formValues.processDefKey = this.formValues.businessKey = this.formValues.businessId = this.formValues.finished = '';
      },

      // table勾选框触发事件
      selectChange (selection) {
        this.selection = selection
      },
      // 监听跳转分页
      changePageNum (current) {
        this.$Spin.show();
        this.formValues.page = current;
        this.getListPage();
      },
      // 监听修改显示条数
      changePageSize (size) {
        this.$Spin.show();
        this.formValues.pageSize = size;
        this.getListPage();
      },
      // 远程搜索的方法
     /* remoteMethod (query) {
        const self = this
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            axios.get('apis/product/product/breedList',{
              params: {
                breedName: query
              }
            }).then(res => {
              if(res.data.message == "OK") {
                self.breedList = res.data.response
                // self.breedList = self.breedList.filter(item => item.breedName.toLowerCase().indexOf(query.toLowerCase()) > -1);
                console.log(self.breedList)
              }
            }).catch(err => {
              console.log(err)
            })
          }, 50);
        } else {
          this.breedList = [];
        }
      },*/
      // 新增
    /*  addProduct () {
        this.$router.push({
          name: 'addInstance'
        })
      },*/
      // 显示对话框
    /*  showOnModal () {
        if(this.selection.length > 0) {
          this.onModal = true
        } else {
          this.$Message.warning('请先勾选需要上架的产品')
        }
      },*/
      // 显示上架对话框
    /*  showOffModal () {
        if(this.selection.length > 0) {
          this.offModal = true
        } else {
          this.$Message.warning('请先勾选需要下架的产品')
        }
      },*/
      // 上下架
   /*   onProduct (status) {
        const self = this
        let arr = []
        for (let i = 0; i < this.selection.length; i++) {
          arr.push(this.selection[i].id);
        }
        let params = {
          ids: arr.join().replace("'",""),
          status: status,
          statusReason: this.statusReason || ''
        }
        axios({
          method: 'post',
          url: '/apis/product/product/onOrOff',
          params
        }).then(function(res) {
          console.log(res)
          if(res.data.message == 'OK'){
            if(status === 0) {
              self.$Message.info('上架成功！')
            } else {
              self.$Message.info('下架成功！')
            }
            self.getListPage()
          }else{
            self.$Message.warning(res.data.status);
          }
          self.statusReason = ''
        })
      },*/
     /* cancel () {
        console.log('取消')
      },
    /!*  close () {
        this.infoModal = false
      },*!/
      // 导出
      exportExcel () {
        console.log('导出')
        this.$refs.dragTable.exportCsv({
          filename: '表格'
        })
      },
      // 修改
      editData (data) {
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
      showDetail (data) {
        let id = data.row.processId
        this.$router.push({
          name: 'instanceDetail',
          query: {
            id
          }
        })
      },
      showAttach (data) {
        console.log(data)
      },
      editUserAuth (data) {
        let id = data.row.id
        let vid = data.row.productVersionId
        this.$router.push({
          name: 'userAuth',
          query: {
            id,
            vid
          }
        })
      },*/
      /*showVersion (data) {
        let id = data.row.id
        let vid = data.row.productVersionId
        this.$router.push({
          name: 'productEdition',
          query: {
            id,
            vid
          }
        })
      },*/
      // 查看信息分类
    /*  showInfo (data) {
        this.title = '信息分类'
        this.getRelData(data.row.id, data.row.productVersionId, 'product_msgCategory')
      },
      // 查看品种
      showType (data) {
        this.title = '品种'
        this.getRelData(data.row.id, data.row.productVersionId, 'product_breed')
      },
      // 查看城市
      showCity (data) {
        this.title = '城市'
        this.getRelData(data.row.id, data.row.productVersionId, 'product_area')
      },
      // 查看日志
      showLog (data) {
        this.$router.push({
          name: 'logDetails'
        })
      },
      // 获取产品关联数据
      getRelData (proId, proVerId, type) {
        this.$Spin.show()
        axios.post('apis/product/product/proRelData', {
          proId,
          proVerId,
          type
        }).then(res => {
          this.$Spin.hide()
          if(res.data.message === 'OK') {
            this.infoModal = true
            this.infoData = res.data.response
          }
        })
      },*/

      // 流程图
      processImg(id){
        // http://192.168.212.156:9000/mysteel/workflow/instance/image.htm?id=450963
        window.open(processImgHost + '/mysteel/workflow/instance/image.htm?id='+id);
      }
    }
  }
</script>
