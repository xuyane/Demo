Component({
  options: {
    multipleSlots: true
  },
  // 组件的属性列表
  properties: {
    openType: {
      type: String
    }
  },
  data: {

  },
  methods: {
    onGetUserInfo(event) {
      console.log('event', event);
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})