<template>
	<button
		aria-label="Play/Pause"
		:class="[
			'text-black transition rounded-full shadow-xl bg-spotify-electric-green hover:scale-105 hover:bg-spotify-lime-pop',
			size === 'small' ? 'p-3 text-lg' : 'p-5 text-xl',
		]"
		@click="handleClick"
	>
		<nuxt-icon
			v-if="!isPlayingPlaylist"
			name="play"
		/>
		<nuxt-icon
			v-else
			name="pause"
		/>
	</button>
</template>

<script setup lang="ts">
import type { Song, Playlist } from '@/lib/types.d'

const props = defineProps<{
	id: string | string[]
	size?: 'small' | 'large'
}>()

const size = props.size || 'large'

const { BASE_URL } = useRuntimeConfig().public
const playerStore = usePlayerStore()

const isPlayingPlaylist = computed(() => {
	return playerStore.isPlaying && playerStore.currentMusic?.playlist?.id === props.id
})

const handleClick = async () => {
	if (isPlayingPlaylist.value === true) {
		playerStore.setIsPlaying(false)
		return
	}

	try {
		const { songs, playlist }: { songs: Song[], playlist: Playlist } = await $fetch(`${BASE_URL}/api/playlist-info?id=${props.id}`)
		if (songs.length === 0) return
		playerStore.setCurrentMusic({ songs, playlist, song: songs[0] })
		playerStore.setIsPlaying(true)
	} catch (error: any) {
		playerStore.setIsPlaying(false)
		console.error('Error fetching playlist info:', error)
	}
}
</script>
