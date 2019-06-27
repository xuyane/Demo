<template>
  <div class="icons">
    <swiper>
      <swiper-slide>
      <div class="icon">
        <div class="icon-img">
        <img class="icon-img-content" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png" alt="">
        </div>
        <p class="icon-desc">热门景点</p>
      </div>
      </swiper-slide>
      <swiper-slide>
      <div class="icon">
        <div class="icon-img">
        <img class="icon-img-content" src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png" alt="">
        </div>
        <p class="icon-desc">热门景点</p>
      </div>
    </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeIcons",
  data() {
    return {
      iconList: [
        {
          id:'0001',
          imgUrl:'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/d7bbc21db442366a882e04ddc984669a.jpg_750x200_85e640d9.jpg',
          desc:'景点门票'
        },{
          id:'0002'
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';

.icons >>> .swiper-container {
  overflow: hidden;
  height: 0;
  padding-bottom: 50%;
}

.icon {
  float: left;
  width: 25%;
  height: 0;
  padding-bottom: 25%;
  position: relative;

  .icon-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0.44rem;
    box-sizing: border-box;
    padding: 0.1rem;

    .icon-img-content {
      display: block;
      margin: 0 auto;
      height: 100%;
    }
  }

  .icon-desc {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 0.44rem;
    height: 0.44rem;
    color: $darkTextColor;
    text-align: center;
  }
}
</style>

