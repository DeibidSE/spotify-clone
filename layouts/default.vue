<template>
  <div class="grid h-screen gap-2 p-2 spotify_grid">
    <aside class="[grid-area:aside] flex flex-col overflow-y-auto w-full h-full">
      <AsideMenu />
    </aside>

    <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full">
      <slot />
    </main>

    <footer class="[grid-area:player] h-20">
      <PlayerFooter />
    </footer>
  </div>
</template>

<style scoped>
.spotify_grid {
  grid-template-areas:
    "aside main main"
    "player player player";
  grid-template-columns: 350px 1fr;
  grid-template-rows: 1fr auto;
}
</style>
