<template>
	<NuxtLayout>
		<div class="flex flex-col h-full gap-6 px-6 py-4">
			<div
				v-if="hasQuery && filteredItems.length > 0"
				class="flex flex-col w-full gap-4"
			>
				<div
					v-for="song in filteredItems"
					:key="song.id"
					class="flex items-center justify-between overflow-hidden text-sm font-normal rounded-md text-white/70 hover:bg-white/10 group"
					@click="playSong(song)"
				>
					<div class="flex w-full gap-3 px-4 py-2">
						<div class="relative text-white w-11 h-11">
							<nuxt-icon
								:name="playerStore.isPlaying && playerStore.currentMusic.song.id === song.id ? 'pause' : 'play'"
								class="absolute inset-0 z-10 self-center opacity-0 justify-self-center group-hover:opacity-100"
							/>
							<img
								:src="`${$config.public.BASE_URL}${song.image}`"
								:alt="song.title"
								class="rounded-md w-11 h-11 aspect-square group-hover:opacity-60"
								@error="onImageError"
							>
						</div>

						<div class="flex flex-col">
							<span class="text-base text-white">{{ song.title }}</span>
							<span class="hover:text-white hover:underline">
								{{ song.artists.join(', ') }}
							</span>
						</div>
					</div>

					<div class="flex items-center h-full px-4 py-2 rounded-tr-lg rounded-br-lg">
						{{ song.duration }}
					</div>
				</div>
			</div>

			<div
				v-else-if="hasQuery"
				class="flex flex-col items-center justify-center h-full gap-4"
			>
				<h1 class="text-4xl font-bold">
					{{ $t('search.no_results_prefix') }} "{{ searchQuery }}"
				</h1>
				<p class="text-white">
					{{ $t('search.no_results_advice') }}
				</p>
			</div>

			<div
				v-else
				class="flex flex-col gap-2"
			>
				<h2 class="text-2xl font-bold">
					{{ $t('browse.all') }}
				</h2>
				<div class="flex flex-wrap gap-6">
					<CardsSearchCover
						v-for="list in lists"
						:key="list.name"
						:list="list"
					/>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import type { Song, Playlist } from '@/lib/types.d'
import { songs, playlists, otherPlaylists, otherSongs } from '@/lib/data'

const playerStore = usePlayerStore()
const searchStore = useSearchStore()

const searchQuery = computed(() => searchStore.searchQuery)
const allPlaylists = computed(() => [...playlists, ...otherPlaylists])
const allSongs = computed(() => [...songs, ...otherSongs])
const hasQuery = computed(() => searchQuery.value.trim() !== '')
const filteredItems = computed(() =>
	allSongs.value.filter((song: Song) =>
		song.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
	),
)
const lists = computed(() => {
	const genres = new Set(allPlaylists.value.map((p: Playlist) => p.genre))
	return Array.from(genres).map((genre) => {
		const playlist = allPlaylists.value.find((p: Playlist) => p.genre === genre)
		return {
			name: genre,
			color: playlist?.color || '#000',
			cover: playlist?.cover || '/img/no_image.webp',
		}
	})
})

const onImageError = (event: Event) => {
	(event.target as HTMLImageElement).src = '/img/no_image.webp'
}

const playSong = (selectedSong: Song) => {
	const current = playerStore.currentMusic
	const isSame = current?.song?.id === selectedSong.id

	if (playerStore.isPlaying && isSame) {
		playerStore.setIsPlaying(false)
		return
	}

	try {
		const playlistId = selectedSong.albumId ?? ''
		const playlist = allPlaylists.value.find((p: Playlist) => p.id === playlistId)
		const playlistSongs = allSongs.value.filter((s: Song) => s.albumId === playlistId)

		if (!playlist || !playlistSongs.length) return

		playerStore.setCurrentMusic({ songs: playlistSongs, playlist, song: selectedSong })
		playerStore.setIsPlaying(true)
	} catch (error) {
		console.error('Error playing song:', error)
		playerStore.setIsPlaying(false)
	}
}
</script>
