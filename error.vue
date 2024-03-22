<template>
  <main class="flex items-center w-full h-screen p-8 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-green-600/80 sm:p-16">
    <div class="flex flex-col items-center justify-center w-full h-full gap-6 p-6 mx-auto text-center border-2 rounded-lg bg-zinc-900">
      <p class="font-semibold text-white sm:text-9xl text-8xl">
        Oops!
      </p>
      <h1 class="text-3xl font-bold text-red-600 sm:text-5xl">
        Page not found
      </h1>
      <p class="text-base text-white/70">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div class="flex items-center justify-center gap-x-6">
        <a :href="$config.public.BASE_URL" class="rounded-md bg-green-500 px-3.5 py-2.5 text-light shadow-xl hover:bg-green-400" role="button">
          Go back to the main page
        </a>
      </div>
    </div>
  </main>
</template>
