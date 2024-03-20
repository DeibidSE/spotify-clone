<template>
  <NuxtLayout>
    <div class="flex flex-col gap-6 px-6 py-4">
      <header class="flex flex-row gap-8">
        <picture v-if="playlist" class="flex-none aspect-square w-52 h-52">
          <img
            :src="`${config.public.BASE_URL}/${playlist.cover}`"
            :alt="'Cover of ' + playlist.title"
            class="object-cover w-full h-full shadow-lg rounded-[4px] [view-transition-name:selected-playlist] aspect-square"
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

      <div v-if="playlist" class="flex items-center justify-start w-full h-full gap-10 p-6">
        <CardPlayButton :id="id" size="large" />
        <button
          aria-label="More options"
          class="flex items-center justify-center pb-2 text-3xl tracking-widest text-center text-gray-400 transition cursor-pointer hover:scale-105 hover:text-gray-300"
        >
          ...
        </button>
      </div>

      <PlaylistTable v-if="playlist" :songs="playlistSongs" :playlist="playlist" />

      <!-- Gradient -->
      <div
        class="absolute inset-0 -z-[1]"
        :style="`background-image: linear-gradient(to top, rgb(24, 24, 27), rgba(24, 24, 27, 0.8), ${playlist?.color})`"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { playlists, songs } from '@/lib/data'

const config = useRuntimeConfig()
const route = useRoute()
// Recover id from the route and cast it to Number (as it recovers it as a string)
const id = route.params.id
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
