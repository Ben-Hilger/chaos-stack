<script setup lang="ts">

const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false
  }
})

const buttonClasses = computed<string>(() => {
  if (props.isDisabled) {
    return "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  }
  return "text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
})

</script>

<template>

  <button type="button"
          v-bind:class="buttonClasses">
    <slot></slot>
  </button>
</template>

<style scoped>

</style>