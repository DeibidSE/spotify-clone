<template>
  <NuxtLayout>
    <div class="flex flex-col gap-6 px-6 py-4">
      <header class="flex flex-col py-6">
        <h1 class="text-4xl font-bold">
          {{ $t('whats_new') }}
        </h1>
        <span class="text-zinc-400">{{ $t('whats_new_header') }}</span>
      </header>

      <section class="flex flex-col items-center justify-center h-full gap-4">
        <h1 class="text-4xl font-bold">
          {{ $t('whats_new_no_news_title') }}
        </h1>
        <span class="text-white">{{ $t('whats_new_no_news_body') }}</span>
      </section>
    </div>
  </NuxtLayout>
</template>
