<template>
	<Teleport to="body">
		<div
			class="fixed inset-0 z-[3000] flex items-center justify-center bg-black/70"
			@click.self="$emit('cancel')"
			@keydown.esc="$emit('cancel')"
		>
			<div
				class="w-[524px] max-w-[90vw] p-6 rounded-lg shadow-2xl bg-spotify-dusk-transition"
				role="dialog"
				aria-modal="true"
			>
				<div class="flex items-center justify-between mb-5">
					<h2 class="text-2xl font-bold text-white">
						{{ $t('playlist.edit.title') }}
					</h2>
					<button
						class="p-1 text-xl transition rounded-full text-spotify-steel hover:text-white"
						:aria-label="$t('common.cancel')"
						@click="$emit('cancel')"
					>
						<Icon name="my-icon:close" />
					</button>
				</div>

				<form
					class="flex gap-4"
					@submit.prevent="save"
				>
					<!-- Cover -->
					<label class="relative flex-none cursor-pointer group w-44 h-44">
						<img
							:src="draft.cover || '/img/no_image.webp'"
							:alt="draft.title"
							class="object-cover w-full h-full rounded shadow-lg aspect-square bg-spotify-shadow"
							@error="onImageError"
						>
						<div class="absolute inset-0 flex flex-col items-center justify-center gap-2 transition rounded opacity-0 bg-black/70 group-hover:opacity-100">
							<Icon
								name="my-icon:edit"
								class="text-4xl text-white"
							/>
							<span class="text-sm text-white">{{ $t('playlist.edit.choose_photo') }}</span>
						</div>
						<input
							type="file"
							accept="image/*"
							class="hidden"
							@change="onFileChange"
						>
					</label>

					<div class="flex flex-col flex-1 min-w-0 gap-3">
						<input
							ref="nameInput"
							v-model="draft.title"
							type="text"
							maxlength="100"
							:placeholder="$t('playlist.edit.name_placeholder')"
							:aria-label="$t('playlist.edit.name_placeholder')"
							class="w-full px-3 py-2 text-sm text-white transition rounded outline-none bg-spotify-shadow hover:bg-spotify-charcoal focus:ring-2 focus:ring-white/50"
						>
						<textarea
							v-model="draft.description"
							maxlength="300"
							:placeholder="$t('playlist.edit.description_placeholder')"
							:aria-label="$t('playlist.edit.description_placeholder')"
							class="flex-1 w-full px-3 py-2 text-sm text-white transition rounded outline-none resize-none bg-spotify-shadow hover:bg-spotify-charcoal focus:ring-2 focus:ring-white/50 min-h-24"
						/>
					</div>
				</form>

				<div class="flex items-center justify-end mt-5">
					<button
						class="px-8 py-3 text-sm font-bold transition rounded-full bg-spotify-electric-green text-spotify-obsidian hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
						:disabled="!draft.title.trim()"
						@click="save"
					>
						{{ $t('playlist.edit.save') }}
					</button>
				</div>

				<p class="mt-4 text-[11px] leading-tight text-spotify-steel">
					{{ $t('playlist.edit.disclaimer') }}
				</p>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import type { Playlist } from '@/lib/types.d'

const props = defineProps<{ playlist: Playlist }>()

const emit = defineEmits<{
	save: [details: { title: string, description: string, cover: string }]
	cancel: []
}>()

const nameInput = ref<HTMLInputElement | null>(null)

const draft = reactive({
	title: props.playlist.title ?? '',
	description: props.playlist.description ?? '',
	cover: props.playlist.cover ?? '',
})

onMounted(async () => {
	await nextTick()
	nameInput.value?.focus()
	nameInput.value?.select()
})

const onFileChange = (event: Event) => {
	const file = (event.target as HTMLInputElement).files?.[0]
	if (!file) return
	const reader = new FileReader()
	reader.onload = () => {
		draft.cover = reader.result as string
	}
	reader.readAsDataURL(file)
}

const onImageError = (event: Event) => {
	(event.target as HTMLImageElement).src = '/img/no_image.webp'
}

const save = () => {
	if (!draft.title.trim()) return
	emit('save', { title: draft.title, description: draft.description, cover: draft.cover })
}
</script>
