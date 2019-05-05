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
       return (
         y +
         '-' +
         this.add0(m) +
         '-' +
         this.add0(d)
       )
     }
   }
   return new TimestampChange(arguments)
 })()
 export default timestampChange
