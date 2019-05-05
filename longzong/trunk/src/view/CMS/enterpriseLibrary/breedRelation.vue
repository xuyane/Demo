<style lang="less" scoped>
</style>

<template>
  <Col>
  <Modal v-model="showModal" title="选择品种" @on-cancel="doCancel" width="750">
    <Form ref="addModal" :model="form" :label-width="100" class="addform">
      <FormItem label="品种">
        <Row>
          <Col>
          <Row>
            <Col span="18" style='margin-right:20px;'>
            <!-- <associate-Search @query-list="breedNameFunction" :dataUrl="url" ref="childData"></associate-Search> -->
            <Select v-model="form.breedName" filterable remote :remote-method="remoteMethod" @on-change="breedNameFunction" :loading="loading" label-in-value>
              <Option v-for="(option, index) in breedList" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
            </Col>
            <Col span="4">
            <Button type="primary" @click="showselect">选择品种</Button>
            </Col>
          </Row>
          </Col>
          <Col v-if='breedRelations.length>0' class="hadwrap">
          <div v-for='(item, index) in  breedRelations' :key='item.breedId' class="selectvwrap">
            <span>{{item.breedName}}</span>
            <Icon type="ios-close-outline" size='16' color='red' @click="removeSelect(index)" />
          </div>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <div slot="footer">
      <i-button :loading="loading" class="search-btn" type="primary" @click="doConfirmAddBreed">确定</i-button>
      <i-button class="search-btn" @click="doCancel">取消</i-button>
    </div>
  </Modal>
  <Modal v-model="showselectModal" title="选择品种" @on-cancel="cancel" width="900" class="selectgg">
    <Form :model="selectform" ref="selectformRef" class="addform">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="品种名称:" :label-width="100">
          <Input v-model="selectform.breedName" placeholder="请输入品种类别名称"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem>
          <Button type="primary" @click="handleSubmit">搜索</Button>
          <Button @click="handleReset" style="margin-left: 20px">重置</Button>
        </FormItem>
        </Col>

      </Row>
    </Form>
    <div style="position:relative;overflow:hidden">
      <Table class="tableCommon" border ref="selection" :columns="columns" :data="dataTable" @on-selection-change="handleRowChange"></Table>
      <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </div>
    <div slot="footer">
      <i-button :loading="loading1" class="search-btn" type="primary" @click="doEdit">确定</i-button>
      <i-button class="search-btn" @click="cancel">取消</i-button>
    </div>
  </Modal>
  </Col>
