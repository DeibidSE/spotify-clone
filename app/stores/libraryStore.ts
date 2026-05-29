import { defineStore } from 'pinia'
import { playlists } from '@/lib/data'
import type { LibraryFilter, LibraryItem, LibrarySort } from '@/lib/types.d'

/** Owner label shown in subtitles / used by the "Creator" sort. */
const DEFAULT_OWNER = 'DeibidSE'

/**
 * Builds the initial library from the static seed data. Only `saved` playlists
 * are part of the user's library, matching the previous sidebar behaviour.
 * `addedAt` is derived from the seed order so the ordering is deterministic
 * (no Date.now() at module load, which would change on every reload).
 */
function seedItems(): LibraryItem[] {
	return playlists
		.filter(p => p.saved)
		.map((p, index) => ({
			...p,
			pinned: false,
			addedAt: index,
			lastPlayedAt: null,
			isUserCreated: false,
		}))
}

/** Human-readable creator/owner for an item (used by subtitle + sort). */
export function itemCreator(item: LibraryItem): string {
	if (item.type === 'artist') return item.title
	if (item.isUserCreated) return 'You'
	return DEFAULT_OWNER
}

export const useLibraryStore = defineStore('library', {
	state: () => ({
		items: seedItems() as LibraryItem[],
		filter: 'all' as LibraryFilter,
		sort: 'recents' as LibrarySort,
		query: '',
		searchOpen: false,
		sidebarWidth: 350,
		isResizing: false,
	}),
	getters: {
		/** Items after filter-pill + text-search + sort, with pinned ones first. */
		visibleItems(state): LibraryItem[] {
			let result = [...state.items]

			// Filter pill
			if (state.filter === 'playlists') {
				result = result.filter(i => i.type === 'music' && !i.isAlbum)
			} else if (state.filter === 'artists') {
				result = result.filter(i => i.type === 'artist')
			} else if (state.filter === 'albums') {
				result = result.filter(i => i.type === 'music' && i.isAlbum)
			}

			// Text search inside the library
			const q = state.query.trim().toLowerCase()
			if (q) {
				result = result.filter(i =>
					i.title.toLowerCase().includes(q)
					|| itemCreator(i).toLowerCase().includes(q),
				)
			}

			// Sort
			const bySort = (a: LibraryItem, b: LibraryItem) => {
				switch (state.sort) {
					case 'alphabetical':
						return a.title.localeCompare(b.title)
					case 'creator':
						return itemCreator(a).localeCompare(itemCreator(b))
					case 'recently_added':
						return b.addedAt - a.addedAt
					case 'recents':
					default:
						return (b.lastPlayedAt ?? b.addedAt) - (a.lastPlayedAt ?? a.addedAt)
				}
			}

			// Pinned always float to the top, then the chosen sort applies.
			return result.sort((a, b) => {
				if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
				return bySort(a, b)
			})
		},
		hasResults(): boolean {
			return this.visibleItems.length > 0
		},
	},
	actions: {
		setFilter(filter: LibraryFilter) {
			// Clicking the active pill clears it back to "all".
			this.filter = this.filter === filter ? 'all' : filter
		},
		setSort(sort: LibrarySort) {
			this.sort = sort
		},
		setQuery(query: string) {
			this.query = query
		},
		toggleSearch(open?: boolean) {
			this.searchOpen = open ?? !this.searchOpen
			if (!this.searchOpen) this.query = ''
		},
		setSidebarWidth(width: number) {
			this.sidebarWidth = Math.round(width)
		},
		setResizing(value: boolean) {
			this.isResizing = value
		},
		/** Creates a new empty user playlist and returns its id. */
		createPlaylist(): string {
			const existing = this.items.filter(i => i.isUserCreated).length
			const id = `user_playlist_${Date.now()}`
			const item: LibraryItem = {
				id,
				title: existing === 0 ? 'My Playlist' : `My Playlist #${existing + 1}`,
				color: '#535353',
				genre: '',
				type: 'music',
				isAlbum: false,
				saved: true,
				public: false,
				pinned: false,
				addedAt: Date.now(),
				lastPlayedAt: null,
				isUserCreated: true,
			}
			this.items.unshift(item)
			return id
		},
		renamePlaylist(id: string, title: string) {
			const item = this.items.find(i => i.id === id)
			if (item && title.trim()) item.title = title.trim()
		},
		/** Updates the editable "details" of a user playlist (name, description, cover). */
		updateDetails(id: string, details: { title?: string, description?: string, cover?: string }) {
			const item = this.items.find(i => i.id === id)
			if (!item) return
			if (details.title !== undefined && details.title.trim()) item.title = details.title.trim()
			if (details.description !== undefined) item.description = details.description.trim()
			if (details.cover !== undefined) item.cover = details.cover.trim() || undefined
		},
		removeItem(id: string) {
			this.items = this.items.filter(i => i.id !== id)
		},
		togglePin(id: string) {
			const item = this.items.find(i => i.id === id)
			if (item) item.pinned = !item.pinned
		},
		/** Marks an item as just played so the "Recents" sort reflects it. */
		markPlayed(id: string | undefined) {
			if (!id) return
			const item = this.items.find(i => i.id === id)
			if (item) item.lastPlayedAt = Date.now()
		},
	},
	persist: {
		pick: ['items', 'filter', 'sort', 'sidebarWidth'],
	},
})
