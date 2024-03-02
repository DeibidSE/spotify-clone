<template>
  <nav class="flex flex-col flex-1 gap-2">
    <div class="flex flex-col w-full p-2 rounded-lg bg-zinc-900">
      <ul>
        <SideMenuItem href="/">
          <IconsHomeIcon />Inicio
        </SideMenuItem>
        <SideMenuItem href="/#">
          <IconsSearchIcon />Buscar
        </SideMenuItem>
      </ul>
    </div>

    <div class="flex flex-col w-full h-full p-2 rounded-lg bg-zinc-900">
      <ul>
        <SideMenuItem href="/">
          <IconsLibraryIcon />Tu biblioteca
        </SideMenuItem>
        <SideMenuCard v-for="(playlist, key) in playlists" :key="key" :playlist="playlist" />
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { playlists } from '@/lib/data'
</script>
