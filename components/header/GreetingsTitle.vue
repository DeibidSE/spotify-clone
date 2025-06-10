<template>
	<h1 class="text-3xl font-bold">
		{{ greeting }}
	</h1>
</template>

<script setup lang="ts">
const currentTime = new Date()
const currentHour = currentTime.getHours()
const { t } = useI18n()

let greeting = ''

if (currentHour < 12) {
	greeting = t('greetings.morning')
} else if (currentHour < 18) {
	greeting = t('greetings.afternoon')
} else {
	greeting = t('greetings.evening')
}
</script>
