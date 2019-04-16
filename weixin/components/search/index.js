import {
  KeywordModel
}
from '../../models/keyword.js'
import {
  BookModel
}
from '../../models/book.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  properties: {

  },
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q:''
  },
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })

  },
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },
    onDelete(event) {
      this.setData({
        searching: false
      })
    },
    onConfirm(event) {
      this.setData({
        searching: true
      })
      const q = event.detail.value || event.detail.text;
      bookModel.search(0, q).then(res => {
        this.setData({
          dataArray: res.books,
          q:q
        })
        keywordModel.addToHistory(q);
      })
    }
  }
})