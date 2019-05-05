<style lang="less">
</style>

<template>
  <div>
    <Input v-model="deptVal" class="search-input" readonly @on-focus="getSelectList" placeholder="请选择所在部门"></Input>
    <Modal v-model="model" title="请选择所在部门" @on-cancel="cancel">
      <div style="max-height: 300px;overflow-x: hidden;">
        <Tree ref="tree" :data="deptIdList" show-checkbox></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="ok">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { deptTree } from '../axios/performanceManagement.js';
  export default {
    name: "SelectMember",
    props: ["emptyModel"],
    data() {
      return {
        model: false,
        deptVal: '',
        deptIdList: []
      };
    },

    methods: {
      cancel() {
        this.model = false;
      },
      ok() {
        this.model = false;
        let dataList = this.$refs.tree.getCheckedNodes();
        let deptLabel = [];
        let deptId = [];
        let deptCode = [];
        dataList.map(item => {
          deptLabel.push(item.title);
          deptId.push(item.value);
          deptCode.push(item.code);
        });
        this.deptVal = deptLabel.join('/');
        this.$emit('data-list', deptLabel, deptId, deptCode);
      },
      getSelectList() {
        let that = this;
        this.model = true;
        if (this.deptVal == '') {


          deptTree().then(res => {

            that.deptIdList = JSON.parse(res.response).map(item => {
              return {
                code: item.value,
                value: item.id,
                title: item.label,
                children: item.children.map(option => {
                  return {
                    code: option.value,
                    value: option.id,
                    title: option.label,
                    children: option.children.map(childItem => {
                      return {
                        code: childItem.value,
                        value: childItem.id,
                        title: childItem.label,
                        children: childItem.children.map(childrenItem => {
                          return {
                            code: childrenItem.value,
                            value: childrenItem.id,
                            title: childrenItem.label
                          }
                        })
                      }
                    })
                  }
                })
              }
            });
          })
        }
      }
    },
    watch: {
      emptyModel(newVal) {
        if (newVal.length < 1) {
          this.deptVal = '';
        }
      }
    }
  }
</script>
