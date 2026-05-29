<template>
	<nav class="relative flex flex-col h-full group">
		<div class="flex flex-col w-full h-full overflow-hidden rounded-lg bg-spotify-obsidian">
			<!-- Header (fixed) -->
			<header
				class="flex items-center flex-none gap-2 px-4 pt-3 pb-2"
				:class="playerStore.isGridCollapsed ? 'flex-col' : 'justify-between'"
			>
				<button
					class="flex items-center gap-3 font-bold transition-colors text-spotify-steel hover:text-white"
					:aria-label="$t('library.collapse')"
					@click="toggleCollapse"
				>
					<Icon
						:name="playerStore.isGridCollapsed ? 'my-icon:compact-library' : 'my-icon:library'"
						class="flex-none text-2xl"
						aria-hidden="true"
					/>
					<span
						v-if="!playerStore.isGridCollapsed"
						class="text-white"
					>
						{{ $t('library.title') }}
					</span>
				</button>

				<div
					class="flex items-center gap-1"
					:class="{ 'flex-col': playerStore.isGridCollapsed }"
				>
					<button
						v-if="playerStore.isGridCollapsed"
						class="p-2 text-2xl font-thin leading-4 transition-colors rounded-full bg-spotify-midnight hover:bg-spotify-shadow hover:text-white"
						:aria-label="$t('playlist.create_playlist')"
						@click="createPlaylist"
					>
						+
					</button>
					<button
						v-else
						class="flex items-center gap-2 px-3 py-2 text-sm font-bold transition-colors rounded-full bg-spotify-midnight text-spotify-steel hover:bg-spotify-shadow hover:text-white hover:scale-105"
						:aria-label="$t('playlist.create_playlist')"
						@click="createPlaylist"
					>
						<span class="text-xl leading-4">+</span>
						<span>{{ $t('playlist.create') }}</span>
					</button>

					<button
						v-if="!playerStore.isGridCollapsed"
						class="p-2 transition-colors rounded-full text-spotify-steel hover:text-white hover:bg-spotify-midnight"
						:aria-label="isExpanded ? $t('library.reduce') : $t('library.expand')"
						@click="toggleExpand"
					>
						<Icon :name="isExpanded ? 'my-icon:reduce' : 'my-icon:expand'" />
					</button>
				</div>
			</header>

			<!-- Filter pills (fixed) -->
			<div
				v-if="!playerStore.isGridCollapsed"
				class="flex items-center flex-none gap-2 px-2 pb-1"
			>
				<button
					v-if="library.filter !== 'all'"
					class="flex-none p-1.5 transition-colors rounded-full text-spotify-steel bg-spotify-snow hover:text-white"
					:aria-label="$t('library.clear_filter')"
					@click="library.setFilter(library.filter)"
				>
					<Icon name="my-icon:close" />
				</button>
				<div class="flex flex-wrap gap-2">
					<CommonPillFilter
						v-for="f in visibleFilters"
						:key="f.key"
						:filter-text="f.label"
						:is-selected="library.filter === f.key"
						@select="library.setFilter(f.key)"
					/>
				</div>
			</div>

			<!-- Search + sort (fixed) -->
			<SidebarLibraryToolbar
				v-if="!playerStore.isGridCollapsed"
				class="flex-none py-1"
			/>

			<!-- Scrollable list (the ONLY scroll container) -->
			<div class="flex-1 px-2 pb-2 overflow-x-hidden overflow-y-auto sidebar-scroll">
				<ul>
					<li
						v-for="item in library.visibleItems"
						:key="item.id"
					>
						<SidebarPlaylistRow
							:item="item"
							:collapsed="playerStore.isGridCollapsed"
							:active="activeId === item.id"
							:is-current="currentPlaylistId === item.id"
							:is-playing="playerStore.isPlaying"
							:editing="editingId === item.id"
							@rename="onRename(item.id, $event)"
							@cancel-edit="editingId = null"
							@contextmenu="openContext(item, $event)"
						/>
					</li>
				</ul>

				<!-- Empty state for in-library search -->
				<div
					v-if="!library.hasResults"
					class="px-3 py-6 text-sm text-spotify-steel"
				>
					<template v-if="library.query">
						<p class="font-bold text-white">
							{{ $t('library.no_results_title') }} "{{ library.query }}"
						</p>
						<p class="mt-1">
							{{ $t('search.no_results_advice') }}
						</p>
					</template>
					<p v-else>
						{{ $t('library.empty') }}
					</p>
				</div>
			</div>
		</div>

		<!-- Resize handle -->
		<div
			v-if="!playerStore.isGridCollapsed"
			class="absolute top-0 right-0 z-20 w-1 h-full cursor-col-resize hover:bg-white/20"
			:class="{ 'bg-white/20': library.isResizing }"
			aria-hidden="true"
			@mousedown.prevent="startResize"
		/>

		<!-- Context menu -->
		<SidebarContextMenu
			v-if="contextItem"
			:item="contextItem"
			:x="contextPos.x"
			:y="contextPos.y"
			@pin="onPin"
			@rename="onStartRename"
			@remove="onRemove"
			@close="contextItem = null"
		/>

		<!-- Delete confirmation -->
		<CommonConfirmDialog
			v-if="pendingDelete"
			:title="$t('library.delete_confirm_title')"
			:body="$t('library.delete_confirm_body', { name: pendingDelete.title })"
			:confirm-label="$t('library.delete')"
			@confirm="confirmDelete"
			@cancel="pendingDelete = null"
		/>
	</nav>
