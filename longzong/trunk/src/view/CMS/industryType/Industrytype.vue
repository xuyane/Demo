<style>
@import "../informationsort/informationsort.less";
</style>

<template>
    <Row class="informationsortbox">
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：基础数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;行业类型管理 &nbsp;&nbsp;>>&nbsp;&nbsp; 行业类型列表
            </Row>
        </i-col>
        <Col span='24'>
            <Row :gutter="20">
                <Col span='4'>
                    <div class='leftree'>
                        <Card :bordered="false">
                            <p slot="title">行业类型列表</p>
                            <div>
                                <Tree :data="data1"></Tree>
                            </div>
                        </Card>
                    </div>  
                </Col>
                <Col span='20'>
                  <Card style="margin-bottom:20px">
                    <div class="topform" >
                        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                          <Row>
                            <Col span='8'>
                              <FormItem label="行业类型名称:" prop="msgname" :label-width="100">
                                <Input type="text" v-model="formCustom.msgname"></Input>
                              </FormItem>
                            </Col>
                            <Col span='8'>
                              <FormItem label="关键字:"  :label-width="100">
                                <Input type="text" v-model="formCustom.keyword"></Input>
                              </FormItem>
                            </Col>
                            <Col span='8'>
                              <FormItem label="状态:" prop="status">
                                <Select v-model="formCustom.status">
                                  <Option value="全部">全部</Option>
                                  <Option value="正常">正常</Option>
                                  <Option value="禁用">禁用</Option>
                                </Select>
                              </FormItem>
                            </Col>
                            <Col span='8' class="formbtn" offset="16">
                              <FormItem>
                                <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                                <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                            </FormItem>
                            </Col>
                          </Row>
                        </Form>
                    </div>
                  </Card>
                  <Card class="tablewrap">
                    <Row :gutter="16" class="navbox">
                      <Col span="2">
                        <div @click="addmsg">新增</div>
                      </Col>
                      <Col span="2">
                        <div>导入</div>
                      </Col>
                      <Col span="2">
                        <div>导出模板</div>
                      </Col>
                    </Row>
                    <Row >
                      <Table class="tableCommon" border :columns="columns7" :data="data6" ></Table>
                    </Row>
                    <oil-page :total="total" :page-size="100" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>
                  </Card>
                </Col>
            </Row>
            
        </Col>
        <add-type-modal :showAddModal='showAddModal' @hide-modal="hideAddModal"></add-type-modal>
        <check-type-modal :showCheckModal='showCheckModal' @hide-modal="hideCheckModal"></check-type-modal>
        <edit-type-modal :showEditModal='showEditModal' @hide-modal="hideEditModal"></edit-type-modal>
        <Modal v-model="modal1"   class="talkwrap" width="365" > 
          <p slot="header" class='result_t'>提示信息</p>
          <p class="msgcont">{{issure.label}}</p>
          <div slot="footer">
            <i-button type="primary"  @click="confirm(issure.value,issure.number)">确定</i-button>
            <i-button    @click="cancelchange">取消</i-button>                                      
          </div>
        </Modal>
    </Row>
</template>
<script>
import AddTypeModal from './addtype.vue'
import CheckTypeModal from './checktype.vue'
import EditTypeModal from './edittype.vue'
import oilPage from '../../components/page/page.vue'
export default {
  name:'typesort',
  components:{
    EditTypeModal,
    CheckTypeModal,
    AddTypeModal,
    oilPage
  },
  data() {
    return {
      data1: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ],
      showAddModal:false,
      showCheckModal:false,
      showEditModal:false,
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      total: 0,
      issure:{},
      modal1:false,
      formCustom: {
        msgname: "",
        status: "全部",
        online: "全部",
        authority: "全部",
        commonmsg: "全部"
      },
      ruleCustom: {
        msgname: [
          { required: true, message: "请输入行业类型名称", trigger: "blur" }
        ]
      },
      columns7: [
        {
          title: "行业类型编码",
          key: "number"
        },
        {
          title: "行业类型名称",
          key: "name",
          className: "colorblue",
          render: (h, data) => {
          return h('a', {
             on: {
                  click: () => {
                    this.checkinfor(data)
                  }
                }
          },data.row.name)
        }
        },
        {
          title: "行业类型路径",
          key: "path"
        },
        {
          title: "关键字",
          key: "keyword"
        },
        {
          title: "状态",
          key: "status",
          render: (h, data) => {
            let label =
              data.row.status === "Y"
                ? "正常"
                : data.row.status === "N" ? "禁用" : "";
            let color =
              data.row.status === "Y"
                ? "#9ecd3f"
                : data.row.status === "N" ? "red" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
        },
        {
          title: "创建时间",
          key: "time"
        },
        {
          title: "创建人",
          key: "person"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, data) => {
            if (data.row.status == "Y") {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.editMsg(data);
                      }
                    }
                  },
                  "编辑 "
                ),
                h(
                  "a",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.changeno(data);
                      }
                    }
                  },
                  "禁用"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "text",
                      size: "small",
                      class: "ttt"
                    },
                    on: {
                      click: () => {
                        this.editMsg(data);
                      }
                    }
                  },
                  "编辑 "
                ),
                h(
                  "a",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.changeyes(data);
                      }
                    }
                  },
                  "启用"
                )
              ]);
            }
          }
        }
      ],
      data6: [
        {
          number: "001",
          name: "图片新闻123",
          path: "文章类->图片新闻",
          status: "Y",
          power: "0",
          online: "Y",
          authority: "Y",
          commonmsg: "Y"
        },
        {
          number: "002",
          name: "图片新闻",
          path: "文章类->图片新闻",
          status: "N",
          power: "0",
          online: "Y",
          authority: "Y",
          commonmsg: "Y"
          // cellClassName:{
          //   status:'colorred'
          // }
        },
        {
          number: "003",
          name: "图片新闻",
          path: "文章类->图片新闻",
          status: "N",
          power: "0",
          online: "Y",
          authority: "Y",
          commonmsg: "Y"
        },
        {
          number: "004",
          name: "图片新闻",
          path: "文章类->图片新闻",
          status: "Y",
          power: "0",
          online: "Y",
          authority: "Y",
          commonmsg: "Y"
        }
      ]
    };
  },
  methods: {
    addmsg(){
      this.showAddModal=true;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    changeno(data) {
      console.log(data);
     
      this.issure.label='是否确认要禁用该行业类型?';
      this.issure.value='Y';
      this.issure.number=data.index;
      this.modal1=true;
      console.log(this.issure)
      
    },
    changeyes(data) {
      console.log(data);
      this.issure.label='是否确认要启用该行业类型?';
      this.issure.value='N';
      this.issure.number=data.index;
      console.log(this.issure)
      this.modal1=true;
      // this.data6[data.index].status = "Y";
    },
    editMsg(data) {
      console.log(data);
      this.showEditModal=true;
      // status=this.data6
      // if()
    },
    confirm(a,index){
      if(a=='Y'){
        this.data6[index].status = "N";
      }else if(a=='N'){
        this.data6[index].status = "Y";
      }
      this.modal1=false;
    },
    cancelchange(){
      this.modal1=false;
    },
    checkinfor(data){
      this.showCheckModal=true;
    },
    pageChange (page, pageSize) {
      //分页
      this.pageNum = page
      this.pageSize = pageSize
      // this.query()
    },
    hideCheckModal(){
      this.showCheckModal=false;
    },
    hideAddModal(){
      this.showAddModal=false;
    },
    hideEditModal(){
      this.showEditModal=false;
    }
  }
};
</script>
