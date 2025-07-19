<template>
	<div class="flex w-full gap-3 text-xs">
		<span class="w-12 text-right opacity-50">{{ formatTime(props.currentTime) }}</span>
		<ControlsSliderComponent
			:max="props.duration"
			:value="props.currentTime"
			@update:model-value="handleSliderChange"
		/>
		<span class="w-12 opacity-50">{{ formatTime(props.duration) }}</span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ currentTime: number, duration: number }>()
const emits = defineEmits(['seek'])

const formatTime = (time: number) => {
	if (!time || isNaN(time)) { return '0:00' }
	const minutes = Math.floor(time / 60).toString().padStart(2, '0')
	const seconds = Math.floor(time % 60).toString().padStart(2, '0')
	return `${minutes}:${seconds}`
}

const handleSliderChange = (value: number[]) => {
	if (value) {
		const [newCurrentTime] = value
		emits('seek', newCurrentTime)
	}
}
</script>
