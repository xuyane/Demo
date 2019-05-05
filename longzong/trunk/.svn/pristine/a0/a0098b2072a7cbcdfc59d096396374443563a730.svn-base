<style lang="less" scoped>
@import './informationSource.less';
.unit .unit_title{
    padding-right:20px;
}
.unit .unit_title span{
    width:100% !important;
}
.unit_content .unit_content_left{
    width:50% !important;
    box-sizing: border-box;
    border-right:1px solid #BBBBBB
}
.unit_content .unit_s_left{
    width:25% ;
    box-sizing: border-box;;
}
.unit_content{
    width:30% !important;
    box-sizing: border-box;
}
.unit_s_right{
   width: 75% !important;
   border: none !important;
}
.unit_content{
    width:100% !important;
}
.unit_content .no_line{
    border-right:none !important;
}
.table-con{padding-left: 0}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="">
        <!-- 信息单元开始 -->
        <div class="unit">
            <div class="unit_title">
                <span>信息单元</span>
                <div class="unit_content">
                    <div class="unit_content_left">
                        <div class="unit_s_left">信息单元编码：</div>
                        <div class="unit_s_right">{{code}}</div>
                    </div>
                    <div class="unit_content_left no_line">
                        <div class="unit_s_left">信息单元名称：</div>
                        <div class="unit_s_right">{{name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="padding-left:20px;padding-right:20px;">
         <p data-v-5e44fe16="" class="title" style="width:100%">信息单元联系人列表</p>
        </div>
    <Col span="24">
      <Row class-name="table-con">
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          :stripe="true"
          :border="true"
         >
        </Table>
        <Row>
          <oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="24" class="text-center">
            <Button type="primary"  @click="returnList">返回</Button>
          </Col>
        </Row>
      </Row>
    </Col>
        
      </Row>
        
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
export default {
  name:"CheckUnitTwo",
  props: ["linkerData"],
  components:{
    oilPage
  },
  data() {
    return {
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      pageNum:1,
      pageSize: 10,
      total: 0,
      columns: [
        {
          key: "name",
          title: "姓名",
          width: 150,
          align: "center"
        },
        {
          key: "sex",
          title: "性别",
          width: 150,
          align: "center",
          render:(h,data)=>{
                    return h("span",data.row.sex === 1 ? '女' : '男');
                }
        },
        {
          key: "department",
          title: "部门",
          width: 150,
          align: "center"
        },
        {
          key: "position",
          title: "职位",
          width: 150,
          align: "center"
        },
        {
          key: "phone",
          title: "联系电话号码",
          width: 150,
          align: "center"
        },
        {
          key: "mobile",
          title: "手机号码",
          width: 150,
          align: "center"
        },
        {
          key: "enterpriseName",
          title: "所在公司",
          minWidth: 150,
          align: "center"
        },
      ],
      tableData: [],
        name:"",
        code:""
    };
  },
  methods: {
    // 监听分页
        pageChange (page, pageSize) {
            if(page) {
                this.pageNum = page
            }
            if(pageSize) {
                this.pageSize = pageSize
            }
            this.getListPage();
        },
         // 获取我的联系人列表
        getListPage () {
            this.code = this.linkerData.code;
            this.name = this.linkerData.name;
            this.$Spin.show();
            axios.post('information/contacts/list',{
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                taskId:this.$route.query.taskId,
            }).then(res => {
                if(res.status === 200) {
                    this.tableData = res.data.response.list;
                    this.total = res.data.response.total;
                   // console.log("this.linkerData",this.linkerData);
                }
                this.$Spin.hide();
            }).catch(err => {
                console.log(err)
                this.$Spin.hide();
            })
        },
        //返回主列表
        returnList(){
            this.$router.push({name:"unitMangement"});
        }
  }
};
</script>
