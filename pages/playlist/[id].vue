<template>
  <NuxtLayout>
    <div
      id="playlist-container"
      class="relative flex flex-col h-full overflow-x-hidden bg-zinc-900"
      :transition:name="'playlist ' + id + ' box'"
    >
      <!-- <PageHeader /> -->

      <header class="flex flex-row gap-8 px-6 mt-12">
        <picture class="flex-none aspect-square w-52 h-52">
          <img
            :src="playlist?.cover"
            :alt="'Cover of ' + playlist?.title"
            class="object-cover w-full h-full shadow-lg"
            :transition:name="'playlist ' + playlist?.id + ' image'"
          >
        </picture>

        <div class="flex flex-col justify-between">
          <h2 class="flex items-end flex-1">
            Playlist
          </h2>
          <div>
            <h1 class="block text-5xl font-bold text-white">
              {{ playlist?.title }}
              <span :transition:name="'playlist ' + playlist?.id + ' title'" />
            </h1>
          </div>

          <div class="flex items-end flex-1">
            <div class="text-sm font-normal text-gray-300">
              <div :transition:name="'playlist ' + playlist?.id + ' artists'">
                <span>{{ playlist?.artists.join(', ') }}</span>
              </div>
              <p class="mt-1">
                <span class="text-white">{{ playListSongs.length }} canciones</span>,
                3 h aproximadamente
              </p>
            </div>
          </div>
        </div>
      </header>

      <div class="pt-6 pl-6">
        <CardPlayButton :id="Number(id)" size="large" />
      </div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 -z-[1]"
      />

      <section class="p-6">
        <MusicsTable :songs="playListSongs" />
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { allPlaylists, songs } from '@/lib/data'

const route = useRoute()
const id = route.params.id

const playlist = allPlaylists.find(playlist => playlist.id === Number(id))
const playListSongs = songs.filter(song => song.albumId === playlist?.albumId)

</script>

<style scoped>
img {
  view-transition-name: selected-playlist;
}
</style>

<style>
::view-transition-old(header),
::view-transition-new(header) {
  width: auto;
}
</style>
