var baseUrl = '/';

function fnDate(){
    var date = new Date();
    var Hour = date.getHours();
    var Minute = date.getMinutes();
    var second = date.getSeconds();
    if (Hour >= 0 && Hour <= 9) {
        Hour = "0" + Hour;
    }
    if (Minute >= 0 && Minute <= 9) {
        Minute = "0" + Minute;
    }
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }
    var timeRload = Hour + ":" + Minute + ":" + second;
    if(timeRload == "08:00:00" || timeRload == "12:30:00" ){
        location.reload();
    }
}

setInterval(function(){
    fnDate();
},1000);