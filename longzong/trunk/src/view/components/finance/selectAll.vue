<style lang="less">
</style>

<template>
    <Select v-model="model" @on-change="changeModal" label-in-value class="search-input">
      <Option v-for="(option, index) in itemList" :value="option.value" :key="index">{{option.desc}}</Option>
    </Select>
</template>

<script>
import axios from 'axios';
import {getSelectAllList} from '../axios/finance.js';
export default {
  name: "SelectMember",
  props: {
    defailType: String,
    emptyModel: String
  },
  data() {
    return {
      model: '',
      itemList: [] 
    };
  },
  created (){
    this.getSelectList ()
  },
  methods: {
    getSelectList (){
      let that = this;
      let params = {
        type: 'AckStatusEnum'
      }
      axios({
        url: '/finance/common/select',
        method: 'get',
        params
      }).then(function(res){
        if(res.status == 200){
           that.itemList = res.data.response;
          console.log(2,res.data)
        };
      }).catch(err => {
        console.log(err)
      });
      //
      // getSelectAllList(params).then(res => {
      //   that.itemList = res.response;
      // });
    },
    changeModal(data){
      this.$emit('query-list', data);
    }
  },
  watch: {
    emptyModel (newVal, oldVal) {
      this.model = newVal; 
    }
  }
}
</script>

