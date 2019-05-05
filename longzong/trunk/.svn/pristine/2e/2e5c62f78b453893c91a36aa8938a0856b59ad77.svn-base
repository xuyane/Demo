<style lang="less" scoped>

</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;优惠策略
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form v-model='strategyForm' :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="优惠策略:">
              <Input v-model="strategyForm.strategyName" class="search-input" placeholder="请输优惠策略"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="客户类型:">
              <Select v-model="strategyForm.memberType"  class="search-input" placeholder="请选择客户类型">
                <Option v-for="item in memberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="生效状态:">
              <Select v-model="strategyForm.effectiveStatus" class="search-input" placeholder="请选择状态">
                <Option v-for="item in effectiveList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="状态:">
              <Select v-model="strategyForm.status" class="search-input" placeholder="请选择状态">
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="创建时间:">
              <DatePicker v-model="strategyForm.createTime" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择创建时间" class="search-input" @on-change="getOperatorTime"></DatePicker>
            </FormItem>
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
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="addStrategy">新增策略</Button>
          <Button type="primary" class="search-btn" @click="showOnModal(1)">上架</Button>
          <Button type="error" class="search-btn" @click="showOffModal(1)">下架</Button>
          <Button type="error" class="search-btn" @click="showDeleteModal">删除</Button>
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
    <Modal
      v-model="onModal"
      title="上架优惠政策"
      @on-ok="onStrategy"
      @on-cancel="cancel">
      <p>是否确定上架？</p>
    </Modal>
    <Modal
      v-model="offModal"
      title="下架原因"
      @on-ok="downStrategy"
      @on-cancel="cancel">
      <Input v-model="underReason" type="textarea"></Input>
      <div slot="footer">
        <Button class="search-btn" @click="cancel">取消</Button>
        <Button type="primary" class="search-btn" @click="downStrategy">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="deleteModal"
      title="删除优惠政策"
      @on-ok="deleteStrategy"
      @on-cancel="cancel">
      <p>是否确定删除？</p>
    </Modal>
  </Row>
</template>

<script>
import OilPage from "../../components/page/page.vue";
import { getStrategyList, onUpStrategy, offStrategy, deleteStrategyApi } from "../../components/axios/productCenter.js";
import { formData,formatStamp } from "../../../assets/js/common.js";

