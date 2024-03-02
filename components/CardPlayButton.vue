<template>
  <button
    class="p-4 transition bg-green-500 rounded-full card-play-button hover:scale-105 hover:bg-green-400"
    @click="handleClick"
  >
    <IconsPlayIcon
      v-if="!isPlayingPlaylist"
      :class="[
        size === 'small' ? 'w-4 h-4' : 'w-5 h-5'
      ]"
    />
    <IconsPauseIcon
      v-else
      :class="[
        size === 'small' ? 'w-4 h-4' : 'w-5 h-5'
      ]"
    />
  </button>
</template>

<script setup>
import { usePlayerStore } from '@/store/playerStore'

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
    const res = await fetch(`/api/playlist-info?id=${props.id}`, { server: false })
    const { songs, playlist } = await res.json()
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
