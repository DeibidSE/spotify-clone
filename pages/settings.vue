<template>
  <NuxtLayout>
    <div class="flex flex-col gap-4 p-8 mx-auto text-left max-w-[900px]">
      <header class="flex flex-col py-6">
        <h1 class="text-3xl font-bold">
          {{ $t('settings') }}
        </h1>
      </header>
      <section class="flex flex-col w-full">
        <div class="flex flex-col w-full gap-2">
          <h2 class="w-full text-lg font-bold">
            {{ $t('language') }}
          </h2>
          <div class="grid items-center w-full grid-cols-[2fr_1fr] gap-6">
            <span class="flex w-full text-sm text-gray-400">{{ $t('language_description') }}</span>
            <select
              v-model="selectedLocale"
              class="bg-[#333] rounded text-white/70 text-sm font-normal h-8 tracking-wide w-full pl-3 pr-8 truncate"
            >
              <option v-for="lang in locales" :key="lang.code" :value="lang.code">
                {{ lang.name }}
              </option>
            </select>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { locales, locale, setLocale } = useI18n()

const selectedLocale = ref(locale.value)

watch(selectedLocale, (newLocale) => {
  setLocale(newLocale)
})
</script>
