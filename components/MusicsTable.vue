<template>
  <table class="min-w-full text-left divide-y table-auto divide-gray-500/20">
    <thead>
      <tr class="text-sm text-zinc-400">
        <th class="px-4 py-2 font-light">
          #
        </th>
        <th class="px-4 py-2 font-light">
          Título
        </th>
        <th class="px-4 py-2 font-light">
          Álbum
        </th>
        <th class="px-4 py-2 font-light">
          <nuxt-icon name="time" />
        </th>
      </tr>
    </thead>

    <tbody>
      <tr class="h-[16px]" />
      <tr
        v-for="(song, index) in songs"
        :key="index"
        class="overflow-hidden text-sm font-light text-gray-300 transition duration-300 border-spacing-0 hover:bg-white/10"
      >
        <td class="relative w-5 px-4 py-2 rounded-tl-lg rounded-bl-lg">
          {{ index + 1 }}
        </td>
        <td class="flex gap-3 px-4 py-2">
          <picture class="">
            <img :src="song.image" :alt="song.title" class="w-11 h-11">
          </picture>
          <div class="flex flex-col">
            <h3 class="text-base font-normal text-white">
              {{ song.title }}
            </h3>
            <span>{{ song.artists.join(", ") }}</span>
          </div>
        </td>
        <td class="px-4 py-2">
          {{ song.album }}
        </td>
        <td class="px-4 py-2 rounded-tr-lg rounded-br-lg">
          {{ song.duration }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { type Song } from '@/lib/types.d'

defineProps<{songs: Song[]}>()
</script>
