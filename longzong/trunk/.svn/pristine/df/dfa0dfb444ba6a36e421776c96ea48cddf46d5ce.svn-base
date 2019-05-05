<style lang="less" scoped>

</style>
<template>
<Row>
  <Form :model="productForm" :label-width="80">
    <!-- <Row>
      <Col span="24">
        <FormItem label="产品说明书:">
          <Button type="primary" style="width:190px">预览</Button>
        </FormItem>
      </Col>
    </Row> -->
    <Row>
      <Col span="24">
        <FormItem label="上传附件:">
          <Upload
            :before-upload = "handleUpload"
            :data = "form"
            :default-file-list = "productForm.attachList"
            :on-success = "uploadSuccess"
            :on-preview = "getUrl"
            :on-remove = "removeUrl"
            :max-size = 2048
            action="/product/product/updateAtta">
            <Button style="width:190px">
              <b class="icon-add2">+</b>
              <span>点击上传</span>
            </Button>
          </Upload>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="20">
        <FormItem label="产品备注:">
          <Input v-model="productForm.tips" :autosize="{minRows: 5,maxRows: 5}" type="textarea" placeholder="请输入产品备注"></Input>
        </FormItem>
      </Col>
    </Row>
  </Form>
</Row>
</template>
<script>
import { urlHead } from '../../assets/js/common.js'
export default {
  props: ['listData'],
  data () {
    return {
      productData: '',
      productForm: {
        tips: '',
        attachList: []
      },
      form: {
        uploadFile: ''
      }
    }
  },
  watch: {
    listData(newVal, oldVal) {
      this.productData = newVal
      this.productForm.tips = this.productData.productNote
      this.productForm.attachList = this.productData.attachList.map(item => {
        return {
          name: item.attaName,
          url: item.url
        }
      })
    }
  },
  methods: {
    //上传文件
    handleUpload (file){
      console.log('test',file)
      if(file.size > 2000000){
        this.$Message.warning("单个上传文件大小不超过2M");
        return false;
      }else if(this.productForm.attachList.length > 9){
        this.$Message.warning("上传文件不能超过10个");
        return false;
      }else {
        this.form.uploadFile = file;
      }
    },
    //上传成功后调用
    uploadSuccess (response){
      let uploadMes = {
        name: response.response.attachName,
        url: response.response.attachUrl
      }
      this.productForm.attachList.push(uploadMes)
    },
    //点击上传成功后的文件地址
    getUrl (data){
      console.log(data)
    },
    //点击删除文件地址
    removeUrl (file, fileList){
      let attachArr = [];
      if(fileList.length > 0){
        for (let i = 0; i < fileList.length; i++) {
          let uploadMes = {
            name: fileList[i].name,
            url: fileList[i].url
          }
          attachArr.push(uploadMes)
        }
        this.productForm.attachList = attachArr
      }else {
        this.productForm.attachList = []
      }
      console.log(this.productForm.attachList)
    }
  }
}
</script>
