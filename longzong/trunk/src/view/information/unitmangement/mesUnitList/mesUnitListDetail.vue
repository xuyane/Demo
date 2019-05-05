<style lang="less" scoped>
@import "./mesUnit.less";
@import "./taskplant.less";
@import "./mytaskReach.less";
.unit .unit_title span,
.unit_content {
  width: 100%;
}

.unit_content .unit_content_left {
  width: 50%;
}

.unit_content .unit_s_left {
  width: 40%;
}

.unit_content .unit_s_right {
  width: 60%;
}

/*
信息单元列表 关联信息单元
*/
</style>
<template>
    <Row>
        <Col span="24">
        <Row class-name="current-position">
            当前位置：
            <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>
            &nbsp;&nbsp;>>&nbsp;&nbsp;
            <router-link to="/unitMangement" class="link-css">信息单元列表</router-link>
            &nbsp;&nbsp;>>&nbsp;&nbsp; 
            <a @click="goto" class="link-css">关联信息单元</a>
            
            
        </Row>
        </Col>
        <Col span="24" class="plant-content">
        <!--人员信息start-->
        <div class="unit">
            <div class="unit_title">
                <span>信息单元基本信息</span>
            </div>
            <div class="unit_content">
                <div class="unit_content_left">
                    <div class="unit_s_left">信息单元编码：</div>
                    <div class="unit_s_right">{{infromationCode}}</div>
                </div>
                <div class="unit_content_left no_line">
                    <div class="unit_s_left">信息单元名称：</div>
                    <div class="unit_s_right no-right-border">{{infromationName}}</div>
                </div>
            </div>
            <div class="height-50">
                <Col class="border-up-no">
                <Button class="margin-zy20px" @click="basicInformation">基本信息</Button>
                <Button class="margin-zy20px" @click="infoContacts">信息联系人</Button>
                <Button class="margin-zy20px" @click="publishedInfo">已发布信息</Button>
                </Col>
            </div>
        </div>
        <!--人员信息end-->
        <Row>
            <Col span="24" class="text-align-center font-size1 height-50">关联信息单元</Col>
            <Col span="24" class="height-50">
            <Button type="primary" class="margin-y20px" @click="addInfomation">新增相关信息单元</Button>
            </Col>
            <Col span="24">
            <Table border :columns="columns1" :data="data6"></Table>
            </Col>
            <Col span="24" class="text-align-center height-50">
            <Button type="primary" class="margin-zy20px" @click="cancelTaskQuotaRelation">返回</Button>
            </Col>
        </Row>

        <!-- 新增信息单元开始 -->
        <Modal v-model="createInfromation" title="新增信息单元" width="600px" @on-cancel="deleteAddInformation">
            <Form ref="createInfromationModel" :model="createInfromationModel" :label-width="120">
                <Row>
                    <Col span="24">
                    <FormItem label="序号 ：">
                        <Input v-model="createInfromationModel.sortNumber" class="search-input" placeholder="请输入序号" style="width: 300px"></Input>
                        <!-- <i-button type="primary">新增信息单元</i-button>  -->
                        <infomation @close="close2"></infomation>
                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="信息单元 : ">
                        <Select v-model="createInfromationModel.relationTaskId" filterable remote :remote-method="remoteMethodEmployee" :loading="loadingEmploy">
                            <Option v-for="(option, index) in options1" :value="option.value" :key="index" style="width:100%">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <i-button type="primary" @click="saveRelationInfromation" :disabled="isCloseModal">保存</i-button>
                <i-button type="primary" @click="cancelRelationInfromation">取消</i-button>
            </div>
        </Modal>
        <!-- 新增信息单元结束 -->
        <to-base-information-detail-modal :showDetailModal="showDetailModal" @hide-Modal="hideDetailModal" ref="baseIfo"></to-base-information-detail-modal>
        <to-base-information-linker-detail-modal :showLinkerDetailModal="showLinkerDetailModal" :linkerData="linkerData" @hide-linker-Modal="hideLinkerDetailModal"
            ref="linkerIfo"></to-base-information-linker-detail-modal>
        <to-base-information-publish-modal :showPublishModal="showPublishModal" :linkerData="linkerData" @hide-Publish-Modal="hidePublishModal"
            ref="publishIfo"></to-base-information-publish-modal>
        <!--短信-->
        <to-base-information-publish-short-modal :showPublishShortModal="showPublishShortModal" :linkerData="linkerData" @hide-Publish-Short-Modal="hidePublishShortModal"
            ref="publishShortIfo"></to-base-information-publish-short-modal>
        <!--短讯-->
        <to-base-information-publish-message-modal :showPublishMessageModal="showPublishMessageModal" :linkerData="linkerData" @hide-Publish-Message-Modal="hidePublishMessageModal"
            ref="publishMessageIfo"></to-base-information-publish-message-modal>
        </Col>
    </Row>
</template>
<script>
import toBaseInformationDetailModal from "./baseTaskInformation.vue";
import toBaseInformationLinkerDetailModal from "./informationLinker.vue";
import toBaseInformationPublishModal from "./publishInformation.vue";
import toBaseInformationPublishShortModal from "./publishShortInformation.vue";
import toBaseInformationPublishMessageModal from "./publishMessageInformation.vue";
import infomation from "../addInformationUnit";
import {
  getRelationTaskDetail,
  taskSelect,
  saveTaskSelect,
  findInformationType,
  doDelete,
  taskSelectOther
} from "./api/mesUnitList.js";
import { formData } from "../../../../assets/js/common.js";

