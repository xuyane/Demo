import axios from 'axios'
export default class CallLink {
  constructor (userPhoneInfo) {
    this.userPhoneInfo = userPhoneInfo
    // this.isGl = userPhoneInfo.locationId === 3;
    this.isGl = userPhoneInfo.glAdminId !== null
  }

  // 拨号
  onDial (phone, cb) {
    if (this.isGl) {
      axios.get('/json/reply/MQSendCallRequest', {
        params: {
          empolyeeid: this.userPhoneInfo.glAdminId,
          // empolyeeid: 198061,
          phone
        }
      }).then(res => {
        console.log('OA网页呼叫成功', res)
        }).catch(error => {
        console.log('OA网页呼叫失败' + error)
        })
    } else {
      CCLink.Ext_MakeCall(this.userPhoneInfo.telephoneShortNumber, phone)
    }
    if (cb) cb(true)
  }

  // 挂机
  onHangUp (number, cb) {
    if (!number || !CCLink || this.isGl) return
    CCLink.Ext_DropCall(number)
    if (cb) cb(true)
  }

  // 转移
  onMove (number, cb) {
    CCLink.Ext_TransferCall(this.userPhoneInfo.telephoneShortNumber, number)
    if (cb) cb(true)
  }

  // 回收
  onRecovery (number, cb) {
    CCLink.Ext_TransferCall(this.userPhoneInfo.telephoneShortNumber)
    if (cb) cb(true)
  }

  // 连接服务
  onConnect (cb) {
    // console.log(this.isGl);
    let result
    if (this.isGl) {
      // console.log(this.isGl);
      this._connectGLink()
      result = null
    } else {
      result = this._connectCClink()
    }

    if (cb) cb(result)
  }

  // 链接钢炼服务器
  _connectGLink () {
    // {empolyeeid: this.userPhoneInfo.glAdminId}
    axios.get('/json/reply/MQSendInitRequest', {params: {empolyeeid: this.userPhoneInfo.glAdminId}}).then(res => {
      if (res) {
        console.log('OA网页呼叫初始化成功!');
      }
    }).catch(err => {
      console.error('OA网页呼叫初始化失败!' + err);
    })
  }

  _connectCClink () {
    if (!isIE()) return null
    if (!CCLink) {
      return {
        result: false,
        msg: 'CCLink未安装'
      }
    }
    if (!this.userPhoneInfo.linkHost || !this.userPhoneInfo.linkPort) {
      return {
        result: false,
        msg: 'ip或密码不存在'
      }
    }

    // 连接服务器
    const err_link = CCLink.Link_ConnectServer(this.userPhoneInfo.linkHost, this.userPhoneInfo.linkPort, 1)
    if (err_link) {
      return {
        result: false,
        msg: '连接呼叫中心服务器失败' + err_link
      }
    }

    // 绑定分机
    const err_assign = CCLink.Ext_Assign(this.userPhoneInfo.telephoneShortNumber, this.userPhoneInfo.telephoneShortNumber) //绑定到分机设备
    if (err_assign) {
      return {
        result: false,
        msg: '绑定分机失败' + err_assign
      }
    }

    // 将分机签入队列
    CCLink.Ext_CheckInQueue(this.userPhoneInfo.telephoneShortNumber)
    this.has_connected = true

    return {
      result: true,
      msg: '连接呼叫中心服务器成功'
    }
  }

  // 断开服务
  onDisConnect (cb) {
    if (!CCLink || this.isGl) return
    CCLink.Link_DisConnectServer()
    if (cb) cb(true)
    // this.has_connected = false;
    // this.calling = false;
  }
}

function isIE () {
  return !!window.ActiveXObject || 'ActiveXObject' in window
}