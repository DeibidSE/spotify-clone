<template>
	<header class="flex flex-row gap-8 py-6 transition-all duration-300">
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

		<div class="flex flex-col items-start justify-end w-full truncate">
			<h2 class="flex w-full text-sm transition-all duration-300">
				{{ playlist?.public ? $t('playlist.public.title') : $t('playlist.title') }}
			</h2>
			<h1 class="w-full py-2 font-extrabold text-white transition-all duration-300 whitespace-nowrap text-balance text-8xl">
				{{ playlist?.title }}
			</h1>
			<div
				v-if="playlist"
				class="flex flex-col w-full gap-1 text-sm font-normal text-white"
			>
				<p
					v-if="playlist.description"
					class="w-full text-sm truncate text-spotify-steel"
				>
					{{ playlist.description }}
				</p>
				<span class="w-1/2 font-bold truncate">
					{{ artists }}
				</span>
				<div class="flex items-center justify-start gap-2">
					<Icon
						name="my-icon:logo"
						class="text-2xl text-spotify-lime-pop"
					/>
					<span>{{ $t('song.made_for_you') }} • {{ playlistSongs.length }} {{ $t('song.plural') }}, {{ formattedDuration }}</span>
				</div>
			</div>
		</div>
	</header>

	<div
		v-if="playlist"
		class="relative flex flex-col w-full gap-5 py-6"
	>
		<div class="flex items-center justify-between w-full">
			<div class="flex items-center gap-6">
				<ControlsPlayPauseButton :id="id" />
				<ControlsShuffleButton class="text-3xl" />

				<CommonToolTip
					:tooltip-text="$t('playlist.download')"
					position="top"
				>
					<button
						:aria-label="$t('playlist.download')"
						disabled
						class="flex items-center justify-center text-3xl cursor-not-allowed text-spotify-icon-light opacity-60"
					>
						<Icon name="my-icon:download" />
					</button>
				</CommonToolTip>

				<CommonToolTip
					:tooltip-text="$t('playlist.menu.invite_collaborators')"
					position="top"
				>
					<button
						:aria-label="$t('playlist.menu.invite_collaborators')"
						disabled
						class="flex items-center justify-center text-3xl cursor-not-allowed text-spotify-icon-light opacity-60"
					>
						<Icon name="my-icon:user-add" />
					</button>
				</CommonToolTip>

				<div
					v-if="hasMenu"
					ref="moreRef"
					class="relative"
				>
					<button
						:aria-label="$t('playlist.more_options', { name: playlist?.title })"
						:aria-expanded="isMoreOpen"
						class="flex items-center justify-center text-3xl transition cursor-pointer text-spotify-icon-light hover:text-white hover:scale-105"
						@click="isMoreOpen = !isMoreOpen"
					>
						<Icon name="my-icon:more" />
					</button>
					<ul
						v-show="isMoreOpen"
						class="absolute left-0 z-20 p-1 mt-2 rounded-md shadow-lg w-64 bg-spotify-dusk-transition"
						role="menu"
					>
						<li
							v-for="option in menuOptions"
							:key="option.key"
						>
							<hr
								v-if="option.divider"
								class="mx-2 my-1 border-white/10"
							>
							<button
								class="flex items-center w-full gap-3 px-3 py-2 text-sm transition-colors rounded-sm"
								:class="option.disabled
									? 'text-white/40 cursor-not-allowed'
									: 'text-white/90 hover:bg-white/10'"
								:disabled="option.disabled"
								role="menuitem"
								@click="onMenuOption(option)"
							>
								<Icon :name="`my-icon:${option.icon}`" />
								{{ option.label }}
							</button>
						</li>
					</ul>
				</div>
				<button
					v-else
					aria-label="More options"
					class="flex items-center justify-center text-3xl cursor-not-allowed text-spotify-icon-light opacity-60"
				>
					<Icon name="my-icon:more" />
				</button>
			</div>

			<div class="flex items-center gap-4">
				<div
					ref="searchRef"
					class="relative flex items-center"
				>
					<div
						v-if="searchOpen"
						class="flex items-center gap-2 px-3 py-2 rounded-md bg-spotify-shadow"
					>
						<Icon
							name="my-icon:search"
							class="flex-none text-base text-spotify-steel"
							aria-hidden="true"
						/>
						<input
							ref="searchInput"
							v-model="searchQuery"
							type="search"
							:placeholder="$t('playlist.search_placeholder')"
							:aria-label="$t('playlist.search_placeholder')"
							class="text-sm text-white bg-transparent outline-none w-44 placeholder-spotify-steel"
							@keydown.esc="closeSearch"
						>
					</div>
					<button
						v-else
						class="p-1 transition-colors rounded-full text-spotify-steel hover:text-white hover:scale-105"
						:aria-label="$t('playlist.search_placeholder')"
						@click.stop="openSearch"
					>
						<Icon name="my-icon:search" />
					</button>
				</div>

				<div
					class="flex items-center gap-2 transition cursor-pointer text-spotify-steel hover:text-white"
					@click="toggleListView"
				>
					<span class="text-sm">{{ viewModeLabel }}</span>
					<Icon name="my-icon:list" />
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
							<Icon :name="`my-icon:${option.icon}`" />
							{{ option.label }}
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div
			v-if="isUserPlaylist"
			class="flex items-center gap-2"
		>
			<button
				disabled
				class="flex items-center gap-2 px-4 py-2 text-sm font-bold transition rounded-full cursor-not-allowed text-white/50 bg-white/5"
			>
				<Icon name="my-icon:add" />
				{{ $t('playlist.toolbar.add') }}
			</button>
			<button
				disabled
				class="flex items-center gap-2 px-4 py-2 text-sm font-bold transition rounded-full cursor-not-allowed text-white/50 bg-white/5"
			>
				<Icon name="my-icon:mix" />
				{{ $t('playlist.toolbar.mix') }}
			</button>
			<button
				class="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition rounded-full bg-white/10 hover:bg-white/20 hover:scale-105"
				@click="openEdit"
			>
				<Icon name="my-icon:edit" />
				{{ $t('playlist.toolbar.edit') }}
			</button>
		</div>
	</div>

	<PlaylistTable
		v-if="playlist"
		:songs="displayedSongs"
		:playlist="playlist"
	/>

	<CommonConfirmDialog
		v-if="pendingDelete"
		:title="$t('library.delete_confirm_title')"
		:body="$t('library.delete_confirm_body', { name: playlist?.title })"
		:confirm-label="$t('library.delete')"
		@confirm="confirmDelete"
		@cancel="pendingDelete = false"
	/>

	<CommonEditDetailsDialog
		v-if="isEditing && playlist"
		:playlist="playlist"
		@save="onEditSave"
		@cancel="isEditing = false"
	/>
