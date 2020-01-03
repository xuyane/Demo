/**
 * Created by DELL on 2019/12/20.
 */
$(function(){
  function reactiveOverlay() {
    var bodyheight=$('body').height();
    var headheight=$('.head-wrap').innerHeight();
    var contentheight=bodyheight-headheight;
    var imgheight=$('.middle-cont img').height()
    $('.content').height(contentheight);
    //左边
    var boxheight=contentheight-86;
    $('.left-cont .part .chanxiaocun').height(boxheight*0.465);
    $('.left-cont .part .huikuanlv').height(boxheight*0.122);
    $('.left-cont .part .yusuanguankun').height(boxheight*0.413);
    //中间
    var midheight=contentheight-166;
    $('.center-cont').css('margin-top',imgheight-headheight+'px')
    midheight=contentheight-($('.center-cont').offset().top-headheight-20)-86;
    if(imgheight<headheight){
      midheight=contentheight-86;
      $('.center-cont').css('margin-top','0')
    }
    $('.center-cont .part .price-map').height(midheight*0.459);
    $('.center-cont .part .kucunchayi').height(midheight*0.265);
    $('.center-cont .part .zhiliangyiyi').height(midheight*0.276);
    //右边
    var rightheight=contentheight-64;
    $('.right-cont .part .jiagezoushi').height(rightheight*0.447);
    $('.right-cont .part .lianglifenxi').height(rightheight*0.553);
  }

  reactiveOverlay();
  $(window).resize(reactiveOverlay);
  var currentModalPath = '';
  //弹窗取消按钮
  $('.tanchuan .quxiao').click(function(){
    $('.tanchuan-wrap').css('visibility', 'hidden');
    $('.tanchuan').removeClass('fangda');
    currentModalPath = '';
  })
  //弹窗全屏
  $('.tanchuan .quanping').click(function(){
    $('.tanchuan').addClass('fangda');
    $('.iframe-cont').height($('.tanchuan').height()-$('.tanchuan .t-head-l').height()-20)
    $('#iframebox').attr('src', $('#iframebox').attr('src'));
  })
  //弹窗取消全屏
  $('.tanchuan .qxqp').click(function(){
    $('.tanchuan').removeClass('fangda');
    $('.iframe-cont').height($('.tanchuan').height()-$('.tanchuan .t-head-l').height()-20);
    $('#iframebox').attr('src', $('#iframebox').attr('src'));
  })
  //点击展示弹框
  function showTip(title,url,width,height){
    $('.tanchuan').css(
      {
        'width':width,
        'height':height
      }
    )
    $('.tanchuan').css(
      {
        'margin-top':-$('.tanchuan').outerHeight()/2,
        'margin-left':-($('.tanchuan').outerWidth()/$(window).outerWidth()/2*100)+'%',
      }
    )
    $('.iframe-cont').height($('.tanchuan').height()-$('.tanchuan .t-head-l').height()-20)
    $('.tanchuan .t-head-l').html(title)
    $('.tanchuan iframe').attr('src',url)
    $('.tanchuan-wrap').css('visibility', 'visible');
  }

  $(window).on('message', function (event) {
    var data = event.originalEvent.data;
    if (data.path && currentModalPath !== data.path) {
      // console.log(data)
      currentModalPath = data.path;
      var size = ['80%', '80%'];
      if (data.size && data.size.length === 2) {
        size = data.size;
      }
      showTip(data.title, './page/' + currentModalPath, size[0], size[1]);
    }
  });
})

