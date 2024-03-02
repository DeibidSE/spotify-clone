<template>
  <li>
    <a
      class="flex flex-row items-center gap-4 px-5 py-3 font-medium transition duration-300 text-zinc-400 hover:text-zinc-100"
      :href="href"
    >
      <slot />
    </a>
  </li>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: () => ('')
  }
})
</script>
