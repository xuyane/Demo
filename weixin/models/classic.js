import {
  HTTP
} from '../util/http.js'
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res);
        this._setLatestIndex(res.index);
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res);
      }
    })
  }
  getClassic(index, nextOrPervious, sCallback) {
    // 缓存中寻找 or API 
    let key = nextOrPervious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPervious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res);
        }
      })
    } else {
      sCallback(classic)
    }
  }
  isFirst(index) {
    return index == 1 ? true : false
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex == index ? true : false
  }
  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex() {
    let index = wx.getStorageSync('latest');
    return index
  }
  _getKey(index) {
    let key = 'classic-' + index;
    return key
  }
}

export {
  ClassicModel
}