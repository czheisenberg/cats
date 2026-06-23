<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'

const { initLocale } = useI18n()

onMounted(() => {
  initLocale()
})
</script>

<template>
  <div class="relative">
    <router-view />

    <!-- 全局语言切换器 -->
    <div class="fixed top-4 right-4 z-50">
      <LanguageSwitcher />
    </div>
  </div>
</template>
