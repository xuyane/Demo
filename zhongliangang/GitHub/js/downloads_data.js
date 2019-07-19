$(function(){
  $('.current_bottom .imgLoad1').addClass('show');
  $.ajax({
		url: api + "/cgnews.mv?method=getCgnewAlls",
		dataType: 'jsonp',
		type: "GET",
		data: {
			categoryID: '1003001,1003002'
		},
		jsonp: 'callback',
		success: function (data) {
			console.log('data1', data.data.list)
			var html = ''
			if (data.errorCode == 0) {
				for (var i = 0; i < data.data.list.length;i++) {
					var viewUser = data.data.list[i].level;
            var href = '';
            if(viewUser == 0){
              href = './downloadsDetail.html?number=' + data.data.list[i].number;
            }else{  
              href = 'http://ec.custeel.com/home/member/login.html';
            }
					html += '<li><a href="'+href+'" target="_blank">'+(i + 1)+'、'+data.data.list[i].title+'</a></li>'
				}
				$('.current_bottom .imgLoad1').removeClass('show');
				$('#xiangguanxiazhai').html(html);
			}else{
        $('#xiangguanxiazhai').html('暂无数据');
      }
		},
		error: function (request, a, b) {
			console("数据加载失败");
		}
	});
})