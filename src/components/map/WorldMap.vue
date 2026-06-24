<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { Region } from '@/types'
import { useI18n } from '@/composables/useI18n'

const { t, getRegionName, getContinentName, getFlagUrl } = useI18n()

const props = defineProps<{
  regions: Region[]
  selectedRegion: Region | null
}>()

const emit = defineEmits<{
  (e: 'select', region: Region): void
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 地区坐标映射 [经度, 纬度]
const regionCoords: Record<string, [number, number]> = {
  // 亚洲
  japan: [139.69, 35.69],
  china: [104.19, 35.86],
  thailand: [100.5, 13.75],
  myanmar: [96.18, 16.87],
  singapore: [103.82, 1.35],
  indonesia: [106.85, -6.21],
  iran: [51.42, 35.69],
  turkey: [35.24, 38.96],
  cyprus: [33.38, 35.19],
  // 欧洲
  uk: [-3.44, 55.38],
  france: [2.21, 46.23],
  germany: [10.45, 51.17],
  russia: [105.31, 61.52],
  norway: [10.75, 59.91],
  finland: [25.75, 61.92],
  greece: [21.82, 39.07],
  italy: [12.57, 41.87],
  // 非洲
  egypt: [30.04, 26.82],
  ethiopia: [40.49, 9.15],
  kenya: [36.82, -1.29],
  // 北美洲
  usa: [-95.71, 37.09],
  canada: [-106.35, 56.13],
  mexico: [-99.13, 19.43],
  // 南美洲
  brazil: [-51.93, -14.24],
  // 大洋洲
  australia: [133.77, -25.27],
}

// 大洲颜色
const continentColors: Record<string, string> = {
  '亚洲': '#F59E0B',
  '欧洲': '#3B82F6',
  '非洲': '#EF4444',
  '北美洲': '#10B981',
  '南美洲': '#8B5CF6',
  '大洋洲': '#EC4899',
}

const initChart = async () => {
  if (!chartRef.value) {
    console.error('Chart ref is null')
    return
  }

  console.log('Initializing chart...')
  chartInstance = echarts.init(chartRef.value)
  console.log('Chart instance created')

  // 注册世界地图
  try {
    // 使用内置世界地图数据
    console.log('Loading world GeoJSON...')
    const worldGeoJson = await fetch('https://cdn.jsdelivr.net/npm/echarts/map/json/world.json').then(res => res.json())
    console.log('GeoJSON loaded, countries:', Object.keys(worldGeoJson.features || {}).length)
    echarts.registerMap('world', worldGeoJson)
    console.log('World map registered')
  } catch (e) {
    console.error('Failed to load world map:', e)
    return
  }

  // 准备散点数据
  console.log('Regions for scatter:', props.regions.map(r => ({ name: r.name, cats: r.cats?.length })))
  const scatterData = props.regions.map(region => {
    const coords = regionCoords[region.id] || [0, 0]
    console.log(`Region ${region.name} (${region.id}) coords:`, coords, 'cats:', region.cats?.length)
    return {
      name: region.name,
      value: [...coords, region.cats?.length || 0],
      region: region,
      itemStyle: {
        color: continentColors[region.continent] || '#6B7280',
      },
    }
  })

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#eee',
      borderWidth: 1,
      padding: [12, 16],
      textStyle: {
        color: '#333',
        fontSize: 14,
      },
      formatter: (params: any) => {
        if (params.data && params.data.region) {
          const region = params.data.region
          const flagUrl = getFlagUrl(region.id)
          return `
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <img src="${flagUrl}" style="width: 28px; height: 20px; object-fit: contain;" />
              ${getRegionName(region)}
            </div>
            <div style="color: #666; margin-bottom: 4px;">
              ${region.nameEn} · ${getContinentName(region.continent)}
            </div>
            <div style="color: #F59E0B; font-weight: 500;">
              🐱 ${region.cats?.length || 0}${t('catsCount')}
            </div>
            <div style="color: #999; font-size: 12px; margin-top: 4px;">${t('clickToView')}</div>
          `
        }
        return params.name || ''
      },
    },
    geo: {
      map: 'world',
      roam: true,
      zoom: 1.2,
      center: [0, 20],
      scaleLimit: {
        min: 1,
        max: 5,
      },
      itemStyle: {
        areaColor: '#E8F5E9',
        borderColor: '#4CAF50',
        borderWidth: 0.8,
      },
      emphasis: {
        itemStyle: {
          areaColor: '#C8E6C9',
          borderColor: '#2E7D32',
          borderWidth: 1.5,
        },
        label: {
          show: false,
        },
      },
      regions: [
        // 亚洲
        { name: 'China', itemStyle: { areaColor: '#FFF3E0' } },
        { name: 'Japan', itemStyle: { areaColor: '#FFF3E0' } },
        { name: 'Thailand', itemStyle: { areaColor: '#FFF3E0' } },
        { name: 'Myanmar', itemStyle: { areaColor: '#FFF3E0' } },
        { name: 'Singapore', itemStyle: { areaColor: '#FFF3E0' } },
        { name: 'Indonesia', itemStyle: { areaColor: '#FFF3E0' } },
        { name: 'Iran', itemStyle: { areaColor: '#FFF3E0' } },
        { name: 'Turkey', itemStyle: { areaColor: '#FFF3E0' } },
        { name: 'Cyprus', itemStyle: { areaColor: '#FFF3E0' } },
        // 欧洲
        { name: 'United Kingdom', itemStyle: { areaColor: '#E3F2FD' } },
        { name: 'France', itemStyle: { areaColor: '#E3F2FD' } },
        { name: 'Germany', itemStyle: { areaColor: '#E3F2FD' } },
        { name: 'Russia', itemStyle: { areaColor: '#E3F2FD' } },
        { name: 'Norway', itemStyle: { areaColor: '#E3F2FD' } },
        { name: 'Finland', itemStyle: { areaColor: '#E3F2FD' } },
        { name: 'Greece', itemStyle: { areaColor: '#E3F2FD' } },
        { name: 'Italy', itemStyle: { areaColor: '#E3F2FD' } },
        // 非洲
        { name: 'Egypt', itemStyle: { areaColor: '#FFEBEE' } },
        { name: 'Ethiopia', itemStyle: { areaColor: '#FFEBEE' } },
        { name: 'Kenya', itemStyle: { areaColor: '#FFEBEE' } },
        // 北美洲
        { name: 'United States', itemStyle: { areaColor: '#E8F5E9' } },
        { name: 'Canada', itemStyle: { areaColor: '#E8F5E9' } },
        { name: 'Mexico', itemStyle: { areaColor: '#E8F5E9' } },
        // 南美洲
        { name: 'Brazil', itemStyle: { areaColor: '#F3E5F5' } },
        // 大洋洲
        { name: 'Australia', itemStyle: { areaColor: '#FCE4EC' } },
      ],
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: scatterData,
        symbolSize: (val: number[]) => {
          const catCount = val[2] || 1
          return Math.max(20, Math.min(40, catCount * 8))
        },
        showEffectOn: 'emphasis',
        rippleEffect: {
          brushType: 'stroke',
          scale: 4,
          period: 3,
        },
        label: {
          show: true,
          formatter: '🐱',
          position: 'inside',
          fontSize: 16,
          color: '#fff',
        },
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
        },
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 3,
          },
          label: {
            fontSize: 20,
          },
        },
      },
    ],
  }

  chartInstance.setOption(option)

  // 散点系列点击事件
  chartInstance.on('click', (params: any) => {
    console.log('=== Chart click ===')
    console.log('params.componentType:', params.componentType)
    console.log('params.data:', params.data)

    // 如果点击的是散点，直接获取region
    if (params.data && params.data.region) {
      console.log('Scatter click - emitting region:', params.data.region.name)
      emit('select', params.data.region)
      return
    }

    // 如果点击的是地图区域，通过name查找region
    if (params.name) {
      console.log('Geo click - name:', params.name)
      // 尝试通过国家名匹配region
      const countryToRegion: Record<string, string> = {
        'China': 'china',
        'Japan': 'japan',
        'Thailand': 'thailand',
        'Myanmar': 'myanmar',
        'Singapore': 'singapore',
        'Indonesia': 'indonesia',
        'Iran': 'iran',
        'Turkey': 'turkey',
        'Cyprus': 'cyprus',
        'United Kingdom': 'uk',
        'France': 'france',
        'Germany': 'germany',
        'Russia': 'russia',
        'Norway': 'norway',
        'Finland': 'finland',
        'Greece': 'greece',
        'Italy': 'italy',
        'Egypt': 'egypt',
        'Ethiopia': 'ethiopia',
        'Kenya': 'kenya',
        'United States': 'usa',
        'Canada': 'canada',
        'Mexico': 'mexico',
        'Brazil': 'brazil',
        'Australia': 'australia',
      }
      const regionId = countryToRegion[params.name]
      if (regionId) {
        const region = props.regions.find(r => r.id === regionId)
        if (region) {
          console.log('Geo click - found region:', region.name)
          emit('select', region)
        }
      }
    }
  })
}

// 监听选中状态变化
watch(() => props.selectedRegion, (newVal) => {
  if (!chartInstance) return

  const scatterData = props.regions.map(region => {
    const coords = regionCoords[region.id] || [0, 0]
    const isSelected = newVal?.id === region.id
    return {
      name: region.name,
      value: [...coords, region.cats?.length || 0],
      region: region,
      itemStyle: {
        color: continentColors[region.continent] || '#6B7280',
        borderColor: isSelected ? '#fff' : undefined,
        borderWidth: isSelected ? 3 : undefined,
        shadowBlur: isSelected ? 20 : 10,
      },
      symbolSize: isSelected ? 40 : Math.max(15, Math.min(35, (region.cats?.length || 1) * 8)),
    }
  })

  chartInstance.setOption({
    series: [
      { data: scatterData },
      { data: scatterData.map(d => ({ ...d, symbolSize: d.symbolSize })) },
    ],
  })
})

// 窗口大小变化时重新渲染
const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chartInstance?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div ref="chartRef" class="w-full h-full min-h-[400px]"></div>
</template>

<style scoped>
</style>