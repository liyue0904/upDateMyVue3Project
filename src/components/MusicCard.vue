<template>
  <div class="card" :class="{ playing: currentPlayingId?.value === music.id }" @click="goToDetail">
    <button 
      class="like"
      @click.stop="emit('like', music.id)"
    >
      {{ music.liked ? '❤️' : '🤍' }}
    </button>
    <img :src="music.cover" :alt="music.title" referrerpolicy="no-referrer">
    <h4>{{ music.title }}</h4>
    <p>{{ music.artist }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { MusicItem } from '../data/mockMusic'
import{inject}from'vue'
const emit = defineEmits(['play', 'like'])
const props = defineProps<{
  music: MusicItem
}>()

const router = useRouter()

function goToDetail() {
  // 先播放
  emit('play', props.music)
  // 再跳转
  router.push({
    path: '/song/' + props.music.id,
    query: {
      id: props.music.id,
      title: props.music.title,
      artist: props.music.artist,
      cover: props.music.cover
    }
  })
}

const currentPlayingId = inject<{ value: number | null }>('currentPlayingId')
console.log('MusicCard inject 到的值:', currentPlayingId)
</script>

<style scoped>
.card {
  position: relative;
  background-color: var(--card-bg);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: transform 0.25s, box-shadow 0.25s;
  cursor: pointer;
}
.card .like {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
}
.card img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  border-radius: 10px;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
.card h4 {
  font-size: 20px;
  font-weight: 400;
  margin: 0 10px;
  color: var(--text-color);
}
.card p {
  font-size: 15px;
  color: var(--text-color);
}
.card.playing {
  border: 3px solid #3498db;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.5);
}
</style>