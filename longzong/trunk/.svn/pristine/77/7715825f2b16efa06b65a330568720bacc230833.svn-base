<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;用户搜索
      </Row>
      <Col span="24">
        <Row class-name="table-con">
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
    </Col>
  </Row>
</template>
<script>
import OilPage from '../../../components/page/page.vue';
import { getUserSearch } from '../../../components/axios/crm.js'
import { formData, formatStamp, formatTime } from '../../../../assets/js/common.js'
export default {
   components: {
    OilPage
  },
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      tableData: [],
      columns: [
        {
          key: 'userId',
          title: '用户id',
          minWidth: 100
        },
        {
          key: 'companyName',
          title: '公司名称',
          minWidth: 100
        },
        {
          key: '',
          title: '关注产品',
          minWidth: 200,
          render: (h, data) => {
            let list =[];
            if(data.row.productVOs && data.row.productVOs.length>0){
              data.row.productVOs.map(item => {
                list.push(item.productName);
              })
            }
            // return h('div',{}, str)
             return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top",
                    maxWidth: 600
                  },
                  style: {
                    marginLeft: "5px",
                    color: "#2d8cf0",
                    cursor: "pointer"
                  }
                },
                [
                  h(
                    "span",
                    {
                      on: {
                        click: () => {
                          this.copyText(list);
                        }
                      }
                    },
                    list && list.length > 0 ? "详情" : ""
                  ),
                  h("div", {
                    slot: "content",
                    style: {
                      maxHeight: "400px",
                      overflow: "auto"
                    },
                    domProps: {
                      innerHTML: list.join("<br />")
                    }
                  })
                ]
              )
            ]);
          }
        },
        {
          key: 'userType',
          title: '用户类型',
          minWidth: 100,
          render: (h, data) => {
            let str =''
            if(data.row.userType == 0){
              str = '免费用户'
            }else if(data.row.userType == 1){
              str = '试用用户'
            }else if(data.row.userType == 1){
              str = '正式用户'
            }
            return h('div', {}, str)
          }
        },
        {
          key: 'userStar',
          title: '用户星级',
          minWidth: 100
        },
        {
          key: 'mainContactName',
          title: '联系人',
          minWidth: 100
        },
        {
          key: 'mainContactMobile',
          title: '联系人手机',
          minWidth: 100
        },
        {
          key: 'mainContactPhone',
          title: '联系人电话',
          minWidth: 100
        },
        {
          key: 'adminName',
          title: '业务员',
          minWidth: 100
        },
        {
          key: '',
          title: '合同到期时间',
          minWidth: 100,
          render: (h, data) => {
            let str =  formatTime(data.row.contractArrivedTime)
            return h('div', {}, str)
          }
        },
        {
          key: 'userName',
          title: '操作',
          minWidth: 100,
          render: (h, data) => {
            return h('span', {
              style: {
                cursor: 'pointer',
                color: '#0f4fba'
              },
              on: {
                click: () => {
                  this.check()
                }
              }
            }, '查看')
          }
        },
      ],
    }
  },
  created(){
    this.getListPage()
  },
  methods: {
        // 复制
    copyText(text) {
      let str = text.join("\n");
      this.$copyText(str).then(
        res => {
          this.$Message.success("复制成功");
        },
        err => {
          this.$Message.warning("复制失败");
        }
      );
    },
    getListPage(){
      this.$Spin.show();
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        areaCode: this.$route.query.areaCode || '',
        userId: this.$route.query.userId || '',
        userName: this.$route.query.userName || '',
        memberId: this.$route.query.memberId || '',
        startRegisterTime: this.$route.query.startRegisterTime || '',
        endRegisterTime: this.$route.query.endRegisterTime || '',
        startDistributionTime: this.$route.query.startDistributionTime || '',
        endDistributionTime: this.$route.query.endDistributionTime || '',
        startServiceTime: this.$route.query.startServiceTime || '',
        endServiceTime: this.$route.query.endServiceTime || '',
        productIds: this.$route.query.productIds || '',
        deptId: this.$route.query.deptId,
        adminId: this.$route.query.adminId || '' 
      }
      getUserSearch(formData(params)).then(res =>{
        this.$Spin.hide();
        this.tableData = res.response.list
        this.total = res.response.total
      })  
    },
    // 查看
    check() {
      this.$router.push({
        name: 'basicInfo'
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
      this.getListPage();
    },
  }
}
</script>
