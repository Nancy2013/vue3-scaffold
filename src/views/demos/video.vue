<template>
  <div class="portal">
    <div class="video">
      <VideoView :videoSrc="data.videoSrc"
                 v-if="data.videoSrc" />
      <VideoView v-else />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  onMounted,
  computed,
} from "vue";
import VideoView from "@/components/video/index.vue";

export default defineComponent({
  props: {},
  components: {
    VideoView,
  },
  setup() {
    const state = reactive({
      data: {
        videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
      },
    });
    onMounted(() => {});

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less" scoped>
.portal {
  height: 100vh;
  .video {
    height: 100%;
  }
}
</style>
