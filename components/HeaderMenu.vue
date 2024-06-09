<template>
  <div class="z-10 flex flex-row items-center justify-between gap-2 px-6 py-4">
    <ToolTip :tooltip-text="`${ $t('return') }`" position="bottom">
      <a href="" aria-label="Go back" class="p-2 rounded-full bg-black/70" @click.prevent="$router.back()">
        <nuxt-icon name="arrow-back" />
      </a>
    </ToolTip>
    <div class="flex flex-row gap-2">
      <ToolTip :tooltip-text="`${ $t('whats_new') }`" position="bottom">
        <NuxtLink
          to="/news"
          class="p-2 rounded-full bg-black/70 text-white/70 hover:text-white hover:scale-105"
          aria-label="Open news"
        >
          <nuxt-icon name="bell" />
        </NuxtLink>
      </ToolTip>
      <div ref="dropdown" class="flex flex-col">
        <button class="w-8 h-8 text-center bg-blue-400 border-4 border-black rounded-full hover:scale-105">
          <span class="text-sm font-bold text-black">D</span>
        </button>
        <ul
          v-show="isOptionsExpanded"
          class="absolute w-40 p-1 overflow-hidden divide-y rounded-[4px] shadow-lg right-6 top-14 bg-zinc-800"
        >
          <li
            class="transition-colors duration-300 rounded-sm hover:bg-white/10"
          >
            <NuxtLink
              to="https://github.com/DeibidSE/spotify-clone.git"
              target="_blank"
              class="flex justify-between p-3 text-sm text-white/90"
            >
              {{ $t('github') }}
              <nuxt-icon name="external-link" />
            </NuxtLink>
          </li>
          <li class="transition-colors duration-300 rounded-sm hover:bg-white/10">
            <NuxtLink to="/settings" aria-label="Open settings" class="flex justify-between p-3 text-sm text-white/90">
              {{ $t('settings') }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOptionsExpanded = ref(false)
const dropdown = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOptionsExpanded.value = false
  } else {
    isOptionsExpanded.value = !isOptionsExpanded.value
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
