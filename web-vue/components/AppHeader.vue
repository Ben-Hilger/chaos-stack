<script setup lang="ts">
const chaosStore = useChaosStore()
</script>

<template>
  <div class="border-b border-black w-full flex flex-col items-center">
    <span class="text-3xl font-bold mb-0.5">Chaos Stack</span>
    <span class="text-sm mb-0.5">Currently powered by Vue and {{ chaosStore.apiService.selectedApiProvider }}</span>
  </div>
</template>