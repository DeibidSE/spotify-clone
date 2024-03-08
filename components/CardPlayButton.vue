<template>
  <button
    aria-label="Play/Pause"
    class="p-4 transition bg-green-500 rounded-full shadow-xl card-play-button hover:scale-105 hover:bg-green-400"
    @click="handleClick"
  >
    <nuxt-icon
      v-if="!isPlayingPlaylist"
      name="play"
      class="text-black"
      :class="[
        size === 'small' ? 'text-sm' : 'text-xl'
      ]"
    />
    <nuxt-icon
      v-else
      name="pause"
      class="text-black"
      :class="[
        size === 'small' ? 'text-sm' : 'text-xl'
      ]"
    />
  </button>
</template>

<script setup lang="ts">
import { type Song, type Playlist } from '@/lib/types.d'

const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  size: {
    type: String,
    default: 'small'
  }
})

const config = useRuntimeConfig()
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
    const { songs, playlist }: { songs: Song[], playlist: Playlist } = await $fetch(`${config.public.BASE_URL}/api/playlist-info?id=${props.id}`)
    // Set the first song of the playlist as the currentMusic
    playerStore.setCurrentMusic({ songs, playlist, song: songs[0] })
    // Play music
    playerStore.setIsPlaying(true)
  } catch (error) {
    playerStore.setIsPlaying(false)
    console.error('Error fetching playlist info:', error)
  }
}

</script>