</template>

<script setup lang="ts">
import type { Playlist, Song } from '~/types'

interface MenuOption {
	key: string
	icon: string
	label: string
	disabled?: boolean
	divider?: boolean
	action?: () => void
}

const props = defineProps<{ songs: Song[], playlists: Playlist[] }>()

const { t } = useI18n()
const route = useRoute()
const playerStore = usePlayerStore()
const library = useLibraryStore()

const isListExpanded = ref(false)
const isMoreOpen = ref(false)
const moreRef = ref<HTMLElement | null>(null)
const pendingDelete = ref(false)
const isEditing = ref(false)

// In-playlist search (filters the song list).
const searchOpen = ref(false)
const searchQuery = ref('')
const searchRef = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)

const id = computed(() => route.params.id)
const playlist = computed(() => props.playlists.find((p: Playlist) => p?.id === id.value))

// "More options" menu: created playlists can be edited/deleted, saved ones removed.
const isUserPlaylist = computed(() => library.items.some(i => i.id === id.value && i.isUserCreated))
const isInLibrary = computed(() => library.items.some(i => i.id === id.value))
const hasMenu = computed(() => isUserPlaylist.value || isInLibrary.value)

const openEdit = () => {
	isMoreOpen.value = false
	isEditing.value = true
}

const onEditSave = (details: { title: string, description: string, cover: string }) => {
	library.updateDetails(String(id.value), details)
	isEditing.value = false
}

const askDelete = () => {
	isMoreOpen.value = false
	pendingDelete.value = true
}

const confirmDelete = async () => {
	pendingDelete.value = false
	library.removeItem(String(id.value))
	await navigateTo('/')
}

const removeFromLibrary = () => {
	isMoreOpen.value = false
	library.removeItem(String(id.value))
}

const menuOptions = computed<MenuOption[]>(() => {
	const options: MenuOption[] = [
		{ key: 'add_to_playlist', icon: 'add', label: t('playlist.menu.add_to_playlist'), disabled: true },
	]

	if (isUserPlaylist.value) {
		options.push(
			{ key: 'edit', icon: 'edit', label: t('playlist.menu.edit_details'), action: openEdit },
			{ key: 'create_similar', icon: 'list', label: t('playlist.menu.create_similar'), disabled: true },
			{ key: 'delete', icon: 'close', label: t('library.delete'), action: askDelete },
		)
	} else {
		options.push(
			{ key: 'remove', icon: 'close', label: t('library.remove'), action: removeFromLibrary },
		)
	}

	options.push(
		{ key: 'download', icon: 'download', label: t('playlist.menu.download'), disabled: true },
		{ key: 'share', icon: 'social', label: t('playlist.menu.share'), disabled: true, divider: true },
	)

	return options
})

const onMenuOption = (option: MenuOption) => {
	if (option.disabled) return
	option.action?.()
}

const openSearch = async () => {
	searchOpen.value = true
	await nextTick()
	searchInput.value?.focus()
}

const closeSearch = () => {
	searchOpen.value = false
	searchQuery.value = ''
}

const onClickOutside = (event: MouseEvent) => {
	const target = event.target as Node
	if (moreRef.value && !moreRef.value.contains(target)) {
		isMoreOpen.value = false
	}
	if (searchOpen.value && !searchQuery.value && searchRef.value && !searchRef.value.contains(target)) {
		searchOpen.value = false
	}
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))

const playlistSongs = computed(() => props.songs.filter((song: Song) => song.albumId === playlist.value?.id))
const displayedSongs = computed(() => {
	const q = searchQuery.value.trim().toLowerCase()
	if (!q) return playlistSongs.value
	return playlistSongs.value.filter(song =>
		song.title.toLowerCase().includes(q)
		|| song.artists.some(artist => artist.toLowerCase().includes(q)),
	)
})
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
