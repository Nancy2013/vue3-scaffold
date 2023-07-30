<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import service from '@/service'
import { ref } from 'vue';
const checked = ref<boolean>(false);
onMounted(()=>{});
const getAddressTree=()=>{
  const {getAddressTree}=service.securityAlarmReq;
  getAddressTree().then((res:any)=>{
    console.log('----getAddressTree----',res);
    
  });
}
</script>

<style lang="less" scoped>
.svgClass{
  color: @primary-color!important;
  margin: 0;
}
</style>
