<template>
	<Teleport to="body">
		<div
			class="fixed inset-0 z-[3000] flex items-center justify-center bg-black/70"
			@click.self="$emit('cancel')"
			@keydown.esc="$emit('cancel')"
		>
			<div
				class="w-[420px] max-w-[90vw] p-6 rounded-lg shadow-2xl bg-spotify-dusk-transition"
				role="alertdialog"
				aria-modal="true"
			>
				<h2 class="text-2xl font-bold text-white">
					{{ title }}
				</h2>
				<p
					v-if="body"
					class="mt-3 text-sm text-spotify-steel"
				>
					{{ body }}
				</p>
				<div class="flex items-center justify-end gap-4 mt-6">
					<button
						class="px-4 py-2 text-sm font-bold text-white transition hover:scale-105"
						@click="$emit('cancel')"
					>
						{{ cancelLabel ?? $t('common.cancel') }}
					</button>
					<button
						ref="confirmBtn"
						class="px-6 py-3 text-sm font-bold transition rounded-full bg-spotify-electric-green text-spotify-obsidian hover:scale-105"
						@click="$emit('confirm')"
					>
						{{ confirmLabel }}
					</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
defineProps<{
	title: string
	body?: string
	confirmLabel: string
	cancelLabel?: string
}>()

defineEmits<{
	confirm: []
	cancel: []
}>()

const confirmBtn = ref<HTMLButtonElement | null>(null)

onMounted(() => confirmBtn.value?.focus())
</script>
