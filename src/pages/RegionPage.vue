<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CatCard from '@/components/cat/CatCard.vue'
import { getRegion } from '@/api/catApi'
import { useI18n } from '@/composables/useI18n'
import type { Region, Cat } from '@/types'

const { t, getRegionName, getContinentName, getFlagUrl } = useI18n()

const route = useRoute()
const router = useRouter()

const region = ref<Region | null>(null)
const loading = ref(true)

const regionId = route.params.id as string

const fetchData = async () => {
  try {
    const data = await getRegion(regionId)
    region.value = data
  } catch (error) {
    console.error('Failed to fetch region:', error)
  } finally {
    loading.value = false
  }
}

const handleCatClick = (cat: Cat) => {
  router.push(`/cat/${cat.id}`)
}

const handleBack = () => {
  router.push('/')
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-500">{{ t('loading') }}</p>
      </div>
    </div>

    <!-- Content -->
    <template v-else-if="region">
      <!-- Header -->
      <header class="bg-white shadow-md">
        <div class="max-w-5xl mx-auto px-6 py-6">
          <button
            class="mb-4 px-4 py-2 text-amber-600 hover:text-amber-700 flex items-center gap-2"
            @click="handleBack"
          >
            <span>←</span>
            <span>{{ t('home') }}</span>
          </button>

          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden shadow-md">
              <img :src="getFlagUrl(region.id)" :alt="getRegionName(region)" class="w-12 h-9 object-contain" />
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800">{{ getRegionName(region) }}</h1>
              <p class="text-gray-500">{{ getContinentName(region.continent) }} · {{ region.cats?.length || 0 }}{{ t('catsCount') }}</p>
            </div>
          </div>

          <p v-if="region.description" class="mt-4 text-gray-600">
            {{ region.description }}
          </p>
        </div>
      </header>

      <!-- Cats Grid -->
      <section class="max-w-5xl mx-auto px-6 py-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('popularCats') }}</h2>

        <div v-if="region.cats?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CatCard
            v-for="cat in region.cats"
            :key="cat.id"
            :cat="cat"
            @select="handleCatClick"
          />
        </div>

        <div v-else class="text-center py-12">
          <p class="text-gray-500">{{ t('noCatsYet') }}</p>
        </div>
      </section>
    </template>

    <!-- Not Found -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <p class="text-gray-500 text-xl mb-4">{{ t('catNotFound') }}</p>
        <button
          class="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          @click="handleBack"
        >
          {{ t('home') }}
        </button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="py-8 px-6 bg-gray-100">
      <div class="max-w-4xl mx-auto text-center text-gray-500 text-sm space-y-2">
        <p>{{ t('footer') }}</p>
        <p class="text-xs">{{ t('disclaimer') }}</p>
      </div>
    </footer>
  </div>
</template>
