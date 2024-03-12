<template>
  <div class="grid h-screen gap-2 p-2 overflow-auto spotify_grid">
    <aside class="[grid-area:left-sidebar] flex flex-col overflow-y-auto w-full h-full">
      <AsideMenu />
    </aside>

    <main class="[grid-area:main-view] relative z-10 flex flex-col rounded-lg overflow-y-auto w-full h-full bg-zinc-900">
      <HeaderMenu />
      <NuxtPage />
    </main>

    <footer class="[grid-area:now-playing-bar] h-[72px]">
      <PlayerFooter />
    </footer>
  </div>
</template>

<style scoped>
.spotify_grid {
  grid-template-areas:
    "left-sidebar main-view main-view"
    "now-playing-bar now-playing-bar now-playing-bar";
  grid-template-columns: 350px 1fr;
  grid-template-rows: 1fr auto;
}
</style>
