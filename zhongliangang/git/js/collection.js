$(function () {
  //收藏本站代码
  jQuery.fn.addFavorite = function (l, h) {
    console.log(h);
    return this.click(function () {
      var t = jQuery(this);
      var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd': 'CTRL';
      if (jQuery.browser.msie) {
        window.external.addFavorite(h, l);
      } else if (jQuery.browser.mozilla || jQuery.browser.opera) {
        t.attr("rel", "sidebar");
        t.attr("title", l);
        t.attr("href", h);
      } else {
        alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~')
      }
    });
  };
  $(function () {
    $('#fav').addFavorite('收藏本站', window.location.href);
  });
})