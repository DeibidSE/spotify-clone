<template>
  <!-- Song playing info -->
  <div class="flex items-center justify-start w-[30%] min-w-44">
    <CardsCurrentSongDetails />
  </div>

  <!-- Song controls and time slider -->
  <div class="flex flex-col items-center justify-center w-[40%] max-w-[722px] gap-2">
    <!-- Control buttons -->
    <div class="flex flex-row items-center justify-center gap-5">
      <!-- Shuffle Button -->
      <ControlsShuffleButton :show-indicator="true" class="p-2" />

      <!-- Previous song btn-->
      <button aria-label="Previous song" class="p-2 text-zinc-400 hover:text-zinc-100" @click="prevSong">
        <nuxt-icon name="previous" />
      </button>

      <!-- Play/pause btn-->
      <button aria-label="Play/Pause" class="w-8 h-8 p-2 bg-white rounded-full hover:scale-110" @click="togglePlay">
        <nuxt-icon v-if="!playerStore.isPlaying" name="play" class="w-4 h-4 text-black" />
        <nuxt-icon v-else name="pause" class="w-4 h-4 text-black" />
      </button>

      <!-- Next song btn -->
      <button aria-label="Next song" class="p-2 text-zinc-400 hover:text-zinc-100" @click="nextSong">
        <nuxt-icon name="next" />
      </button>

      <!-- Loop song btn -->
      <ControlsLoopButton :audio="audioRef" @switch-loop="switchLoop" />
    </div>

    <!-- Song time slider -->
    <ControlsSeekBar :audio="audioRef" @update:audio="updateAudioRef" />
    <audio ref="audioRef" />
  </div>

  <!-- Volume control -->
  <div class="flex items-center justify-end w-[30%] min-w-44">
    <ControlsVolumeSlider />
  </div>
</template>

<script setup lang="ts">

const { BASE_URL } = useRuntimeConfig().public
const playerStore = usePlayerStore()
const audioRef = ref<HTMLAudioElement>()
let audioSrc = ''

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

  if (!song || !playlist || !songs) { return }

  const index = songs.findIndex(e => e.id === song.id) ?? -1

  //  Exit if the current song is not found in the song list
  if (index === -1 || !audioRef.value) { return }

  // Get the index of the next song, considering the song list cycle.
  const nextIndex = (index + 1) % songs.length

  playerStore.setIsPlaying(false)
  playerStore.setCurrentMusic({ songs, playlist, song: songs[nextIndex] })
  playerStore.setIsPlaying(true)
  audioRef.value.currentTime = 0
}

const prevSong = () => {
  const { song, playlist, songs } = playerStore.currentMusic

  if (!song || !playlist || !songs) { return }

  const index = songs.findIndex(e => e.id === song.id) ?? -1

  // Exit if the current song is the first one or there is no audio.
  if (index <= 0 || !audioRef.value) { return }

  const prevIndex = index - 1

  playerStore.setIsPlaying(false)
  playerStore.setCurrentMusic({ songs, playlist, song: songs[prevIndex] })
  playerStore.setIsPlaying(true)
  audioRef.value.currentTime = 0
}

const switchLoop = (loopEnabled: boolean) => {
  if (audioRef.value && loopEnabled) {
    audioRef.value.loop = loopEnabled
  }
}

const updateAudioRef = (newAudio: number) => {
  if (audioRef.value && newAudio) {
    audioRef.value.currentTime = newAudio
  }
}

watchEffect(() => {
  const { song, playlist } = playerStore.currentMusic

  if (!song || !playlist || Object.keys(playlist).length === 0 || !audioRef.value) { return }

  const src = `${BASE_URL}/music/${playlist.id}/0${song.id}.mp3`

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
  if (audioRef.value) {
    audioRef.value.volume = newVolume
  }
})

</script>
