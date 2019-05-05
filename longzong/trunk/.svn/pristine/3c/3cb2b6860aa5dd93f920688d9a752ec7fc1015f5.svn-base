<style lang="less" scoped>
  .text {
    font-size: 14px;
  }
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;系统配置&nbsp;&nbsp;>>&nbsp;&nbsp;模板详情
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :label-width="100">
        <Col span="24">
          <FormItem label="模板名称:">
            <span class="text">{{dataList.name}}</span>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="产品分类:">
            <span class="text">{{dataList.productCategoryName}}</span>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="是否英文模板:">
            <span class="text">{{dataList.type === 1 ? '是' : '否'}}</span>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="状态:">
            <span class="text">{{dataList.status === 1 ? '可用' : '不可用'}}</span>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="条款内容:">
            <div v-for="item in dataList.contentVOs" :key="item.id">
              <span>{{formatNum(item.orderNum)}}、 </span>{{item.content}}
            </div>
          </FormItem>
        </Col>
      </Form>
    </Col>
  </Row>
</template>
<script>
import {
  getContractTempletInfo
} from '../../../components/axios/crm.js'
export default {
  data() {
    return {
      id: this.$route.query.id || '',
      dataList: {},
      numMap: [
        { val: 1, desc: '一' },
        { val: 2, desc: '二' },
        { val: 3, desc: '三' },
        { val: 4, desc: '四' },
        { val: 5, desc: '五' },
        { val: 6, desc: '六' },
        { val: 7, desc: '七' },
        { val: 8, desc: '八' },
        { val: 9, desc: '九' },
        { val: 10, desc: '十' },
        { val: 11, desc: '十一' },
        { val: 12, desc: '十二' },
        { val: 13, desc: '十三' },
        { val: 14, desc: '十四' },
        { val: 15, desc: '十五' },
        { val: 16, desc: '十六' },
        { val: 17, desc: '十七' },
        { val: 18, desc: '十八' },
        { val: 19, desc: '十九' },
        { val: 20, desc: '二十' }
      ]
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      // this.$Spin.show()
      getContractTempletInfo(this.id).then(res => {
        this.dataList = res.response
      })
    },
    formatNum(value) {
      let desc = ''
      if(value > 20) {

      } else {
        this.numMap.map(item => {
          if(item.val === value) {
            desc = item.desc
          }
        })
      }
      return desc
    }
  }
}
</script>
