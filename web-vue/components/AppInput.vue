<script setup lang="ts">
import type {PropType} from "vue";

const modelValue = defineModel<any>()

defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<'text'|'number'>
  }
})

</script>

<template>
  <input v-model="modelValue" v-bind:type="type" v-bind:id="id"
         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
</template>