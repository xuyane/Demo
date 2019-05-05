<style>
.trans-btn {
  width: max-content;
  padding: 5px 10px;
  background: #2d8cf0;
  color: #fff;
  margin: 5px 0;
}
.producedx .ivu-select-selection {
  height: auto !important;
}
</style>

<template>
    <Modal v-model="channelModal" title="频道选择" :loading="loading" @on-cancel="cancel()" width="600">
      <Row :gutter="10">
          <Col span='24'>
            <div class="ivu-form">
                <Col span='2'>
                    <label class="ivu-form-item-label"  style="width:55px">频道:</label>
                </Col>
                <Col span='10'>
                    <Input  class="search-input" v-model="channelname" readonly @on-focus="showchanneltree" ></Input>
                </Col>
                <Col span='10'>
                    <!-- <Button type="primary"  style="margin:0 10px">选择频道</Button> -->
                    <Button type="primary" style="margin:0 10px" @click="deleteItem()">清空所有频道</Button>
                </Col>  
            </div>
          </Col>
          <Col span='24'>
            <div class="transition-container">
                <div class="item" v-for="(item, index) in hadselectChannel" :key="index"
                    draggable="true"
                    @dragstart="handleDragStart($event, item)"
                    @dragover.prevent="handleDragOver($event, item)"
                    @dragenter="handleDragEnter($event, item)"
                    @dragend="handleDragEnd($event, item)" 
                    >
                    <p class="trans-btn">
                    <span >
                       {{index+1}}. {{item.refName}}
                    </span>
                    <span>
                        <!-- <i-button  size="small" type="error" style="margin-right: 10px;" @click="deleteItem(item, index)">删除</i-button> -->
                        <Icon type="md-close"  @click="deleteItem(item, index)" />
                    </span>
                    </p>
                </div>
            </div>
          </Col>
        
      </Row>
      <div slot="footer">
        <Button @click="cancel()">取消</Button>
        <Button type="primary" style="margin-left:8px;" :disabled='disabledbtn'  @click="doconfirm()">确定</Button>
      </div>
      <Modal
        v-model="modalpdtree"
        title="请选择频道"
        @on-cancel="pdcancel"
        class="breedtree">
        <!-- <Input v-model="queryvalue"  clearable @on-change="getqueryChannel" /> -->
        <Select
        class="producedx"
            v-model="model14"
            multiple
            filterable
            remote
            @on-change='getquerychannel'
            :label-in-value='true'
            :remote-method="remoteMethod2"
            :loading="loading2">
            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
       <Tree :data="channelList" :load-data="pdloadData1"  check-strictly  ref='treepd' @on-check-change='getchecked' show-checkbox  ></Tree>
       <div slot="footer">
          <i-button type="primary" @click="pdok1" class="search-btn"> 确定</i-button>
          <i-button @click="pdcancel" class="search-btn">取消</i-button>
        </div>
        </Modal>
    </Modal>
    
</template>

