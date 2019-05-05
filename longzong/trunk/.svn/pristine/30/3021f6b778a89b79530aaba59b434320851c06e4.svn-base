<style lang="less">
.defignDetail {
  position: relative;
  .breadcrumb{
      font-size:14px;color:#605f5f;margin-bottom:20px;
    }
  .title {
    display: block;
    border-bottom: 1px solid #5db2ff;
    padding-bottom: 18px;
    font-size: 16px;
  }
}
</style>


<template>
   <div class="defignDetail">
     <Row class-name='breadcrumb'>
       <Col span="24">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;流程定义&nbsp;&nbsp;>>&nbsp;&nbsp;流程定义详情
       </Col>
     </Row>
     <Card dis-hover>
        <b slot="title">流程定义详情</b>
        <ButtonGroup>
          <Button @click.native="$router.go(-1)">返回</Button>
          <Button type="primary" @click="showModal = true">流程图</Button>
          <Button type="primary" @click="showBpmnModal = true">BPMN</Button>
          <Button :type="curr_status === 1 ? 'error' : 'primary'" @click="operation()">{{curr_status === 1 ? '挂起' : '启用'}}</Button>
          <Button type="error" @click="operation('delete')">删除</Button>
        </ButtonGroup>
    </Card>


    <Card dis-hover style="margin-top:20px;">
        <b slot="title" class="title">流程定义信息</b>
         <Row class-name="detail_row">
        <Col span="8" v-for="item in detail" :key="item.key">
          <span style="display:inline-block;min-width:80px;margin-right:20px;">{{item.key}}:</span><span>{{item.value}}</span>
        </Col>
    </Row>
    </Card>

    <Modal
        fullscreen
        footer-hide
        v-model="showModal"
        title="流程图">
        <div>
          <img :src="processImgPath">
        </div>
    </Modal>

    <Modal
        fullscreen
        footer-hide
        v-model="showBpmnModal">
        <!-- <strong slot="close">删除！！！！！</strong> -->
        <!-- <Icon slot="close" type="ios-close-circle-outline" /> -->
        <div>
          <iframe src="/mysteel/workflow/model/add.htm" style="min-height:760px;width:100%;margin-top:30px;" frameborder="0" ></iframe>
        </div>
    </Modal>


    <Spin fix v-show="showSpin"></Spin>
   </div>
</template>



<script>
import { statusZero } from '../../components/axios/workflow.js'
const ENUM_PROCESS_DETAIL = {
  id: "ID",
  key: "KEY",
  admin: "创建人",
  time: "创建时间",
  name: "名称",
  desc: "描述",
  status: "状态",
  system: "系统平台",
  version: "版本",
  url: "URL"
};

import axios from "axios";
export default {
  name: "defignDetail",
  data() {
    return {
      showSpin: false,
      detail: [],
      showModal: false,
      showBpmnModal: false,

      // 当前状态
      curr_status: null
    };
  },

  created() {
    console.log(this.processId);
    this.showSpin = true;
    this.getDetail();
  },
  computed: {
    processId() {
      return this.$route.params.id;
    },
    processImgPath() {
      return (
        "/mysteel/workflow/process/image?id=" + this.processId
      );
    }
  },

  methods: {
    operation(type) {
      const title = type === "delete" ? "删除" : "挂起";

      this.$Modal.confirm({
        title: "请确认",
        content: `<span>确定要${title}该流程定义吗？</span>`,
        onOk: () => {
          if (type === "delete") {
            this.onDelete();
          } else {
            this.toggleStatus();
          }
        }
      });
    },
    getDetail() {
      axios
        .get("/mysteel/workflow/process/detail", {
          params: { id: this.processId }
        })
        .then(res => {
          statusZero(res.data.status)
          this.detail = [];
          this.curr_status = res.data.data["status"];
          for (const attr in ENUM_PROCESS_DETAIL) {
            let value = "";
            if (attr === "status") {
              value = this.curr_status === 1 ? "正常" : "挂起";
            } else {
              value = res.data.data[attr];
            }

            this.detail.push({
              key: ENUM_PROCESS_DETAIL[attr],
              value
            });
          }
          this.showSpin = false;
        });
    },

    // 切换状态
    toggleStatus() {
      const urlType = this.curr_status === 1 ? "disable" : "enable";
      axios
        .get("/mysteel/workflow/process/" + urlType, {
          params: { id: this.processId }
        })
        .then(res => {
          statusZero(res.data.status)
          if (res.data.data === "true") {
            this.showSpin = true;
            this.getDetail();
          } else {
            this.$Message.error("操作失败");
          }
        });
    },

    // 删除
    onDelete() {
      axios
        .get("/mysteel/workflow/process/delete", {
          params: { id: this.processId }
        })
        .then(res => {
          statusZero(res.data.status)
          console.log(res.data);
          if (res.data.data === "true") {
            this.$Notice.success({
              title: '删除成功'
            });
            this.$router.push({ name: "defign" });
          } else {
            this.$Message.error({
              content: res.data.message,
              duration: 3,
              closable: true
            });
          }
        });
    }
  }
};
</script>


