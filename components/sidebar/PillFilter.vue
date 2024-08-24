<template>
  <span class="px-3.5 py-1.5 text-sm font-bold bg-[#333] hover:bg-zinc-700 rounded-full cursor-pointer">
    {{ filterText }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ filterText: string }>()
</script>
