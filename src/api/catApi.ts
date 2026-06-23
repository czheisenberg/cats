import type { Cat, Region } from '@/types'
import data from '@/data/cats.json'

// 从本地JSON数据读取，不再调用后端API
// 这样可以部署到GitHub Pages等静态托管服务

export const getRegions = (): Promise<Region[]> => {
  // 为每个地区添加猫咪数据
  const regions = data.regions as Region[]
  const cats = data.cats as Cat[]
  return Promise.resolve(regions.map(region => ({
    ...region,
    cats: cats.filter(c => c.regionId === region.id)
  })))
}

export const getRegion = (id: string): Promise<Region | undefined> => {
  const regions = data.regions as Region[]
  const cats = data.cats as Cat[]
  const region = regions.find(r => r.id === id)
  if (!region) return Promise.resolve(undefined)
  return Promise.resolve({
    ...region,
    cats: cats.filter(c => c.regionId === id)
  })
}

export const getCats = (): Promise<Cat[]> => {
  return Promise.resolve(data.cats as Cat[])
}

// 辅助函数：根据 regionId 获取地区信息
const getRegionById = (regionId: string): Region | undefined => {
  const regions = data.regions as Region[]
  return regions.find(r => r.id === regionId)
}

// 为猫咪数据添加地区信息
const enrichCatWithRegion = (cat: Cat): Cat => {
  const region = getRegionById(cat.regionId)
  return region ? { ...cat, region } : cat
}

export const getCat = (id: string): Promise<Cat | undefined> => {
  const cat = (data.cats as Cat[]).find(c => c.id === id)
  return Promise.resolve(cat ? enrichCatWithRegion(cat) : undefined)
}

export const getPopularCats = (): Promise<Cat[]> => {
  return Promise.resolve((data.cats as Cat[]).filter(c => c.isPopular).map(enrichCatWithRegion))
}

export const getCatsByRegion = (regionId: string): Promise<Cat[]> => {
  return Promise.resolve((data.cats as Cat[]).filter(c => c.regionId === regionId).map(enrichCatWithRegion))
}

export const getRelatedCats = (id: string): Promise<Cat[]> => {
  const cat = (data.cats as Cat[]).find(c => c.id === id)
  if (!cat) return Promise.resolve([])
  return Promise.resolve(
    (data.cats as Cat[]).filter(c => c.regionId === cat.regionId && c.id !== id).map(enrichCatWithRegion)
  )
}

// 搜索猫咪（支持中英文名称搜索）
export const searchCats = (keyword: string): Promise<Cat[]> => {
  if (!keyword.trim()) return Promise.resolve([])
  const k = keyword.toLowerCase().trim()
  const results = (data.cats as Cat[]).filter(cat =>
    cat.name.toLowerCase().includes(k) ||
    cat.nameEn.toLowerCase().includes(k) ||
    cat.description?.toLowerCase().includes(k) ||
    cat.descriptionEn?.toLowerCase().includes(k)
  ).map(enrichCatWithRegion)
  return Promise.resolve(results)
}
