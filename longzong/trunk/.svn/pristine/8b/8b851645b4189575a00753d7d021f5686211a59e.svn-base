<style lang="less" scoped>
    .my-account-out .my-customer-top {
        padding-left:15px !important;
    }
    .mar-top-20 {
        margin-top: 20px;
    }
    .btn-text {
        text-align: right;
        padding: 30px 0px 0px 0;
        span {
        margin-left: 20px;
        }
        i {
        font-style: normal;
        }
    }
    .my-account-conter {
        background: #fff;
    }
    .p-text {
        text-align: center;
    }
    .mar-left-36 {
        margin-left: 36px;
    }
    .margin-bottom-20 {
        margin-bottom: 20px;
    }
    .file-box{
        position:relative;
        width:340px
    }
    .txt{
        height:36px;
        border: 1px solid #605f5f;
        width:180px;
        padding-left: 10px;
        margin-left: 14px;
    }
    .btn{
        background-color:#FFF;
        border: 1px solid #605f5f;
        height:36px;
        width:66px;
    }
    .file{
        position:absolute;
        top:0; right:80px;
        height:36px;
        opacity:0;
        width:260px;
        cursor: pointer;
    }
</style>


<template>
   <Row class="my-account-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;系统平台&nbsp;&nbsp;>>&nbsp;&nbsp;平台分组
      </Row>
    </Col>
    <Col span="24" class="search-form">
      <Row class="my-customer-top mar-b-20">
          <top-account></top-account>
      </Row>
      <Form ref="addForm"  :label-width="70" >
          <Row type="flex" justify="space-between">
              <Col span="5">
                  <FormItem label="平台:">
                      <Input  class="search-input" v-model="form.name"></Input>
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
    <Modal v-model="showModal"  title="添加平台" @on-ok="doAdd" :loading="loading" @on-cancel="doCancel" width="570">
      <Form ref="addForm" :model="addForm" :rules="addRules" :label-width="120">
        <FormItem label="平台名称" prop="name"  >
          <Input v-model="addForm.name" class="search-input" placeholder="请输入平台名称"></Input>
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
  name: 'systemGroup',
  components: {
    topAccount
  },
  data () {
    return {
      addRules: {
        name: [{
          required: true, message: '请输入平台名称', trigger: 'blur'
        }]
      },
      form: {
        name: '' // 平台名称
      },
      addForm:{
        name: ''
      },
      loading: true,
      showModal: false,
      showSizer: true,
      columns: [{
        key: 'value',
        align: 'center',
        title: '编号'
      }, {
        key: 'desc',
        align: 'center',
        title: '名称'
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
        name: this.form.name
      }
      let _this = this
      axios({
        url:'/mysteel/workflow/group/list',
        method: 'get',
        params: form
      }).then(function(resp) {
        statusZero(resp.data.status)
        _this.tableData = resp.data.data
      }).catch(function(err) {
        _this.$Message.warning(err.message)
      })
    },
    reset () {
      this.form = {
        name: '' // 电话号码
      }
    },
    deleteData (data) {
      let _this = this
      var config = {
        title: '删除',
        content: '是否确认要删除?',
        onOk: function() {
          axios({
            url: '/mysteel/workflow/group/delete',
            method: 'get',
            params: {
              id:data.row.value
            }
          }).then(function(resp) {
            statusZero(resp.data.status)
            if (resp.status == '200') {
                if(resp.data.status=='200'){
                    _this.$Message.success("操作成功")
                    _this.loading = false
                    _this.showModal = false
                    _this.query()
                }else{
                  _this.$Message.warning(resp.data.message)
                }
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
            name: this.addForm.name
          }
          axios({
            url: '/mysteel/workflow/group/add',
            method: 'post',
            params: form
          }).then(function(resp) {
            statusZero(resp.data.status)
            if (resp.status == '200') {
                if(resp.data.status=='200'){
                    _this.$Message.success("操作成功")
                    _this.loading = false
                    _this.showModal = false
                    _this.query()
                }else{
                  _this.$Message.warning(resp.data.message)
                }
            } else {
              _this.$Message.warning(resp.message)
            }
          }).catch(function(err) {
            console.log(err)
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
    }
  },
  mounted () {
    this.query()
  }
}
</script>
