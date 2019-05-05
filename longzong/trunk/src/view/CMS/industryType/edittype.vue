<template>
  <Modal v-model="showModal"  title="修改行业类型" @on-ok="doEdit" :loading="loading" @on-cancel="doCancel" width="550">
    <Form ref="editModal" :model="form" :rules="editRules" :label-width="120">
      <FormItem label="上级行业类型"  >
          <!-- v-if='form.superior' -->
        <span>{{form.superior}}</span>
      </FormItem>
      <FormItem label="行业类型名称" prop='name'>
        <Input v-model="form.name" placeholder="请输入行业类型名称"></Input>
      </FormItem>
      <FormItem label="全拼" >
        <Input v-model="form.fullpinyin" ></Input>
      </FormItem> 
      <FormItem label="简拼" >
        <Input v-model="form.simplepinyin" ></Input>
      </FormItem>
      <FormItem label="英文名" >
        <Input v-model="form.Englishname" ></Input>
      </FormItem>
      <FormItem label="日文名" >
        <Input v-model="form.Japanname" ></Input>
      </FormItem>
      <FormItem label="关键字" >
        <Input v-model="form.keyword" ></Input>
      </FormItem>  
    </Form>
  </Modal>
</template>
<script>
export default {
  name: 'edittypeModal',
  props: {
    showEditModal: Boolean,
    editData: Object
  },
  data () {
    return {
      editRules: {
        
      },
      showModal: false,
      loading: true,
      isShowPhone: false,
      isChangeOk: false,
      form: {
          online:'需要登录',
          authorize:'需要授权',
          commonmsg:'公共信息'
      },
      //serviceProvider: '',
      locationId: '',
      isChooseUser: false,
      phoneArray: [],   //使用人员手机号list
      userList: []  ,//使用者list
      editRules:{
          name:[
              {required: true, message: '行业类型名称不能为空', trigger: 'blur'}
          ]
      }
    }
  },
  methods: {
    doEdit () {
      let _this = this
      _this.loading = false;
      _this.$emit('hide-modal')

    },
    doCancel () {
      this.$emit('hide-modal')
      this.$refs.editModal.resetFields()
    },
    showPhone () {
      if (!this.isChangeOk) {
        this.isShowPhone = false
        this.form.transferCellphone = '0'
        return false
      }
      if (this.form.transferCellphone === '1') {
        this.isShowPhone = true
      } else {
        this.isShowPhone = false
      }
    },
    changeUser () {
      if (this.form.employeeName === '') {
        this.userList = []
        this.isChangeOk = false
        this.form.transferCellphone = '0'
        this.isShowPhone = false
        return false
      }
      let data = 'name=' + this.form.employeeName + '&pageSize=10'
      let _this = this
      axios({
        url: '/oa//base-platform/employee/page',
        method: 'post',
        data: data
      }).then(function(resp) {
        _this.userList = resp.data.response.list
      }).catch(function(err) {
        
      }) 
    },
    chooseUser (data) {
      let _this = this
      this.isChooseUser = true
      this.form.employeeName = data.name
      this.form.employeeId = data.id 
      this.form.cellphoneNumber = data.mobile
      this.phoneArray = this.form.cellphoneNumber.split(',')
      this.userList = []
      if (this.form.employeeName !== '') {
        this.isChangeOk = true
      } else {
        this.isChangeOk = false
        this.form.transferCellphone = '0'
        this.isShowPhone = false
      }
      var time1 = setTimeout(function() {
        _this.isChooseUser = false
      }, 500)
    },
    hideChoose () {
      let _this = this
      var time2 = setTimeout(function() {
        if (_this.isChooseUser) {
          return false
        }
        _this.userList = []
        _this.isChangeOk = false
        _this.form.transferCellphone = '0'
        _this.isShowPhone = false
      }, 400)
    },
    setForm () {
      this.form = Object.assign({}, this.editData)
    }
  },
  watch: {
    showEditModal (newVal, oldVal) {
      this.showModal = newVal
    },
    editData (newVal, oldVal) {
      this.form = Object.assign({}, newVal)
      this.form.transferCellphone += ''
      if (this.form.employeeName !== '' && this.form.employeeName !== null && this.form.employeeName !== undefined) {
        this.isChangeOk = true;
      }
      if (this.form.transferCellphone === '1') {
        this.isShowPhone = true
      }
      //转换服务商
      //this.serviceProvider = this.form.serviceProvider === 1 ? '电信' : (this.form.serviceProvider === 2) ? '移动' : (this.form.serviceProvider === 3) ? '联通' : ''
      //转换归属地
      this.locationId = this.form.locationId === 1 ? '张店' : (this.form.locationId === 2) ? '临淄' : (this.form.locationId === 3) ? '上海' : ''
    }
  },
  mounted () {
    
  }
}
</script>
