<template>
  <div>
    <script id="editor2" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editorAdd: null
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
      this.editorAdd = UE.getEditor('editor2', this.config); // 初始化UE
      this.editorAdd.addListener("ready", function () {
        _this.editorAdd.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editorAdd.getContent()
      }
    },
    destroyed() {
      this.editorAdd.destroy();
    }
  }
</script>