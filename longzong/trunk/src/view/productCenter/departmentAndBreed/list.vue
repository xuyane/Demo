<style>
.leftree  .ivu-card-head{
    background: #427fe9;
   
}
.leftree  .ivu-card-head p,.leftree  .ivu-card-head-inner{
    color:#fff;
    text-align: center;
}
.department-breed-add-modal .search-form{
  padding: 30px 30px 0 20px;
  margin-bottom: 0;
}
.department-breed-add-modal .table-con{
  padding: 0 20px 20px;
}
</style>

<template >
  <Row>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;部门关联品种
      </Row>
    </i-col>
    <Col span='24'>
      <Row :gutter="20">
        <Col span='4'>
          <div class='leftree'>
            <Card :bordered="false">
              <p slot="title">组织架构</p>
              <div>
                <Tree @on-select-change="treeSelectData" :data="depTree"></Tree>
              </div>
            </Card>
          </div>
        </Col>
        <Col span='20'>
          <Row>
            <Col span="24" class-name="search-form">
              <Form v-model='depForm' :label-width="100">
                <Row type="flex" justify="space-between">
                  <Col span="7">
                    <FormItem label="品种:">
                      <Select
                        v-model="breedId"
                        filterable
                        remote
                        label-in-value
                        @on-query-change="remoteMethod1"
                        :loading="loading"
                        @on-open-change="clearQuery"
                        @on-change="breedChange"
                        ref = "cropName"
                        placeholder="请输入品种">
                        <Option v-for="(option, index) in breedList" :value="option.id" :key="index">{{option.text}}</Option>
                      </Select>
                      <!-- <Input v-model="depForm.breed" class="search-input" placeholder="请输入品种"></Input> -->
                    </FormItem>
                  </Col>
                  <Col span="7">
                    <FormItem label="部门:">
                      <Input v-model="depForm.department" readonly class="search-input" @on-focus="getDepartData" placeholder="请输入部门"></Input>
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
                  <Button type="primary" class="search-btn" @click="addRelation">新增关联</Button>
                  <span style="margin-left: 20px;">选中部门节点: {{checkedDepName}}</span>
                </div>
                <Table class="tableCommon"
                  :data="tableData"
                  :columns="columns"
                  ref="dragTable"
                  :stripe="true"
                  :border="true">
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
          </Row>
        </Col>
      </Row>
    </Col>
    <Modal
    v-model="addModal"
    width = 1000
    class="department-breed-add-modal"
    title="新增关联">
      <Col span="24" class-name="search-form">
        <Form v-model='addForm' :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="10">
              <FormItem label="品种名称:">
                <Select
                  v-model="addBreedId"
                  filterable
                  remote
                  label-in-value
                  @on-query-change="remoteMethod1"
                  :loading="loading"
                  @on-open-change="addClearQuery"
                  @on-change="addBreedChange"
                  ref = "addCropName"
                  placeholder="请输入品种">
                  <Option v-for="(option, index) in breedList" :value="option.id" :key="index">{{option.text}}</Option>
                </Select>
                <!-- <Input v-model="addForm.breedName" class="search-input" placeholder="请输入品种名称"></Input> -->
              </FormItem>
            </Col>
            <Col span="11" class="text-right">
              <Button type="primary" @click="getBreedPage">查询</Button>
              <Button style="margin-left: 8px" @click="addClear">重置</Button>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col span="24">
        <Row class-name="table-con">
          <Table class="tableCommon"
            :data="addTableData"
            :columns="addColumns"
            @on-selection-change="selectChange"
            :stripe="true"
            :border="true">
          </Table>
          <oil-page
            :total="addTotal"
            :page-size="addForm.pageSize"
            @page-change="addFormPageChange"
            :page-size-opts="pageSizeOpts"
            :show-sizer="showSizer">
          </oil-page>
        </Row>
      </Col>
      <div slot="footer">
        <Button type="primary" @click="orgBreed">保存</Button>
        <Button type="default" @click="cancelM">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="DepartModel"
      title="请选择部门"
      @on-cancel="cancel">
      <div style="max-height: 300px;overflow: auto;">
        <Tree ref="tree" :data="depTree" show-checkbox @on-check-change="getDepartId" ></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="ok">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </Row>
