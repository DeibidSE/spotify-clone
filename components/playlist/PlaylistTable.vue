<template>
	<table class="w-full text-left divide-y cursor-default divide-white/10 h-fit">
		<thead>
			<tr class="top-0 text-sm font-normal text-spotify-icon-light">
				<th class="px-4 py-2">
					#
				</th>
				<th class="px-4 py-2">
					<span class="hover:text-white">{{ $t('track.title') }}</span>
				</th>
				<th
					v-if="playerStore.isListCompact"
					class="px-4 py-2"
				>
					<span class="hover:text-white">{{ $t('artist.plural') }}</span>
				</th>
				<th class="px-4 py-2">
					<span class="hover:text-white">{{ $t('album.single') }}</span>
				</th>
				<th class="px-4 py-2">
					<ToolTip
						:tooltip-text="$t('track.duration')"
						position="top"
					>
						<nuxt-icon
							name="time"
							class="hover:text-white"
						/>
					</ToolTip>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr class="h-4" />
			<tr
				v-for="(song, index) in songs"
				:key="index"
				class="overflow-hidden text-sm font-light transition duration-300 text-white/70 border-spacing-0 hover:bg-white/10 group"
				@click="playSong(song)"
			>
				<td class="relative w-5 px-4 py-2 text-center rounded-tl-lg rounded-bl-lg">
					<nuxt-icon
						v-if="!playerStore.isPlaying || playerStore.currentMusic.song.id !== song.id"
						name="play"
						class="absolute inset-0 z-10 self-center text-center text-white translate-y-4 opacity-0 justify-self-center group-hover:translate-y-0 group-hover:opacity-100"
					/>
					<nuxt-icon
						v-else
						name="pause"
						class="absolute inset-0 z-10 self-center text-center text-white translate-y-4 opacity-0 justify-self-center group-hover:translate-y-0 group-hover:opacity-100"
					/>
					<span
						class="absolute inset-0 z-10 self-center text-center translate-y-0 opacity-100 group-hover:translate-y-4 group-hover:opacity-0"
					>
						{{ index + 1 }}
					</span>
				</td>
				<td class="flex gap-3 px-4 py-2">
					<picture class="">
						<img
							v-if="!playerStore.isListCompact"
							:src="`${$config.public.BASE_URL}${song.image}`"
							:alt="song.title"
							class="rounded-md w-11 h-11 aspect-square"
						>
					</picture>
					<div class="flex flex-col">
						<span class="text-base font-normal text-white">
							{{ song.title }}
						</span>
						<div
							v-if="!playerStore.isListCompact"
							class="flex flex-row"
						>
							<span
								v-for="(artist, key) in song.artists"
								:key="key"
								class="hover:text-white hover:underline"
							>
								{{ artist }}<span v-if="key !== song.artists.length - 1">,&nbsp;</span>
							</span>
						</div>
					</div>
				</td>
				<td
					v-if="playerStore.isListCompact"
					class="px-4 py-2 hover:text-white hover:underline"
				>
					<span
						v-for="(artist, key) in song.artists"
						:key="key"
						class="hover:text-white hover:underline"
					>
						{{ artist }}<span v-if="key !== song.artists.length - 1">,&nbsp;</span>
					</span>
				</td>
				<td class="px-4 py-2 hover:text-white hover:underline">
					{{ playlist.title }}
				</td>
				<td class="px-4 py-2 rounded-tr-lg rounded-br-lg">
					{{ song.duration }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import type { Playlist, Song } from '@/lib/types.d'

const songsProp = defineProps<{ songs: Song[], playlist: Playlist }>()

const playerStore = usePlayerStore()

const playSong = (selectedSong: Song) => {
	// Pause the music if the song clicked is the same that is playing
	if (playerStore.isPlaying && playerStore.currentMusic.song.id === selectedSong.id) {
		playerStore.setIsPlaying(false)
		return
	}

	try {
		// Set the song selected as the currentMusic
		playerStore.setCurrentMusic({ songs: songsProp.songs, playlist: songsProp.playlist, song: selectedSong })
		// Play music
		playerStore.setIsPlaying(true)
	} catch (error) {
		playerStore.setIsPlaying(false)
		console.error('Error playing song:', error)
	}
}
</script>
