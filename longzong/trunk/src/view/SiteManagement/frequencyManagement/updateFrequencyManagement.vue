<style lang="less" scoped>
.fx-boxs {
  min-height: 40px;
  width: 100%;
  z-index: 100;
  max-height: 90px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #080000;
  margin-bottom: 10px;
  margin-top: -5px;
  margin-left: 140px;
}
.fx-boxs li {
  padding: 5px 15px;
}
.fx-box li:hover {
  background: #c1c1c1;
}
.search-input {
  width: 100%;
  height: 36px;
  border-color: #5b5b5b;
  border-radius: 0;
}
.search-input-100 {
  width: 100%;
  height: 36px;
}
.search-remote-input {
  width: 100%;
  height: 36px;
  border-color: #5b5b5b;
  border-radius: 0;
}
.ivu-input-number {
  border-radius: 0px;
}
.textarea-input {
  border: 0px solid #000000 !important;
  border-radius: 0px !important;
}
.ivu-input:hover {
  border-color: #0a0a0a;
}
.background {
  background-color: white;
}
.margin-top-20 {
  margin-top: 20px;
}
.margin-15 {
  margin-top: 15px;
  margin-bottom: 15px;
}
.plant-content {
  background: #fff;
  padding: 0 20px;
}
.character {
  font-size: 20px;
  font-weight: 400;
}
</style>
<template>
  <Row>
    <i-col span="24">
      <Row class-name="current-position">
        当前位置：
        <router-link to="/plantIndex" class="link-css">网站管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/frequencyManagement" class="link-css">频道管理</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
         <router-link to="/frequencyManagement" class="link-css">频道列表</router-link>
        &nbsp;&nbsp;>>&nbsp;&nbsp;
        <a @click="goto" class="link-css">{{title}}</a>

     
      </Row>
    </i-col>

    <Col span="24" class="plant-content">
      <Row>
        <Col span="24" class="margin-top-20">
          <div class="header-con">
            <span class="character">{{title}}</span>
          </div>
          <hr class="margin-15">
        </Col>
      </Row>
      <Row>
        <Form :label-width="140" ref="formValidate" :model="addForm" :rules="ruleValidate">
          <Row>
            <FormItem label="上级频道：">
              <span>{{changePre ? changePre : '无'}}</span>
            </FormItem>
          </Row>
          <Row>
            <Col span="6">
              <FormItem label="频道名称：" prop="name">
                <Input
                  type="text"
                  class="search-input"
                  placeholder="请输入频道名称"
                  v-model="addForm.name"
                />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="频道类型:">
                <Select v-model="addForm.type" class="form-select">
                  <Option
                    v-for="item in channelTypeList"
                    :value="item.value"
                    :key="item.value"
                  >{{item.label}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12"></Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem label="网页网址：" prop="url">
                <Input
                  type="text"
                  class="search-input"
                  placeholder="请输入网页地址"
                  v-model="addForm.url"
                />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="行数：">
                <InputNumber
                  v-model="addForm.showLineNumber"
                  :min="1"
                  :max="99"
                  class="search-input"
                />
              </FormItem>
            </Col>
            <Col span="12"></Col>
          </Row>
          <Row>
            <Col span="12">
              <Row>
                <Col span="20">
                  <FormItem label="关联的品种：">
                    <Select
                      v-model="paramBreed"
                      class="search-remote-input"
                      filterable
                      remote
                      :remote-method="breedSearch"
                      @on-change="changeBreed"
                      label-in-value
                      :loading="loading1"
                    >
                      <Option
                        v-for="(option, index) in optionsBreed"
                        :value="option.id"
                        :key="index"
                      >{{option.text}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4" class="text-right">
                  <Button type="primary" @click="showselect" style="text-algin:left">选择关联</Button>
                </Col>
              </Row>
              <Row>
                <Col span="20">
                  <ul class="fx-boxs" id="fxBox">
                    <li v-for="(item,index) in checkList1">
                      <p>
                        {{item.name}}
                        <b
                          class="icon-delete pull-right"
                          style="margin-right:35px"
                          @click="removeCheck1(index)"
                        ></b>
                      </p>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Row>
                <Col span="20">
                  <FormItem label="关联的信息分类：">
                    <Select
                      v-model="paramInfortype"
                      class="search-remote-input"
                      filterable
                      remote
                      :remote-method="infortypeSearch"
                      @on-change="changeInfor"
                      label-in-value
                      :loading="loading2"
                    >
                      <Option
                        v-for="(option, index) in optionsInfortype"
                        :value="option.id"
                        :key="index"
                      >{{option.text}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4" class="text-right">
                  <Button type="primary" @click="sortSelect">选择关联</Button>
                </Col>
              </Row>
              <Row>
                <Col span="20">
                  <ul class="fx-boxs" id="fxBox">
                    <li v-for="(item,index) in checkList2">
                      <p>
                        {{item.name}}
                        <b
                          class="icon-delete pull-right"
                          style="margin-right:35px"
                          @click="removeCheck2(index)"
                        ></b>
                      </p>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Row>
                <Col span="20">
                  <FormItem label="模板：">
                    <Input
                      type="text"
                      class="search-input"
                      disabled
                      v-model="addForm.templateName"
                    />
                  </FormItem>
                </Col>
                <Col span="4" class="text-right">
                  <Button type="primary" @click="mouldSelect">关联模板</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="关键字：" prop="keyword">
                <Input
                  type="text"
                  placeholder="请输入关键字"
                  class="search-input"
                  v-model="addForm.keyword"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="描述：" prop="description" style="width:50%;">
              <Input
                type="textarea"
                class="textarea-input"
                :rows="3"
                placeholder="请输入描述"
                v-model="addForm.description"
              />
            </FormItem>
          </Row>
          <Col span="12">
            <div style="background-color:#fff;text-align:center;">
              <i-button class="search-btn" type="primary" v-if="isEdit" @click="saveEdit">保存</i-button>
              <i-button class="search-btn" type="primary" v-else @click="saveAdd">保存</i-button>
              <i-button class="search-btn" type="default" @click="cancel">取消</i-button>
            </div>
          </Col>
        </Form>
      </Row>
    </Col>
    <!-- 关联品种 -->
    <Modal v-model="showselectModal" title="关联品种" :width="700" :mask-closable="false">
      <Row>
        <Form ref="selectModal" :model="selectform1" :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="12">
              <FormItem label="品种名称：" :label-width="85">
                <Input v-model="selectform1.name" class="search-input" placeholder="请输入品种名称"></Input>
              </FormItem>
            </Col>
            <Col span="12" class="text-right">
              <Button type="primary" @click="searchForm1">查询</Button>
              <Button @click="breedListReset" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table
          class="tableCommon"
          border
          ref="selection"
          :columns="columns2"
          :data="dataTable1"
          @on-selection-change="modalCheck1"
        ></Table>
        <oil-page
          :total="total1"
          :page-num="selectform1.pageNum"
          :page-size="selectform1.pageSize"
          @page-change="pageChange1"
          :page-size-opts="pageSizeOpts1"
          :show-sizer="showSizer"
        ></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="modalSave1">保存</i-button>
        <i-button type="default" @click="modalCancel1">取消</i-button>
      </div>
    </Modal>
    <!-- 关联信息单元 -->
    <Modal v-model="infoUnitModal" title="关联信息分类" :width="750" :mask-closable="false">
      <Row>
        <Form ref="selectModal" :model="selectform2">
          <Row type="flex" justify="space-between">
            <!--  <Col span="8">
            <FormItem label="站点：" :label-width="60">
              <Select v-model="selectform2.siteId">
                <Option v-for="item in siteList" :value="item.id" :key="item.id">{{ item.text }}</Option>
              </Select>
            </FormItem> 
            </Col>-->
            <Col span="7">
              <FormItem label="信息分类编码：" :label-width="120">
                <Input v-model="selectform2.code"></Input>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="信息分类名称：" :label-width="120">
                <Input v-model="selectform2.name"></Input>
              </FormItem>
            </Col>
            <Col span="7">
              <Button type="primary" @click="searchForm2">查询</Button>
              <Button @click="inforListReset" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
          <!-- <Row style="margin-bottom:20px">
            <Col span="24" class="text-right">
            <Button type="primary" @click="inforListSearch">查询</Button>
            <Button @click="inforListReset" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>-->
        </Form>
        <Table
          class="tableCommon"
          border
          ref="selection"
          :columns="columns3"
          :data="dataTable2"
          @on-selection-change="modalCheck2"
        ></Table>
        <oil-page
          :total="total2"
          :page-num="selectform2.pageNum"
          :page-size="selectform2.pageSize"
          @page-change="pageChange2"
          :page-size-opts="pageSizeOpts1"
          :show-sizer="showSizer"
        ></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="modalSave2">保存</i-button>
        <i-button type="default" @click="modalCancel2">取消</i-button>
      </div>
    </Modal>
    <!-- 关联模板 -->
    <Modal v-model="mouldModal" title="关联模板" :width="700" :mask-closable="false">
      <Row>
        <Form ref="selectModal" :model="selectform3" :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="12">
              <FormItem label="网站模板名称：" :label-width="110">
                <Input
                  v-model="selectform3.templateName"
                  class="search-input"
                  placeholder="请输入模板名称"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12" class="text-right">
              <Button type="primary" @click="searchForm3">查询</Button>
              <Button @click="templateReset" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table
          class="tableCommon"
          border
          :columns="columns4"
          :data="dataTable3"
          :row-class-name="rowClassName"
        ></Table>
        <oil-page
          :total="total3"
          :page-num="selectform3.pageNum"
          :page-size="selectform3.pageSize"
          @page-change="pageChange3"
          :page-size-opts="pageSizeOpts1"
          :show-sizer="showSizer"
        ></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="modalSave3">保存</i-button>
        <i-button type="default" @click="modalCancel3">取消</i-button>
      </div>
    </Modal>
  </Row>
</template>
<script>
import {
  websiteChannelEditUnique,
  websiteChannelInforType,
  websiteChannelEdit,
  websiteChannelAdd,
  websiteChannelBreedPage,
  websiteChannelBreed,
  websiteChannelInforTypePage,
  websiteChannelDetail,
  websiteChannelAddUnique,
  websiteTemplateList
} from "../../components/axios/website.js";
import { formatTime2, formData } from "../../../assets/js/common.js";
import OilPage from "../../components/page/page.vue";
export default {
  name: "addFrequencyManagement",
  components: {
    OilPage
  },
  watch: {
    showselectModal(newVal, oldVal) {
      if (newVal == true) {
        this.breedListSearch();
      } else {
        this.checkList11 = [];
      }
    },
    infoUnitModal(newVal, oldVal) {
      if (newVal == true) {
        this.inforListSearch();
      } else {
        this.checkList21 = [];
      }
    },
    mouldModal(newVal, oldVal) {
      if (newVal == true) {
        this.templateSearch();
      }
    },
    addModal(newVal, oldVal) {
      if (newVal == false) {
        this.changePre = "";
      } else {
        this.$refs["formValidate"].resetFields();
      }
    }
  },
  data() {
    const validateadd = (rule, value, callback) => {
      if (this.isEdit) {
        let params = {
          name: this.addForm.name,
          id: this.editId,
          siteId: this.treeArr.siteId,
          code: this.editCode
        };
        if (this.addForm.name == "") {
          callback(new Error("请输入频道名称"));
        }
        websiteChannelEditUnique(formData(params)).then(res => {
          if (res.response) {
            callback();
          } else {
            callback(new Error("频道名称重复"));
          }
        });
      } else {
        let params = {
          name: this.addForm.name,
          siteId: this.treeArr.siteId,
          parentCode: this.treeCode ? this.treeCode : ""
        };
        if (this.addForm.name == "") {
          callback(new Error("频道名称不能为空"));
        }
        websiteChannelAddUnique(formData(params)).then(res => {
          if (res.response) {
            callback();
          } else {
            callback(new Error("频道名称重复"));
          }
        });
      }
    };
    return {
      isEdit: false,
      loading: false,
      editId: null,
      title: "",
      changePre: "",
      paramBreed: "",
      optionsBreed: [],
      siteList: [],
      loading1: false,
      loading2: false,
      showselectModal: false,
      mouldModal: false,
      infoUnitModal: false,
      addModal: false,
      paramInfortype: "",
      treeArr: {},
      treeCode: "",
      checkList1: [],
      checkList11: [],
      checkList2: [],
      checkList21: [],
      checkList3: {},
      editCode: null,
      optionsInfortype: [],
      channelTypeList: [
        {
          value: 0,
          label: "品种类"
        },
        {
          value: 1,
          label: "资讯类"
        }
      ],
      selectform1: {
        name: "",
        pageNum: 1,
        pageSize: 5
      },
      dataTable1: [],
      total1: 0,
      selectform2: {
        name: "",
        code: "",
        //siteId: "",
        pageNum: 1,
        pageSize: 5
      },
      dataTable2: [],
      total2: 0,
      selectform3: {
        templateName: "",
        status: 0,
        pageNum: 1,
        pageSize: 5
      },
      dataTable3: [],
      total3: 0,
      columns2: [
        {
          type: "selection",
          align: "center",
          width: 50
        },
        {
          key: "name",
          title: "品种名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "jp",
          title: "缩写",
          align: "center",
          width: 130
        },
        {
          key: "qp",
          title: "别名",
          align: "center",
          width: 120
        }
      ],
      columns3: [
        {
          type: "selection",
          align: "center",
          width: 50
        },
        {
          key: "code",
          title: "信息分类编码",
          align: "center",
          minWidth: 150
        },
        {
          key: "treePathDTO",
          title: "信息分类路径",
          align: "center",
          minWidth: 180,
          render: (h, params) => {
            return h("div", {}, params.row.treePathDTO.path);
          }
        }
      ],
      columns4: [
        {
          align: "center",
          title: "操作",
          width: 80,
          render: (h, data) => {
            let defaults = false;
            let id = data.row.id;
            if (this.checkList3.id === id) {
              defaults = true;
            } else {
              defaults = false;
            }
            return h("Radio", {
              props: {
                value: defaults
              },
              on: {
                input: () => {
                  this.modalCheck3(data.row);
                }
              }
            });
          }
        },
        {
          key: "templateName",
          title: "网站模板名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "templateTypeName",
          title: "网站模板分类",
          align: "center",
          minWidth: 180
        }
      ],
      showSizer: true,
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      pageSizeOpts1: [5, 10, 20],
      addForm: {
        channelBreedVOList: [],
        channelInformationTypeVOList: [],
        channelInformationVOlist: [],
        channelSiteVO: [],
        showLineNumber: 1,
        type: 0,
        name: "",
        url: "",
        keyword: "",
        description: "",
        templateId: "",
        templateName: "",
        status:""
      },
      ruleValidate: {
        name: [
          { required: true, validator: validateadd, trigger: "blur" },
          {
            type: "string",
            message: "不超过100个字符",
            max: 100,
            trigger: "blur"
          }
        ],
        url: [
          { required: true, message: "网页网址不能为空", trigger: "blur" },
          {
            type: "string",
            message: "不超过100个字符",
            max: 100,
            trigger: "change"
          }
        ],
        keyword: [
          {
            type: "string",
            message: "不超过100个字符",
            max: 100,
            trigger: "change"
          }
        ],
        description: [
          {
            type: "string",
            message: "不超过300个字符",
            max: 300,
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.editId = this.$route.query.id;
    this.changePre = this.$route.query.pathName;
    this.treeCode = this.$route.query.treeCode;
    this.treeArr.siteId = this.$route.query.siteId;

    if (this.editId != -1) {
      this.editFun(this.editId);
      this.isEdit = true;
      this.title = "修改频道";
    } else {
      this.isEdit = false;
      this.title = "新增频道";
    }
  },
  methods: {
    goto() {
      window.reload();
    },
    //打开编辑页面
    editFun(editId) {
      websiteChannelDetail(formData({ id: editId })).then(res => {
        let data = res.response;
        this.addForm.name = data.name;
        this.addForm.status = data.status;
        this.addForm.type = data.type;
        this.addForm.showLineNumber = data.showLineNumber;
        this.addForm.url = data.url;
        this.addForm.keyword = data.keyword;
        this.addForm.description = data.description;
        this.treeArr.siteId = data.channelSiteVO.siteId;
        this.checkList1 = data.channelBreedVOList
          ? data.channelBreedVOList.map((e, v) => {
              return {
                channelId: e.channelId,
                id: e.breedId,
                name: e.breedName
              };
            })
          : [];
        this.checkList2 = data.channelInformationTypeVOList
          ? data.channelInformationTypeVOList.map((e, v) => {
              return {
                channelId: e.channelId,
                id: e.informationTypeId,
                name: e.informationTypeName
              };
            })
          : [];
        this.checkList3 = {
          id: data.templateId,
          templateName: data.templateName
        };
        this.addForm.templateName = data.templateName;
        this.addForm.templateId = data.templateId;
        this.editCode = data.code;
        this.treeArr = data.channelSiteVO;
        this.changePre = data.pathName;
      });
    },
    //品种模糊搜索
    breedSearch(query) {
      this.loading1 = true;
      websiteChannelBreed(formData({ name: query })).then(res => {
        this.optionsBreed = res.response;
        this.loading1 = false;
      });
    },
    changeBreed(option) {
      this.checkList1.push({
        id: option.value,
        name: option.label
      });
    },
    //选择关联
    showselect() {
      this.showselectModal = true;
    },
    //查询信息分类
    searchForm1() {
      this.selectform1.pageNum = 1;
      this.selectform1.pageSize = 5;
      this.breedListSearch(true);
    },
    //品种列表
    breedListSearch(isPage) {
      if (!isPage) {
        this.selectform1.pageNum = 1;
      }
      websiteChannelBreedPage(formData(this.selectform1)).then(res => {
        if (res.response && res.response.list) {
          this.dataTable1 = res.response.list;
          this.total1 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    //品种重置
    breedListReset() {
      this.selectform1 = {
        name: "",
        pageNum: 1,
        pageSize: 5
      };
    },
    pageChange1(page, size) {
      if (size) {
        this.selectform1.pageNum = 1;
        this.selectform1.pageSize = size;
      } else {
        this.selectform1.pageNum = page;
      }
      this.breedListSearch(true);
      this.checkList11 = [];
    },
    pageChange2(page, size) {
      if (size) {
        this.selectform2.pageNum = 1;
        this.selectform2.pageSize = size;
      } else {
        this.selectform2.pageNum = page;
      }
      this.inforListSearch(true);
      this.checkList21 = [];
    },
    //删除关联品种
    removeCheck1(index) {
      this.checkList1.splice(index, 1);
    },
    //点击取消关联品种
    modalCancel1() {
      this.breedListReset();
      this.checkList11 = [];
      this.showselectModal = false;
    },
    //点击取消信息分类
    modalCancel2() {
      this.inforListReset();
      this.checkList21 = [];
      this.infoUnitModal = false;
    },

    //切换值
    modalCheck1(selection) {
      this.checkList11 = selection
      // let list = this.checkList11;
      // for (var i = 0; i < selection.length; i++) {
      //   let isCF = false;
      //   for (var j = 0; j < list.length; j++) {
      //     if (list[j].id == selection[i].id) {
      //       isCF = true;
      //     }
      //   }
      //   if (!isCF) {
      //     this.checkList11.push(selection[i]);
      //   }
      // }
    },
    modalCheck2(selection) {
      this.checkList21 = selection
      // let list = this.checkList21;
      // for (var i = 0; i < selection.length; i++) {
      //   let isCF = false;
      //   for (var j = 0; j < list.length; j++) {
      //     if (list[j].id == selection[i].id) {
      //       isCF = true;
      //     }
      //   }
      //   if (!isCF) {
      //     this.checkList21.push(selection[i]);
      //   }
      // }
    },
    //点击保存品种分类
    modalSave1() {
      let list = this.checkList1;
      for (var i = 0; i < this.checkList11.length; i++) {
        let isCF = false;
        for (var j = 0; j < list.length; j++) {
          if (list[j].id == this.checkList11[i].id) {
            isCF = true;
          }
        }
        if (!isCF) {
          this.checkList1.push(this.checkList11[i]);
        }
      }

      this.showselectModal = false;
      this.modalCancel1();
    },
    //点击保存信息分类
    modalSave2() {
      let list = this.checkList2;
      for (var i = 0; i < this.checkList21.length; i++) {
        let isCF = false;
        ``;
        for (var j = 0; j < list.length; j++) {
          if (list[j].id == this.checkList21[i].id) {
            isCF = true;
          }
        }
        if (!isCF) {
          let obj = {};
          obj.id = this.checkList21[i].id;
          obj.name = this.checkList21[i].treePathDTO.path;
          this.checkList2.push(obj);
        }
      }
      this.infoUnitModal = false;
      this.modalCancel2();
    },
    //选择关联模板
    modalCheck3(selection) {
      this.checkList3 = selection;
    },
    //保存关联
    modalSave3() {
      this.addForm.templateName = this.checkList3.templateName;
      this.addForm.templateId = this.checkList3.id;
      this.checkList3 = {};
      this.mouldModal = false;
      this.modalCancel3();
    },
    //模糊搜索信息分类
    infortypeSearch(query) {
      this.loading2 = true;
      websiteChannelInforType(
        formData({
          name: query,
          siteId: this.treeArr.siteId == undefined ? "" : this.treeArr.siteId
        })
      ).then(res => {
        this.optionsInfortype = res.response;
        this.loading2 = false;
      });
    },
    changeInfor(option) {
      this.checkList2.push({
        id: option.value,
        name: option.label
      });
    },
    //删除关联信息分类
    removeCheck2(index) {
      this.checkList2.splice(index, 1);
    },
    //关联模板
    mouldSelect() {
      this.mouldModal = true;
    },
    //取消关联模板
    modalCancel3() {
      this.templateReset();
      this.checkList3 = {};
      this.mouldModal = false;
    },
    //关联信息分类
    sortSelect() {
      this.infoUnitModal = true;
    },
    //重置信息单元
    inforListReset() {
      this.selectform2 = {
        name: "",
        code: "",
        siteId: "",
        pageNum: 1,
        pageSize: 5
      };
    },
    //查询信息分类
    searchForm2() {
      this.selectform2.pageNum = 1;
      this.selectform2.pageSize = 5;
      this.inforListSearch(true);
    },
    //信息单元列表
    inforListSearch(isPage) {
      if (!isPage) {
        this.selectform2.pageNum = 1;
      }
      this.selectform2.siteId =
        this.treeArr.siteId == undefined ? "" : this.treeArr.siteId;
      websiteChannelInforTypePage(formData(this.selectform2)).then(res => {
        if (res.response && res.response.list) {
          this.dataTable2 = res.response.list;
          this.total2 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    searchForm3() {
      this.selectform3.pageNum = 1;
      this.selectform3.pageSize = 5;
      this.templateSearch(true);
    },
    //关联模板查询
    templateSearch(isPage) {
      if (!isPage) {
        this.selectform3.pageNum = 1;
      }
      websiteTemplateList(this.selectform3).then(res => {
        if (res.response && res.response.list) {
          this.dataTable3 = res.response.list;
          this.total3 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    //关联模板分页
    pageChange3(page, size) {
      if (size) {
        this.selectform3.pageNum = 1;
        this.selectform3.pageSize = size;
      } else {
        this.selectform3.pageNum = page;
      }
      this.templateSearch(true);
    },
    //选中改行
    rowClassName(row, index) {
      if (row.id == this.checkList3.id) {
        return "table-info-row";
      }
    },
    //关联模板重置
    templateReset() {
      this.selectform3 = {
        name: "",
        pageNum: 1,
        pageSize: 5
      };
    },
    //取消
    cancel() {
      this.$router.push({
        name: "frequencyManagement",
        query: {
          treeNode: this.$route.query.treeCode,
          isExpand: this.$route.query.expand,
          treeId: this.$route.query.treeId,
          siteNId: this.$route.query.siteId
        }
      });
    },
    //编辑
    saveEdit() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          if (!this.submitEdit) {
            this.submitEdit = true;
            let form = {
              channelBreedVOList: this.checkList1.map((e, v) => {
                return {
                  channelId: e.channelId
                    ? e.channelId
                    : this.treeArr.value ? this.treeArr.value : "",
                  breedId: e.id,
                  breedName: e.name
                };
              }),
              channelInformationTypeVOList: this.checkList2.map((e, v) => {
                return {
                  channelId: e.channelId
                    ? e.channelId
                    : this.treeArr.value ? this.treeArr.value : "",
                  informationTypeId: e.id,
                  informationTypeName: e.name
                };
              }),
              channelSiteVO: {
                channelId: this.treeArr.channelId ? this.treeArr.channelId : "",
                id: 0,
                siteId: this.treeArr.siteId ? this.treeArr.siteId : 1
              },
              name: this.addForm.name,
              url: this.addForm.url,
              type: this.addForm.type,
              showLineNumber: this.addForm.showLineNumber,
              keyword: this.addForm.keyword,
              description: this.addForm.description,
              templateId: this.addForm.templateId,
              templateName: this.addForm.templateName,
              code: this.editCode,
              status: this.addForm.status,
              id: this.editId
            };
            websiteChannelEdit(form).then(res => {
              if (res.message == "OK") {
                this.$Message.success("保存成功！");
                this.$router.push({
                  name: "frequencyManagement",
                  query: {
                    treeNode: this.$route.query.treeCode,
                    isExpand: this.$route.query.expand,
                    treeId: this.$route.query.treeId,
                    siteNId: this.$route.query.siteId
                  }
                });
              } else {
                this.$Message.error(res.message);
              }
              this.submitEdit = false;
            });
          }
        } else {
          return false;
        }
      });
    },
    //保存
    saveAdd() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          if (!this.submitAdd) {
            this.submitAdd = true;
            let form = {
              channelBreedVOList: this.checkList1.map((e, v) => {
                return {
                  channelId: this.treeArr.value ? this.treeArr.value : "",
                  breedId: e.id,
                  breedName: e.name
                };
              }),
              channelInformationTypeVOList: this.checkList2.map((e, v) => {
                return {
                  channelId: this.treeArr.value ? this.treeArr.value : "",
                  informationTypeId: e.id,
                  informationTypeName: e.name
                };
              }),
              channelSiteVO: {
                channelId: this.treeArr.value ? this.treeArr.value : "",
                id: 0,
                siteId: this.treeArr.siteId ? this.treeArr.siteId : 1
              },
              name: this.addForm.name,
              url: this.addForm.url,
              type: this.addForm.type,
              showLineNumber: this.addForm.showLineNumber,
              keyword: this.addForm.keyword,
              description: this.addForm.description,
              templateId: this.addForm.templateId,
              templateName: this.addForm.templateName,
              // code: this.editCode,
              code: this.treeCode,
              status: 0
            };
            websiteChannelAdd(form).then(res => {
              if (res.message == "OK") {
                this.$Message.success("保存成功！");
                this.$router.push({
                  name: "frequencyManagement",
                  query: {
                    treeNode: this.$route.query.treeCode,
                    isExpand: this.$route.query.expand,
                    treeId: this.$route.query.treeId,
                    siteNId: this.$route.query.siteId
                  }
                });
              } else {
                this.$Message.error(res.message);
              }
              this.submitAdd = false;
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
