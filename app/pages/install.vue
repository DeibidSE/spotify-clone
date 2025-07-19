<template>
	<NuxtLayout>
		<div class="flex h-full gap-6 p-10 text-black rounded-lg bg-gradient-to-b from-spotify-mint to-spotify-rose bg-opacity-70">
			<div class="flex flex-col w-full h-full p-10 xl:flex-row bg-gradient-to-t from-spotify-mint to-spotify-rose bg-opacity-70">
				<div class="flex flex-col gap-8 xl:w-1/2">
					<Icon
						name="my-icon:logo_name"
						class="text-7xl"
					/>

					<h2 class="text-4xl font-bold">
						{{ $t('download.repo.title') }}
					</h2>

					<span class="text-lg">
						{{ $t('download.repo.description') }}
					</span>

					<a
						href="https://github.com/DeibidSE/spotify-clone.git"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-center gap-3 px-3 py-2 text-white bg-spotify-deep-hover w-fit rounded-xl"
					>
						<Icon
							name="my-icon:github"
							class="text-2xl"
						/>
						<div class="flex flex-col items-start justify-center">
							<div class="text-[0.65rem] text-left font-light">
								{{ $t('download.from') }}
							</div>
							<div class="font-sans text-lg font-semibold leading-4">
								{{ $t('links.official_repo') }}
							</div>
						</div>
					</a>
				</div>

				<div class="flex items-center justify-center xl:w-1/2">
					<img
						loading="lazy"
						:src="`${$config.public.BASE_URL}/img/installation_process.webp`"
						alt="Proceso de instalación del clon de Spotify"
						class="object-contain aspect-square"
					>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>
