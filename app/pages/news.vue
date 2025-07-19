<template>
	<NuxtLayout>
		<div class="flex flex-col gap-6 px-6 py-4">
			<header class="flex flex-col py-6">
				<h1 class="text-4xl font-bold">
					{{ $t('updates.title') }}
				</h1>
				<span class="text-spotify-icon-light">{{ $t('updates.header') }}</span>
			</header>

			<section class="flex flex-col items-center justify-center h-full gap-4">
				<h1 class="text-4xl font-bold">
					{{ $t('updates.no_news.title') }}
				</h1>
				<span class="text-white">{{ $t('updates.no_news.body') }}</span>
			</section>
		</div>
	</NuxtLayout>
</template>
