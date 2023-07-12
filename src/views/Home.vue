<template>
  <main>
    <a-button type="primary">Primary Button</a-button>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import service from '@/service'
import { message } from 'ant-design-vue';
onMounted(()=>{
   message.info('This is a normal message',0);
  getAddressTree();
});
const getAddressTree=()=>{
  const {getAddressTree}=service.securityAlarmReq;
  getAddressTree().then((res:any)=>{
    console.log('----getAddressTree----',res);
    
  });
}
</script>
