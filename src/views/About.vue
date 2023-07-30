<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-upload
      v-model:file-list="fileList"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :before-upload="beforeUpload"
    >
      <a-button> 导入 </a-button>
    </a-upload>
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
import importToJson from '@/utils/importToJson';
export default defineComponent({
  props: {},
  components: {},
  setup() {
    const state = reactive({
      fileList: [],
    });
    onMounted(() => {});

    const beforeUpload = async (file: any) => {
      const data = await importToJson(file);
      return false;
    };
    return {
      ...toRefs(state),
      beforeUpload,
    };
  },
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
