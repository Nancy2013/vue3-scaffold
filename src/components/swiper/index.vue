<template>
  <div class="swiper">
    <swiper
    :modules="modules"
    :slides-per-view="2"
    :space-between="10"
    :speed="1200"
    direction='vertical'
    :navigation="navigation"
    :centeredSlides="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    @slideChangeTransitionEnd='slideChangeTransitionEnd'
    @click='clickSwiper'
  >
    <swiper-slide @click="clickSlide(item)" v-for="item in slides" :key="item">{{item.name}}</swiper-slide>
  </swiper>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  </div>
  <a-button type="primary" @click="slideTo">跳转</a-button>
</template>
<script lang="ts">
import Index from './index'

export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>s
