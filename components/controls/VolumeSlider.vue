<template>
	<div class="flex justify-center gap-3 text-white w-36">
		<ToolTip
			:tooltip-text="$t('mute')"
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
