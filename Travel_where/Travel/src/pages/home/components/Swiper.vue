<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="item of swiperList" :key="item.id">
      <img class="swiper-img" :src="item.imgUrl">
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        loop:true
      },
      swiperList: [{
        id:'0001',
        imgUrl:'https://source.qunarzz.com/site/images/wns/20190415_qunar_dujia_homepage_top_banner_1.jpeg'
      },{
        id:'0002',
        imgUrl:'https://source.qunarzz.com/site/images/wns/2019505_dujia_homepage_top_banner_5.jpg'
      }]
    };
  }
};
</script>

<style lang="stylus" scoped>
.wrapper >>> .swiper-pagination-bullet-active {
  background: #fff;
}

.wrapper {
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 31.25%;
  background: #eee;

  .swiper-img {
    width: 100%;
  }
}
</style>
