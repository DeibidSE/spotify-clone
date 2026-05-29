<template>
	<div
		class="grid h-screen gap-2 p-2 overflow-hidden spotify_grid"
		:class="{ collapsed: playerStore.isGridCollapsed, resizing: isResizing }"
		:style="gridStyle"
	>
		<header class="[grid-area:header] w-full z-50 flex items-center justify-between min-w-fit gap-2">
			<HeaderMenu />
		</header>

		<aside class="[grid-area:left-sidebar] flex flex-col overflow-y-auto w-full h-full overflow-x-hidden">
			<SidebarAsideMenu />
		</aside>

		<main class="[grid-area:main-view] relative z-10 flex flex-col rounded-lg w-full h-full overflow-hidden bg-spotify-obsidian">
			<NuxtPage />
		</main>

		<footer class="[grid-area:now-playing-bar] min-h-[72px] w-full z-50 flex justify-between px-1 min-w-fit gap-2">
			<FooterPlayerFooter />
		</footer>
	</div>
</template>

<script setup lang="ts">
const playerStore = usePlayerStore()
const library = useLibraryStore()

const isResizing = computed(() => library.isResizing)

// Sidebar column width is driven by the library store (drag-to-resize, persisted).
const gridStyle = computed(() => ({
	'--sidebar-width': playerStore.isGridCollapsed ? '80px' : `${library.sidebarWidth}px`,
}))

// Responsive: auto-collapse the sidebar on narrow viewports, like Spotify Web.
const applyResponsive = () => {
	if (typeof window === 'undefined') return
	if (window.innerWidth < 768 && !playerStore.isGridCollapsed) {
		playerStore.setGridCollapsed(true)
	}
}

onMounted(() => {
	applyResponsive()
	window.addEventListener('resize', applyResponsive)
})
onUnmounted(() => window.removeEventListener('resize', applyResponsive))
</script>

<style scoped>
.spotify_grid {
  grid-template-areas:
		"header header"
    "left-sidebar main-view"
    "now-playing-bar now-playing-bar";
  grid-template-columns: var(--sidebar-width, 350px) 1fr;
  grid-template-rows: auto 1fr auto;
  transition: grid-template-columns 0.3s ease;
}

/* Disable the column transition while dragging so resize feels 1:1. */
.spotify_grid.resizing {
  transition: none;
}
</style>
