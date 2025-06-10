<template>
	<NuxtLayout>
		<div
			ref="scrollContainer"
			class="relative flex flex-col h-full px-6 overflow-y-auto"
			@scroll.passive="onScroll"
		>
			<!-- Sticky Overlay Header (Bugged AF, TODO: Fix it) -->
			<!-- <div
				class="sticky top-0 z-30 w-full transition-opacity duration-300 pointer-events-none"
				:class="{ 'opacity-0': !scrolled, 'opacity-100': scrolled }"
			>
				<div class="flex flex-col w-full pointer-events-auto">
					<div
						class="flex items-center gap-6 px-6 py-2"
						:style="`background-color: ${playlist?.color};`"
					>
						<ControlsPlayPauseButton :id="id" />
						<h1 class="text-2xl font-extrabold text-white truncate">
							{{ playlist?.title }}
						</h1>
					</div>
					<div class="w-full px-6 text-sm font-normal bg-spotify-midnight text-spotify-icon-light">
						<table class="w-full">
							<thead>
								<tr>
									<th class="w-5 px-4 py-2 text-left">
										#
									</th>
									<th class="px-4 py-2 text-left">
										<span class="hover:text-white">{{ $t('track.title') }}</span>
									</th>
									<th
										v-if="playerStore.isListCompact"
										class="px-4 py-2 text-left"
									>
										<span class="hover:text-white">{{ $t('artist.plural') }}</span>
									</th>
									<th class="px-4 py-2 text-left">
										<span class="hover:text-white">{{ $t('album.single') }}</span>
									</th>
									<th class="w-10 px-4 py-2 text-left">
										<nuxt-icon
											name="time"
											class="hover:text-white"
										/>
									</th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
			</div> -->

			<!-- Main Header (non-sticky) -->
			<header class="flex flex-row gap-8 py-6 transition-all duration-300">
				<picture
					v-if="playlist"
					class="flex-none transition-all duration-300 object-cover shadow-lg rounded-[4px] [view-transition-name:selected-playlist] w-52 h-52"
				>
					<img
						:src="`${$config.public.BASE_URL}${playlist.cover ? playlist.cover : '/img/no_image.webp'}`"
						:alt="'Cover of ' + playlist.title"
						class="w-full h-full rounded-[4px] aspect-square"
					>
				</picture>

				<div class="flex flex-col items-start justify-end w-full truncate">
					<h2 class="flex w-full text-sm transition-all duration-300">
						{{ $t('playlist.title') }}
					</h2>
					<h1 class="w-full font-extrabold text-white truncate transition-all duration-300 text-8xl">
						{{ playlist?.title }}
					</h1>
					<div
						v-if="playlist"
						class="flex flex-row w-full gap-1 text-sm font-normal text-white"
					>
						<span class="font-bold">
							{{ playlist.artists.length > 0 ? playlist.artists.join(', ') : 'DeibidSE' }}
						</span>
						<span class="font-normal">
							• {{ playlistSongs.length }} {{ $t('song.plural') }}, {{ formattedDuration }}
						</span>
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
						aria-haspopup="true"
						class="flex items-center justify-center pb-2 text-3xl tracking-wider text-center transition cursor-pointer text-spotify-icon-light hover:text-white hover:scale-105"
					>
						...
					</button>
				</div>

				<!-- View mode switch -->
				<div
					class="flex items-center gap-2 transition cursor-pointer text-spotify-steel hover:text-white"
					@click="isListExpanded = !isListExpanded"
				>
					<span class="text-sm">{{ playerStore.isListCompact ? $t('view.compact') : $t('view.list') }}</span>
					<nuxt-icon name="list" />
					<ul
						v-show="isListExpanded"
						class="absolute z-10 w-40 p-1 overflow-hidden rounded shadow-lg right-4 top-20 bg-spotify-dusk-transition"
					>
						<li class="p-3 text-xs font-bold text-white/70">
							{{ $t('view.mode') }}
						</li>
						<li
							class="flex items-center gap-4 p-3 text-sm transition-colors duration-300 rounded-sm hover:bg-white/10"
							:class="{ 'text-spotify-electric-green': playerStore.isListCompact }"
							@click="playerStore.setCompactList(true)"
						>
							<nuxt-icon name="compact-list" />{{ $t('view.compact') }}
						</li>
						<li
							class="flex items-center gap-4 p-3 text-sm transition-colors duration-300 rounded-sm hover:bg-white/10"
							:class="{ 'text-spotify-electric-green': !playerStore.isListCompact }"
							@click="playerStore.setCompactList(false)"
						>
							<nuxt-icon name="list" />{{ $t('view.list') }}
						</li>
					</ul>
				</div>
			</div>

			<PlaylistTable
				v-if="playlist"
				:songs="playlistSongs"
				:playlist="playlist"
			/>
		</div>
		<!-- Gradient -->
		<div
			class="absolute inset-0 -z-[1]"
			:style="`background-image: linear-gradient(to top, rgb(24, 24, 27), rgba(24, 24, 27, 0.8), ${playlist?.color})`"
		/>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { playlists, songs } from '@/lib/data'

const isListExpanded = ref(false)
const playerStore = usePlayerStore()
const route = useRoute()

const id = computed(() => route.params.id)
const playlist = computed(() => playlists.find(p => p?.id === id.value))
const playlistSongs = computed(() =>
	songs.filter(song => song.albumId === playlist.value?.id),
)

function durationInSeconds(duration: string): number {
	const parts = duration.split(':').map(Number)
	if (parts.length === 2) return parts[0] * 60 + parts[1]
	if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
	return 0
}

function formatDuration(totalSeconds: number): string {
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	return hours > 0 ? `${hours} h` : `${minutes} min`
}

const totalDurationInSeconds = computed(() =>
	playlistSongs.value.reduce((total, song) => total + durationInSeconds(song.duration), 0),
)
const formattedDuration = computed(() => formatDuration(totalDurationInSeconds.value))

// Scroll state
const scrolled = ref(false)

const onScroll = (e: Event) => {
	const el = e.target as HTMLElement
	scrolled.value = el.scrollTop > 300
}
</script>
