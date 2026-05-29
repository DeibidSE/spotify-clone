<template>
	<component
		:is="editing ? 'div' : NuxtLink"
		:to="editing ? undefined : `/playlist/${item.id}`"
		class="relative flex items-center w-full gap-3 p-2 transition rounded-md group/row hover:bg-spotify-midnight"
		:class="{ 'bg-spotify-midnight': active }"
		:aria-label="`Go to playlist: ${item.title}`"
		@contextmenu.prevent="$emit('contextmenu', $event)"
	>
		<picture
			v-if="collapsed"
			class="relative flex-none w-12 h-12"
		>
			<img
				:src="item.cover ? item.cover : '/img/no_image.webp'"
				:alt="`Cover of ${item.title}`"
				loading="lazy"
				:class="[
					'object-cover w-full h-full aspect-square bg-spotify-shadow',
					item.isAlbum || item.type === 'music' ? 'rounded-md' : 'rounded-full',
				]"
				@error="onImageError"
			>
		</picture>
		<picture
			v-else
			class="relative flex-none w-12 h-12"
		>
			<img
				:src="item.cover ? item.cover : '/img/no_image.webp'"
				:alt="`Cover of ${item.title}`"
				loading="lazy"
				:class="[
					'object-cover w-full h-full aspect-square bg-spotify-shadow',
					item.isAlbum || item.type === 'music' ? 'rounded-md' : 'rounded-full',
				]"
				@error="onImageError"
			>
		</picture>

		<!-- Info -->
		<div
			v-if="!collapsed"
			class="flex flex-col flex-1 min-w-0"
		>
			<!-- Inline rename input -->
			<input
				v-if="editing"
				ref="renameInput"
				v-model="draftTitle"
				type="text"
				class="w-full px-2 py-1 text-sm text-white rounded-sm outline-none bg-spotify-shadow ring-2 ring-white/40"
				:aria-label="`Rename ${item.title}`"
				@keydown.enter.prevent="save"
				@keydown.esc.prevent="$emit('cancelEdit')"
				@blur="save"
				@click.prevent.stop
			>

			<template v-else>
				<h4
					class="text-sm truncate"
					:class="isCurrent ? 'text-spotify-electric-green' : 'text-white'"
				>
					{{ item.title }}
				</h4>
				<span class="flex items-center gap-1 text-xs truncate text-spotify-steel">
					<Icon
						v-if="item.pinned"
						name="my-icon:pin"
						class="flex-none text-spotify-electric-green"
						aria-hidden="true"
					/>
					<span class="truncate">{{ subtitle }}</span>
				</span>
			</template>
		</div>

		<!-- Animated equalizer when this playlist is playing -->
		<div
			v-if="isCurrent && isPlaying && !editing"
			class="flex items-end flex-none h-4 gap-[2px]"
			aria-label="Playing"
		>
			<span
				v-for="bar in 4"
				:key="bar"
				class="w-[3px] rounded-sm bg-spotify-electric-green eq-bar"
				:style="{ animationDelay: `${bar * 0.15}s` }"
			/>
		</div>
	</component>
</template>

<script setup lang="ts">
import { itemCreator } from '@/stores/libraryStore'
import type { LibraryItem } from '@/lib/types.d'

const props = defineProps<{
	item: LibraryItem
	collapsed?: boolean
	active?: boolean
	isCurrent?: boolean
	isPlaying?: boolean
	editing?: boolean
}>()

const emit = defineEmits<{
	rename: [title: string]
	cancelEdit: []
	contextmenu: [event: MouseEvent]
}>()

const { t } = useI18n()
const NuxtLink = resolveComponent('NuxtLink')

const renameInput = ref<HTMLInputElement | null>(null)
const draftTitle = ref(props.item.title)

const subtitle = computed(() => {
	if (props.item.type === 'artist') return t('playlist.artist')
	const kind = props.item.isAlbum ? t('album.single') : t('playlist.title')
	return `${kind} • ${itemCreator(props.item)}`
})

watch(() => props.editing, async (editing) => {
	if (editing) {
		draftTitle.value = props.item.title
		await nextTick()
		renameInput.value?.focus()
		renameInput.value?.select()
	}
}, { immediate: true })

const save = () => {
	const value = draftTitle.value.trim()
	if (value && value !== props.item.title) {
		emit('rename', value)
	} else {
		emit('cancelEdit')
	}
}

const onImageError = (event: Event) => {
	(event.target as HTMLImageElement).src = '/img/no_image.webp'
}
</script>

<style scoped>
.eq-bar {
	height: 30%;
	animation: eq 0.9s ease-in-out infinite alternate;
}

@keyframes eq {
	0% {
		height: 25%;
	}
	100% {
		height: 100%;
	}
}

@media (prefers-reduced-motion: reduce) {
	.eq-bar {
		animation: none;
		height: 60%;
	}
}
</style>
