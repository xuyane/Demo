<style lang="less" scoped>
</style>

<template>
  <Row>
    <Select v-model="model" ref="select" filterable remote :remote-method="remoteMethod" :loading="loading" @on-change="changeModal" @on-query-change="queryChange" label-in-value>
      <Option v-for="(option, index) in itemList" :value="option.value" :key="index">{{option.label}}</Option>
    </Select>
  </Row>
</template>

<script>
import axios from "axios";
export default {
  name: "associateSearch",
  props: {
    dataUrl: String,
    index: Number
  },
  data() {
    return {
      model: "",
      loading: false,
      itemList: []
    };
  },
  methods: {
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
            // that.model = list[0].value;
            list.forEach(element => {
              if(element.label == data){
                that.model = element.value;
              }
            });
          } else {
            that.$Message.warning("无数据");
          }
        })
        .catch(err => {
          console.log(err);
          that.$Message.info(err);
        });
    },
    //清空组件里面的值
    queryChange(val) {
      if (!val) {
        this.model = '';
      }
    },
    remoteMethod(query) {
      let that = this;
      if (query !== "") {
        that.loading = true;
        this.loading = false;
        let name = "";
        let params = new URLSearchParams();
        if (this.extra) {
          params.append("adminName", this.extra);
          params.append("searchName", query);
        } else {
          params.append("name", query);
        }
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
            that.$Message.info(err);
          });
      } else {
        this.itemList = [];
      }
    },
    changeModal(data) {
      var obj = {
        data: data,
        index: this.index
      };
      this.$emit("query-list", obj);
    }
  }
};
</script>

