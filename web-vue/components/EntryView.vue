<script setup lang="ts">
import {type PropType, ref} from "vue";

const props = defineProps({
  verifiedUserId: {
    type: String as PropType<string | null>,
    required: true
  }
})

const newEntryAmount = ref<number | null>(null)
const newEntryName = ref<number | null>(null)
const hasAddEntryError = ref<boolean>(false)

const chaosStore = useChaosStore()

const canAddNewEntry = computed(() => {
  return newEntryAmount.value && newEntryName.value
})

async function addNewEntry() {
  if (!canAddNewEntry.value) {
    return
  }

  try {
    await chaosStore.apiService.post("entry",
        { name: newEntryName.value, userId: props.verifiedUserId, amount: newEntryAmount.value })
    data.value.push([newEntryAmount.value, newEntryName.value])
    newEntryName.value = null
    newEntryAmount.value = null
  } catch (error) {
    hasAddEntryError.value = true
    console.log(error)
  }
}

const headers: string[] = [
  "Amount",
  "Name",
]

const data = ref<any[][]>([])

async function loadEntriesForUser() {
  data.value = []
  if (!props.verifiedUserId) {
    return
  }
  try {
    const response: any[] = await chaosStore.apiService.get("entry", {userId: props.verifiedUserId})
    response.forEach((item) => {
      data.value.push([item.amount, item.name])
    })
  } catch (error) {
    console.log(error)
  }
}

watch(() => props.verifiedUserId, () => {
  loadEntriesForUser()
}, {deep: true, immediate: true})

</script>

<template>
    <div class="flex justify-center p-5 border border-gray-700 rounded mb-3">
      User ID: <b>{{ verifiedUserId }}</b>
    </div>
  <div class="flex justify-center items-start gap-10">
    <AppTable class="w-6/12" v-bind:data="data" v-bind:headers="headers" v-if="data.length > 0"></AppTable>
    <div v-else class="w-6/12">
      Add new entries and your table will appear!
    </div>
    <div class="flex justify-center flex-col w-4/12">
      <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
      <AppInput v-model="newEntryAmount" type="number" id="amount"></AppInput>
      <label for="amount" class="mt-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
      <AppInput v-model="newEntryName" type="text" id="amount"></AppInput>
      <AppButton class="mt-3" v-on:click="addNewEntry" v-bind:is-disabled="!canAddNewEntry">Add Entry</AppButton>
      <div v-if="hasAddEntryError" class="mt-3 text-red-500">
        There was an issue adding a new entry, please try again later
      </div>
    </div>
  </div>

</template>
