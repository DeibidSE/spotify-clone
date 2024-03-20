export interface Playlist {
  id: string
  title: string
  color: string
  cover: string
  artists: string[]
  genre: string
}

export interface Song {
  id: number
  albumId: string
  title: string
  image: string
  artists: string[]
  duration: string
}
