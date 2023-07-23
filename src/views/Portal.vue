<template>
  <div class="portal">
    <h1>This is an portal page</h1>
    <FCSwiper/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import FCSwiper from '@/components/swiper/index.vue'
export default defineComponent({
  props: {},
  components: {
    FCSwiper
  },
  setup() {
    const state = reactive({});

    onMounted(() => {});
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less" scoped>
</style>
