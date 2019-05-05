<style lang="less" scoped>
</style>
<template >
<Row class='varietybox'>
  <user-follow-modal
      :showFollowModal="showFollowModal"
      @hide-modal="hideFollowModal"
      @hide-load="hideFollowModal1"
      :rowData="userFollowData">
    </user-follow-modal>
	<i-col span="24">
		<Row class-name="current-position">
			当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;公司列表
		</Row>
	</i-col>
	<Col span="24" class="search-form">
		<Form :label-width="100">
			<Row>
				<Col span="8">
					<FormItem label="公司名称:"  >
						<associate-Search ref='breedDataRef' @query-list="companyTypeFunction" :dataUrl="url" :parameterName='name'></associate-Search>
				</FormItem>
				</Col>
				<Col span="8">
					<FormItem label="用户名：">
						<Input type="text" class="search-input" clearable  v-model="params.userLike"/>
					</FormItem>  
				</Col>
				<Col span="8">
					<FormItem label="联系电话：">
						<Input type="text" class="search-input" clearable  v-model="params.mobile"/>
					</FormItem>  
				</Col>
				<Col span="24" class="text-right" style="margin-bottom:20px;">
					<Button type="primary" style="margin-right:20px;" @click="search">查询</Button>
					<Button @click="reset">重置</Button>
				</Col>
			</Row>           
		</Form>       
	</Col>  
	<Col span="24" class="table-con"> 
	   <Table class="tableCommon"
				:data="tableData"
				:columns="columns"
				:stripe="true"
				:border="true">
			</Table>
			<oil-page
				:total="total"
				:page-num="params.pageNum"
				:page-size="params.pageSize"
				@page-change="pageChange"
				:page-size-opts="pageSizeOpts"
				:show-sizer="showSizer">
			</oil-page>
	</Col>  
	<Spin size="large" fix v-if="spinShow"></Spin>    
</Row>
</template>
<script>
import {
  crmCompanyList,
	crmCompanyNameSearch,
  getFollow,
  queryUserIsPublic
} from "../../components/axios/crm.js";
import { formatTime2, formData } from "../../../assets/js/common.js";
import oilPage from "../../components/page/page.vue";
import associateSearch from "../../components/associateSearch/getAssociateSearchInput.vue";
import UserFollowModal from "./userFollowModal";
import dial from "@/assets/js/linkDial.js";
export default {
  name: "companyList",
  components: { oilPage, associateSearch, UserFollowModal},
  data() {
    return {
      userFollowData: {},
      showFollowModal: false,
      spinShow: false,
      loading: false,
      companyName: [],
      url: "/crm/common/query-member-select-list", //根据会员名称模糊匹配下拉选择列表
      name: "memberName",
      tableData: [],
      params: {
        memberLike: "",
        userLike: "",
        mobile: "",
        pageNum: 1,
        pageSize: 10
      },
      total: null,
      showSizer: true,
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      columns: [
        {
          key: "memberName",
          title: "公司名称",
          align: "center",
          minWidth: 200
        },
        {
          key: "userName",
          title: "用户名",
          align: "center",
          minWidth: 100
        },
        {
          key: "mobile",
          title: "联系电话",
          align: "center",
          minWidth: 100,
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
                      this.onDial(data.row.mobile);
                    }
                  }
                },
                data.row.mobile
              )
            ]);
          }
        },
        {
          key: "userType",
          title: "用户类型",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            const type = {
              0: "免费用户",
              1: "试用用户",
              2: "正式用户"
            };
            const result = type[data.row.userType]
              ? type[data.row.userType]
              : "";
            return h("div", {}, result);
          }
        },
        {
          key: "lastCallTime",
          title: "最新通话时间",
          align: "center",
          minWidth: 120,
          render: (h, data) => {
            const result = data.row.lastCallTime
              ? formatTime2(data.row.lastCallTime)
              : "";
            return h("div", {}, result);
          }
        },
        {
          key: "adminName",
          title: "业务员",
          align: "center",
          minWidth: 150,
          render: (h, data) => {
            const result = data.row.adminName
              ? data.row.deptName + "—" + data.row.adminName
              : "";
            return h("div", {}, result);
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
          align: "center",
          render: (h, data) => {
            if (data.row.userType == "0" && data.row.adminId == "") {
              return h(
                "div",[
                  h(
                    "a",
                    {
                      on: {
                        click: ($event) => {
                          this.userFollow(data);                         
                        }
                      }
                    },
                    " 跟踪记录 "
                  ),
                  h(
                    "a",
                    {
                      on: {
                        click: ($event) => {
                          let form = {
                            isUserAllot: 2,
                            userId: data.row.userId
                          };
                          let msg={
                            userId: data.row.userId
                          }
                          let that=this;
                          $event.currentTarget.parentElement.textContent='';
                          queryUserIsPublic(formData(msg)).then(resp=>{
                            if(resp.response==true){
                              getFollow(formData(form)).then(res => {
                                that.$Message.success("跟踪成功");
                              });
                            }else{
                              that.$Message.warning("该用户不是公共资源用户，不能进行我要跟踪操作");
                            }
                          })
                        }
                      }
                    },
                    " 我要跟踪 "
                  )
              ]
              )
              ;
            } else {
              return h("div", "");
            }
          }
        }
      ]
    };
  },
  mounted() {
    this.tableList();
  },
  methods: {
    hideFollowModal() {
      this.showFollowModal = false;
    },
    hideFollowModal1() {
      this.showFollowModal = false;
    },
    // 用户跟踪
    userFollow(data) {
      this.showFollowModal = true;
      this.checkindex=data.index;
      this.userFollowData = data.row;
    },
    //根据公司名称模糊匹配下拉选择列表
    companyTypeFunction(companyData) {
      if (companyData) {
        this.params.memberLike = companyData.label;
      } else {
        this.params.memberLike = "";
      }
    },
    tableList() {
      let that = this;
      this.spinShow = true;
      crmCompanyList(formData(this.params)).then(res => {
        that.spinShow = false;
        if (res.response) {
          this.tableData = res.response.list;
          this.total = res.response.total;
        }
      });
    },
    search() {
      this.tableList();
      console.log("merberName", this.$refs.breedDataRef.model);
    },
    reset() {
      this.$refs.breedDataRef.model = "";
      this.$refs.breedDataRef.getData("");
      this.params = {};
      this.tableData = [];
      this.tableList();
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({ title: "呼叫成功：" + phone });
      });
    },
    pageChange(page, size) {
      if (size) {
        this.params.pageNum = 1;
        this.params.pageSize = size;
      } else {
        this.params.pageNum = page;
      }
      this.tableList();
    }
  },
  watch: {
    showFollowModal(newVal, oldVal) {
      this.showModal = newVal;
    }
  }
};
</script>
