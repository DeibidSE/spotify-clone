<template>
	<div class="flex justify-center gap-3 text-white w-36">
		<ToolTip
			:tooltip-text="$t('player.mute')"
			position="top"
		>
			<button
				aria-label="Mute"
				class="transition opacity-70 hover:opacity-100"
				@click="toggleVolume"
			>
				<nuxt-icon
					v-if="isVolumeSilenced"
					name="mute"
				/>
				<nuxt-icon
					v-else
					name="volume"
				/>
			</button>
		</ToolTip>
		<ControlsSliderComponent
			:max="100"
			:value="props.volume !== undefined ? props.volume * 100 : playerStore.volume * 100"
			@update:model-value="handleVolumeChange"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ volume?: number }>()
const emits = defineEmits(['update:volume'])
const playerStore = usePlayerStore()
const previousVolume = ref(0)

const isVolumeSilenced = computed(() => (props.volume !== undefined ? props.volume : playerStore.volume) < 0.01)

const toggleVolume = () => {
	if (isVolumeSilenced.value) {
		emits('update:volume', previousVolume.value)
	} else {
		previousVolume.value = props.volume !== undefined ? props.volume : playerStore.volume
		emits('update:volume', 0)
	}
}

const handleVolumeChange = (value: number[]) => {
	const [newVolume] = value
	const volumeValue = newVolume / 100
	emits('update:volume', volumeValue)
}
</script>
