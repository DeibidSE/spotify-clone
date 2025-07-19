<template>
	<NuxtLayout>
		<div
			ref="scrollContainer"
			class="relative flex flex-col h-full px-6 overflow-y-auto"
		>
			<header class="flex flex-row gap-8 py-6 transition-all duration-300">
				<!-- Cover -->
				<picture
					v-if="playlist"
					class="flex-none object-cover transition-all duration-300 rounded shadow-lg w-52 h-52"
					:style="{ 'view-transition-name': `selected-playlist-${playlist.id}` }"
				>
					<img
						:src="playlist.cover ? playlist.cover : '/img/no_image.webp'"
						:alt="`Cover of ${playlist.title}`"
						class="object-cover w-full h-full rounded aspect-square"
						@error="onImageError"
					>
				</picture>

				<!-- Metadata -->
				<div class="flex flex-col items-start justify-end w-full truncate">
					<h2 class="flex w-full text-sm transition-all duration-300">
						{{ $t('playlist.title') }}
					</h2>
					<h1 class="w-full font-extrabold text-white truncate transition-all duration-300 text-8xl">
						{{ playlist?.title }}
					</h1>
					<div
						v-if="playlist"
						class="flex flex-col w-full gap-1 text-sm font-normal text-white"
					>
						<span class="w-1/2 font-bold truncate">
							{{ artists }}
						</span>
						<div class="flex items-center justify-start gap-2">
							<nuxt-icon
								name="logo"
								class="text-2xl text-spotify-lime-pop"
							/>
							<span>{{ $t('song.made_for_you') }} • {{ playlistSongs.length }} {{ $t('song.plural') }}, {{ formattedDuration }}</span>
						</div>
					</div>
				</div>
			</header>

			<!-- Controls -->
			<div
				v-if="playlist"
				class="relative flex items-center justify-between w-full py-6"
			>
				<div class="flex items-center w-full gap-10">
					<ControlsPlayPauseButton :id="id" />
					<ControlsShuffleButton class="text-3xl" />
					<button
						aria-label="More options"
						class="flex items-center justify-center pb-2 text-3xl tracking-wider transition cursor-pointer text-spotify-icon-light hover:text-white hover:scale-105"
					>
						...
					</button>
				</div>

				<!-- View mode toggle -->
				<div
					class="flex items-center gap-2 transition cursor-pointer text-spotify-steel hover:text-white"
					@click="toggleListView"
				>
					<span class="text-sm">{{ viewModeLabel }}</span>
					<nuxt-icon name="list" />
					<ul
						v-show="isListExpanded"
						class="absolute z-10 w-40 p-1 overflow-hidden rounded shadow-lg right-4 top-20 bg-spotify-dusk-transition"
					>
						<li class="p-3 text-xs font-bold text-white/70">
							{{ $t('view.mode') }}
						</li>
						<li
							v-for="(option, index) in viewModes"
							:key="index"
							:class="{ 'text-spotify-electric-green': playerStore.isListCompact === option.compact }"
							class="flex items-center gap-4 p-3 text-sm transition-colors duration-300 rounded-sm hover:bg-white/10"
							@click="setListView(option.compact)"
						>
							<nuxt-icon :name="option.icon" />
							{{ option.label }}
						</li>
					</ul>
				</div>
			</div>

			<!-- Songs Table -->
			<PlaylistTable
				v-if="playlist"
				:songs="playlistSongs"
				:playlist="playlist"
			/>
		</div>

		<!-- Background Gradient -->
		<div
			class="absolute inset-0 -z-[1]"
			:style="`background-image: linear-gradient(to top, rgb(24, 24, 27), rgba(24, 24, 27, 0.8), ${playlist?.color})`"
		/>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { playlists, songs } from '@/lib/data'
import type { Playlist, Song } from '@/lib/types'

const { t } = useI18n()
const route = useRoute()
const playerStore = usePlayerStore()

const isListExpanded = ref(false)

const id = computed(() => route.params.id)
const playlist = computed(() => playlists.find((p: Playlist) => p?.id === id.value))
const playlistSongs = computed(() => songs.filter((song: Song) => song.albumId === playlist.value?.id))
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
