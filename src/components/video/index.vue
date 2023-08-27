<template>
  <div class="video">
    <video-player class="video-player"
                  :playsinline="true"
                  :options="playerOptions"
                  @mounted="mountedVideo">
    </video-player>
  </div>
</template>
<script lang="ts">
import Index from "./index";

export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>