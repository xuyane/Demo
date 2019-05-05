<style lang="less" scoped>
    .my-customer-top {
        padding-left:15px  !important;
    }
    .btn-text {
        text-align: right;
        span {
            margin-left: 20px;
        }
        i {
            font-style: normal;
        }
    }


</style>

<template>
   <Row class="my-account-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;系统平台&nbsp;&nbsp;>>&nbsp;&nbsp;域名规则
      </Row>
    </Col>
    <Col span="24" class="search-form">
      <Row class="my-customer-top mar-b-20">
          <top-account></top-account>
      </Row>
      <Form ref="addForm"  :label-width="70" >
          <Row type="flex" justify="space-between">
              <Col span="5">
                  <FormItem label="域名:">
                      <Input  class="search-input" v-model="form.domain"></Input>
                  </FormItem>
              </Col>
              <Col span="8">
                <Row type="flex" justify="space-between">
                  <Col span="24" class="mar-top-20 text-right margin-bottom-20">
                      <Button type="primary" @click="query">查询</Button>
                      <Button style="margin-left: 8px" @click="reset">重置</Button>
                  </Col>
                </Row>
              </Col>
          </Row>
      </Form>
    </Col>
    <Col span="24">
        <Row class-name="table-con">
            <Row>
                <Col class="btn-container" span="12">
                    <Button type="primary" class="search-btn" @click="addBlack">新增</Button>
                </Col>
            </Row>
            <Table :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">

            </Table>
        </Row>
    </Col>
    <Modal v-model="showModal"  title="添加域名规则" @on-ok="doAdd" :loading="loading" @on-cancel="doCancel" width="570">
      <Form ref="addForm" :model="addForm" :rules="addRules" :label-width="120">
        <FormItem label="正则" prop="regex"  >
          <Input v-model="addForm.regex" class="search-input" placeholder="请输入正则"></Input>
        </FormItem>
        <FormItem label="域名" prop="domain">
          <Input v-model="addForm.domain" class="search-input" placeholder="请输入域名"></Input>
        </FormItem>
      </Form>
    </Modal>
  </Row>
</template>

<script>
import topAccount from './contractTitle.vue';
import axios from 'axios';
import { statusZero } from '../../components/axios/workflow.js'
export default {
  name: 'systemDomain',
  components: {
    topAccount
  },
  data () {
    return {
      addRules: {
        regex: [{
          required: true, message: '请输入正则', trigger: 'blur'
        }],
        domain: [{
          required: true, message: '请输入域名', trigger: 'blur'
        }]
      },
      form: {
        domain:'' // 域名
      },
      addForm:{
        regex: '',// 正则
        domain: ''// 域名
      },
      loading: true,
      showModal: false,
      showSizer: true,
      columns: [{
        key: 'regex',
        align: 'center',
        title: '正则'
      }, {
        key: 'domain',
        align: 'center',
        title: '域名'
      },{
        title: '操作',
        align: 'center',
        width: 150,
        render: (h, data) => {
          return h('div', [
            h('a', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: () => {
                  this.deleteData(data)
                }
              }
            }, '删除 ')
          ])
        }
      }],
      tableData: []
    }
  },
  methods: {
    query () {
      let form = {
        domain: this.form.domain
      }
      let _this = this
      axios({
        url:'/mysteel/workflow/domain/list',
        method: 'get',
        params: form
      }).then(function(resp) {
        statusZero(resp.data.status)
        _this.tableData = resp.data
      }).catch(function(err) {
        _this.$Message.warning(err.message)
      })
    },
    reset () {
      this.form = {
        domain: '' // 域名
      }
    },
    deleteData (data) {
      let _this = this
      var config = {
        title: '删除',
        content: '是否确认要删除?',
        onOk: function() {
          axios({
            url: '/mysteel/workflow/domain/delete',
            method: 'get',
            params:{
                regex: data.row.regex
            }
          }).then(function(resp) {
            statusZero(resp.data.status)
            if (resp.status == '200') {
              _this.query()
            } else {
              _this.$Message.warning(resp.message)
            }
          }).catch(function(err) {
            _this.$Message.warning(err.message)
          })
        },
        onCancel: () => {
          this.$Message.info("取消操作");
        }
      }
      this.$Modal.confirm(config)
    },
    addBlack () {
      this.showModal = true
    },
    doCancel () {

    },
    doAdd () {
      let _this = this
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          // 校验通过
          let form = {
            regex: this.addForm.regex,
            domain: this.addForm.domain
          }
          axios({
            url: '/mysteel/workflow/domain/add',
            method: 'post',
            params: form
          }).then(function(resp) {
            statusZero(resp.data.status)
            if (resp.status == '200') {
                _this.$Message.success(resp.data.message)
                _this.loading = false
                _this.showModal = false
                _this.query()
                // if(resp.data != ""){
                //     _this.$Message.warning(resp.data.error)
                // }else{
                //     _this.loading = false
                //     _this.showModal = false
                //     _this.query()
                // }
            } else {
              _this.$Message.warning(resp.message)
            }
          }).catch(function(err) {
            _this.$Message.warning(err.message)
          })
          setTimeout(function () {
            _this.loading = false
            _this.$nextTick(() => {
              _this.loading = true
            })
          }, 1)
        } else {
          setTimeout(function () {
            _this.loading = false
            _this.$nextTick(() => {
              _this.loading = true
            })
          }, 1)
        }
      })
    },
   pageChange (page, pageSize) {
      //分页
      this.pageNum = page
      this.pageSize = pageSize
      this.query()
    }
  },
  mounted () {
    this.query()
  }
}
</script>
