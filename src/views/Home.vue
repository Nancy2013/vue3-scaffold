<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import service from '@/service'
onMounted(()=>{
  console.log('----onMounted---',service);
  getAddressTree();
});
const getAddressTree=()=>{
  const {getAddressTree}=service.securityAlarmReq;
  getAddressTree().then((res:any)=>{
    console.log('----getAddressTree----',res);
    
  });
}
</script>
