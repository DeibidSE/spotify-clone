<template>
	<article
		class="relative transition-all duration-300 rounded-md shadow-lg group hover:bg-white/20 hover:shadow-xl bg-spotify-snow"
		@mouseenter="emit('hover', playlist.color || '#1DB954')"
		@mouseleave="emit('leave')"
	>
		<!-- Play/Pause button -->
		<div
			v-if="variant === 'base'"
			class="absolute z-10 transition-all duration-500 translate-y-4 opacity-0 right-4 bottom-20 group-hover:translate-y-0 group-hover:opacity-100"
		>
			<ControlsPlayPauseButton :id="playlist.id" />
		</div>

		<div
			v-else
			class="absolute top-0 bottom-0 z-10 flex items-center opacity-0 right-4 group-hover:opacity-100"
		>
			<ControlsPlayPauseButton
				:id="playlist.id"
				size="small"
			/>
		</div>

		<!-- Card -->
		<NuxtLink
			:to="`/playlist/${playlist.id}`"
			:class="[
				'relative transition-all duration-300 rounded-md overflow-hidden',
				variant === 'base'
					? 'flex flex-col gap-2 p-2 pb-6 w-44'
					: 'flex items-center flex-1 gap-2 min-w-80 basis-80',
			]"
			@click="active = playlist.id"
		>
			<img
				:src="`${$config.public.BASE_URL}${playlist.cover ? playlist.cover : '/img/no_image.webp'}`"
				:alt="`Cover of ${playlist.title} by ${playlist.artists.join(', ')}`"
				:class="[
					'object-cover h-full aspect-square',
					active === playlist.id && variant === 'base' ? 'active contain-layout' : '',
					variant === 'mini' ? 'rounded-l-md flex-none w-16 aspect-square' : 'rounded-md flex-none w-full aspect-square',
				]"
				:style="{
					'view-transition-name': `selected-playlist-${playlist.id}`,
				}"
				@error="onImageError"
			>

			<div
				v-if="variant === 'base'"
				class="flex flex-col flex-auto px-2"
			>
				<span class="text-sm text-white hover:underline w-fit">{{ playlist.title }}</span>
				<span class="text-xs capitalize text-white/70 hover:underline w-fit">
					{{ playlist.artists.length > 0 ? playlist.artists.join(', ') : `${$t('common.by')} DeibidSE` }}
				</span>
			</div>

			<span
				v-else
				class="p-2 font-bold text-white"
			>
				{{ playlist.title }}
			</span>

			<img
				v-if="isPlayingPlaylist && variant !== 'base'"
				src="/img/equaliser-animated-green.gif"
				alt="Equaliser animated green icon"
				class="absolute w-4 h-4 right-4"
			>
		</NuxtLink>
	</article>
</template>

<script setup lang="ts">
import type { Playlist } from '@/lib/types.d'

const props = defineProps<{
	playlist: Playlist
	variant?: 'base' | 'mini'
}>()

const emit = defineEmits<{
	(e: 'hover', color: string): void
	(e: 'leave'): void
}>()

const playerStore = usePlayerStore()
const active = useState()
const variant = props.variant ?? 'base'

const isPlayingPlaylist = computed(() => playerStore.isPlaying && playerStore.currentMusic?.playlist?.id === props.playlist.id)

const onImageError = (event: Event) => {
	(event.target as HTMLImageElement).src = '/img/no_image.webp'
}
</script>
