<template>
	<NuxtLayout>
		<div class="flex gap-6 p-10 bg-gradient-to-b from-[#5eac96] to-[#f79bd2] bg-opacity-70 rounded-lg text-black">
			<div class="flex flex-col xl:flex-row bg-gradient-to-t from-[#5eac96] to-[#f79bd2] bg-opacity-70 p-10 w-full h-full">
				<!-- Contenido principal -->
				<div class="flex flex-col gap-8 xl:w-1/2">
					<nuxt-icon
						name="logo_name"
						class="text-7xl"
					/>

					<h2 class="text-4xl font-bold">
						{{ $t('download_repo') }}
					</h2>

					<span class="text-lg">
						{{ $t('download_repo_description') }}
					</span>

					<a
						href="https://github.com/DeibidSE/spotify-clone.git"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-center gap-3 py-2 px-3 text-white bg-[#202020] w-fit rounded-xl"
					>
						<nuxt-icon
							name="github"
							class="text-2xl"
						/>
						<div class="flex flex-col items-start justify-center">
							<div class="text-[0.65rem] text-left font-light">
								{{ $t('download_from') }}
							</div>
							<div class="font-sans text-lg font-semibold leading-4">
								{{ $t('official_repo') }}
							</div>
						</div>
					</a>
				</div>

				<!-- Imagen de instalación -->
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
