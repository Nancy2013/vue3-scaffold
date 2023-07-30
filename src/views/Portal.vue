<template>
  <div class="portal">
      <h1>This is an portal page</h1>
      <a-range-picker v-model:value="search.timePicker" picker="month" valueFormat='YYYY-MM' @change='change'/>
      <div>
         <a-cascader v-model:value="search.city" style="width: 200x" :options="options" :fieldNames='fieldNames'></a-cascader>
      </div>
     <div>
      <a-button type="primary" @click="handleSearch">查询</a-button>
     </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs,ref, onMounted, computed } from "vue";
import {usePage} from '@/composables/usePage'
import service from '@/service'
const fieldNames={
  label:'name',
  value:'name',
  children:'cities',
};
export default defineComponent({
  props: {},
  components: {},
  setup() {
    const state = reactive({
      search:{
        timePicker:[],
        city:[],
      },
      options:[],
      fieldNames,
    });

    const formatSearch=computed(()=>{
      const {search}=state;
      const {city}=search;
      if(city){
        return {
          ...search,
          city:[...city].pop(),
        }
      }
      return '';
    });
    const opts={
      search:formatSearch,
    };
    const {query}=usePage(opts);

    onMounted(() => {
      getAddressTree();
    });

    const change=(date:any)=>{
      const {search}=state;
      console.log('----change----',date,search);
    }

    const handleSearch=()=>{
      query();
    }

    const getAddressTree=()=>{
      const {getAddressTree}=service.securityAlarmReq;
      getAddressTree().then((res:any)=>{
      const{code,data}=res;
      state.options=data;
    
    });
}
    return {
      ...toRefs(state),
      change,
      formatSearch,
      handleSearch,
    };
  },
});
</script>
<style lang="less" scoped>
.portal{
  height: 100vh;
}
</style>
