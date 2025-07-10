export interface Playlist {
	id: string
	title: string
	color: string
	cover?: string
	artists: string[]
	genre: string
	type: 'music' | 'podcast'
	saved: boolean
	isAlbum: boolean
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
