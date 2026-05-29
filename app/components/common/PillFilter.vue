<template>
	<button
		type="button"
		:aria-pressed="isSelected"
		:class="[
			'px-3.5 py-1.5 text-sm font-bold rounded-full cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white',
			isSelected
				? 'bg-white text-spotify-obsidian'
				: 'bg-spotify-snow text-white hover:bg-spotify-glacier',
		]"
		@click="$emit('select', filterText)"
	>
		{{ filterText }}
	</button>
</template>

<script setup lang="ts">
defineProps<{
	filterText: string
	isSelected?: boolean
}>()

defineEmits<{
	select: [filterText: string]
}>()
</script>
