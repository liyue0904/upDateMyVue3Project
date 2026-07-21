<template>
  <div class="app" :data-theme="isDark ? 'dark' : ''">
    <!-- 路由内容 -->
    <router-view 
      @play="lastPlay"
      @toggle-theme="changeMe"
    />
    
    <!-- 全局播放器（独立于页面之外） -->
    <PlayerBar 
      :music="musicGood" 
      ref="playerBarRef"
      @prev="prevMusic"
      @next="nextMusic"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, provide,inject } from 'vue'
import PlayerBar from './components/PlayerBar.vue'
import { getSongUrl,getSongDetail } from './api/music'
import type { MusicItem } from './data/mockMusic'

// ========== 主题切换 ==========
const isDark = ref(false)
function changeMe() {
  isDark.value = !isDark.value
}
provide('isDark', isDark)
provide('changeMe', changeMe)

// ========== 播放器状态 ==========
const playerBarRef = ref<InstanceType<typeof PlayerBar> | null>(null)
const musicGood = ref<MusicItem | null>(null)
const rememberId = ref(0)
const currentPlayingId = ref<number | null>(null)
provide('currentPlayingId', currentPlayingId)
// 注入 musicList（由 HomeView 提供）
const musicList = inject<{ value: MusicItem[] }>('musicList', { value: [] })
// ========== 播放函数 ==========
async function lastPlay(music: MusicItem) {
  try {
    // 1. 获取播放地址
    const url = await getSongUrl(music.id)
    if (!url) {
      console.log('获取播放地址失败')
      return
    }
    music.url = url

    // 2. 获取歌曲详情（封面图）
    // 如果当前封面是默认占位图或为空，则获取真实封面
    if (!music.cover || music.cover.includes('picsum.photos') || music.cover.includes('seed=default')) {
      const detail = await getSongDetail(music.id)
      if (detail && detail.cover) {
        music.cover = detail.cover
      }
    }

    // 3. 更新播放状态
    musicGood.value = music
    currentPlayingId.value = music.id
    if (musicList) {
      rememberId.value = musicList.value.findIndex((item) => item.id === music.id)
    }

    // 4. 触发播放
    nextTick(() => {
      playerBarRef.value?.playMusic()
    })
  } catch (err) {
    console.log('播放错误:', err)
  }
}
provide('app', { lastPlay })
provide('currentPlayingId', currentPlayingId)
// 上一首
async function prevMusic() {
  if (!musicList || musicList.value.length === 0) return

  let newIndex = rememberId.value - 1
  if (newIndex < 0) {
    newIndex = musicList.value.length - 1
  }
  const newMusic = musicList.value[newIndex]!
  await lastPlay(newMusic)
}

// 下一首
async function nextMusic() {
  if (!musicList || musicList.value.length === 0) return

  let newIndex = rememberId.value + 1
  if (newIndex >= musicList.value.length) {
    newIndex = 0
  }
  const newMusic = musicList.value[newIndex]!
  await lastPlay(newMusic)
}


// 暴露播放方法给子组件
defineExpose({ lastPlay })
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: var(--bg-color);
  transition: background-color 0.3s;
  padding-bottom: 80px;
}
</style>