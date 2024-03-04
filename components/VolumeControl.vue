<template>
  <div class="flex justify-center w-40 gap-3 text-white">
    <button class="transition opacity-70 hover:opacity-100" @click="toggleVolume">
      <nuxt-icon v-if="isVolumeSilenced" name="mute" />
      <nuxt-icon v-else name="volume" />
    </button>
    <SliderComponent
      :max="100"
      :value="playerStore.volume * 100"
      @update:model-value="handleVolumeChange"
    />
    <button class="ml-2 transition opacity-70 hover:opacity-100">
      <nuxt-icon name="expand" />
    </button>
  </div>
</template>

<script setup lang="ts">

const playerStore = usePlayerStore()
const previousVolume = ref(0)

const isVolumeSilenced = computed(() => playerStore.volume < 0.01)

const toggleVolume = () => {
  if (isVolumeSilenced.value) {
    playerStore.setVolume(previousVolume.value)
  } else {
    previousVolume.value = playerStore.volume
    playerStore.setVolume(0)
  }
}

const handleVolumeChange = (value: number[]) => {
  const [newVolume] = value
  const volumeValue = newVolume / 100
  playerStore.setVolume(volumeValue)
}
</script>
