<template>
  <NuxtLayout>
    <div class="flex flex-col gap-6 px-6 py-4">
      <!-- Greetings message-->
      <GreetingsTitle />
      <!-- List of playlists -->
      <div class="flex flex-wrap gap-4">
        <PlayListItemCard v-for="(playlist, key) in playlists" :key="key" :playlist="playlist" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { playlists } from '@/lib/data'
</script>
