<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide>
      <img src="https://source.qunarzz.com/site/images/wns/20190415_qunar_dujia_homepage_top_banner_1.jpeg">
    </swiper-slide>
    <swiper-slide>
      <img src="https://source.qunarzz.com/site/images/wns/2019505_dujia_homepage_top_banner_5.jpg">
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data() {
    return {
      swiperOption: {}
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
