<template>
  <Row>
    <Select
      v-model="model"
      clearable
      ref="select"
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="loading"
      @on-clear="clearModal"
      @on-change="changeModal"
      label-in-value
    >
      <Option
        v-for="(option, index) in itemList"
        :value="option.value"
        :key="index"
      >{{option.label}}</Option>
    </Select>
  </Row>
</template>

<script>
import axios from "axios";
export default {
  name: "associateSearch",
  props: {
    dataUrl: String,
    ajaxType: String,
    keyword: String,
    extraData: Object,
    modelVal: "",
    modelLabel: ""
  },
  data() {
    return {
      model: "",
      loading: false,
      itemList: [],
      sessionzhi: ""
    };
  },
  methods: {
    //从父组件传入的数据回显到输入框
    getData(data) {
      let that = this;
      let name = "";
      let params = new URLSearchParams();
      params.append("name", data);
      axios({
        url: this.dataUrl,
        method: "post",
        data: params
      })
        .then(resp => {
          if (resp.data.status === "200") {
            const list = resp.data.response.map(item => {
              return {
                value: item.id,
                label: item.text
              };
            });
            that.itemList = list;
            that.model = list[0].value;
          } else {
            that.$Message.warning("无数据");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //清空组件里面的值
    queryChange(val) {
      if (!val) {
        this.model = null;
      }
    },
    remoteMethod(query) {
      this.loading = true;

      let params = {
        [this.keyword]: query
      };

      if (this.extraData) {
        for (let one in this.extraData) {
          params[one] = this.extraData[one];
        }
      }

      axios({
        url: this.dataUrl,
        method: this.ajaxType,
        params: params
      })
        .then(resp => {
          if (resp.data.status === "200") {
            const list = resp.data.response.map(item => {
              return {
                value: item.id,
                label: item.name
              };
            });

            this.itemList = list;
          } else {
            this.$Message.warning("无数据");
          }
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
        });
    },
    changeModal(data) {
      this.$emit("query-list", data);
    },
    clearModal() {
      let clearData = {};
      // clearData.label = "";
      // clearData.value = "";
      this.$emit("query-list", clearData);
    }
  },
  watch: {
    modelVal(newVal) {
      this.model = newVal;
    },
    modelLabel(newVal) {
      this.remoteMethod(newVal);
    }
  }
};
</script>

