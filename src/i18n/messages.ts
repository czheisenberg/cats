// 语言配置文件
export const messages = {
  zh: {
    // 首页
    title: '喵星人环游记',
    subtitle: '探索世界各地的神奇猫咪',
    popularCats: '热门猫咪推荐',
    regionCats: '的猫咪',
    allRegions: '所有地区',
    noCatsYet: '该地区暂无猫咪数据',
    clickToView: '点击查看详情',
    catsCount: '种猫咪',
    back: '返回',
    home: '首页',

    // 猫咪详情页
    appearance: '外观特征',
    personality: '性格特点',
    careTips: '饲养建议',
    relatedCats: '同地区其他猫咪',
    catNotFound: '猫咪未找到',
    loading: '加载中...',
    weight: '体重',
    lifespan: '寿命',
    size: '体型',
    popular: '热门',

    // 体型
    small: '小型猫',
    medium: '中型猫',
    large: '大型猫',

    // 地图
    hoverToView: '悬停查看地区信息',

    // 页脚
    footer: '© 2026 喵星人环游记',
    disclaimer: '图片来源于网络，如有侵权请联系删除。部分信息可能存在偏差，仅供参考。',

    // 大洲
    asia: '亚洲',
    europe: '欧洲',
    africa: '非洲',
    northAmerica: '北美洲',
    southAmerica: '南美洲',
    oceania: '大洋洲',
  },
  en: {
    // 首页
    title: 'World Cat Explorer',
    subtitle: 'Discover amazing cats from around the world',
    popularCats: 'Popular Cats',
    regionCats: ' Cats',
    allRegions: 'All Regions',
    noCatsYet: 'No cats available in this region',
    clickToView: 'Click to view details',
    catsCount: ' cats',
    back: 'Back',
    home: 'Home',

    // 猫咪详情页
    appearance: 'Appearance',
    personality: 'Personality',
    careTips: 'Care Tips',
    relatedCats: 'More Cats from This Region',
    catNotFound: 'Cat not found',
    loading: 'Loading...',
    weight: 'Weight',
    lifespan: 'Lifespan',
    size: 'Size',
    popular: 'Popular',

    // 体型
    small: 'Small Cat',
    medium: 'Medium Cat',
    large: 'Large Cat',

    // 地图
    hoverToView: 'Hover to view region info',

    // 页脚
    footer: '© 2026 World Cat Explorer',
    disclaimer: 'Images sourced from the internet. If there are any copyright issues, please contact us for removal. Some information may not be accurate, for reference only.',

    // 大洲
    asia: 'Asia',
    europe: 'Europe',
    africa: 'Africa',
    northAmerica: 'North America',
    southAmerica: 'South America',
    oceania: 'Oceania',
  }
}

export type Locale = keyof typeof messages
export type MessageKey = keyof typeof messages.zh
