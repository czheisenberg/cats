# 技术架构文档 - 喵星人环游记

## 1. 整体架构
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend   │ ──► │   Backend   │ ──► │  Database   │
│   Vue3/Nuxt  │     │   NestJS    │     │  SQLite/PG  │
└─────────────┘     └─────────────┘     └─────────────┘
```

## 2. 技术栈

### 2.1 前端
- **框架**: Vue3 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **路由**: Vue Router
- **状态管理**: Pinia
- **HTTP客户端**: Axios
- **地图**: 自定义SVG地图组件

### 2.2 后端
- **框架**: NestJS + TypeScript
- **ORM**: Prisma
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **验证**: class-validator

## 3. 项目结构

### 3.1 前端结构 (Frontend)
```
frontend/
├── src/
│   ├── assets/           # 静态资源
│   ├── components/       # 可复用组件
│   │   ├── common/       # 通用组件（按钮、卡片等）
│   │   ├── map/          # 地图相关组件
│   │   └── cat/          # 猫咪相关组件
│   ├── composables/      # 可复用逻辑
│   ├── pages/            # 页面组件
│   │   ├── HomePage.vue  # 世界地图首页
│   │   ├── CatDetailPage.vue  # 猫咪详情页
│   │   └── RegionPage.vue     # 地区列表页
│   ├── router/          # 路由配置
│   ├── stores/           # Pinia状态管理
│   ├── types/            # TypeScript类型定义
│   ├── api/              # API调用
│   ├── App.vue
│   └── main.ts
```

### 3.2 后端结构 (Backend)
```
backend/
├── src/
│   ├── cats/             # 猫咪模块
│   │   ├── cats.controller.ts
│   │   ├── cats.service.ts
│   │   ├── cats.module.ts
│   │   ├── cat.entity.ts
│   │   └── dto/
│   ├── regions/          # 地区模块
│   │   ├── regions.controller.ts
│   │   ├── regions.service.ts
│   │   ├── regions.module.ts
│   │   └── region.entity.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── app.module.ts
│   └── main.ts
```

## 4. 数据模型

### 4.1 Cat (猫咪)
| 字段 | 类型 | 描述 |
|-----|------|-----|
| id | String | 唯一标识 |
| name | String | 名称 |
| nameEn | String | 英文名 |
| regionId | String | 所属地区 |
| imageUrl | String | 图片URL |
|体型 | String (SMALL/MEDIUM/LARGE) |
| weightMin | Float | 最小体重(kg) |
| weightMax | Float | 最大体重(kg) |
| lifespanMin | Int | 最小寿命(年) |
| lifespanMax | Int | 最大寿命(年) |
| description | String | 简介 |
| appearance | String | 外观特征 |
| personality | String | 性格特点 |
| careTips | String | 饲养建议 |
| isPopular | Boolean | 是否热门 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

### 4.2 Region (地区)
| 字段 | 类型 | 描述 |
|-----|------|------|
| id | String | 唯一标识 |
| name | String | 地区名称 |
| nameEn | String | 英文名 |
| continent | String | 所属洲 |
| mapPath | String | SVG地图路径 |
| description | String | 地区描述 |

## 5. API 定义

### 5.1 猫咪接口
| 方法 | 路径 | 描述 |
|-----|------|-----|
| GET | /api/cats | 获取所有猫咪列表 |
| GET | /api/cats/:id | 获取单个猫咪详情 |
| GET | /api/cats/region/:regionId | 获取某地区猫咪列表 |
| GET | /api/cats/popular | 获取热门猫咪 |

### 5.2 地区接口
| 方法 | 路径 | 描述 |
|-----|------|-----|
| GET | /api/regions | 获取所有地区列表 |
| GET | /api/regions/:id | 获取单个地区详情 |
| GET | /api/regions/:id/cats | 获取某地区所有猫咪 |

## 6. 路由定义

### 6.1 前端路由
| 路由 | 页面 | 描述 |
|-----|------|-----|
| / | HomePage | 世界地图首页 |
| /cat/:id | CatDetailPage | 猫咪详情页 |
| /region/:id | RegionPage | 地区猫咪列表页 |

## 7. 开发计划

### Phase 1: 基础搭建
- [ ] 项目初始化 (Vue3前端 + NestJS后端)
- [ ] 数据库设计 & Prisma配置
- [ ] 基础API开发
- [ ] SVG世界地图组件

### Phase 2: 核心功能
- [ ] 地图交互实现
- [ ] 猫咪列表/详情页
- [ ] 地区页面

### Phase 3: 完善优化
- [ ] 动画效果增强
- [ ] 响应式适配
- [ ] 数据填充 (30+猫咪)
