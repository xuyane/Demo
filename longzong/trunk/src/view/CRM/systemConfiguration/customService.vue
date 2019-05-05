<style scoped>
.navbox {
  margin-bottom: 20px;
}
</style>
<template>
  <Row class='varietybox'>
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;系统配置&nbsp;&nbsp;>>&nbsp;&nbsp;自动分配客服
            </Row>
        </i-col>
        <Col span='24'>
            <Row :gutter="20">
                <Col span='24' >
                  <Card style="margin-bottom:20px" class-name="search-form">
                    <div  >
                        <Form ref="formCustom" :model="formCustom"  :label-width="80">
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="客服:"   >
                                        <!-- <Input type="text" v-model="formCustom.adminId" class="search-input"></Input> -->
                                        <associate-Search @query-list="getkf" :dataUrl="url" :parameterName='name' ref='kfref'></associate-Search>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="状态:" prop='status'> 
                                      <Select v-model="formCustom.status">
                                        <!-- <Option value="">全部</Option> -->
                                        <Option value="1">可用</Option>
                                        <Option value="0">冻结</Option>
                                      </Select>
                                    </FormItem>
                                </Col>
                               <Col span='7' >
                                    <FormItem style="text-align:right">
                                        <Button type="primary" @click="handleSubmit">查询</Button>
                                        <Button @click="handleReset" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                  </Card>
                  <Card class="tablewrap">
                    <div class="btn-container">
                      <Button type="primary" class="search-btn" @click="addwhiteModal">新增客服</Button>
                      <Button type="primary" class="search-btn" @click="disabledlists">禁用客服</Button>
                      <Button type="primary" class="search-btn"@click="activedlists">激活客服</Button>
                    </div>
                    <Row >
                      <Table class="tableCommon" border :columns="columns" :data="lists" @on-selection-change='selecteserves'></Table>
                        <oil-page :total="total"  :page-num="findlistmsg.pageNum" :page-size="findlistmsg.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>
                    </Row>
                  </Card>
                </Col>
                
            </Row>
            
        </Col>
        <Modal v-model="addwhite" title="新增自动分配客服" @on-cancel="cancel" width='500'>
          <div class-name="search-form" style="width:80%;margin:auto"> 
            <Form :model="addcon" ref="addcon" :label-width="80" >
              <FormItem label="客服：" prop='adminId' >
                <associate-Search @query-list="addgetkf" :dataUrl="url" :parameterName='name'></associate-Search>
              </FormItem>
              <FormItem label="状态：" prop='type'>
                <i-switch v-model="addcon.type" size="large">
                  <span slot="open" label='1'>开</span>
                  <span slot="close" label='0'>关</span>
                </i-switch>
            </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="addok">确定</Button>
            </div>
        </Modal>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </Row>
</template>

