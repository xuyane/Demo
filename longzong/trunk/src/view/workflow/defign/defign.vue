<style lang="less" scoped>
  .defign {
    .breadcrumb{
      font-size:14px;color:#605f5f;margin-bottom:20px;
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
  <div class="defign">
    <Row class-name='breadcrumb'>
       <Col span="24">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;流程定义
       </Col>
    </Row>
    <Card dis-hover>
      <h1 slot="title">流程定义</h1>
      <div class="form_wrap">
        <Form ref="deploy_form" :model="formValues" inline :label-width="80">
          <Row>
            <i-col span="6">
              <FormItem label="流程KEY" class="form_item" prop="processDefKey">
                <Input class='item_control' v-model="formValues.processDefKey"></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="流程名称" class="form_item" prop="processDefName">
                <Input class='item_control' v-model="formValues.processDefName"></Input>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="状态" class="form_item" prop="activate">
                <Select v-model="formValues.activate">
                  <Option :value="item.value" v-for="item in processStatus" :key="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="系统平台" class="form_item" prop="sysId">
                <Select v-model="formValues.sysId">
                  <Option :value="item.value" v-for="item in groups" :key="item.value">{{item.desc}}</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="end" >
            <i-col span="4">
              <FormItem>
                <ButtonGroup>
                  <Button type="primary" @click="onSearch">查询</Button>
                  <Button @click="onReset">重置</Button>
                </ButtonGroup>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </div>
    </Card>
    <Card :bordered="false" dis-hover>
      <div slot="title">审批流程列表</div>
      <Table border :columns="columns" :data="processes" :loading="loading">
        <div class="page" slot="footer">
          <Page :total="data_count" show-elevator show-total show-sizer @on-change="onPageChange" @on-page-size-change="onPageSizeChange" />
        </div>
      </Table>
    </Card>

  <!--  <Modal
      fullscreen
      footer-hide
      v-model="showModal"
      title="流程图">
      <div>
        <img :src="processImgPath">
      </div>
    </Modal>-->
  </div>
</template>



<script>
  import axios from "axios";
  import {getTest} from "@/view/components/axios/http.js";
import { statusZero } from '../../components/axios/workflow.js'
  export default {
    name: "defign",
    data() {
      return {
        processStatus: [
          {
            label: "正常",
            value: "true"
          },
          {
            label: "挂起",
            value: "false"
          }
        ],
        formValues: {
          processDefKey: "",
          processDefName: "",
          activate: 'true',
          sysId: "",
          page: 1,
          pageSize: 10
        },

        columns: [
          {
            title: "KEY",
            key: "key"
          },
          {
            title: "版本",
            key: "version",
            width: 100
          },
          {
            title: "名称",
            key: "name"
          },
          {
            title: "状态",
            key: "status",
            width: 100,
            render: (h, params) => {
              const status = params.row.status === 1 ? "正常" : "挂起";
              return h("span", status);
            }
          },
          {
            title: "创建人",
            key: "admin",
            width: 150
          },
          {
            title: "创建时间",
            key: "time"
          },
          {
            title: "平台",
            key: "system"
          },
          {
            title: "操作",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary"
                    },
                    style: {
                      marginRight: "8px"
                    },
                    attr: {
                      target: '_blank'
                    },
                    on: {
                      click: () => {
                        this.$router.push({name:'defignDetail',params:{id:params.row.id}})
                      }
                    }
                  }, "详情"),
                h("Button", {
                  on: {
                    click: () => {
                      window.open('/mysteel/workflow/process/image?id=' + params.row.id, '_blank');
//                      this.processImg(params.row.id);
                    }
                  }
                }, "流程图")
              ]);
            }
          }
        ],

        loading: false,

        // 系统平台
        groups: [],

        // 流程数据
        processes: [],

        // 数据总数
        data_count: null,


        // 显示流程图弹出
        showModal: false,

        // 流程图路径
//        processImgPath: ''
      };
    },

    created() {
      this.$Spin.show();
      this.getDatas();
    },
    methods: {
      onSearch() {
        this.formValues.page = 1;
        this.formValues.pageSize = 10;

        this.loading = true;
        // console.log(this.formValues);
        this.getProcessList();
      },

      onReset(){
        this.$refs['deploy_form'].resetFields();
      },

      onPageChange(curr) {
        this.loading = true;
        this.formValues.page = curr;
        this.getProcessList();
      },

      onPageSizeChange(size){
        this.loading = true;
        this.formValues.pageSize = size;
        this.getProcessList();
      },

      // 获取所有数据
      getDatas() {
        axios.all([this.getProcessList(true), this.getGroupList()]).then(
          axios.spread((process, group) => {
            statusZero(group.data.status)
            this.groups = group.data.data;

            this.processes = process.data.data.list;
            this.data_count = process.data.data.total;
            this.$Spin.hide();
          }));
      },

      // 获取流程列表
      getProcessList(isFirst = false) {
        const dataServe = axios.get("/mysteel/workflow/process/list", { params: this.formValues });

        if (isFirst) {
          return dataServe;
        } else {
          dataServe.then(process => {
            statusZero(process.data.status)
            this.processes = process.data.data.list;
            this.data_count = process.data.data.total;
            this.loading = false;
          });
        }
      },

      // 获取平台列表
      getGroupList() {
        return axios.get("/mysteel/workflow/group/list");
      },

      // 流程图
    /*  processImg(id){
        this.processImgPath = '/mysteel/workflow/process/image?id='+id;
        this.showModal = true;
      }*/
    }
  };
</script>


