<template>
  <ul class="px-3 py-2">
    <li v-for="(item, key) in LIST_ITEMS" :key="key" class="px-3 py-1">
      <NuxtLink
        :to="item"
        class="flex flex-row items-center h-10 gap-5 font-bold transition duration-300 text-zinc-400 hover:text-zinc-100"
      >
        <nuxt-icon :name="key" class="text-2xl" />
        <span v-if="!playerStore.isGridCollapsed" class="truncate">{{ $t(key) }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const playerStore = usePlayerStore()
const LIST_ITEMS = { home: '/', search: '/search' }
</script>
