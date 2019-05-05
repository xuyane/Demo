<style lang="less" scoped>
</style>
<template>
  <Row>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：权限管理&nbsp;&nbsp;>>&nbsp;&nbsp;功能配置
      </Row>
    </i-col>
    <Col span='24'>
    <Row :gutter="20">
      <Col span='4'>
      <div class='leftree'>
        <Card :bordered="false">
          <p slot="title">系统模块</p>
          <div class="overflow-auto">
            <Tree :data="datatree" @on-select-change='findlist'></Tree>
          </div>
        </Card>
      </div>
      </Col>
      <Col span='20'>
      <Card style="margin-bottom:20px">
        <Form :label-width="100" ref="form" :model="operationListForm" :rules="ruleForm">
          <Row type="flex" justify="space-between">
            <Col span="6">
            <FormItem label="操作名称 ： ">
              <Input v-model="operationListForm.name" type="text"></Input>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="操作URL ： ">
              <Input v-model="operationListForm.url" type="text"></Input>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="创建人 ： ">
              <Input v-model="operationListForm.creatorName" type="text"></Input>
            </FormItem>
            </Col>
            <Col span="6" class="text-right">
            <div class="btn-container">
              <Button type="primary" @click="searchList()">查询</Button>
              <Button style="margin-left: 8px" @click="clear">重置</Button>
            </div>
            </Col>
          </Row>
        </Form>
        <Row type="flex" justify="space-between">
          <Col span='24'>
          <div style="margin-bottom:20px;">
            <Button type="primary" @click="showAddmodal">新增</Button>
            <Button type="primary" @click="Alldelete" style="margin: 0 20px 0 8px">删除</Button>
            <span>选中上级节点：{{treelist}}</span>
          </div>
          <Modal v-model="Addmodal2" title="提示信息">
            <Form>
              <row>
                <FormItem>
                  <p style="font-size:14px;">请在左侧模块树选择节点</p>
                </FormItem>
              </row>
            </Form>
            <div slot="footer">
              <i-button type="primary" @click="Addmodal2=false">确定</i-button>
            </div>
          </Modal>
          <Modal v-model="Addmodal1" title="新增功能配置">
            <Form ref="data1">
              <row>
                <FormItem>
                  <p style="font-size:14px;">所属系统模块：{{treelist}}</p>
                </FormItem>
              </row>
              <Row>
                <Col>
                <FormItem>
                  <Table class="tableCommon" :data="tableData2" :columns="columns2"></Table>
                </FormItem>
                </Col>
              </Row>
            </Form>
            <div style="color: red">{{rateMsg}}</div>
            <div slot="footer">
              <i-button type="primary" @click="confirmModal">提交</i-button>
              <i-button @click="returnModal">返回</i-button>
            </div>
          </Modal>
          <Modal v-model="editmodal" title="编辑操作" width="500px">
            <Row>
              <Form :label-width="100">
                <Col span="18">
                <FormItem label="功能名称 ： ">
                  <Input type="text" v-model="updateOperationForm.name">
                  </input>
                </FormItem>
                </Col>
                <Col span="18">
                <FormItem label="操作URL ： ">
                  <Input type="text" v-model="updateOperationForm.url">
                  </input>
                </FormItem>
                </Col>
              </Form>
            </Row>
            <div slot="footer">
              <i-button type="primary" @click="editModalSubmit">确定</i-button>
              <i-button @click="editModalCancel">取消</i-button>
            </div>
          </Modal>
          <Modal v-model="AlldeleteModal" title="提示信息">
            <Form>
              <row>
                <FormItem>
                  <p style="font-size:14px;">请选择要删除的项</p>
                </FormItem>
              </row>
            </Form>
            <div slot="footer">
              <i-button type="primary" @click="AlldeleteModal=false">确定</i-button>
            </div>
          </Modal>
          <Modal v-model="removeModal" title="提示信息">
            <Form>
              <row>
                <FormItem>
                  <p style="font-size:14px;">删除后将会影响现有功能访问，您确定删除？</p>
                </FormItem>
              </row>
            </Form>
            <div slot="footer">
              <i-button type="primary" @click="saveDeletOperation">确定</i-button>
              <i-button type="primary" @click="cancelDeleteOperation">取消</i-button>
            </div>
          </Modal>
          <Table class="tableCommon" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange">
          </Table>
          <oil-page :total="total" :page-size="pageSize" :page-num="pageNum" @page-change="pageChange" :page-size-opts="pageSizeOpts"
            :show-sizer="showSizer">
          </oil-page>
          </Col>
        </Row>
      </Card>
      </Col>
    </Row>
    </Col>
  </Row>
