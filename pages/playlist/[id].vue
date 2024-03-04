<template>
  <NuxtLayout>
    <div
      class="relative flex flex-col h-full overflow-x-hidden bg-zinc-900"
    >
      <header class="flex flex-row gap-8 px-6 mt-12">
        <picture v-if="playlist" class="flex-none aspect-square w-52 h-52">
          <img
            :src="playlist.cover"
            :alt="'Cover of ' + playlist.title"
            class="object-cover w-full h-full shadow-lg [view-transition-name:selected-playlist]"
          >
        </picture>

        <div class="flex flex-col items-start justify-center w-full h-full truncate">
          <h2 class="flex w-full">
            Lista
          </h2>
          <h1 class="w-full font-bold text-white truncate text-8xl">
            {{ playlist?.title }}
          </h1>
          <div v-if="playlist" class="flex flex-col w-full gap-1 text-sm font-normal text-gray-300">
            <span>{{ playlist.artists.join(', ') }}</span>
            <p>
              <span class="text-white">• {{ playlistSongs.length }} canciones,</span>
              3h aproximadamente
            </p>
          </div>
        </div>
      </header>

      <div v-if="playlist" class="pt-6 pl-6">
        <CardPlayButton :id="id" size="large" />
      </div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 -z-[1]"
      />

      <section v-if="playlist" class="p-6">
        <MusicsTable :songs="playlistSongs" />
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { playlists, songs } from '@/lib/data'

const route = useRoute()
const id = ref(Number(route.params.id))

const playlist = ref(playlists.find(playlist => playlist.id === id.value))
const playlistSongs = ref(songs.filter(song => song.albumId === playlist.value?.id))

</script>
