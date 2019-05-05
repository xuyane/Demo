export default class PhoneCenterService {
  constructor () {
    this.url = '//mgt.oilchem.net';
  }

  // 获取会员登陆上下文
  getLoginContext(cb) {
    const that = this;
    $.ajax({
      url: this.url + '/eac/eac/commonEAC/getLoginContext',
      dataType: 'jsonp',
      success(res){
        that.interceptor(res.status);
        if (cb) cb({
          status: Number(res.status),
          message: res.message,
          // response: { ...res.response.expandMap ,{loginName: res.response.loginName} }
          response: Object.assign({}, res.response.expandMap, {loginName: res.response.loginName, ids: res.response.id, webUrl: res.response.webUrl})
        });
      }
    })
  }

  // 获取会员座机信息
  getExcode(adminId) {
    const that = this;
    return new Promise(resolve => {
      $.ajax({
        url: this.url + '/callcenter/call-center/calltelephonesetting/getExcode',
        dataType: 'jsonp',
        data: {adminId},
        success(res){
          that.interceptor(res.status);
          resolve(res);
        }
      });
    });
  }


  // 获取呼叫记录
  getCallRecord(params) {
    const that = this;
    return new Promise(resolve => {
      $.ajax({
        url: this.url + '/callcenter/call-center/calltelephonesetting/callRecordPage',
        dataType: 'jsonp',
        data: params,
        success(res){
          that.interceptor(res.status);
          resolve(res);
        }
      });
    });
  }


  interceptor(status) {
    if (status === 0) {
      window.location.href = this.url + '/login/login.htm';
    } else if (status === 2) {
      window.location.href = this.url + '/#/error';
    } else if (status === '500') {
      window.location.href = this.url + '/#/500';
    } else if (status === '502') {
      window.location.href = this.url + '/#/502';
    }
  }
}