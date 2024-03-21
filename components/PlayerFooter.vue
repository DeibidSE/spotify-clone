<template>
  <div class="z-50 flex w-full h-full gap-2 px-1">
    <div class="flex items-center justify-start w-[30%]">
      <CurrentSong />
    </div>

    <div class="flex flex-col items-center justify-center w-[40%] gap-2">
      <!-- Control buttons -->
      <div class="flex flex-row items-center justify-center gap-5">
        <!-- Previous song btn-->
        <button aria-label="Previous song" class="p-2 text-zinc-400 hover:text-zinc-100" @click="prevSong">
          <nuxt-icon name="previous" />
        </button>
        <!-- Play/pause btn-->
        <button aria-label="Play/Pause" class="p-2 bg-white rounded-full hover:scale-110" @click="togglePlay">
          <nuxt-icon v-if="!playerStore.isPlaying" name="play" class="w-4 h-4 text-black" />
          <nuxt-icon v-else name="pause" class="w-4 h-4 text-black" />
        </button>
        <!-- Next song btn -->
        <button aria-label="Next song" class="p-2 text-zinc-400 hover:text-zinc-100" @click="nextSong">
          <nuxt-icon name="next" />
        </button>
        <button
          aria-label="Loop"
          class="relative p-2"
          :class="{
            'text-green-500 hover:text-green-400': loopEnabled,
            'text-zinc-400 hover:text-zinc-100' : !loopEnabled
          }"
          @click="toggleLoop"
        >
          <nuxt-icon name="loop" />
          <span v-if="loopEnabled" class="absolute bottom-0 w-1 h-1 transform -translate-x-1/2 bg-green-500 rounded-full left-1/2" />
        </button>
      </div>

      <!-- Song time slider-->
      <SongControl :audio="audioRef" @update:audio="updateAudioRef" />
      <audio ref="audioRef" />
    </div>

    <div class="flex items-center justify-end w-[30%] min-w-44">
      <VolumeControl />
    </div>
  </div>
</template>

<script setup lang="ts">

const playerStore = usePlayerStore()
const audioRef = ref<HTMLAudioElement>()
const loopEnabled = ref(false)
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
  const index = songs.findIndex(e => e.id === song.id) ?? -1

  if (index > -1 && index + 1 < songs.length && audioRef.value) {
    playerStore.setIsPlaying(false)
    playerStore.setCurrentMusic({ songs, playlist, song: songs[index + 1] })
    playerStore.setIsPlaying(true)
    audioRef.value.currentTime = 0
  }
}

const prevSong = () => {
  const { song, playlist, songs } = playerStore.currentMusic
  const index = songs.findIndex(e => e.id === song.id) ?? -1

  if (index > -1 && index > 0 && audioRef.value) {
    playerStore.setIsPlaying(false)
    playerStore.setCurrentMusic({ songs, playlist, song: songs[index - 1] })
    playerStore.setIsPlaying(true)
    audioRef.value.currentTime = 0
  }
}

const toggleLoop = () => {
  if (audioRef.value) {
    audioRef.value.loop = !loopEnabled.value
    loopEnabled.value = !loopEnabled.value
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
  if (audioRef.value) {
    audioRef.value.volume = newVolume
  }
})

</script>
