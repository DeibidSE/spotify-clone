<template>
  <nav class="flex flex-col h-full gap-2 overflow-y-hidden">
    <!-- Top panel -->
    <div class="flex flex-col w-full rounded-lg bg-zinc-900">
      <SidebarTopSidebarMenu />
    </div>
    <!-- Bottom panel -->
    <div class="flex flex-col w-full h-full gap-2 p-2 overflow-x-hidden overflow-y-auto rounded-lg bg-zinc-900">
      <SidebarBottomSidebarMenu />
    </div>
  </nav>
</template>
