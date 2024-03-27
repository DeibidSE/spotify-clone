import { defineStore } from 'pinia'
import { type Song, type Playlist } from '@/lib/types.d'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    isPlaying: false,
    currentMusic: {
      playlist: {} as Playlist,
      song: {} as Song,
      songs: [] as Song[]
    },
    volume: 1,
    isListCompact: false
  }),
  actions: {
    setVolume (newVolume: number) {
      this.volume = newVolume
    },
    setIsPlaying (isPlaying: boolean) {
      this.isPlaying = isPlaying
    },
    setCurrentMusic (newCurrentMusic: any) {
      this.currentMusic = newCurrentMusic
    },
    setCompactList (isCompact: boolean) {
      this.isListCompact = isCompact
    }
  },
  persist: true
})
