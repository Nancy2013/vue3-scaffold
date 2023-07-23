<template>
  <div class="swiper" ref='swiper'>
    <swiper
    :modules="modules"
    :slides-per-view="3"
    :space-between="50"
    :speed="1200"
    direction='vertical'
    loop
    :navigation="navigation"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    @slideChangeTransitionEnd='slideChangeTransitionEnd'
  >
    <swiper-slide @click="clickSlide(item)" v-for="item in slides" :key="item">{{item.name}}</swiper-slide>
  </swiper>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  </div>
</template>
<script lang="ts">
import Index from './index'

export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>s