<script>
import oilPage from "../../components/page/page.vue";
import { formData } from "../../../assets/js/common.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import axios from "axios";
import {
  customList, // 获取客服息列表
  adminListName, //客服下拉
  saveConfigCustomer, //新增客服
  activateCustomer, //激活某一个
  forbiddenConfigCustomer, //禁用某一个
  forbiddenPageCustomer, //禁止多个   
  activatePageCustomer, //激活多个
delayApplygList
} from "../../components/axios/crm.js";
export default {
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      spinShow:false,
      url: "/crm/common/query-adminList-by-name",
      name: "adminName",
      addcon: {
        type: true
      },
      addwhite: false,
      formCustom: {},
      loading1: false,
      options1: [],
      pageSizeOpts: [10, 20, 50, 100, 200],
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      total: 0,
      findlistmsg: {
        pageSize: 10,
        pageNum: 1
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "客服",
          minWidth: 150,
          render: (h, data) => {
            let text = '';

            if (data.row.deptName!=' '){
              text = data.row.deptName+'-'+data.row.adminName;
            }else{
              text = data.row.adminName;
            }

            return h('span', {}, text);
          }
        },
        {
          title: "代办客服",
          minWidth: 150,
          render: (h, data) => {
            let text = '';

            if (data.row.backupAdminName !=' '){
              text = data.row.backupDeptName+'-'+data.row.backupAdminName;
            }

            return h('span', {}, text);
          }
        },
        {
          title: "创建时间",
          minWidth: 150,
          key: "createTime"
        },
        {
          title: "设置人",
          minWidth: 150,
          key: "creatorName"
        },
        {
          title: "状态",
          minWidth: 150,
          key: "status",
          render: (h, data) => {
            if (data.row.status == "0") {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      //color: '#9ecd3f',
                      //   textDecoration: 'underline',
                      //   cursor: 'pointer'
                    }
                  },
                  "冻结"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      //color: 'red',
                      // textDecoration: 'underline',
                      // cursor: 'pointer'
                    }
                  },
                  "可用"
                )
              ]);
            }
          }
        },
        {
          title: "操作",
          minWidth: 150,
          key: "action",
          render: (h, data) => {
            if (data.row.status == "0") {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      color: "#9ecd3f"
                      //   textDecoration: 'underline',
                      //   cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.activation(data);
                      }
                    }
                  },
                  "激活"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      color: "red"
                      // textDecoration: 'underline',
                      // cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.tovoid(data);
                      }
                    }
                  },
                  "禁用"
                )
              ]);
            }
          }
        }
      ],
      lists: [],
      kflist: [],
      //hasselected: ""
      hasselected: []
    };
  },
  methods: {
    // 查询
    handleSubmit() {
      this.pageSize = 10;
      this.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.formCustom.pageNum = 1;
      this.findlistmsg=JSON.parse(JSON.stringify(this.formCustom));
      this.getlist(this.findlistmsg);
    },
    // 重置
    handleReset() {
      this.$refs.formCustom.resetFields();
      this.$refs.kfref.model = "";
      this.$refs.kfref.getData('');
      this.formCustom={}
    },
    // 勾选
    selecteserves(data) {
      this.hasselected = data;
    },

    // 禁用
    tovoid(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要禁用该客服吗？</p>",
        onOk: () => {
          var data1 = {
            id: data.row.id
          };
          var that = this;
          forbiddenConfigCustomer(formData(data1)).then(resp => {
            that.lists[data.index].status = 0;
            that.$Message.info({
              content: resp.message,
              duration: 3
            });
          });
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    // 激活
    activation(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要激活该客服吗？</p>",
        onOk: () => {
          var data1 = {
            id: data.row.id
          };
          var that = this;
          activateCustomer(formData(data1)).then(resp => {
            that.lists[data.index].status = 1;
            that.$Message.info({
              content: resp.message,
              duration: 3
            });
          });
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    // 禁用多个
    disabledlists() {
      if (this.hasselected.length != 0) {
        this.$Modal.confirm({
          title: "提示",
          content: this.hasselected.length==1?"<p>确定要禁用该客服吗？禁用后将影响用户数据分配</p>":"<p>确定要禁用全部吗？禁用后将影响用户数据分配</p>",
          onOk: () => {
            var data = {};
            const ids = this.hasselected.map(item => {
              return item.id;
            });
            let form = "id[]=" + ids.join(",");
            var that = this;
            forbiddenPageCustomer(form).then(resp => {
              that.$Message.info({
                content: resp.message,
                duration: 3
              });
              that.getlist(that.findlistmsg);
              that.hasselected = [];
              
            });
          },
          onCancel: () => {
            // this.$Message.info("Clicked cancel");
          }
        });
      } else {
        this.$Message.warning("请先勾选至少一个客服");
      }
    },
    // 激活多个
    activedlists() {
      if (this.hasselected.length != 0) {
        this.$Modal.confirm({
          title: "提示",
          content: this.hasselected.length==1?"<p>确定要激活该客服吗？激活后将影响用户数据分配</p>":"<p>确定要激活全部吗？激活后将影响用户数据分配</p>",
          onOk: () => {
            var data = {};
            const ids = this.hasselected.map(item => {
              return item.id;
            });
            let form = "id[]=" + ids.join(",");
            var that = this;
            activatePageCustomer(form).then(resp => {
              that.$Message.info({
                content: resp.message,
                duration: 3
              });
              that.getlist(that.findlistmsg);
               that.hasselected = [];
            });
          },
          onCancel: () => {
            // this.$Message.info("Clicked cancel");
          }
        });
      } else {
        this.$Message.warning("请先勾选至少一个客服");
      }
    },
    // 新增白名单
    addwhiteModal() {
      this.addwhite = true;
    },
    //新增客服确定
    addok(data) {
      if (this.addcon.adminId) {
        var that = this;
        var data = JSON.parse(JSON.stringify(that.addcon));
            data.adminName= "";
    data.backupAdminId= 0;
    data.backupAdminName= "";
    data.backupDeptId= 0;
    data.backupDeptName= "";
    data.createTime= "";
    data.creatorId= 0;
    data.creatorName= "";
    data.deptId= 0;
    data.deptName= "";
    data.id= 0;
    data.lastAccess= 0;
    data.sign= "";
     data.version=0;
        data.statue = that.addcon.type == true ? 1 : 0;
        delete data.type;
      
        saveConfigCustomer(data).then(resp => {
          that.$Message.info("新增成功");
          // that.lists.unshift(that.addcon);
          that.addwhite = false;
          // this.$router.go(0);
          that.findlistmsg.pageSize = 10;
      that.findlistmsg.pageNum = 1;
      that.findlistmsg.times = new Date().getTime();
      that.getlist(that.findlistmsg);

        });
      } else {
        this.$Message.error("请选择客服");
      }
    },
    //新增客服取消
    cancel() {
      this.addwhite = false;
      // this.$refs.addcon.resetFields();
    },

    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
        this.findlistmsg.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
        this.findlistmsg.pageSize = pageSize;
      }
      this.getlist(this.findlistmsg);
    },
    // 获取列表
    getlist(data) {
      let that = this;
      this.spinShow=true
      customList(data).then(resp => {
        that.spinShow=false;
        that.lists = resp.response.list;
        that.total = resp.response.total;
      });
    },
    getkf(data) {
      this.kflist = data;
      if (data) {
        this.formCustom.adminId = data.value;
      } else {
        this.formCustom.adminId = "";
      }
    },
    addgetkf(data) {
      this.kflist = data;
      if (data) {
        this.addcon.adminId = data.value;
      } else {
        this.addcon.adminId = "";
      }
    }
  },
  created() {
    this.getlist(this.findlistmsg);
  }
};
</script>