<script>
import axios from "axios";
import {
  userAppRefList,
  selectChannelList,
  createUserAppRef,
  deleteUserAppRef,
  updateUserAppRefList,
  queryChannel
} from "../../../components/axios/crm.js";
import {
  formatTime,
  formatTime2,
  formData
} from "../../../../assets/js/common.js";
export default {
  name: "channelModal",
  props: {
    showChannelModal: Boolean,
    fromShujuOrKuaixun: String,
    channalData: Object
  },
  data() {
    return {
      querylist: [],
      model14: [],
      loading2: false,
      options2: [],
      queryvalue: "",
      channelname: "",
      // hadselect:[],
      modalpdtree: false,
      channelList: [],
      dataSource: [],
      dragging: null,
      hadselectChannel: [],
      channalmsg: {},
      disabledbtn: false,
      loading: false,
      memberId: window.localStorage.getItem("lzMemberId"),
      channelModal: false,
      fromsite: "",
      hadchoosedData: []
    };
  },
  created() {
    // this.getMainUser();
  },
  methods: {
    getquerychannel(data) {
      this.querylist = data;
    },
    remoteMethod2(query) {
      if (query !== "") {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
          let msg = {
            product: query,
            siteId: this.fromsite == 1 ? 4 : 3
          };
          queryChannel(formData(msg)).then(res => {
            if (res.response) {
              const list = res.response.map(item => {
                return {
                  value: item.id,
                  label: item.name
                };
              });
              this.options2 = list.filter(
                item =>
                  item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            } else {
              this.options2 = [];
            }
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    //数组合并去重
    uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
},
    // 确认增加频道
    pdok1() {
      console.log(this.hadchoosedData,this.querylist)
      let alltr = this.hadchoosedData.concat(this.querylist);
      let lastlist=this.uniq(alltr);
      if (lastlist.length == 0) {
        this.$Message.warning("最少选择一个频道");
        return;
      }
      let msg = lastlist.map(item => {
        return {
          appType: this.fromsite,
          refId: item.value,
          userId: this.channalmsg.userId
        };
      });
      // let namelist = this.hadchoosedData.map(item => {
      //   return item.title;
      // });
      // this.channelname = namelist.join(",");
      createUserAppRef(msg).then(res => {
        this.$Message.success(res.message);
        // this.channelname = namelist.join(",");
        this.gethadChannel(this.fromsite);
        this.modalpdtree = false;
        this.model14=[];
        this.options2=[];
      });
    },
    // 勾选频道
    getchecked(data) {
      // if(data.disableCheckbox){

      // }
      this.hadchoosedData = [];
      data.map(item => {
        if (!item.disableCheckbox) {
          this.hadchoosedData.push(item);
        }
      });
    },
    pdcancel() {
      this.modalpdtree = false;
      this.model14=[];
      this.options2=[];
      this.querylist=[];
    },
    // 根据名称模糊搜索
    getqueryChannel(event) {
      let msg = {
        product: event.target.value,
        siteId: this.fromsite == 1 ? 4 : 3
      };
      queryChannel(formData(msg)).then(res => {});
    },
    pdloadData1(item, callback) {
      setTimeout(() => {
        let msg = {
          siteId: this.fromsite == 1 ? 4 : 3,
          channelId: item.value
        };
        selectChannelList(msg).then(res => {
          let msg = res.response;
          const data = msg.map(item => {
            if (item.isLeaf == 0) {
              item.children = [];
              item.loading = false;
            }
            item.value = item.id;
            item.title = item.name;
            return item;
          });
          data.map(item => {
            this.hadselectChannel.map(option => {
              if (item.value == option.refId) {
                item.checked = true;
                item.disableCheckbox = true;
              }
            });
          });
          callback(data);
        });
      }, 1000);
    },
    showchanneltree() {
      this.modalpdtree = true;
      this.hadchoosedData=[];
      this.getChannel()
    },
    //获取频道
    getChannel() {
      selectChannelList({
        siteId: this.fromsite == 1 ? 4 : 3,
        channelId: ""
      }).then(res => {
        this.channelList = res.response.map(item => {
          if (item.isLeaf == 0) {
            return {
              value: item.id,
              title: item.name,
              children: [],
              loading: false
            };
          } else {
            return {
              value: item.id,
              title: item.name
            };
          }
        });
        this.channelList.map(item => {
          this.hadselectChannel.map(option => {
            if (item.value == option.refId) {
              item.checked = true;
              item.disableCheckbox = true;
            }
          });
        });
      });
    },
    // 全部修改新增完毕
    doconfirm() {
      let msg = this.hadselectChannel.map((item, index) => {
        return {
          sorts: index + 1,
          id: item.id
        };
      });
      updateUserAppRefList(msg).then(res => {
        this.$Message.success(res.message);
        this.$emit("hide-modal");
      });
    },
    cancel() {
      this.$emit("hide-modal");
    },
    // 获取已选对应所有频道
    gethadChannel(a) {
      let data = {
        userId: this.channalmsg.userId,
        // userId: 815128,
        appType: a
      };
      this.hadselectChannel = [];
      userAppRefList(formData(data)).then(res => {
        this.hadselectChannel = res.response || [];
      });
    },
    handleDragStart(e, item) {
      this.dragging = item;
    },
    handleDragEnd() {
      this.dragging = null;
      //   this.$emit("hasChanged", this.items);
    },
    // 首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = "move"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      if (this.dragging) {
        e.dataTransfer.effectAllowed = "move"; // 为需要移动的元素设置dragstart事件
        if (item === this.dragging) {
          return;
        }
        const newItems = [...this.hadselectChannel];
        // console.log(newItems);
        const src = newItems.indexOf(this.dragging);
        const dst = newItems.indexOf(item);
        newItems.splice(dst, 0, ...newItems.splice(src, 1));
        this.hadselectChannel = newItems;
      }
    },
    deleteItem(item, index) {
      let msg = {};
      if (item) {
        msg = {
          // userId: this.channalmsg.userId,
          appType: this.fromsite,
          id: item.id
        };
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否确认清除该频道？</p>",
          onOk: () => {
            this.deleteoneorall(msg, index);
          },
          onCancel: () => {}
        });
      } else {
        msg = {
          userId: this.channalmsg.userId,
          appType: this.fromsite
        };
        this.$Modal.confirm({
          title: "提示",
          content: "<p>是否确认清空？清空之后，需要重新选择所有频道。</p>",
          onOk: () => {
            this.deleteoneorall(msg, -1);
          },
          onCancel: () => {}
        });
      }
    },
    deleteoneorall(data, a) {
      deleteUserAppRef(formData(data)).then(res => {
        if (a == -1) {
          this.$Message.success(res.message);
          this.hadselectChannel = [];
          this.channelname = "";
        } else {
          this.$Message.success(res.message);
          this.hadselectChannel.splice(a, 1);
        }
        this.getChannel();
      });
    }
  },
  watch: {

    showChannelModal(newVal, oldVal) {
      this.channelname = "";
      this.channelModal = newVal;
    },
    channalData(newVal, oldVal) {
      this.channalmsg = newVal;
    },
    fromShujuOrKuaixun(newVal, oldVal) {
      this.fromsite = newVal.split('.')[1];
      this.gethadChannel(this.fromsite);
      console.log(this.fromsite)
      // this.getChannel();
    },
    dataSource(val) {
      this.hadselectChannel = val;
    },
    dragging(val) {
      this.dragging = val;
    }
  },
  mounted() {
    // 1
  }
};
</script>
