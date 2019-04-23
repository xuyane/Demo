import {
  KeywordModel
}
from '../../models/keyword.js'
import {
  BookModel
}
from '../../models/book.js'

import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({

  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter:false
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
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      // const length = this.data.dataArray.length;
      if (this.hasMore()) {
        // this.data.loading = true;
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          // const tempArray = this.data.dataArray.concat(res.books);
          this.setMoreData(res.books);
          // this.setData({
          //   dataArray: tempArray
          // })
          // this.data.loading = false;
          this.unLocked();
        },()=>{
          this.unLocked();
        })
      }
    },
    // _isLocked() {
    //   return this.data.loading ? true : false
    // },
    // _locked() {
    //   this.setData({
    //     loading:true
    //   })
    // },
    // _unLocked() {
    //   // this.data.loading = false;
    //   this.setData({
    //     loading:false
    //   })
    // },
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
      this.initialize();
    },
    onDelete(event) {
      this.initialize();
      this._closeResult()
    },
    onConfirm(event) {
      this._showResult();
      this._showLoadingCenter();
      // this.initialize();
      const q = event.detail.value || event.detail.text;
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books);
        this.setTotal(res.total)
        this.setData({
          // dataArray: res.books,
          q: q
        })
        keywordModel.addToHistory(q);
        this._hideLoadingCenter();
      })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        searching: false,
        q:''
      })
    }
  }
})