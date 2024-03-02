<template>
  <nav class="flex flex-col flex-1 gap-2">
    <!-- Top panel -->
    <div class="flex flex-col w-full p-2 rounded-lg bg-zinc-900">
      <a href="/" class="menu_item">
        <IconsHomeIcon />Inicio
      </a>
      <a href="/" class="menu_item">
        <IconsSearchIcon />Buscar
      </a>
    </div>
    <!-- Bottom panel -->
    <div class="flex flex-col w-full h-full p-2 rounded-lg bg-zinc-900">
      <a href="/" class="menu_item">
        <IconsLibraryIcon />Tu biblioteca
      </a>
      <div class="overflow-y-auto">
        <a
          v-for="(playlist, key) in playlists"
          :key="key"
          :href="`/playlist/${playlist.id}`"
          class="flex flex-row items-center gap-5 p-2 rounded-md hover:bg-zinc-800"
        >
          <picture class="flex-none w-12 h-12">
            <img :src="playlist.cover" :alt="`Cover of ${playlist.title} by ${playlist.artists.join(', ')}`" class="object-cover w-full h-full rounded-md">
          </picture>
          <div class="flex flex-col w-full truncate">
            <h4 class="text-sm text-white">
              {{ playlist.title }}
            </h4>
            <span class="text-xs text-gray-400">
              {{ playlist.artists.join(', ') }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { playlists } from '@/lib/data'
</script>

<style scoped>
.menu_item {
  @apply flex flex-row items-center gap-4 px-5 py-3 font-medium transition duration-300 text-zinc-400 hover:text-zinc-100;
}
</style>
