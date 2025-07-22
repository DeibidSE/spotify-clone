<template>
	<button
		aria-label="Loop"
		class="relative p-2"
		:class="{
			'text-spotify-electric-green hover:text-spotify-lime-pop': loopEnabled,
			'text-spotify-icon-light hover:text-white': !loopEnabled,
		}"
		@click="toggleLoop"
	>
		<Icon name="my-icon:loop" />
		<span
			v-if="loopEnabled"
			class="absolute bottom-0 w-1 h-1 transform -translate-x-1/2 rounded-full bg-spotify-electric-green left-1/2"
		/>
	</button>
</template>

<script setup lang="ts">
const loopEnabled = ref(false)

const emits = defineEmits(['switch-loop'])

const toggleLoop = () => {
	loopEnabled.value = !loopEnabled.value
	emits('switch-loop', loopEnabled.value)
}
</script>
