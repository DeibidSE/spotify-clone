<template>
	<!-- ARTIST PAGE -->
	<header class="relative flex flex-col items-start justify-end gap-2 px-6 pt-16 pb-6 transition-all duration-300 min-h-96">
		<!-- Imagen de fondo del header -->
		<div
			class="absolute inset-0 z-[-2] bg-cover bg-center p-0"
			:style="`background-image: url('${playlist?.header || '/img/no_image.webp'}')`"
		/>

		<!-- Contenido encima del fondo -->
		<h2 class="flex items-center gap-2 text-sm font-semibold text-white/70">
			<Icon
				name="my-icon:verified"
				class="text-lg text-spotify-ocean"
			/>
			{{ $t('artist.verified_artist') }}
		</h2>
		<h1 class="font-extrabold text-white text-8xl whitespace-nowrap">
			{{ playlist?.title }}
		</h1>
		<p class="mt-2 text-base text-white">
			39.989.167 {{ $t('artist.monthly_listeners') }}
		</p>
	</header>

	<div class="p-6">
		<h3 class="pb-4 text-xl font-bold text-white">
			{{ $t('common.populars') }}
		</h3>
		<PlaylistTable
			v-if="playlist"
			:songs="playlistSongs"
			:playlist="playlist"
		/>
	</div>
</template>

<script setup lang="ts">
import type { Playlist, Song } from '@/lib/types'

const props = defineProps<{ songs: Song[], playlists: Playlist[] }>()

const { t } = useI18n()
const route = useRoute()
const playerStore = usePlayerStore()

const isListExpanded = ref(false)

const id = computed(() => route.params.id)
const playlist = computed(() => props.playlists.find((p: Playlist) => p?.id === id.value))
const playlistSongs = computed(() => props.songs.filter((song: Song) => song.albumId === playlist.value?.id))
const artists = computed(() => {
	const allArtists = playlistSongs.value.flatMap(song => song.artists)
	return [...new Set(allArtists)].join(', ')
})
const totalDurationInSeconds = computed(() => playlistSongs.value.reduce((sum, song) => sum + durationInSeconds(song.duration), 0))
const formattedDuration = computed(() => formatDuration(totalDurationInSeconds.value))
const viewModes = computed(() => [{ compact: true, label: t('view.compact'), icon: 'compact-list' }, { compact: false, label: t('view.list'), icon: 'list' }])
const viewModeLabel = computed(() => playerStore.isListCompact ? t('view.compact') : t('view.list'))

function durationInSeconds(duration: string): number {
	const parts = duration.split(':').map(Number)
	if (parts.length === 2) return parts[0] * 60 + parts[1]
	if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
	return 0
}

function formatDuration(seconds: number): string {
	const h = Math.floor(seconds / 3600)
	const m = Math.floor((seconds % 3600) / 60)
	return h ? `${h} h` : `${m} min`
}

function onImageError(event: Event) {
	(event.target as HTMLImageElement).src = '/img/no_image.webp'
}

const toggleListView = () => {
	isListExpanded.value = !isListExpanded.value
}

const setListView = (compact: boolean) => {
	playerStore.setCompactList(compact)
	isListExpanded.value = false
}
</script>
