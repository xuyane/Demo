Component({
  properties: {
    book: Object
  },
  data: {

  },
  methods: {
    onTap(event) {
      const bid = this.properties.book.id
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`
      })
    }
  }
})