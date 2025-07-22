<template>
	<span
		:class="[
			'px-3.5 py-1.5 text-sm font-bold rounded-full cursor-pointer transition-colors',
			isSelected
				? 'bg-white text-spotify-obsidian'
				: 'bg-spotify-snow hover:bg-spotify-glacier',
		]"
		@click="$emit('select', filterText)"
	>
		{{ filterText }}
	</span>
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
