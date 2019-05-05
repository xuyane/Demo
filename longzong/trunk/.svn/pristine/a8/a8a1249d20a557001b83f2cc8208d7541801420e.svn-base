<template>
  <div>
    <div :id="'toolbar'+index" class="toolbar"></div>
    <div :id="'editor'+index" class="text" ref="editorSelect" @dblclick="copyText"></div>
  </div>
</template>

<script>
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
export default {
  name: "Editor",
  props: {
    value: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    count: {
      type: Number,
      default: ""
    },
    valueType: {
      type: String,
      default: "html"
    }
  },
  data() {
    return {};
  },
  methods: {
    setHtml(val) {
      this.editor.txt.html(val);
    },
    getHtml() {
      return this.value;
      console.log(this.value)
    },
     // 复制
    copyText() {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.value = this.$refs.editorSelect.innerText;
      input.select();
      if (document.execCommand('copy')) {
         document.execCommand('copy');
         this.$Message.success("复制成功");
      }
      document.body.removeChild(input);
    }
  },
  mounted() {
    this.editor = new Editor("#toolbar" + this.index, "#editor" + this.index);
    this.editor.customConfig.onchange = html => {
      let text = this.editor.txt.text();
      this.$emit("on-change", html, text, this.index, this.type, this.count);
    };
    this.editor.create();
    if (this.value) {
      this.editor.txt.html(this.value);
    }
  }
};
</script>

<style scoped>
.toolbar {
  display: none;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
}
.text {
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  background: #ffffff;
}
.w-e-text-container{
  z-index:999 !important;
}
</style>
