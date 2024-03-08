<template>
  <div class="z-10 flex flex-row items-center justify-between gap-2 px-6 py-4">
    <a href="" aria-label="Go back" class="p-2 rounded-full bg-black/70" @click.prevent="$router.back()">
      <nuxt-icon name="arrow-back" />
    </a>
    <div class="flex flex-row gap-2">
      <NuxtLink
        to="/news"
        class="p-2 rounded-full bg-black/70 text-white/70 hover:text-white hover:scale-105"
        aria-label="Open news"
      >
        <nuxt-icon name="bell" />
      </NuxtLink>
      <NuxtLink
        to="https://github.com/DeibidSE/spotify-clone.git"
        target="_blank"
        class="w-8 h-8 text-center bg-blue-400 border-4 border-black rounded-full hover:scale-105"
      >
        <span class="text-sm font-bold text-black">D</span>
      </NuxtLink>
    </div>
  </div>
</template>
