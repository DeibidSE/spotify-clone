import { defineStore } from 'pinia'
import { type Music } from '@/lib/types.d'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    isPlaying: false, // Indicates if the player is currently playing
    currentMusic: {} as Music, // Stores information about the currently playing music
    volume: 1, // Stores the current volume level
    isListCompact: false, // Indicates if the playlist is displayed in a compact mode
    shuffleEnabled: false, // Indicates if shuffle mode is enabled
    currentLocale: 'es' // Default language set to Spanish
  }),
  actions: {
    /**
     * Set the new volume
     * @param newVolume
     */
    setVolume (newVolume: number) {
      this.volume = newVolume
    },
    /**
     * Set the state of the music player
     * @param isPlaying
     */
    setIsPlaying (isPlaying: boolean) {
      this.isPlaying = isPlaying
    },
    /**
     * Sets the new music to be played
     * @param newCurrentMusic
     */
    setCurrentMusic (newCurrentMusic: Music) {
      // Checks if the shuffle is active to mix the songs of the playlist
      if (
        this.shuffleEnabled &&
        this.currentMusic?.playlist?.id !== newCurrentMusic?.playlist?.id &&
        this.currentMusic?.song?.title !== newCurrentMusic?.song?.title
      ) {
        newCurrentMusic = this.shuffleSongs(newCurrentMusic)
      }

      this.currentMusic = { ...newCurrentMusic }
    },
    /**
     * Set the state of how show the table
     * @param isCompact
     */
    setCompactList (isCompact: boolean) {
      this.isListCompact = isCompact
    },
    /**
     * Mixes the list of songs randomly reorganizing the order
     * @param songs
     * @returns
     */
    shuffleSongs (newCurrentMusic: Music) {
      const { songs, playlist } = newCurrentMusic

      for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[songs[i], songs[j]] = [songs[j], songs[i]]
      }

      return { songs, playlist, song: songs[0] }
    },
    setLocale (locale: string) {
      this.currentLocale = locale
    }
  },
  persist: true // Indicates that the state should be persisted
})
