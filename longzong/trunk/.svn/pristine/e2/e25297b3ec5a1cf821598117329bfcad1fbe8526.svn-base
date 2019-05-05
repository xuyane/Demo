<style lang="less" scoped>
    @import './image-editor.less';
</style>
<template>
  <Row :gutter="10" class-name="image-editor">
    <Col :lg="12" :md=24>
      <Card>
        <p slot="title" >
          基础实例
        </p>
        <Row :gutter="10">
          <Col span="14" class="image-editor-con1">
            <Row class-name="cropper">
              <img id="imageCropper1" alt="">
            </Row>
          </Col>
          <Col span="10" class="image-editor-con1">
            <Row type="flex" justify="center" align="middle" class="image-editor-con1-preview-con">
              <div id="preview1"></div>
            </Row>
            <div class="image-editor-con1-btn-con">
              <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="chooseImage" id="fileinput1" class="fileinput" />
              <label class="filelabel" for="fileinput1"><Icon type="image"></Icon>&nbsp;选择图片</label>
              <span><Button @click="handlecrop1" type="primary" icon="crop">裁剪</Button></span>
              <span><Button @click="download" type="primary" icon="arrow-down-a">下载</Button></span>
              <span><Button @click="send" type="primary" icon="arrow-down-a">测试</Button></span>
            </div>
            <Modal v-model="option1.showCropedImage">
              <p slot="header">预览裁剪之后的图片</p>
              <img :src="option1.cropedImg" alt="" v-if="option1.showCropedImage" style="width: 100%;">
            </Modal>
          </Col>
      </Row>
      </Card>
    </Col>
    <Col :lg="12" :md=24>
      2
    </Col>
  </Row>
</template>

<script>
import Cropper from 'cropperjs'
import './cropper.min.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      cropper: '',
      url: '',
      option1: {
        showCropedImage: false,
        cropedImg: ''
      }
    }
  },
  mounted () {
    let img1 = document.getElementById('imageCropper1')
    this.cropper1 = new Cropper(img1, {
      dragMode: 'move',
      preview: '#preview1',
      restore: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      toggleDragModeOnDblclick: false
    })
  },
  methods: {
    chooseImage (e) {
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.onload = () => {
        this.cropper1.replace(reader.result)
        reader.onload = null
      }
      reader.readAsDataURL(file)
    },
    handlecrop1 () {
      let file = this.cropper1.getCroppedCanvas().toDataURL()
      this.option1.cropedImg = file
      this.option1.showCropedImage = true
    },
    download () {
      let file = this.cropper1.getCroppedCanvas().toDataURL()
      let a = document.createElement('a')
      let event = new MouseEvent('click')
      a.download = name || '下载图片名称'
      a.href = file
      a.dispatchEvent(event)
    }
  }
}
</script>
