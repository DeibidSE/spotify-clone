<template>
	<NuxtLayout>
		<div class="flex flex-col gap-6 px-6 py-4 overflow-x-hidden">
			<!-- Pills Filter -->
			<div class="flex gap-2">
				<OthersPillFilter
					v-for="pill in pills"
					:key="pill"
					:filter-text="pill"
					:is-selected="pill === selectedFilter"
					aria-label="Filter by {{ pill }}"
					@select="toggleFilter(pill)"
				/>
			</div>

			<!-- Recently played Playlists -->
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				<CardsPlaylistCard
					v-for="(playlist, index) in filteredPlaylists.saved"
					:key="'mini-' + index"
					:playlist="playlist"
					variant="mini"
					@hover="setHoveredColor(playlist.color || '#1DB954')"
					@leave="clearHoveredColor"
				/>
			</div>

			<h1 class="text-3xl font-bold">
				{{ $t('playlist.for_you') }}
			</h1>

			<!-- Recommended Playlists -->
			<div class="flex flex-wrap gap-4">
				<CardsPlaylistCard
					v-for="(playlist, index) in filteredPlaylists.recommended"
					:key="'base-' + index"
					:playlist="playlist"
					@hover="setHoveredColor(playlist.color || '#1DB954')"
					@leave="clearHoveredColor"
				/>
			</div>
		</div>

		<!-- Gradients -->
		<div class="absolute inset-0 -z-20 bg-gradient-to-t from-spotify-obsidian via-spotify-obsidian/80 to-spotify-electric-green/80" />
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
import type { Playlist } from '@/lib/types'

const { t } = useI18n()

const ALL = t('common.all')
const MUSIC = t('music.title')
const PODCAST = t('podcast.plural')

const selectedFilter = ref<string>(ALL)
const hoveredColor = ref<string | null>(null)

const pills = computed(() => [ALL, MUSIC, PODCAST])

const allPlaylists = computed(() => ({
	saved: playlists.filter(p => p.saved && p.type !== 'artist'),
	recommended: playlists.filter(p => !p.saved),
}))

const filterByType = (items: Playlist[], type: string) => {
	switch (type) {
		case MUSIC:
			return items.filter(p => p.type === 'music')
		case PODCAST:
			return items.filter(p => p.type === 'podcast')
		default:
			return items
	}
}

const filteredPlaylists = computed(() => ({
	saved: filterByType(allPlaylists.value.saved, selectedFilter.value),
	recommended: filterByType(allPlaylists.value.recommended, selectedFilter.value),
}))

const toggleFilter = (pill: string) => {
	selectedFilter.value = selectedFilter.value === pill ? ALL : pill
}

const setHoveredColor = (color: string) => {
	hoveredColor.value = color
}

const clearHoveredColor = () => {
	hoveredColor.value = null
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
