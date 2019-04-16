// pages/book/book.js
import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Promise 对象 函数
    // 对象 保存状态 函数 闭包函数
    // 异步代码 写在 Promise 
    // const promise = new Promise((resolve, reject) => {
    //   // pending fulfilled rejected
    //   // 进行中 已成功 已失败 凝固
    //   wx.getSystemInfo({
    //     success: (res) => {
    //       resolve(res)
    //     },
    //     fail: (error) => {
    //       reject(error)
    //     }
    //   })
    // })
    // const promise = new Promise((resolve, reject) => {
    //   wx.getSystemInfo({
    //     success: res => resolve(res),
    //     fail: error => reject(error)
    //   })
    // })
    // promise.then((res) => {
    //   console.log(11,res);
    // }, (error) => {
    //   console.log(error);
    // })
    // promise.then(
    //   res => console.log(res),
    //   error => console.log(res)
    // )


    // const hotList = bookModel.getHotList();
    // // console.log(hotList)
    // hotList.then(
    //   res => {
    //     console.log(res)
    //     bookModel.getMyBookCount()
    //       .then(res => {
    //         console.log(res)
    //         bookModel.getMyBookCount()
    //           .then(res => {
    //             console.log(res)
    //           })
    //       })
    //   }
    // )

    bookModel.getHotList()
      .then(res => {
        this.setData({
          books: res
        })
      })
  },
  onSearching(event) {
    this.setData({
      searching: true
    })
  },
  onCancel(event) {
    this.setData({
      searching: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1123);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})