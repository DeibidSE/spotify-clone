<template>
  <NuxtLayout>
    <div
      class="relative flex flex-col h-full gap-6 px-6 py-4 overflow-x-hidden bg-zinc-900"
    >
      <HeaderMenu />
      <header class="flex flex-row gap-8">
        <picture v-if="playlist" class="flex-none aspect-square w-52 h-52">
          <img
            :src="playlist.cover"
            :alt="'Cover of ' + playlist.title"
            class="object-cover w-full h-full shadow-lg rounded-[4px] [view-transition-name:selected-playlist]"
          >
        </picture>

        <div class="flex flex-col items-start justify-end w-full h-full truncate">
          <h2 class="flex w-full">
            Lista
          </h2>
          <h1 class="w-full font-bold text-white truncate text-8xl">
            {{ playlist?.title }}
          </h1>
          <div v-if="playlist" class="flex flex-row w-full gap-1 text-sm font-normal text-gray-300">
            <span class="font-bold">{{ playlist.artists.join(', ') }}</span>
            <span class="font-normal">• {{ playlistSongs.length ?? '0' }} canciones, {{ formattedDuration ?? '' }}</span>
          </div>
        </div>
      </header>

      <div v-if="playlist" class="pt-6">
        <CardPlayButton :id="id" size="large" />
      </div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 -z-[1]"
      />

      <section v-if="playlist">
        <MusicsTable :songs="playlistSongs" />
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { playlists, songs } from '@/lib/data'

const route = useRoute()
// Recover id from the route and cast it to Number (as it recovers it as a string)
const id = Number(route.params.id)
// Find the playlist that matches that id
const playlist = playlists.find(playlist => playlist?.id === id)
// Get all the songs from that playlist
const playlistSongs = songs.filter(song => song.albumId === playlist?.id)
// Calculate total duration of all songs in the playlist in seconds
const totalDurationInSeconds = playlistSongs.reduce((totalSeconds, song) => totalSeconds + durationInSeconds(song.duration), 0)
// Format total duration in seconds to a human-readable format
const formattedDuration = formatDuration(totalDurationInSeconds)

function durationInSeconds (duration: string): number {
  const parts = duration.split(':').map(Number)
  return parts.length === 2 ? parts[0] * 60 + parts[1] : parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : 0
}

function formatDuration (totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return hours > 0 ? `${hours} h` : `${minutes} min`
}

</script>
