  <style>
    #editor1{
      z-index:10;
    }
  </style>
<template>
  <div>
    <script id="editor1" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor1', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
     watch:{
      defaultMsg (newVal,oldVal){
        this.defaultMsg = newVal;
        console.log("html字符串",this.defaultMsg );
        this.editor.setContent(this.defaultMsg);
      }
    },
    destroyed() {
      this.editor.destroy();
    },
   
  }
</script>