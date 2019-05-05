function addMsgRecords(msgCenter, obj) {
  const sessionMsg = window.sessionStorage.getItem('phoneMsg');
  const msgArr = sessionMsg ? JSON.parse(sessionMsg) : [];
  msgArr.unshift(obj);
  msgCenter.empty();
  const html =  renderMsg(msgArr);
  msgCenter.prepend(html);
  window.sessionStorage.setItem('phoneMsg', JSON.stringify(msgArr));
}
