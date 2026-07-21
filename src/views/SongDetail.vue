<template>
  <div class="song-detail">
    <button class="back-btn" @click="goBack">← 返回</button>
    
    <div v-if="!songData" class="loading">
      ⏳ 加载中...
    </div>
    
    <div v-else class="detail-content">
      <img :src="songData.cover" :alt="songData.title" class="detail-cover" />
      <h1 class="detail-title">{{ songData.title }}</h1>
      <p class="detail-artist">{{ songData.artist }}</p>
      <!-- <button class="play-btn" @click="playSong">▶ 播放</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MusicItem } from '../data/mockMusic'
const emit = defineEmits(['play'])
const route = useRoute()
const router = useRouter()

// 从全局注入播放方法
const app = inject<{ lastPlay: (music: MusicItem) => void }>('app')

// 歌曲数据
const songData = ref<MusicItem | null>(null)

onMounted(() => {
  // 从路由 query 里取数据
  const { id, title, artist, cover } = route.query
  if (id && title && artist && cover) {
    songData.value = {
      id: Number(id),
      title: title as string,
      artist: artist as string,
      cover: cover as string,
      url: '',
      liked: false
    }
  }
})

// 返回上一页
function goBack() {
  router.back()
}

// 播放歌曲
function playSong() {
  if (!songData.value) return
  // 直接调用父组件的播放方法
  if (app && app.lastPlay) {
    app.lastPlay(songData.value)
  } else {
    // 如果全局播放器不可用，用备用方案
    console.warn('全局播放器未准备好')
    // 触发父组件事件
    emit('play', songData.value)
  }
}
</script>

<style scoped>
.song-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 80px 20px 100px;
  text-align: center;
  min-height: 100vh;
  background-color: var(--bg-color);
}

.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: var(--card-bg);
  color: var(--text-color);
  font-size: 16px;
  box-shadow: 0 2px 8px var(--card-shadow);
}

.detail-cover {
  width: 300px;
  height: 300px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 30px var(--card-shadow);
}

.detail-title {
  font-size: 28px;
  margin: 20px 0 8px;
  color: var(--text-color);
}

.detail-artist {
  font-size: 18px;
  color: var(--text-color);
  opacity: 0.7;
}

.play-btn {
  margin-top: 30px;
  padding: 12px 40px;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
  background: var(--btn-bg);
  color: #fff;
  box-shadow: 0 4px 15px var(--card-shadow);
  transition: transform 0.2s;
}

.play-btn:hover {
  transform: scale(1.05);
}
</style>