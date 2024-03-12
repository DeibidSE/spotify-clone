export interface Playlist {
  id: number
  title: string
  color: string
  cover: string
  artists: string[]
}

export interface Song {
  id: number
  albumId: number
  title: string
  image: string
  artists: string[]
  album: string
  duration: string
}
