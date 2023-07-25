<template>
  <div class="swiper">
    <swiper
    :modules="modules"
    slides-per-view="auto"
    :space-between="10"
    :speed="1200"
    direction='vertical'
    :navigation="navigation"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    @slideChangeTransitionEnd='slideChangeTransitionEnd'
    @snapGridLengthChange='snapGridLengthChange'
    @click='clickSwiper'
  >
  <template v-for="(item,index) in slides" :key="item" >
    <swiper-slide :class="`swiper-slide${index} ${actived===item.index?'actived':''}`" @click="clickSlide(item)" >
      <div >{{item.name}}</div>
    </swiper-slide>
  </template>
    
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
