 
var timestampChange = (function () {
  var TimestampChange = function () {}
  TimestampChange.fn = TimestampChange.prototype = {
    add0: function (m) {
      return m < 10 ? '0' + m : m 
    },
    format: function (timestamp) {
      var time = new Date(timestamp) 
      var y = time.getFullYear() 
      var m = time.getMonth() + 1 
      var d = time.getDate() 
      var h = time.getHours() 
      var mm = time.getMinutes() 
      var s = time.getSeconds() 
      return (
        y + 
                '-' + 
                this.add0(m) + 
                '-' + 
                this.add0(d) + 
                ' ' + 
                this.add0(h) + 
                ':' + 
                this.add0(mm) + 
                ':' + 
                this.add0(s)
      ) 
    }
  }
  return new TimestampChange(arguments)
})()
export default timestampChange
