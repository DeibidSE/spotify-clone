<template>
  <nav class="flex flex-col h-full gap-2">
    <!-- Top panel -->
    <div class="flex flex-col w-full p-2 rounded-lg bg-zinc-900">
      <NuxtLink to="/" class="menu_item">
        <nuxt-icon name="home" />Inicio
      </NuxtLink>
      <NuxtLink to="/search" class="menu_item">
        <nuxt-icon name="search" />Buscar
      </NuxtLink>
    </div>
    <!-- Bottom panel -->
    <div class="flex flex-col w-full h-full p-2 rounded-lg bg-zinc-900">
      <a href="/" class="menu_item">
        <nuxt-icon name="library" />Tu biblioteca
      </a>
      <div class="overflow-y-auto">
        <NuxtLink
          v-for="(playlist, key) in playlists"
          :key="key"
          :to="`/playlist/${playlist.id}`"
          class="flex flex-row items-center gap-5 p-2 truncate rounded-md hover:bg-zinc-800"
          :class="{'text-green-500' : playlistPlaying === playlist.id}"
        >
          <picture class="flex-none w-12 h-12">
            <img :src="playlist.cover" :alt="`Cover of ${playlist.title} by ${playlist.artists.join(', ')}`" class="object-cover w-full h-full rounded-md">
          </picture>
          <div class="flex flex-col w-full truncate">
            <h4 class="text-sm truncate">
              {{ playlist.title }}
            </h4>
            <span class="text-xs text-gray-400 truncate">
              {{ playlist.artists.join(', ') }}
            </span>
          </div>
          <div v-if="playlistPlaying === playlist.id && playerStore.isPlaying" class="text-sm">
            <nuxt-icon name="volume" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { playlists } from '@/lib/data'
const playerStore = usePlayerStore()

const playlistPlaying = computed(() => {
  return playerStore.currentMusic?.playlist?.id
})
</script>

<style scoped>
.menu_item {
  @apply flex flex-row items-center gap-4 px-5 py-3 font-medium transition duration-300 text-zinc-400 hover:text-zinc-100;
}
</style>
