<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;系统配置&nbsp;&nbsp;>>&nbsp;&nbsp;标签管理
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form ref="formItem" :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="名称:">
              <Input clearable v-model="formItem.name" class="search-input" placeholder="请输入模板名称"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="编码:">
              <Input clearable v-model="formItem.code" class="search-input" placeholder="请输入编码"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="类型:">
              <Select v-model="formItem.type" class="search-input" placeholder="请选择类型">
                <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="状态:">
              <Select v-model="formItem.status" class="search-input" placeholder="请选择状态">
                <Option v-for="item in statuses" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <FormItem>
              <Button type="primary" @click="getListPage">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="addTab">新增标签</Button>
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
    <Modal
      :title="title"
      v-model="showModal"
      @on-cancel="cancel">
      <Form ref="editForm" :model="editForm" :rules="ruleForm" :label-width="60">
        <Row type="flex" justify="space-between">
          <Col span="24">
            <FormItem label="名称:" prop="name">
              <Input clearable v-model="editForm.name" class="search-input" placeholder="请输入名称"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="编码:" prop="code">
              <Input clearable v-model="editForm.code" class="search-input" placeholder="请输入编码"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="类型:" prop="type">
              <Select v-model="editForm.type" class="search-input" placeholder="请选择类型">
                <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="状态:" prop="status">
              <Select v-model="editForm.status" class="search-input" placeholder="请选择状态">
                <Option v-for="item in statuses" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="addOk">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>
<script>
import OilPage from '../../../components/page/page.vue'
import {
  getConfigList,
  saveConfig,
  updateConfig,
  disabledConfig,
  enableConfig,
  getConfigInfo,
  deleteConfig
} from '../../../components/axios/crm'
import { formData, formatTime2, formatType } from '../../../../assets/js/common';
export default {
  data() {
    return {
      spinShow:false,
      showModal: false,
      title: '',
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      tableData: [],
      addOrEdit: '',
      columns: [
        {
          key: 'name',
          title: '名称',
          minWidth: 160
        },
        {
          key: 'code',
          title: '编码',
          minWidth: 160
        },
        {
          key: 'type',
          title: '类型',
          minWidth: 160,
          render: (h, data) => {
            return h('div', data.row.type === 1 ? '短信' : '合同')
          }
        },
        {
          key: 'status',
          title: '状态',
          minWidth: 160,
          render: (h, data) => {
            return h('span', data.row.status === 1 ? '可用' : '不可用')
          }
        },
        {
          key: 'creatorName',
          title: '创建人',
          minWidth: 160
        },
        {
          key: 'createTime',
          title: '创建时间',
          minWidth: 160,
          render: (h, data) => {
            return h('span', data.row.createTime ? formatTime2(data.row.createTime) : '')
          }
        },
        {
          title: '操作',
          minWidth: 160,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer',
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.title = '修改标签'
                    this.edit(data)
                  }
                }
              }, '修改'),
              h('span', {
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer',
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.changeStatus(data.row)
                  }
                }
              }, data.row.status === 1 ? '禁用' : '启用'),
              h('span', {
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer',
                },
                on: {
                  click: () => {
                    this.delete(data.row)
                  }
                }
              }, '删除'),
            ])
          }
        },
      ],
      formItem: {
        name: '',
        code: '',
        type: '',
        status: ''
      },
      editForm: {
        name: '',
        code: '',
        type: null,
        status: null
      },
      ruleForm: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        type: [
          { required: true, type: 'number', message: '请输入类型', trigger: 'change' }
        ],
        status: [
          { required: true, type: 'number', message: '请输入状态', trigger: 'change' }
        ],
      },
      statuses: [
        {
          value: 1,
          desc: '可用'
        },
        {
          value: 0,
          desc: '不可用'
        }
      ],
      types: [
        {
          value: 1,
          desc: '短信'
        },
        {
          value: 2,
          desc: '合同'
        }
      ]
    }
  },
  components: {
    OilPage
  },
  created() {
    this.getListPage()
  },
  methods: {
    // 获取列表
    getListPage() {
      this.spinShow=true;
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        name: this.formItem.name || '',
        code: this.formItem.code || '',
        type: this.formItem.type || '',
        status: formatType(this.formItem.status)
      }
      let that=this;
      // Object.assign(params, this.formItem)
      getConfigList(formData(params)).then(res => {
        that.spinShow=false;
        this.tableData = res.response.list
        this.total = res.response.total
      })
    },
    addTab() {
      this.title = '新增标签'
      this.showModal = true
      this.addOrEdit = 'add'
    },
    // 修改标签
    edit(data) {
      this.addOrEdit = 'edit'
      this.showModal = true
      this.spinShow=true;
      let that=this;
      getConfigInfo(data.row.id).then(res => {
        that.spinShow=false
        let data = res.response
        this.editForm = {
          id: data.id,
          name: data.name,
          code: data.code,
          type: data.type,
          status: data.status
        }
      })
    },
    // 启用/禁用
    changeStatus(data) {
      let that=this;
      this.$Modal.confirm({
        title: '提示信息',
        content: '确定' + (data.status === 1 ? '禁用' : '启用') + `【${data.name}】吗？`,
        onOk: () => {
          this.spinShow=true;
          if(data.status === 1) {
            disabledConfig(data.id).then(res => {
              that.spinShow=false;
              this.$Message.success('禁用成功')
              this.getListPage()
            })
          } else {
            enableConfig(data.id).then(res => {
              that.spinShow=false
              this.$Message.success('启用成功')
              this.getListPage()
            })
          }
        },
        onCancel: () => {
          
        }
      });
    },
    // 删除
    delete(data) {
      this.$Modal.confirm({
        title: '提示信息',
        content: `确定删除【${data.name}】吗？`,
        onOk: () => {
          let params = "ids[]=" + data.id
          deleteConfig(params).then(res => {
            this.$Message.success('删除成功')
            this.getListPage()
          })
        },
        onCancel: () => {
          
        }
      });
    },
    addOk() {
      let that=this;
      this.$refs.editForm.validate(valid => {
        if(valid) {
          this.spinShow=true;
          if(this.addOrEdit === 'add') {
            saveConfig(this.editForm).then(res => {
              that.spinShow=false
              this.$Message.success('新增成功')
              this.showModal = false
              this.getListPage()
            })
          } else {
            updateConfig(this.editForm).then(res => {
              that.spinShow=false
              this.$Message.success('修改成功')
              this.showModal = false
              this.getListPage()            
            })
          }
        } else {
          this.showModal = true
        }
      })
    },
    cancel() {
      this.showModal = false
      this.$refs.editForm.resetFields()
    },
    reset() {
      this.formItem = {}
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
  }
}
</script>
