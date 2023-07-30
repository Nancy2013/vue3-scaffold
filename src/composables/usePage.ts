import { ref, reactive, toRef, onMounted, toRefs } from "vue";
import { Modal, message } from "ant-design-vue";
import request from "@/utils/axios";
export const usePage = (opts: any) => {
  const { search, } = opts;
  const state = reactive({});

  onMounted(() => {
  });

  const query=()=>{
    console.log('----usePage---',search.value);
  }

  return {
    ...toRefs(state),
    query,
  };
};