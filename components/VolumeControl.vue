<template>
  <div class="flex justify-center w-32 gap-2 pr-2 text-white">
    <button class="transition opacity-70 hover:opacity-100" @click="toggleVolume">
      <IconsMuteVolume v-if="isVolumeSilenced" />
      <IconsVolumeIcon v-else />
    </button>
    <SliderComponent
      :max="100"
      :value="playerStore.volume * 100"
      @update:model-value="handleVolumeChange"
    />
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
