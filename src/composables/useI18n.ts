import { ref, computed } from 'vue'
import { messages, type Locale, type MessageKey } from '@/i18n/messages'

// 当前语言
const currentLocale = ref<Locale>('zh')

// 语言切换
export const useI18n = () => {
  const locale = computed(() => currentLocale.value)

  const t = (key: MessageKey): string => {
    return messages[currentLocale.value][key] || key
  }

  const setLocale = (newLocale: Locale) => {
    currentLocale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }

  const toggleLocale = () => {
    setLocale(currentLocale.value === 'zh' ? 'en' : 'zh')
  }

  // 获取猫咪名称（根据语言）
  const getCatName = (cat: { name: string; nameEn: string }) => {
    return currentLocale.value === 'zh' ? cat.name : cat.nameEn
  }

  // 获取地区名称（根据语言）
  const getRegionName = (region: { name: string; nameEn: string }) => {
    return currentLocale.value === 'zh' ? region.name : region.nameEn
  }

  // 获取大洲名称（根据语言）
  const getContinentName = (continent: string) => {
    const map: Record<string, string> = {
      '亚洲': currentLocale.value === 'zh' ? '亚洲' : 'Asia',
      '欧洲': currentLocale.value === 'zh' ? '欧洲' : 'Europe',
      '非洲': currentLocale.value === 'zh' ? '非洲' : 'Africa',
      '北美洲': currentLocale.value === 'zh' ? '北美洲' : 'North America',
      '南美洲': currentLocale.value === 'zh' ? '南美洲' : 'South America',
      '大洋洲': currentLocale.value === 'zh' ? '大洋洲' : 'Oceania',
    }
    return map[continent] || continent
  }

  // 获取国旗图片URL
  const getFlagUrl = (regionId: string): string => {
    const countryCodeMap: Record<string, string> = {
      japan: 'JP',
      china: 'CN',
      thailand: 'TH',
      myanmar: 'MM',
      singapore: 'SG',
      indonesia: 'ID',
      iran: 'IR',
      turkey: 'TR',
      cyprus: 'CY',
      uk: 'GB',
      france: 'FR',
      germany: 'DE',
      russia: 'RU',
      norway: 'NO',
      finland: 'FI',
      greece: 'GR',
      italy: 'IT',
      egypt: 'EG',
      ethiopia: 'ET',
      kenya: 'KE',
      usa: 'US',
      canada: 'CA',
      mexico: 'MX',
      brazil: 'BR',
      australia: 'AU',
    }
    const code = countryCodeMap[regionId] || regionId.toUpperCase()
    return `https://flagcdn.com/w40/${code.toLowerCase()}.png`
  }

  // 初始化语言
  const initLocale = () => {
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && (savedLocale === 'zh' || savedLocale === 'en')) {
      currentLocale.value = savedLocale
    }
  }

  return {
    locale,
    t,
    setLocale,
    toggleLocale,
    getCatName,
    getRegionName,
    getContinentName,
    getFlagUrl,
    initLocale,
  }
}
