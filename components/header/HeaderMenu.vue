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
			:tooltip-text="$t('home')"
			position="bottom"
		>
			<NuxtLink
				to="/"
				class="p-3 rounded-full bg-[#242424] hover:bg-[#2a2a2a] text-[#b3b3b3] hover:text-white hover:scale-105 transition-transform"
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
			<div class="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3b3b3] h-full">
				<ToolTip
					:tooltip-text="$t('search')"
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
				:placeholder="$t('search_placeholder')"
				class="w-full pl-12 pr-16 py-3 rounded-full bg-[#242424] text-white placeholder-[#b3b3b3] border border-transparent focus:border-white hover:border-[#2a2a2a] transition hover:bg-[#2a2a2a]"
				aria-label="Search"
			>
			<div class="absolute right-4 top-1/2 -translate-y-1/2 items-center text-[#b3b3b3] h-full">
				<ToolTip
					:tooltip-text="$t('explore')"
					position="bottom"
				>
					<NuxtLink
						to="/search"
						class="text-2xl"
						aria-label="Explore"
					>
						<span class="h-5 w-[1px] bg-[#b3b3b3] mr-3" />
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
					<span class="text-sm font-bold">{{ $t('install_app') }}</span>
				</NuxtLink>
			</div>

			<!-- News Button -->
			<ToolTip
				:tooltip-text="$t('whats_new')"
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
				:tooltip-text="$t('friends_activity')"
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
				class="w-12 h-12 text-center transition-transform bg-blue-400 border-8 border-gray-800 rounded-full hover:scale-105"
				aria-label="User Menu"
				@click="toggleDropdown"
			>
				<span class="text-sm font-bold text-black">D</span>
			</button>

			<ul
				v-show="isDropdownOpen"
				class="absolute right-0 z-50 w-40 p-1 mt-2 divide-y rounded-md shadow-lg bg-zinc-800"
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
						{{ $t('github') }}
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
						{{ $t('settings') }}
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
