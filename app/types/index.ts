export interface Playlist {
	id: string
	title: string
	description?: string
	color: string
	cover?: string
	header?: string
	genre: string
	type: 'music' | 'podcast' | 'artist'
	saved: boolean
	isAlbum: boolean
	public: boolean
}

export interface Song {
	id: number
	albumId: string
	title: string
	image: string
	artists: string[]
	duration: string
	type: 'music' | 'podcast'
}

export interface Music {
	playlist: Playlist
	song: Song
	songs: Song[]
}

/** Active filter pill in the library sidebar. Stable keys (not translated text). */
export type LibraryFilter = 'all' | 'playlists' | 'artists' | 'albums'

/** "Sort by" options for the library list, mirroring Spotify Web. */
export type LibrarySort = 'recents' | 'recently_added' | 'alphabetical' | 'creator'

/** A playlist as stored in the (mutable, persisted) library, with extra metadata. */
export interface LibraryItem extends Playlist {
	pinned: boolean
	addedAt: number
	lastPlayedAt: number | null
	isUserCreated: boolean
}