export default {
  name: 'myTable',
  components: {
    OilPage
  },
  data () {
    return {
      strategyForm: {
        createTime: '',
        effectiveStatus: -1,
        memberType: -1,
        status: -1,
        strategyName: ''
      },
      columns: [
        {
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        }, {
          key: 'id',
          title: '序号',
          align: 'center',
          minWidth: 50
        }, {
          key: 'strategyName',
          title: '优惠策略标题',
          align: 'center',
          minWidth: 130
        }, {
          key: 'memberType',
          align: 'center',
          title: '客户类型',
          minWidth: 90
        }, {
          key: 'effectiveTime',
          align: 'center',
          title: '有效时间',
          minWidth: 150
        }, {
          key: 'statusDesc',
          align: 'center',
          title: '状态',
          minWidth: 80,
          render: (h, data) => {
            return h('span', {
              style: {
                color: data.row.statusDesc == '上架' ? '#518815' : '#f52a1b',
              }
            }, data.row.statusDesc)
          }
        }, {
          key: 'effectiveStatus',
          align: 'center',
          title: '生效状态',
          minWidth: 90
        }, {
          key: 'createTime',
          align: 'center',
          title: '创建时间',
          minWidth: 150
        }, {
          key: 'creatorName',
          align: 'center',
          title: '创建人',
          minWidth: 120
        }, {
          title: '操作',
          align: 'center',
          minWidth: 200,
          render: (h, data) => {
            if(data.row.statusDesc == "上架"){
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
                      this.singleOffStrategy(0,data)
                    }
                  }
                }, '下架'),
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
                }, '查看')
              ])
            }else {
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
                      this.singleOnStrategy(0,data)
                    }
                  }
                }, '上架'),
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
                }, '查看')
              ])
            }
          }
        }
      ],
      startTime:'',
      endTime:'',
      tableData: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      onModal: false,
      offModal: false,
      deleteModal: false,
      selection: '',
      memberList: [
        {
          value: -1,
          label: '请选择'
        },
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '新入'
        },
        {
          value: 2,
          label: '续入'
        }
      ],
      statusList: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '上架'
        },
        {
          value: 1,
          label: '下架'
        }
      ],
      effectiveList: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '生效'
        },
        {
          value: 1,
          label: '失效'
        }
      ],
      underReason: '',
      onDownStatus:0,
      onDownId:0,
      selection: []
    }
  },
  created () {
    this.getListPage()
    // this.getCategoryList()
  },
  methods: {
    // 获取优惠政策列表
    getListPage () {
      this.$Spin.show();
      // console.log("时间1",this.strategyForm.createTime[0])
      // console.log("时间2",this.strategyForm.createTime[1])
      
      let form = {
        createTimeEnd:  formatStamp(this.endTime),
        createTimeStart: formatStamp(this.startTime),
        effectiveStatus: this.strategyForm.effectiveStatus,
        memberType: this.strategyForm.memberType,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.strategyForm.status,
        strategyName: this.strategyForm.strategyName,
      }
      getStrategyList(form).then(res => {
        this.tableData = res.response.list;
        this.total = res.response.total;
        this.$Spin.hide();
      })
    },
    // 清空
    clear () {
      this.strategyForm.createTime = ''
      this.startTime=''
      this.endTime=''
      this.strategyForm.effectiveStatus = ''
      this.strategyForm.memberType = ''
      this.strategyForm.status = ''
      this.strategyForm.strategyName = ''
    },
    //点击列表上架按钮
    singleOnStrategy (status,data){
      if(data.row.effectiveStatus == "生效") {
        this.onModal = true;
        this.onDownStatus = status;
        this.onDownId = data.row.id
      } else {
        this.$Message.warning('请修改有效期后，再点击上架')
      }
    },
    //点击列表下架按钮
    singleOffStrategy (status,data){
      this.offModal = true
      this.onDownStatus = status;
      this.onDownId = data.row.id
    },
    // 删除
    singleDeleteStrategy (data){
      let form = {
        ids: data.row.id
      }
      deleteStrategyApi(form).then(res => {
        this.$Message.success("删除成功");
      });
    },
    // 显示上架对话框
    showOnModal (status) {
      if(this.selection.length > 0) {
        let effectiveIsShow = false;
        for (let i = 0; i < this.selection.length; i++) {
          if(this.selection[i].effectiveStatus == "失效"){
            effectiveIsShow = false;
            break;
          }else {
            effectiveIsShow = true;
            this.onDownStatus = status;
          }
        };
        if(effectiveIsShow){
          this.onModal = true
        }else {
          this.$Message.warning('请修改有效期后，再点击上架')
        }
      } else {
        this.$Message.warning('请先勾选需要上架的优惠政策')
      }
    },
    // 显示下架对话框
    showOffModal (status) {
      if(this.selection.length > 0) {
        this.offModal = true;
        this.onDownStatus = status;
      } else {
        this.$Message.warning('请先勾选需要下架的优惠政策')
      }
    },
    // 显示删除对话框
    showDeleteModal () {
      if(this.selection.length > 0) {
        this.deleteModal = true;
      } else {
        this.$Message.warning('请先勾选需要删除的优惠政策')
      }
    },
    // 上架
    onStrategy () {
      const self = this
      let params = {}
      if(this.onDownStatus == 0){
        params = {
          id: this.onDownId,
          ids: [],
          operateType: this.onDownStatus,
          sign: ''
        }
      }else {
        let arr = [];
        for (let i = 0; i < this.selection.length; i++) {
          arr.push(this.selection[i].id);
        };
        params = {
          id: null,
          ids: arr,
          operateType: this.onDownStatus,
          sign: ''
        }
      }
      onUpStrategy(params).then(res => {
        this.$Message.success(res.message);
        this.selection = []
        this.getListPage()
      });
    },
    // 下架
    downStrategy (status) {
      const self = this
      let params = {}
      if(this.onDownStatus == 0){
        params = {
          id: this.onDownId,
          ids: [],
          operateType: this.onDownStatus,
          underReason: this.underReason,
          sign: ''
        }
      }else {
        let arr = [];
        for (let i = 0; i < this.selection.length; i++) {
          arr.push(this.selection[i].id);
        };
        params = {
          id: null,
          ids: arr,
          operateType: this.onDownStatus,
          underReason: this.underReason,
          sign: ''
        }
      }
      if(this.underReason && this.underReason != ''){
        offStrategy(params).then(res => {
          this.$Message.success(res.message);
          this.offModal = false
          this.selection = []
          this.getListPage();
          this.underReason = '';
        });
      }else {
        this.$Message.warning('请填入下架原因')
      }
    },
    // 删除
    deleteStrategy (){
      let arr = [];
      for (let i = 0; i < this.selection.length; i++) {
        arr.push(this.selection[i].id);
      };
      let form = {
        ids: arr
      }
      deleteStrategyApi(formData(form)).then(res => {
        this.$Message.success("删除成功");
        this.getListPage()
      })
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
    getOperatorTime (data) {//获取修改时间
      this.startTime=data[0] + " 00:00:00";
      this.endTime=data[1]+ " 23:59:59";            
    },
    // table勾选框触发事件
    selectChange (selection) {
      this.selection = selection
    },
    // 新增
    addStrategy () {
      this.$router.push({
        name: 'addStrategy'
      })
    },
    // 修改
    editData (data) {
      let id = data.row.id
      this.$router.push({
        name: 'editStrategy',
         query: {
          strategyId: id
        }
      })
    },
    // 查看详情
    showDetail (data) {
      let id = data.row.id
      this.$router.push({
        name: 'strategyDetail',
        query: {
          strategyId: id
        }
      })
    },
    cancel () {
      this.underReason = '';
      this.offModal = false
      this.deleteModal = false
      this.onModal = false
    },
  }
}
</script>
