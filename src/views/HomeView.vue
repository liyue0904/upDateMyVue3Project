<template>
  <div>
    <TheHeader 
      @toggle-theme="$emit('toggle-theme')"
      :isDark="isDark?.value ?? false"
      :searchQuery="searchQuery"  
      @update:searchQuery="searchQuery = $event"
      @search="handleSearch"
    />
    
    <div v-if="loading" class="loading-container">
      ⏳ 加载中...
    </div>
    
    <div v-else-if="error" class="error-container">
      <p>❌ {{ error }}</p>
      <button @click="handleSearch(searchQuery)">重试</button>
    </div>
    
    <MusicList 
      v-else
      :list="filteredList" 
      @play="handlePlay"
      @like="toggleLike"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, provide, inject } from 'vue'
import TheHeader from '../components/TheHeader.vue'
import MusicList from '../components/MusicList.vue'
import { searchMusic } from '../api/music'
import { mockMusicList, type MusicItem } from '../data/mockMusic'

// ========== 从 App 注入主题 ==========
const isDark = inject<{ value: boolean }>('isDark')
const changeMe = inject<() => void>('changeMe')

// ========== 数据状态 ==========
const musicList = ref(mockMusicList)
const DEFAULT_KEYWORD = '热门'
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')

// 提供 musicList 给 App.vue 使用
provide('musicList', musicList)

// ========== 计算属性 ==========
const filteredList = computed(() => musicList.value)

// ========== 事件处理 ==========
const emit = defineEmits(['play', 'toggle-theme'])

function handlePlay(music: MusicItem) {
  emit('play', music)
}

function toggleLike(id: number) {
  const target = musicList.value.find((item) => item.id === id)
  if (target) {
    target.liked = !target.liked
  }
}

function handleSearch(keyword: string) {
  error.value = ''
  if (keyword.trim() === '') {
    loading.value = true
    searchMusic('热门')
      .then(result => {
        musicList.value = result
      })
      .catch(err => {
        error.value = '搜索失败，请检查网络或稍后重试'
        console.log('搜索错误:', err)
      })
      .finally(() => {
        loading.value = false
      })
    return
  }
  loading.value = true
  searchMusic(keyword)
    .then(result => {
      musicList.value = result
    })
    .catch(err => {
      error.value = '搜索失败，请检查网络或稍后重试'
      console.log('搜索错误:', err)
    })
    .finally(() => {
      loading.value = false
    })
}

// ========== 页面加载 ==========
onMounted(async () => {
  try {
    loading.value = true
    error.value = ''
    const result = await searchMusic(DEFAULT_KEYWORD)
    musicList.value = result
  } catch (err) {
    error.value = '加载失败，请检查网络或稍后重试'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 18px;
  color: var(--text-color);
}

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  gap: 12px;
}
.error-container p {
  font-size: 16px;
  color: #ff6b6b;
}
.error-container button {
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-color);
  cursor: pointer;
  box-shadow: 0 2px 8px var(--card-shadow);
}
</style>