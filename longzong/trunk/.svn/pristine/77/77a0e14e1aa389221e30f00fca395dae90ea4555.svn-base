<style lang="less" scoped>
</style>

<template>
  <Col>
  <Modal v-model="showModal" title="新增品种" @on-cancel="doCancel" width="750">
    <Form ref="addModal" :model="form" :rules="addRules" :label-width="100" class="addform">
      <formItem prop='breedType' label="品种类别">
        <Row>
          <Col>
          <Row>
            <Col span="18" style='margin-right:20px;'>
            <Input v-model='form.breedType' style="display:none"> </Input>
            <associate-Search @query-list="breedNameFunction" :dataUrl="url" ref="childData"></associate-Search>
            </Col>
            <Col span="4">
            <Button type="primary" @click="showselect">选择品种类别</Button>
            </Col>
          </Row>
          </Col>
          <Col class="hadwrap">
          <div v-for='(item, index) in  breedBreedTypeRelations' :key='item.id' class="selectvwrap">
            <span>{{item.breedTypeRoadName}}</span>
            <!-- <Icon type="ios-close-outline" size='16' color='red' @click="removeselect(index)" /> -->
            <b class="icon-delete" @click="removeselect(index)"></b>
          </div>
          </Col>
        </Row>
      </formItem>
      <FormItem label="品种名称" prop='name'>
        <Input v-model="form.name" @on-change="changeEditData" class="search-input"></Input>
      </FormItem>
      <FormItem label="全拼" prop='nameQp'>
        <Input v-model="form.nameQp" class="search-input"></Input>
      </FormItem>
      <FormItem label="简拼" prop='nameJp'>
        <Input v-model="form.nameJp" class="search-input"></Input>
      </FormItem>
      <FormItem label="英文名" prop='nameEn'>
        <Input v-model="form.nameEn" class="search-input"></Input>
      </FormItem>
      <FormItem label="日文名" prop='nameJa'>
        <Input v-model="form.nameJa" class="search-input"></Input>
      </FormItem>
      <FormItem label="缩写" prop='shortName'>
        <Input v-model="form.shortName" class="search-input"></Input>
      </FormItem>
      <FormItem label="缩写英文" prop='shortNameEn'>
        <Input v-model="form.shortNameEn" class="search-input"></Input>
      </FormItem>
      <FormItem label="缩写日文" prop='shortNameJa'>
        <Input v-model="form.shortNameJa" class="search-input"></Input>
      </FormItem>
      <FormItem label="别名" prop='keyword'>
        <Input v-model="form.keyword" class="search-input"></Input>
      </FormItem>
      <FormItem label="描述" prop='description'>
        <Input v-model="form.description" class="textarea" type="textarea" :autosize="{minRows: 5,maxRows: 15}"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <i-button :loading="loading" class="search-btn" type="primary" @click="doConfirmAddBreed">确定</i-button>
      <i-button class="search-btn" @click="doCancel">取消</i-button>
    </div>
  </Modal>
  <Modal v-model="showselectModal" title="选择品种类别" @on-cancel="cancel" width="900" class="selectgg">
    <Form :model="form" ref="selectformRef" class="addform">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="品种类别编号:" :label-width="100">
          <Input v-model="selectform.code" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="品种类别名称:" :label-width="100">
          <Input v-model="selectform.breedTypeRoadName" class="search-input"></Input>
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
    <div>
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
import pinyin from "../../../assets/js/Convert_Pinyin.js";
import axios from "axios";
import { getBreedRepeat } from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "addvarietyModal",
  props: {
    showAddModal: Boolean,
    addData: Object
  },
  components: {
    oilPage,
    associateSearch
  },
  data() {
    const validatePass = (rule, value, callback) => {
      let params = {
        breedId: 0,
        name: value
      };
      getBreedRepeat(formData(params)).then(res => {
        if (res.response.result) {
          callback();
        } else {
          callback(new Error(res.response.message));
        }
      });
    };
    const validatePassBreedType = (rule, value, callback) => {
      var dataLength = this.breedBreedTypeRelations.length;
      console.log("datalength", dataLength);
      if (dataLength == 0) {
        callback(new Error("请输入品种类别"));
      } else {
        callback();
      }
    };
    return {
      showselectModal: false,
      selectform: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "品种类别编码",
          key: "code"
        },
        {
          title: "品种类别路径",
          key: "breedTypeRoadName"
        }
      ],
      dataTable: [],
      pageSizeOpts: [5,10, 20],
      showSizer: true,
      pageSize: 5,
      pageNum: 1,
      total: 0,
      name: "",
      loading: false,
      loading1: false,
      tid: 0,
      url: "/basedata/select/breed_type",
      form: {
        nameQp: "",
        nameJa: "",
        nameEn: "",
        nameJp: "",
        shortName: "",
        shortNameEn: "",
        shortNameJa: "",
        keyword: "",
        description: ""
      },
      selectform: {
        code: "",
        name: ""
      },
      breedBreedTypeRelations: [],
      breedTypeRelationList: [],
      showModal: false,
      loading: true,
      // breedTypeRoles: {
      //   breedType: [
      //     { required: true, validator: validatePassBreedType, trigger: "change" }]
      // },
      addRules: {
        breedType: [
          {
            required: true,
            validator: validatePassBreedType,
            trigger: "change"
          }
        ],
        name: [
          { required: true, message: "品种名称不能为空", trigger: "change" },
          {
            type: "string",
            max: 100,
            message: "品种名称不能超过100个字符",
            trigger: "change"
          },
          { validator: validatePass, trigger: "change" }
        ],
        nameQp: [
          {
            type: "string",
            max: 200,
            message: "全拼不能超过200个字符",
            trigger: "change"
          }
        ],
        nameJp: [
          {
            type: "string",
            max: 100,
            message: "简拼不能超过50个字符",
            trigger: "change"
          }
        ],
        nameEn: [
          {
            type: "string",
            max: 100,
            message: "英文名称不能超过100个字符",
            trigger: "change"
          }
        ],
        nameJa: [
          {
            type: "string",
            max: 100,
            message: "日文名称不能超过100个字符",
            trigger: "change"
          }
        ],
        shortName: [
          {
            type: "string",
            max: 40,
            message: "缩写不能超过40个字符",
            trigger: "change"
          }
        ],
        shortNameEn: [
          {
            type: "string",
            max: 100,
            message: "缩写英文名称不能超过100个字符",
            trigger: "change"
          }
        ],
        shortNameJa: [
          {
            type: "string",
            max: 100,
            message: "缩写日文名称不能超过100个字符",
            trigger: "change"
          }
        ],
        keyword: [
          {
            type: "string",
            max: 300,
            message: "别名不能超过300个字符",
            trigger: "change"
          }
        ],
        description: [
          {
            type: "string",
            max: 300,
            message: "描述不能超过300个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
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
      this.selectform.code = "";
      this.selectform.breedTypeRoadName = "";
    },
    //新增品种
    doConfirmAddBreed() {
      var that = this;
      this.loading = true;
      let arr = [];
      this.form.breedBreedTypeRelationList = [];
      for (var i = 0; i < this.breedBreedTypeRelations.length; i++) {
        let breedTypeIds = { breedTypeId: this.breedBreedTypeRelations[i].id };
        arr.push(breedTypeIds);
      }
      that.form.breedBreedTypeRelationList = arr;
      //this.$refs.breedTypeValidate.validate();
      this.$refs["addModal"].validate(valid => {
        if (valid) {
          axios({
            url: "/basedata/breed/add",
            method: "post",
            data: that.form
          }).then(function(resp) {
            if (resp.data.status == 200) {
              that.$Message.success("新增成功");
              that.$refs["addModal"].resetFields();
              that.$emit("hide-modal");
              that.loading = false;
              that.$refs.childData.model = "";
              that.breedBreedTypeRelations = [];
            } else {
              that.loading = false;
              that.$Message.error(resp.data.message);
            }
          });
        } else {
          that.loading = false;
        }
      });
    },
    //点击选择品种确认按钮
    doEdit() {
      let that = this;
      that.loading1 = true;
      if (that.selectRow && that.selectRow.length > 0 ) {
        for (let i = 0; i < that.selectRow.length; i++) {
          let breedObj = {};
          breedObj.id = that.selectRow[i].id;
          breedObj.breedTypeRoadName = that.selectRow[i].breedTypeRoadName;
          if (that.isRepeatBreed(that.selectRow[i].id)) {
            that.breedBreedTypeRelations.push(breedObj);
          }
        }
        that.selectRow = [];
        that.$refs["addModal"].validate();
      }
      that.showselectModal = false;
      that.loading1 = false;
    },
    //点击取消品种按钮
    cancel() {
      this.showselectModal = false;
      this.loading1 = false;
    },
    //删除关联品种
    removeselect(index) {
      this.breedBreedTypeRelations.splice(index, 1);
      if (this.breedBreedTypeRelations.length == 0) {
        this.$refs["addModal"].validate();
      }
      this.$refs.childData.model = "";
    },
    doCancel() {
      this.$emit("hide-modal");
      this.$refs.addModal.resetFields();
      this.$refs.childData.model = "";
      this.breedBreedTypeRelations = [];
      this.loading = false;
    },
    //选择关联品种
    showselect() {
      this.showselectModal = true;
      this.pageNum = 1;
      this.pageSize = 5;
      this.getBreedList();
    },
    // 监听选中项发生变化
    handleRowChange(row) {
      this.selectRow = row;
    },
    //品种名称模糊搜索
    breedNameFunction(breedName) {
      if (breedName) {
        if (this.isRepeatBreed(breedName.value)) {
          let breedObj = {};
          breedObj.id = breedName.value;
          breedObj.breedTypeRoadName = breedName.label;
          this.breedBreedTypeRelations.push(breedObj);
          this.$refs["addModal"].validate();
        }
      }
    },
    //获取关联品种数据
    getBreedList() {
      var that = this;
      axios({
        url: "/basedata/breedType/list",
        method: "post",
        data: {
          pageNum: that.pageNum,
          pageSize: that.pageSize,
          code: that.selectform.code,
          status:0,
          name: that.selectform.breedTypeRoadName
        }
      }).then(function(resp) {
        if (resp.data.status == 200) {
          that.dataTable = resp.data.response.list;
          that.total = resp.data.response.total;
        } else {
          that.dataTable = [];
        }
      });
    },
    //输入名称自动生成拼音和简拼
    changeEditData() {
      this.form.nameQp = pinyin.getFullChars(this.form.name);
      this.form.nameJp = pinyin.getCamelChars(this.form.name);
    },
    //判断品种是否重复
    isRepeatBreed(value) {
      if (this.breedBreedTypeRelations.length > 0) {
        let breedArr = [];
        for (let j = 0; j < this.breedBreedTypeRelations.length; j++) {
          breedArr.push(this.breedBreedTypeRelations[j].id);
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
    showAddModal(newVal, oldVal) {
      this.showModal = newVal;
      this.loading = false;
    }
  }
};
</script>
