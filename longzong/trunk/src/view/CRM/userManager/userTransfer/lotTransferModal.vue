<style lang="less" scoped>

</style>
<template>
  <Modal
    v-model="showModal"
    title="批量划转"
    @on-cancel="cancel">
    <Row>
      <Button type="primary" @click="download" class="mar-b-20">模板下载</Button>
      <input type="file" name="file" @change="fileChange($event)" />
    </Row>
    <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button type="primary" @click="submit">确定</Button>
    </div>
  </Modal>
</template>
<script>
import {
  getTransferExcel,
  transferBatch
} from '../../../components/axios/crm'
import { formData } from '../../../../assets/js/common';
export default {
  props: {
    showTransferModal: Boolean
  },
  data() {
    return {
      showModal: false,
      file: {},
    }
  },
  methods: {
    fileChange(e) {
      console.log('e', e.target.files[0])
      this.file = e.target.files[0]
    },

    cancel() {
      this.showModal = false
      this.$emit('hide-modal')
    },
    // 确定
    submit() {
//      console.log('ff', this.file)
      let fileFormData = new FormData();
      fileFormData.append("file", this.file)
      transferBatch(fileFormData).then(res => {
        this.$Message.success('上传成功!')
        this.$emit('hide-modal')
      })
    },
    // 下载
    download() {
      window.location.href = '/crm/usertransfer/get-excel'
    }
  },
  watch: {
    showTransferModal(newVal, oldVal) {
      this.showModal = newVal
    }
  }
}
</script>
