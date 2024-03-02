<template>
  <NuxtLayout>
    <div class="relative z-10 flex flex-col h-full gap-6 px-6 py-10 bg-green-600">
      <!-- Greetings message-->
      <h1 class="text-3xl font-bold">
        {{ greeting }}
      </h1>
      <!-- List of playlists -->
      <div class="flex flex-wrap gap-4">
        <PlayListItemCard v-for="(playlist, key) in playlists" :key="key" :playlist="playlist" />
      </div>
      <!-- Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 -z-[1] h-full" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { playlists } from '@/lib/data'

const currentTime = new Date()
const currentHour = currentTime.getHours()

let greeting = ''

if (currentHour < 12) {
  greeting = '¡Buenos días!'
} else if (currentHour < 18) {
  greeting = '¡Buenas tardes!'
} else {
  greeting = '¡Buenas noches!'
}
</script>
