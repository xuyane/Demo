Component({
  options: {
    multipleSlots: true
  },
  // 外部样式
  externalClasses:['tag-class'],
  properties: {
    text: String
  },
  data: {

  },
  methods: {
    onTap(event){
      // console.log(event);
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})