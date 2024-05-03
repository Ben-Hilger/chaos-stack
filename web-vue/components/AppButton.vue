<script setup lang="ts">

import type {PropType} from "vue";

const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary'
  }
})

const buttonClasses = computed<string>(() => {
  if (props.isDisabled) {
    return "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  }

  switch (props.type) {
    case "primary":
      return "text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    case "secondary":
      return "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  }
})

</script>

<template>

  <button type="button"
          v-bind:class="buttonClasses">
    <slot></slot>
  </button>
</template>