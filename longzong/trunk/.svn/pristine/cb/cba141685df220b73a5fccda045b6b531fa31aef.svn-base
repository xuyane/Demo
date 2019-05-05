<template>
  <div>
    <script :id="'editor'+index" type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: "UE",
  data() {
    return {
      editorAdd: null
    };
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  mounted() {
    const _this = this;
    this.editorAdd = UE.getEditor("editor" + this.index, this.config); // 初始化UE
    this.editorAdd.addListener("ready", function() {
      _this.editorAdd.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
    });
    _this.editorAdd.addListener("contentChange", function() {
      var newContent = _this.editorAdd.getContentTxt();
      var obj = {
        index: _this.index,
        content: newContent
      };
      if (_this.defaultMsg !== newContent) {
        _this.$emit("contentChanged", obj);
      }
    });
  },
  methods: {
    getUEContent() {
      return this.editorAdd.getContent();
    },
    getContentTxt() {
      return this.editorAdd.getContentTxt();
    },
    resetContent(val) {
      this.editorAdd.setContent(val);
    }
  },
  destroyed() {
    this.editorAdd.destroy();
  }
};
</script>