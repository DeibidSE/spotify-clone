export interface Color {
  accent: string
  dark: string
}

export interface Colors {
  [key: string]: Color
}

export interface Playlist {
  id: number
  title: string
  color: Color
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
