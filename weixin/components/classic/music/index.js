import {
  classicBeh
} from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager();
Component({
  behaviors: [classicBeh],
  properties: {
    src: String,
    title:String
  },
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  attached: function (event) {
    this._recoverStatus();
    this._monitorSwitch();
  },
  detached: function (event) {
    // mMgr.stop()
  },
  methods: {
    onPlay: function (event) {
      // 图片要切换
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src;
        mMgr.title = this.properties.title;
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause();
      }
    },
    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return;
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function () {
      // 播放
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      // 暂停
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      // 关闭
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      // 自然播放完成
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})