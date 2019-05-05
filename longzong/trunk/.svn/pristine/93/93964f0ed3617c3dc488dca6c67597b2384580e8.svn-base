<style lang="less" scoped src="./chart.less"></style>

<template>
   <Row class-name="my-account-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;流程图表
      </Row>
    </Col>

    <Col span="24" class-name="search-form">

            <Form :label-width="100" ref="addForm" :model="formValues">
             <Row type="flex" justify="space-between">
                <Col span="7">
                    <FormItem label="KEY:">
                        <Input  class="search-input" v-model="formValues.key"></Input>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="名称:">
                        <Input  class="search-input" v-model="formValues.name"></Input>
                    </FormItem>
                </Col>
                <Col span="7" class="text-right">
                    <Button type="primary"  @click="query" >查询</Button>
                    <Button style="margin-left: 8px" @click="reset">重置</Button>
                </Col>
            </Row>
        </Form>
    </Col>

        <Col span="24" class="mar-top-20">
            <Row class-name="table-con">
                <Table :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" >
                <!--  <div class="page" slot="footer">
                    <Page :total="dataCount" show-elevator show-total show-sizer @on-change="changePageNum" @on-page-size-change="changePageSize" />
                  </div>-->

                  <div slot="footer">
                    <oil-page :loading="loading" :total="dataCount" :page-size="pageSize" @page-change="changePageNum" :page-size-opts="pageSizeOpt" :show-sizer="true"></oil-page>
                  </div>
                </Table>
               <!-- <div class="page-con">
                    <span>第{{pageNum}}页 / 共{{Math.ceil(dataCount / pageSize)}}页 每页{{pageSize}}条 共{{dataCount}}条</span>
                   <Page
                    :total="dataCount"
                    :page-size="pageSize"
                    show-sizer
                    show-elevator
                    :page-size-opts="pageSizeOpt"
                    @on-change="changePageNum"
                    @on-page-size-change="changePageSize"
                    class="pull-right"/>
                </div>-->
            </Row>
        </Col>



        <Modal v-model="showDeleteModal"  title="提示信息" @on-ok="doDelete"  @on-cancel="cancel" width="490">
            <Row>
                <Col span="24">
                    <p class="p-text">您确定删除？</p>
                </Col>
            </Row>
        </Modal>

     <Modal v-model="showModal"  title="选择平台" @on-ok="doAdd"  @on-cancel="closeShowModel" width="570">
      <Form ref="addForm" :model="addForm" :label-width="120">
          <div id="chk_div" ref="showDiv" class="alert alert-success">
            <button type="button" class="close" data-dismiss="alert" @click='closeShowModelCss' >×</button>
            <span id="chk_span" ref="showMsg" ></span>
        </div>

         <FormItem label="选择平台:" :label-width="120"  >
            <Select v-model="value3" class="form-select  col-75" placeholder="请选择平台">
                <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
            </Select>
        </FormItem>
      </Form>
    </Modal>
  </Row>
</template>

