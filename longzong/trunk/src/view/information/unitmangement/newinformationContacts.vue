<style lang="less" scoped>

</style>
<template>
  <!-- 新增联系人弹窗 -->
            <Modal v-model="newAddTaskInfo" title="新增信息单元" @on-ok="handleSubmit('taskformValidate')" @on-cancel="handleReset('taskformValidate')" width="750">
                <Form ref="taskformValidate" :model="taskformValidate"  :label-width="150">
                <Row type="flex" justify="space-between">
                  <Col span="24">
                    <FormItem label="信息单元名称" prop="name">
                        <Input v-model="taskformValidate.name" placeholder="请输入信息单元名称" style="width:100%"></Input>
                    </FormItem>
                  </Col>
                  <Col span="24">
                    <FormItem label="关联的信息分类" prop="info">
                      <Select
                          v-model="taskformValidate.informationTypeId"
                          filterable
                          remote
                          :remote-method="remoteMethod"
                          label-in-value
                          :loading="loading1" style="width:80%">
                          <Option v-for="option in options1" :value="option.value" :key="option.value">{{option.label}}</Option>
                      </Select>
                      <Button type="primary" @click="xuanzheInfo">选择关联</Button>
                  </FormItem>
                  </Col>
                </Row>

                </Form>
            </Modal>
   <!-- 新增联系人弹窗结束 -->
</template>
<script>
export default {
  name: 'newAddTaskInfo',
  props: {
      showEditModal: Boolean,
  },
  data(){
    return {
      loading1:false,
      options1:[],
      newAddTaskInfo:false,
      taskformValidate:{
        name:'',
        informationTypeId:'',

      },
      
    }
  },
  methods: {
    handleReset (){
      this.$emit("show-edit-modal",false)
    },
    handleSubmit(){
      this.$emit("show-edit-modal",false)
    },
    remoteMethod(){

    },
    xuanzheInfo(){

    },
  },
  watch:{
    showEditModal (newV, oldV){
        this.newAddInfo = newV
    }, 
  }
}
</script>

