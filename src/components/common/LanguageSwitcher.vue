<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { locale, setLocale, toggleLocale } = useI18n()
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      @click="setLocale('zh')"
      :class="[
        'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
        locale === 'zh'
          ? 'bg-amber-500 text-white shadow-md'
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      ]"
    >
      中文
    </button>
    <button
      @click="setLocale('en')"
      :class="[
        'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
        locale === 'en'
          ? 'bg-amber-500 text-white shadow-md'
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      ]"
    >
      EN
    </button>
  </div>
</template>
