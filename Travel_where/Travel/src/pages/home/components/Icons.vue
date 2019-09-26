<template>
  <div class="icons">
    <swiper>
      <swiper-slide v-for="(page,index) of pages" :key="index">
      <div class="icon" 
           v-for="item of page"
           :key="item.id"
        >
        <div class="icon-img">
        <img class="icon-img-content" :src="item.imgUrl" alt="">
        </div>
        <p class="icon-desc">{{item.desc}}</p>
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
          imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
          desc:'景点门票1'
        },
        {
          id:'0002',
          imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
          desc:'景点门票2'
        },
        {
          id:'0003',
          imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
          desc:'景点门票3'
        },
        {
          id:'0004',
          imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
          desc:'景点门票4'
        },
        {
          id:'0005',
          imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
          desc:'景点门票5'
        },
        {
          id:'0006',
          imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
          desc:'景点门票6'
        },
        {
          id:'0007',
          imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
          desc:'景点门票7'
        },
        {
          id:'0008',
          imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
          desc:'景点门票8'
        },
        {
          id:'0009',
          imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
          desc:'景点门票9'
        }
      ]
    };
  },
  computed:{
    pages(){
      const pages = [];
      this.iconList.forEach((item,index) => {
        const page = Math.floor(index / 8)
        if(!pages[page]){
          pages[page] = []
        }
        pages[page].push(item)
      });
      console.log(pages);
      return pages
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.icons >>> .swiper-container {
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
    ellipsis();
  }
}
</style>

