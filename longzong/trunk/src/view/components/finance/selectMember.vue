<style lang="less">
</style>

<template>
    <Select ref="selectMember" v-model="model" clearable filterable remote :remote-method="remoteMethod" :loading="loading"  @on-change="changeModal" label-in-value class="search-input">
      <Option v-for="(option, index) in itemList" :value="option.value" :key="index">{{option.label}}</Option>
    </Select>
</template>

<script>
import { getMemberList } from '../axios/finance.js'
export default {
  name: "SelectMember",
  props: {
    defailModel: Number
  },
  data() {
    return {
      model: "",
      loading: false,
      itemList: []
    };
  },
  methods: {
    remoteMethod(query) {
      let that = this;
      if (query !== "") {
        that.loading = true;
        let params = {
            memberName: query
        };
        getMemberList(params).then(res => {
          that.loading = false;
          const list = res.response.map(item => {
              return {
                value: item.id,
                label: item.name
              };
          });
          that.itemList = list;
        })
      } else {
        this.itemList = [];
      }
    },
    changeModal(data){
      this.$emit('query-list', data);
    },
    clearMemberQuery() {
      this.$refs.selectMember.$data.query = "";
      this.$refs.selectMember.clearSingleSelect();
    },
  },
  watch: {
    defailModel (newVal, oldVal) {
      console.log(newVal)
      this.defailModel = newVal;
      this.model = newVal;
    }
  }
}
</script>

