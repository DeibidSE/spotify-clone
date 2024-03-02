import { allPlaylists, songs as allSongs } from '@/lib/data'

export default defineEventHandler((event) => {
  try {
    const urlObject = new URL(getRequestURL(event))
    const id = Number(urlObject.searchParams.get('id'))

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'ID not provided' })
    }

    const playlist = allPlaylists.find(playlist => playlist.id === id)

    if (!playlist) {
      throw createError({ statusCode: 400, statusMessage: 'Playlist not found' })
    }

    const songs = allSongs.filter(song => song.albumId === playlist.albumId)

    if (!playlist || !songs.length) {
      throw new Error('Invalid data or no songs found')
    }

    return new Response(JSON.stringify({ playlist, songs }), {
      headers: { 'content-type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 404,
      headers: { 'content-type': 'application/json' }
    })
  }
})
