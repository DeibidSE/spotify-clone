<template>
  <NuxtLayout>
    <div
      id="playlist-container"
      class="relative flex flex-col h-full overflow-x-hidden bg-zinc-900"
    >
      <header class="flex flex-row gap-8 px-6 mt-12">
        <picture v-if="playlist" class="flex-none aspect-square w-52 h-52">
          <img
            :src="playlist.cover"
            :alt="'Cover of ' + playlist.title"
            class="object-cover w-full h-full shadow-lg"
          >
        </picture>

        <div class="flex flex-col justify-between">
          <h2 class="flex items-end flex-1">
            Playlist
          </h2>
          <h1 class="block text-5xl font-bold text-white">
            {{ playlist?.title }}
          </h1>

          <div v-if="playlist" class="flex items-end flex-1">
            <div class="text-sm font-normal text-gray-300">
              <span>{{ playlist.artists.join(', ') }}</span>
              <p class="mt-1">
                <span class="text-white">{{ playlistSongs.length }} canciones </span>,
                3h aproximadamente
              </p>
            </div>
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
import { allPlaylists, songs } from '@/lib/data'

const route = useRoute()
const id = ref(Number(route.params.id))

const playlist = ref(allPlaylists.find(playlist => playlist.id === id.value))
const playlistSongs = ref(songs.filter(song => song.albumId === playlist.value?.albumId))

</script>
