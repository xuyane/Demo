function formatDate(timestamp) {
  if (Number(timestamp)) {
    var d = new Date(Number(timestamp));
    var year = d.getFullYear();
    var month = format(d.getMonth() + 1);
    var date = format(d.getDate());
    var hour = format(d.getHours());
    var minutes = format(d.getMinutes());
    var seconds = format(d.getSeconds());
    return month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds;
  } else {
    return timestamp;
  }
}

function format(t) {
  return t > 9 ? t : '0' + t
}
