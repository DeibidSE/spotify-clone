<template>
	<!-- Song Playing Info Section -->
	<div class="flex items-center justify-start w-[30%] min-w-44">
		<CardsCurrentSongDetails />
	</div>

	<!-- Song Controls and Time Slider Section -->
	<div class="flex flex-col items-center justify-center w-[40%] max-w-[722px] gap-2">
		<!-- Control Buttons -->
		<div class="flex flex-row items-center justify-center gap-5">
			<!-- Shuffle Button -->
			<ControlsShuffleButton
				:show-indicator="true"
				class="p-2"
				aria-label="Shuffle Songs"
			/>
			<!-- Previous Song Button -->
			<button
				aria-label="Previous Song"
				class="p-2 text-spotify-icon-light hover:text-white"
				@click="simPlayer.prev"
			>
				<Icon name="my-icon:previous" />
			</button>

			<!-- Play/Pause Button -->
			<button
				aria-label="Play/Pause"
				class="w-8 h-8 p-2 bg-white rounded-full hover:scale-110"
				@click="handlePlayPauseClick"
			>
				<Icon
					v-if="!playerStore.isPlaying"
					name="my-icon:play"
					class="w-4 h-4 text-black"
				/>
				<Icon
					v-else
					name="my-icon:pause"
					class="w-4 h-4 text-black"
				/>
			</button>

			<!-- Next Song Button -->
			<button
				aria-label="Next Song"
				class="p-2 text-spotify-icon-light hover:text-white"
				@click="simPlayer.next"
			>
				<Icon name="my-icon:next" />
			</button>

			<!-- Loop Song Button -->
			<ControlsLoopButton
				aria-label="Toggle Loop"
			/>
		</div>

		<!-- Song Time Slider -->
		<ControlsSeekBar
			:current-time="simPlayer.currentTime"
			:duration="simPlayer.duration"
			aria-label="Song Progress"
			@seek="simPlayer.seek"
		/>
	</div>

	<!-- Volume Control Section -->
	<div class="flex items-center justify-end w-[30%] min-w-44 gap-2">
		<!-- Volume Slider -->
		<ControlsVolumeSlider
			:volume="simPlayer.volume"
			@update:volume="simPlayer.setVolume"
		/>
		<!-- Fullscreen Toggle Button -->
		<button
			aria-label="Toggle full screen"
			class="p-2 transition opacity-70 hover:opacity-100"
			@click="toggleFullscreen"
		>
			<Icon name="my-icon:fullscreen" />
		</button>
	</div>
</template>

<script setup lang="ts">
const simPlayer = useSimulatedPlayerStore()
const playerStore = usePlayerStore()

const handlePlayPauseClick = () => {
	if (playerStore.isPlaying) {
		simPlayer.pause()
	} else {
		simPlayer.play()
	}
}

const toggleFullscreen = () => {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen()
	} else {
		document.exitFullscreen()
	}
}
</script>
