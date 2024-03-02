import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    isPlaying: false,
    currentMusic: {
      playlist: null,
      song: null,
      songs: []
    },
    volume: 1
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
    }
  }
})