export default {
  name: "mesUnitListDetail",
  components: {
    toBaseInformationDetailModal,
    toBaseInformationLinkerDetailModal,
    toBaseInformationPublishModal,
    toBaseInformationPublishShortModal,
    toBaseInformationPublishMessageModal,
    infomation
  },
  data() {
    return {
      createInfromationModel: {
        sortNumber: null,
        relationTaskId: null
      },
      bigType: 0,
      options1: [],
      loadingEmploy: false,
      createInfromation: false,
      itemtaskListOne: [],
      publishedModal: false,
      taskId: this.$route.query.taskId,
      linkerData: {},
      showDetailModal: false,
      showLinkerDetailModal: false,
      showPublishModal: false,
      showPublishShortModal: false,
      showPublishMessageModal: false,
      infromationCode: "",
      infromationId: "",
      infromationName: "",
      infoType: [
        { value: 1, label: "全部" },
        { value: 2, label: "文章类" },
        { value: 3, label: "行情类" }
      ],
      columns1: [
        {
          title: "序号",
          key: "sortNumber",
          align: "center"
        },
        {
          title: "信息单元",
          key: "relationName",
          align: "center",
          loading: true
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, data) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    marginRight: "8px",
                    color: "#145edb",
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#F42C2C"
                  },
                  on: {
                    click: () => {
                      this.delete(data);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data6: [],
      isCloseModal: false
    };
  },
  created() {
    this.getRelationTaskDetail();
  },
  methods: {
    goto() {
      window.reload();
    },
    delete(data) {
      let form = {
        id: data.row.id
      };
      doDelete(formData(form)).then(res => {
        if (res.status == 200) {
          this.data6.splice(data.index, 1);
        }
      });
    },
    addInfomation() {
      this.createInfromation = true;
      this.isCloseModal = false;
    },
    getRelationTaskDetail() {
      let form = {
        taskId: this.$route.query.taskId,
        informationUnitId: this.$route.query.informationUnitId
      };
      getRelationTaskDetail(formData(form)).then(res => {
        let that = this;
        if (
          res.response.taskRelationVOList != null &&
          res.response.taskRelationVOList.length > 0
        ) {
          const list = res.response.taskRelationVOList.map(item => {
            return {
              sortNumber: item.sortNumber,
              relationName: item.relationName,
              id: item.id
            };
          });
          that.data6 = list;
        }

        let obj = {
          infromationName: res.response.name,
          infromationCode: res.response.code
        };
        this.linkerData = obj;

        this.infromationId = res.response.id;
        this.infromationCode = res.response.code;
        this.infromationName = res.response.name;
        this.bigType = res.response.bigType;
      });
    },
    deleteAddInformation() {
      this.createInfromationModel.relationTaskId = null;
      this.createInfromationModel.sortNumber = null;
      this.createInfromation = false;
    },
    cancelRelationInfromation() {
      this.createInfromationModel.relationTaskId = null;
      this.createInfromationModel.sortNumber = null;
      this.createInfromation = false;
      this.isCloseModal = false;
    },
    saveRelationInfromation() {
      let params = {
        relationTaskId: this.createInfromationModel.relationTaskId,
        taskId: this.taskId,
        sortNumber: this.createInfromationModel.sortNumber
      };
      this.isCloseModal = true;
      saveTaskSelect(params).then(res => {
        this.isCloseModal = false;
        if (res.status == 200) {
          this.createInfromation = false;
          this.$Message.success("信息单元关联成功");
          this.getRelationTaskDetail();
          this.createInfromationModel.relationTaskId = null;
          this.createInfromationModel.sortNumber = null;
        }
      });
    },
    // 模糊搜索任务
    remoteMethodEmployee(query) {
      if (query !== "") {
        this.loadingEmploy = true;
        let params = {
          name: query,
          taskId: this.$route.query.taskId
        };
        setTimeout(() => {
          this.loadingEmploy = false;
          taskSelectOther(formData(params)).then(res => {
            const list1 = res.response.map(item => {
              return {
                value: item.id,
                label: item.text
              };
            });
            this.options1 = list1;
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    // 跳转基本信息
    basicInformation() {
      this.showDetailModal = true;
      this.$refs.baseIfo.toInformationDetailRequest();
    },
    // 隐藏基本信息
    hideDetailModal(data) {
      this.showDetailModal = data;
    },
    // 跳转信息单元联系人
    infoContacts() {
      this.showLinkerDetailModal = true;
      this.$refs.linkerIfo.getListPage();
    },
    // 隐藏信息联系人
    hideLinkerDetailModal(data) {
      this.showLinkerDetailModal = data;
    },
    // 跳转相关信息单元
    relatedInfoUnit() {
      this.showRelationModal = true;
      this.$refs.relationIfo.relatedInfoUnitTask();
    },
    // 隐藏信息联系人
    hideRelationModal(data) {
      this.showRelationModal = data;
    },
    // 取消
    cancelTaskQuotaRelation() {
      this.$router.push({ name: "unitMangement" });
    },
    // 已发布信息
    publishedInfo() {
      if (this.bigType == 4) {
        // 短信
        this.showPublishShortModal = true;
        this.$refs.publishShortIfo.toShortInformationList();
      } else if (this.bigType == 5) {
        this.showPublishMessageModal = true; // 短讯短讯
        this.$refs.publishMessageIfo.toMessageInformationList();
      } else {
        this.showPublishModal = true;
        this.$refs.publishIfo.toPublishInformationList();
      }
    },
    // 隐藏已发布文章信息
    hidePublishModal(data) {
      this.showPublishModal = data;
    },

    // 隐藏已发布短息信息
    hidePublishShortModal(data) {
      this.showPublishShortModal = data;
    },

    // 隐藏已发布短讯信息
    hidePublishMessageModal(data) {
      this.showPublishMessageModal = data;
    },
    close2(val) {
      this.createInfromation = val;
    }
  }
};
</script>