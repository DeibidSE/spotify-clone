<template>
  <div class="flex items-center justify-between">
    <div
      class="flex gap-3 px-4 py-2 font-bold transition duration-300 text-zinc-400 hover:text-zinc-100 hover:cursor-pointer"
      @click="collapseLeftPanel"
    >
      <nuxt-icon name="library" class="text-2xl" />
      <span v-if="!playerStore.isGridCollapsed" class="truncate">{{ $t('library') }}</span>
    </div>
    <button v-if="!playerStore.isGridCollapsed" class="px-2.5 text-3xl font-thin rounded-full text-zinc-400 hover:text-zinc-100 hover:cursor-pointer hover:bg-zinc-700/20">
      +
    </button>
  </div>
  <div v-if="!playerStore.isGridCollapsed" class="flex flex-wrap w-full gap-3 p-2">
    <SidebarPillFilter v-for="(filter, key) in filters" :key="key" :filter-text="filter" @click="applyFilter(filter)" />
  </div>
  <div class="h-full overflow-x-hidden overflow-y-auto">
    <NuxtLink
      v-for="(playlist, key) in playlists"
      :key="key"
      :to="`/playlist/${playlist.id}`"
      class="flex flex-row items-center gap-5 p-2 truncate rounded-md hover:bg-zinc-800"
      :class="{ 'text-green-500' : playlistPlaying === playlist.id }"
    >
      <picture class="flex-none w-12 h-12">
        <img
          :src="`${$config.public.BASE_URL}${playlist.cover}`"
          :alt="`Cover of ${playlist.title} by ${playlist.artists.join(', ')}`"
          class="object-cover w-full h-full rounded-md aspect-square"
        >
      </picture>
      <div v-if="!playerStore.isGridCollapsed" class="flex flex-col w-full truncate">
        <h4 class="text-sm truncate">
          {{ playlist.title }}
        </h4>
        <span class="text-xs text-gray-400 truncate">
          {{ playlist.artists.length > 0 ? playlist.artists.join(', ') : `${$t('playlist')} • DeibidSE` }}
        </span>
      </div>
      <div v-if="playlistPlaying === playlist.id && playerStore.isPlaying" class="text-sm">
        <nuxt-icon name="volume" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { playlists } from '@/lib/data'
const playerStore = usePlayerStore()
const { t } = useI18n()
const filters = computed(() => [t('lists'), t('artists'), t('albums')])

const playlistPlaying = computed(() => {
  return playerStore.currentMusic?.playlist?.id
})

const collapseLeftPanel = () => {
  playerStore.setGridCollapsed(!playerStore.isGridCollapsed)
}

const applyFilter = (_filter: string) => {
  // TODO
}
</script>