</template>
<script>
import oilPage from "../../components/page/page.vue";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import axios from "axios";
import {
  getBreedList,
  getEnterpriseBreed,
  getRelevanceBreedList
} from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";
import { deletePermissionList } from '../../components/axios/EAC';
export default {
  name: "addvarietyModal",
  props: {
    showBreedRelationModal: Boolean
  },
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      showselectModal: false,
      selectform: {},
      form: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "品种名称",
          key: "breedName"
        },
        {
          title: "缩写",
          key: "breedShortName"
        },
        {
          title: "缩写",
          key: "breedKeyword"
        }
      ],
      dataTable: [],
      pageSizeOpts: [5,10, 20],
      showSizer: true,
      pageSize: 5,
      pageNum: 1,
      cId: 0,
      total: 0,
      name: "",
      loading: false,
      loading1: false,
      url: "/basedata/select/enterprise_breed",
      selectform: {
        breedId: "",
        breedName: ""
      },
      eId: 0,
      breedRelations: [],
      breedTypeRelationList: [],
      breedList: [],
      showModal: false,
      loading: true
    };
  },
  methods: {
    //初始化数据
    initData(id, mainId) {
      var that = this;
      var params = new URLSearchParams();
      params.append("contactsId", id);
      that.eId = mainId;
      that.cId = id;
      axios
        .post("/basedata/enterprise/detail_contacts_breed_relation", params)
        .then(function(res) {
          if (res.data.status == 200) {
            that.breedRelations = res.data.response;
          } else {
            that.$Message.warning(res.data.message);
          }
        });
    },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getBreedList();
    },
    //点击品种类别搜索
    handleSubmit() {
      this.pageNum = 1;
      this.pageSize = 5;
      this.getBreedList();
    },
    //重置品种搜索
    handleReset() {
      this.selectform.breedName = "";
    },
    //新增品种
    doConfirmAddBreed() {
      var that = this;
      this.loading = true;
      let arr = [];
      if (this.breedRelations.length > 0) {
        for (let i = 0; i < this.breedRelations.length; i++) {
          let breedTypeIds = {};
          breedTypeIds.breedId = that.breedRelations[i].breedId;
          breedTypeIds.breedId;
          breedTypeIds.contactsId = that.cId;
          arr.push(breedTypeIds);
        }
        that.form.contactsBreedList = arr;
      } else {
        that.form.contactsBreedList = [];
      }
      that.form.contactsId = that.cId;
      axios({
        url: "/basedata/enterprise/add_contacts_breed",
        method: "post",
        data: that.form
      }).then(function(resp) {
        if (resp.data.status == 200) {
          if (resp.data.response) {
            that.$Message.success("关联成功");
          }

          that.$emit("hide-modal");
          that.$refs.addModal.resetFields();
          that.showEditModal = false;
          that.loading = false;
        } else {
          that.$Message.error(resp.data.message);
        }
      });
    },
    //点击选择品种确认按钮
    doEdit() {
      let that = this;
      that.loading1 = true;
      if (that.selectRow.length > 0) {
        for (let i = 0; i < that.selectRow.length; i++) {
          let breedObj = {};
          breedObj.breedId = that.selectRow[i].breedId;
          breedObj.breedName = that.selectRow[i].breedName;
          if (that.isRepeatBreed(that.selectRow[i].breedId)) {
            that.breedRelations.push(breedObj);
          }
        }
        that.selectRow = [];
      }
      that.showselectModal = false;
      that.loading1 = false;
    },
    //点击取消品种按钮
    cancel() {
      this.selectform.breedName = "";
      this.showselectModal = false;
      this.loading1 = false;
    },
    //删除关联品种
    removeSelect(index) {
      this.breedRelations.splice(index, 1);
      if (this.$refs.childData.model != "") {
        this.$refs.childData.model = "";
      }
    },
    doCancel() {
      this.$emit("hide-modal");
      this.$refs.childData.model = "";
      this.form = {};
      this.loading = false;
    },
    //选择关联品种
    showselect() {
      this.showselectModal = true;
      this.getBreedList();
    },
    // 监听选中项发生变化
    handleRowChange(row) {
      this.selectRow = row;
    },

    //品种名称模糊搜索
    breedNameFunction(breedName) {
      var that = this;
      if (breedName) {
        if (this.isRepeatBreed(breedName.value)) {
          let breedObj = {};
          breedObj.breedId = breedName.value;
          breedObj.breedName = breedName.label;
          that.breedRelations.push(breedObj);
          that.form.breedName = null
        }
      }
    },
    //获取关联品种数据
    getBreedList() {
      var that = this;
      let params = {
        pageNum: that.pageNum,
        pageSize: that.pageSize,
        enterpriseId: this.eId,
        breedName:
          that.selectform.breedName == undefined
            ? ""
            : that.selectform.breedName
      };
      getRelevanceBreedList(formData(params)).then(res => {
        that.dataTable = res.response.list;
        that.total = res.response.total;
      });
    },
    //联想查询
    remoteMethod(query) {
      let that = this;
      if (query !== "") {
        let name = "";
        let params = new URLSearchParams();
        params.append("enterpriseId", this.eId);
        params.append("breedName", query);

        axios({
          url: "/basedata/select/enterprise_breed",
          method: "post",
          data: params
        })
          .then(resp => {
            if (resp.status == 200) {
              const list = resp.data.response.map(item => {
                return {
                  value: item.id,
                  label: item.name
                };
              });
              that.breedList = list;
            } else {
              that.$Message.warning("无数据");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.breedList = [];
      }
    },
    //判断品种是否重复
    isRepeatBreed(value) {
      if (this.breedRelations.length > 0) {
        let breedArr = [];
        for (let j = 0; j < this.breedRelations.length; j++) {
          breedArr.push(this.breedRelations[j].breedId);
        }
        if (breedArr.indexOf(value) == -1) {
          return true;
        }
      } else {
        return true;
      }
    }
  },
  watch: {
    showBreedRelationModal(newVal, oldVal) {
      this.showModal = newVal;
      this.loading = false;
    }
  }
};
</script>
