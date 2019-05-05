<style scoped>
</style>
<template>
    <Modal v-model="showModal" class="talkwrap" width="365">
        <p slot="header" class='result_t'>提示信息</p>
        <p class="msgcont">{{msgContent}}</p>
        <div slot="footer">
            <i-button type="primary" @click="confirm">确定</i-button>
            <i-button @click="cancel">取消</i-button>
        </div>
    </Modal>
</template>

<script>
import axios from "axios";
export default {
  // 接受父组件的值
  props: {
    msgContent: String,
    cid: Number,
    cType: Number,
    enableUrl: String,
    disableUrl: String
  },
  data() {
    return {
      issure: {},
      showModal: false
    };
  },
  methods: {
    confirm() {
      var that = this;
      var type = this.cType;
      var enableUrl = this.enableUrl;
      var disableUrl = this.disableUrl;
      var params = new URLSearchParams();
        params.append("id", this.cid);
      if (type == 0) {
         axios
              .post(disableUrl, params)
              .then(function(res) {
                if (res.data.status == 200) {
                  that.$Message.info({
                    content: "禁用成功",
                    duration: 3
                  });
                  //that.search();
                } else {
                  that.$Message.warning(res.data.message);
                }
              });
      } else if (type == 1) {
        axios
              .post(enableUrl, params)
              .then(function(res) {
                if (res.data.status == 200) {
                  that.$Message.info({
                    content: "启用成功",
                    duration: 3
                  });
                } else {
                  that.$Message.warning(res.data.message);
                }
              });
      }
      setTimeout(() => {
        that.$emit('query');
        
      }, 3100);
        that.showModal = false;
     
    },
    cancel() {
      this.showModal = false;
    }
     
  }
};
</script>