</template>
<script>
// import testData from './test';
import OilPage from "../../components/page/page.vue";
import { formData } from "../../../assets/js/common.js";
import { deptTree, orgbreedList, getBreed, addOrgBreed, deleteOrgBreed, selectBreed } from "../../components/axios/productCenter.js";
export default {
  name: 'myTable',
  components: {
    OilPage
  },
  data() {
    return {
      depTree:[],
      breedList:[],
      addModal: false,
      DepartModel: false,
      loading: false,
      checkedDepName: '',
      breedId: '',
      addBreedId: '',
      addForm: {
        breedName: '',
        pageNum: 1,
        pageSize: 10,
        sign: ''
      },
      depForm: {
        department: '',
        breed: ''
      },
      orgIds: [],
      checkDepList: [],
      addDepId: '',
      tableData: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      columns: [
        {
          key: 'breedId',
          title: '品种ID',
          align: 'center',
          minWidth: 50
        }, {
          key: 'breedName',
          align: 'center',
          title: '品种名称',
          minWidth: 90
        }, {
          key: 'orgName',
          align: 'center',
          title: '关联编辑部门',
          minWidth: 150
        }, {
          key: 'statusDesc',
          align: 'center',
          title: '品种状态',
          minWidth: 120
        }, {
          title: '操作',
          align: 'center',
          minWidth: 100,
          render: (h, data) => {
            if (data.row.orgName == '-'){
              return h('div', "-")
            }else {
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
                    this.cancelOrgBreed(data)
                  }
                }
              }, "取消关联")
            }
          }
        }
      ],
      addTotal: 0,
      addTableData: [],
      addColumns: [
        {
          type: 'selection',
          title: '选择',
          align: 'center',
          width: 50
        },
        {
          key: 'breedName',
          title: '品种名称',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'shortName',
          title: '缩写',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'keyword',
          title: '别名',
          align: 'center',
          minWidth: 100
        },
      ],
      breedIds: []
    };
  },
  created (){
    this.getDeptTree();
    this.getListPage();
  },
  methods: {
    // 品种远程搜索的方法
    remoteMethod1 (query) {
      const self = this
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let form = {
            name: query
          }
          selectBreed(formData(form)).then(res => {
            self.breedList = JSON.parse(res.response)
          })
        }, 50);
      } else {
        this.breedList = [];
        this.breedId = '';
      }
    },
    //品种下拉框收缩时清除搜索词
    clearQuery (data){
      if(!data){
        if(!this.breedId || this.breedId == ''){
          this.$refs.cropName.query = ''
        }
      }
    },
    addClearQuery (data){
      if(!data){
        if(!this.addBreedId || this.addBreedId == ''){
          this.$refs.addCropName.query = ''
        }
      }
    },
    breedChange (data){
      if(data){
        this.depForm.breed = data.label
      }
    },
    addBreedChange (data){
      if(data){
        this.addForm.breedName = data.label
      }
    },
    //获取列表数据
    getListPage() {
      this.$Spin.show();
      let form = {
        breedName: this.depForm.breed,
        orgIds: this.orgIds,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sign: ''
      };
      orgbreedList(form).then(res => {
        this.tableData = res.response.list;
        this.total = res.response.total
        this.$Spin.hide();
      });
    },
    //获取新增关联列表数据 品种
    getBreedPage() {
      this.$Spin.show();
      getBreed(this.addForm).then(res => {
        this.addTableData = res.response.list;
        this.addTotal = res.response.total
        this.$Spin.hide();
      });
    },
    deptTreeDigui(data) {
      
      let dgData = data.map(item => {
        // console.log(item);
        if (item && item.children.length > 0) {
          return {
            title: item.label,
            id: item.id,
            value: item.value,
            expand: true,
            children: this.deptTreeDigui(item.children)
          };
        } else {
          return item ? {
            title: item.label,
            id: item.id,
            value: item.value,
            expand: true,
            children: item.children || []
          } : [];
        }
      });
      return dgData;
    },
    //显示搜索部门树
    getDepartData (){
      this.DepartModel = true;
    },
    // 获取选中部门树id
    getDepartId (data){
      this.checkDepList = data.map(item => {
        return {
          id: item.id,
          label: item.title
        }
      })
    },
    ok (){
      this.orgIds=[];
      this.orgIds = this.checkDepList.map(item => {
        return item.id
      })
      this.depForm.department = this.checkDepList.map(item => {
        return item.label
      })
      this.DepartModel = false
    },
    cancel (){
      this.DepartModel = false
    },
    //获取部门树
    getDeptTree (){
      let that = this;
      deptTree().then(res => {
        let deptTreeArr = [];
        deptTreeArr.push(JSON.parse(res.response))
        // console.log(deptTreeArr);
        // let datas = [testData];
        that.depTree = that.deptTreeDigui(deptTreeArr)
      })
    },
    //部门树点击子节点
    treeSelectData (data){
      this.orgIds=[];
      this.addDepId = ""
      this.checkedDepName = ""
      if(data.length > 0){
        this.checkedDepName = data[0].title;
        this.addDepId = data[0].id;
      };
      // this.depForm.breed=data.title,
      this.depForm.department = data.map(item => {
        return item.title
      })
      this.orgIds = data.map(item => {
        return item.id
      })
      this.getListPage();
    },
    // table勾选框触发事件
    selectChange (selection) {
      this.breedIds = selection.map(item => {
        return item.breedId
      })
    },
    //新增关联
    addRelation (){
      if(this.checkedDepName == ""){
        this.$Message.warning("请选择部门")
      }else {
        this.addModal = true;
        this.getBreedPage()
      }
    },
    //保存 新增关联
    orgBreed (){
      let form = {
        breedIds: this.breedIds,
        orgId: this.addDepId
      }
      addOrgBreed(formData(form)).then(res => {
        this.$Message.success("关联成功");
        this.getListPage();
        this.addModal = false
      })
    },
    //取消关联
    cancelOrgBreed (data){
      let form ={
        breedId: data.row.breedId
      }
      this.$Modal.confirm({
        title: '取消关联',
        content: '您确定删除关联？',
        onOk: () => {
          deleteOrgBreed(formData(form)).then(res => {
            this.$Message.success("成功取消关联");
            this.getListPage();
          })
        }
      });
      
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
    // 获取新增关联列表数据 分页
    addFormPageChange (page, pageSize) {
      if(page) {
        this.addForm.pageNum = page
      }
      if(pageSize) {
        this.addForm.pageSize = pageSize
      }
      this.getBreedPage()
    },
    //重置
    clear (){
      this.depForm.department = "";
      this.depForm.breed = "";
      this.breedId = "";
      this.orgIds = [];
    },
    addClear (){
      this.addForm.breedName = ""
      this.addBreedId = ""
    },
    // 关闭弹窗
    cancelM (){
      this.addModal = false
    }
  }
};
</script>
