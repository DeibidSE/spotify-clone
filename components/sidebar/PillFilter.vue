<template>
	<span class="px-3.5 py-1.5 text-sm font-bold bg-spotify-snow hover:bg-spotify-glacier rounded-full cursor-pointer">
		{{ filterText }}
	</span>
</template>

<script setup lang="ts">
defineProps<{ filterText: string }>()
</script>
