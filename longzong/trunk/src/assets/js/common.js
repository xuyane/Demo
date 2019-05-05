// 文件头部域名
export const urlHead = 'https://mfs.oilchem.net/'
export const processImgHost = 'https://mgt.oilchem.net'

// 数据格式转换 json转formData
export const formData = data => {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}

// 数据格式转换 json转formData,过滤掉没有数值的参数
export const formDataFilterEmpty = data => {
  let ret = ''
  for (let it in data) {
    if (data[it]) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
  }
  return ret
}

// 时间转时间戳
export const formatStamp = date => {
  return new Date(date).getTime()
}

// 时间戳转时间
export const formatTime = timestamp => {
  // return new Date(timestamp).toLocaleString()
  let d = new Date(timestamp)
  let year = d.getFullYear()
  let month = format(d.getMonth() + 1)
  let date = format(d.getDate())
  return year + '-' + month + '-' + date
}

// 时间戳转时间
export const formatTime2 = timestamp => {
  // return new Date(timestamp).toLocaleString()
  if (Number(timestamp)) {
    let d = new Date(Number(timestamp))
    let year = d.getFullYear()
    let month = format(d.getMonth() + 1)
    let date = format(d.getDate())
    let hour = format(d.getHours())
    let minutes = format(d.getMinutes())
    let seconds = format(d.getSeconds())
    return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
  } else {
    return timestamp
  }
}

// 时间戳转时间
export const formatTime33 = timestamp => {
  // return new Date(timestamp).toLocaleString()
  if (Number(timestamp)) {
    let d = new Date(Number(timestamp))
    let year = d.getFullYear()
    let month = format(d.getMonth() + 1)
    let date = format(d.getDate())
    let hour = format(d.getHours())
    let minutes = format(d.getMinutes())
    return `${year}-${month}-${date} ${hour}:${minutes}`
  } else {
    return timestamp
  }
}
// 时间戳转时间字符串
export const formatTime3 = timestamp => {
  // return new Date(timestamp).toLocaleString()
  let d = new Date(timestamp)
  let year = d.getFullYear()
  let month = format(d.getMonth() + 1)
  return year + '-' + month
}

// 格式化时间
export const format = t => {
  return t > 9 ? t : '0' + t
}
// 价格保留千分位，小数后两位
export function formatThousandPrice (num) {
  if (num !== '-') {
    num = num ? Number(num).toFixed(2) : '0.00'
    num = num.toString()
    if (num.indexOf('.') === -1) {
      return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    } else {
      var cent = num.split('.')
      var cent1 = cent[1]
      var sign = cent[0]
      return (sign + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') + '.' + cent1
    }
  } else {
    return '-'
  }
}

// 校验type
export function formatType (type) {
  if (type === 0) {
    return 0
  } else if (type && type !== 0) {
    return type
  } else {
    return ''
  }
}

// 获取上个月份
export function getLastMonth () {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()
  if (month >= 0 && month <= 9) {
    month = '0' + month
  }
  if (month === '00') {
    let yearMonth = (year - 1) + '-12'
    return yearMonth
  } else {
    let yearMonth = year + '-' + month
    return yearMonth
  }
}

// 监听事件
export function addEvent (obj, evName, callback) {
  if (obj.addEventListener) {
    obj.addEventListener(evName, callback)
  } else {
    obj.attachEvent('on' + evName, callback)
  }
}

/**
  * 获取下一个月
  *
  * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
*/
export function getNextMonth (date) {
  let arr = date.split('-')
  let year = arr[0] // 获取当前日期的年份
  let month = arr[1] // 获取当前日期的月份
  let day = arr[2] // 获取当前日期的日
  let days = new Date(year, month, 0)
  days = days.getDate() // 获取当前日期中的月的天数
  let year2 = year
  let month2 = parseInt(month) + 1
  if (month2 == 13) {
    year2 = parseInt(year2) + 1
    month2 = 1
  }
  let day2 = day
  let days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month == 2 && day == 28) {
    day2 = parseInt(day) + 3
  }
  if (month == 2 && day == 29) {
    day2 = parseInt(day) + 2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  let t2 = year2 + '-' + month2 + '-' + day2
  return t2
}


// 验座机
export function validPhone (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入电话'));
  } else {
    const reg = /^((0\d{2,3})-)(\d{6,8})(-(\d{3,}))?$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确的电话号码'));
    }else {
      callback();
    }
  }
}




// 验手机
export function validMobile (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入电话'));
  } else {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确的电话号码'));
    }else {
      callback();
    }
  }
}

// 验手机或座机
export function validMP (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入电话'));
  } else {
    const regMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    const regPhone = /^((0\d{2,3})-)(\d{6,8})(-(\d{3,}))?$/;
    if (!regMobile.test(value) && !regPhone.test(value)) {
      callback(new Error('请输入正确的电话号码'));
    }else {
      callback();
    }
  }
}

//校验内容是否含有敏感词
export function checkSensitive (val){
  const sensitive = ['调和', '调油', '生物柴油', '调油助剂', '崔长远'],
        arr = [];

  for(let one of sensitive){
    if(val.indexOf(one) > -1){
      arr.push(one);
    }
  }
  
  return arr.length === 0 ? false : `含有敏感词${arr}!`;
}