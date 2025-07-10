import { defineStore } from 'pinia'
import { usePlayerStore } from '@/stores/playerStore'

function parseDuration(duration: string): number {
	const [min, sec] = duration.split(':').map(Number)
	return (min ?? 0) * 60 + (sec ?? 0)
}

export const useSimulatedPlayerStore = defineStore('simulatedPlayer', () => {
	const playerStore = usePlayerStore()
	const interval = ref<NodeJS.Timeout | null>(null)

	const duration = computed(() => {
		const song = playerStore.currentMusic?.song
		return song ? parseDuration(song.duration) : 0
	})

	const currentTime = computed(() => playerStore.currentTime ?? 0)
	const volume = computed(() => playerStore.volume)

	const clear = () => {
		if (interval.value) {
			clearInterval(interval.value)
			interval.value = null
		}
	}

	const updateCurrentTime = () => {
		if (playerStore.currentTime == null) playerStore.currentTime = 0
		if (playerStore.currentTime < duration.value) {
			playerStore.currentTime += 1
		} else {
			next()
		}
	}

	const play = () => {
		if (!playerStore.currentMusic?.song) return
		playerStore.setIsPlaying(true)

		clear()

		interval.value = setInterval(() => {
			if (playerStore.isPlaying) {
				updateCurrentTime()
			}
		}, 1000)
	}

	const pause = () => {
		playerStore.setIsPlaying(false)
		clear()
	}

	const seek = (time: number) => {
		playerStore.currentTime = Math.max(0, Math.min(time, duration.value))
	}

	const setSongByIndex = (index: number) => {
		const { playlist, songs } = playerStore.currentMusic ?? {}
		if (!songs || !playlist) return
		playerStore.setCurrentMusic({
			songs,
			playlist,
			song: songs[index],
		})
		playerStore.currentTime = 0
	}

	const next = () => {
		const songs = playerStore.currentMusic?.songs
		const currentId = playerStore.currentMusic?.song?.id
		if (!songs || !currentId) return
		const nextIndex = (songs.findIndex(s => s.id === currentId) + 1) % songs.length
		setSongByIndex(nextIndex)
	}

	const prev = () => {
		const songs = playerStore.currentMusic?.songs
		const currentId = playerStore.currentMusic?.song?.id
		if (!songs || !currentId) return
		const currentIndex = songs.findIndex(s => s.id === currentId)
		const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0
		setSongByIndex(prevIndex)
	}

	watch(() => playerStore.currentMusic?.song, () => {
		playerStore.currentTime = 0
	})

	watch(() => playerStore.isPlaying, (isPlaying) => {
		if (isPlaying) {
			play()
		} else {
			pause()
		}
	})

	onBeforeUnmount(() => {
		clear()
	})

	onUnmounted(() => {
		clear()
	})

	return {
		currentTime,
		duration,
		isPlaying: playerStore.isPlaying,
		next,
		pause,
		play,
		prev,
		seek,
		setVolume: playerStore.setVolume,
		volume,
	}
})
