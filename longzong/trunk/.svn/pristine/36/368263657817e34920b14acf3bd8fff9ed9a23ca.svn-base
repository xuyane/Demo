<style lang="less" scoped>
.ivu-modal-body {
  width: 100%;
  margin: auto;
}
</style>

<template>
  <Modal v-model="showModal" title="修改品种规格参数" @on-ok="doEdit" :loading="loading" @on-cancel="doCancel" width="915">

    <FormItem label="品种名称:">
      <span>{{name}}</span>
    </FormItem>
    <Table class="tableCommon" border :columns="columns" :data="dataTable"></Table>

  </Modal>
</template>
<script>
import axios from "axios";
import {
  getBreedStandardSelect,
  getBreedPurposeSelect,
  getBreedSpecSelect,
  getBreedTechnologySelect,
  getBreedShapeSelect
} from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "specificationsModal",
  props: {
    showSpecificationsModal: Boolean
  },
  data() {
    return {
      itemSpecList: [],
      itemStandardList: [],
      itemPurposeList: [],
      itemShapeList: [],
      itemTechnologyList: [],
      columns: [
        {
          title: "规格型号",
          key: "spec",
          width: 120,
          align: "center",
          loading: true,
          render: (h, data) => {

            return h(
              "Select",
              {
                props: {
                  filterable: true,
                  remote: false,
                  //remoteMethod: this.breedSpecSelect,
                  labelInValue: true,
                  value: data.specName
                },
                on: {
                  change: () => {
                      this.breedSpecSelect();
                    },
                  "on-blur"(e) {
                    this.breedSpecSelect();
                    //self.dataTable[data.index].specName = e.target.value;
                  },
                  "on-change": event => {
                    this.breedSpecSelect();
                    //this.dataTable[data.index].specName = event.value;
                    //this.array_one.push(event.label);
                  }
                }
              },
              this.itemSpecList.map(function(item) {
                console.log("item",item)
                return h(
                  "Option",
                  {
                    props: {value: item.value,label: item.label}
                  },
                  item.label
                );
              })
            );
          }
        },
        {
          title: "标准",
          key: "standard",
          width: 120,
          align: "center",
          loading: true,
          render: (h, data) => {
            return h(
              "Select",
              {
                props: {
                  filterable: true,
                  remote: true,
                  loading: this.loading,
                 // remoteMethod: this.breedStandardSelect,
                  value: this.dataTable[data.index].standardName
                },
                on: {
                  "on-blur"(e) {
                    self.dataTable[data.index].standardName = e.target.value;
                  },
                  "on-change": event => {
                    this.dataTable[data.index].standardName = event.value;
                    this.array_one.push(event.label);
                  }
                }
              },
              this.itemStandardList.map(function(item) {
                return h(
                  "Option",
                  {
                    props: { value: item.value }
                  },
                  item.label
                );
              })
            );
          }
        },
        {
          title: "用途",
          key: "purpose",
          width: 120,
          render: (h, data) => {
            return h(
              "Select",
              {
                props: {
                  filterable: true,
                  remote: true,
                  loading: this.loading,
                  //remoteMethod: this.breedPurposeSelect,
                  value: this.dataTable[data.index].purposeName
                },
                // on: {
                //   "on-blur"(e) {
                //     self.dataTable[data.index].purposeName = e.target.value;
                //   },
                //   "on-change": event => {
                //     this.dataTable[data.index].purposeName = event.value;
                //     this.array_one.push(event.label);
                //   }
                // }
              },
              this.itemPurposeList.map(function(item) {
                return h(
                  "Option",
                  {
                    props: { value: item.value }
                  },
                  item.label
                );
              })
            );
          }
        },
        {
          title: "形态",
          key: "shape",
          width: 120,
          render: (h, data) => {
            return h(
              "Select",
              {
                props: {
                  filterable: true,
                  remote: true,
                  loading: this.loading,
                  //remoteMethod: this.breedShapeSelect,
                  value: this.dataTable[data.index].shape
                },
                // on: {
                //   "on-blur"(e) {
                //     self.dataTable[data.index].shapeName = e.target.value;
                //   },
                //   "on-change": event => {
                //     this.dataTable[data.index].shapeName = event.value;
                //     this.array_one.push(event.label);
                //   }
                // }
              }, [
              this.itemShapeList.map(function(item) {
                return h(
                  "Option",
                  {
                    props: { value: item.value }
                  },
                  item.label
                );
              })
              ]
            )
          }
        },
        {
          title: "技术指标",
          width: 120,
          key: "technologyName",
          render: (h, data) => {
            console.log("dataRow",data.row);
            return h(
              "Select",
              {
                props: {
                   filterable: true,
                   remote: true,
                  remoteMethod: this.breedTechnologySelect,
                  value: data.row.technologyName
                },
                on: {

                }
              },
              [
              this.itemTechnologyList.map(function(item) {
                //technologyName = item.label
                console.log('itemitem', item)
                return h(
                  "Option",
                  {
                    props: { value: item.label}
                  },
                  item.label
                );
              })
              ]
            )
          }
        },
        {
          title: "备注",
          key: "description",
          width: 150,
          align: "center",
          render: (h, data) => {
            return h("Input", {
              props: {
                type: 'text',
                value: data.row.description
              }
            });
          }
        },
        {
          title: "操作",
          key: "action",
          width: 130,
          align: "center",
          render: (h, data) => {
            return h("div", [
              h("i", {
                props: {
                  type: "text",
                  size: "small"
                },
                class: "icon-plus2 icon",
                on: {
                  click: () => {
                    this.addData(data);
                  }
                }
              }),
              h("i", {
                props: {
                  type: "text",
                  size: "small"
                },
                class: "icon-remove2 icon",
                on: {
                  click: () => {
                    this.deleteData(data);
                  }
                }
              })
            ]);
          }
        }
      ],
      dataTable: [],
      showModal: false,
      loading: false,

      name: "",
      formData: {

      }
    };
  },

  methods: {
    remoteMethod(query) {
      console.log("query", query);
    },
    //初始化数据
    initData(id) {
      var that = this;
      var params = new URLSearchParams();
      params.append("breedId", id);
      axios
        .post("/basedata/breed/params_detail", params)
        .then(function(res) {
          if (res.data.status == 200) {
            that.dataTable = res.data.response;
            console.log('dataTabke', res.data.response)
            if(that.dataTable.length == 0){
              that.addData();
            }
          } else {
            that.$Message.warning(res.data.message);
          }
        });
    },
    //初始化下拉选择规格型号
    breedSpecSelect(specName) {
      console.log("specName",specName);
      var that = this;
      let params = {
        name: specName
      };
      getBreedSpecSelect(formData(params)).then(res => {
        console.log(res);
        that.itemSpecList  = res.response.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });

        console.log(that.itemSpecList)
      });
    },
    //初始化下拉选择标准
    breedStandardSelect(standardName) {
      var that = this;
      let params = {
        name: standardName
      };
        getBreedStandardSelect(formData(params)).then(res => {
          const list = res.response.map(item => {
            return {
              value: item.id,
              label: item.name
            };
          });
          that.itemStandardList = list;
        });
    },
    //初始化下拉选择形态
    breedShapeSelect(name) {
      var that = this;
      getBreedShapeSelect(formData(params)).then(res => {
        const list = res.response.map(item => {
          return {
            value: item.value,
            label: item.desc
          };
        });
        that.itemShapeList = list;
      });
    },
    //初始化下拉选择用途
    breedPurposeSelect(purposeName) {
      var that = this;
      let params = {
        name: purposeName
      };
      getBreedPurposeSelect(formData(params)).then(res => {
        const list = res.response.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        that.itemPurposeList = list;
      });
    },
    //初始化下拉技术指标
    breedTechnologySelect(technologyName) {
      var that = this;
      let params = {
        name: technologyName
      };

        getBreedTechnologySelect(formData(params)).then(res => {
          const list = res.response.map(item => {
            return {
              value: item.id,
              label: item.name
            };
          });
          that.itemTechnologyList = list;
        });

    },
    //新增一条数据
    addData(){
      let obj = {
        value: "",
        label: ""
      }
      this.dataTable.push(obj)
    },
    // 删除一条数据
    deleteData (data){
         this.dataTable.length <= 1 ? this.$Message.warning('已经最后一行了') : this.dataTable.splice(data.index,1);
    },
    doEdit() {},
    doCancel() {
      this.$emit("hide-modal");
    }
  },
  watch: {
    showSpecificationsModal(newVal, oldVal) {
      this.showModal = newVal;
    }
  }
};
</script>
