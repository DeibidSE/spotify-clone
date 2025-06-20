<template>
	<NuxtLayout>
		<div class="flex flex-col gap-6 px-6 py-4">
			<div class="flex gap-2">
				<OthersPillFilter
					v-for="(pill, key) in pills"
					:key="key"
					:filter-text="pill"
					:is-selected="pill === selectedFilter"
					aria-label="Filter by {{ pill }}"
					@select="selectedFilter = (selectedFilter === pill ? t('common.all') : pill)"
				/>
			</div>

			<div class="flex flex-wrap gap-4">
				<CardsPlaylistCard
					v-for="(playlist, key) in filteredPlaylists.slice(0, 6)"
					:key="'mini-' + key"
					:playlist="playlist"
					variant="mini"
					@hover="setHoveredColor(playlist.color || '#1DB954')"
					@leave="clearHoveredColor"
				/>
			</div>

			<h1 class="text-3xl font-bold">
				{{ $t('playlist.for_you') }}
			</h1>

			<div class="flex flex-wrap gap-4">
				<CardsPlaylistCard
					v-for="(playlist, key) in filteredPlaylists"
					:key="'base-' + key"
					:playlist="playlist"
					@hover="setHoveredColor(playlist.color || '#1DB954')"
					@leave="clearHoveredColor"
				/>
			</div>
		</div>

		<!-- Base gradient -->
		<div class="absolute inset-0 -z-20 bg-gradient-to-t from-spotify-obsidian via-spotify-obsidian/80 to-spotify-electric-green/80" />
		<!-- Dynamic hover gradient -->
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

const { t } = useI18n()

const selectedFilter = ref<string>(t('common.all'))
const hoveredColor = ref<string | null>(null)

const pills = computed(() => [t('common.all'), t('music.title'), t('podcast.plural')])
const filteredPlaylists = computed(() => {
	if (selectedFilter.value === t('common.all')) {
		return playlists
	}
	if (selectedFilter.value === t('music.title')) {
		return playlists.filter(p => p.type === 'music')
	}
	if (selectedFilter.value === t('podcast.plural')) {
		return playlists.filter(p => p.type === 'podcast')
	}
	return playlists
})

function setHoveredColor(color: string) {
	hoveredColor.value = color
}

function clearHoveredColor() {
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
