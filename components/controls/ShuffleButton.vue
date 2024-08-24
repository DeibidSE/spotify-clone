<template>
  <button
    aria-label="Shuffle Songs"
    class="relative flex items-center justify-center h-full hover:scale-105"
    :class="{
      'text-green-500 hover:text-green-400': shuffleEnabled,
      'text-zinc-400 hover:text-zinc-100' : !shuffleEnabled
    }"
    @click="playerStore.shuffleEnabled = !playerStore.shuffleEnabled"
  >
    <nuxt-icon name="shuffle" />
    <span
      v-if="shuffleEnabled && showIndicator"
      class="absolute bottom-0 w-1 h-1 transform -translate-x-1/2 bg-green-500 rounded-full left-1/2"
    />
  </button>
</template>

<script setup lang="ts">
defineProps<{ showIndicator?: boolean }>()

const playerStore = usePlayerStore()
const shuffleEnabled = computed(() => playerStore.shuffleEnabled)
</script>
