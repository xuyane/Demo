import GlTabs from './classes/Tab'
import CallLink from './classes/CallLink'
import HttpService from './classes/service'

console.log('4-28');
window.localStorage.removeItem('userPhoneInfo');
window.addEventListener('DOMContentLoaded', function () {
  getDatas().then(res => {
    let { userPhoneInfo, callInRecord, callOutRecord } = res;
    let hasConnected = false;
    if (userPhoneInfo) {
      window.localStorage.setItem('userPhoneInfo', JSON.stringify(userPhoneInfo));

      // 弹窗title
      const modalTitle = $('.pc_modal .pc_model_title .pc_model_title_wrap span');
      modalTitle.text(`隆众呼叫中心（我的分机号：${userPhoneInfo.telephoneShortNumber}）`);
    }

    /* CallLink */
    const callLink = new CallLink(userPhoneInfo);
    callLink.onConnect(function (res) {
      if (!res) return;
      if (res.result) {
        hasConnected = true;
        window.localStorage.setItem('hasConnected', 'true');
        console.log('服务器连接成功');
      } else {
        hasConnected = false;
        window.localStorage.removeItem('hasConnected');
        console.error('服务器连接失败---' + res.msg);
      }
    })
    /* CallLink end */

    // 消息中心
    const msgCenter = $('.pc_modal .pc_model_content .pc_model_content_wrap .down .msg_wrap');
    const sessionMsg = window.sessionStorage.getItem('phoneMsg');
    const msgArr = sessionMsg ? JSON.parse(sessionMsg) : [];
    if (msgArr.length) {
      const html = renderMsg(msgArr);
      msgCenter.prepend(html);
    }

    /*  tab  */
    const tab = $('.pc_modal .pc_model_content .pc_model_content_wrap .pc_tabs .pc_tabs_bar');
    const tabBars = tab.find('.bars .bar-item');
    const tabLine = tab.find('.bars-line');
    const tabContentWarp = $('.pc_modal .pc_model_content .pc_model_content_wrap .pc_tabs .pc-tabs-content');

    const glTabs = new GlTabs(tabBars, tabLine, tabContentWarp);
    tabBars.click(function () {
      glTabs.changeTab(this);
    })
    /*  tab end  */

    /*  switch  */
    const extra = $('.pc_modal .pc_model_content .pc_model_content_wrap .pc_tabs .pc_tabs_bar .extra');
    const mySwitch = extra.find('.switch .my-switch');
    const connectText = extra.find('.switch .connent_text');
    mySwitch.click(function () {
      hasConnected = !hasConnected;
      if (hasConnected) {
        callLink.onConnect.call(this, function (res) {
          if (!res) return;
          if (res.result) {
            $(this).addClass('active');
            connectText.text('已连接服务');
            window.localStorage.setItem('hasConnected', 'true');
          } else {
            $(this).removeClass('active');
            connectText.text('已断开服务');
            window.localStorage.removeItem('hasConnected');
          }
          alert(res.msg);
        })
      } else {
        callLink.onDisConnect.call(this, function (res) {
          if (res) {
            $(this).removeClass('active');
            connectText.text('已断开服务');
            window.localStorage.removeItem('hasConnected');
          }
        })
      }
    });
    /*  switch end */

    /* 挂机 */
    const hungUpBtn = $('.pc_modal .pc_model_content .pc_model_content_wrap .pc_tabs .pc_tabs_bar .extra .hung-up button');
    hungUpBtn.click(function () {
      // if ($(this).hasClass('disable')) return;
      const calling = window.localStorage.getItem('calling');
      if (calling) {
        // console.log('挂断' + calling);
        callLink.onHangUp.call(this, Number(calling), function (res) {
          if (res) {
            window.localStorage.removeItem('calling');
            $(this).addClass('disable');
            alert('已挂断');

            const time = formatDate(+new Date());
            const obj = {
              callTypeDesc: '已挂机',
              otherCode: calling,
              time: time
            }
            addMsgRecords(msgCenter, obj);
          }
        })
      }
    })

    /* 挂机 end */

    /* 拨号 */
    const callControl = $('.pc_modal .pc_model_content .pc_model_content_wrap .pc_tabs .pc-tabs-content .content-item .call-out');
    const callInput = callControl.find('input');
    const callBtn = callControl.find('button');

    callBtn.click(function () {
      let callNumber = callInput.val();
      if (callNumber.length > 4 && callNumber.charAt(0) !== '0') {
        callNumber = '0' + callNumber
      }

      // memberInfo(callNumber);

      if (/^\d{1,}$/.test(callNumber)) {
        callLink.onDial(callNumber, function (callStatus) {
          if (callStatus) {
            // window.localStorage.setItem('dialing', callNumber);
            alert(callNumber + '拨号成功');
            const time = formatDate(+new Date());
            const obj = {
              callTypeDesc: '正在拨号',
              otherCode: callNumber,
              time: time
            }
            addMsgRecords(msgCenter, obj);
          }
        })
      } else {
        alert('请输入正确的号码');
      }
    })
    /* 拨号 end */

    /* table */
    const table = $('.pc_modal .pc_model_content .pc_model_content_wrap .pc_tabs .pc-tabs-content .content-item table');
    const tbody = table.find('tbody');
    const tfoot = table.find('tfoot');

    if (callInRecord.length) {
      renderTable(callInRecord);
      tfoot.first().hide();
      tbody.first().html(renderTable(callInRecord));
    } else {
      tfoot.first().show();
    }

    if (callOutRecord.length) {
      tfoot.last().hide();
      tbody.last().html(renderTable(callOutRecord));
    } else {
      tfoot.last().show();
    }

    table.on('click', 'tr td span', function (evt) {
      // console.log(this.innerText);
      let callNumber = this.innerText;
      if (callNumber.length > 4 && callNumber.charAt(0) !== '0') {
        callNumber = '0' + callNumber;
      }

      callLink.onDial(callNumber, callStatus => {
        if (callStatus) {
          alert(callNumber + '拨号成功');
          const time = formatDate(+new Date());
          const obj = {
            callTypeDesc: '正在拨号',
            otherCode: callNumber,
            time: time
          }
          addMsgRecords(msgCenter, obj);
        }
      })
    })
    /* table end */

    /* 转移回收 */
    /* const btnWrap = $('.pc_modal .pc_model_content .pc_model_content_wrap .pc_tabs .pc_tabs_bar .extra');
    const moveBtn = btnWrap.find('.move button');
    const recoveryBtn = btnWrap.find('.recovery button');

    moveBtn.click(function () {
      // if ($(this).hasClass('disable')) return;
      const number = prompt('请输入转移电话', '');
      if (number) {
        callLink.onMove(function (res) {
          if (res) {
            moveBtn.addClass('disable');
            recoveryBtn.removeClass('disable');
            alert('转移成功');
          }
        });
      }
    });

    recoveryBtn.click(function () {
      // if ($(this).hasClass('disable')) return;
      callLink.onRecovery(function (res) {
        if (res) {
          moveBtn.removeClass('disable');
          recoveryBtn.addClass('disable');
        }
      });
    }); */
    /* 转移回收 end */
  })
})

function renderTable (data) {
  let html = '';
  data.forEach(item => {
    html += `<tr>
                  <td>${item.createTimeDesc}</td>
                  <td>${item.callTypeDesc}</td>
                  <td>${item.connectTimeLenDesc}</td>
                  <td>
                    <span>${item.otherCode}</span>
                  </td>
                </tr>`;
  })
  return html;
}

function getDatas () {
  const http = new HttpService();
  const defaultInfo = {
    linkPort: 2008,
    linkHost: '122.5.105.194'
  };
  return new Promise(resolve => {
    http.getLoginContext(function (res) {
      if (res.status === 200) {
        const loginContext = res.response;
        console.log('context2', loginContext);
        if (loginContext) {
          Promise.all([
            // http.gettelephoneShortNumber(loginContext.ids),
            http.getCallRecord({adminId: loginContext.ids, type: 1}),
            http.getCallRecord({adminId: loginContext.ids, type: 2})
          ]).then(datas => {
            resolve({
              userPhoneInfo: {...defaultInfo, ...loginContext},
              callInRecord: datas[0].response.slice(0, 6) || [],
              callOutRecord: datas[0].response.slice(0, 6) || []
            })
          })
        }
      }
    })
  })
}