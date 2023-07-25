<template>
  <div class="portal">
    <h1>This is an portal page</h1>
    <FCSwiper :actived='actived'/>
     <a-button type="primary" @click="slideTo">跳转</a-button>
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
    const state = reactive({
      actived:0
    });
    onMounted(() => {});
     const slideTo=(index:any)=>{
        state.actived=5
    }
    return {
      ...toRefs(state),
      slideTo,
    };
  },
});
</script>
<style lang="less" scoped>
.portal{
  height: 100vh;
}
</style>
