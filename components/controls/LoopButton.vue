<template>
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
    <span
      v-if="loopEnabled"
      class="absolute bottom-0 w-1 h-1 transform -translate-x-1/2 bg-green-500 rounded-full left-1/2"
    />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ audio: HTMLAudioElement | undefined }>()
const loopEnabled = ref(false)

const emits = defineEmits(['switch-loop'])

const toggleLoop = () => {
  if (props.audio) {
    emits('switch-loop', !loopEnabled.value)
    loopEnabled.value = !loopEnabled.value
  }
}
</script>
