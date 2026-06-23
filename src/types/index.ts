export interface Region {
  id: string
  name: string
  nameEn: string
  continent: string
  description?: string
  cats?: Cat[]
}

export interface Cat {
  id: string
  name: string
  nameEn: string
  regionId: string
  region?: Region
  imageUrl: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  weightMin: number
  weightMax: number
  lifespanMin: number
  lifespanMax: number
  description: string
  appearance: string
  personality: string
  careTips: string
  isPopular: boolean
  careTipsEn: string
  appearanceEn: string
  personalityEn: string
  descriptionEn: string
}
