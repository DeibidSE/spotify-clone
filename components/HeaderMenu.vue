<template>
  <div class="z-10 flex flex-row items-center justify-between gap-2 px-6 py-4">
    <a href="" aria-label="Go back" class="p-2 rounded-full bg-black/70" @click.prevent="$router.back()">
      <ToolTip tooltip-text="Volver" position="bottom">
        <nuxt-icon name="arrow-back" />
      </ToolTip>
    </a>
    <div class="flex flex-row gap-2">
      <NuxtLink
        to="/news"
        class="p-2 rounded-full bg-black/70 text-white/70 hover:text-white hover:scale-105"
        aria-label="Open news"
      >
        <ToolTip tooltip-text="Novedades" position="bottom">
          <nuxt-icon name="bell" />
        </ToolTip>
      </NuxtLink>
      <div class="flex flex-col">
        <button
          class="w-8 h-8 text-center bg-blue-400 border-4 border-black rounded-full hover:scale-105"
          @click="isOptionsExpanded = !isOptionsExpanded"
        >
          <span class="text-sm font-bold text-black">D</span>
        </button>
        <ul
          v-show="isOptionsExpanded"
          class="absolute w-40 p-1 overflow-hidden divide-y rounded-[4px] shadow-lg right-6 top-14 bg-zinc-800"
        >
          <li
            class="p-3 transition-colors duration-300 rounded-sm hover:bg-white/10"
          >
            <NuxtLink
              to="https://github.com/DeibidSE/spotify-clone.git"
              target="_blank"
              class="flex justify-between text-sm text-white/90"
            >
              Mi Github
              <nuxt-icon name="external-link" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOptionsExpanded = ref(false)
</script>
