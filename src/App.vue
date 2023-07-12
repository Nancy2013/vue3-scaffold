<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/portal">Portal</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<style scoped lang="less">
header {
  line-height: 1.5;
  max-height: 100vh;
}
.wrapper{
  background-color: @primary-color;
}
</style>
