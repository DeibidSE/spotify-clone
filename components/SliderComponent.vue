<template>
  <SliderRoot
    v-model="sliderValue"
    class="relative flex items-center w-full select-none touch-none group"
    :max="max"
    @update:model-value="$emit('update:modelValue', sliderValue)"
  >
    <SliderTrack class="relative w-full h-1 overflow-hidden bg-gray-800 rounded-full grow">
      <SliderRange class="absolute h-full bg-white group-hover:bg-green-400" />
    </SliderTrack>
    <SliderThumb
      class="hidden w-3 h-3 transition-colors bg-white border-2 rounded-full group-hover:block border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      aria-label="Volume"
    />
  </SliderRoot>
</template>

<script setup lang="ts">

defineEmits(['update:modelValue'])

const props = defineProps<{ max?: number, value: number }>()
const sliderValue = ref<number[]>(props.value ? [props.value] : [0])

watch(() => props.value, (newValue: number) => {
  sliderValue.value = [newValue]
})
</script>
