<template>
	<Teleport to="body">
		<div
			ref="menuRef"
			class="fixed z-[2000] w-56 p-1 rounded-md shadow-2xl bg-spotify-dusk-transition text-white/90"
			:style="{ top: `${position.y}px`, left: `${position.x}px` }"
			role="menu"
		>
			<button
				class="flex items-center w-full gap-3 px-3 py-2 text-sm transition-colors rounded-sm hover:bg-white/10"
				role="menuitem"
				@click="$emit('pin')"
			>
				<Icon name="my-icon:pin" />
				{{ item.pinned ? $t('library.unpin') : $t('library.pin') }}
			</button>
			<button
				v-if="item.isUserCreated"
				class="flex items-center w-full gap-3 px-3 py-2 text-sm transition-colors rounded-sm hover:bg-white/10"
				role="menuitem"
				@click="$emit('rename')"
			>
				<Icon name="my-icon:edit" />
				{{ $t('library.rename') }}
			</button>
			<button
				class="flex items-center w-full gap-3 px-3 py-2 text-sm transition-colors rounded-sm hover:bg-white/10"
				role="menuitem"
				@click="$emit('remove')"
			>
				<Icon name="my-icon:close" />
				{{ item.isUserCreated ? $t('library.delete') : $t('library.remove') }}
			</button>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import type { LibraryItem } from '@/lib/types.d'

const props = defineProps<{
	item: LibraryItem
	x: number
	y: number
}>()

const emit = defineEmits<{
	pin: []
	rename: []
	remove: []
	close: []
}>()

const menuRef = ref<HTMLElement | null>(null)

// Keep the menu inside the viewport.
const position = reactive({ x: props.x, y: props.y })

onMounted(async () => {
	await nextTick()
	const rect = menuRef.value?.getBoundingClientRect()
	if (rect) {
		if (props.x + rect.width > window.innerWidth) position.x = window.innerWidth - rect.width - 8
		if (props.y + rect.height > window.innerHeight) position.y = window.innerHeight - rect.height - 8
	}
	document.addEventListener('click', onOutside)
	document.addEventListener('contextmenu', onOutside)
	document.addEventListener('keydown', onEsc)
})

onUnmounted(() => {
	document.removeEventListener('click', onOutside)
	document.removeEventListener('contextmenu', onOutside)
	document.removeEventListener('keydown', onEsc)
})

const onOutside = (event: Event) => {
	if (menuRef.value && !menuRef.value.contains(event.target as Node)) emit('close')
}

const onEsc = (event: KeyboardEvent) => {
	if (event.key === 'Escape') emit('close')
}
</script>
