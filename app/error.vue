<template>
	<main class="flex items-center justify-center min-h-screen p-8 sm:p-16 bg-gradient-to-br bg-spotify-obsidian via-spotify-dusk-transition to-spotify-electric-green/80">
		<div class="flex flex-col items-center w-full max-w-xl gap-6 p-8 text-center border shadow-xl sm:p-12 rounded-xl bg-spotify-obsidian border-zinc-700 backdrop-blur-md">
			<p class="font-extrabold text-spotify-electric-green text-7xl sm:text-9xl drop-shadow-lg">
				Oops!
			</p>
			<h1 class="text-3xl font-bold tracking-tight text-white sm:text-5xl">
				Page not found
			</h1>
			<p class="text-base leading-relaxed text-white/70 sm:text-lg">
				Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
			</p>
			<div class="mt-6">
				<a
					:href="$config.public.BASE_URL"
					class="inline-flex items-center justify-center gap-2 px-5 py-3 font-medium text-black transition-colors rounded-md shadow-md bg-spotify-electric-green hover:bg-spotify-lime-pop focus:outline-none focus:ring-2 focus:ring-spotify-electric-green"
				>
					← Back to Home
				</a>
			</div>
		</div>
	</main>
</template>
