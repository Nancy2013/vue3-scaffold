<template>
  <main>
    <a-button type="primary">Primary Button</a-button>
    <a-switch v-model:checked="checked" />
     <config-icon color="#f00" width="16px" height="16px" name="table" class="svgClass" />
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import service from '@/service'
import { ref } from 'vue';
const checked = ref<boolean>(false);
onMounted(()=>{
  getAddressTree();
});
const getAddressTree=()=>{
  const {getAddressTree}=service.securityAlarmReq;
  getAddressTree().then((res:any)=>{
    console.log('----getAddressTree----',res);
    
  });
}
</script>
