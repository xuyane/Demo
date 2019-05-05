<style lang="less" scoped>
</style>

<template>
  <Row>
    <Select v-model="model" :label='label' ref='selectitem'  filterable remote :remote-method="remoteMethod" clearable :loading="loading" @on-clear="changename" @on-change="changeModal" label-in-value >
      <Option v-for="(option, index) in itemList" :value="option.id" :key="index">{{option.name}}</Option>
    </Select>
  </Row>
</template>

<script>
import axios from "axios";
export default {
  name: "associateSearch",
  props: {
    dataUrl: String,
    parameterName: String
  },
  data() {
    return {
      model: "",
      // label: "",
      loading: false,
      itemList: [],
      label:''
    };
  },
  methods: {
    //从父组件传入的数据回显到输入框
    getData(data) {
      if(data){
      let that = this;
      let name = "";
      // let params = new URLSearchParams();
      // params.append(this.parameterName, data);
      let a = this.parameterName;
      let params ={};
      params[a] = data;
      // let params = new URLSearchParams();
      axios({
        url: this.dataUrl,
        method: "get",
        params: params
      })
        .then(resp => {
          if (resp.data.status === "200") {
            const list = resp.data.response.map(item => {
              return {
                id: item.id,
                name: item.name
              };
            });
            that.itemList = list;
            that.model = list[0].id;
            const a = {};
            a.label=list[0].name;
            a.value=list[0].id;
            that.$emit("query-list", a);
            // that.label = list[0].id;
          } else {
            that.$Message.warning("无数据");
          }
        })
        .catch(err => {
        });
      }else{
        this.$refs.selectitem.query='';
        this.$emit("query-list", '');
      }
    },
    remoteMethod(query) {
      let that = this;
      if (query) {
        that.loading = true;
        setTimeout(() => {
          this.loading = false; //
          let name = "";
          let a = this.parameterName;
          let params = {};
          params[a] = query;
          // let params = new URLSearchParams();
          axios({
            url: this.dataUrl,
            method: "get",
            params: params
          })
            .then(resp => {
              if (resp.data.status === "200") {
                const list = resp.data.response.map(item => {
                  return {
                    id: item.id,
                    name: item.name
                  };
                });
                that.itemList = list;
              } else {
                that.$Message.warning("无数据");
              }
            })
            .catch(err => {
            });
        }, 3000);
      } else {
        this.itemList = [];
      }
    },
    changeModal(data) {
      this.$emit("query-list", data);
    },
    changename(query){
      // query = '';
      // this.model='';
      let a={};
      a.label='';
            a.value='';
      this.$emit("query-list", a);
    }
    // },
    // watch: {
    //   url (newVal, oldVal) {
    //     this.url = newVal
    //   }
  }
};
</script>

