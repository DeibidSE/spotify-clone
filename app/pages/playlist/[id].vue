<template>
	<NuxtLayout>
		<div
			ref="scrollContainer"
			class="relative flex flex-col h-full overflow-y-auto"
			:class="{
				'px-6': !isArtistPage,
			}"
		>
			<component
				:is="isArtistPage ? ViewsArtistView : ViewsPlaylistView"
				:playlists="allPlaylists"
				:songs="playlistSongs"
			/>
		</div>
		<!-- Background Gradient -->
		<div
			v-if="!isArtistPage"
			class="absolute inset-0 -z-[1]"
			:style="`background-image: linear-gradient(to top, rgb(24, 24, 27), rgba(24, 24, 27, 0.8), ${playlist?.color})`"
		/>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { playlists, songs } from '@/lib/data'
import type { Playlist, Song } from '@/lib/types'

const ViewsArtistView = resolveComponent('ViewsArtistView')
const ViewsPlaylistView = resolveComponent('ViewsPlaylistView')

const route = useRoute()
const library = useLibraryStore()

// User-created playlists live in the library store, not in the static data.
const allPlaylists = computed<Playlist[]>(() => [
	...playlists,
	...library.items.filter(i => !playlists.some(p => p.id === i.id)),
])

const id = computed(() => route.params.id)
const playlist = computed(() => allPlaylists.value.find((p: Playlist) => p?.id === id.value))
const isArtistPage = computed(() => playlist.value?.type === 'artist')
const playlistSongs = computed(() => songs.filter((song: Song) => song.albumId === playlist.value?.id))
</script>
