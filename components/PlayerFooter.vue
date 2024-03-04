<template>
  <div class="z-50 flex flex-row justify-between w-full h-full gap-6 px-1">
    <div class="flex items-center justify-start">
      <CurrentSong />
    </div>

    <div class="flex items-center justify-center flex-1 w-full gap-4">
      <div class="flex flex-col items-center justify-center w-full gap-2">
        <div class="flex flex-row items-center justify-center gap-6">
          <!-- Previous song button-->
          <button class="p-2" @click="prevSong">
            <IconsPrevIcon />
          </button>
          <!-- Play/pause button-->
          <button class="p-2 bg-white rounded-full" @click="togglePlay">
            <IconsPlayIcon v-if="!playerStore.isPlaying" class="w-4 h-4" />
            <IconsPauseIcon v-else class="w-4 h-4" />
          </button>
          <!-- Next song button -->
          <button class="p-2" @click="nextSong">
            <IconsNextIcon />
          </button>
        </div>

        <!-- Song time slider-->
        <SongControl :audio="audioRef" @update:audio="updateAudioRef" />
        <audio ref="audioRef" />
      </div>
    </div>

    <div class="flex items-center justify-end">
      <VolumeControl />
    </div>
  </div>
</template>

<script setup>

const playerStore = usePlayerStore()
const audioRef = ref(null)
let audioSrc = null

const currentSong = computed(() => {
  return playerStore.currentMusic?.song
})

const togglePlay = () => {
  if (currentSong.value) {
    playerStore.setIsPlaying(!playerStore.isPlaying)
  }
}

const nextSong = () => {
  const { song, playlist, songs } = playerStore.currentMusic
  const index = playerStore.currentMusic.songs.findIndex(e => e.id === song.id) ?? -1
  if (index > -1 && index + 1 < songs.length) {
    playerStore.setIsPlaying(false)
    playerStore.setCurrentMusic({ songs, playlist, song: songs[index + 1] })
    playerStore.setIsPlaying(true)
    audioRef.value.currentTime = 0
  }
}

const prevSong = () => {
  const { song, playlist, songs } = playerStore.currentMusic
  const index = playerStore.currentMusic.songs.findIndex(e => e.id === song.id) ?? -1
  if (index && index > -1 && index > 0) {
    playerStore.setIsPlaying(false)
    playerStore.setCurrentMusic({ songs, playlist, song: songs[index - 1] })
    playerStore.setIsPlaying(true)
    audioRef.value.currentTime = 0
  }
}

const updateAudioRef = (newAudio) => {
  if (audioRef.value) {
    audioRef.value.currentTime = newAudio
  }
}

watchEffect(() => {
  if (!audioRef.value) { return }

  const { song, playlist } = playerStore.currentMusic
  if (!song || !playlist) { return }

  const src = `/music/${playlist.id}/0${song.id}.mp3`
  if (src !== audioSrc) {
    audioSrc = src
    audioRef.value.src = src
    audioRef.value.volume = playerStore.volume
  }

  if (playerStore.isPlaying) {
    audioRef.value.play()
  } else {
    audioRef.value.pause()
  }
})

watch(() => playerStore.volume, (newVolume) => {
  audioRef.value.volume = newVolume
})

</script>
