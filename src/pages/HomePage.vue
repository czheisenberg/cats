<script setup lang="ts">
const features = [
  {
    title: '现代设计',
    description: '精心设计的界面，带来极致的视觉体验',
    icon: '✨'
  },
  {
    title: '快速响应',
    description: '基于Vue3构建，性能卓越，交互流畅',
    icon: '⚡'
  },
  {
    title: '易于定制',
    description: '模块化架构，方便扩展和个性化定制',
    icon: '🎨'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div class="relative z-10 text-center max-w-4xl mx-auto">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span class="text-sm text-white/80">基于 Vue3 + TypeScript</span>
        </div>

        <!-- Main Title -->
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          <span class="bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            探索无限可能
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
          一个现代化的 Web 应用框架，助你快速构建出色的数字产品
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
          <button class="group px-8 py-4 bg-white text-purple-900 font-semibold rounded-xl hover:bg-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20">
            <span class="flex items-center justify-center gap-2">
              开始使用
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
          </button>
          <button class="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
           了解更多
          </button>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">核心特性</h2>
          <p class="text-white/60 max-w-xl mx-auto">强大的功能特性，帮助你打造卓越的产品</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
            :style="{ animationDelay: `${index * 200}ms` }"
          >
            <div class="text-5xl mb-6">{{ feature.icon }}</div>
            <h3 class="text-xl font-semibold text-white mb-3">{{ feature.title }}</h3>
            <p class="text-white/60">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 border-t border-white/10">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-white/50">
          © 2024 Vue3 应用. 使用 Vite + Tailwind CSS 构建
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 1s ease-out forwards;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-400 {
  animation-delay: 400ms;
}

.delay-1000 {
  animation-delay: 1000ms;
}
</style>
