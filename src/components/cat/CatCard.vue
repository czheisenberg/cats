<script setup lang="ts">
import type { Cat } from '@/types'
import { useI18n } from '@/composables/useI18n'

const props = defineProps<{
  cat: Cat
}>()

const { t, getCatName, getRegionName, locale } = useI18n()

const emit = defineEmits<{
  (e: 'select', cat: Cat): void
}>()

const getSizeLabel = (size: string) => {
  const labels: Record<string, string> = {
    SMALL: t('small').replace('猫', ''),
    MEDIUM: t('medium').replace('猫', ''),
    LARGE: t('large').replace('猫', ''),
  }
  return labels[size] || size
}
</script>

<template>
  <div
    class="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
    @click="emit('select', cat)"
  >
    <!-- 图片 -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="cat.imageUrl"
        :alt="getCatName(cat)"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <!-- 热门标签 -->
      <div
        v-if="cat.isPopular"
        class="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full"
      >
        {{ t('popular') }}
      </div>
    </div>

    <!-- 内容 -->
    <div class="p-4">
      <div class="flex items-center gap-2 mb-2">
        <h3 class="font-bold text-lg text-gray-800">{{ getCatName(cat) }}</h3>
        <span class="text-xs text-gray-400">{{ cat.nameEn }}</span>
      </div>

      <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <span class="px-2 py-0.5 bg-amber-50 text-amber-600 rounded">{{ getRegionName(cat.region!) }}</span>
        <span class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{{ getSizeLabel(cat.size) }}</span>
      </div>

      <p class="text-sm text-gray-600 line-clamp-2">{{ locale === 'en' && cat.descriptionEn ? cat.descriptionEn : cat.description }}</p>

      <div class="mt-3 flex items-center justify-between text-xs text-gray-400">
        <span>{{ t('weight') }}: {{ cat.weightMin }}-{{ cat.weightMax }}kg</span>
        <span>{{ t('lifespan') }}: {{ cat.lifespanMin }}-{{ cat.lifespanMax }}{{ t('lifespan').includes('年') ? '' : ' years' }}</span>
      </div>
    </div>
  </div>
</template>
