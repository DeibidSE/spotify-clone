<template>
  <NuxtLayout>
    <div id="playlist-container" class="relative transition-all duration-1000 bg-green-600">
      <!-- <PageHeader /> -->

      <div class="relative z-10 px-6 pt-10">
        <h1 class="text-3xl font-bold">
          {{ greeting }}
        </h1>
        <div class="flex flex-wrap gap-4 mt-6">
          <PlayListItemCard v-for="(playlist, key) in playlists" :key="key" :playlist="playlist" />
        </div>

        <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 -z-[1]" />
      </div>
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
