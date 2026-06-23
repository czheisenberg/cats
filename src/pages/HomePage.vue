<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import WorldMap from '@/components/map/WorldMap.vue'
import CatCard from '@/components/cat/CatCard.vue'
import { getRegions, getPopularCats, getCatsByRegion, searchCats } from '@/api/catApi'
import { useI18n } from '@/composables/useI18n'
import type { Region, Cat } from '@/types'

const { locale, t, getCatName, getRegionName, getContinentName } = useI18n()

const router = useRouter()

const regions = ref<Region[]>([])
const popularCats = ref<Cat[]>([])
const selectedRegion = ref<Region | null>(null)
const selectedRegionCats = ref<Cat[]>([])
const loading = ref(true)
const regionLoading = ref(false)

// 搜索相关
const searchKeyword = ref('')
const searchResults = ref<Cat[]>([])
const isSearching = ref(false)

const isSearchMode = computed(() => searchKeyword.value.trim().length > 0)

const displayCats = computed(() => {
  if (isSearchMode.value) {
    return searchResults.value
  }
  if (selectedRegion.value && selectedRegionCats.value.length > 0) {
    return selectedRegionCats.value
  }
  return popularCats.value
})

// 搜索防抖
let searchTimer: ReturnType<typeof setTimeout> | null = null
watch(searchKeyword, (newVal) => {
  if (searchTimer) clearTimeout(searchTimer)

  if (!newVal.trim()) {
    searchResults.value = []
    isSearching.value = false
    return
  }

  isSearching.value = true
  searchTimer = setTimeout(async () => {
    const results = await searchCats(newVal)
    searchResults.value = results
    isSearching.value = false
  }, 200)
})

const clearSearch = () => {
  searchKeyword.value = ''
  searchResults.value = []
}

const fetchData = async () => {
  try {
    const [regionsData, catsData] = await Promise.all([
      getRegions(),
      getPopularCats(),
    ])
    regions.value = regionsData
    popularCats.value = catsData
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    loading.value = false
  }
}

const handleRegionSelect = async (region: Region) => {
  // 如果点击已选中的地区，则取消选中
  if (selectedRegion.value?.id === region.id) {
    selectedRegion.value = null
    selectedRegionCats.value = []
    return
  }

  regionLoading.value = true
  selectedRegion.value = region

  try {
    const cats = await getCatsByRegion(region.id)
    selectedRegionCats.value = cats
  } catch (error) {
    console.error('Failed to fetch region cats:', error)
    selectedRegionCats.value = []
  } finally {
    regionLoading.value = false
  }
}

const handleCatClick = (cat: Cat) => {
  router.push(`/cat/${cat.id}`)
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
    <!-- Header -->
    <header class="py-8 px-6 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
        🐱 {{ t('title') }}
      </h1>
      <p class="text-gray-600 max-w-xl mx-auto mb-6">
        {{ t('subtitle') }}
      </p>

      <!-- Search Box -->
      <div class="max-w-md mx-auto relative">
        <div class="relative">
          <input
            v-model="searchKeyword"
            type="text"
            :placeholder="locale === 'zh' ? '搜索猫咪品种，如：布偶猫' : 'Search cat breeds, e.g. Ragdoll'"
            class="w-full px-5 py-3 pl-12 pr-10 rounded-full border-2 border-amber-200 focus:border-amber-400 focus:outline-none shadow-md text-gray-700 placeholder-gray-400 transition-all"
          />
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <button
            v-if="searchKeyword"
            @click="clearSearch"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </header>

    <!-- Map Section -->
    <section class="relative px-6 pb-8">
      <div class="max-w-5xl mx-auto">
        <!-- Region Filter Pills -->
        <div class="flex flex-wrap gap-2 justify-center mb-6">
          <button
            v-for="region in regions"
            :key="region.id"
            class="px-3 py-1.5 rounded-full text-sm transition-all duration-300"
            :class="[selectedRegion?.id === region.id ? 'bg-amber-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-amber-100']"
            @click="handleRegionSelect(region)"
          >
            {{ getRegionName(region) }}
          </button>
        </div>

        <!-- Map Container -->
        <div class="relative bg-white rounded-3xl shadow-xl overflow-hidden">
          <!-- Loading State -->
          <div
            v-if="loading"
            class="absolute inset-0 flex items-center justify-center bg-white/80 z-10"
          >
            <div class="text-center">
              <div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-gray-500">{{ t('loading') }}</p>
            </div>
          </div>

          <!-- World Map -->
          <div class="relative w-full aspect-[2/1] min-h-[400px]">
            <WorldMap
              :regions="regions"
              :selected-region="selectedRegion"
              @select="handleRegionSelect"
            />
          </div>

          <!-- Selected Region Info -->
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 -translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
          >
            <div
              v-if="selectedRegion"
              class="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-200"
            >
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white text-xl">
                  🌍
                </div>
                <div>
                  <h2 class="font-bold text-lg text-gray-800">{{ getRegionName(selectedRegion) }}</h2>
                  <p class="text-sm text-gray-500">{{ getContinentName(selectedRegion.continent) }} · {{ selectedRegionCats.length }}{{ t('catsCount') }}</p>
                </div>
              </div>
              <p v-if="selectedRegion.description" class="text-gray-600 text-sm">
                {{ selectedRegion.description }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Cats Display Section -->
    <section class="px-6 pb-16">
      <div class="max-w-5xl mx-auto">
        <!-- Loading State -->
        <div v-if="regionLoading || isSearching" class="text-center py-12">
          <div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-500">{{ t('loading') }}</p>
        </div>

        <!-- Cats Grid -->
        <div v-else>
          <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
            <template v-if="isSearchMode">
              {{ locale === 'zh' ? `搜索结果：找到 ${searchResults.length} 种猫咪` : `Search Results: ${searchResults.length} cats found` }}
            </template>
            <template v-else>
              {{ selectedRegion ? `${getRegionName(selectedRegion)}${t('regionCats')}` : t('popularCats') }}
            </template>
          </h2>

          <div v-if="displayCats.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CatCard
              v-for="cat in displayCats"
              :key="cat.id"
              :cat="cat"
              @select="handleCatClick"
            />
          </div>

          <div v-if="displayCats.length === 0 && !loading" class="text-center py-12">
            <p class="text-4xl mb-4">🔍</p>
            <p class="text-gray-500">
              {{ isSearchMode ? (locale === 'zh' ? '没有找到相关猫咪' : 'No cats found') : t('noCatsYet') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-6 bg-gray-100">
      <div class="max-w-4xl mx-auto text-center text-gray-500 text-sm space-y-2">
        <p>{{ t('footer') }}</p>
        <p class="text-xs">{{ t('disclaimer') }}</p>
      </div>
    </footer>
  </div>
</template>
