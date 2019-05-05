<style lang="less" scoped>
  .deploy{
    .breadcrumb{
      font-size:14px;color:#605f5f;margin-bottom:20px;
    }
    .form_wrap{
      width: 618px;
      margin: 0 auto;

      .publish_btn{
        text-align: right;
      }

      .item_control{
        width: 525px;

        .check_btn{
          background-color: #28b3d3;
          border-color: #28b3d3;
          color: #fff;
        }
      }
    }
  }
</style>


<template>
   <div class="deploy">
     <Row class-name='breadcrumb'>
       <Col span="24">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;流程设计&nbsp;&nbsp;>>&nbsp;&nbsp;流程部署
       </Col>
     </Row>
     <Card>
            <h1 slot="title">部署zip文件</h1>
            <Alert type="error">温馨提示： 流程定义KEY不能重复，如果不是升级，不可覆盖其他平台流程定义！</Alert>
            <div class="form_wrap">

              <Form ref="deploy_form" :model="formValue" :rules="ruleValidate">
                 <FormItem label="流程KEY：" prop="key">
                    <Input class='item_control' v-model="formValue.key">
                      <span slot="append"><Button type="primary" size='large' class="check_btn" @click="checKey">检测</Button></span>
                    </Input>
                    <Alert type="info" style="margin-top:10px;" v-show="formValue.key && checkResult.text">{{checkResult.text}}</Alert>
                 </FormItem>
                 <FormItem label="系统平台：" prop="sysId">
                    <Select class='item_control' v-model="formValue.sysId">
                      <Option :value="item.value" v-for="item in groupList" :key="item.value">{{item.desc}}</Option>
                    </Select>
                 </FormItem>
                 <FormItem label="上传ZIP：" prop="file">
                   <!-- :on-success = "uploadSuccess"-->
                    <Upload :format="['zip']"
                    :before-upload="handleUpload"
                    :action="filepath">
                        <Input class='item_control' :value="formValue.file.name">
                          <span slot="prepend"><Button size="large" icon="ios-cloud-upload-outline">选择文件</Button></span>
                        </Input>
                    </Upload>
                 </FormItem>

                 <FormItem class="publish_btn">
                    <Button type="success" @click="publish">发布流程</Button>
                 </FormItem>
              </Form>
            </div>
        </Card>
   </div>
</template>



<script>
import axios from 'axios'
import { statusZero } from '../../components/axios/workflow.js'
export default {
  name: 'deploy',
  data(){
    return {
      filepath: '/mysteel/workflow/process/add',
      selectedFile: {},

      // 平台列表
      groupList: [],

      // key检测结果
      checkResult: {
        status: false,
        text: null
      },


      formValue: {
        key: '',
        sysId: '',
        file: {}
      },
      ruleValidate: {
        key: [
          { required: true, message: '此项必填', trigger: 'blur' }
        ],
        sysId: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        file: [{required: true}]
      }
    }
  },

  created(){
    this.$Spin.show();
    this.getGroupList();
  },


  methods: {
    // 检测流程key
    checKey(){
      const val = this.formValue.key;
      if (!val) return;

      axios.get('/mysteel/workflow/process/is_exist', {
        key: val
      }).then(res => {
        statusZero(res.data.status)
        if(res.data.data.length > 0) {
          this.checkResult.status = false;
          this.checkResult.text = `${val}已存在，请谨慎使用`;
        }else{
          this.checkResult.status = true;
          this.checkResult.text = `恭喜，您可以使用${val}`;
        }
      })
    },


    // 发布
    publish(){
      this.$refs['deploy_form'].validate(valid => {
        if(valid && this.formValue.file.name) {

          const formData = new FormData();
          for (const attr in this.formValue){
            formData.append(attr, this.formValue[attr]);
          }

           axios.post('/mysteel/workflow/process/add', formData, {
             headers: {'Content-Type': 'multipart/form-data'}
           }).then(resp => {
              statusZero(resp.data.status)
                if(resp.data.url){
                  this.$Message.success({
                    content: '发布成功',
                    duration: 3
                  })
                }else {
                  this.$Message.error({
                    content: '发布失败',
                    duration: 3
                  });
                }
           });
        }
      });
    },

    handleUpload(file){
      var firstN = file.name.indexOf('.');
      var lastN = file.name.length;
      var FileName = file.name.substring(firstN,lastN)
      if ( FileName === '.zip'){
        this.formValue.file = file;
      }

      return false;
    },

    uploadSuccess(response){
      console.log(response);
    },

    // 获取平台列表
    getGroupList(){
      axios.get('/mysteel/workflow/group/list').then(resp => {
        statusZero(resp.data.status)
                this.groupList = resp.data.data;
                 this.$Spin.hide();
            });
    }
  }
}
</script>


