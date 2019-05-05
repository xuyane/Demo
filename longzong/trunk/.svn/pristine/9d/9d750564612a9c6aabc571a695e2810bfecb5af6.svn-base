<template>
  <Modal v-model="showModal"  title="查看行业类型" @on-ok="doEdit" :loading="loading" @on-cancel="doCancel" width="550">
    <Form ref="editModal" :model="form" :rules="editRules" :label-width="200">
      <FormItem label="行业类型编码"  >
          <!-- v-if='form.superior' -->
        <span>{{form.code}}</span>
      </FormItem>
      <FormItem label="行业类型路径" >
        <span>{{form.path}}</span>
      </FormItem>
      <FormItem label="全拼" >
        <span>{{form.fullpinyin}}</span>
      </FormItem> 
      <FormItem label="简拼" >
        <span>{{form.simplepinyin}}</span>
      </FormItem>
      <FormItem label="英文名" >
        <span>{{form.Englishname}}</span>
      </FormItem>
      <FormItem label="日文名" >
        <span>{{form.Japanname}}</span>
      </FormItem>  
      <FormItem label="关键字" >
        <span>{{form.keyword}}</span>
      </FormItem> 
    </Form>
  </Modal>
</template>
<script>
export default {
  name: 'checktypeModal',
  props: {
    showCheckModal: Boolean,
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
    
  },
  watch: {
    showCheckModal (newVal, oldVal) {
        console.log(newVal,oldVal)
      this.showModal = newVal
    },
    
  },
  mounted () {
    
  }
}
</script>
