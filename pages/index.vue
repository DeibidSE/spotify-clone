<template>
  <NuxtLayout>
    <div class="flex flex-col gap-6 px-6 py-4">
      <!-- Greetings message-->
      <HeaderGreetingsTitle />
      <!-- List of playlists -->
      <div class="flex flex-wrap gap-4">
        <CardsPlaylistCard v-for="(playlist, key) in playlists" :key="key" :playlist="playlist" />
      </div>
    </div>
    <!-- Gradient -->
    <div class="absolute inset-0 h-full bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-green-600/80 -z-10" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { playlists } from '@/lib/data'
</script>
