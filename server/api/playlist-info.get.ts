import { playlists, songs } from '@/lib/data'

export default defineEventHandler((event) => {
	try {
		const urlObject = new URL(getRequestURL(event))
		const id = urlObject.searchParams.get('id')

		if (!id) {
			throw createError({ statusCode: 400, statusMessage: 'ID not provided' })
		}

		const playlist = playlists.find(playlist => playlist.id === id)

		if (!playlist) {
			return new Response(JSON.stringify({ error: 'Playlist not found' }), {
				status: 404,
				headers: { 'content-type': 'application/json' },
			})
		}

		const allSongs = songs.filter(song => song.albumId === playlist.id)

		if (allSongs.length === 0) {
			return new Response(JSON.stringify({ playlist, songs: [] }), {
				headers: { 'content-type': 'application/json' },
			})
		}

		return new Response(JSON.stringify({ playlist, songs: allSongs }), {
			headers: { 'content-type': 'application/json' },
		})
	} catch (error: any) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'content-type': 'application/json' },
		})
	}
})
