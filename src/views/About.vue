<template>
  <div class="about">
    <a-button type="primary"
              @click="showModal">Primary Button</a-button>
    <a-modal v-model:visible="visible"
             :title="title"
             :footer="null"
             :maskClosable="false"
             wrapClassName="pony-modal-wrapper"
             :afterClose="handleClose"
             centered
             :width="1000">
      <div class='form-table'>
        <CodePanel v-if='visible'
                   @update='update' />
      </div>
    </a-modal>
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
import CodePanel from "./components/codePanel/index.vue";
export default defineComponent({
  props: {},
  components: {
    CodePanel,
  },
  setup() {
    const state = reactive({
      visible: false,
      title: "测试",
      codeAuthorizeList: [],
    });
    onMounted(() => {});

    const showModal = () => {
      state.visible = true;
    };

    const update = (data: any) => {
      state.codeAuthorizeList = Object.assign([], data);
      console.log("------update---------", state.codeAuthorizeList);
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      state.codeAuthorizeList = [];
    };
    return {
      ...toRefs(state),
      handleClose,
      showModal,
      update,
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
