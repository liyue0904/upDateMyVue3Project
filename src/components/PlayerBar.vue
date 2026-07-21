<template>
<div v-if="music" class="player-bar">
<div class="cover-wrapper">
  <img :src="music.cover" :alt="music.title">
  <div class="cover-overlay" v-show="!isPlaying"></div>
</div>
<button class="stopMusic" @click="emit('prev')">⏮️</button>
<button class="stopMusic" @click="stopSing">{{ isPlaying ? '⏸️' : '▶️' }}</button>
<button class="stopMusic" @click="emit('next')">⏭️</button>
  <audio 
  ref="audioRef" 
  :src="music.url" 
  preload="auto" 
  @play="isPlaying = true" 
  @pause="isPlaying = false"
  @timeupdate="updateProgress($event)"
  @loadedmetadata="getDuration($event)"
  >
  </audio>
  <h4>{{ music.title }}</h4>
  <p>{{ music.artist }}</p>
    <!-- 整个进度条容器（点击区域） -->
<div class="progress-container" @click="jump"> 
  <!-- 当前时间 -->
  <span class="time-current">{{ formatTime(currentTime) }}</span>  
  <!-- 进度条背景（灰色条） -->
  <div class="progress-track">  
    <!--  进度条填充（已播放部分） -->
  <div class="progress-fill" :style="{ width: progress + '%' }"></div> 
  </div>
  <!-- 总时长 -->
  <span class="time-total">{{ formatTime(duration) }}</span>  
</div>
<!-- 音量控制 -->
<div class="volume-control">
   <!-- 图标（暂时写死，下一步再改成动态） -->
  <span class="volume-icon">
    <span v-if="volume === 0">🔇</span>
    <span v-else-if="volume < 0.5">🔉</span>
    <span v-else>🔊</span>
  </span>
  <!-- 滑块 -->
  <input type="range" min="0" max="1" step="0.01" v-model="volume" />
   <!-- 百分比数字（暂时写死，下一步再改成动态） -->
  <span class="volume-text">{{Math.round(volume * 100)}}%</span>
</div>
</div>
<div v-else class="player-empty">
  <p>暂无播放</p>
</div>
</template>

<script setup lang="ts" name="PlayerBar">
import type { MusicItem } from '@/data/mockMusic';
import {ref,watch,computed} from'vue'

const audioRef = ref<HTMLAudioElement | null>(null)


const props = defineProps<{
  music:MusicItem | null
}>()


watch(()=>props.music,(NewMusic)=>{
  if(NewMusic){
    console.log('歌曲切换:',NewMusic.title)
  }
})


function playMusic(){
  audioRef.value?.play()
}

defineExpose({ playMusic })

const isPlaying = ref(false)

function stopSing(){
  if (!audioRef.value) return

  if(isPlaying.value){
    audioRef.value.pause()
  }else{
    audioRef.value.play().catch(err => {
      console.log('播放失败:', err)
  })
}
}

const currentTime = ref(0)
const duration = ref(0)
const progress = computed(() => duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0)

function formatTime(seconds: number){
  if (!seconds || isNaN(seconds)) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}
function jump(event: MouseEvent) {
  if (!audioRef.value || !duration.value) return
  
  // 用 getBoundingClientRect 获取容器位置
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  // 计算点击位置距离容器左边缘的距离
  const clickX = event.clientX - rect.left
  // 计算百分比
  const percent = clickX / rect.width
  // 跳转
  audioRef.value.currentTime = percent * duration.value
}

function updateProgress(event: Event) {
  const audio = event.target as HTMLAudioElement
  if (audio) {
    currentTime.value = audio.currentTime
  }
}

function getDuration(event: Event) {
  const audio = event.target as HTMLAudioElement
  if (audio) {
    duration.value = audio.duration
  }
}

const volume = ref(1)

watch(volume,(newVolum) =>{
  if(audioRef.value){
    audioRef.value.volume = newVolum
  }
})

const emit = defineEmits(['prev','next'])
</script>

<style scoped>
.player-bar{
  height: 150px; 
  display: flex;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
  gap: 15px;
  border-radius: 15px;
  background: var(--player-bg);
  backdrop-filter: blur(20px);
  box-shadow: 0 -2px 20px rgba(0,0,0,0.5);
  position: fixed;
  z-index:999;
  bottom: 0;
  left: 0;
  right: 0;
   /* flex-wrap: wrap; */
}

.player-bar img{
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0 -10px 20px rgba(50, 105, 202, 0.15);
}

.player-bar h4{
  font-size: 16px;
  color: var(--text-color);
  text-overflow: ellipsis;
}

.player-bar p{
  font-size: 13px;
  color: var(--text-color);
}

.cover-wrapper{
  position: relative
}

.cover-overlay{
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  background: rgba(0, 0, 0, 0.4);
}

.stopMusic{
  width: 50px;
  height: 50px;
  font-size: 25px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background:var(--player-bg);
}

.stopMusic:hover{
  transform: scale(1.08);
  box-shadow: 0 5px 20px var(--card-shadow), 0 0 50px rgba(255, 200, 50, 0.5);
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  cursor: pointer;
  /* flex-basis: 100%; */
}

.progress-track{
  flex: 1;
  height: 4px;
  background: rgba(128, 128, 128, 0.3);
  border-radius: 2px;
}

.progress-fill {
  height: 100%;
  background: var(--text-color);
  border-radius: 2px;
  width: 0%;
  transition: width 0.1s linear;
}

.time-current,
.time-total {
  font-size: 12px;
  color: var(--text-color);
  min-width: 40px;
  opacity: 0.7;
}

/* 音量控制行 */
.volume-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 音量图标 */
.volume-icon {
  font-size: 20px;
  width: 30px;
  text-align: center;
}

/* 音量滑块 */
.volume-control input[type="range"] {
  width: 80px;
  height: 4px;
  cursor: pointer;
  background: rgba(128, 128, 128, 0.3);
  border-radius: 2px;
  appearance: none;  /* 去掉浏览器默认样式，方便自定义 */
}

/* 百分比数字 */
.volume-text {
  font-size: 13px;
  color: var(--text-color);
  min-width: 40px;
  opacity: 0.7;
}

.player-empty{
  background:var(--player-bg);
  border-radius: 15px;
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:999;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>