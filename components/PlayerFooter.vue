<template>
  <div class="z-50 flex flex-row justify-between w-full h-full px-1">
    <div class="w-[200px] grid place-content-center">
      Current Song Info
    </div>

    <div class="grid flex-1 gap-4 place-content-center">
      <div class="flex flex-col items-center justify-center gap-2">
        <button class="p-2 bg-white rounded-full" @click="togglePlay">
          <svg
            v-if="playerStore.isPlaying"
            role="img"
            height="16"
            width="16"
            aria-hidden="true"
            viewBox="0 0 16 16"
          ><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z" /></svg>
          <svg
            v-else
            role="img"
            height="16"
            width="16"
            aria-hidden="true"
            viewBox="0 0 16 16"
          ><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" /></svg>
        </button>
        <SongControl :audio="audioRef" @update:audio="updateAudioRef" />
        <audio ref="audioRef" />
      </div>
    </div>

    <div class="grid place-content-center">
      Volume Control
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from '@/store/playerStore'

const playerStore = usePlayerStore()
const audioRef = ref(null)
let audioSrc = null

const togglePlay = () => {
  if (playerStore.currentMusic.song) {
    playerStore.setIsPlaying(!playerStore.isPlaying)
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

</script>
