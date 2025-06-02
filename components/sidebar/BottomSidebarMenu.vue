<template>
	<header
		class="flex items-center px-4 py-1 text-spotify-steel"
		:class="playerStore.isGridCollapsed ? 'justify-center' : 'justify-between'"
	>
		<!-- Panel Left Button -->
		<div
			v-if="!playerStore.isGridCollapsed"
			class="relative flex items-center w-full font-bold transition duration-200 group hover:cursor-pointer"
			aria-label="Collapse Left Panel"
			@click="collapseLeftPanel"
		>
			<nuxt-icon
				name="library"
				class="absolute left-0 transition-all duration-200 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 hover:text-white"
				aria-hidden="true"
			/>
			<span class="pl-0 text-white truncate transition-all duration-200 group-hover:pl-6">
				{{ $t('library') }}
			</span>
		</div>

		<!-- Collapse/Expand Button when Grid is Collapsed -->
		<div
			v-if="playerStore.isGridCollapsed"
			class="flex flex-col items-center justify-center gap-2"
		>
			<nuxt-icon
				name="compact-library"
				class="px-1 py-2 text-2xl cursor-pointer hover:text-white"
				aria-label="Expand Grid"
				@click="collapseLeftPanel"
			/>
			<button
				class="p-2 text-3xl font-thin leading-4 transition-colors duration-200 rounded-full bg-spotify-midnight hover:bg-spotify-shadow"
				aria-label="Add New Playlist"
			>
				+
			</button>
		</div>

		<!-- Create Button and Expand Icon when Grid is Expanded -->
		<div
			v-if="!playerStore.isGridCollapsed"
			class="flex items-center gap-2"
		>
			<button
				class="flex items-center gap-2 px-4 py-2 font-thin transition-colors duration-200 rounded-full bg-spotify-midnight hover:bg-spotify-shadow"
				aria-label="Create New Playlist"
			>
				<span class="text-3xl leading-4">+</span>
				<span class="text-sm font-bold text-white">{{ $t('create') }}</span>
			</button>
			<nuxt-icon
				name="expand"
				class="p-2 transition rounded-full cursor-pointer hover:text-white hover:bg-spotify-midnight"
				aria-label="Expand Grid"
				@click="expandLeftPanel"
			/>
		</div>
	</header>

	<!-- Sidebar Filter Pills -->
	<div
		v-if="!playerStore.isGridCollapsed"
		class="flex flex-wrap w-full gap-3 p-2"
	>
		<SidebarPillFilter
			v-for="(filter, key) in filters"
			:key="key"
			:filter-text="filter"
			aria-label="Filter by {{ filter }}"
			@click="applyFilter(filter)"
		/>
	</div>

	<!-- Playlists -->
	<div class="h-full overflow-x-hidden overflow-y-auto">
		<NuxtLink
			v-for="(playlist, key) in playlists"
			:key="key"
			:to="`/playlist/${playlist.id}`"
			class="flex items-center gap-5 p-2 truncate transition rounded-md hover:bg-spotify-midnight"
			:class="{ 'text-spotify-electric-green': playlistPlaying === playlist.id }"
			aria-label="Go to Playlist: {{ playlist.title }}"
		>
			<!-- Playlist Image -->
			<picture class="flex-none w-12 h-12">
				<img
					:src="`${$config.public.BASE_URL}${playlist.cover}`"
					:alt="`Cover of ${playlist.title} by ${playlist.artists.join(', ')}`"
					class="object-cover w-full h-full rounded-md aspect-square"
				>
			</picture>

			<!-- Playlist Info -->
			<div
				v-if="!playerStore.isGridCollapsed"
				class="flex flex-col w-full truncate"
			>
				<h4 class="text-sm truncate">{{ playlist.title }}</h4>
				<span class="text-xs text-white/70 truncate">
					{{ playlist.artists.length > 0 ? playlist.artists.join(', ') : `${$t('playlist')} • DeibidSE` }}
				</span>
			</div>

			<!-- Playing Indicator -->
			<div
				v-if="playlistPlaying === playlist.id && playerStore.isPlaying"
				class="text-sm"
			>
				<nuxt-icon
					name="volume"
					aria-hidden="true"
				/>
			</div>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import { playlists } from '@/lib/data'

const playerStore = usePlayerStore()
const { t } = useI18n()
const filters = computed(() => [t('lists'), t('artists'), t('albums')])

const playlistPlaying = computed(() => playerStore.currentMusic?.playlist?.id)

const collapseLeftPanel = () => {
	playerStore.setGridCollapsed(!playerStore.isGridCollapsed)
}

const expandLeftPanel = () => {
	// TODO: Implement expand functionality
}

const applyFilter = (_filter: string) => {
	// TODO: Implement filter functionality
}
</script>