</template>
<script>
  import OilPage from '../../components/page/page.vue';
  import { moduletree, operationListPage, operationdelete, getModelOperation, updateModelOperation, moduleOperationDisabled, operationInsert } from '../../components/axios/EAC.js'
  import { formData } from "../../../assets/js/common.js";
  export default {
    name: 'collocatedFunctions',
    components: {
      OilPage
    },
    data() {
      return {
        operationListForm: {
          creatorName: '',
          moduleCode: '',
          name: '',
          url: ''
        },
        updateOperationForm: {
          id: '',
          name: '',
          url: ''
        },
        moduleOperationId: 0,
        moduleOperationIds: [],
        total: 0,
        pageNum: this.$route.query.pageNum || 1,
        pageSize: Number(this.$route.query.pageSize) || 10,
        pageSizeOpts: [5, 10, 20, 30],
        showSizer: true,
        Addmodal1: false,
        Addmodal2: false,
        editmodal: false,
        AlldeleteModal: false,
        removeModal: false,
        datatree: [],
        treeData: this.$route.query.code || '000',
        treelist: '',
        name: 'collocatedFunctionsDetail',
        columns1: [
          {
            type: 'selection',
            title: '选择',
            align: 'center',
            width: 50,
          },
          {
            title: '操作名称',
            align: 'center',
            key: 'name',
            minWidth: 120
          }, {
            title: '操作对应URL',
            align: 'center',
            key: 'url',
            minWidth: 150
          }, {
            title: '创建人',
            key: 'creatorName',
            align: 'center',
            minWidth: 100
          }, {
            title: '创建时间',
            key: 'createTimeDesc',
            align: 'center',
            minWidth: 150
          }, {
            title: '禁用启用',
            key: 'disabledDesc',
            align: 'center',
            minWidth: 80,
            render: (h, data) => {
              let that = this
              return h('i-switch', {
                props: {
                  value: data.row.disabledDesc == "启用" ? true : false,
                },
                on: {
                  input: function (event) {
                    that.saveDisableOrNot(data, event)
                  }
                }
              })
            }
          }, {
            title: '操作',
            key: 'operation',
            align: 'center',
            minWidth: 120,
            render: (h, data) => {
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
                      this.$router.push({
                        name: 'collocatedFunctionsDetail',
                        query: {
                          id: data.row.id,
                          code: this.treeData,
                          pageNum: this.pageNum,
                          pageSize: this.pageSize
                        }
                      })
                      //this.showDetail(data)
                    }
                  }
                }, '详情'),
                h('span', {
                  style: {
                    marginRight: '8px',
                    cursor: 'pointer',
                    color: '#145edb',
                    textDecoration: 'underline'
                  },
                  on: {
                    click: () => {
                      this.edit(data.row.id)
                    }
                  }
                }, '编辑'),
                h('span', {
                  style: {
                    marginRight: '8px',
                    cursor: 'pointer',
                    color: 'red',
                    textDecoration: 'underline'
                  },
                  on: {
                    click: () => {
                      this.deleteModalBtn(data.row.id)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        tableData1: [{
          name: '编辑绩效-查询',
          url: '/lzreport/bjjx-query.htm',
          man: '吴非',
          time: "2018-07-16",
        }],
        ruleForm: {},
        columns2: [{
          title: '操作名称',
          key: 'name',
          align: 'center',
          minWidth: 100,
          render: (h, data) => {
            return h('div', [
              h('i-input', {
                props: {
                  value: data.row.name
                },
                on: {
                  'on-blur': (e) => {
                    this.tableData2[data.index].name = e.target.value
                  }
                }
              })
            ])
          }
        }, {
          title: '操作URL',
          key: 'url',
          align: 'center',
          minWidth: 100,
          render: (h, data) => {
            return h('div', [
              h('i-input', {
                props: {
                  value: data.row.url
                },
                on: {
                  'on-blur': (e) => {
                    let val=this.trim(e.target.value);                   
                    this.tableData2[data.index].url = val
                  }
                }
              })
            ])
          }
        }, {
          title: '操作',
          key: 'operation2',
          align: 'center',
          minWidth: 100,
          render: (h, data) => {
            if (this.tableData2.length > 1) {
              return h('div', [
                h('span', {
                  class: "icon-add",
                  style: {
                    float: "left",
                    marginTop: '7px'
                  },
                  on: {
                    click: () => {
                      this.addPower();
                    }
                  }
                }),
                h('div', {
                  style: {
                    marginRight: '8px',
                    cursor: 'pointer',
                    color: '#84AF2C',
                    float: 'left'
                  },
                  on: {
                    click: () => {
                      this.addPower();
                    }
                  }
                }, '增加'),
                h('span', {
                  class: "icon-remove",
                  style: {
                    float: "left",
                    marginTop: '7px'
                  },
                  on: {
                    click: () => {
                      this.removePower(data);
                    }
                  }
                }),
                h('div', {
                  style: {
                    marginRight: '8px',
                    cursor: 'pointer',
                    color: 'red',
                    float: "left",
                  },
                  on: {
                    click: () => {
                      this.removePower(data);
                    }
                  }
                }, '删除')
              ])
            } else {
              return h('div', [
                h('span', {
                  class: "icon-add",
                  style: {
                    float: "left",
                    marginTop: '7px'
                  },
                  on: {
                    click: () => {
                      this.addPower();
                    }
                  }
                }),
                h('div', {
                  style: {
                    marginRight: '8px',
                    cursor: 'pointer',
                    color: '#84AF2C',
                    float: 'left'
                  },
                  on: {
                    click: () => {
                      this.addPower();
                    }
                  }
                }, '增加')
              ])
            }
          }
        }],
        tableData2: [
          {
            name: '',
            url: '',
            moduleCode: '000'
          }
        ],
        rateMsg: ''
      }
    },
    created() {
      this.getList()
      this.getModuleTree()
    },
    methods: {
      //清除前后空格
      trim(s) {
        return s.replace(/(^\s*)|(\s*$)/g, "");
      },
      //查询
      searchList() {
        this.pageNum = 1;
        this.getList();
      },
      //获取列表信息
      getList() {
        this.$Spin.show()
        let form = {
          creatorName: this.operationListForm.creatorName,
          moduleCode: this.treeData,
          name: this.operationListForm.name,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          url: this.operationListForm.url
        }
        operationListPage(form).then(res => {
          if (res.response.total > 0) {
            this.tableData1 = res.response.list;
          } else {
            this.tableData1 = [];
          }
          this.total = res.response.total
          this.$Spin.hide()
        });
      },
      // 功能篇配置启用/禁用
      saveDisableOrNot(data, event) {
        let disabled = '';
        if (event) {
          disabled = 0;
        } else {
          disabled = 1;
        }
        let form = {
          disabled: disabled,
          moduleOperationId: data.row.id
        }
        moduleOperationDisabled(formData(form)).then(res => {
          this.getList();
        })
      },
      // 清空
      clear() {
        this.operationListForm.creatorName = ''
        this.operationListForm.url = ''
        this.operationListForm.name = ''
      },
      // 删除功能配置弹窗
      deleteModalBtn(moduleOperationId) {
        this.moduleOperationId = moduleOperationId;
        this.removeModal = true
      },
      // 删除功能配置
      saveDeletOperation() {
        let form = "moduleOperationIds[]=" + this.moduleOperationId
        operationdelete(form).then(res => {
          this.$Message.success("删除成功！！！");
          this.getList();
          this.removeModal = false;
        })
      },
      //批量删除删除选中的项
      Alldelete() {
        if (this.moduleOperationId.size <= 0) {
          this.AlldeleteModal = true;
        }
        else {
          this.saveDeletBatchOperation();
        }
      },
      //批量删除
      saveDeletBatchOperation() {
        let form = "moduleOperationIds[]=" + this.moduleOperationIds
        operationdelete(form).then(res => {
          this.$Message.success("删除成功！！！");
          this.getList();
          this.removeModal = false;
        })
      },
      // 取消删除功能配置
      cancelDeleteOperation() {
        this.removeModal = false
      },
      // table勾选框触发事件
      selectChange(selection) {
        let moduleOperationIds = selection.map(item => {
          return item.id
        })
        console.log(moduleOperationIds);
        this.moduleOperationIds = moduleOperationIds;
        this.selection = selection
      },
      // 编辑操作弹框
      edit(moduleOperationId) {
        this.editmodal = true;
        let form = {
          moduleOperationId: moduleOperationId
        }
        getModelOperation(form).then(res => {
          this.updateOperationForm.id = res.response.id
          this.updateOperationForm.name = res.response.name
          this.updateOperationForm.url = res.response.url
        })
      },
      // 编辑操作弹框保存
      editModalSubmit() {
        updateModelOperation(this.updateOperationForm).then(res => {
          this.$Message.success("修改成功！！！");
          this.getList();
          this.editmodal = false
        })
      },
      // 编辑操作弹框取消
      editModalCancel() {
        this.editmodal = false
      },
      // 监听分页
      pageChange(page, pageSize) {
        if (page) {
          this.pageNum = page
        }
        if (pageSize) {
          this.pageSize = pageSize
        }
        this.getList()
      },
      //获取树
      getModuleTree() {
        let that = this;
        moduletree().then(res => {
          that.datatree = that.moduleTreeDigui(res.response)
          console.log(res)
        })
      },
      //递归模块树
      moduleTreeDigui(data) {
        let dgData = data.map(item => {
          if (item.code == this.treeData) {
            this.treelist = item.label
          }
          return {
            title: item.label,
            id: item.id,
            value: item.code,
            expand: (item.code == this.treeData.substr(0, 3) || item.code == this.treeData.substr(0, 6) || item.code == this.treeData.substr(0, 9) || item.code == this.treeData.substr(0, 12) || item.code == this.treeData.substr(0, 15) || item.code == this.treeData.substr(0, 18) || item.code == this.treeData.substr(0, 21)) ? true : false,
            selected: item.code == this.treeData ? true : false,
            children: this.moduleTreeDigui(item.children)
          };
        });
        return dgData;
      },
      findlist(data) {
        if (data.length > 0) {
          this.treelist = data[0].title
          this.treeData = data[0].value
          this.tableData2[0].moduleCode = data[0].value
          this.getList()
        }
      },
      //显示弹层
      showAddmodal() {
        if (this.datatree != '') {
          this.Addmodal1 = true
        } else {
          this.Addmodal2 = true
        }

      },
      //新增按钮弹框内的提交和取消
      confirmModal() {
        this.$Spin.show();
        this.rateMsg = "";
        for (let i = 0; i < this.tableData2.length; i++) {
          if (this.tableData2[i].name == "") {
            this.rateMsg = "请输入第" + (i + 1) + "个功能配置的操作名称"
            this.$Spin.hide();
            return false;
          }
          if (this.tableData2[i].url == "") {
            this.rateMsg = "请输入第" + (i + 1) + "个功能配置的操作URL"
            this.$Spin.hide();
            return false;
          }
        }
        let form = {
          moduleOperationInsertReqVOList: this.tableData2
        }
        operationInsert(form).then(res => {
          this.Addmodal1 = false;
          this.tableData2 = [
            {
              url: '',
              moduleCode: this.treeData,
              name: ''
            }
          ];
          this.$Message.success(res.message);
          this.getList();
          this.$Spin.hide();
        })
      },
      returnModal() {
        this.rateMsg = "";
        this.tableData2 = [
          {
            url: '',
            moduleCode: this.treeData,
            name: ''
          }
        ]
        this.Addmodal1 = false;
      },
      removePower(data) {
        this.tableData2.splice(data.index, 1)
      },
      addPower() {
        let power = {
          url: '',
          moduleCode: this.treeData,
          name: ''
        }
        this.tableData2.push(power)
      }
    }
  }
</script>