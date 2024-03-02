<template>
  <a
    :href="`/playlist/${id}`"
    class="flex flex-row items-center gap-5 p-2 overflow-hidden rounded-md hover:bg-zinc-800"
  >
    <picture class="flex-none w-12 h-12">
      <img :src="cover" :alt="`Cover of ${title} by ${artistsList}`" class="object-cover w-full h-full rounded-md">
    </picture>
    <div class="flex flex-col w-full truncate">
      <h4 class="text-sm text-white">
        {{ title }}
      </h4>
      <span class="text-xs text-gray-400">
        {{ artistsList }}
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { Playlist } from '@/lib/data'

const props = defineProps({
  playlist: {
    type: Object as () => Playlist,
    default: () => ({
      id: '',
      albumId: 0,
      title: '',
      color: '',
      cover: '',
      artists: []
    })
  }
})

const { id, cover, title, artists } = props.playlist
const artistsList = artists.join(', ')
</script>
