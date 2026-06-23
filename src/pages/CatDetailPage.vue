<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CatCard from '@/components/cat/CatCard.vue'
import { getCat, getRelatedCats } from '@/api/catApi'
import { useI18n } from '@/composables/useI18n'
import type { Cat } from '@/types'

const { t, getCatName, getRegionName, locale } = useI18n()

const route = useRoute()
const router = useRouter()

const cat = ref<Cat | null>(null)
const relatedCats = ref<Cat[]>([])
const loading = ref(true)
const showImageViewer = ref(false)

const openImageViewer = () => {
  showImageViewer.value = true
  document.body.style.overflow = 'hidden'
}

const closeImageViewer = () => {
  showImageViewer.value = false
  document.body.style.overflow = ''
}

const catId = computed(() => route.params.id as string)

const getSizeLabel = (size: string) => {
  const labels: Record<string, string> = {
    SMALL: t('small'),
    MEDIUM: t('medium'),
    LARGE: t('large'),
  }
  return labels[size] || size
}

const fetchData = async () => {
  loading.value = true
  try {
    const [catData, relatedData] = await Promise.all([
      getCat(catId.value),
      getRelatedCats(catId.value),
    ])
    cat.value = catData
    relatedCats.value = relatedData
  } catch (error) {
    console.error('Failed to fetch cat:', error)
  } finally {
    loading.value = false
  }
}

const handleRelatedCatClick = (relatedCat: Cat) => {
  router.push(`/cat/${relatedCat.id}`)
}

const handleBack = () => {
  router.push('/')
}

// 监听路由参数变化，重新获取数据并回到顶部
watch(catId, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchData()
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    <template v-else-if="cat">
      <!-- Hero Section -->
      <section class="relative">
        <div class="h-64 md:h-80 overflow-hidden">
          <img
            :src="cat.imageUrl"
            :alt="getCatName(cat)"
            class="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
            @click="openImageViewer"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        <!-- Back Button -->
        <button
          class="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2 hover:bg-white transition-colors"
          @click="handleBack"
        >
          <span>←</span>
          <span>{{ t('back') }}</span>
        </button>
      </section>

      <!-- Main Content -->
      <section class="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <!-- Basic Info Card -->
        <div class="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Image -->
            <div class="w-full md:w-1/3">
              <img
                :src="cat.imageUrl"
                :alt="getCatName(cat)"
                class="w-full h-64 object-cover rounded-2xl shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                @click="openImageViewer"
              />
              <p class="text-center text-sm text-gray-400 mt-2">
                {{ locale === 'zh' ? '点击图片放大查看' : 'Click image to enlarge' }}
              </p>
            </div>

            <!-- Info -->
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <h1 class="text-3xl font-bold text-gray-800">{{ getCatName(cat) }}</h1>
                <span v-if="cat.isPopular" class="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                  {{ t('popular') }}
                </span>
              </div>

              <p class="text-gray-500 text-lg mb-4">{{ cat.nameEn }}</p>

              <div class="flex flex-wrap gap-3 mb-6">
                <span class="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                  🌍 {{ getRegionName(cat.region!) }}
                </span>
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {{ getSizeLabel(cat.size) }}
                </span>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  ⚖️ {{ cat.weightMin }}-{{ cat.weightMax }}kg
                </span>
                <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  ⏱️ {{ cat.lifespanMin }}-{{ cat.lifespanMax }}{{ t('lifespan').includes('年') ? '年' : ' years' }}
                </span>
              </div>

              <p class="text-gray-600 leading-relaxed">{{ locale === 'en' && cat.descriptionEn ? cat.descriptionEn : cat.description }}</p>
            </div>
          </div>
        </div>

        <!-- Detail Sections -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <!-- Appearance -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl">
                🎨
              </div>
              <h2 class="text-xl font-bold text-gray-800">{{ t('appearance') }}</h2>
            </div>
            <p class="text-gray-600 leading-relaxed">{{ locale === 'en' && cat.appearanceEn ? cat.appearanceEn : cat.appearance }}</p>
          </div>

          <!-- Personality -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-xl">
                💝
              </div>
              <h2 class="text-xl font-bold text-gray-800">{{ t('personality') }}</h2>
            </div>
            <p class="text-gray-600 leading-relaxed">{{ locale === 'en' && cat.personalityEn ? cat.personalityEn : cat.personality }}</p>
          </div>
        </div>

        <!-- Care Tips -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
              🏠
            </div>
            <h2 class="text-xl font-bold text-gray-800">{{ t('careTips') }}</h2>
          </div>
          <p class="text-gray-600 leading-relaxed">{{ locale === 'en' && cat.careTipsEn ? cat.careTipsEn : cat.careTips }}</p>
        </div>

        <!-- Related Cats -->
        <div v-if="relatedCats.length > 0" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('relatedCats') }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CatCard
              v-for="relatedCat in relatedCats"
              :key="relatedCat.id"
              :cat="relatedCat"
              @select="handleRelatedCatClick"
            />
          </div>
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

    <!-- Image Viewer Modal -->
    <div
      v-if="showImageViewer"
      class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      @click="closeImageViewer"
    >
      <img
        :src="cat?.imageUrl"
        :alt="cat ? getCatName(cat) : ''"
        class="max-h-[90vh] max-w-full object-contain"
        @click.stop
      />
      <button
        class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white text-xl flex items-center justify-center hover:bg-white/30 transition-colors"
        @click="closeImageViewer"
      >
        ✕
      </button>
    </div>

    <!-- Footer -->
    <footer class="py-8 px-6 bg-gray-100 mt-8">
      <div class="max-w-4xl mx-auto text-center text-gray-500 text-sm space-y-2">
        <p>{{ t('footer') }}</p>
        <p class="text-xs">{{ t('disclaimer') }}</p>
      </div>
    </footer>
  </div>
</template>
