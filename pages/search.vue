<template>
  <NuxtLayout>
    <div class="flex flex-col h-full gap-6 px-6 py-4">
      <div class="relative">
        <div class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-4">
          <nuxt-icon name="search" class="w-4 h-4 text-white" />
        </div>
        <input
          v-model="searchQuery"
          type="search"
          :placeholder="$t('search_placeholder')"
          class="w-full p-4 text-sm text-white bg-[#242424] rounded-full ps-10 focus:ring-white focus:border-white hover:border-[#2a2a2a] border-2 border-transparent"
        >
      </div>
      <div v-if="searchQuery !== '' && filteredItems.length > 0" class="flex flex-col w-full gap-4">
        <div
          v-for="(song, key) in filteredItems"
          :key="key"
          class="flex items-center justify-between overflow-hidden text-sm font-normal text-gray-400 rounded-md hover:bg-white/10 group"
          @click="playSong(song)"
        >
          <div class="flex w-full gap-3 px-4 py-2">
            <div class="relative text-white">
              <nuxt-icon
                v-if="!playerStore.isPlaying || playerStore.currentMusic.song.id !== song.id"
                name="play"
                class="absolute inset-0 z-10 self-center opacity-0 justify-self-center group-hover:opacity-100"
              />
              <nuxt-icon
                v-else
                name="pause"
                class="absolute inset-0 z-10 self-center opacity-0 justify-self-center group-hover:opacity-100"
              />
              <img :src="`${$config.public.BASE_URL}${song.image}`" :alt="song.title" class="rounded-md w-11 h-11 aspect-square group-hover:opacity-60">
            </div>

            <div class="flex flex-col">
              <span class="text-base text-white">
                {{ song.title }}
              </span>
              <div class="flex flex-row">
                <span class="hover:text-white hover:underline">
                  {{ song.artists.join(', ') }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center h-full px-4 py-2 rounded-tr-lg rounded-br-lg">
            {{ song.duration }}
          </div>
        </div>
      </div>
      <div v-else-if="searchQuery !== ''" class="flex flex-col items-center justify-center h-full gap-4">
        <h1 class="text-4xl font-bold">
          {{ $t('no_results_for') }} "{{ searchQuery }}"
        </h1>
        <p class="text-white">
          {{ $t('no_results_for_advise') }}
        </p>
      </div>
      <div v-else class="flex flex-col gap-2">
        <h2 class="text-2xl font-bold">
          {{ $t('browse_all') }}
        </h2>
        <div class="flex flex-wrap gap-6">
          <CardsSearchCover v-for="(list, key) in lists" :key="key" :list="list" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { type Song } from '@/lib/types.d'
import { songs, playlists } from '@/lib/data'

const playerStore = usePlayerStore()
const searchQuery = ref('')

const filteredItems = computed(() => {
  return songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const lists = Array.from(new Set(playlists.map(playlist => playlist.genre))).map((genre) => {
  const playlist = playlists.find(p => p.genre === genre)
  return { name: genre, color: playlist?.color || '#000', cover: playlist?.cover }
})

const playSong = (selectedSong: Song) => {
  const currentMusic = playerStore.currentMusic
  const isSameSong = currentMusic?.song?.id === selectedSong.id

  // Pause the music if the song clicked is the same that is playing
  if (playerStore.isPlaying && isSameSong) {
    playerStore.setIsPlaying(false)
    return
  }

  try {
    const playlistId = selectedSong.albumId ?? ''

    // From the song selected, gets the playlist and all the songs of that playlist
    const playlist = playlists.find(playlist => playlist.id === playlistId)
    const playlistSongs = songs.filter(song => song.albumId === playlistId)

    if (!playlist || !playlistSongs) { return }

    // Set the song selected as the currentMusic
    playerStore.setCurrentMusic({ songs: playlistSongs, playlist, song: selectedSong })
    // Play music
    playerStore.setIsPlaying(true)
  } catch (error) {
    playerStore.setIsPlaying(false)
    console.error('Error playing song:', error)
  }
}
</script>
