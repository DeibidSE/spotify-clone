<template>
  <article
    class="relative transition-all duration-300 rounded-md shadow-lg group hover:bg-zinc-800 hover:shadow-xl bg-zinc-500/30"
  >
    <div
      class="absolute z-10 transition-all duration-500 translate-y-4 opacity-0 right-4 bottom-20 group-hover:translate-y-0 group-hover:opacity-100"
    >
      <CardPlayButton :id="id" />
    </div>

    <a
      :href="'/playlist/' + id"
      class="relative flex flex-col gap-2 p-2 pb-6 overflow-hidden transition-all duration-300 rounded-md w-44"
      :transition:name="'playlist ' + id + ' box'"
    >
      <picture class="flex-none w-full h-auto aspect-square">
        <img
          :src="cover"
          :alt="'Cover of ' + title + ' by ' + artistsString"
          class="object-cover w-full h-full rounded-md"
          :class="{ active: active === props.playlist.id }"
          @click="active = props.playlist.id"
        >
      </picture>

      <div class="flex flex-col flex-auto px-2">
        <h4 class="text-sm text-white" :transition:name="'playlist ' + id + title">
          {{ title }}
        </h4>

        <span
          class="text-xs text-gray-400"
          :transition:name="'playlist ' + id + ' artists'"
        >
          {{ artistsString }}
        </span>
      </div>
    </a>
  </article>
</template>

<script setup lang="ts">
import type { Playlist } from '@/lib/data'

const props = defineProps({
  playlist: {
    type: Object as () => Playlist,
    default: () => ({
      id: 0,
      albumId: 0,
      title: '',
      color: '',
      cover: '',
      artists: []
    })
  }
})
const active = useState()
const { id, cover, title, artists } = props.playlist
const artistsString = artists.join(', ')
</script>

<style scoped>
img.active {
  view-transition-name: selected-playlist;
  contain: layout;
}
</style>
