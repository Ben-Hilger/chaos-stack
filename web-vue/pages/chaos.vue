<script lang="ts" setup>
import { ref } from 'vue';
import AppSpinner from "~/components/AppSpinner.vue";

enum LoadingState {
  NONE, VERIFYING_USER_ID, GENERATING_USER_ID
}

const chaosStore = useChaosStore()

const userId = ref<string | null>(null)
const verifiedUserId = ref<string | null>(null)
const hadVerificationError = ref<boolean>(false)
const loadingState = ref<LoadingState>(LoadingState.NONE)

async function verifyUserId() {
  if (!userId.value) {
    return
  }
  loadingState.value = LoadingState.VERIFYING_USER_ID
  try {
    await chaosStore.apiService.put("api/user", {userId: userId.value})
    verifiedUserId.value = userId.value
  } catch (error) {
    hadVerificationError.value = true
  } finally {
    loadingState.value = LoadingState.NONE
  }
}

async function generateUserId() {
  loadingState.value = LoadingState.GENERATING_USER_ID
  try {
    const response = await chaosStore.apiService.post("api/user")
    verifiedUserId.value = response.uuid
  } catch (error) {
    hadVerificationError.value = true
  } finally {
    loadingState.value = LoadingState.NONE
  }
}

</script>

<template>
  <div class="mt-5 w-full h-full flex-col flex justify-start items-center">
    <AppHeader></AppHeader>
    <div class="mt-3 w-8/12 text-center">
      <template v-if="verifiedUserId">
        Now, to interact with the randomly selected backend service, you can add new entries to this table<br>
        Please keep in mind this is still in it's very early stages, and will be changing a lot over the coming month.
      </template>
      <template v-else>
        To begin, please generate a new user id, or enter a previous user id if you've been here before.<br> Only this user id is stored, we will never ask for personal information.
      </template>
    </div>
    <div class="flex justify-center flex-col mt-3 w-8/12">
      <template v-if="verifiedUserId">
        <EntryView v-bind:verified-user-id="verifiedUserId"></EntryView>
      </template>
      <template v-else>
        <label for="user_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User ID</label>
        <input v-model="userId" type="text" id="user_id"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <span v-if="hadVerificationError" class="text-red-500 text-sm">The user id you entered wasn't valid. Please try again</span>
        <AppButton class="mt-3" v-on:click="verifyUserId" v-bind:is-disabled="!userId || userId.length === 0">
          <AppSpinner v-if="loadingState === LoadingState.VERIFYING_USER_ID"></AppSpinner>
          Verify User Id
        </AppButton>
        <AppButton v-on:click="generateUserId">
          <AppSpinner v-if="loadingState === LoadingState.GENERATING_USER_ID"></AppSpinner>
          Generate User Id
        </AppButton>
      </template>
    </div>
  </div>
</template>