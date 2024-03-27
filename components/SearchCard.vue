<template>
  <article
    v-if="list"
    class="relative overflow-hidden transition-all duration-300 rounded-md shadow-lg cursor-pointer"
    :style="`background-color: ${list.color}`"
  >
    <div
      class="flex flex-col items-start p-6 overflow-hidden transition-all duration-300 rounded-md w-44 h-44"
    >
      <span class="text-xl font-bold text-white">
        {{ list.name }}
      </span>
      <img
        v-if="list.cover && list.cover !== ''"
        :src="`${$config.public.BASE_URL}${list.cover}`"
        class="absolute bottom-0 right-0 object-cover object-center w-28 h-28 rotate-[25deg] translate-x-4 translate-y-1.5 shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]"
      >
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{list: {name: string, color: string, cover?: string}}>()
</script>
