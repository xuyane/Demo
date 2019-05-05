<style lang="less" scoped>
</style>
<template>
  <Modal
    v-model="showModal"
    title="跟踪延期"
    @on-cancel="cancel"
    @on-ok="ok">
    <Row>
      <DatePicker
        v-model="time"
        type="date"
        :options="options"
        placeholder="Select date"
        class="search-input">
      </DatePicker>
    </Row>
  </Modal>
</template>
<script>
import { saveDelayApply } from "../../../components/axios/crm";
import { formatStamp } from "../../../../assets/js/common";
export default {
  props: {
    showDelayModal: Boolean,
    delayData: Object
  },
  data() {
    return {
      showModal: false,
      dataList: {},
      adminId: null,
      time: "",
      options: {
        disabledDate(date) {
          const start = new Date(
            new Date(new Date().toLocaleDateString()).getTime()
          );
          start.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
          return date && date.valueOf() > start;
        },
        shortcuts: [
          {
            value: () => {
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              return start;
            },
            text: "一周"
          },
          {
            value: () => {
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 15);
              return start;
            },
            text: "半个月"
          },
          {
            value: () => {
              const start = new Date(
                new Date(new Date().toLocaleDateString()).getTime()
              );
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              return start;
            },
            text: "一个月"
          }
        ]
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("hide-modal");
    },
    ok() {


      let params = {
        userId: this.dataList.userId || "",
        delayServiceEndTime: this.time
          ? formatStamp(this.time) + 60 * 60 * 24 * 1000 - 1000
          : "",
        adminId: this.adminId || ""
      };
      saveDelayApply(params).then(res => {
        this.$Message.success("申请成功，等待后台审核");
        this.$emit("hide-modal1");
        this.$emit("hide-modal");
      });
      this.$emit("hide-modal");
    }
  },
  watch: {
    showDelayModal(newVal, oldVal) {
      this.showModal = newVal;
    },
    delayData(newVal, oldVal) {
      console.log("new", newVal);
      this.dataList = newVal;
      let list = newVal.userManagerDetailVOs || [];
      if (list && list.length > 0) {
        list.map(item => {
          if (item.isMainAdmin === 1) {
            this.adminId = item.adminId;
          }
        });
      } else if (newVal.adminId) {
        this.adminId = newVal.adminId;
      }
    }
  }
};
</script>

