<script setup lang="ts">

import type {PropType} from "vue";

defineProps({
  headers: {
    type: Array as PropType<Array<string>>,
    required: true
  },
  data: {
    type: Array as PropType<Array<Array<any>>>,
    required: true
  }
})

</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="border w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th v-for="(header, index) in headers" v-bind:key="index" scope="col" class="px-6 py-3">
          {{ header }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(dataRow, indexRow) in data" v-bind:key="indexRow" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td v-for="(dataCol, indexColumn) in dataRow" v-bind:key="indexColumn" class="px-6 py-4">
          {{ dataCol }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>