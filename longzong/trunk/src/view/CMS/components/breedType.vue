<style scoped>
</style>

<template>
    <Modal v-model="showselectModal" title="选择品种类别" @on-ok="doEdit" :loading="loading" :width="750" @on-cancel="doCancel" :z-index = "999">
        <Form ref="selectModal" :model="selectform" :label-width="100">
            <Row>
                <Col span="7">
                <FormItem label="品种类别编号">
                    <Input v-model="selectform.code" class="search-input col-50" placeholder="请输入品种类别编号"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="品种类别名称" class="">
                    <Input v-model="selectform.name" class="search-input col-50" placeholder="请输入品种类别名称"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem>
                    <Button type="primary" @click="ok">确定</Button>
                    <Button style="margin-left: 8px" @click="cancel">取消</Button>
                </FormItem>
                </Col>
            </Row>
        </Form>
        <div style="position:relative;overflow:hidden">
            <Table class="tableCommon" border ref="selection" :columns="columns" :data="dataTable" @on-selection-change="handleRowChange"></Table>
            <oil-page :total="total" :page-size="10" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
        </div>
    </Modal>
</template>

<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
export default {
  components: {
    oilPage
  },
  data() {
    return {
        showselectModal:false,
        loading:false,
        pageSizeOpts: [10, 20, 50, 100, 200],
        showSizer: true,
        pageSize: 10,
        total: 0,
        columns: [
            {
            type: "selection",
            width: 60,
            align: "center"
            },
            {
            key: "code",
            align: "center",
            title: "品种类别编码"
            },
            {
            key: "name",
            align: "center",
            title: "品种类别路径"
            }
        ],
        dataTable: [],
        selectform: {
            breedCode: "",
            breedName: ""
        }
        };
  },
  methods: {
    // 监听选中项发生变化
    handleRowChange(row) {
      this.selectRow = row;
    },
    //获取分页数据
    pageChange(page, pageSize) {
      this.pageNum = page;
      this.pageSize = pageSize;
    },
    //获取列表数据
    getlist(selectCondition) {
      var that = this;
      var params = new URLSearchParams();
      params.append("pageNum", this.page.pageNum);
      params.append("pageSize", this.page.pageSize);
      params.append("code", this.selectform.code);
      params.append("name", this.selectform.breedName);
      axios
        .post("/cms//basedata/breedType/list", params)
        .then(function(res) {
          if (res.status === 200) {
            that.tableData = res.data.response.list;
            that.dataCount = res.data.response.total;
          } else {
            that.$Message.warning(res.data.message);
          }
        });
    },
    //点击确定将值传到父组件里面去
    doEdit() {
      let that = this;
      that.loading = false;
      let arr = _this.selectRow;
      let multis = [];
      for (let i = 0; i < arr.length; i++) {
        multis.push(arr[i].name);
      }
      that.dataSelect = multis;
      that.showselectModal = false;
      //that.$emit("hide-modal");
    },
    doCancel(){
      this.$emit('hide-modal')
      this.$refs.editModal.resetFields()
    },
    ok(){

    },
    cancel(){

    }
  }
};
</script>

