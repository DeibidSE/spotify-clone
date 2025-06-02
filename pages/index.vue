<template>
	<NuxtLayout>
		<div class="flex flex-col gap-6 px-6 py-4">
			<!-- Greetings message -->
			<HeaderGreetingsTitle />
			<!-- List of playlists -->
			<div class="flex flex-wrap gap-4">
				<CardsPlaylistCard
					v-for="(playlist, key) in playlists"
					:key="key"
					:playlist="playlist"
					@hover="setHoveredColor(playlist.color || '#1DB954')"
					@leave="clearHoveredColor()"
				/>
			</div>
		</div>
		<!-- Base gradient -->
		<div class="absolute inset-0 -z-20 bg-gradient-to-t from-spotify-obsidian via-spotify-obsidian/80 to-spotify-electric-green/80" />

		<!-- Gradiente dinámico (con transición de opacidad) -->
		<Transition name="fade">
			<div
				v-if="hoveredColor"
				class="absolute inset-0 pointer-events-none -z-10"
				:style="{
					backgroundImage: `linear-gradient(to top, rgba(18,18,18), rgba(18,18,18,0.8), ${hoveredColor})`,
				}"
			/>
		</Transition>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { playlists } from '@/lib/data'

const hoveredColor = ref<string | null>(null)

function setHoveredColor(color: string) {
	hoveredColor.value = color
}

function clearHoveredColor() {
	hoveredColor.value = null
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: opacity 2s ease;
}
.fade-enter-from, .fade-leave-to {
	opacity: 0;
}
</style>
