<script setup lang="ts">
const team = [
  { name: '开发者', role: '架构师', avatar: '👨‍💻' },
  { name: '设计师', role: 'UI/UX', avatar: '👩‍🎨' },
  { name: '工程师', role: '全栈开发', avatar: '👨‍🔧' }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Header -->
    <header class="py-16 px-6 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">关于我们</h1>
      <p class="text-slate-400 max-w-xl mx-auto">我们是一支充满热情的团队，致力于打造卓越的产品</p>
    </header>

    <!-- Team Section -->
    <section class="py-12 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(member, index) in team"
            :key="index"
            class="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div class="text-6xl mb-4">{{ member.avatar }}</div>
            <h3 class="text-xl font-semibold text-white mb-2">{{ member.name }}</h3>
            <p class="text-slate-400">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 px-6">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl font-bold text-white mb-4">联系我们</h2>
        <p class="text-slate-400 mb-6">有问题或建议？随时与我们联系</p>
        <button class="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors">
          发送邮件
        </button>
      </div>
    </section>

    <!-- Back Link -->
    <div class="text-center pb-12">
      <router-link to="/" class="text-indigo-400 hover:text-indigo-300 transition-colors">
        ← 返回首页
      </router-link>
    </div>
  </div>
</template>
