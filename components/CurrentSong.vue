<template>
  <!-- Song loaded -->
  <div
    v-if="song && Object.keys(song).length > 0"
    class="relative flex items-center w-full gap-5 overflow-hidden"
  >
    <picture class="w-16 h-16 overflow-hidden rounded-md shadow-lg">
      <img :src="`${$config.public.BASE_URL}${song.image}`" :alt="song.title" class="rounded-md aspect-square">
    </picture>

    <div class="flex flex-col">
      <h3 class="block text-sm font-semibold">
        {{ song.title }}
      </h3>
      <span class="text-xs opacity-80">
        {{ song.artists.join(', ') }}
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
import { type Song } from '@/lib/types.d'

const playerStore = usePlayerStore()

const song = computed<Song | null>(() => {
  return playerStore.currentMusic?.song
})
</script>
