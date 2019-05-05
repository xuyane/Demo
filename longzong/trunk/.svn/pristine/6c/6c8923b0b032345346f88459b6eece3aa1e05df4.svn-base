<style lang="less" scoped>
</style>

<template>
  <Row>
    <Select v-model="model" filterable remote :remote-method="remoteMethod" :loading="loading" @on-change="changeModal" label-in-value>
      <Option v-for="(option, index) in itemList" :value="option.value" :key="index">{{option.label}}</Option>
    </Select>
  </Row>
</template>

<script>
import axios from "axios";
export default {
  name: "associateSearch",
  props: {
    dataUrl: String
  },
  data() {
    return {
      model: "",
      // label: "",
      loading: false,
      itemList: []
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
            if (list.length == 1) {
              that.model = list[0].value;
            }
          } else {
            that.$Message.warning("无数据");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    remoteMethod(query) {
      let that = this;
      if (query !== "") {
        that.loading = true;
        this.loading = false;
        let name = "";
        let params = new URLSearchParams();
        params.append("name", query);
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
            } else {
              that.$Message.warning("无数据");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.itemList = [];
      }
    },
    changeModal(data) {
      this.$emit("query-list", data);
    }
    // },
    // watch: {
    //   url (newVal, oldVal) {
    //     console.log(newVal)
    //     this.url = newVal
    //   }
  }
};
</script>

