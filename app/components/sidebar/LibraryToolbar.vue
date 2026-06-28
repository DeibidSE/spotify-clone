<template>
	<div class="flex items-center justify-between px-2 text-spotify-steel">
		<!-- Search inside library -->
		<div
			ref="searchRef"
			class="relative flex items-center flex-1 min-w-0"
		>
			<div
				v-if="library.searchOpen"
				class="flex items-center w-full gap-2 px-3 py-1 rounded-md bg-spotify-shadow"
			>
				<Icon
					name="my-icon:search"
					class="flex-none text-base"
					aria-hidden="true"
				/>
				<input
					ref="searchInput"
					:value="library.query"
					type="search"
					:placeholder="$t('library.search_placeholder')"
					class="w-full text-sm text-white bg-transparent outline-none placeholder-spotify-steel"
					:aria-label="$t('library.search_placeholder')"
					@input="library.setQuery(($event.target as HTMLInputElement).value)"
					@keydown.esc="closeSearch"
				>
			</div>
			<button
				v-else
				class="p-2 transition-colors rounded-full hover:text-white hover:bg-spotify-midnight"
				:aria-label="$t('library.search_placeholder')"
				@click.stop="openSearch"
			>
				<Icon name="my-icon:search" />
			</button>
		</div>

		<!-- Sort by -->
		<div
			ref="sortRef"
			class="relative flex-none"
		>
			<button
				class="flex items-center gap-1 px-2 py-1 text-sm transition-colors rounded-md hover:text-white"
				:aria-label="$t('library.sort_by')"
				:aria-expanded="sortOpen"
				@click="sortOpen = !sortOpen"
			>
				<span class="truncate">{{ currentSortLabel }}</span>
				<Icon name="my-icon:sort" />
			</button>

			<ul
				v-show="sortOpen"
				class="absolute right-0 z-50 p-1 mt-2 rounded-md shadow-lg w-52 bg-spotify-dusk-transition"
				role="menu"
			>
				<li class="px-3 py-2 text-xs font-bold text-spotify-steel">
					{{ $t('library.sort_by') }}
				</li>
				<li
					v-for="option in sortOptions"
					:key="option.value"
				>
					<button
						class="flex items-center justify-between w-full gap-4 px-3 py-2 text-sm transition-colors rounded-sm hover:bg-white/10 text-left"
						:class="library.sort === option.value ? 'text-spotify-electric-green' : 'text-white/90'"
						role="menuitemradio"
						:aria-checked="library.sort === option.value"
						@click="selectSort(option.value)"
					>
						{{ option.label }}
						<Icon
							v-if="library.sort === option.value"
							name="my-icon:list"
							class="text-xs"
							aria-hidden="true"
						/>
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { LibrarySort } from '~/types'

const library = useLibraryStore()
const { t } = useI18n()

const searchInput = ref<HTMLInputElement | null>(null)
const searchRef = ref<HTMLElement | null>(null)
const sortRef = ref<HTMLElement | null>(null)
const sortOpen = ref(false)

const sortOptions = computed<{ value: LibrarySort, label: string }[]>(() => [
	{ value: 'recents', label: t('library.sort.recents') },
	{ value: 'recently_added', label: t('library.sort.recently_added') },
	{ value: 'alphabetical', label: t('library.sort.alphabetical') },
	{ value: 'creator', label: t('library.sort.creator') },
])

const currentSortLabel = computed(() =>
	sortOptions.value.find(o => o.value === library.sort)?.label ?? '',
)

const openSearch = async () => {
	sortOpen.value = false
	library.toggleSearch(true)
	await nextTick()
	searchInput.value?.focus()
}

const closeSearch = () => library.toggleSearch(false)

const selectSort = (value: LibrarySort) => {
	library.setSort(value)
	sortOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
	const target = event.target as Node

	if (sortRef.value && !sortRef.value.contains(target)) {
		sortOpen.value = false
	}

	// Collapse the in-library search when clicking outside it, unless the user
	// has typed a query (Spotify keeps the field open while it has text).
	if (
		library.searchOpen
		&& !library.query
		&& searchRef.value
		&& !searchRef.value.contains(target)
	) {
		library.toggleSearch(false)
	}
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>
