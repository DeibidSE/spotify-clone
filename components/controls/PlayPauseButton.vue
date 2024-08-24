<template>
  <button
    aria-label="Play/Pause"
    class="p-5 w-[60px] h-[60px] text-xl text-black transition bg-green-500 rounded-full shadow-xl hover:scale-105 hover:bg-green-400"
    @click="handleClick"
  >
    <nuxt-icon v-if="!isPlayingPlaylist" name="play" />
    <nuxt-icon v-else name="pause" />
  </button>
</template>

<script setup lang="ts">
import { type Song, type Playlist } from '@/lib/types.d'

const props = defineProps<{ id: string | string[] }>()

const { BASE_URL } = useRuntimeConfig().public
const playerStore = usePlayerStore()

const isPlayingPlaylist = computed(() => {
  return playerStore.isPlaying && playerStore.currentMusic?.playlist?.id === props.id
})

const handleClick = async () => {
  // Playlist playing clicked to pause music
  if (isPlayingPlaylist.value === true) {
    playerStore.setIsPlaying(false)
    return
  }

  // No music -> Fetch playlist info and set it in the state
  try {
    const { songs, playlist }: { songs: Song[], playlist: Playlist } = await $fetch(`${BASE_URL}/api/playlist-info?id=${props.id}`)
    // Check that there are songs
    if (songs.length === 0) { return }
    // Set the first song of the playlist as the currentMusic
    playerStore.setCurrentMusic({ songs, playlist, song: songs[0] })
    // Play music
    playerStore.setIsPlaying(true)
  } catch (error: any) {
    playerStore.setIsPlaying(false)
    console.error('Error fetching playlist info:', error)
  }
}

</script>
