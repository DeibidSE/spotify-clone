<template>
	<!-- Spotify Main Logo -->
	<section class="flex items-center px-4 text-2xl font-bold text-white w-[30%]">
		<NuxtLink
			to="/"
			aria-label="Spotify Home"
		>
			<nuxt-icon
				name="logo"
				class="text-[32px]"
			/>
		</NuxtLink>
	</section>

	<!-- Home button + Search -->
	<nav class="flex items-center justify-center flex-1 gap-4 w-[40%]">
		<!-- Home Button -->
		<ToolTip
			:tooltip-text="$t('navigation.home')"
			position="bottom"
		>
			<NuxtLink
				to="/"
				class="p-3 transition-transform rounded-full bg-spotify-midnight hover:bg-spotify-shadow text-spotify-steel hover:text-white hover:scale-105"
				aria-label="Home"
			>
				<nuxt-icon
					name="home"
					class="text-2xl"
				/>
			</NuxtLink>
		</ToolTip>

		<!-- Search Input -->
		<div class="relative w-full max-w-lg">
			<div class="absolute h-full -translate-y-1/2 left-4 top-1/2 text-spotify-steel">
				<ToolTip
					:tooltip-text="$t('search.title')"
					position="bottom"
				>
					<nuxt-icon
						name="search"
						class="text-2xl transition-transform cursor-pointer hover:text-white hover:scale-105"
						@click="() => $refs.searchInputRef.focus()"
					/>
				</ToolTip>
			</div>
			<input
				ref="searchInputRef"
				v-model="searchQuery"
				type="search"
				:placeholder="$t('search.placeholder')"
				class="w-full py-3 pl-12 pr-16 text-white transition border border-transparent rounded-full bg-spotify-midnight placeholder-spotify-steel focus:border-white hover:border-spotify-shadow hover:bg-spotify-shadow"
				aria-label="Search"
			>
			<div class="absolute items-center h-full -translate-y-1/2 right-4 top-1/2 text-spotify-steel">
				<ToolTip
					:tooltip-text="$t('navigation.explore')"
					position="bottom"
				>
					<NuxtLink
						to="/search"
						class="text-2xl"
						aria-label="Explore"
					>
						<span class="h-5 w-[1px] bg-spotify-steel mr-3" />
						<nuxt-icon
							name="explore"
							class="transition-transform hover:text-white hover:scale-105"
						/>
					</NuxtLink>
				</ToolTip>
			</div>
		</div>
	</nav>

	<!-- User utilities -->
	<section class="flex items-center gap-4 w-[30%] justify-end">
		<div class="flex gap-2">
			<!-- Install Button -->
			<div class="relative flex items-center w-full">
				<NuxtLink
					to="/install"
					class="flex items-center gap-2 px-4 py-1 transition text-white/70 hover:text-white hover:scale-105"
					aria-label="Install App"
				>
					<nuxt-icon name="download" />
					<span class="text-sm font-bold">{{ $t('app.install') }}</span>
				</NuxtLink>
			</div>

			<!-- News Button -->
			<ToolTip
				:tooltip-text="$t('updates.title')"
				position="bottom"
			>
				<NuxtLink
					to="/news"
					class="p-2 transition rounded-full bg-black/70 text-white/70 hover:text-white hover:scale-105"
					aria-label="News"
				>
					<nuxt-icon name="bell" />
				</NuxtLink>
			</ToolTip>

			<!-- Friends Activity Button -->
			<ToolTip
				:tooltip-text="$t('social.friends_activity')"
				position="bottom"
			>
				<button
					class="p-2 transition rounded-full bg-black/70 text-white/70 hover:text-white hover:scale-105"
					aria-label="Friends Activity"
				>
					<nuxt-icon name="social" />
				</button>
			</ToolTip>
		</div>

		<!-- User Dropdown -->
		<div
			ref="dropdownRef"
			class="relative"
		>
			<button
				class="w-12 h-12 text-center transition-transform bg-blue-400 border-8 rounded-full border-spotify-midnight hover:scale-105"
				aria-label="User Menu"
				@click="toggleDropdown"
			>
				<span class="text-sm font-bold text-black">D</span>
			</button>

			<ul
				v-show="isDropdownOpen"
				class="absolute right-0 z-50 w-40 p-1 mt-2 divide-y rounded-md shadow-lg bg-spotify-dusk-transition"
				role="menu"
			>
				<li class="transition-colors rounded-sm hover:bg-white/10">
					<NuxtLink
						to="https://github.com/DeibidSE/spotify-clone.git"
						target="_blank"
						class="flex items-center justify-between p-3 text-sm text-white/90"
						role="menuitem"
						aria-label="GitHub Repository"
					>
						{{ $t('links.github') }}
						<nuxt-icon name="external-link" />
					</NuxtLink>
				</li>
				<li class="transition-colors rounded-sm hover:bg-white/10">
					<NuxtLink
						to="/settings"
						aria-label="Open settings"
						class="flex items-center justify-between p-3 text-sm text-white/90"
						role="menuitem"
					>
						{{ $t('settings.title') }}
					</NuxtLink>
				</li>
			</ul>
		</div>
	</section>
</template>

<script lang="ts" setup>
const searchQuery = ref('') // TODO: Implement search functionality

const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
	if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
		isDropdownOpen.value = false
	}
}

const toggleDropdown = () => {
	isDropdownOpen.value = !isDropdownOpen.value
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>
