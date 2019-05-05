import axios from 'axios';

export default function (phone, cb) {
  const userPhoneInfo = JSON.parse(window.localStorage.getItem('userPhoneInfo'));
  if (!userPhoneInfo) {
    console.error('拨号，userPhoneInfo不存在', userPhoneInfo);
    return;
  };

  if (!phone) {
    console.error('号码不存在');
    return;
  };

  phone = phone.toString();

  if (phone.length > 4 && phone.charAt(0) !== '0'){
    phone = '0' + phone;
  }

  // const isGl = userPhoneInfo.locationId === 3;
  const isGl = userPhoneInfo.glAdminId !== null;

  console.log('glAdminId', userPhoneInfo.glAdminId);
  if (isGl) {
    /*if (!userPhoneInfo.glAdminId) {
      console.error('glAdminId不存在');
      return;
    }*/


    axios.get('/json/reply/MQSendCallRequest', {
      params: {
        empolyeeid: userPhoneInfo.glAdminId,
           // empolyeeid: 198061,
        // phone: '15079010174'
        phone
      }
    }).then(res => {
      console.log('ok', res);
    }).catch(error => {
      console.error('error' + error);
    });
  }else {
    if (!isIE()) {
      console.error('请使用IE浏览器');
      return;
    }
    if (!userPhoneInfo.telephoneShortNumber) {
      console.error('分机号不存在');
      return;
    }

    CCLink.Ext_MakeCall(userPhoneInfo.telephoneShortNumber, phone);
    const time = formatDate(+new Date());
    addMsgRecord({
      callTypeDesc: '正在拨号',
      otherCode: phone,
      time
    });

    window.localStorage.setItem('calling', userPhoneInfo.telephoneShortNumber);
  }

  if (cb) cb({
    result: true,
    isGl
  });
}



function addMsgRecord(msg) {
  const sessionMsg = window.sessionStorage.getItem('phoneMsg');
  const msgArr = sessionMsg ? JSON.parse(sessionMsg) : [];
  msgArr.unshift(msg);
  window.sessionStorage.setItem('phoneMsg', JSON.stringify(msgArr));
}


function isIE() {
  return !!window.ActiveXObject || "ActiveXObject" in window;
}
