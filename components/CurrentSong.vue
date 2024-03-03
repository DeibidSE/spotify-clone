<template>
  <!-- Song loaded -->
  <div
    v-if="song"
    class="relative flex items-center gap-5 overflow-hidden"
  >
    <picture class="w-16 h-16 overflow-hidden rounded-md shadow-lg">
      <img :src="song.image" :alt="song.title">
    </picture>

    <div class="flex flex-col">
      <h3 class="block text-sm font-semibold">
        {{ song.title ?? '' }}
      </h3>
      <span class="text-xs opacity-80">
        {{ song.artists.join(', ') ?? '' }}
      </span>
    </div>
  </div>
  <!-- No song loaded -->
  <div
    v-else
    class="flex items-center gap-5"
  >
    <div
      class="w-16 h-16 bg-gray-600 rounded-md shadow-lg"
    />
    <div class="flex flex-col gap-4">
      <div class="w-24 h-2 bg-gray-500 rounded-lg" />
      <div class="w-32 h-2 bg-gray-500 rounded-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/store/playerStore'
import { type Song } from '@/lib/data'

const playerStore = usePlayerStore()

const song = computed<Song | null>(() => {
  return playerStore.currentMusic?.song
})
</script>
