<script lang="ts" setup>
import { ref } from 'vue';
import AppHeader from "~/components/AppHeader.vue";
import EntryView from "~/components/EntryView.vue";

const chaosStore = useChaosStore()

const userId = ref<string | null>(null)
const verifiedUserId = ref<string | null>(null)
const hadVerificationError = ref<boolean>(false)

  async function verifyUserId() {
    if (!userId.value) {
      return
    }
    try {
      await chaosStore.apiService.put("user", {userId: userId.value})
      verifiedUserId.value = userId.value
    } catch (error) {
      hadVerificationError.value = true
    }
  }

  async function generateUserId() {
    try {
      const response = await chaosStore.apiService.post("user")
      verifiedUserId.value = response.uuid
    } catch (error) {
      hadVerificationError.value = true
    }
  }

</script>

<template>
  <div class="mt-5 w-full h-full flex-col flex justify-start items-center">
    <AppHeader></AppHeader>
    <div class="flex justify-center flex-col mt-3 w-8/12">
      <template v-if="verifiedUserId">
        <EntryView v-bind:verified-user-id="verifiedUserId"></EntryView>
      </template>
      <template v-else>
        <label for="user_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User ID</label>
        <input v-model="userId" type="text" id="user_id"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <span v-if="hadVerificationError" class="text-red-500 text-sm">The user id you entered wasn't valid. Please try again</span>
        <AppButton class="mt-3" v-on:click="verifyUserId" v-bind:is-disabled="!userId || userId.length === 0">Verify User Id</AppButton>
        <AppButton v-on:click="generateUserId">Generate User Id</AppButton>
      </template>
    </div>
  </div>
</template>