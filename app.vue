<template>
  <div class="grid h-screen gap-2 p-2 overflow-auto spotify_grid" :class="{'collapsed': isCollapsed}">
    <aside class="[grid-area:left-sidebar] flex flex-col overflow-y-auto w-full h-full overflow-x-hidden">
      <SidebarAsideMenu />
    </aside>

    <main class="[grid-area:main-view] relative z-10 flex flex-col rounded-lg overflow-y-auto w-full h-full bg-zinc-900">
      <HeaderMenu />
      <NuxtPage />
    </main>

    <footer class="[grid-area:now-playing-bar] min-h-[72px] w-full z-50 flex justify-between px-1 min-w-fit gap-2">
      <FooterPlayerFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
const playerStore = usePlayerStore()
const isCollapsed = ref(playerStore.isGridCollapsed)

watch(() => playerStore.isGridCollapsed, (newValue) => {
  isCollapsed.value = newValue
})

</script>

<style scoped>
.spotify_grid {
  grid-template-areas:
    "left-sidebar main-view"
    "now-playing-bar now-playing-bar";
  grid-template-columns: 350px 1fr;
  grid-template-rows: 1fr auto;
  transition: grid-template-columns 0.3s ease;
}

.spotify_grid.collapsed {
  grid-template-columns: 80px 1fr;
}
</style>