</template>

<script setup lang="ts">
import type { LibraryFilter, LibraryItem } from '@/lib/types.d'

const playerStore = usePlayerStore()
const library = useLibraryStore()
const route = useRoute()
const { t } = useI18n()

const editingId = ref<string | null>(null)
const contextItem = ref<LibraryItem | null>(null)
const contextPos = reactive({ x: 0, y: 0 })

const filterDefs = computed<{ key: LibraryFilter, label: string }[]>(() => [
	{ key: 'playlists', label: t('library.filter.playlists') },
	{ key: 'artists', label: t('artist.plural') },
	{ key: 'albums', label: t('album.plural') },
])

// When a filter is active, hide the others and show just the active one.
const visibleFilters = computed(() =>
	library.filter === 'all'
		? filterDefs.value
		: filterDefs.value.filter(f => f.key === library.filter),
)

const activeId = computed(() =>
	route.path.startsWith('/playlist/') ? String(route.params.id) : null,
)
const currentPlaylistId = computed(() => playerStore.currentMusic?.playlist?.id)

const DEFAULT_WIDTH = 350
const EXPANDED_WIDTH = 540
const MAX_WIDTH = 600

const toggleCollapse = () => playerStore.setGridCollapsed(!playerStore.isGridCollapsed)

// "Expand" widens the library panel (it does not collapse it).
const isExpanded = computed(() => library.sidebarWidth >= EXPANDED_WIDTH)
const toggleExpand = () => {
	playerStore.setGridCollapsed(false)
	library.setSidebarWidth(isExpanded.value ? DEFAULT_WIDTH : EXPANDED_WIDTH)
}

const createPlaylist = () => {
	library.setFilter('all')
	library.toggleSearch(false)
	const id = library.createPlaylist()
	editingId.value = id
}

const onRename = (id: string, title: string) => {
	library.renamePlaylist(id, title)
	editingId.value = null
}

const openContext = (item: LibraryItem, event: MouseEvent) => {
	contextItem.value = item
	contextPos.x = event.clientX
	contextPos.y = event.clientY
}

const onPin = () => {
	if (contextItem.value) library.togglePin(contextItem.value.id)
	contextItem.value = null
}

const onStartRename = () => {
	if (contextItem.value) editingId.value = contextItem.value.id
	contextItem.value = null
}

const pendingDelete = ref<LibraryItem | null>(null)

const onRemove = () => {
	const item = contextItem.value
	contextItem.value = null
	if (!item) return
	// User-created playlists are destructive to delete → ask for confirmation,
	// like Spotify. Saved albums/artists are removed silently.
	if (item.isUserCreated) {
		pendingDelete.value = item
	} else {
		library.removeItem(item.id)
	}
}

const confirmDelete = async () => {
	const item = pendingDelete.value
	pendingDelete.value = null
	if (!item) return
	library.removeItem(item.id)
	// If we were viewing the playlist we just deleted, leave its (now empty) page.
	if (route.path === `/playlist/${item.id}`) await navigateTo('/')
}

// Mark a playlist as recently played so the "Recents" sort reflects it.
watch(currentPlaylistId, id => library.markPlayed(id))

// --- Resize ---
const startResize = (event: MouseEvent) => {
	library.setResizing(true)
	const startX = event.clientX
	const startWidth = library.sidebarWidth
	document.body.style.userSelect = 'none'

	const onMove = (e: MouseEvent) => {
		const width = startWidth + (e.clientX - startX)
		if (width < 200) {
			playerStore.setGridCollapsed(true)
			stop()
		} else {
			playerStore.setGridCollapsed(false)
			library.setSidebarWidth(Math.min(width, MAX_WIDTH))
		}
	}
	const stop = () => {
		library.setResizing(false)
		document.body.style.userSelect = ''
		document.removeEventListener('mousemove', onMove)
		document.removeEventListener('mouseup', stop)
	}
	document.addEventListener('mousemove', onMove)
	document.addEventListener('mouseup', stop)
}
</script>

<style scoped>
.sidebar-scroll {
	scrollbar-width: thin;
	scrollbar-color: transparent transparent;
}
.sidebar-scroll:hover {
	scrollbar-color: #4d4d4d transparent;
}
.sidebar-scroll::-webkit-scrollbar {
	width: 12px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
	background-color: transparent;
	border: 3px solid transparent;
	background-clip: content-box;
	border-radius: 8px;
}
.sidebar-scroll:hover::-webkit-scrollbar-thumb {
	background-color: #4d4d4d;
}
</style>
