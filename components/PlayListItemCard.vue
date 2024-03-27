<template>
  <article
    class="relative transition-all duration-300 rounded-md shadow-lg group hover:bg-zinc-800 hover:shadow-xl bg-zinc-500/30"
  >
    <!-- Play/Pause button-->
    <div
      class="absolute z-10 transition-all duration-500 translate-y-4 opacity-0 right-4 bottom-20 group-hover:translate-y-0 group-hover:opacity-100"
    >
      <CardPlayButton :id="playlist.id" :size="1" />
    </div>
    <!-- Card -->
    <NuxtLink
      :to="`/playlist/${playlist.id}`"
      class="relative flex flex-col gap-2 p-2 pb-6 overflow-hidden transition-all duration-300 rounded-md w-44"
      @click="active = playlist.id"
    >
      <picture class="flex-none w-full h-auto aspect-square">
        <img
          :src="`${$config.public.BASE_URL}${playlist.cover}`"
          :alt="`Cover of ${playlist.title} by ${playlist.artists.join(', ')}`"
          class="object-cover w-full h-full rounded-md aspect-square"
          :class="{ 'active [view-transition-name:selected-playlist] [contain:layout]': active === playlist.id }"
        >
      </picture>
      <div class="flex flex-col flex-auto px-2">
        <span class="text-sm text-white">
          {{ playlist.title }}
        </span>
        <span class="text-xs text-gray-400">
          {{ playlist.artists.join(', ') }}
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import { type Playlist } from '@/lib/types.d'

defineProps<{playlist: Playlist}>()
const active = useState()
</script>
