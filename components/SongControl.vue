<template>
  <div class="flex w-full gap-3 text-xs">
    <span class="w-12 text-right opacity-50">{{ formatTime(currentTime) }}</span>
    <SliderComponent
      :max="props.audio ? props.audio.duration : 0"
      :value="currentTime"
      @update:model-value="handleSliderChange"
    />
    <span class="w-12 opacity-50">{{ formatTime(props.audio ? props.audio.duration : 0) }}</span>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{audio: HTMLAudioElement | undefined}>()

const emits = defineEmits(['update:audio'])

const currentTime = ref(0)

const handleTimeUpdate = () => {
  if (props.audio) {
    currentTime.value = props.audio.currentTime
  }
}

watch(() => props.audio, (newAudio, oldAudio) => {
  if (oldAudio) {
    oldAudio.removeEventListener('timeupdate', handleTimeUpdate)
  }

  if (newAudio) {
    newAudio.addEventListener('timeupdate', handleTimeUpdate)
    currentTime.value = newAudio.currentTime
  }
})

const formatTime = (time: number) => {
  if (!time || isNaN(time)) { return '0:00' }

  const minutes = Math.floor(time / 60).toString().padStart(2, '0')
  const seconds = Math.floor(time % 60).toString().padStart(2, '0')

  return `${minutes}:${seconds}`
}

const handleSliderChange = (value: number[]) => {
  if (value) {
    const [newCurrentTime] = value
    currentTime.value = newCurrentTime
    emits('update:audio', newCurrentTime)
  }
}
</script>