<script>
import axios from 'axios'
import oilPage from '../../components/page/page.vue'
import { statusZero } from '../../components/axios/workflow.js'
export default {
    name: 'myAccountIndex',
  components: {
    oilPage
  },
    data () {
        return{
          formValues: {
            page: 1,
            pageSize: 10,
            key: '',
            name: ''
          },

          // table  loading
          loading: true,

    /*  value1: '', // KEY
      value2: '', // 名称*/

      addForm:{
        taskId: '',
        remarks: ''
      },

        columns: [
            {
                type: 'index',
                width: 60,
                align: 'center',
                title: "序号"
            },
            {
                key: "key",
                width: 240,
                align: "center",
                title: "KEY"
            },
            {
                key: "name",
                align: "center",
                title: "名称"
            },
            {
                key: "version",
                align: "center",
                title: "版本",
            },
            {
                key: "createTime",
                align: "center",
                title: "创建时间",
            },
            {
                key: "updateTime",
                align: "center",
                title: "更新时间"
            },
            {
                key: "updater",
                align: "center",
                title: "更新人",
            },
            {
                key: "deploymentId",
                align: "center",
                title: "部署ID"
            },
            {
            title: "操作",
            align: "center",
            width: 240,
            render: (h, data) => {
                return h("div", [
                h(
                    "span",
                    {
                    style: {
                        marginRight: "8px",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer"
                    },
                    on: {
                        click: () => {
                            window.open('https://mgt.oilchem.net/mysteel/workflow/modeler.htm?modelId='+data.row.id);

                        }
                    }
                    },
                    "流程图"
                ),
                h(
                    "span",
                    {
                    style: {
                        marginRight: "8px",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer"
                    },
                    on: {
                            click: () => {
                                window.open('/mysteel/workflow/model/download.htm?id='+data.row.id);
                            }
                        }
                    },
                    "下载"
                ),
                h(
                    "span",
                    {
                    style: {
                        marginRight: "8px",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer"
                    },
                    on: {
                            click: () => {
                                this.openShowModal(data);
                            }
                        }
                    },
                    "部署"
                ),
                h(
                    "span",
                    {
                    style: {
                        marginRight: "8px",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer"
                    },
                    on: {
                            click: () => {
                                this.openDeleteModal(data);
                            }
                        }
                    },
                    "删除"
                )
            ]);
            }
            }
        ],
            tableData: [],
            groupList : [],
            showSizer: true,
            dataCount: 0,
            pageSize: 10,
            pageNum: 1,
            pageSizeOpt: [10, 20,50],
            value1: '',
            value2: '',
            value3: '', //sysId
            value4:'', //id
            value5:'', // key
            value6:'', //删除传入的id
            showModal: false,
            showDeleteModal: false,
            selectRow: [],
            employeeList: [],
            loading: false

        }
    },
  created() {
    this.getListData();
  },
    methods:{
        reset() {
          this.formValues.key = '';
          this.formValues.name = ''
        },

        openDeleteModal (data){//打开删除弹窗
            this.value6 = data.row.id;
            this.showDeleteModal = true;
        },

        cancel() {
            this.value6 = '';
            this.showDeleteModal = false;
        },


        doDelete() {
            this.$Spin.show();
            axios({
                url:'/mysteel/workflow/model/delete',
                method: 'get',
                params:{
                    id:this.value6
                }
            }).then(resp => {
                let statusZ = resp.data.status;
                statusZero(statusZ)
                if(resp.data.data == 'true'){
                    this.$Message.success('已删除成功')
                }else{
                    this.$Message.error('删除失败')
                }
                // 刷新页面
                this.query();
                this.$Spin.hide();

            }).catch(err => {
                console.log(err);
                this.$Spin.hide();
            })



        },

        openShowModal (data){//打开部署弹窗
            this.value4 = data.row.id;
            this.value5 = data.row.key;
            let msg = '';
            this.$refs.showDiv.style.visibility = 'visible';
            this.$Spin.show();
            axios({
                url:'/mysteel/workflow/process/is_exist',
                method: 'get',
                params:{
                    key:this.value5
                }
            }).then(resp => {
                let statusZ = resp.data.status;
                statusZero(statusZ)
                if(resp.data.data){
                    msg = this.value4 +'已存在于[' + resp.data.data +']请谨慎使用';
                }else{
                    msg = '恭喜您！你可以使用[' + this.value5  + ']';
                }
                this.$refs.showMsg.innerHTML = msg;
                this.showModal = true;
                this.$Spin.hide();
            }).catch(err => {
                console.log(err);
                this.$Spin.hide();
            })

        },
        closeShowModel() {
            this.showModal = false;
            this.value4 = '';
            this.value5 = '';
        },

         closeShowModelCss() {
            this.$refs.showDiv.style.visibility = 'hidden';
        },

        doAdd() {
            this.$Spin.show();
            axios({
                url:'/mysteel/workflow/model/deploy',
                method: 'get',
                params:{
                    sysId:this.value3,
                    id:this.value4,
                    key:this.value5
                }
            }).then(resp => {
                let statusZ = resp.data.status;
                statusZero(statusZ)
                if(resp.data.data == 'true'){
                    this.$Message.success('部署成功');
                }else{
                    //this.$Message.error('部署失败');
                    this.$Message.error(resp.data.message);
                }
                this.value4 = '';
                this.value5 = '';
                // 刷新页面
                this.query();
                this.$Spin.hide();
                }).catch(err => {
                    console.log(err);
                    this.$Spin.hide();
            })
        },

        clear() {
            this.$Message.success('重置成功')
        },
        getListData() {
            this.$Spin.show();
            axios.all([this.getModelList(true), this.getGroupList()]).then(
            axios.spread((list, group) => {
             let statusZ = list.data.status;
             statusZero(statusZ)
              this.tableData = list.data.data.list;
              this.dataCount = list.data.data.total;
              this.groupList = group.data.data;
              this.$Spin.hide();
            })).catch(err => {
            console.log(err);
            this.$Spin.hide();
          });
        },

      getModelList(isFirst = false) {
        const dataServe = axios.get('/mysteel/workflow/model/list', {
          params: this.formValues
        });
        if (isFirst) {
          return dataServe;
        } else {
          dataServe.then(list => {
            let statusZ = list.data.status;
            statusZero(statusZ)  
            this.tableData = list.data.data.list;
            this.dataCount = list.data.data.total;
            this.loading = false;
          });
        }
      },

      getGroupList() {
          return axios.get('/mysteel/workflow/group/list');
      },


        changePageNum (current, size) {
          const pageNum = current ? current : 1;
          const trueSize = size ? size : 10;
          this.refreshData(pageNum, trueSize);
        },

        query() {
          this.refreshData(1);
        },

      refreshData(page, pageSize = 10){
        this.loading = true;
        this.formValues.page = page;
        this.formValues.pageSize = pageSize;
        this.getModelList();
      }
    }

}
</script>






