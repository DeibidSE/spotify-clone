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
      throw createError({
        statusCode: 400,
        statusMessage: 'Playlist not found'
      })
    }

    const allSongs = songs.filter(song => song.albumId === playlist.id)

    if (!playlist || !songs.length) {
      throw new Error('Invalid data or no songs found')
    }

    return new Response(JSON.stringify({ playlist, songs: allSongs }), {
      headers: { 'content-type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 404,
      headers: { 'content-type': 'application/json' }
    })
  }
})
